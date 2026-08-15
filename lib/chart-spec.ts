import { z } from 'zod';

export type ChartSpec = {
  id: string;
  kind: 'bar' | 'line' | 'pie' | 'kpi';
  title: string;
  subtitle?: string;
  dimension: 'bu' | 'country' | 'role' | 'program' | 'month' | 'year';
  measure: 'hours' | 'completions' | 'satisfaction' | 'satisfactionRate' | 'nps'
         | 'responses' | 'completionRate' | 'uniqueLearners';
  unit?: string;
  data: { label: string; value: number }[];
  note?: string;
  filtersApplied: Record<string, unknown>;
};

export const chartSpecSchema = z.object({
  id: z.string(),
  kind: z.enum(['bar', 'line', 'pie', 'kpi']),
  title: z.string(),
  subtitle: z.string().optional(),
  dimension: z.enum(['bu', 'country', 'role', 'program', 'month', 'year']),
  measure: z.enum(['hours', 'completions', 'satisfaction', 'satisfactionRate', 'nps', 'responses', 'completionRate', 'uniqueLearners']),
  unit: z.string().optional(),
  data: z.array(z.object({ label: z.string(), value: z.number() })),
  note: z.string().optional(),
  filtersApplied: z.record(z.unknown()),
});
