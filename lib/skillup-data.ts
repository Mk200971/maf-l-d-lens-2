// skillup-data.ts
// GENERATED 2026-08-19 from "recurringAssignmentSummaryByUserV2 Report (2).xlsx".
// E-learning SkillUP journey assignments (GROW / MOBILISE / MULTIPLY / STEER) for AMBU & DBU.
//
// SCOPE — IMPORTANT: this export is ORG-WIDE (8,412 rows across 8 OpCos:
// Retail, Global Solutions, Entertainment, Lifestyle, Holding, Customer
// Solutions, Asset Management, Development). It has been filtered to
// AMBU + DBU ONLY = 947 rows. Two independent filters (assignment-title
// suffix _AMBU/_DBU, and the OpCo column) agree exactly on this set.
//
// Grain: aggregates only — journey x BU, journey x country x BU, department x BU, country x BU, role x BU, assignment waves.
// Statuses: "Not Started" | "Started" | "Completed". % COMPLETED in source is binary (0/1).
// journeyHours: total learning hours per completed journey (course + other), confirmed by L&D 2026-08-05.
// learningHours: SkillUp hours credited into the dashboard = completed journeys x journeyHours, per BU.

export const meta = {
  "source": "recurringAssignmentSummaryByUserV2 Report (2).xlsx (LMS assignment export)",
  "generated": "2026-08-19",
  "rows": 947,
  "scopeNote": "Source export is org-wide (8412 rows across 8 OpCos, including Retail, GS, MAFE, Lifestyle, Holding and Customer Solutions). Filtered to AMBU + DBU ONLY (947 rows). The assignment-title suffix (_AMBU/_DBU) and the OpCo column agree exactly on this set.",
  "grainNote": "Aggregates only: journey x BU, journey x country x BU, department x BU, country x BU, role x BU, assignment waves.",
  "statusNote": "USER ASSIGNMENT STATUS: Not Started | Started | Completed. Source % COMPLETED is binary (0/1) and matches the status column on every row.",
  "hoursNote": "journeyHours = total learning hours per completed journey (course + other). learningHours credits completed journeys only.",
  "journeys": [
    "GROW (Professionals)",
    "MOBILISE (Managers)",
    "MULTIPLY (Managers)",
    "STEER (Leaders)"
  ]
} as const;

export const kpis = {
  "totalAssigned": 947,
  "completed": 44,
  "started": 157,
  "notStarted": 746,
  "completionRatePct": 4.6,
  "engagementRatePct": 21.2,
  "journeysCount": 4,
  "byBU": {
    "AMBU": {
      "assigned": 560,
      "completed": 25,
      "started": 98,
      "notStarted": 437,
      "completionRatePct": 4.5,
      "engagementRatePct": 22.0
    },
    "DBU": {
      "assigned": 387,
      "completed": 19,
      "started": 59,
      "notStarted": 309,
      "completionRatePct": 4.9,
      "engagementRatePct": 20.2
    }
  },
  "learningHours": 161.06,
  "learningHoursByBU": {
    "AMBU": 93.67,
    "DBU": 67.39
  }
} as const;

// Total learning hours per completed journey (course hours + other hours).
export const journeyHours = {
  "GROW": 3.3092,
  "MOBILISE": 4.0619,
  "MULTIPLY": 5.0447,
  "STEER": 4.3917
} as const;

