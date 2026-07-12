// Filtering + aggregation selectors. Every chart pulls data through these so
// filter behavior stays consistent with lib/filter-rules.ts.

import { eligibilityByProgram } from './dashboard-data.extended'
import { completion, extras, feedback, learningHours, programs, learnerReach } from './dashboard-data'
import type {
  EligibilityRow,
  FeedbackRow,
  FilterKey,
  FilterState,
  LearnerReachRow,
  LearningHoursRow,
} from './types'

export const emptyFilters: FilterState = {
  years: [],
  bus: [],
  countries: [],
  roles: [],
  programs: [],
  monthRange: null,
}

export const ALL_YEARS = [2024, 2025, 2026]
export const ALL_BUS = ['AMBU', 'DBU', 'Unknown']
export const ALL_COUNTRIES = Array.from(new Set(learningHours.map((r) => r.country))).sort()
export const ALL_ROLES = Array.from(new Set(learningHours.map((r) => r.role))).sort()
export const ALL_MONTHS = Array.from(new Set(learningHours.map((r) => r.month))).sort()

function inMonthRange(month: string | null, range: [string, string] | null): boolean {
  if (!range || !month) return true
  return month >= range[0] && month <= range[1]
}

/** Apply only the filters listed in `allowed` — the traceability guardrail. */
export function filterHours(
  f: FilterState,
  allowed: FilterKey[] = ['year', 'bu', 'country', 'role', 'program', 'month'],
): LearningHoursRow[] {
  const a = new Set(allowed)
  return learningHours.filter(
    (r) =>
      (!a.has('year') || f.years.length === 0 || f.years.includes(r.year)) &&
      (!a.has('bu') || f.bus.length === 0 || f.bus.includes(r.bu)) &&
      (!a.has('country') || f.countries.length === 0 || f.countries.includes(r.country)) &&
      (!a.has('role') || f.roles.length === 0 || f.roles.includes(r.role)) &&
      (!a.has('program') || f.programs.length === 0 || f.programs.includes(r.programCode)) &&
      (!a.has('month') || inMonthRange(r.month, f.monthRange)),
  )
}

export function filterReach(
  f: FilterState,
  allowed: FilterKey[] = ['year', 'bu', 'country', 'role', 'program', 'month'],
): LearnerReachRow[] {
  const a = new Set(allowed)
  return (learnerReach as LearnerReachRow[]).filter(
    (r) =>
      (!a.has('year') || f.years.length === 0 || f.years.includes(r.year)) &&
      (!a.has('bu') || f.bus.length === 0 || f.bus.includes(r.bu)) &&
      (!a.has('country') || f.countries.length === 0 || f.countries.includes(r.country)) &&
      (!a.has('role') || f.roles.length === 0 || f.roles.includes(r.role)) &&
      (!a.has('program') || f.programs.length === 0 || f.programs.includes(r.programCode)) &&
      (!a.has('month') || inMonthRange(r.month, f.monthRange)),
  )
}

/** Feedback grain: year (via month), program, month ONLY. */
export function filterFeedback(f: FilterState): FeedbackRow[] {
  return feedback.filter((r) => {
    const year = r.month ? Number(r.month.slice(0, 4)) : null
    return (
      (f.years.length === 0 || year === null || f.years.includes(year)) &&
      (f.programs.length === 0 || f.programs.includes(r.programCode)) &&
      (r.month === null || inMonthRange(r.month, f.monthRange))
    )
  })
}

/** Eligibility grain (extended): program, bu, country, role. */
export function filterEligibility(
  f: FilterState,
  allowed: FilterKey[] = ['program'],
): EligibilityRow[] {
  const a = new Set(allowed)
  return (eligibilityByProgram as EligibilityRow[]).filter(
    (r) =>
      (!a.has('bu') || f.bus.length === 0 || f.bus.includes(r.bu)) &&
      (!a.has('country') || f.countries.length === 0 || f.countries.includes(r.country)) &&
      (!a.has('role') || f.roles.length === 0 || f.roles.includes(r.role)) &&
      (!a.has('program') || f.programs.length === 0 || f.programs.includes(r.programCode)),
  )
}

export function filterCompletion(f: FilterState) {
  return completion.filter(
    (r) => f.programs.length === 0 || f.programs.includes(r.programCode),
  )
}

export function filterExtras(f: FilterState) {
  return extras.filter((r) => f.programs.length === 0 || f.programs.includes(r.programCode))
}

// ---------- generic aggregation ----------

export function sumBy<T>(rows: T[], fn: (r: T) => number): number {
  return rows.reduce((acc, r) => acc + fn(r), 0)
}

export function groupSum<T>(
  rows: T[],
  keyFn: (r: T) => string,
  valFn: (r: T) => number,
): Map<string, number> {
  const m = new Map<string, number>()
  for (const r of rows) {
    const k = keyFn(r)
    m.set(k, (m.get(k) ?? 0) + valFn(r))
  }
  return m
}

export function avgBy<T>(rows: T[], valFn: (r: T) => number | null, weightFn?: (r: T) => number): number {
  const valid = rows.filter((r) => valFn(r) != null)
  if (valid.length === 0) return 0
  if (!weightFn) return sumBy(valid, (r) => valFn(r) as number) / valid.length
  const w = sumBy(valid, weightFn)
  return w === 0 ? 0 : sumBy(valid, (r) => (valFn(r) as number) * weightFn(r)) / w
}

/**
 * Response-weighted average of satisfactionNormalized (always 1-5).
 * Use this when aggregating across programs of different native scales.
 */
export function normalizedAvgSat(rows: FeedbackRow[]): number {
  const valid = rows.filter((r) => r.satisfactionNormalized != null)
  if (valid.length === 0) return 0
  const w = sumBy(valid, (r) => r.responses)
  return w === 0 ? 0 : sumBy(valid, (r) => (r.satisfactionNormalized as number) * r.responses) / w
}

/** Response-weighted average of satisfactionRatePct (top-2-box, 0-100). */
export function avgSatRatePct(rows: FeedbackRow[]): number {
  const valid = rows.filter((r) => r.satisfactionRatePct != null)
  if (valid.length === 0) return 0
  const w = sumBy(valid, (r) => r.responses)
  return w === 0 ? 0 : sumBy(valid, (r) => (r.satisfactionRatePct as number) * r.responses) / w
}

/** Response-weighted average of nps (only rows with nps != null). */
export function avgNps(rows: FeedbackRow[]): number | null {
  const valid = rows.filter((r) => r.nps != null)
  if (valid.length === 0) return null
  const w = sumBy(valid, (r) => r.responses)
  return w === 0 ? null : sumBy(valid, (r) => (r.nps as number) * r.responses) / w
}

export function programName(code: string): string {
  return programs.find((p) => p.code === code)?.displayName ?? code
}

export function formatNumber(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 0 })
}
