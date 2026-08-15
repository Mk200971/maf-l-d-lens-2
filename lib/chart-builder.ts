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
      const grouped = groupSum(hoursData, 'businessUnit', 'totalHours');
      data = grouped.map(g => ({ label: g.businessUnit || 'Unknown', value: Number(g.totalHours.toFixed(1)) }));
    } else if (dimension === 'country') {
      const grouped = groupSum(hoursData, 'country', 'totalHours');
      data = grouped.map(g => ({ label: g.country || 'Unknown', value: Number(g.totalHours.toFixed(1)) }));
    } else if (dimension === 'role') {
      const grouped = groupSum(hoursData, 'roleFamily', 'totalHours');
      data = grouped.map(g => ({ label: g.roleFamily || 'Unknown', value: Number(g.totalHours.toFixed(1)) }));
    } else if (dimension === 'program') {
      const grouped = groupSum(hoursData, 'programCode', 'totalHours');
      data = grouped.map(g => ({ label: programName(g.programCode), value: Number(g.totalHours.toFixed(1)) }));
    } else if (dimension === 'month') {
      const grouped = groupSum(hoursData, 'month', 'totalHours');
      data = grouped.sort((a, b) => a.month.localeCompare(b.month)).map(g => ({ label: g.month, value: Number(g.totalHours.toFixed(1)) }));
    } else if (dimension === 'year') {
      const grouped = groupSum(hoursData, 'year', 'totalHours');
      data = grouped.sort((a, b) => String(a.year).localeCompare(String(b.year))).map(g => ({ label: String(g.year), value: Number(g.totalHours.toFixed(1)) }));
    }
  } else if (measure === 'completions') {
    const completionsData = filterCompletion(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(completionsData, 'businessUnit', 'completions');
      data = grouped.map(g => ({ label: g.businessUnit || 'Unknown', value: g.completions }));
    } else if (dimension === 'country') {
      const grouped = groupSum(completionsData, 'country', 'completions');
      data = grouped.map(g => ({ label: g.country || 'Unknown', value: g.completions }));
    } else if (dimension === 'role') {
      const grouped = groupSum(completionsData, 'roleFamily', 'completions');
      data = grouped.map(g => ({ label: g.roleFamily || 'Unknown', value: g.completions }));
    } else if (dimension === 'program') {
      const grouped = groupSum(completionsData, 'programCode', 'completions');
      data = grouped.map(g => ({ label: programName(g.programCode), value: g.completions }));
    }
  } else if (measure === 'satisfaction' || measure === 'satisfactionRate') {
    const feedbackData = filterFeedback(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(feedbackData, 'businessUnit', 'responses');
      data = grouped.map(g => {
        const subset = feedbackData.filter(f => f.businessUnit === g.businessUnit);
        const rate = measure === 'satisfactionRate' ? avgSatRatePct(subset) : normalizedAvgSat(subset);
        return { label: g.businessUnit || 'Unknown', value: Number(rate.toFixed(1)) };
      });
    } else if (dimension === 'country') {
      const grouped = groupSum(feedbackData, 'country', 'responses');
      data = grouped.map(g => {
        const subset = feedbackData.filter(f => f.country === g.country);
        const rate = measure === 'satisfactionRate' ? avgSatRatePct(subset) : normalizedAvgSat(subset);
        return { label: g.country || 'Unknown', value: Number(rate.toFixed(1)) };
      });
    } else if (dimension === 'program') {
      const grouped = groupSum(feedbackData, 'programCode', 'responses');
      data = grouped.map(g => {
        const subset = feedbackData.filter(f => f.programCode === g.programCode);
        const rate = measure === 'satisfactionRate' ? avgSatRatePct(subset) : normalizedAvgSat(subset);
        return { label: programName(g.programCode), value: Number(rate.toFixed(1)) };
      });
    }
  } else if (measure === 'nps') {
    const feedbackData = filterFeedback(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(feedbackData, 'businessUnit', 'responses');
      data = grouped.map(g => {
        const subset = feedbackData.filter(f => f.businessUnit === g.businessUnit);
        const npsVal = avgNps(subset);
        return { label: g.businessUnit || 'Unknown', value: npsVal != null ? Number(npsVal.toFixed(1)) : 0 };
      });
    } else if (dimension === 'country') {
      const grouped = groupSum(feedbackData, 'country', 'responses');
      data = grouped.map(g => {
        const subset = feedbackData.filter(f => f.country === g.country);
        const npsVal = avgNps(subset);
        return { label: g.country || 'Unknown', value: npsVal != null ? Number(npsVal.toFixed(1)) : 0 };
      });
    }
  } else if (measure === 'responses') {
    const feedbackData = filterFeedback(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(feedbackData, 'businessUnit', 'responses');
      data = grouped.map(g => ({ label: g.businessUnit || 'Unknown', value: g.responses }));
    } else if (dimension === 'country') {
      const grouped = groupSum(feedbackData, 'country', 'responses');
      data = grouped.map(g => ({ label: g.country || 'Unknown', value: g.responses }));
    }
  } else if (measure === 'uniqueLearners') {
    const reachData = filterReach(fullFilters);
    if (dimension === 'bu') {
      const grouped = groupSum(reachData, 'businessUnit', 'uniqueLearners');
      data = grouped.map(g => ({ label: g.businessUnit || 'Unknown', value: g.uniqueLearners }));
    } else if (dimension === 'country') {
      const grouped = groupSum(reachData, 'country', 'uniqueLearners');
      data = grouped.map(g => ({ label: g.country || 'Unknown', value: g.uniqueLearners }));
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