export const journeys = [
  {
    "journey": "GROW",
    "label": "GROW with SkillUP",
    "audience": "Professionals",
    "bu": "AMBU",
    "assigned": 332,
    "notStarted": 251,
    "started": 64,
    "completed": 17,
    "completionRatePct": 5.1,
    "engagementRatePct": 24.4,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "GROW",
    "label": "GROW with SkillUP",
    "audience": "Professionals",
    "bu": "DBU",
    "assigned": 160,
    "notStarted": 114,
    "started": 33,
    "completed": 13,
    "completionRatePct": 8.1,
    "engagementRatePct": 28.7,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "MOBILISE",
    "label": "MOBILISE with SkillUp",
    "audience": "Managers",
    "bu": "AMBU",
    "assigned": 117,
    "notStarted": 101,
    "started": 13,
    "completed": 3,
    "completionRatePct": 2.6,
    "engagementRatePct": 13.7,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "MOBILISE",
    "label": "MOBILISE with SkillUp",
    "audience": "Managers",
    "bu": "DBU",
    "assigned": 150,
    "notStarted": 127,
    "started": 17,
    "completed": 6,
    "completionRatePct": 4.0,
    "engagementRatePct": 15.3,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "MULTIPLY",
    "label": "MULTIPLY with SkillUp",
    "audience": "Managers",
    "bu": "AMBU",
    "assigned": 85,
    "notStarted": 63,
    "started": 17,
    "completed": 5,
    "completionRatePct": 5.9,
    "engagementRatePct": 25.9,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "MULTIPLY",
    "label": "MULTIPLY with SkillUp",
    "audience": "Managers",
    "bu": "DBU",
    "assigned": 15,
    "notStarted": 13,
    "started": 2,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 13.3,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "STEER",
    "label": "STEER with SkillUp",
    "audience": "Leaders",
    "bu": "AMBU",
    "assigned": 26,
    "notStarted": 22,
    "started": 4,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 15.4,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "STEER",
    "label": "STEER with SkillUp",
    "audience": "Leaders",
    "bu": "DBU",
    "assigned": 62,
    "notStarted": 55,
    "started": 7,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 11.3,
    "dueDate": "2026-09-30"
  }
];

