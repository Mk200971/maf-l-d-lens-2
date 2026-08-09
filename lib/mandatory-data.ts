// mandatory-data.ts
// SAMPLE DATA — hand-maintained. Replace with real exports when ready; see the
// "EDIT ME" markers below. No component changes are required to update this file.
//
// Sources this models (two exports, different grains, no shared key):
//   1) Completions report: Title, User ID, Full Name, E-mail, Business Entity,
//      Completion Status, Completion Date
//   2) Pending/assignment report: Item Title, User ID, Full Name, Business Entity,
//      E-mail, Organization ID, Job Location, Job Classification ID, Manager ID,
//      Manager Name, Manager E-mail
//
// Neither export carries an AMBU/DBU column, so BU is derived here from
// Business Entity via `businessEntityToBU`. This dashboard shows AGGREGATES
// ONLY — no learner names, emails, or manager rows are surfaced in the UI.

export type BU = 'AMBU' | 'DBU'

// ── EDIT ME ───────────────────────────────────────────────────────────────
// Every Business Entity value that appears in `mandatoryRows` must have an
// entry here. Rows with an unmapped entity fall back to "Unknown" and are
// flagged in the page's info banner instead of silently dropped.
export const businessEntityToBU: Record<string, BU> = {
  'MAFP Development': 'DBU',
  'MAFP Operations': 'DBU',
  'MAF Carrefour': 'AMBU',
  'MAF Ventures': 'AMBU',
  'MAF Leisure & Entertainment': 'AMBU',
  'Majid Al Futtaim Properties': 'DBU',
  'Majid Al Futtaim Retail': 'AMBU',
}

// One row per course x business entity x job location — the finest grain
// available. Every breakdown on the page (course, BU, entity, location,
// country) is summed from this array, so `pending` can never contradict
// `completed` — it is always derived, never stored.
export type MandatoryRow = {
  course: string
  businessEntity: string
  organization: string // e.g. "P Shopping Mall Development Egypt (PSMDEG)"
  jobLocation: string // e.g. "Cairo (CAI)"
  country: string
  assigned: number
  completed: number
}

