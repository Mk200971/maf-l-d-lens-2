import { type ChartSpec } from './chart-spec';
import { type FilterState } from './types';
import { emptyFilters, filterHours, filterFeedback, filterCompletion, filterReach, groupSum, avgSatRatePct, normalizedAvgSat, avgNps, programName } from './aggregate';
import { MIN_CELL_SIZE, isSuppressed } from './privacy';

function scopeSummary(filters: FilterState): string | undefined {
  const parts: string[] = [];
  if (filters.years?.length) parts.push(filters.years.map(String).join('/'));
  if (filters.bus?.length) parts.push(filters.bus.join('/'));
  if (filters.countries?.length) parts.push(filters.countries.join('/'));
  if (filters.roles?.length) parts.push(filters.roles.join('/'));
  if (filters.programs?.length) parts.push(`${filters.programs.length} program${filters.programs.length > 1 ? 's' : ''}`);
  return parts.length > 0 ? parts.join(' · ') : undefined;
}

/**
 * Internal bucket type: value = what the bar shows; n = how many individuals
 * are behind it. `n` is the support count used for privacy suppression — we
 * never suppress on `value` (which for satisfaction is a 1-5 score, for NPS
 * can be negative, etc).
 */
type Bucket = { label: string; value: number; n: number };

/**
 * Result of building chart data. Either an array of buckets (with `n` to be
 * stripped before returning) or an explicit `unsupported` flag the tool
 * surfaces so the model retries instead of showing "no data".
 */
type BuildResult =
  | { kind: 'ok'; buckets: Bucket[] }
  | { kind: 'unsupported'; reason: string };

const UNSUPPORTED: BuildResult = {
  kind: 'unsupported',
  reason: 'This measure cannot be grouped by that dimension with the data available. Try a different combination (e.g. measure=hours, dimension=country, or measure=satisfaction, dimension=program).',
};

const measureLabels: Record<ChartSpec['measure'], string> = {
  hours: 'Learning Hours',
  completions: 'Completions',
  satisfaction: 'Average Satisfaction',
  satisfactionRate: 'Satisfaction Rate',
  nps: 'Net Promoter Score',
  responses: 'Feedback Responses',
  completionRate: 'Completion Rate',
  uniqueLearners: 'Unique Learners',
};

const dimensionLabels: Record<ChartSpec['dimension'], string> = {
  bu: 'Business Unit',
  country: 'Country',
  role: 'Role',
  program: 'Programme',
  month: 'Month',
  year: 'Year',
};

// Additive measures: sum across buckets for KPI collapse.
// Rate/score measures: weighted average by support count for KPI collapse.
const ADDITIVE_MEASURES = new Set<ChartSpec['measure']>(['hours', 'completions', 'responses', 'uniqueLearners']);
const WEIGHTED_MEASURES = new Set<ChartSpec['measure']>(['satisfaction', 'satisfactionRate', 'completionRate', 'nps']);

// Dimension → accessor for LearningHoursRow (always available).
function hoursKeyFn<T extends { bu: string; country: string; role: string; programCode: string; month: string | null; year: number }>(
  dimension: ChartSpec['dimension'],
): (r: T) => string {
  switch (dimension) {
    case 'bu': return (r: T) => r.bu as string;
    case 'country': return (r: T) => r.country as string;
    case 'role': return (r: T) => r.role as string;
    case 'program': return (r: T) => r.programCode as string;
    case 'month': return (r: T) => r.month ?? 'Unknown';
    case 'year': return (r: T) => String(r.year);
  }
}

// Dimension → accessor for FeedbackRow (no role field).
function feedbackKeyFn<T extends { bu: string; country: string; programCode: string; month: string | null; year?: number }>(
  dimension: ChartSpec['dimension'],
): ((r: T) => string) | null {
  // FeedbackRow has no role; can't group feedback by role.
  switch (dimension) {
    case 'bu': return (r: T) => r.bu as string;
    case 'country': return (r: T) => r.country as string;
    case 'program': return (r: T) => r.programCode as string;
    case 'month': return (r: T) => r.month ?? 'Unknown';
    case 'year': return null; // FeedbackRow has no year field
    case 'role': return null;
  }
}

// Dimension → accessor for LearnerReachRow.
function reachKeyFn<T extends { bu: string; country: string; role: string; programCode: string; month: string | null; year: number }>(
  dimension: ChartSpec['dimension'],
): ((r: T) => string) | null {
  // LearnerReachRow has bu/country/role/programCode/month/year — all supported.
  switch (dimension) {
    case 'bu': return (r: T) => r.bu as string;
    case 'country': return (r: T) => r.country as string;
    case 'role': return (r: T) => r.role as string;
    case 'program': return (r: T) => r.programCode as string;
    case 'month': return (r: T) => r.month ?? 'Unknown';
    case 'year': return (r: T) => String(r.year);
  }
}

