// types.ts — Domain types for the AMBU & DBU Learning Dashboard
// v5 (2026-07-12):
//   • Removed avgNPS_PS + npsByProgram (weighted cross-BU NPS deprecated)
//   • Added npsByProgramBU (per-BU NPS only)
//   • Added BuTag alias for session-level classification (AMBU|DBU|Mixed)
//   • Added matchesBuFilter() and getPsNpsForActiveBu() helpers
//   • FilterState.sessions renamed to sessionIds to match filter-rules.ts

export type Bu = 'AMBU' | 'DBU';
/** Session-level BU tag — Mixed = shared cohorts (SLP/SLII/L2H). */
export type BuTag = 'AMBU' | 'DBU' | 'Mixed';
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
  | 'Lebanon';
export type Scale = '1-5' | '0-10';

/** NPS reported per BU for programs measured on 0-10 scale. */
export interface PsNpsByBU {
  AMBU: number | null;
  DBU: number | null;
}

export interface Meta {
  yearsCovered: number[];
  source: string;
  grainNote: string;
  note: string;
  scaleNote: string;
  /** Explanation of NPS reporting policy (per-BU only). */
  npsPolicy?: string;
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

  // Per-program breakdowns
  satisfactionRateByProgram: Record<string, number>;
  avgSatisfactionByProgram: Record<string, number>;

  /**
   * NPS reported PER BU only. Weighted cross-BU aggregate intentionally NOT computed —
   * mixing populations produces a misleading headline. Consumers should filter to a
   * single BU or show both AMBU and DBU tiles side-by-side.
   */
  npsByProgramBU: Record<string, PsNpsByBU>;
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

  /** Session-level NPS % — populated only when scale === '0-10'. */
  nps: number | null;
  scale: Scale;

  // BU & Session filtering
  bu: BuTag;                                // 'AMBU' | 'DBU' | 'Mixed'
  country: Country | string;                // Mode country across responses
  sessionId: string;                        // Stable: `${programCode}::${sessionLabel}::${month}`
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

export interface ProgramDistinctReach {
  programCode: string;
  uniqueLearners: number;
  scope: 'program-lifetime';
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

/**
 * Normalize any sub-metric (objectivesClarity, facilitatorEffectiveness,
 * confidenceApplication, recommendation) to 1-5.
 * PS rows store sub-metrics on the same 0-10 native scale as satisfaction.
 * Maps: 0→1, 10→5 linearly.
 */
export function normalizeSubMetric(value: number | null, scale: Scale): number | null {
  if (value == null) return null;
  if (scale === '0-10') return 1 + (value / 10) * 4;
  return value;
}

export function normalizedFacilitator(row: FeedbackRow): number | null {
  return normalizeSubMetric(row.facilitatorEffectiveness, row.scale);
}

export function normalizedObjectivesClarity(row: FeedbackRow): number | null {
  return normalizeSubMetric(row.objectivesClarity, row.scale);
}

export function normalizedConfidence(row: FeedbackRow): number | null {
  return normalizeSubMetric(row.confidenceApplication, row.scale);
}

export function normalizedRecommendation(row: FeedbackRow): number | null {
  return normalizeSubMetric(row.recommendation, row.scale);
}

// ---------------------------------------------------------------------------
// BU filter helper — respects Mixed semantics.
// ---------------------------------------------------------------------------

/**
 * Returns true if a feedback row matches the selected BU filter.
 * Selecting AMBU or DBU also includes Mixed sessions (shared cohorts had
 * attendees from both BUs). Selecting Mixed shows only Mixed sessions.
 */
export function matchesBuFilter(row: { bu: BuTag }, selectedBus: string[]): boolean {
  if (selectedBus.length === 0) return true;
  return selectedBus.some(chosen => {
    if (chosen === 'Mixed') return row.bu === 'Mixed';
    return row.bu === chosen || row.bu === 'Mixed';
  });
}

// ---------------------------------------------------------------------------
// PS NPS resolution — per BU only.
// ---------------------------------------------------------------------------

/**
 * Returns the PS NPS for the currently active BU filter.
 * Returns null when zero or multiple BUs are selected (by design — no
 * cross-BU weighted NPS is exposed). The dashboard should render "—" or
 * two side-by-side tiles in that case.
 */
export function getPsNpsForActiveBu(
  npsMap: Record<string, PsNpsByBU>,
  programCode: string,
  activeBus: string[]
): { bu: Bu; nps: number } | null {
  const entry = npsMap[programCode];
  if (!entry) return null;
  const singleBu = activeBus.filter((bu): bu is Bu => bu === 'AMBU' || bu === 'DBU');
  if (singleBu.length !== 1) return null;
  const bu = singleBu[0];
  const nps = entry[bu];
  return nps == null ? null : { bu, nps };
}

export type FilterKey =
  | 'year'
  | 'bu'
  | 'country'
  | 'role'
  | 'program'
  | 'session'
  | 'month';

export interface FilterState {
  years: number[];
  bus: string[];
  countries: string[];
  roles: string[];
  programs: string[];
  sessionIds: string[];
  monthRange: [string, string] | null;
}

/** Aggregated eligibility grain used by dashboard charts. */
export interface EligibilityRow {
  programCode: string;
  bu: string;
  country: string;
  role: string;
  eligible: number;
  completedEligible: number;
  completionRatePct: number;
}

/** Aggregated extras metric grain used by dashboard charts. */
export interface ExtrasMetric {
  programCode: string;
  metric: string;
  value: number;
  scaleMax: number;
  n: number;
}

// ---------------------------------------------------------------------------
// Voice of Learner — qualitative feedback themes & quotes
// ---------------------------------------------------------------------------

export interface VoiceOfLearnerQuote {
  text: string;
  sessionLabel: string | null;
  month: string | null;
  score: number | null;
  type?: 'strength' | 'improvement' | 'general';
}

export interface VoiceOfLearnerTheme {
  theme: string;
  count: number;
  sampleQuotes: VoiceOfLearnerQuote[];
}

export interface VoiceOfLearnerRow {
  programCode: string;
  programName: string;
  totalComments: number;
  strengthCount: number;
  improvementCount: number;
  generalCount: number;
  nonTrivialComments: number;
  themes: {
    strengths: VoiceOfLearnerTheme[];
    improvements: VoiceOfLearnerTheme[];
    allSentiment?: VoiceOfLearnerTheme[];  // For programs with only 'general' bucket
  };
  highlightQuotes: VoiceOfLearnerQuote[];
  concernQuotes: VoiceOfLearnerQuote[];
}