// journey x country x BU — enables country filtering on the journey cards.
export const journeyByCountry = [
  {
    "journey": "GROW",
    "country": "Bahrain",
    "bu": "AMBU",
    "assigned": 32,
    "notStarted": 19,
    "started": 8,
    "completed": 5,
    "completionRatePct": 15.6,
    "engagementRatePct": 40.6
  },
  {
    "journey": "GROW",
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 41,
    "notStarted": 32,
    "started": 9,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 22.0
  },
  {
    "journey": "GROW",
    "country": "Egypt",
    "bu": "DBU",
    "assigned": 10,
    "notStarted": 8,
    "started": 2,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 20.0
  },
  {
    "journey": "GROW",
    "country": "Lebanon",
    "bu": "AMBU",
    "assigned": 14,
    "notStarted": 12,
    "started": 1,
    "completed": 1,
    "completionRatePct": 7.1,
    "engagementRatePct": 14.3
  },
  {
    "journey": "GROW",
    "country": "Lebanon",
    "bu": "DBU",
    "assigned": 3,
    "notStarted": 3,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "journey": "GROW",
    "country": "Oman",
    "bu": "AMBU",
    "assigned": 53,
    "notStarted": 20,
    "started": 28,
    "completed": 5,
    "completionRatePct": 9.4,
    "engagementRatePct": 62.3
  },
  {
    "journey": "GROW",
    "country": "Oman",
    "bu": "DBU",
    "assigned": 51,
    "notStarted": 40,
    "started": 10,
    "completed": 1,
    "completionRatePct": 2.0,
    "engagementRatePct": 21.6
  },
  {
    "journey": "GROW",
    "country": "Saudi Arabia",
    "bu": "DBU",
    "assigned": 9,
    "notStarted": 1,
    "started": 3,
    "completed": 5,
    "completionRatePct": 55.6,
    "engagementRatePct": 88.9
  },
  {
    "journey": "GROW",
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 192,
    "notStarted": 168,
    "started": 18,
    "completed": 6,
    "completionRatePct": 3.1,
    "engagementRatePct": 12.5
  },
  {
    "journey": "GROW",
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 87,
    "notStarted": 62,
    "started": 18,
    "completed": 7,
    "completionRatePct": 8.0,
    "engagementRatePct": 28.7
  },
  {
    "journey": "MOBILISE",
    "country": "Bahrain",
    "bu": "AMBU",
    "assigned": 9,
    "notStarted": 8,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 11.1
  },
  {
    "journey": "MOBILISE",
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 20,
    "notStarted": 19,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 5.0
  },
  {
    "journey": "MOBILISE",
    "country": "Egypt",
    "bu": "DBU",
    "assigned": 16,
    "notStarted": 15,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 6.2
  },
  {
    "journey": "MOBILISE",
    "country": "Lebanon",
    "bu": "AMBU",
    "assigned": 2,
    "notStarted": 1,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 50.0
  },
  {
    "journey": "MOBILISE",
    "country": "Oman",
    "bu": "AMBU",
    "assigned": 5,
    "notStarted": 3,
    "started": 1,
    "completed": 1,
    "completionRatePct": 20.0,
    "engagementRatePct": 40.0
  },
  {
    "journey": "MOBILISE",
    "country": "Oman",
    "bu": "DBU",
    "assigned": 37,
    "notStarted": 32,
    "started": 2,
    "completed": 3,
    "completionRatePct": 8.1,
    "engagementRatePct": 13.5
  },
  {
    "journey": "MOBILISE",
    "country": "Saudi Arabia",
    "bu": "DBU",
    "assigned": 2,
    "notStarted": 2,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "journey": "MOBILISE",
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 81,
    "notStarted": 70,
    "started": 9,
    "completed": 2,
    "completionRatePct": 2.5,
    "engagementRatePct": 13.6
  },
  {
    "journey": "MOBILISE",
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 95,
    "notStarted": 78,
    "started": 14,
    "completed": 3,
    "completionRatePct": 3.2,
    "engagementRatePct": 17.9
  },
  {
    "journey": "MULTIPLY",
    "country": "Bahrain",
    "bu": "AMBU",
    "assigned": 4,
    "notStarted": 3,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 25.0
  },
  {
    "journey": "MULTIPLY",
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 14,
    "notStarted": 13,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 7.1
  },
  {
    "journey": "MULTIPLY",
    "country": "Egypt",
    "bu": "DBU",
    "assigned": 2,
    "notStarted": 2,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "journey": "MULTIPLY",
    "country": "Lebanon",
    "bu": "AMBU",
    "assigned": 4,
    "notStarted": 3,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 25.0
  },
  {
    "journey": "MULTIPLY",
    "country": "Oman",
    "bu": "AMBU",
    "assigned": 19,
    "notStarted": 10,
    "started": 6,
    "completed": 3,
    "completionRatePct": 15.8,
    "engagementRatePct": 47.4
  },
  {
    "journey": "MULTIPLY",
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 44,
    "notStarted": 34,
    "started": 8,
    "completed": 2,
    "completionRatePct": 4.5,
    "engagementRatePct": 22.7
  },
  {
    "journey": "MULTIPLY",
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 13,
    "notStarted": 11,
    "started": 2,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 15.4
  },
  {
    "journey": "STEER",
    "country": "Bahrain",
    "bu": "AMBU",
    "assigned": 2,
    "notStarted": 2,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "journey": "STEER",
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 3,
    "notStarted": 2,
    "started": 1,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 33.3
  },
  {
    "journey": "STEER",
    "country": "Egypt",
    "bu": "DBU",
    "assigned": 4,
    "notStarted": 4,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "journey": "STEER",
    "country": "Oman",
    "bu": "AMBU",
    "assigned": 1,
    "notStarted": 1,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "journey": "STEER",
    "country": "Oman",
    "bu": "DBU",
    "assigned": 18,
    "notStarted": 15,
    "started": 3,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 16.7
  },
  {
    "journey": "STEER",
    "country": "Saudi Arabia",
    "bu": "DBU",
    "assigned": 1,
    "notStarted": 1,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "journey": "STEER",
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 20,
    "notStarted": 17,
    "started": 3,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 15.0
  },
  {
    "journey": "STEER",
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 39,
    "notStarted": 35,
    "started": 4,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 10.3
  }
];

