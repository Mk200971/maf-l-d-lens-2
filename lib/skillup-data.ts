// skillup-data.ts
// GENERATED 2026-08-05 from "recurringAssignmentSummaryByUserV2 Report.xlsx" (952 AMBU/DBU assignment rows).
// E-learning SkillUP journey assignments (GROW / MOBILISE / MULTIPLY / STEER) for AMBU & DBU.
// Grain: aggregates only — journey x BU, journey x country x BU, department x BU, country x BU, role x BU, assignment waves.
// Statuses: "Not Started" | "Started" | "Completed". % COMPLETED in source is binary (0/1).
// journeyHours: total learning hours per completed journey (course + other), confirmed by L&D 2026-08-05.
// learningHours: SkillUp hours credited into the dashboard = completed journeys x journeyHours, per BU.

export const meta = {
  "source": "recurringAssignmentSummaryByUserV2 Report.xlsx (LMS assignment export)",
  "generated": "2026-08-05",
  "rows": 952,
  "grainNote": "Aggregates only: journey x BU, journey x country x BU, department x BU, country x BU, role x BU, assignment waves.",
  "statusNote": "USER ASSIGNMENT STATUS: Not Started | Started | Completed. Source % COMPLETED is binary (0/1).",
  "hoursNote": "journeyHours = total learning hours per completed journey (course + other). learningHours credits completed journeys only.",
  "journeys": [
    "GROW (Professionals)",
    "MOBILISE (Managers)",
    "MULTIPLY (Managers)",
    "STEER (Leaders)"
  ]
} as const;

