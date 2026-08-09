// mandatory-data.ts
// GENERATED 2026-08-09 from the two LMS mandatory-learning exports
//   "MAFP Asset Management Mandatory Learnings - 06-08-2026.xlsx" (AMBU)
//   "MAFP Development Mandatory Learnings - 06-08-2026.xlsx"      (DBU)
// Real data — replaces the earlier hand-seeded sample. AGGREGATES ONLY: no
// learner names, emails, or manager rows are surfaced. All counts reconcile
// to each workbook's Summary sheet.
//
// IMPORTANT — grain note (why the shape changed from the sample):
// The two source exports have DIFFERENT columns and no shared location key:
//   • Completed export: Title, User ID, Full Name, E-mail, Business Entity,
//     Completion Status, Completion Date   — NO organization / location / country.
//   • Pending export:   Item Title, User ID, ..., Organization ID, Job Location,
//     Manager fields                        — HAS organization / location.
// So COMPLETED counts exist only at course x BU (and by month), while a
// location / country breakdown is available for PENDING learners only. The
// sample's completed-by-location split did not exist in the real data and was
// not reproduced. `mandatoryRows` is course x BU; `pendingByLocation` carries
// the location grain (pending only).

export type BU = 'AMBU' | 'DBU'

// Business Entity -> BU. The real exports carry exactly two entities.
export const businessEntityToBU: Record<string, BU> = {
  'MAFP Asset Management': 'AMBU',
  'MAFP Development': 'DBU',
}

// Mandatory courses present in the current exports (3).
export const courses = [
  "Data Privacy Awareness",
  "Information Security Awareness",
  "Sustainability E-learning"
] as const

// ── Course x BU rollup — the authoritative completion grain ────────────────
// assigned = completed + pending. completed/pending come straight from the
// Completed / Pending sheets and reconcile to each file's Summary tab.
export type MandatoryRow = {
  course: string
  businessEntity: string
  bu: BU
  assigned: number
  completed: number
  pending: number
  completionRatePct: number
}

export const mandatoryRows: MandatoryRow[] = [
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", assigned: 599, completed: 480, pending: 119, completionRatePct: 80.1 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", assigned: 439, completed: 326, pending: 113, completionRatePct: 74.3 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", assigned: 616, completed: 534, pending: 82, completionRatePct: 86.7 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", assigned: 451, completed: 353, pending: 98, completionRatePct: 78.3 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", assigned: 597, completed: 459, pending: 138, completionRatePct: 76.9 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", assigned: 437, completed: 296, pending: 141, completionRatePct: 67.7 },
]

// ── Pending learners by location — PENDING ONLY (completed has no location) ─
// Use this for "where are the outstanding completions" breakdowns by
// organization / job location / country. Do NOT infer completion rates from
// it; it has no completed figures.
export type PendingLocationRow = {
  course: string
  businessEntity: string
  bu: BU
  organization: string
  jobLocation: string
  country: string
  pending: number
}

export const pendingByLocation: PendingLocationRow[] = [
  // Data Privacy Awareness
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Bahrain (PAMBUBH)", jobLocation: "Manama (MN)", country: "Bahrain", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Egypt (PAMBUEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 3 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Oman (PAMBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 9 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 103 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Sharjah (SHA)", country: "United Arab Emirates", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Egypt (PCORPEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 3 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Egypt (PPMEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 1 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Egypt (PSMDEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 12 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Lebanon (PCORPLB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Oman (PCOBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 9 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Saudi Arabia (PCDVSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 1 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Saudi Arabia (PCORPSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 1 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Saudi Arabia (PPMSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Saudi Arabia (PSMDSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 3 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Development UAE (PCDVBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 59 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Design Studio Development UAE (PDSDBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 8 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management UAE (PPMAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 10 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development UAE (PSMDAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 2 },
  // Information Security Awareness
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Bahrain (PAMBUBH)", jobLocation: "Manama (MN)", country: "Bahrain", pending: 1 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Egypt (PAMBUEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 3 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Oman (PAMBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 3 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 74 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Sharjah (SHA)", country: "United Arab Emirates", pending: 1 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Egypt (PCORPEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 3 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Egypt (PSMDEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 10 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Lebanon (PCORPLB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 1 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Oman (PCOBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 8 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Saudi Arabia (PCDVSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Saudi Arabia (PCORPSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 1 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Saudi Arabia (PPMSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Saudi Arabia (PSMDSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 4 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Development UAE (PCDVBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 48 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Design Studio Development UAE (PDSDBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 9 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management UAE (PPMAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 8 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development UAE (PSMDAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 2 },
  // Sustainability E-learning
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Bahrain (PAMBUBH)", jobLocation: "Manama (MN)", country: "Bahrain", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Egypt (PAMBUEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Oman (PAMBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 9 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 123 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Sharjah (SHA)", country: "United Arab Emirates", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Egypt (PCORPEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 4 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Egypt (PPMEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 1 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Egypt (PSMDEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 13 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Lebanon (PCORPLB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 4 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Oman (PCOBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 11 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Saudi Arabia (PCDVSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 1 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Saudi Arabia (PCORPSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 1 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Saudi Arabia (PPMSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Saudi Arabia (PSMDSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 4 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Development UAE (PCDVBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 78 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Design Studio Development UAE (PDSDBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 9 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management UAE (PPMAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 11 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development UAE (PSMDAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 2 },
]

// ── Completions by month — from Completion Date on the Completed export ─────
// Split by BU. Sums to the total completed count across all courses.
export const completionsByMonth: { month: string; AMBU: number; DBU: number }[] = [
  { month: "2025-09", AMBU: 29, DBU: 8 },
  { month: "2025-10", AMBU: 40, DBU: 28 },
  { month: "2025-11", AMBU: 74, DBU: 38 },
  { month: "2025-12", AMBU: 120, DBU: 107 },
  { month: "2026-01", AMBU: 378, DBU: 281 },
  { month: "2026-02", AMBU: 398, DBU: 224 },
  { month: "2026-03", AMBU: 42, DBU: 22 },
  { month: "2026-04", AMBU: 93, DBU: 119 },
  { month: "2026-05", AMBU: 112, DBU: 46 },
  { month: "2026-06", AMBU: 146, DBU: 64 },
  { month: "2026-07", AMBU: 34, DBU: 31 },
  { month: "2026-08", AMBU: 7, DBU: 7 },
]

export const meta = {
  lastUpdated: '2026-08-09',
  source: 'LMS mandatory-learning exports (AMBU + DBU), dated 06-08-2026',
  isSampleData: false,
  coursesCount: courses.length,
  totalAssigned: 3139,
  totalCompleted: 2448,
  totalPending: 691,
} as const
