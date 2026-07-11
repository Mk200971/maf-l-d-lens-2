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
import { learnerReach } from './dashboard-data.extended'
import { completion as realCompletion } from './dashboard-data.completion'
import type {
  ExtrasMetric,
  FeedbackRow,
  Kpis,
  LearningHoursRow,
  Program,
  BU,
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
  totalLearningHours: rawKpis.totalLearningHours,
  learningHoursByBU: rawKpis.learningHoursByBU as Record<BU, number>,
  totalCompletions: rawKpis.totalCompletions,
  completionsByBU: rawKpis.completionsByBU as Record<BU, number>,
  uniqueLearners: rawKpis.uniqueLearners,
  uniqueLearnersByBU: rawKpis.uniqueLearnersByBU as Record<BU, number>,
  avgSatisfaction: rawKpis.avgSatisfaction,
  feedbackResponses: rawKpis.feedbackResponses,
  // Computed from the completion file (post-walk-in figures)
  eligible: realCompletion.reduce((s, r) => s + r.eligible, 0),
  completedEligible: realCompletion.reduce((s, r) => s + r.completedEligible, 0),
  completionRatePct: rawKpis.completionRatePct,
  programsActive: rawPrograms.length,
  newIn2026: rawPrograms.filter((p) => p.year === 2026).length,
}

// ---------------------------------------------------------------------------
// programs — map displayName → name
// ---------------------------------------------------------------------------
export const programs: Program[] = rawPrograms.map((p) => ({
  code: p.code,
  name: p.displayName,
  year: p.year,
  buScope: p.buScope as Program['buScope'],
  hasFeedback: p.hasFeedback,
  hasEligibility: p.hasEligibility,
  hasExtras: p.hasExtras,
}))

// ---------------------------------------------------------------------------
// learningHours — map totalHours → hours
// ---------------------------------------------------------------------------
export const learningHours: LearningHoursRow[] = rawLearningHours.map((r) => ({
  programCode: r.programCode,
  year: r.year,
  month: r.month,
  bu: r.bu as BU,
  country: r.country,
  role: r.role,
  completions: r.completions,
  hours: r.totalHours,
}))

// ---------------------------------------------------------------------------
// feedback — add sessionPart; treat null numerics as 0 for optional metrics
// ---------------------------------------------------------------------------
export const feedback: FeedbackRow[] = rawFeedback.map((r) => ({
  programCode: r.programCode,
  sessionLabel: r.sessionLabel,
  month: r.month,
  responses: r.responses,
  satisfaction: r.satisfaction ?? 0,
  objectivesClarity: r.objectivesClarity ?? 0,
  facilitatorEffectiveness: r.facilitatorEffectiveness ?? 0,
  confidenceApplication: r.confidenceApplication ?? 0,
  recommendation: r.recommendation ?? 0,
  recommendationRatePct: r.recommendationRatePct ?? 0,
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