export const byDepartment = [
  {
    "department": "Asset Management",
    "bu": "DBU",
    "assigned": 8,
    "completed": 0,
    "started": 1,
    "notStarted": 7,
    "completionRatePct": 0.0,
    "engagementRatePct": 12.5
  },
  {
    "department": "Asset Marketing",
    "bu": "AMBU",
    "assigned": 16,
    "completed": 1,
    "started": 3,
    "notStarted": 12,
    "completionRatePct": 6.2,
    "engagementRatePct": 25.0
  },
  {
    "department": "Asset Performance",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Brand Marketing",
    "bu": "AMBU",
    "assigned": 26,
    "completed": 0,
    "started": 1,
    "notStarted": 25,
    "completionRatePct": 0.0,
    "engagementRatePct": 3.8
  },
  {
    "department": "CEO Office",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "CEO Office",
    "bu": "DBU",
    "assigned": 10,
    "completed": 1,
    "started": 3,
    "notStarted": 6,
    "completionRatePct": 10.0,
    "engagementRatePct": 40.0
  },
  {
    "department": "CFO Office",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "CX Product Management",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Capital Projects",
    "bu": "AMBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Collections",
    "bu": "AMBU",
    "assigned": 19,
    "completed": 0,
    "started": 3,
    "notStarted": 16,
    "completionRatePct": 0.0,
    "engagementRatePct": 15.8
  },
  {
    "department": "Commercial Management",
    "bu": "DBU",
    "assigned": 14,
    "completed": 0,
    "started": 0,
    "notStarted": 14,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Communities Projects Management",
    "bu": "DBU",
    "assigned": 8,
    "completed": 0,
    "started": 0,
    "notStarted": 8,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Community Management",
    "bu": "DBU",
    "assigned": 11,
    "completed": 0,
    "started": 2,
    "notStarted": 9,
    "completionRatePct": 0.0,
    "engagementRatePct": 18.2
  },
  {
    "department": "Community and Facilities Management",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 20.0
  },
  {
    "department": "Corporate Control",
    "bu": "AMBU",
    "assigned": 5,
    "completed": 1,
    "started": 1,
    "notStarted": 3,
    "completionRatePct": 20.0,
    "engagementRatePct": 40.0
  },
  {
    "department": "Corporate Control Office",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Country Head Office",
    "bu": "DBU",
    "assigned": 16,
    "completed": 5,
    "started": 3,
    "notStarted": 8,
    "completionRatePct": 31.2,
    "engagementRatePct": 50.0
  },
  {
    "department": "Customer Experience",
    "bu": "AMBU",
    "assigned": 15,
    "completed": 0,
    "started": 0,
    "notStarted": 15,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Customer Experience",
    "bu": "DBU",
    "assigned": 24,
    "completed": 1,
    "started": 3,
    "notStarted": 20,
    "completionRatePct": 4.2,
    "engagementRatePct": 16.7
  },
  {
    "department": "Customer Relations Management",
    "bu": "DBU",
    "assigned": 16,
    "completed": 3,
    "started": 2,
    "notStarted": 11,
    "completionRatePct": 18.8,
    "engagementRatePct": 31.2
  },
  {
    "department": "Customer Service",
    "bu": "AMBU",
    "assigned": 38,
    "completed": 4,
    "started": 12,
    "notStarted": 22,
    "completionRatePct": 10.5,
    "engagementRatePct": 42.1
  },
  {
    "department": "Customer Service VIC",
    "bu": "AMBU",
    "assigned": 4,
    "completed": 0,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Data Analytics & Technology",
    "bu": "AMBU",
    "assigned": 11,
    "completed": 0,
    "started": 0,
    "notStarted": 11,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Design",
    "bu": "DBU",
    "assigned": 24,
    "completed": 0,
    "started": 3,
    "notStarted": 21,
    "completionRatePct": 0.0,
    "engagementRatePct": 12.5
  },
  {
    "department": "Development",
    "bu": "DBU",
    "assigned": 46,
    "completed": 2,
    "started": 7,
    "notStarted": 37,
    "completionRatePct": 4.3,
    "engagementRatePct": 19.6
  },
  {
    "department": "Engineering, Sustainability, & Architecture",
    "bu": "AMBU",
    "assigned": 18,
    "completed": 1,
    "started": 2,
    "notStarted": 15,
    "completionRatePct": 5.6,
    "engagementRatePct": 16.7
  },
  {
    "department": "Executive Management",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "F&B Leasing",
    "bu": "AMBU",
    "assigned": 4,
    "completed": 0,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Finance",
    "bu": "AMBU",
    "assigned": 3,
    "completed": 0,
    "started": 0,
    "notStarted": 3,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Finance",
    "bu": "DBU",
    "assigned": 30,
    "completed": 0,
    "started": 1,
    "notStarted": 29,
    "completionRatePct": 0.0,
    "engagementRatePct": 3.3
  },
  {
    "department": "Financial Planning & Analysis",
    "bu": "AMBU",
    "assigned": 17,
    "completed": 0,
    "started": 2,
    "notStarted": 15,
    "completionRatePct": 0.0,
    "engagementRatePct": 11.8
  },
  {
    "department": "Food and Beverage",
    "bu": "DBU",
    "assigned": 3,
    "completed": 0,
    "started": 2,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 66.7
  },
  {
    "department": "GS - Government Relations",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Golf Course Maintenance",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 1,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 50.0
  },
  {
    "department": "Golf Operations",
    "bu": "DBU",
    "assigned": 4,
    "completed": 1,
    "started": 2,
    "notStarted": 1,
    "completionRatePct": 25.0,
    "engagementRatePct": 75.0
  },
  {
    "department": "Information Technology",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 20.0
  },
  {
    "department": "Investment & Business Development",
    "bu": "DBU",
    "assigned": 4,
    "completed": 0,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Key Accounts",
    "bu": "AMBU",
    "assigned": 9,
    "completed": 0,
    "started": 1,
    "notStarted": 8,
    "completionRatePct": 0.0,
    "engagementRatePct": 11.1
  },
  {
    "department": "Lease Contract Management",
    "bu": "AMBU",
    "assigned": 35,
    "completed": 1,
    "started": 7,
    "notStarted": 27,
    "completionRatePct": 2.9,
    "engagementRatePct": 22.9
  },
  {
    "department": "Leasing",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Legal",
    "bu": "AMBU",
    "assigned": 11,
    "completed": 0,
    "started": 0,
    "notStarted": 11,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Legal",
    "bu": "DBU",
    "assigned": 13,
    "completed": 1,
    "started": 2,
    "notStarted": 10,
    "completionRatePct": 7.7,
    "engagementRatePct": 23.1
  },
  {
    "department": "Mall Management",
    "bu": "AMBU",
    "assigned": 8,
    "completed": 0,
    "started": 5,
    "notStarted": 3,
    "completionRatePct": 0.0,
    "engagementRatePct": 62.5
  },
  {
    "department": "Marina",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Marketing",
    "bu": "AMBU",
    "assigned": 3,
    "completed": 0,
    "started": 0,
    "notStarted": 3,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Marketing",
    "bu": "DBU",
    "assigned": 10,
    "completed": 0,
    "started": 1,
    "notStarted": 9,
    "completionRatePct": 0.0,
    "engagementRatePct": 10.0
  },
  {
    "department": "Operations",
    "bu": "AMBU",
    "assigned": 117,
    "completed": 8,
    "started": 26,
    "notStarted": 83,
    "completionRatePct": 6.8,
    "engagementRatePct": 29.1
  },
  {
    "department": "Operations - Engineering",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "People & Organization",
    "bu": "AMBU",
    "assigned": 13,
    "completed": 2,
    "started": 6,
    "notStarted": 5,
    "completionRatePct": 15.4,
    "engagementRatePct": 61.5
  },
  {
    "department": "People & Organization",
    "bu": "DBU",
    "assigned": 13,
    "completed": 2,
    "started": 3,
    "notStarted": 8,
    "completionRatePct": 15.4,
    "engagementRatePct": 38.5
  },
  {
    "department": "People & Organization - Learning & Development",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 1,
    "notStarted": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 100.0
  },
  {
    "department": "People & Organization- Total Rewards",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Planning & Design",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 20.0
  },
  {
    "department": "Planning & Strategy Office",
    "bu": "AMBU",
    "assigned": 7,
    "completed": 0,
    "started": 1,
    "notStarted": 6,
    "completionRatePct": 0.0,
    "engagementRatePct": 14.3
  },
  {
    "department": "Portfolio Management",
    "bu": "AMBU",
    "assigned": 24,
    "completed": 3,
    "started": 6,
    "notStarted": 15,
    "completionRatePct": 12.5,
    "engagementRatePct": 37.5
  },
  {
    "department": "Program Management",
    "bu": "AMBU",
    "assigned": 2,
    "completed": 0,
    "started": 1,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 50.0
  },
  {
    "department": "Project Management",
    "bu": "DBU",
    "assigned": 16,
    "completed": 0,
    "started": 1,
    "notStarted": 15,
    "completionRatePct": 0.0,
    "engagementRatePct": 6.2
  },
  {
    "department": "Property Management",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Property Management",
    "bu": "DBU",
    "assigned": 11,
    "completed": 0,
    "started": 1,
    "notStarted": 10,
    "completionRatePct": 0.0,
    "engagementRatePct": 9.1
  },
  {
    "department": "Regional Leasing",
    "bu": "AMBU",
    "assigned": 42,
    "completed": 0,
    "started": 3,
    "notStarted": 39,
    "completionRatePct": 0.0,
    "engagementRatePct": 7.1
  },
  {
    "department": "Retail Delivery",
    "bu": "AMBU",
    "assigned": 23,
    "completed": 1,
    "started": 4,
    "notStarted": 18,
    "completionRatePct": 4.3,
    "engagementRatePct": 21.7
  },
  {
    "department": "Retail Design",
    "bu": "AMBU",
    "assigned": 21,
    "completed": 1,
    "started": 4,
    "notStarted": 16,
    "completionRatePct": 4.8,
    "engagementRatePct": 23.8
  },
  {
    "department": "Retail Design & Delivery COE",
    "bu": "AMBU",
    "assigned": 9,
    "completed": 0,
    "started": 1,
    "notStarted": 8,
    "completionRatePct": 0.0,
    "engagementRatePct": 11.1
  },
  {
    "department": "Risk & Compliance",
    "bu": "DBU",
    "assigned": 6,
    "completed": 0,
    "started": 1,
    "notStarted": 5,
    "completionRatePct": 0.0,
    "engagementRatePct": 16.7
  },
  {
    "department": "Sales",
    "bu": "DBU",
    "assigned": 33,
    "completed": 2,
    "started": 4,
    "notStarted": 27,
    "completionRatePct": 6.1,
    "engagementRatePct": 18.2
  },
  {
    "department": "Sales Operations",
    "bu": "DBU",
    "assigned": 22,
    "completed": 1,
    "started": 10,
    "notStarted": 11,
    "completionRatePct": 4.5,
    "engagementRatePct": 50.0
  },
  {
    "department": "Security",
    "bu": "AMBU",
    "assigned": 7,
    "completed": 0,
    "started": 2,
    "notStarted": 5,
    "completionRatePct": 0.0,
    "engagementRatePct": 28.6
  },
  {
    "department": "Shopping Malls Projects Management",
    "bu": "DBU",
    "assigned": 12,
    "completed": 0,
    "started": 1,
    "notStarted": 11,
    "completionRatePct": 0.0,
    "engagementRatePct": 8.3
  },
  {
    "department": "Soft-Services & Risk Management",
    "bu": "AMBU",
    "assigned": 5,
    "completed": 0,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 20.0
  },
  {
    "department": "Speciality Leasing",
    "bu": "AMBU",
    "assigned": 30,
    "completed": 0,
    "started": 5,
    "notStarted": 25,
    "completionRatePct": 0.0,
    "engagementRatePct": 16.7
  },
  {
    "department": "Technical",
    "bu": "DBU",
    "assigned": 7,
    "completed": 0,
    "started": 1,
    "notStarted": 6,
    "completionRatePct": 0.0,
    "engagementRatePct": 14.3
  },
  {
    "department": "Technology & Transformation",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Tenant & Customer Growth",
    "bu": "AMBU",
    "assigned": 5,
    "completed": 1,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 20.0,
    "engagementRatePct": 20.0
  },
  {
    "department": "Valuation",
    "bu": "AMBU",
    "assigned": 3,
    "completed": 1,
    "started": 1,
    "notStarted": 1,
    "completionRatePct": 33.3,
    "engagementRatePct": 66.7
  }
];