// Generic dimension key for CompletionRow — only 'program' is supported.
function completionKeyFn(dimension: ChartSpec['dimension']): ((r: { programCode: string }) => string) | null {
  if (dimension === 'program') return (r) => r.programCode;
  return null; // CompletionRow has no bu/country/role/etc.
}

/**
 * Build the bucket array for the given measure + dimension.
 * Returns UNSUPPORTED if the combination genuinely cannot be computed.
 */
function buildBuckets(
  measure: ChartSpec['measure'],
  dimension: ChartSpec['dimension'],
  fullFilters: FilterState,
): BuildResult {
  if (measure === 'hours') {
    const rows = filterHours(fullFilters);
    const keyFn = hoursKeyFn<typeof rows[number]>(dimension);
    const grouped = groupSum(rows, keyFn, (r) => r.totalHours);
    const buckets: Bucket[] = Array.from(grouped.entries()).map(([label, value]) => ({
      label: dimension === 'program' ? programName(label) : (label || 'Unknown'),
      value: Number(value.toFixed(1)),
      n: rows.filter((r) => keyFn(r) === label).reduce((acc, r) => acc + r.completions, 0),
    }));
    return { kind: 'ok', buckets };
  }

  if (measure === 'completions') {
    if (dimension === 'program') {
      // Use the eligibility grain for program-level completions.
      const rows = filterCompletion(fullFilters);
      const keyFn = completionKeyFn(dimension);
      if (!keyFn) return UNSUPPORTED;
      const grouped = groupSum(rows, keyFn, (r) => r.completedEligible);
      const buckets: Bucket[] = Array.from(grouped.entries()).map(([code, value]) => ({
        label: programName(code),
        value,
        n: rows.find((r) => r.programCode === code)?.eligible ?? 0,
      }));
      return { kind: 'ok', buckets };
    }
    // For bu/country/role/month/year: use learningHours (has completions + all dims).
    const rows = filterHours(fullFilters);
    const keyFn = hoursKeyFn<typeof rows[number]>(dimension);
    const grouped = groupSum(rows, keyFn, (r) => r.completions);
    const buckets: Bucket[] = Array.from(grouped.entries()).map(([label, value]) => ({
      label: label || 'Unknown',
      value,
      n: rows.filter((r) => keyFn(r) === label).reduce((acc, r) => acc + r.completions, 0),
    }));
    return { kind: 'ok', buckets };
  }

  if (measure === 'completionRate') {
    if (dimension === 'program') {
      const rows = filterCompletion(fullFilters);
      const buckets: Bucket[] = rows.map((r) => ({
        label: programName(r.programCode),
        value: Number(r.completionRatePct.toFixed(1)),
        n: r.eligible,
      }));
      return { kind: 'ok', buckets };
    }
    // CompletionRow has no bu/country/role/month/year — completionRate by
    // those dimensions cannot be computed without joining to another grain.
    return UNSUPPORTED;
  }

  if (measure === 'satisfaction' || measure === 'satisfactionRate') {
    const rows = filterFeedback(fullFilters);
    const keyFn = feedbackKeyFn<typeof rows[number]>(dimension);
    if (!keyFn) return UNSUPPORTED;
    const grouped = groupSum(rows, keyFn, (r) => r.responses);
    const buckets: Bucket[] = Array.from(grouped.entries()).map(([key, _responses]) => {
      const subset = rows.filter((r) => keyFn(r) === key);
      const rate = measure === 'satisfactionRate' ? avgSatRatePct(subset) : normalizedAvgSat(subset);
      return {
        label: dimension === 'program' ? programName(key) : (key || 'Unknown'),
        value: Number(rate.toFixed(1)),
        n: subset.reduce((acc, r) => acc + r.responses, 0),
      };
    });
    return { kind: 'ok', buckets };
  }

  if (measure === 'nps') {
    const rows = filterFeedback(fullFilters);
    const keyFn = feedbackKeyFn<typeof rows[number]>(dimension);
    if (!keyFn) return UNSUPPORTED;
    const grouped = groupSum(rows, keyFn, (r) => r.responses);
    const buckets: Bucket[] = Array.from(grouped.entries()).map(([key, _responses]) => {
      const subset = rows.filter((r) => keyFn(r) === key);
      const npsVal = avgNps(subset);
      return {
        label: dimension === 'program' ? programName(key) : (key || 'Unknown'),
        value: npsVal != null ? Number(npsVal.toFixed(1)) : 0,
        n: subset.reduce((acc, r) => acc + r.responses, 0),
      };
    });
    return { kind: 'ok', buckets };
  }

  if (measure === 'responses') {
    const rows = filterFeedback(fullFilters);
    const keyFn = feedbackKeyFn<typeof rows[number]>(dimension);
    if (!keyFn) return UNSUPPORTED;
    const grouped = groupSum(rows, keyFn, (r) => r.responses);
    const buckets: Bucket[] = Array.from(grouped.entries()).map(([key, value]) => ({
      label: dimension === 'program' ? programName(key) : (key || 'Unknown'),
      value,
      n: rows.filter((r) => keyFn(r) === key).reduce((acc, r) => acc + r.responses, 0),
    }));
    return { kind: 'ok', buckets };
  }

  if (measure === 'uniqueLearners') {
    const rows = filterReach(fullFilters);
    const keyFn = reachKeyFn<typeof rows[number]>(dimension);
    if (!keyFn) return UNSUPPORTED;
    const grouped = groupSum(rows, keyFn, (r) => r.uniqueLearners);
    const buckets: Bucket[] = Array.from(grouped.entries()).map(([key, value]) => ({
      label: dimension === 'program' ? programName(key) : (key || 'Unknown'),
      value,
      n: value, // unique learners is itself the support count
    }));
    return { kind: 'ok', buckets };
  }

  return UNSUPPORTED;
}

