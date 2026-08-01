// skillup-data.ts
// GENERATED 2026-08-01 from "AMBU & DBU SKILL UP DATA.xlsx" (955 assignment rows).
// E-learning SkillUP journey assignments (GROW / MOBILISE / MULTIPLY / STEER) for AMBU & DBU.
// Grain: aggregates only — journey x BU, department x BU, country x BU, role x BU, assignment waves.
// Statuses: "Not Started" | "Started" | "Completed". % COMPLETED in source is binary (0/1).

export const meta = {
  "source": "AMBU & DBU SKILL UP DATA.xlsx (LMS assignment export)",
  "generated": "2026-08-01",
  "rows": 955,
  "grainNote": "Aggregates only: journey x BU, department x BU, country x BU, role x BU, assignment waves.",
  "statusNote": "USER ASSIGNMENT STATUS: Not Started | Started | Completed. Source % COMPLETED is binary (0/1).",
  "journeys": [
    "GROW (Professionals)",
    "MOBILISE (Managers)",
    "MULTIPLY (Managers)",
    "STEER (Leaders)"
  ]
} as const;

export const kpis = {
  "totalAssigned": 955,
  "completed": 22,
  "started": 114,
  "notStarted": 819,
  "completionRatePct": 2.3,
  "engagementRatePct": 14.2,
  "journeysCount": 4,
  "byBU": {
    "AMBU": {
      "assigned": 565,
      "completed": 11,
      "started": 70,
      "notStarted": 484,
      "completionRatePct": 1.9,
      "engagementRatePct": 14.3
    },
    "DBU": {
      "assigned": 390,
      "completed": 11,
      "started": 44,
      "notStarted": 335,
      "completionRatePct": 2.8,
      "engagementRatePct": 14.1
    }
  }
} as const;

export const journeys = [
  {
    "journey": "GROW",
    "label": "GROW with SkillUP",
    "audience": "Professionals",
    "bu": "AMBU",
    "assigned": 337,
    "notStarted": 287,
    "started": 43,
    "completed": 7,
    "completionRatePct": 2.1,
    "engagementRatePct": 14.8,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "GROW",
    "label": "GROW with SkillUP",
    "audience": "Professionals",
    "bu": "DBU",
    "assigned": 163,
    "notStarted": 131,
    "started": 27,
    "completed": 5,
    "completionRatePct": 3.1,
    "engagementRatePct": 19.6,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "MOBILISE",
    "label": "MOBILISE with SkillUP",
    "audience": "Managers",
    "bu": "AMBU",
    "assigned": 117,
    "notStarted": 103,
    "started": 12,
    "completed": 2,
    "completionRatePct": 1.7,
    "engagementRatePct": 12,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "MOBILISE",
    "label": "MOBILISE with SkillUP",
    "audience": "Managers",
    "bu": "DBU",
    "assigned": 149,
    "notStarted": 134,
    "started": 9,
    "completed": 6,
    "completionRatePct": 4,
    "engagementRatePct": 10.1,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "MULTIPLY",
    "label": "MULTIPLY with SkillUP",
    "audience": "Managers",
    "bu": "AMBU",
    "assigned": 85,
    "notStarted": 71,
    "started": 12,
    "completed": 2,
    "completionRatePct": 2.4,
    "engagementRatePct": 16.5,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "MULTIPLY",
    "label": "MULTIPLY with SkillUP",
    "audience": "Managers",
    "bu": "DBU",
    "assigned": 15,
    "notStarted": 13,
    "started": 2,
    "completed": 0,
    "completionRatePct": 0,
    "engagementRatePct": 13.3,
    "dueDate": "2026-09-30"
  },
  {
    "journey": "STEER",
    "label": "STEER with SkillUP",
    "audience": "Leaders",
    "bu": "AMBU",
    "assigned": 26,
    "notStarted": 23,
    "started": 3,
    "completed": 0,
    "completionRatePct": 0,
    "engagementRatePct": 11.5,
    "dueDate": "2026-10-07"
  },
  {
    "journey": "STEER",
    "label": "STEER with SkillUP",
    "audience": "Leaders",
    "bu": "DBU",
    "assigned": 63,
    "notStarted": 57,
    "started": 6,
    "completed": 0,
    "completionRatePct": 0,
    "engagementRatePct": 9.5,
    "dueDate": "2026-09-30"
  }
] as const;