export const byCountry = [
  {
    "country": "Bahrain",
    "bu": "AMBU",
    "assigned": 47,
    "completed": 5,
    "started": 10,
    "notStarted": 32,
    "completionRatePct": 10.6,
    "engagementRatePct": 31.9
  },
  {
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 78,
    "completed": 0,
    "started": 12,
    "notStarted": 66,
    "completionRatePct": 0.0,
    "engagementRatePct": 15.4
  },
  {
    "country": "Egypt",
    "bu": "DBU",
    "assigned": 32,
    "completed": 0,
    "started": 3,
    "notStarted": 29,
    "completionRatePct": 0.0,
    "engagementRatePct": 9.4
  },
  {
    "country": "Lebanon",
    "bu": "AMBU",
    "assigned": 20,
    "completed": 1,
    "started": 3,
    "notStarted": 16,
    "completionRatePct": 5.0,
    "engagementRatePct": 20.0
  },
  {
    "country": "Lebanon",
    "bu": "DBU",
    "assigned": 3,
    "completed": 0,
    "started": 0,
    "notStarted": 3,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "country": "Oman",
    "bu": "AMBU",
    "assigned": 78,
    "completed": 9,
    "started": 35,
    "notStarted": 34,
    "completionRatePct": 11.5,
    "engagementRatePct": 56.4
  },
  {
    "country": "Oman",
    "bu": "DBU",
    "assigned": 106,
    "completed": 4,
    "started": 15,
    "notStarted": 87,
    "completionRatePct": 3.8,
    "engagementRatePct": 17.9
  },
  {
    "country": "Saudi Arabia",
    "bu": "DBU",
    "assigned": 12,
    "completed": 5,
    "started": 3,
    "notStarted": 4,
    "completionRatePct": 41.7,
    "engagementRatePct": 66.7
  },
  {
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 337,
    "completed": 10,
    "started": 38,
    "notStarted": 289,
    "completionRatePct": 3.0,
    "engagementRatePct": 14.2
  },
  {
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 234,
    "completed": 10,
    "started": 38,
    "notStarted": 186,
    "completionRatePct": 4.3,
    "engagementRatePct": 20.5
  }
];