/**
 * Collapse a bucket list to a single KPI row.
 *  - additive measures (hours, completions, responses, uniqueLearners): SUM
 *  - weighted measures (satisfaction, satisfactionRate, completionRate, nps):
 *    weighted average by support count `n`.
 */
function collapseToKpi(measure: ChartSpec['measure'], buckets: Bucket[]): Bucket[] {
  if (buckets.length === 0) return [];
  if (ADDITIVE_MEASURES.has(measure)) {
    const total = buckets.reduce((acc, b) => acc + b.value, 0);
    const n = buckets.reduce((acc, b) => acc + b.n, 0);
    return [{ label: measureLabels[measure], value: Number(total.toFixed(1)), n }];
  }
  if (WEIGHTED_MEASURES.has(measure)) {
    const totalN = buckets.reduce((acc, b) => acc + b.n, 0);
    if (totalN === 0) return [];
    const weighted = buckets.reduce((acc, b) => acc + b.value * b.n, 0) / totalN;
    return [{ label: measureLabels[measure], value: Number(weighted.toFixed(1)), n: totalN }];
  }
  return buckets.slice(0, 1);
}

export function buildChart(input: {
  kind: 'bar' | 'line' | 'pie' | 'kpi';
  measure: ChartSpec['measure'];
  dimension: ChartSpec['dimension'];
  filters: Partial<FilterState>;
  topN?: number;
}): ChartSpec {
  const fullFilters: FilterState = {
    ...emptyFilters,
    ...input.filters,
  };

  const { kind, measure, dimension } = input;
  const topN = input.topN ?? 8;

  // ── Build the buckets (or surface an unsupported combination) ──────────
  const result = buildBuckets(measure, dimension, fullFilters);
  if (result.kind === 'unsupported') {
    // Surface as a real error so the model retries, not a silent empty array.
    // Caller (the visualize tool) is expected to forward this as { error }.
    throw new Error(result.reason);
  }

  let buckets: Bucket[] = result.buckets;

  // ── KPI collapse (A4): one row, org-wide total/weighted-avg ────────────
  if (kind === 'kpi') {
    buckets = collapseToKpi(measure, buckets);
  }

  // ── Sort and apply topN (only for non-chronological + non-KPI) ─────────
  const isChronological = dimension === 'month' || dimension === 'year';
  if (kind !== 'kpi' && !isChronological) {
    buckets.sort((a, b) => b.value - a.value);
    if (topN && buckets.length > topN) {
      buckets = buckets.slice(0, topN);
    }
  } else if (isChronological) {
    buckets.sort((a, b) => a.label.localeCompare(b.label));
  }

  // ── Privacy suppression (A1): suppress on `n` (support count), never value.
  // isSuppressed() returns true only when 0 < n < MIN_CELL_SIZE, so a true
  // zero-cohort bucket (no data) is left intact and rendered as "no data"
  // by the chart empty-state — not conflated with a privacy suppression.
  const suppressedCount = buckets.filter((b) => isSuppressed(b.n)).length;
  let note: string | undefined;
  if (suppressedCount > 0) {
    note = `Cells with fewer than ${MIN_CELL_SIZE} respondents have been hidden for privacy.`;
    buckets = buckets.filter((b) => !isSuppressed(b.n));
  }

  // ── Strip `n` before returning the ChartSpec (caller never sees it) ────
  const data = buckets.map((b) => ({ label: b.label, value: b.value }));

  const title = `${measureLabels[measure]} by ${dimensionLabels[dimension]}`;

  return {
    id: `${measure}-${dimension}-${Date.now()}`,
    kind,
    title,
    subtitle: scopeSummary(fullFilters),
    dimension,
    measure,
    data,
    note,
    filtersApplied: fullFilters as unknown as Record<string, unknown>,
  };
}
