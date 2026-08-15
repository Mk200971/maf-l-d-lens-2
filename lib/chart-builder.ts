import { type ChartSpec } from './chart-spec';
import { type FilterState } from './types';
import { emptyFilters, filterHours, filterFeedback, filterCompletion, filterReach, groupSum, avgSatRatePct, normalizedAvgSat, avgNps, programName } from './aggregate';
import { MIN_CELL_SIZE } from './privacy';

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

  let data: { label: string; value: number }[] = [];
  let note: string | undefined;

  const { kind, measure, dimension } = input;
  const topN = input.topN ?? 8;

  // Build data based on measure and dimension
  if (measure === 'hours') {
    const hoursData = filterHours(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(hoursData, (r) => r.bu, (r) => r.totalHours);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value: Number(value.toFixed(1)) }));
    } else if (dimension === 'country') {
      const grouped = groupSum(hoursData, (r) => r.country, (r) => r.totalHours);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value: Number(value.toFixed(1)) }));
    } else if (dimension === 'role') {
      const grouped = groupSum(hoursData, (r) => r.role, (r) => r.totalHours);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value: Number(value.toFixed(1)) }));
    } else if (dimension === 'program') {
      const grouped = groupSum(hoursData, (r) => r.programCode, (r) => r.totalHours);
      data = Array.from(grouped.entries()).map(([code, value]) => ({ label: programName(code), value: Number(value.toFixed(1)) }));
    } else if (dimension === 'month') {
      const grouped = groupSum(hoursData, (r) => r.month || 'Unknown', (r) => r.totalHours);
      data = Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([label, value]) => ({ label, value: Number(value.toFixed(1)) }));
    } else if (dimension === 'year') {
      const grouped = groupSum(hoursData, (r) => String(r.year), (r) => r.totalHours);
      data = Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0])).map(([label, value]) => ({ label, value: Number(value.toFixed(1)) }));
    }
  } else if (measure === 'completions') {
    const completionsData = filterCompletion(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(completionsData, (r) => r.bu, (r) => r.completions);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value }));
    } else if (dimension === 'country') {
      const grouped = groupSum(completionsData, (r) => r.country, (r) => r.completions);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value }));
    } else if (dimension === 'role') {
      const grouped = groupSum(completionsData, (r) => r.role, (r) => r.completions);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value }));
    } else if (dimension === 'program') {
      const grouped = groupSum(completionsData, (r) => r.programCode, (r) => r.completions);
      data = Array.from(grouped.entries()).map(([code, value]) => ({ label: programName(code), value }));
    }
  } else if (measure === 'satisfaction' || measure === 'satisfactionRate') {
    const feedbackData = filterFeedback(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(feedbackData, (r) => r.businessUnit, (r) => r.responses);
      data = Array.from(grouped.entries()).map(([bu, responses]) => {
        const subset = feedbackData.filter(f => f.businessUnit === bu);
        const rate = measure === 'satisfactionRate' ? avgSatRatePct(subset) : normalizedAvgSat(subset);
        return { label: bu || 'Unknown', value: Number(rate.toFixed(1)) };
      });
    } else if (dimension === 'country') {
      const grouped = groupSum(feedbackData, (r) => r.country, (r) => r.responses);
      data = Array.from(grouped.entries()).map(([country, responses]) => {
        const subset = feedbackData.filter(f => f.country === country);
        const rate = measure === 'satisfactionRate' ? avgSatRatePct(subset) : normalizedAvgSat(subset);
        return { label: country || 'Unknown', value: Number(rate.toFixed(1)) };
      });
    } else if (dimension === 'program') {
      const grouped = groupSum(feedbackData, (r) => r.programCode, (r) => r.responses);
      data = Array.from(grouped.entries()).map(([code, responses]) => {
        const subset = feedbackData.filter(f => f.programCode === code);
        const rate = measure === 'satisfactionRate' ? avgSatRatePct(subset) : normalizedAvgSat(subset);
        return { label: programName(code), value: Number(rate.toFixed(1)) };
      });
    }
  } else if (measure === 'nps') {
    const feedbackData = filterFeedback(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(feedbackData, (r) => r.businessUnit, (r) => r.responses);
      data = Array.from(grouped.entries()).map(([bu, responses]) => {
        const subset = feedbackData.filter(f => f.businessUnit === bu);
        const npsVal = avgNps(subset);
        return { label: bu || 'Unknown', value: npsVal != null ? Number(npsVal.toFixed(1)) : 0 };
      });
    } else if (dimension === 'country') {
      const grouped = groupSum(feedbackData, (r) => r.country, (r) => r.responses);
      data = Array.from(grouped.entries()).map(([country, responses]) => {
        const subset = feedbackData.filter(f => f.country === country);
        const npsVal = avgNps(subset);
        return { label: country || 'Unknown', value: npsVal != null ? Number(npsVal.toFixed(1)) : 0 };
      });
    }
  } else if (measure === 'responses') {
    const feedbackData = filterFeedback(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(feedbackData, (r) => r.businessUnit, (r) => r.responses);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value }));
    } else if (dimension === 'country') {
      const grouped = groupSum(feedbackData, (r) => r.country, (r) => r.responses);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value }));
    }
  } else if (measure === 'uniqueLearners') {
    const reachData = filterReach(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(reachData, (r) => r.businessUnit, (r) => r.uniqueLearners);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value }));
    } else if (dimension === 'country') {
      const grouped = groupSum(reachData, (r) => r.country, (r) => r.uniqueLearners);
      data = Array.from(grouped.entries()).map(([label, value]) => ({ label: label || 'Unknown', value }));
    }
  }

  // Sort and apply topN
  const isChronological = dimension === 'month' || dimension === 'year';
  if (!isChronological) {
    data.sort((a, b) => b.value - a.value);
    if (topN && data.length > topN) {
      data = data.slice(0, topN);
    }
  }

  // Apply privacy suppression
  const suppressedCount = data.filter(d => d.value < MIN_CELL_SIZE).length;
  if (suppressedCount > 0) {
    note = `Cells with fewer than ${MIN_CELL_SIZE} learners have been hidden for privacy.`;
    data = data.filter(d => d.value >= MIN_CELL_SIZE);
  }

  // Generate title
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
    program: 'Program',
    month: 'Month',
    year: 'Year',
  };

  const title = `${measureLabels[measure]} by ${dimensionLabels[dimension]}`;

  return {
    id: `${measure}-${dimension}-${Date.now()}`,
    kind,
    title,
    subtitle: fullFilters.years?.length ? `Year(s): ${fullFilters.years.join(', ')}` : undefined,
    dimension,
    measure,
    data,
    note,
    filtersApplied: fullFilters,
  };
}
