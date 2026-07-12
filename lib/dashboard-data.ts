// dashboard-data.ts — normalisation shim over the generated raw file.
// Components import from here using the field names in lib/types.ts.
// Do NOT hand-edit dashboard-data.raw.ts — regenerate from the pipeline.

import {
  meta as rawMeta,
  kpis as rawKpis,
  programs as rawPrograms,
  learningHours as rawLearningHours,
  feedback as rawFeedback,
  extras as rawExtras,
} from './dashboard-data.raw'
import { learnerReach, completion as realCompletion } from './dashboard-data.raw'
import type {
  Bu,
  ExtrasMetric,
  FeedbackRow,
  Kpis,
  LearningHoursRow,
  Program,
} from './types'

// ---------------------------------------------------------------------------
// meta
// ---------------------------------------------------------------------------
export const meta = rawMeta

// ---------------------------------------------------------------------------
// kpis — raw shape matches almost exactly; patch in the extra fields our
// Kpis interface needs (eligible / completedEligible / programsActive / newIn2026)
// ---------------------------------------------------------------------------
export const kpis: Kpis = {
  // Delivery
  totalLearningHours: rawKpis.totalLearningHours,
  learningHoursByBU: rawKpis.learningHoursByBU as Record<Bu, number>,
  totalCompletions: rawKpis.totalCompletions,
  completionsByBU: rawKpis.completionsByBU as Record<Bu, number>,
  uniqueLearners: rawKpis.uniqueLearners,
  uniqueLearnersByBU: rawKpis.uniqueLearnersByBU as Record<Bu, number>,
  programsCount: rawKpis.programsCount,
  feedbackResponses: rawKpis.feedbackResponses,
  // Completion
  completionRatePct: rawKpis.completionRatePct,
  // Satisfaction — 1-5 programs
  avgSatisfaction: rawKpis.avgSatisfaction,
  satisfactionRatePct: rawKpis.satisfactionRatePct,
  // Satisfaction — Psychological Safety (0-10)
  avgSatisfaction_PS_native: rawKpis.avgSatisfaction_PS_native,
  avgSatisfaction_PS_normalized: rawKpis.avgSatisfaction_PS_normalized,
  satisfactionRatePct_PS: rawKpis.satisfactionRatePct_PS,
  avgNPS_PS: rawKpis.avgNPS_PS,
  // Per-program breakdowns
  satisfactionRateByProgram: rawKpis.satisfactionRateByProgram as Record<string, number>,
  avgSatisfactionByProgram: rawKpis.avgSatisfactionByProgram as Record<string, number>,
  npsByProgram: rawKpis.npsByProgram as Record<string, number>,
}

// ---------------------------------------------------------------------------
// programs — pass through directly (raw uses displayName)
// ---------------------------------------------------------------------------
export const programs: Program[] = rawPrograms.map((p) => ({
  code: p.code,
  displayName: p.displayName,
  year: p.year,
  buScope: p.buScope as Program['buScope'],
  hasFeedback: p.hasFeedback,
  hasEligibility: p.hasEligibility,
  hasExtras: p.hasExtras,
}))

// ---------------------------------------------------------------------------
// learningHours — map totalHours → hours; add program display name
// ---------------------------------------------------------------------------
export const learningHours: LearningHoursRow[] = rawLearningHours.map((r) => ({
  programCode: r.programCode,
  program: r.programCode, // display label; components can look up displayName via programName()
  year: r.year,
  month: r.month,
  bu: r.bu as Bu,
  country: r.country,
  role: r.role,
  completions: r.completions,
  totalHours: r.totalHours,
}))

// ---------------------------------------------------------------------------
// feedback — pass through new scale-aware fields; keep null for optional metrics
// ---------------------------------------------------------------------------
export const feedback: FeedbackRow[] = rawFeedback.map((r) => ({
  programCode: r.programCode,
  sessionLabel: r.sessionLabel,
  sessionPart: (r as any).sessionPart ?? '',
  month: r.month,
  responses: r.responses,
  scale: r.scale as import('./types').Scale,
  satisfaction: r.satisfaction ?? null,
  satisfactionNormalized: r.satisfactionNormalized ?? null,
  satisfactionRatePct: r.satisfactionRatePct ?? null,
  nps: r.nps ?? null,
  objectivesClarity: r.objectivesClarity ?? null,
  facilitatorEffectiveness: r.facilitatorEffectiveness ?? null,
  confidenceApplication: r.confidenceApplication ?? null,
  recommendation: r.recommendation ?? null,
  recommendationRatePct: r.recommendationRatePct ?? null,
}))

// ---------------------------------------------------------------------------
// extras — map mean → value, infer scaleMax from metric semantics
// Rate metrics (0-1 range): Apply Knowledge, Perf Increase, Share Knowledge,
// and any metric whose value is clearly ≤ 1 and not a skill score.
// Everything else is a 5-point Likert scale.
// ---------------------------------------------------------------------------
const RATE_METRICS = new Set(['Apply Knowledge', 'Perf Increase', 'Share Knowledge'])

function inferScaleMax(metric: string, mean: number): number {
  if (RATE_METRICS.has(metric)) return 1
  if (metric.startsWith('Avg Skill') || metric.startsWith('Skill (')) return 5
  if (mean <= 1) return 1
  return 5
}

export const extras: ExtrasMetric[] = rawExtras.map((r) => ({
  programCode: r.programCode,
  metric: r.metric,
  value: r.mean,
  scaleMax: inferScaleMax(r.metric, r.mean),
  n: r.n,
}))

// ---------------------------------------------------------------------------
// completion — use the dedicated post-walk-in file as the authoritative source
// ---------------------------------------------------------------------------
export const completion = realCompletion

// Re-export extended grain (aggregate.ts imports it from here)
export { learnerReach }
