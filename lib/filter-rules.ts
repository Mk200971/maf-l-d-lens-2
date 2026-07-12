// Single source of truth for which global filters apply on each page.
// Derived from the Filter -> Metric Traceability Matrix (section 8 of the spec).

import type { FilterKey } from './types'

export type PageId =
  | 'overview'
  | 'programs'
  | 'learners'
  | 'feedback'
  | 'eligibility'
  | 'extras'

export const ALL_FILTERS: FilterKey[] = ['year', 'bu', 'country', 'role', 'program', 'month', 'session']

export const pageFilterRules: Record<PageId, FilterKey[]> = {
  overview: ['year', 'bu', 'country', 'role', 'program', 'month'],
  programs: ['year', 'bu', 'country', 'role', 'program', 'month'],
  learners: ['year', 'bu', 'country', 'role', 'program', 'month'],
  feedback: ['year', 'bu', 'country', 'program', 'session', 'month'],
  eligibility: ['program'],
  extras: ['program'],
}

export const pageBanners: Partial<Record<PageId, string>> = {
  feedback:
    'Feedback is anonymous session-level. Filter by BU (includes Mixed cohorts), Country, Program, or Session.',
  eligibility:
    'Completion rate is computed against the eligibility list per program. Slice by program only.',
  extras: 'Extras are program-level rollups. Slice by program only.',
}

export const disabledFilterTooltip =
  "This filter doesn't apply here — data is aggregated at program level."

// Per-chart rules for components that are stricter than their page
export const filterRules = {
  'overview.hoursByMonth': ['year', 'bu', 'country', 'role', 'program', 'month'],
  'overview.satisfactionKpi': ['year', 'program', 'month'],
  'overview.completionRateKpi': ['program'],
  'programs.detail.delivery': ['year', 'bu', 'country', 'role', 'month'],
  'programs.detail.feedback': ['year', 'month'],
  'programs.detail.eligibility': [],
  'programs.detail.extras': [],
  'eligibility.completionByProgram': ['program'],
  'extras.metricTable': ['program'],
} as const