export const byRole = [
  {
    "role": "Business Leader",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 0,
    "notStarted": 5,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "role": "Customer Ambassador",
    "bu": "AMBU",
    "assigned": 6,
    "completed": 1,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 16.7,
    "engagementRatePct": 33.3
  },
  {
    "role": "Customer Ambassador",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "role": "Expert",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "role": "Expert",
    "bu": "DBU",
    "assigned": 4,
    "completed": 0,
    "started": 2,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 50.0
  },
  {
    "role": "Individual Contributor",
    "bu": "AMBU",
    "assigned": 393,
    "completed": 20,
    "started": 63,
    "notStarted": 310,
    "completionRatePct": 5.1,
    "engagementRatePct": 21.1
  },
  {
    "role": "Individual Contributor",
    "bu": "DBU",
    "assigned": 280,
    "completed": 16,
    "started": 45,
    "notStarted": 219,
    "completionRatePct": 5.7,
    "engagementRatePct": 21.8
  },
  {
    "role": "Team Leader",
    "bu": "AMBU",
    "assigned": 150,
    "completed": 4,
    "started": 32,
    "notStarted": 114,
    "completionRatePct": 2.7,
    "engagementRatePct": 24.0
  },
  {
    "role": "Team Leader",
    "bu": "DBU",
    "assigned": 94,
    "completed": 3,
    "started": 10,
    "notStarted": 81,
    "completionRatePct": 3.2,
    "engagementRatePct": 13.8
  },
  {
    "role": "Unspecified",
    "bu": "AMBU",
    "assigned": 10,
    "completed": 0,
    "started": 2,
    "notStarted": 8,
    "completionRatePct": 0.0,
    "engagementRatePct": 20.0
  },
  {
    "role": "Unspecified",
    "bu": "DBU",
    "assigned": 3,
    "completed": 0,
    "started": 2,
    "notStarted": 1,
    "completionRatePct": 0.0,
    "engagementRatePct": 66.7
  }
];

export const assignmentWaves = [
  {
    "date": "2026-06-08",
    "bu": "DBU",
    "assigned": 370
  },
  {
    "date": "2026-06-16",
    "bu": "AMBU",
    "assigned": 547
  },
  {
    "date": "2026-06-22",
    "bu": "AMBU",
    "assigned": 13
  },
  {
    "date": "2026-06-22",
    "bu": "DBU",
    "assigned": 15
  },
  {
    "date": "2026-07-08",
    "bu": "DBU",
    "assigned": 1
  },
  {
    "date": "2026-08-11",
    "bu": "DBU",
    "assigned": 1
  }
];