// ── EDIT ME ───────────────────────────────────────────────────────────────
export const mandatoryRows: MandatoryRow[] = [
  // Data Privacy Awareness
  { course: 'Data Privacy Awareness', businessEntity: 'MAFP Development', organization: 'P Shopping Mall Development Egypt (PSMDEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 64, completed: 39 },
  { course: 'Data Privacy Awareness', businessEntity: 'MAFP Development', organization: 'P Shopping Mall Development UAE (PSMDAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 48, completed: 33 },
  { course: 'Data Privacy Awareness', businessEntity: 'MAFP Operations', organization: 'P Shopping Mall Operations UAE (PSMOAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 112, completed: 71 },
  { course: 'Data Privacy Awareness', businessEntity: 'Majid Al Futtaim Properties', organization: 'Properties Corporate (PROPCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 58, completed: 44 },
  { course: 'Data Privacy Awareness', businessEntity: 'MAF Carrefour', organization: 'Carrefour UAE Retail (CRFAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 210, completed: 118 },
  { course: 'Data Privacy Awareness', businessEntity: 'MAF Carrefour', organization: 'Carrefour Egypt Retail (CRFEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 165, completed: 87 },
  { course: 'Data Privacy Awareness', businessEntity: 'MAF Ventures', organization: 'Ventures Corporate (VENTCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 36, completed: 30 },
  { course: 'Data Privacy Awareness', businessEntity: 'MAF Leisure & Entertainment', organization: 'Leisure Oman (LEIOM)', jobLocation: 'Muscat (MCT)', country: 'Oman', assigned: 41, completed: 22 },

  // Sustainability E-learning
  { course: 'Sustainability E-learning', businessEntity: 'MAFP Development', organization: 'P Shopping Mall Development Egypt (PSMDEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 64, completed: 51 },
  { course: 'Sustainability E-learning', businessEntity: 'MAFP Development', organization: 'P Shopping Mall Development UAE (PSMDAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 48, completed: 40 },
  { course: 'Sustainability E-learning', businessEntity: 'MAFP Operations', organization: 'P Shopping Mall Operations UAE (PSMOAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 112, completed: 84 },
  { course: 'Sustainability E-learning', businessEntity: 'Majid Al Futtaim Properties', organization: 'Properties Corporate (PROPCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 58, completed: 49 },
  { course: 'Sustainability E-learning', businessEntity: 'MAF Carrefour', organization: 'Carrefour UAE Retail (CRFAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 210, completed: 142 },
  { course: 'Sustainability E-learning', businessEntity: 'MAF Carrefour', organization: 'Carrefour Egypt Retail (CRFEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 165, completed: 101 },
  { course: 'Sustainability E-learning', businessEntity: 'MAF Ventures', organization: 'Ventures Corporate (VENTCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 36, completed: 33 },
  { course: 'Sustainability E-learning', businessEntity: 'MAF Leisure & Entertainment', organization: 'Leisure Oman (LEIOM)', jobLocation: 'Muscat (MCT)', country: 'Oman', assigned: 41, completed: 29 },

  // Anti-Bribery & Corruption
  { course: 'Anti-Bribery & Corruption', businessEntity: 'MAFP Development', organization: 'P Shopping Mall Development Egypt (PSMDEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 64, completed: 28 },
  { course: 'Anti-Bribery & Corruption', businessEntity: 'MAFP Operations', organization: 'P Shopping Mall Operations UAE (PSMOAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 112, completed: 55 },
  { course: 'Anti-Bribery & Corruption', businessEntity: 'Majid Al Futtaim Properties', organization: 'Properties Corporate (PROPCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 58, completed: 41 },
  { course: 'Anti-Bribery & Corruption', businessEntity: 'MAF Carrefour', organization: 'Carrefour UAE Retail (CRFAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 210, completed: 96 },
  { course: 'Anti-Bribery & Corruption', businessEntity: 'MAF Carrefour', organization: 'Carrefour Egypt Retail (CRFEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 165, completed: 62 },
  { course: 'Anti-Bribery & Corruption', businessEntity: 'MAF Ventures', organization: 'Ventures Corporate (VENTCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 36, completed: 21 },
  { course: 'Anti-Bribery & Corruption', businessEntity: 'MAF Leisure & Entertainment', organization: 'Leisure Oman (LEIOM)', jobLocation: 'Muscat (MCT)', country: 'Oman', assigned: 41, completed: 14 },

  // Health & Safety Essentials
  { course: 'Health & Safety Essentials', businessEntity: 'MAFP Development', organization: 'P Shopping Mall Development UAE (PSMDAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 48, completed: 45 },
  { course: 'Health & Safety Essentials', businessEntity: 'MAFP Operations', organization: 'P Shopping Mall Operations UAE (PSMOAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 112, completed: 103 },
  { course: 'Health & Safety Essentials', businessEntity: 'MAF Carrefour', organization: 'Carrefour UAE Retail (CRFAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 210, completed: 188 },
  { course: 'Health & Safety Essentials', businessEntity: 'MAF Carrefour', organization: 'Carrefour Egypt Retail (CRFEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 165, completed: 140 },
  { course: 'Health & Safety Essentials', businessEntity: 'MAF Ventures', organization: 'Ventures Corporate (VENTCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 36, completed: 34 },
  { course: 'Health & Safety Essentials', businessEntity: 'MAF Leisure & Entertainment', organization: 'Leisure Oman (LEIOM)', jobLocation: 'Muscat (MCT)', country: 'Oman', assigned: 41, completed: 36 },

  // Code of Conduct Refresher
  { course: 'Code of Conduct Refresher', businessEntity: 'MAFP Development', organization: 'P Shopping Mall Development Egypt (PSMDEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 64, completed: 22 },
  { course: 'Code of Conduct Refresher', businessEntity: 'MAFP Operations', organization: 'P Shopping Mall Operations UAE (PSMOAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 112, completed: 47 },
  { course: 'Code of Conduct Refresher', businessEntity: 'Majid Al Futtaim Properties', organization: 'Properties Corporate (PROPCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 58, completed: 19 },
  { course: 'Code of Conduct Refresher', businessEntity: 'MAF Carrefour', organization: 'Carrefour UAE Retail (CRFAE)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 210, completed: 78 },
  { course: 'Code of Conduct Refresher', businessEntity: 'MAF Carrefour', organization: 'Carrefour Egypt Retail (CRFEG)', jobLocation: 'Cairo (CAI)', country: 'Egypt', assigned: 165, completed: 51 },
  { course: 'Code of Conduct Refresher', businessEntity: 'MAF Ventures', organization: 'Ventures Corporate (VENTCORP)', jobLocation: 'Dubai (DXB)', country: 'United Arab Emirates', assigned: 36, completed: 16 },
]

// Separate grain, sourced from Completion Date on the completions export.
// Values are completions recorded in that month, split by BU.
// ── EDIT ME ───────────────────────────────────────────────────────────────
export const completionsByMonth: { month: string; AMBU: number; DBU: number }[] = [
  { month: '2025-07', AMBU: 38, DBU: 19 },
  { month: '2025-08', AMBU: 52, DBU: 27 },
  { month: '2025-09', AMBU: 61, DBU: 34 },
  { month: '2025-10', AMBU: 74, DBU: 41 },
  { month: '2025-11', AMBU: 69, DBU: 48 },
  { month: '2025-12', AMBU: 88, DBU: 57 },
]

export const meta = {
  lastUpdated: '2026-08-09',
  source: 'Sample data seeded from LMS completions + pending assignment export format',
  isSampleData: true,
  coursesCount: new Set(mandatoryRows.map((r) => r.course)).size,
} as const