export const byDepartment = [
  {
    "department": "Operations",
    "bu": "AMBU",
    "assigned": 118,
    "completed": 3,
    "started": 20,
    "notStarted": 95,
    "completionRatePct": 2.5,
    "engagementRatePct": 19.5
  },
  {
    "department": "Development",
    "bu": "DBU",
    "assigned": 46,
    "completed": 1,
    "started": 4,
    "notStarted": 41,
    "completionRatePct": 2.2,
    "engagementRatePct": 10.9
  },
  {
    "department": "Regional Leasing",
    "bu": "AMBU",
    "assigned": 42,
    "completed": 0,
    "started": 1,
    "notStarted": 41,
    "completionRatePct": 0,
    "engagementRatePct": 2.4
  },
  {
    "department": "Customer Service",
    "bu": "AMBU",
    "assigned": 38,
    "completed": 1,
    "started": 9,
    "notStarted": 28,
    "completionRatePct": 2.6,
    "engagementRatePct": 26.3
  },
  {
    "department": "Lease Contract Management",
    "bu": "AMBU",
    "assigned": 36,
    "completed": 1,
    "started": 2,
    "notStarted": 33,
    "completionRatePct": 2.8,
    "engagementRatePct": 8.3
  },
  {
    "department": "Sales",
    "bu": "DBU",
    "assigned": 33,
    "completed": 1,
    "started": 3,
    "notStarted": 29,
    "completionRatePct": 3,
    "engagementRatePct": 12.1
  },
  {
    "department": "Finance",
    "bu": "DBU",
    "assigned": 31,
    "completed": 0,
    "started": 1,
    "notStarted": 30,
    "completionRatePct": 0,
    "engagementRatePct": 3.2
  },
  {
    "department": "Speciality Leasing",
    "bu": "AMBU",
    "assigned": 30,
    "completed": 0,
    "started": 1,
    "notStarted": 29,
    "completionRatePct": 0,
    "engagementRatePct": 3.3
  },
  {
    "department": "Brand Marketing",
    "bu": "AMBU",
    "assigned": 26,
    "completed": 0,
    "started": 1,
    "notStarted": 25,
    "completionRatePct": 0,
    "engagementRatePct": 3.8
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
    "department": "Retail Delivery",
    "bu": "AMBU",
    "assigned": 24,
    "completed": 0,
    "started": 4,
    "notStarted": 20,
    "completionRatePct": 0,
    "engagementRatePct": 16.7
  },
  {
    "department": "Customer Experience",
    "bu": "DBU",
    "assigned": 24,
    "completed": 0,
    "started": 2,
    "notStarted": 22,
    "completionRatePct": 0,
    "engagementRatePct": 8.3
  },
  {
    "department": "Design",
    "bu": "DBU",
    "assigned": 23,
    "completed": 0,
    "started": 2,
    "notStarted": 21,
    "completionRatePct": 0,
    "engagementRatePct": 8.7
  },
  {
    "department": "Sales Operations",
    "bu": "DBU",
    "assigned": 22,
    "completed": 0,
    "started": 9,
    "notStarted": 13,
    "completionRatePct": 0,
    "engagementRatePct": 40.9
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
    "department": "Collections",
    "bu": "AMBU",
    "assigned": 19,
    "completed": 0,
    "started": 2,
    "notStarted": 17,
    "completionRatePct": 0,
    "engagementRatePct": 10.5
  },
  {
    "department": "Engineering, Sustainability, & Architecture",
    "bu": "AMBU",
    "assigned": 18,
    "completed": 0,
    "started": 1,
    "notStarted": 17,
    "completionRatePct": 0,
    "engagementRatePct": 5.6
  },
  {
    "department": "Financial Planning & Analysis",
    "bu": "AMBU",
    "assigned": 17,
    "completed": 0,
    "started": 1,
    "notStarted": 16,
    "completionRatePct": 0,
    "engagementRatePct": 5.9
  },
  {
    "department": "Asset Marketing",
    "bu": "AMBU",
    "assigned": 17,
    "completed": 1,
    "started": 2,
    "notStarted": 14,
    "completionRatePct": 5.9,
    "engagementRatePct": 17.6
  },
  {
    "department": "Country Head Office",
    "bu": "DBU",
    "assigned": 17,
    "completed": 5,
    "started": 4,
    "notStarted": 8,
    "completionRatePct": 29.4,
    "engagementRatePct": 52.9
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
    "department": "Project Management",
    "bu": "DBU",
    "assigned": 17,
    "completed": 0,
    "started": 0,
    "notStarted": 17,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Customer Experience",
    "bu": "AMBU",
    "assigned": 15,
    "completed": 0,
    "started": 0,
    "notStarted": 15,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "People & Organization",
    "bu": "AMBU",
    "assigned": 14,
    "completed": 2,
    "started": 5,
    "notStarted": 7,
    "completionRatePct": 14.3,
    "engagementRatePct": 50
  },
  {
    "department": "Commercial Management",
    "bu": "DBU",
    "assigned": 14,
    "completed": 0,
    "started": 0,
    "notStarted": 14,
    "completionRatePct": 0,
    "engagementRatePct": 0
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
    "department": "Legal",
    "bu": "DBU",
    "assigned": 13,
    "completed": 0,
    "started": 1,
    "notStarted": 12,
    "completionRatePct": 0,
    "engagementRatePct": 7.7
  },
  {
    "department": "Shopping Malls Projects Management",
    "bu": "DBU",
    "assigned": 12,
    "completed": 0,
    "started": 1,
    "notStarted": 11,
    "completionRatePct": 0,
    "engagementRatePct": 8.3
  },
  {
    "department": "Legal",
    "bu": "AMBU",
    "assigned": 11,
    "completed": 0,
    "started": 0,
    "notStarted": 11,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Data Analytics & Technology",
    "bu": "AMBU",
    "assigned": 11,
    "completed": 0,
    "started": 0,
    "notStarted": 11,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Property Management",
    "bu": "DBU",
    "assigned": 11,
    "completed": 0,
    "started": 0,
    "notStarted": 11,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Community Management",
    "bu": "DBU",
    "assigned": 11,
    "completed": 0,
    "started": 1,
    "notStarted": 10,
    "completionRatePct": 0,
    "engagementRatePct": 9.1
  },
  {
    "department": "CEO Office",
    "bu": "DBU",
    "assigned": 10,
    "completed": 0,
    "started": 3,
    "notStarted": 7,
    "completionRatePct": 0,
    "engagementRatePct": 30
  },
  {
    "department": "Marketing",
    "bu": "DBU",
    "assigned": 10,
    "completed": 0,
    "started": 0,
    "notStarted": 10,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Retail Design & Delivery COE",
    "bu": "AMBU",
    "assigned": 9,
    "completed": 0,
    "started": 1,
    "notStarted": 8,
    "completionRatePct": 0,
    "engagementRatePct": 11.1
  },
  {
    "department": "Key Accounts",
    "bu": "AMBU",
    "assigned": 9,
    "completed": 0,
    "started": 1,
    "notStarted": 8,
    "completionRatePct": 0,
    "engagementRatePct": 11.1
  },
  {
    "department": "Mall Management",
    "bu": "AMBU",
    "assigned": 8,
    "completed": 0,
    "started": 4,
    "notStarted": 4,
    "completionRatePct": 0,
    "engagementRatePct": 50
  },
  {
    "department": "Asset Management",
    "bu": "DBU",
    "assigned": 8,
    "completed": 0,
    "started": 1,
    "notStarted": 7,
    "completionRatePct": 0,
    "engagementRatePct": 12.5
  },
  {
    "department": "Communities Projects Management",
    "bu": "DBU",
    "assigned": 8,
    "completed": 0,
    "started": 0,
    "notStarted": 8,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Security",
    "bu": "AMBU",
    "assigned": 7,
    "completed": 0,
    "started": 2,
    "notStarted": 5,
    "completionRatePct": 0,
    "engagementRatePct": 28.6
  },
  {
    "department": "Planning & Strategy Office",
    "bu": "AMBU",
    "assigned": 7,
    "completed": 0,
    "started": 0,
    "notStarted": 7,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Technical",
    "bu": "DBU",
    "assigned": 7,
    "completed": 0,
    "started": 1,
    "notStarted": 6,
    "completionRatePct": 0,
    "engagementRatePct": 14.3
  },
  {
    "department": "Risk & Compliance",
    "bu": "DBU",
    "assigned": 6,
    "completed": 0,
    "started": 0,
    "notStarted": 6,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Tenant & Customer Growth",
    "bu": "AMBU",
    "assigned": 5,
    "completed": 1,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 20,
    "engagementRatePct": 20
  },
  {
    "department": "Information Technology",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 0,
    "engagementRatePct": 20
  },
  {
    "department": "Community and Facilities Management",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 0,
    "engagementRatePct": 20
  },
  {
    "department": "Corporate Control",
    "bu": "AMBU",
    "assigned": 5,
    "completed": 0,
    "started": 2,
    "notStarted": 3,
    "completionRatePct": 0,
    "engagementRatePct": 40
  },
  {
    "department": "Soft-Services & Risk Management",
    "bu": "AMBU",
    "assigned": 5,
    "completed": 0,
    "started": 0,
    "notStarted": 5,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Planning & Design",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 1,
    "notStarted": 4,
    "completionRatePct": 0,
    "engagementRatePct": 20
  },
  {
    "department": "Customer Service VIC",
    "bu": "AMBU",
    "assigned": 4,
    "completed": 0,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "F&B Leasing",
    "bu": "AMBU",
    "assigned": 4,
    "completed": 0,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Investment & Business Development",
    "bu": "DBU",
    "assigned": 4,
    "completed": 0,
    "started": 0,
    "notStarted": 4,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Golf Operations",
    "bu": "DBU",
    "assigned": 4,
    "completed": 1,
    "started": 2,
    "notStarted": 1,
    "completionRatePct": 25,
    "engagementRatePct": 75
  },
  {
    "department": "Marketing",
    "bu": "AMBU",
    "assigned": 3,
    "completed": 0,
    "started": 0,
    "notStarted": 3,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Finance",
    "bu": "AMBU",
    "assigned": 3,
    "completed": 0,
    "started": 0,
    "notStarted": 3,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Valuation",
    "bu": "AMBU",
    "assigned": 3,
    "completed": 0,
    "started": 1,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 33.3
  },
  {
    "department": "Food and Beverage",
    "bu": "DBU",
    "assigned": 3,
    "completed": 0,
    "started": 2,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 66.7
  },
  {
    "department": "Program Management",
    "bu": "AMBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Marina",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Operations - Engineering",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Golf Course Maintenance",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Capital Projects",
    "bu": "AMBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Executive Management",
    "bu": "DBU",
    "assigned": 2,
    "completed": 0,
    "started": 0,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Technology & Transformation",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Asset Performance",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "CEO Office",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "CFO Office",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Leasing",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "GS - Government Relations",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Property Management",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "CX Product Management",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "People & Organization- Total Rewards",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "Corporate Control Office",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "department": "People & Organization - Learning & Development",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 1,
    "notStarted": 0,
    "completionRatePct": 0,
    "engagementRatePct": 100
  }
] as const;

