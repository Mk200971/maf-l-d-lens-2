// =============================================================================
// dashboard-data.ts — PLACEHOLDER
// Replace this file's exports with your real dashboard-data.ts when ready.
// learningHours[] and feedback[] below are DERIVED/SYNTHESIZED from the
// extended grain + spec totals so the app is fully functional today.
// completion[] is REAL — imported from dashboard-data.completion.ts.
// kpis are the exact contract values from the spec.
// =============================================================================

import { learnerReach } from './dashboard-data.extended'
import { completion as realCompletion } from './dashboard-data.completion'
import type {
  CompletionRow,
  ExtrasMetric,
  FeedbackRow,
  Kpis,
  LearningHoursRow,
  Program,
} from './types'

// ---------------------------------------------------------------------------
// programs[] — 12 programs, 6 new in 2026
// ---------------------------------------------------------------------------
export const programs: Program[] = [
  { code: 'SLP', name: 'Store Leadership Program', year: 2025, buScope: 'AMBU+DBU', hasFeedback: true, hasEligibility: true, hasExtras: true },
  { code: 'SLII', name: 'Situational Leadership II', year: 2025, buScope: 'AMBU+DBU', hasFeedback: true, hasEligibility: true, hasExtras: true },
  { code: 'L2H', name: 'Licensed to Hire', year: 2025, buScope: 'AMBU+DBU', hasFeedback: true, hasEligibility: true, hasExtras: true },
  { code: 'VIP', name: 'VIP Program', year: 2025, buScope: 'DBU', hasFeedback: true, hasEligibility: true, hasExtras: true },
  { code: 'TEN', name: 'TEN Leadership Series', year: 2024, buScope: 'AMBU+DBU', hasFeedback: false, hasEligibility: true, hasExtras: false },
  { code: '2026:MAFP_Psychological_Safety', name: 'Psychological Safety', year: 2026, buScope: 'AMBU+DBU', hasFeedback: true, hasEligibility: true, hasExtras: false },
  { code: '2026:MAFP_Rise_Mall_management', name: 'Rise – Mall Management', year: 2026, buScope: 'AMBU+DBU', hasFeedback: true, hasEligibility: true, hasExtras: false },
  { code: '2026:MAF_AMBU_Resilience_Sessions', name: 'Resilience Sessions', year: 2026, buScope: 'AMBU', hasFeedback: true, hasEligibility: true, hasExtras: false },
  { code: '2026:MAF_AMBU_Path', name: 'PATH', year: 2026, buScope: 'AMBU', hasFeedback: true, hasEligibility: true, hasExtras: false },
  { code: '2026:MAF_DBU_Lean_Fundamentals', name: 'Lean Fundamentals', year: 2026, buScope: 'DBU', hasFeedback: true, hasEligibility: true, hasExtras: false },
  { code: '2026:MAF_DBU_6Thinking_Hats', name: '6 Thinking Hats', year: 2026, buScope: 'DBU', hasFeedback: true, hasEligibility: true, hasExtras: false },
  { code: '2026:Managing_Virtual_Effectively', name: 'Managing Virtually Effectively', year: 2026, buScope: 'AMBU+DBU', hasFeedback: true, hasEligibility: false, hasExtras: false },
]

// ---------------------------------------------------------------------------
// kpis — exact contract values from the data contract
// ---------------------------------------------------------------------------
export const kpis: Kpis = {
  totalLearningHours: 9918,
  learningHoursByBU: { AMBU: 5884, DBU: 4010, Unknown: 24 },
  totalCompletions: 1557,
  completionsByBU: { AMBU: 1052, DBU: 502, Unknown: 3 },
  uniqueLearners: 912,
  uniqueLearnersByBU: { AMBU: 559, DBU: 350, Unknown: 3 },
  avgSatisfaction: 4.6,
  feedbackResponses: 1305,
  eligible: 1659,
  completedEligible: 1269,
  completionRatePct: 76.5,
  programsActive: 12,
  newIn2026: 6,
}

export const meta = {
  grainNote:
    'Feedback is anonymous session-level — BU/Country/Role filters do not apply to feedback cards.',
  completionNote:
    'Completion rate is computed against the eligibility list per program. Slice by program only.',
}

// ---------------------------------------------------------------------------
// learningHours[] — DERIVED from learnerReach grain, scaled to contract totals
// ---------------------------------------------------------------------------
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) / 4294967295
}

const rawRows = learnerReach.map((r) => {
  const seed = hash(`${r.programCode}|${r.month}|${r.bu}|${r.country}|${r.role}`)
  const hoursPerLearner = 4 + seed * 10 // 4–14h per learner
  return {
    programCode: r.programCode,
    year: r.year,
    month: r.month,
    bu: (r.bu === 'AMBU' || r.bu === 'DBU' ? r.bu : 'Unknown') as 'AMBU' | 'DBU' | 'Unknown',
    country: r.country,
    role: r.role,
    rawHours: r.uniqueLearners * hoursPerLearner,
    rawCompletions: r.uniqueLearners * (0.6 + seed * 0.4),
  }
})