export const kpis = {
  "totalAssigned": 952,
  "completed": 27,
  "started": 130,
  "notStarted": 795,
  "completionRatePct": 2.8,
  "engagementRatePct": 16.5,
  "journeysCount": 4,
  "byBU": {
    "AMBU": {
      "assigned": 563,
      "completed": 14,
      "started": 89,
      "notStarted": 460,
      "completionRatePct": 2.5,
      "engagementRatePct": 18.3
    },
    "DBU": {
      "assigned": 389,
      "completed": 13,
      "started": 41,
      "notStarted": 335,
      "completionRatePct": 3.3,
      "engagementRatePct": 13.9
    }
  },
  "learningHours": 99.6,
  "learningHoursByBU": {
    "AMBU": 52.06,
    "DBU": 47.54
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
    "assigned": 335,
    "notStarted": 266,
    "started": 60,
    "completed": 9,
    "completionRatePct": 2.7,
    "engagementRatePct": 20.6,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "GROW",
    "label": "GROW with SkillUP",
    "audience": "Professionals",
    "bu": "DBU",
    "assigned": 162,
    "notStarted": 131,
    "started": 24,
    "completed": 7,
    "completionRatePct": 4.3,
    "engagementRatePct": 19.1,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "MOBILISE",
    "label": "MOBILISE with SkillUp",
    "audience": "Managers",
    "bu": "AMBU",
    "assigned": 117,
    "notStarted": 103,
    "started": 11,
    "completed": 3,
    "completionRatePct": 2.6,
    "engagementRatePct": 12.0,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "MOBILISE",
    "label": "MOBILISE with SkillUp",
    "audience": "Managers",
    "bu": "DBU",
    "assigned": 149,
    "notStarted": 134,
    "started": 9,
    "completed": 6,
    "completionRatePct": 4.0,
    "engagementRatePct": 10.1,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "MULTIPLY",
    "label": "MULTIPLY with SkillUp",
    "audience": "Managers",
    "bu": "AMBU",
    "assigned": 85,
    "notStarted": 68,
    "started": 15,
    "completed": 2,
    "completionRatePct": 2.4,
    "engagementRatePct": 20.0,
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
    "dueDate": "2026-10-07"
  },
  {
    "journey": "STEER",
    "label": "STEER with SkillUp",
    "audience": "Leaders",
    "bu": "AMBU",
    "assigned": 26,
    "notStarted": 23,
    "started": 3,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 11.5,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "STEER",
    "label": "STEER with SkillUp",
    "audience": "Leaders",
    "bu": "DBU",
    "assigned": 63,
    "notStarted": 57,
    "started": 6,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 9.5,
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
    "notStarted": 22,
    "started": 7,
    "completed": 3,
    "completionRatePct": 9.4,
    "engagementRatePct": 31.3
  },
  {
    "journey": "GROW",
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 42,
    "notStarted": 35,
    "started": 7,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 16.7
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
    "notStarted": 24,
    "started": 28,
    "completed": 1,
    "completionRatePct": 1.9,
    "engagementRatePct": 54.7
  },
  {
    "journey": "GROW",
    "country": "Oman",
    "bu": "DBU",
    "assigned": 51,
    "notStarted": 45,
    "started": 6,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 11.8
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
    "assigned": 194,
    "notStarted": 173,
    "started": 17,
    "completed": 4,
    "completionRatePct": 2.1,
    "engagementRatePct": 10.8
  },
  {
    "journey": "GROW",
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 89,
    "notStarted": 74,
    "started": 13,
    "completed": 2,
    "completionRatePct": 2.2,
    "engagementRatePct": 16.9
  },
  {
    "journey": "MOBILISE",
    "country": "Bahrain",
    "bu": "AMBU",
    "assigned": 9,
    "notStarted": 9,
    "started": 0,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
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
    "engagementRatePct": 6.3
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
    "notStarted": 33,
    "started": 1,
    "completed": 3,
    "completionRatePct": 8.1,
    "engagementRatePct": 10.8
  },
  {
    "journey": "MOBILISE",
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
    "journey": "MOBILISE",
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 81,
    "notStarted": 71,
    "started": 8,
    "completed": 2,
    "completionRatePct": 2.5,
    "engagementRatePct": 12.3
  },
  {
    "journey": "MOBILISE",
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 95,
    "notStarted": 85,
    "started": 7,
    "completed": 3,
    "completionRatePct": 3.2,
    "engagementRatePct": 10.5
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
    "notStarted": 13,
    "started": 6,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 31.6
  },
  {
    "journey": "MULTIPLY",
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 44,
    "notStarted": 36,
    "started": 6,
    "completed": 2,
    "completionRatePct": 4.5,
    "engagementRatePct": 18.2
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
    "assigned": 19,
    "notStarted": 16,
    "started": 3,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 15.8
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
    "notStarted": 18,
    "started": 2,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 10.0
  },
  {
    "journey": "STEER",
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 39,
    "notStarted": 36,
    "started": 3,
    "completed": 0,
    "completionRatePct": 0.0,
    "engagementRatePct": 7.7
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
    "started": 2,
    "notStarted": 13,
    "completionRatePct": 6.3,
    "engagementRatePct": 18.8
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
    "completed": 0,
    "started": 3,
    "notStarted": 7,
    "completionRatePct": 0.0,
    "engagementRatePct": 30.0
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
    "started": 1,
    "notStarted": 10,
    "completionRatePct": 0.0,
    "engagementRatePct": 9.1
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
    "completionRatePct": 31.3,
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
    "completed": 0,
    "started": 2,
    "notStarted": 22,
    "completionRatePct": 0.0,
    "engagementRatePct": 8.3
  },
  {
    "department": "Customer Relations Management",
    "bu": "DBU",
    "assigned": 17,
    "completed": 1,
    "started": 0,
    "notStarted": 16,
    "completionRatePct": 5.9,
    "engagementRatePct": 5.9
  },
  {
    "department": "Customer Service",
    "bu": "AMBU",
    "assigned": 38,
    "completed": 3,
    "started": 10,
    "notStarted": 25,
    "completionRatePct": 7.9,
    "engagementRatePct": 34.2
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
    "assigned": 23,
    "completed": 0,
    "started": 2,
    "notStarted": 21,
    "completionRatePct": 0.0,
    "engagementRatePct": 8.7
  },
  {
    "department": "Development",
    "bu": "DBU",
    "assigned": 46,
    "completed": 2,
    "started": 3,
    "notStarted": 41,
    "completionRatePct": 4.3,
    "engagementRatePct": 10.9
  },
  {
    "department": "Engineering, Sustainability, & Architecture",
    "bu": "AMBU",
    "assigned": 18,
    "completed": 0,
    "started": 1,
    "notStarted": 17,
    "completionRatePct": 0.0,
    "engagementRatePct": 5.6
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
    "assigned": 31,
    "completed": 0,
    "started": 1,
    "notStarted": 30,
    "completionRatePct": 0.0,
    "engagementRatePct": 3.2
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
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
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
    "assigned": 36,
    "completed": 1,
    "started": 6,
    "notStarted": 29,
    "completionRatePct": 2.8,
    "engagementRatePct": 19.4
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
    "completed": 0,
    "started": 1,
    "notStarted": 12,
    "completionRatePct": 0.0,
    "engagementRatePct": 7.7
  },
  {
    "department": "Mall Management",
    "bu": "AMBU",
    "assigned": 8,
    "completed": 0,
    "started": 4,
    "notStarted": 4,
    "completionRatePct": 0.0,
    "engagementRatePct": 50.0
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
    "started": 0,
    "notStarted": 10,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Operations",
    "bu": "AMBU",
    "assigned": 118,
    "completed": 3,
    "started": 27,
    "notStarted": 88,
    "completionRatePct": 2.5,
    "engagementRatePct": 25.4
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
    "assigned": 14,
    "completed": 2,
    "started": 5,
    "notStarted": 7,
    "completionRatePct": 14.3,
    "engagementRatePct": 50.0
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
    "started": 0,
    "notStarted": 7,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Portfolio Management",
    "bu": "AMBU",
    "assigned": 24,
    "completed": 1,
    "started": 6,
    "notStarted": 17,
    "completionRatePct": 4.2,
    "engagementRatePct": 29.2
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
    "assigned": 17,
    "completed": 0,
    "started": 0,
    "notStarted": 17,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
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
    "started": 0,
    "notStarted": 11,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Regional Leasing",
    "bu": "AMBU",
    "assigned": 42,
    "completed": 0,
    "started": 1,
    "notStarted": 41,
    "completionRatePct": 0.0,
    "engagementRatePct": 2.4
  },
  {
    "department": "Retail Delivery",
    "bu": "AMBU",
    "assigned": 23,
    "completed": 0,
    "started": 4,
    "notStarted": 19,
    "completionRatePct": 0.0,
    "engagementRatePct": 17.4
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
    "started": 0,
    "notStarted": 6,
    "completionRatePct": 0.0,
    "engagementRatePct": 0.0
  },
  {
    "department": "Sales",
    "bu": "DBU",
    "assigned": 33,
    "completed": 2,
    "started": 2,
    "notStarted": 29,
    "completionRatePct": 6.1,
    "engagementRatePct": 12.1
  },
  {
    "department": "Sales Operations",
    "bu": "DBU",
    "assigned": 22,
    "completed": 0,
    "started": 9,
    "notStarted": 13,
    "completionRatePct": 0.0,
    "engagementRatePct": 40.9
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
    "completed": 0,
    "started": 1,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 33.3
  }
];

