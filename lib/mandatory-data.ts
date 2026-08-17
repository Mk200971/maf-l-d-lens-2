// mandatory-data.ts
// GENERATED 2026-08-17 from the two LMS mandatory-learning exports
//   "MAFP Asset Management - 13-08-2026.xlsx" (AMBU)
//   "MAFP Development - 13-08-2026.xlsx"      (DBU)
// Replaces the 06-08-2026 refresh. AGGREGATES ONLY: no learner names, emails,
// or manager rows are surfaced.
//
// COUNTING BASIS — read this before reconciling against the workbooks:
// Counts come from the DETAIL sheets (Completed / Pending tabs), not the
// Summary tab. For AMBU the two agree exactly. For DBU the Summary tab reports
// one FEWER pending learner on each of the three courses (3 in total) than the
// Pending sheet actually contains. The detail rows are real, distinct people,
// so the detail is treated as authoritative and the variance is recorded in
// meta.summaryVariances. Four duplicate learner rows also exist in the source
// detail sheets and are retained as-is (meta.duplicateDetailRows) because the
// Summary tab counts them the same way.
//
// GRAIN NOTE (unchanged from the previous version):
// The two source exports have DIFFERENT columns and no shared location key:
//   * Completed export: Title, User ID, Full Name, E-mail, Business Entity,
//     Completion Status, Completion Date   - NO organization / location / country.
//   * Pending export:   Item Title, User ID, ..., Organization ID, Job Location,
//     Manager fields                        - HAS organization / location.
// So COMPLETED counts exist only at course x BU (and by month), while a
// location / country breakdown is available for PENDING learners only.
// `mandatoryRows` is course x BU; `pendingByLocation` carries the location grain.

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

// -- Course x BU rollup - the authoritative completion grain ----------------
// assigned = completed + pending, both counted from the detail sheets.
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
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", assigned: 600, completed: 489, pending: 111, completionRatePct: 81.5 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", assigned: 438, completed: 331, pending: 107, completionRatePct: 75.6 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", assigned: 616, completed: 539, pending: 77, completionRatePct: 87.5 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", assigned: 450, completed: 356, pending: 94, completionRatePct: 79.1 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", assigned: 599, completed: 464, pending: 135, completionRatePct: 77.5 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", assigned: 436, completed: 302, pending: 134, completionRatePct: 69.3 },
]

// -- Pending learners by location - PENDING ONLY ---------------------------
// Use this for "where are the outstanding completions" breakdowns.
// Do NOT infer completion rates from it; it has no completed figures.
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
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Egypt (PAMBUEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Lebanon (PAMBULB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 1 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Oman (PAMBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 9 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 95 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Sharjah (SHA)", country: "United Arab Emirates", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Egypt (PCDVEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 3 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Egypt (PPMEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 1 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Egypt (PSMDEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 12 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Lebanon (PCORPLB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Oman (PCOBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 9 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Saudi Arabia (PCDVSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Saudi Arabia (PPMSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Saudi Arabia (PSMDSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 3 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Development UAE (PCDVBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 53 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Design Studio Development UAE (PDSDBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 8 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management UAE (PPMAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 10 },
  { course: "Data Privacy Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development UAE (PSMDAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 2 },
  // Information Security Awareness
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Bahrain (PAMBUBH)", jobLocation: "Manama (MN)", country: "Bahrain", pending: 1 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Egypt (PAMBUEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 2 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Oman (PAMBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 2 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 71 },
  { course: "Information Security Awareness", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Sharjah (SHA)", country: "United Arab Emirates", pending: 1 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Egypt (PCDVEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 3 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Egypt (PSMDEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 10 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Lebanon (PCORPLB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 1 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Oman (PCOBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 8 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Saudi Arabia (PCDVSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 3 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Saudi Arabia (PPMSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Saudi Arabia (PSMDSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 4 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Development UAE (PCDVBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 44 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Design Studio Development UAE (PDSDBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 9 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management UAE (PPMAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 8 },
  { course: "Information Security Awareness", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development UAE (PSMDAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 2 },
  // Sustainability E-learning
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Bahrain (PAMBUBH)", jobLocation: "Manama (MN)", country: "Bahrain", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Egypt (PAMBUEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Lebanon (PAMBULB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management Oman (PAMBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 9 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 118 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Asset Management", bu: "AMBU", organization: "P Asset Management UAE (PAMBUAE)", jobLocation: "Sharjah (SHA)", country: "United Arab Emirates", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Egypt (PCDVEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 4 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Egypt (PPMEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 1 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Egypt (PSMDEG)", jobLocation: "Cairo (CAI)", country: "Egypt", pending: 13 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Corporate Lebanon (PCORPLB)", jobLocation: "Beirut (BEI)", country: "Lebanon", pending: 4 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Oman (PCOBUOM)", jobLocation: "Muscat (MCT)", country: "Oman", pending: 11 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "Communities Development Saudi Arabia (PCDVSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management Saudi Arabia (PPMSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 2 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development Saudi Arabia (PSMDSA)", jobLocation: "Riyadh (RIY)", country: "Saudi Arabia", pending: 4 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Communities Development UAE (PCDVBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 71 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Design Studio Development UAE (PDSDBUAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 9 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Project Management UAE (PPMAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 11 },
  { course: "Sustainability E-learning", businessEntity: "MAFP Development", bu: "DBU", organization: "P Shopping Mall Development UAE (PSMDAE)", jobLocation: "Dubai (DXB)", country: "United Arab Emirates", pending: 2 },
]

// -- Pending by country x BU - convenience rollup of pendingByLocation ------
export const pendingByCountry: { country: string; bu: BU; pending: number }[] = [
  { country: "United Arab Emirates", bu: "AMBU", pending: 289 },
  { country: "United Arab Emirates", bu: "DBU", pending: 229 },
  { country: "Egypt", bu: "DBU", pending: 47 },
  { country: "Oman", bu: "DBU", pending: 28 },
  { country: "Saudi Arabia", bu: "DBU", pending: 24 },
  { country: "Oman", bu: "AMBU", pending: 20 },
  { country: "Lebanon", bu: "DBU", pending: 7 },
  { country: "Egypt", bu: "AMBU", pending: 6 },
  { country: "Bahrain", bu: "AMBU", pending: 5 },
  { country: "Lebanon", bu: "AMBU", pending: 3 },
]

// -- Completions by month - from Completion Date on the Completed export ----
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
  { month: "2026-08", AMBU: 26, DBU: 21 },
]

export const meta = {
  lastUpdated: '2026-08-17',
  source: 'LMS mandatory-learning exports (AMBU + DBU), dated 13-08-2026',
  isSampleData: false,
  coursesCount: 3,
  totalAssigned: 3139,
  totalCompleted: 2481,
  totalPending: 658,
  overallCompletionRatePct: 79.0,
  countingBasis: "Detail sheet rows (Completed / Pending tabs), which are the authoritative record. See summaryVariances.",
  summaryVariances: [
    "DBU / Information Security Awareness: Pending detail rows 94 vs Summary tab 93",
    "DBU / Data Privacy Awareness: Pending detail rows 107 vs Summary tab 106",
    "DBU / Sustainability E-learning: Pending detail rows 134 vs Summary tab 133",
  ],
  duplicateDetailRows: [
    "AMBU Completed: 2 duplicate learner row(s) retained as-is",
    "DBU Completed: 1 duplicate learner row(s) retained as-is",
    "DBU Pending: 1 duplicate learner row(s) retained as-is",
  ],
} as const