export const byCountry = [
  {
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "assigned": 339,
    "completed": 5,
    "started": 32,
    "notStarted": 302,
    "completionRatePct": 1.5,
    "engagementRatePct": 10.9
  },
  {
    "country": "United Arab Emirates",
    "bu": "DBU",
    "assigned": 236,
    "completed": 3,
    "started": 27,
    "notStarted": 206,
    "completionRatePct": 1.3,
    "engagementRatePct": 12.7
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
    "country": "Egypt",
    "bu": "AMBU",
    "assigned": 80,
    "completed": 0,
    "started": 9,
    "notStarted": 71,
    "completionRatePct": 0,
    "engagementRatePct": 11.3
  },
  {
    "country": "Oman",
    "bu": "AMBU",
    "assigned": 79,
    "completed": 2,
    "started": 18,
    "notStarted": 59,
    "completionRatePct": 2.5,
    "engagementRatePct": 25.3
  },
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
    "bu": "DBU",
    "assigned": 32,
    "completed": 0,
    "started": 3,
    "notStarted": 29,
    "completionRatePct": 0,
    "engagementRatePct": 9.4
  },
  {
    "country": "Lebanon",
    "bu": "AMBU",
    "assigned": 20,
    "completed": 1,
    "started": 3,
    "notStarted": 16,
    "completionRatePct": 5,
    "engagementRatePct": 20
  },
  {
    "country": "Saudi Arabia",
    "bu": "DBU",
    "assigned": 12,
    "completed": 5,
    "started": 4,
    "notStarted": 3,
    "completionRatePct": 41.7,
    "engagementRatePct": 75
  },
  {
    "country": "Lebanon",
    "bu": "DBU",
    "assigned": 3,
    "completed": 0,
    "started": 0,
    "notStarted": 3,
    "completionRatePct": 0,
    "engagementRatePct": 0
  }
] as const;