const targets = {
  AMBU: { hours: 5884, completions: 1052 },
  DBU: { hours: 4010, completions: 502 },
  Unknown: { hours: 24, completions: 3 },
}

const buSums: Record<string, { hours: number; completions: number }> = {}
for (const r of rawRows) {
  buSums[r.bu] ??= { hours: 0, completions: 0 }
  buSums[r.bu].hours += r.rawHours
  buSums[r.bu].completions += r.rawCompletions
}

export const learningHours: LearningHoursRow[] = rawRows.map((r) => {
  const t = targets[r.bu] ?? targets.Unknown
  const s = buSums[r.bu]
  return {
    programCode: r.programCode,
    year: r.year,
    month: r.month,
    bu: r.bu,
    country: r.country,
    role: r.role,
    hours: Math.round((r.rawHours / s.hours) * t.hours * 10) / 10,
    completions: Math.round((r.rawCompletions / s.completions) * t.completions),
  }
})

// One "Unknown" row so the BU donut matches the contract (24h / 3 completions)
if (!buSums.Unknown) {
  learningHours.push({
    programCode: 'SLP',
    year: 2025,
    month: '2025-06',
    bu: 'Unknown',
    country: 'United Arab Emirates',
    role: 'N/A',
    hours: 24,
    completions: 3,
  })
}

// ---------------------------------------------------------------------------
// completion[] — REAL: from dashboard-data.completion.ts (post SLP walk-ins)
// ---------------------------------------------------------------------------
export const completion: CompletionRow[] = realCompletion

// ---------------------------------------------------------------------------
// feedback[] — SYNTHESIZED session-level rows (replace with real file)
// ---------------------------------------------------------------------------
const feedbackPrograms = programs.filter((p) => p.hasFeedback)

function monthsForProgram(code: string): (string | null)[] {
  if (code === 'VIP') return [null, null, null] // VIP quirk: month is null
  const months = Array.from(
    new Set(learnerReach.filter((r) => r.programCode === code).map((r) => r.month)),
  ).sort()
  return months.length > 0 ? months : ['2025-06']
}

export const feedback: FeedbackRow[] = feedbackPrograms.flatMap((p) => {
  const months = monthsForProgram(p.code)
  return months.flatMap((month, mi) => {
    const sessionsInMonth = p.code === 'SLP' || p.code === 'SLII' ? 3 : 2
    return Array.from({ length: sessionsInMonth }, (_, si) => {
      const seed = hash(`${p.code}|${month ?? 'undated'}|${si}`)
      const sat = Math.round((3.9 + seed * 1.1) * 100) / 100
      return {
        programCode: p.code,
        sessionLabel: `${p.name} — ${month ?? 'Undated'} S${mi * sessionsInMonth + si + 1}`,
        month,
        responses: Math.max(4, Math.round(6 + seed * 24)),
        satisfaction: sat,
        objectivesClarity: Math.round((sat - 0.1 + seed * 0.2) * 100) / 100,
        facilitatorEffectiveness: Math.min(5, Math.round((sat + 0.15) * 100) / 100),
        confidenceApplication: Math.round((sat - 0.25) * 100) / 100,
        recommendation: Math.round((sat - 0.05) * 100) / 100,
        recommendationRatePct: Math.round((78 + seed * 22) * 10) / 10,
      }
    })
  })
})

// ---------------------------------------------------------------------------
// extras[] — quality signals per contract (SLP, SLII, L2H, VIP)
// ---------------------------------------------------------------------------
export const extras: ExtrasMetric[] = [
  // SLP skill uplift showcase
  { programCode: 'SLP', metric: 'Skill (Before)', value: 2.96, scaleMax: 5, n: 112 },
  { programCode: 'SLP', metric: 'Skill (After)', value: 4.39, scaleMax: 5, n: 112 },
  { programCode: 'SLP', metric: 'Catering', value: 4.31, scaleMax: 5, n: 108 },
  { programCode: 'SLP', metric: 'Venue', value: 4.52, scaleMax: 5, n: 108 },
  { programCode: 'SLP', metric: 'Engagement', value: 4.61, scaleMax: 5, n: 110 },
  { programCode: 'SLP', metric: 'Valuable', value: 4.7, scaleMax: 5, n: 110 },
  { programCode: 'SLII', metric: 'Catering', value: 4.18, scaleMax: 5, n: 86 },
  { programCode: 'SLII', metric: 'Venue', value: 4.4, scaleMax: 5, n: 86 },
  { programCode: 'SLII', metric: 'Engagement', value: 4.55, scaleMax: 5, n: 88 },
  { programCode: 'SLII', metric: 'Valuable', value: 4.62, scaleMax: 5, n: 88 },
  { programCode: 'L2H', metric: 'Engagement', value: 4.47, scaleMax: 5, n: 34 },
  { programCode: 'L2H', metric: 'Valuable', value: 4.58, scaleMax: 5, n: 34 },
  { programCode: 'VIP', metric: 'Apply Knowledge', value: 0.9, scaleMax: 1, n: 41 },
  { programCode: 'VIP', metric: 'Share Knowledge', value: 0.95, scaleMax: 1, n: 41 },
]
