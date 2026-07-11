// Shared data contracts for the MAF L&D dashboard.

export type BU = 'AMBU' | 'DBU' | 'Unknown'

export interface LearningHoursRow {
  programCode: string
  year: number
  month: string // "YYYY-MM"
  bu: BU
  country: string
  role: string
  hours: number
  completions: number
}

export interface FeedbackRow {
  programCode: string
  sessionLabel: string
  month: string | null // VIP rows can be null
  responses: number
  satisfaction: number
  objectivesClarity: number
  facilitatorEffectiveness: number
  confidenceApplication: number
  recommendation: number
  recommendationRatePct: number
}

export interface CompletionRow {
  programCode: string
  eligible: number
  completedEligible: number
  completionRatePct: number
}

export interface ExtrasMetric {
  programCode: string
  metric: string
  value: number
  scaleMax: number // 5 for likert, 1 for rates
  n: number
}

export interface Program {
  code: string
  name: string
  year: number
  buScope: 'AMBU' | 'DBU' | 'AMBU+DBU'
  hasFeedback: boolean
  hasEligibility: boolean
  hasExtras: boolean
}

export interface Kpis {
  totalLearningHours: number
  learningHoursByBU: Record<BU, number>
  totalCompletions: number
  completionsByBU: Record<BU, number>
  uniqueLearners: number
  uniqueLearnersByBU: Record<BU, number>
  avgSatisfaction: number
  feedbackResponses: number
  eligible: number
  completedEligible: number
  completionRatePct: number
  programsActive: number
  newIn2026: number
}

// Extended (PII-free) grain
export interface LearnerReachRow {
  programCode: string
  year: number
  month: string
  bu: string
  country: string
  role: string
  uniqueLearners: number
}

export interface EligibilityRow {
  programCode: string
  bu: string
  country: string
  role: string
  eligible: number
  completedEligible: number
  completionRatePct: number
}

export type FilterKey = 'year' | 'bu' | 'country' | 'role' | 'program' | 'month'

export interface FilterState {
  years: number[]
  bus: string[]
  countries: string[]
  roles: string[]
  programs: string[]
  monthRange: [string, string] | null // inclusive "YYYY-MM" bounds
}