export const byRole = [
  {
    "role": "Individual Contributor",
    "bu": "AMBU",
    "assigned": 399,
    "completed": 9,
    "started": 45,
    "notStarted": 345,
    "completionRatePct": 2.3,
    "engagementRatePct": 13.5
  },
  {
    "role": "Individual Contributor",
    "bu": "DBU",
    "assigned": 282,
    "completed": 8,
    "started": 34,
    "notStarted": 240,
    "completionRatePct": 2.8,
    "engagementRatePct": 14.9
  },
  {
    "role": "Team Leader",
    "bu": "AMBU",
    "assigned": 149,
    "completed": 2,
    "started": 23,
    "notStarted": 124,
    "completionRatePct": 1.3,
    "engagementRatePct": 16.8
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
    "role": "N/A",
    "bu": "AMBU",
    "assigned": 10,
    "completed": 0,
    "started": 1,
    "notStarted": 9,
    "completionRatePct": 0,
    "engagementRatePct": 10
  },
  {
    "role": "Customer Ambassador",
    "bu": "AMBU",
    "assigned": 6,
    "completed": 0,
    "started": 1,
    "notStarted": 5,
    "completionRatePct": 0,
    "engagementRatePct": 16.7
  },
  {
    "role": "Business Leader",
    "bu": "DBU",
    "assigned": 5,
    "completed": 0,
    "started": 0,
    "notStarted": 5,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "role": "Expert",
    "bu": "DBU",
    "assigned": 4,
    "completed": 0,
    "started": 2,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 50
  },
  {
    "role": "N/A",
    "bu": "DBU",
    "assigned": 3,
    "completed": 0,
    "started": 1,
    "notStarted": 2,
    "completionRatePct": 0,
    "engagementRatePct": 33.3
  },
  {
    "role": "Customer Ambassador",
    "bu": "DBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  },
  {
    "role": "Expert",
    "bu": "AMBU",
    "assigned": 1,
    "completed": 0,
    "started": 0,
    "notStarted": 1,
    "completionRatePct": 0,
    "engagementRatePct": 0
  }
] as const;

export const assignmentWaves = [
  {
    "date": "2026-06-08",
    "bu": "DBU",
    "assigned": 374
  },
  {
    "date": "2026-06-16",
    "bu": "AMBU",
    "assigned": 551
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
] as const;
