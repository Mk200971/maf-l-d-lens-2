// types.ts — Domain types for the AMBU & DBU Learning Dashboard
// Updated 2026-07-12: added Scale union, satisfactionRatePct/nps fields,
// PS-specific KPIs, and eligibilityByProgram grain.

export type Bu = 'AMBU' | 'DBU' | 'Unknown';
export type BuScope = 'AMBU' | 'DBU' | 'AMBU+DBU';
export type Role =
  | 'Individual Contributor'
  | 'Team Leader'
  | 'Business Leader'
  | 'Expert'
  | 'Customer Ambassador'
  | 'N/A';
export type Country =
  | 'United Arab Emirates'
  | 'Egypt'
  | 'Oman'
  | 'Bahrain'
  | 'Lebanon'
  | 'Unknown';
export type Scale = '1-5' | '0-10';

export interface Meta {
  yearsCovered: number[];
  source: string;
  grainNote: string;
  note: string;
  scaleNote: string;
}

export interface Kpis {
  // Delivery
  totalLearningHours: number;
  totalCompletions: number;
  uniqueLearners: number;
  programsCount: number;
  feedbackResponses: number;
  learningHoursByBU: Record<Bu, number>;
  completionsByBU: Record<Bu, number>;
  uniqueLearnersByBU: Record<Bu, number>;

  // Completion
  completionRatePct: number;

  // Satisfaction — 1-5 scale programs
  avgSatisfaction: number;               // response-weighted mean, 1-5 scale only
  satisfactionRatePct: number;           // Top-2-Box % (satisfaction >= 4) for 1-5 programs

  // Satisfaction — Psychological Safety (0-10 native)
  avgSatisfaction_PS_native: number | null;      // 0-10 native scale
  avgSatisfaction_PS_normalized: number | null;  // rescaled to 1-5 for display comparison
  satisfactionRatePct_PS: number | null;         // Top-2-Box % (satisfaction >= 9)
  avgNPS_PS: number | null;                      // Program NPS % (Promoters - Detractors)

  // Per-program breakdowns
  satisfactionRateByProgram: Record<string, number>;
  avgSatisfactionByProgram: Record<string, number>;
  npsByProgram: Record<string, number>;
}

export interface Program {
  code: string;
  displayName: string;
  year: number;
  buScope: BuScope;
  hasFeedback: boolean;
  hasEligibility: boolean;
  hasExtras: boolean;
}

export interface LearningHoursRow {
  programCode: string;
  program: string;
  year: number;
  bu: Bu;
  country: Country | string;
  role: Role | string;
  month: string | null;
  completions: number;
  totalHours: number;
}

export interface FeedbackRow {
  programCode: string;
  sessionLabel: string;
  sessionPart: string;
  month: string | null;
  responses: number;

  // Satisfaction fields — respect the scale!
  satisfaction: number | null;              // native (0-10 for PS, 1-5 elsewhere)
  satisfactionNormalized: number | null;    // always on 1-5 scale for display
  satisfactionRatePct: number | null;       // top-2-box on native scale

  // Other dimensions
  objectivesClarity: number | null;
  facilitatorEffectiveness: number | null;
  confidenceApplication: number | null;     // For PS: Action Plan Commitment
  recommendation: number | null;
  recommendationRatePct: number | null;

  // NPS (only populated when scale === '0-10')
  nps: number | null;

  scale: Scale;
}

export interface CompletionRow {
  programCode: string;
  eligible: number;
  completedEligible: number;
  completionRatePct: number;
}

export interface ExtrasRow {
  programCode: string;
  metric: string;
  mean: number;
  n: number;
}

export interface LearnerReachRow {
  programCode: string;
  year: number;
  month: string | null;
  bu: Bu | string;
  country: Country | string;
  role: Role | string;
  uniqueLearners: number;
}

export interface EligibilityByProgramRow {
  programCode: string;
  bu: Bu | string;
  country: Country | string;
  role: Role | string;
  eligible: number;
  completedEligible: number;
  completionRatePct: number;
}

// ---------------------------------------------------------------------------
// Scale-aware helpers — use these EVERYWHERE you display satisfaction data.
// ---------------------------------------------------------------------------

/** Format a satisfaction score with its native unit ("4.72 / 5" or "8.89 / 10"). */
export function formatSatisfaction(row: FeedbackRow): string {
  if (row.satisfaction == null) return '—';
  return `${row.satisfaction} / ${row.scale === '0-10' ? '10' : '5'}`;
}

/** Get the satisfaction value normalized to 1-5 scale for cross-program comparison. */
export function normalizedSatisfaction(row: FeedbackRow): number | null {
  return row.satisfactionNormalized;
}

/** Get the top-2-box threshold for a given scale. */
export function topBoxThreshold(scale: Scale): number {
  return scale === '0-10' ? 9 : 4;
}