export const byCountry = [
  {
    "country": "Bahrain",
    "bu": "AMBU",
    "assigned": 47,
    "completed": 3,
    "started": 8,
    "notStarted": 36,
    "completionRatePct": 6.4,
    "engagementRatePct": 23.4
  },
  {
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 79,
    "completed": 0,
    "started": 10,
    "notStarted": 69,
    "completionRatePct": 0.0,
    "engagementRatePct": 12.7
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
    "completed": 2,
    "started": 35,
    "notStarted": 41,
    "completionRatePct": 2.6,
    "engagementRatePct": 47.4
  },
  {
    "country": "Oman",
    "bu": "DBU",
    "assigned": 107,
    "completed": 3,
    "started": 10,
    "notStarted": 94,
    "completionRatePct": 2.8,
    "engagementRatePct": 12.1
  },
  {
    "country": "Saudi Arabia",
    "bu": "DBU",
    "assigned": 11,
    "completed": 5,
    "started": 3,
    "notStarted": 3,
    "completionRatePct": 45.5,
    "engagementRatePct": 72.7
  },
  {
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 339,
    "completed": 8,
    "started": 33,
    "notStarted": 298,
    "completionRatePct": 2.4,
    "engagementRatePct": 12.1
  },
  {
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 236,
    "completed": 5,
    "started": 25,
    "notStarted": 206,
    "completionRatePct": 2.1,
    "engagementRatePct": 12.7
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
    "completed": 0,
    "started": 1,
    "notStarted": 5,
    "completionRatePct": 0.0,
    "engagementRatePct": 16.7
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
    "assigned": 396,
    "completed": 11,
    "started": 59,
    "notStarted": 326,
    "completionRatePct": 2.8,
    "engagementRatePct": 17.7
  },
  {
    "role": "Individual Contributor",
    "bu": "DBU",
    "assigned": 281,
    "completed": 10,
    "started": 31,
    "notStarted": 240,
    "completionRatePct": 3.6,
    "engagementRatePct": 14.6
  },
  {
    "role": "Team Leader",
    "bu": "AMBU",
    "assigned": 150,
    "completed": 3,
    "started": 28,
    "notStarted": 119,
    "completionRatePct": 2.0,
    "engagementRatePct": 20.7
  },
  {
    "role": "Team Leader",
    "bu": "DBU",
    "assigned": 95,
    "completed": 3,
    "started": 7,
    "notStarted": 85,
    "completionRatePct": 3.2,
    "engagementRatePct": 10.5
  },
  {
    "role": "Unspecified",
    "bu": "AMBU",
    "assigned": 10,
    "completed": 0,
    "started": 1,
    "notStarted": 9,
    "completionRatePct": 0.0,
    "engagementRatePct": 10.0
  },
  {
    "role": "Unspecified",
    "bu": "DBU",
    "assigned": 3,
    "completed": 0,
    "started": 1,
    "notStarted": 2,
    "completionRatePct": 0.0,
    "engagementRatePct": 33.3
  }
];

export const assignmentWaves = [
  {
    "date": "2026-06-08",
    "bu": "DBU",
    "assigned": 373
  },
  {
    "date": "2026-06-16",
    "bu": "AMBU",
    "assigned": 549
  },
  {
    "date": "2026-06-22",
    "bu": "AMBU",
    "assigned": 14
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
  }
];
