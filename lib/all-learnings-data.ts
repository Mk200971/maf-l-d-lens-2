// all-learnings-data.ts
// GENERATED 2026-08-13 from "LMS all-learnings export (report 2026-08-13)".
// Aggregated, PII-free. Do not hand-edit — regenerate from the LMS export.
//
// SCOPE: every LMS completion 2025-01-01 -> 2026-08-13.
// This is a SUPERSET of the curated programmes on Programme Overview and of
// Mandatory Learnings. Never add these totals to those pages' totals.
//
// Hours use the Credit Hours field (37 rows fall back to Total Hours).
// 2026 is a PARTIAL year — see meta.partialYearNote.

export const meta = {
  "source": "LMS all-learnings export (report 2026-08-13)",
  "generatedOn": "2026-08-13",
  "windowStart": "2025-01-01",
  "windowEnd": "2026-08-13",
  "hoursField": "Credit Hours",
  "hoursFallbackRows": 37,
  "partialYearNote": "2026 covers 1 Jan – 13 Aug 2026. Not a full year; do not read the 2025 -> 2026 change as a trend.",
  "overlapNote": "Includes the curated programmes shown on Programme Overview and the courses on Mandatory Learnings. These totals are NOT additive with those pages.",
  "skillupNote": "SkillUp here is course-level. The SkillUp page reports completed journeys (99.6 hrs). The two are different grains and must not be summed.",
  "longTailRule": "Items under 1 hour total or with a single learner are flagged isLongTail. They remain in every total.",
  "longTailItems": 168,
  "longTailHours": 132.85,
  "privacyNote": "Aggregated only. No employee names, IDs or manager data are included."
} as const;

export const kpis = {
  "totalHours": 23284.61,
  "totalCompletions": 11454,
  "uniqueLearners": 1167,
  "itemsCount": 344,
  "byBU": {
    "AMBU": 15856.37,
    "DBU": 7428.24
  },
  "byYear": {
    "2025": 16009.38,
    "2026": 7275.23
  }
} as const;

export const categories = [
  {
    "id": "llcoe",
    "label": "Leadership Development (LLCOE)",
    "description": "Flagship multi-module leadership programmes run by the Learning & Leadership COE.",
    "hours": 9171.5,
    "completions": 854,
    "learners": 222,
    "itemCount": 68,
    "sharePct": 39.4
  },
  {
    "id": "curated",
    "label": "Curated BU Programmes",
    "description": "The facilitated programmes tracked in depth on Programme Overview.",
    "hours": 6679.0,
    "completions": 1243,
    "learners": 756,
    "itemCount": 9,
    "sharePct": 28.7
  },
  {
    "id": "compliance",
    "label": "Compliance & Mandatory",
    "description": "Regulatory and policy learning required of all employees.",
    "hours": 3251.27,
    "completions": 5087,
    "learners": 1102,
    "itemCount": 21,
    "sharePct": 14.0
  },
  {
    "id": "catalogue",
    "label": "Wider Catalogue",
    "description": "Workshops, cohort programmes and third-party courses outside the core portfolio.",
    "hours": 1626.97,
    "completions": 525,
    "learners": 390,
    "itemCount": 38,
    "sharePct": 7.0
  },
  {
    "id": "hrsys",
    "label": "HR Systems & Processes",
    "description": "System walkthroughs, performance-cycle and onboarding enablement.",
    "hours": 1263.6,
    "completions": 2536,
    "learners": 830,
    "itemCount": 22,
    "sharePct": 5.4
  },
  {
    "id": "rising",
    "label": "Rising Stars",
    "description": "The Rising Stars early-career development series.",
    "hours": 934.0,
    "completions": 128,
    "learners": 58,
    "itemCount": 4,
    "sharePct": 4.0
  },
  {
    "id": "skillup",
    "label": "SkillUp — individual courses",
    "description": "Course-level completions on the SkillUp e-learning platform. The SkillUp page reports completed journeys (99.6 hrs); these are not additive.",
    "hours": 358.27,
    "completions": 1081,
    "learners": 152,
    "itemCount": 182,
    "sharePct": 1.5
  }
] as const;

export const groups = [
  {
    "id": "mm",
    "categoryId": "llcoe",
    "label": "Managing Mastery",
    "hours": 7072.0,
    "completions": 475,
    "learners": 163,
    "itemCount": 30,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_Self_Leadership_Workshop",
    "categoryId": "curated",
    "label": "Self Leadership Workshop",
    "hours": 3984.0,
    "completions": 498,
    "learners": 497,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "ttlp",
    "categoryId": "llcoe",
    "label": "Top Talent Leadership Programme",
    "hours": 1104.0,
    "completions": 128,
    "learners": 33,
    "itemCount": 9,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_Psychological_Safety",
    "categoryId": "curated",
    "label": "The 4 Stages of Psychological Safety™ - AMBU UAE",
    "hours": 1100.0,
    "completions": 220,
    "learners": 220,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "infosec",
    "categoryId": "compliance",
    "label": "Information Security Awareness",
    "hours": 876.16,
    "completions": 888,
    "learners": 860,
    "itemCount": 3,
    "isConsolidated": true
  },
  {
    "id": "item::Situational_Leadership_WorkS",
    "categoryId": "curated",
    "label": "Situational Leadership Workshop",
    "hours": 816.0,
    "completions": 102,
    "learners": 102,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "sustainability",
    "categoryId": "compliance",
    "label": "Sustainability E-learning",
    "hours": 628.7,
    "completions": 926,
    "learners": 790,
    "itemCount": 2,
    "isConsolidated": true
  },
  {
    "id": "elevate-ai",
    "categoryId": "llcoe",
    "label": "Elevate with AI",
    "hours": 502.0,
    "completions": 166,
    "learners": 43,
    "itemCount": 14,
    "isConsolidated": true
  },
  {
    "id": "privacy",
    "categoryId": "compliance",
    "label": "Data Privacy Awareness",
    "hours": 484.12,
    "completions": 895,
    "learners": 827,
    "itemCount": 2,
    "isConsolidated": true
  },
  {
    "id": "item::MAF_HSE_Health&Safety",
    "categoryId": "compliance",
    "label": "Health and Safety E-learning Module",
    "hours": 383.0,
    "completions": 383,
    "learners": 366,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "coc",
    "categoryId": "compliance",
    "label": "Code of Conduct",
    "hours": 381.2,
    "completions": 909,
    "learners": 791,
    "itemCount": 2,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_Rise_Mall_management",
    "categoryId": "curated",
    "label": "RISE Mall Management Program",
    "hours": 376.0,
    "completions": 188,
    "learners": 35,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_Marvels_Total_Rewards",
    "categoryId": "hrsys",
    "label": "Marvels Total Rewards Academy",
    "hours": 360.75,
    "completions": 481,
    "learners": 481,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "ttep",
    "categoryId": "llcoe",
    "label": "Top Talent Executive Development",
    "hours": 360.0,
    "completions": 36,
    "learners": 6,
    "itemCount": 6,
    "isConsolidated": true
  },
  {
    "id": "skillup-courses",
    "categoryId": "skillup",
    "label": "SkillUp individual courses",
    "hours": 358.27,
    "completions": 1048,
    "learners": 152,
    "itemCount": 179,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_Essential_Negotiator",
    "categoryId": "catalogue",
    "label": "The Essential Negotiator",
    "hours": 352.0,
    "completions": 22,
    "learners": 22,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_RS_Teamwork",
    "categoryId": "rising",
    "label": "MAFP_The Power of \"Together\": Teamwork and Collaboration",
    "hours": 336.0,
    "completions": 48,
    "learners": 48,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_RS_Presentation_skills",
    "categoryId": "rising",
    "label": "MAFP _ RS_ Win Your Audience: Presentation Skills",
    "hours": 312.0,
    "completions": 39,
    "learners": 39,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "cultureamp",
    "categoryId": "hrsys",
    "label": "Culture Amp enablement",
    "hours": 287.5,
    "completions": 281,
    "learners": 273,
    "itemCount": 3,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_RS_Communication Skills",
    "categoryId": "rising",
    "label": "MAFP Rising Stars - Connect and Captivate",
    "hours": 280.0,
    "completions": 40,
    "learners": 40,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_Cultivating_Service",
    "categoryId": "catalogue",
    "label": "Cultivating a Service Excellence Mindset",
    "hours": 266.0,
    "completions": 19,
    "learners": 19,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "wlp",
    "categoryId": "catalogue",
    "label": "Women in Leadership Programme",
    "hours": 235.0,
    "completions": 12,
    "learners": 12,
    "itemCount": 3,
    "isConsolidated": true
  },
  {
    "id": "item::MAF_RCM_ONB",
    "categoryId": "hrsys",
    "label": "E-Learning for Recruitment and Onboarding",
    "hours": 165.0,
    "completions": 165,
    "learners": 165,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_INT_0094_IT_AWARE_ONLINE",
    "categoryId": "compliance",
    "label": "MAFP IT Awareness e-Learning",
    "hours": 158.0,
    "completions": 158,
    "learners": 158,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_INT_0095_TOTAL_REWARDS_IN",
    "categoryId": "hrsys",
    "label": "MAFP Total Rewards Induction",
    "hours": 157.0,
    "completions": 157,
    "learners": 157,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_Advanced_CX",
    "categoryId": "catalogue",
    "label": "Advanced CX",
    "hours": 156.0,
    "completions": 13,
    "learners": 13,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_AMBU_Path",
    "categoryId": "curated",
    "label": "PATH: Own Your Career Growth Journey",
    "hours": 132.0,
    "completions": 66,
    "learners": 60,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_Human_Rights",
    "categoryId": "compliance",
    "label": "MAF Human Rights",
    "hours": 121.5,
    "completions": 270,
    "learners": 270,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "bbcs",
    "categoryId": "llcoe",
    "label": "Brain-Based Conversation Skills",
    "hours": 120.0,
    "completions": 40,
    "learners": 5,
    "itemCount": 8,
    "isConsolidated": true
  },
  {
    "id": "item::MAF_AMBU_Resilience_Sessions",
    "categoryId": "curated",
    "label": "Resilience in Uncertain Times online sessions",
    "hours": 108.0,
    "completions": 108,
    "learners": 106,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "lth",
    "categoryId": "catalogue",
    "label": "License to Hire",
    "hours": 105.0,
    "completions": 15,
    "learners": 15,
    "itemCount": 2,
    "isConsolidated": true
  },
  {
    "id": "linkedin",
    "categoryId": "catalogue",
    "label": "LinkedIn Learning",
    "hours": 104.5,
    "completions": 106,
    "learners": 106,
    "itemCount": 5,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_ICG",
    "categoryId": "catalogue",
    "label": "Internal Control and Governance",
    "hours": 98.5,
    "completions": 197,
    "learners": 197,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "allyship",
    "categoryId": "catalogue",
    "label": "Allyship Programme",
    "hours": 98.0,
    "completions": 49,
    "learners": 49,
    "itemCount": 3,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_Observation_Debrief",
    "categoryId": "catalogue",
    "label": "Observation Debrief",
    "hours": 91.0,
    "completions": 13,
    "learners": 12,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::One_MAF_World_Induction",
    "categoryId": "hrsys",
    "label": "One MAF World Induction",
    "hours": 87.0,
    "completions": 58,
    "learners": 42,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_Business_Email_Compromise",
    "categoryId": "compliance",
    "label": "Information Security Business Email Compromise Course",
    "hours": 73.25,
    "completions": 293,
    "learners": 291,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Managing_Virtual_Effectively",
    "categoryId": "curated",
    "label": "Managing Virtual Teams Effectively",
    "hours": 72.0,
    "completions": 36,
    "learners": 36,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Anti-Bribery&Corruption",
    "categoryId": "compliance",
    "label": "Anti-Bribery & Corruption",
    "hours": 62.0,
    "completions": 124,
    "learners": 124,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_Culture_Giving_Rec",
    "categoryId": "catalogue",
    "label": "Culture and Giving & Receiving Feedback",
    "hours": 58.0,
    "completions": 29,
    "learners": 28,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_DBU_6Thinking_Hats",
    "categoryId": "curated",
    "label": "6 Thinking Hats Workshop",
    "hours": 51.0,
    "completions": 17,
    "learners": 17,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Mid-Year_Convos_that_Matter",
    "categoryId": "hrsys",
    "label": "Mid-Year Conversations that Matter",
    "hours": 41.0,
    "completions": 41,
    "learners": 41,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_DBU_Lean_Fundamentals",
    "categoryId": "curated",
    "label": "Lean Fundamentals Workshop",
    "hours": 40.0,
    "completions": 8,
    "learners": 8,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_Combat_Money_Laundering",
    "categoryId": "compliance",
    "label": "Your Role to Combat Money Laundering",
    "hours": 38.5,
    "completions": 77,
    "learners": 76,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_Annual_Bonus_Plan",
    "categoryId": "hrsys",
    "label": "New Group Annual Bonus Plan",
    "hours": 35.25,
    "completions": 705,
    "learners": 518,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFGS_Year_End_Perf_Review2023",
    "categoryId": "hrsys",
    "label": "Year End Performance Review 2023",
    "hours": 32.5,
    "completions": 65,
    "learners": 65,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Talent_Convos_that_Matters",
    "categoryId": "hrsys",
    "label": "Talent & Performance Conversations that Matter",
    "hours": 26.0,
    "completions": 26,
    "learners": 26,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MySuccess_System_Walkthrough",
    "categoryId": "hrsys",
    "label": "MySuccess Employee & Manager Self-Service",
    "hours": 25.8,
    "completions": 129,
    "learners": 129,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::S@M_End_User_Guide",
    "categoryId": "hrsys",
    "label": "S@M End User Guide",
    "hours": 21.3,
    "completions": 355,
    "learners": 354,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Hidden_Disabilities_Sunflower",
    "categoryId": "compliance",
    "label": "Hidden Disabilities Sunflower Programme Training",
    "hours": 18.6,
    "completions": 124,
    "learners": 120,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFL_EMBARK",
    "categoryId": "catalogue",
    "label": "Lifestyle EMBARK Foundation",
    "hours": 18.0,
    "completions": 2,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Effective_Talent_Mapping",
    "categoryId": "catalogue",
    "label": "Effective Talent Mapping for Line Managers Training Session",
    "hours": 16.0,
    "completions": 16,
    "learners": 16,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "maf-leads",
    "categoryId": "llcoe",
    "label": "MAF Leads Keynote",
    "hours": 13.5,
    "completions": 9,
    "learners": 9,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_Accommodation_Audit",
    "categoryId": "compliance",
    "label": "Accommodation Audit Training",
    "hours": 12.15,
    "completions": 27,
    "learners": 27,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::VL_FRAUD_002",
    "categoryId": "compliance",
    "label": "Fraud Risk Awareness",
    "hours": 12.0,
    "completions": 3,
    "learners": 2,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_INT_0087_EMP_SELF_REF",
    "categoryId": "hrsys",
    "label": "Year End Review Employee Self Reflection",
    "hours": 11.0,
    "completions": 11,
    "learners": 11,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::True_MAF_Culture",
    "categoryId": "catalogue",
    "label": "True MAF Culture Offsite",
    "hours": 9.0,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "mafr",
    "categoryId": "catalogue",
    "label": "MAF Retail legacy modules",
    "hours": 7.67,
    "completions": 12,
    "learners": 7,
    "itemCount": 9,
    "isConsolidated": true
  },
  {
    "id": "item::MAFGS_MID_YEAR_REVIEW",
    "categoryId": "hrsys",
    "label": "Mid Year Review eLearning",
    "hours": 7.65,
    "completions": 45,
    "learners": 45,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFCS_Win_presentation_Skills",
    "categoryId": "rising",
    "label": "MAFCS_Win Your Audience: presentation Skills",
    "hours": 6.0,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Mastering_IT_Change_M_NonRetai",
    "categoryId": "catalogue",
    "label": "Mastering IT Change Management - MAFTech",
    "hours": 5.0,
    "completions": 5,
    "learners": 5,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::GS_VISION_BOARD",
    "categoryId": "catalogue",
    "label": "VISION BOARD WORKSHOP Craft a purposeful 2025!",
    "hours": 3.0,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::Contract_Management _raining",
    "categoryId": "catalogue",
    "label": "Holding Contract Management Training",
    "hours": 2.0,
    "completions": 2,
    "learners": 2,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_INT_0003_MPJ NEWHIRES",
    "categoryId": "hrsys",
    "label": "My Performance Journey (New Hires)",
    "hours": 2.0,
    "completions": 2,
    "learners": 2,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_GHE_2018",
    "categoryId": "hrsys",
    "label": "GIFT, HOSPITALITY AND ENTERTAINMENT",
    "hours": 1.26,
    "completions": 3,
    "learners": 3,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "mafr",
    "categoryId": "compliance",
    "label": "MAF Retail legacy modules",
    "hours": 1.25,
    "completions": 3,
    "learners": 3,
    "itemCount": 2,
    "isConsolidated": true
  },
  {
    "id": "item::MAFP_INT_0086_INT_SOS",
    "categoryId": "hrsys",
    "label": "International SOS",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFLI_SOAT_EXCITE",
    "categoryId": "catalogue",
    "label": "School of Analytics & Technology: EXCITE",
    "hours": 1.0,
    "completions": 4,
    "learners": 4,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFLI_SPARK",
    "categoryId": "catalogue",
    "label": "SPARK Great Moments",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_INT_0092_EMP_MNGR_REVIEW",
    "categoryId": "hrsys",
    "label": "Year End Manager Review",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_ Conflict_of_Interest",
    "categoryId": "compliance",
    "label": "Awareness Training on Conflict of Interest",
    "hours": 0.84,
    "completions": 7,
    "learners": 7,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFH_Online_E&M_Self_Service",
    "categoryId": "hrsys",
    "label": "MySuccess Employee and Manager Self Services",
    "hours": 0.5,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::BUSINESS_WRITING_RDD",
    "categoryId": "catalogue",
    "label": "Self-Paced Business Writing",
    "hours": 0.3,
    "completions": 5,
    "learners": 5,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_IDP_User_Guide",
    "categoryId": "hrsys",
    "label": "IDP Guide",
    "hours": 0.05,
    "completions": 5,
    "learners": 3,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAF_IDP_Screencast",
    "categoryId": "hrsys",
    "label": "IDP Screencast",
    "hours": 0.04,
    "completions": 4,
    "learners": 3,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "item::MAFP_PROCESS_EXCELLENCE",
    "categoryId": "catalogue",
    "label": "Process Excellence Academy",
    "hours": 0.0,
    "completions": 1,
    "learners": 1,
    "itemCount": 1,
    "isConsolidated": false
  },
  {
    "id": "skillup-journeys",
    "categoryId": "skillup",
    "label": "SkillUp journey enrolments",
    "hours": 0.0,
    "completions": 33,
    "learners": 33,
    "itemCount": 3,
    "isConsolidated": true
  }
] as const;

export const items = [
  {
    "id": "0032150b-9e0d-4964-b64e-f28b230b2990",
    "title": "CloudOps Prioritization",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "0130f2aa-3839-4864-b67b-18fdb4e27469",
    "title": "Adapting Your Communication Style to Lead Effectively",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 13.5,
    "completions": 30,
    "learners": 30,
    "isLongTail": false
  },
  {
    "id": "05000ff6-9598-42f6-bb5b-667ed8acd709",
    "title": "AI/ML/GenAI : Decision-Making and Critical Thinking in the Age of AI",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.4,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "056770b4-5395-45e7-8063-04e7deeb18de",
    "title": "CAPM(r): Project Performance Domains",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.86,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "06512a7f-f3b3-453c-b95a-aafe8da29948",
    "title": "CCSP Bootcamp February 2025: Session 3 Replay",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.33,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "0737449b-f8c9-48b6-bd83-3dc2fdc7ec3c",
    "title": "CAPM(r): Project Principles",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.64,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "094a7363-2e48-42c7-9563-5856e78b2c69",
    "title": "Strategic Thinking",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.8,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "0a864e57-34f9-4d8c-a66f-8f286e164c42",
    "title": "Lead the Team - Leadership Influence",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.69,
    "completions": 13,
    "learners": 12,
    "isLongTail": false
  },
  {
    "id": "0ae9d6be-1602-4c4e-8900-8ac4906a7ece",
    "title": "New Business Strategy Infrastructure Planning",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.51,
    "completions": 3,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "0c8a5079-c006-4289-8bb9-1f12f5456932",
    "title": "Copilot Microsoft 365: Creating documents efficiently with Copilot for Microsoft 365",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.56,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "0c9889c2-5409-4d6f-aa26-da687dee639b",
    "title": "CCSP Bootcamp September 2024: Session 3 Replay",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.3,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "0cee306c-5012-484b-baae-6174f9afd291",
    "title": "Managing the Responsible Use of AI",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.78,
    "completions": 6,
    "learners": 6,
    "isLongTail": true
  },
  {
    "id": "0d9d98c2-362a-4b06-9b62-fa4ff1ba92cc",
    "title": "CAPM(r): Project Lifecycles",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.12,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "0f6d48b7-510d-4110-9fa8-4b8a0f6d969d",
    "title": "Horizon Scanning: Identifying Future Opportunities",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.76,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "1035f27c-249e-4e5a-a1b2-bdb912a71d30",
    "title": "Managing Employee Development and Growth",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.48,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "11da48bd-f69b-4bc5-9922-67c708f81011",
    "title": "Executive Presence",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.39,
    "completions": 3,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "12076e09-9270-44cf-9c04-04424bf00e75",
    "title": "Handling Difficult Conversations with Grace",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.26,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "12700c3f-f824-4cb2-80e1-b7f5e2d64dfa",
    "title": "Making Difficult Conversations Meaningful",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 12.6,
    "completions": 35,
    "learners": 35,
    "isLongTail": false
  },
  {
    "id": "1315d748-aa95-4681-b2a4-cfb2eb223096",
    "title": "ITIL®: Release, Service Level, and Availability Management",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.89,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "1387e24e-00d4-48aa-b140-6309d18b626d",
    "title": "Cloud Migration Planning",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "15572e02-13e0-4b90-aec4-a00c775288ca",
    "title": "Introduction to Copilot for Microsoft 365",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.48,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "155e1be9-d5d0-4421-8a2e-52073ea10873",
    "title": "Demonstrate the capabilities of Microsoft Power Pages",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.68,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "18986a46-d63e-4802-a3eb-5c9d5c7c1338",
    "title": "Giving Constructive Feedback",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.26,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "1912eab2-a301-458b-b176-ee4300cc3f6a",
    "title": "Demonstrate the capabilities of Microsoft Power Automate",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.47,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "193bdd21-b805-40ec-99a3-6b814b8dbfca",
    "title": "CCSP 2022: Cloud Security Concepts & Design Principles",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.93,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "1aa17fe0-6e0a-475d-bfc0-55dabc881f21",
    "title": "Digital Transformation Strategy",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.1,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "1ba7c2bc-d433-4946-93d7-395c6c928df0",
    "title": "(untitled item)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.52,
    "completions": 4,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "1d44816a-bfd2-4520-ba36-bc8a568ec88e",
    "title": "Foundations and Guardrails for Generative AI",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.08,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "1f0cfdde-6b01-4809-bd27-f03ca33636cb",
    "title": "Artificial intelligence : Onboarding AI into Your Team",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 8.82,
    "completions": 9,
    "learners": 9,
    "isLongTail": false
  },
  {
    "id": "1fd343b8-b949-4b7b-80e8-5237ca635f5a",
    "title": "Using AI for Effective Business Communication",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 5.0,
    "completions": 10,
    "learners": 10,
    "isLongTail": false
  },
  {
    "id": "1fd8c256-78b7-4d38-a354-d9feaa68330b",
    "title": "Change Management in the Age of AI: Leading Your Team to Success",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "206391da-565a-45a7-bcdb-3d595022dcf7",
    "title": "Leading an Innovation Culture to Future-proof Your Organization",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.38,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "225e2802-32ce-48e3-a459-8dbd971de880",
    "title": "CCSP 2022: Cloud Business Continuity Planning",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.58,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "2493b050-7564-423c-9447-d525ca63ff63",
    "title": "Maximizing Team Goals and Feedback for Peak Performance",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 5.39,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "2a7c2708-f01b-4d94-8b4b-cd47b9a01340",
    "title": "Customer Service: Strengthening Your Service Skills",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.48,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "2d564ee7-68ba-4bf1-8dd4-1493201d3996",
    "title": "Shifting from Managing to Directing a Team",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.57,
    "completions": 7,
    "learners": 7,
    "isLongTail": false
  },
  {
    "id": "2e5c6447-7817-47f8-bbeb-6a696c120d72",
    "title": "Cybersecurity for the Healthcare Industry: Protecting Patient Care, Medical Devices, and Health Information Systems",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "30f8941d-6ce4-4aec-b775-8c14f5c7e670",
    "title": "CAPM(r): Work Performance Domain",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.23,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "31c184b6-b9cf-4406-ad54-36fb31b3919f",
    "title": "AI in the IT Industry: Automating and Optimizing IT Operations",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "3214d9b8-78fe-43a8-9382-3dbe859cba36",
    "title": "Driving for Results",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.04,
    "completions": 8,
    "learners": 8,
    "isLongTail": false
  },
  {
    "id": "349f37dd-761e-4c81-ae51-4daeff49771c",
    "title": "(untitled item)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.39,
    "completions": 3,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "37bf76df-8859-4ac1-885d-1246cc157721",
    "title": "CCSP 2022: Cloud Infrastructure & Platform Components",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.55,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "38a4fa07-e8cd-4ebc-b7d8-fbec5e9134ec",
    "title": "CCSP 2022: Cloud Data Security",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.74,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "38c7a812-a24d-42ac-9857-f19f863896c2",
    "title": "AI in Broadcasting and Entertainment Industry",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "39f04bfd-db9a-4e0c-aad4-52ed8aa7d142",
    "title": "Multi‑Cloud Disaster Recovery Implementation",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "3a99a4bd-6d92-4d2d-9cc9-3746c4fa340c",
    "title": "AI in Federal Government: Intelligent Automation and Mission Delivery",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "3b3646a1-90d1-499e-ac8d-0ec6fe8d4edf",
    "title": "AI Software Requirements Planning",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "3bfb3808-fd88-4422-8046-14de6aad2d29",
    "title": "Driving Performance",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.12,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "3c095742-1a37-46a3-ba51-d3741150593a",
    "title": "(untitled item)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "3d501731-0939-4bdc-9994-f8c04c90cbf7",
    "title": "AI in Aerospace and Defence: Advancing Security & Innovation",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "3f4a55c0-802d-11e8-8305-21229c9dd428",
    "title": "Developing Your Business Acumen",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 11.9,
    "completions": 35,
    "learners": 34,
    "isLongTail": false
  },
  {
    "id": "41bbab07-7dc3-4e34-8b9a-2a466a5a06be",
    "title": "Planning a Tech Skilling Strategy",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "43fc26aa-4ccd-4d78-9407-dd7514c4972c",
    "title": "AI in Capital Markets: Predictive Analytics and Algorithmic Trading",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "44a2e020-ee44-4428-b498-ee9d96652dfc",
    "title": "Setting SMART Goals",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "47eb21d0-fbdc-4f68-b4ba-cdba4e875a89",
    "title": "Coaching an Underperforming Employee",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.26,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "48a4920e-c54d-4e20-a887-39050acc8b8a",
    "title": "Providing a Great Customer Experience",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.34,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "4aa051bd-de0f-4288-8d8b-e939d17c5a4f",
    "title": "Leading Ethical AI Transformation",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.18,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "4b2488c5-c958-11e7-8c81-9212ca48e307",
    "title": "Leading through Problem Solving and Decision Making",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 8.58,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "4b24d6ee-c958-11e7-8c81-9212ca48e307",
    "title": "Influencing and Persuading Others",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 12.6,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "4b8cf488-d7c6-4322-8725-d8764f00ae04",
    "title": "Mapping and Analyzing Customer Journeys",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.86,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "4bc12962-73aa-42d1-8e72-2ee5a4322a42",
    "title": "Assessing Your Organization's Potential for High Performance",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.37,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "4c2e05cd-2182-4972-847d-ffa75436a0bc",
    "title": "CCSP 2022: Build & Implement a Physical & Logical Cloud Infrastructure",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.45,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "4d76df21-9bb2-440b-93a3-2939ffe9226e",
    "title": "Cloud Migration Prioritization",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.34,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "4eb34303-b30b-4432-8ad1-68eebebfd83a",
    "title": "Analytical & Critical Thinking",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.26,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "4f4b3ee7-0518-474e-8d62-b5e48d2918b3",
    "title": "Storytelling for Leaders",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.81,
    "completions": 3,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "4fce8d27-b9f4-42d2-bbd4-0d8ec897b968",
    "title": "Managing Multiple Priorities and Your Time Effectively",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 8.45,
    "completions": 65,
    "learners": 53,
    "isLongTail": false
  },
  {
    "id": "550e6e7d-050a-431a-b73e-d55db85a75aa",
    "title": "Connecting with Empathy and Authenticity",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.04,
    "completions": 8,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "56287611-fea5-11e6-8638-0242c0a80b06",
    "title": "Interacting with Customers",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.4,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "5628761f-fea5-11e6-8638-0242c0a80b06",
    "title": "Communicating Effectively with Customers",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.39,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "574e81cf-4641-40bb-86a6-663b6ef6ba7b",
    "title": "OneDrive for Business 2025",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.1,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "59bb6380-2a0a-4276-98db-29b3f04520dd",
    "title": "Social Engineering Awareness for End-Users",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "5a22a9ce-4021-45cf-bdfa-24a3af3f5139",
    "title": "Daily Scrum Strategy",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "5aa54980-213a-4492-b9aa-f898da3bcda7",
    "title": "Leveraging AI in Decision-Making",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.52,
    "completions": 14,
    "learners": 12,
    "isLongTail": false
  },
  {
    "id": "5aada4e4-e93d-454c-b545-3a6c6bd25eff",
    "title": "Sustainability",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.16,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "5c1a99a4-938f-461a-9349-e1be19dc07eb",
    "title": "Problem Solving: Generating Solutions",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 24.7,
    "completions": 65,
    "learners": 65,
    "isLongTail": false
  },
  {
    "id": "5dc0dda9-d1af-4c88-833d-df60a8031cc6",
    "title": "Leading & Managing Teams",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.24,
    "completions": 18,
    "learners": 18,
    "isLongTail": false
  },
  {
    "id": "5ed380fa-5cb2-441b-be21-17d003f6eb7f",
    "title": "CAPM(r): Development Approach & Life Cycle Domain",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.37,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "5f1993b8-e4d7-4f82-9b59-342dc3e0473d",
    "title": "Reimagining the Customer Experience with Generative AI",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.25,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "6173f916-ed93-4ce6-b943-713809d85b77",
    "title": "CCSP Bootcamp September 2024: Session 1 Replay",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.4,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "643b6811-7840-450d-a2c9-38b74c1ec4a8",
    "title": "Cybersecurity for Aerospace & Defence: Protecting Mission-Critical Systems and National Assets",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "68264535-40d4-4797-9830-588bfc36dc6e",
    "title": "Project Capacity Planning",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "693f21fc-97e9-4df4-bb73-d0255d431cb2",
    "title": "Leading through Change",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "6b3561a9-62a1-4307-8719-2d692b32d27b",
    "title": "AI Ethics and Risk",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.39,
    "completions": 3,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "6cb5c1b9-189c-40ac-a242-b3f7fac5a761",
    "title": "Manage the Microsoft Power Platform environment",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.05,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "6e200420-1d72-11e9-a20f-8b28ecf57cd6",
    "title": "ITIL(r) 4 Foundation: Introduction",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.4,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "6e28d246-fe82-47a4-936a-813fd65e3dd1",
    "title": "Communicating with Impact",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.38,
    "completions": 26,
    "learners": 26,
    "isLongTail": false
  },
  {
    "id": "72f556c9-34db-45f7-b66d-d58ceef106c8",
    "title": "CCSP Bootcamp February 2025: Session 2 Replay",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.46,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "742c4280-b19c-40f1-a3b6-2158be34aab0",
    "title": "CCSP 2022: Operational Controls & Standards",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.52,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "745c10cf-191a-454d-9877-aa6054d17b59",
    "title": "Scrum Master: Scrum Master & Facilitation",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.62,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "74fd2e56-0421-4eb5-8027-c139042fb188",
    "title": "Aligning AI Strategy with Business Value",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "7527231c-b7b9-4ab5-b0c1-38cd126e80ee",
    "title": "Mastering Teamwork for Effective Collaboration",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 20.0,
    "completions": 40,
    "learners": 40,
    "isLongTail": false
  },
  {
    "id": "7708be7d-e618-4bfc-9fdf-8263fcda2095",
    "title": "Data Breach Management",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "7d78b0f3-987a-4351-bdeb-d205c845f78a",
    "title": "(untitled item)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.65,
    "completions": 5,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "7ed0de37-784d-4e35-9012-6b0bba7094b9",
    "title": "Customer Service: Engaging with Customers",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.45,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "816bc1b7-19b4-4a8e-945f-86cc7357ef6c",
    "title": "CAPM(r): Team Performance Domain",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.18,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "82bbac32-6b4d-439a-90dd-4bd919db2ccd",
    "title": "CAPM(r): Stakeholder Performance Domain",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.04,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "82f297b0-ae1f-4be4-8228-ac67153ea9a9",
    "title": "Using Strategic Thinking as a Manager",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 4.62,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "8324449f-b52b-4283-96c2-e99d10e47bdc",
    "title": "CCSP Bootcamp February 2025: Session 1 Replay",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.43,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "83ad7c64-5f50-44a7-85b0-38b2f31cb80f",
    "title": "Encouraging Innovation and Experimentation with AI",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.1,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "83dcbf4c-050d-448a-a31f-34cbe13f77f0",
    "title": "CAPM(r): Project Roles & Responsibilities",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.88,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "84cc977b-4ad0-462f-92a0-989dcdc9e20c",
    "title": "CCSP Bootcamp September 2024: Session 2 Replay",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.38,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "86a61b32-8b5e-40e5-9280-59f75a96a8d4",
    "title": "Agile Leadership",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.81,
    "completions": 3,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "872e48a0-73d7-4d4b-9f98-07735cb91ee2",
    "title": "AWS Cloud Security & Compliance",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "87c864a2-2b2b-4043-8040-08ea9d445b41",
    "title": "Describe the business value of the Microsoft Power Platform",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.83,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "892fb5bb-e588-48fa-8aff-4a87f4714141",
    "title": "Customer Service: Generating Effective Solutions",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.98,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "8c16950d-8deb-4101-811b-023197f7aea9",
    "title": "Managing Stakeholder Communication",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 3.06,
    "completions": 18,
    "learners": 17,
    "isLongTail": false
  },
  {
    "id": "8ea6335d-06cb-419b-8fd0-7bed8a66605b",
    "title": "Leading the Team (2021 Update - US)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.93,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "9032acb0-5b2a-48d3-b99e-03ef86b2b38d",
    "title": "CCSP 2022: Identity & Access Management Solutions",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.49,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "90652130-f5b7-43e3-8496-3ceaa6402343",
    "title": "AI in the Automotive Industry: Driving Innovation, Safety, and Smart Mobility",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "93430b0c-4a94-415d-b0fb-99cb99e777b7",
    "title": "Building a Cohesive Team",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 6.36,
    "completions": 12,
    "learners": 12,
    "isLongTail": false
  },
  {
    "id": "936137a9-7ed2-4ad9-ae29-04ca4eed0345",
    "title": "CCSP 2022: Application Security Awareness & Life Cycles",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.89,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "93efa2df-37a2-4c04-9796-6eb9ba474e61",
    "title": "CCSP 2022: Operate & Maintain Physical & Logical Cloud Infrastructure",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.46,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "94729323-aca2-451c-825b-4e7493654dae",
    "title": "Communication Essentials",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 9.72,
    "completions": 54,
    "learners": 54,
    "isLongTail": false
  },
  {
    "id": "96493a65-bbf9-4836-8b09-ea037519a74e",
    "title": "CAPM(r): Project Management Fundamentals and Core Concepts Competency (Intermediate Level)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.47,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "96a7ce4d-0e54-4fd0-8a42-3720438586a8",
    "title": "Control inventory at multiple locations in Dynamics 365 Business Central",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.35,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "98607405-c5d2-4c38-ae56-ffd1239e6b70",
    "title": "Customer Service: Discovering Customer Needs",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.52,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "99fdc72a-ea15-4f34-9fb1-332b4554288c",
    "title": "ERP System Outage Communication Strategy",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "9b9f2edd-e2a4-49cf-81ce-628d80c5070d",
    "title": "Managing Multiple Priorities and Your Time Effectively",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "9e9bd547-20e5-4f33-9238-d2f4486f6216",
    "title": "CCSP 2022: Data Center Design & Risk Analysis",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.84,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "Allyship_Cohort_4",
    "title": "Allyship Programme",
    "groupId": "allyship",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 38.0,
    "completions": 19,
    "learners": 19,
    "isLongTail": false
  },
  {
    "id": "Allyship_Cohort_5",
    "title": "Allyship Programme",
    "groupId": "allyship",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 38.0,
    "completions": 19,
    "learners": 19,
    "isLongTail": false
  },
  {
    "id": "Allyship_Cohort_6",
    "title": "Allyship Programme",
    "groupId": "allyship",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 22.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "Anti-Bribery&Corruption",
    "title": "Anti-Bribery & Corruption",
    "groupId": "item::Anti-Bribery&Corruption",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 62.0,
    "completions": 124,
    "learners": 124,
    "isLongTail": false
  },
  {
    "id": "BUSINESS_WRITING_RDD",
    "title": "Self-Paced Business Writing",
    "groupId": "item::BUSINESS_WRITING_RDD",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 0.3,
    "completions": 5,
    "learners": 5,
    "isLongTail": true
  },
  {
    "id": "Contract_Management _raining",
    "title": "Holding Contract Management Training",
    "groupId": "item::Contract_Management _raining",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 2.0,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "Culture_Amp_Reading_your_Pulse",
    "title": "Culture Amp: Reading your Pulse Report",
    "groupId": "cultureamp",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 2.0,
    "completions": 2,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "Effective_Talent_Mapping",
    "title": "Effective Talent Mapping for Line Managers Training Session",
    "groupId": "item::Effective_Talent_Mapping",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 16.0,
    "completions": 16,
    "learners": 16,
    "isLongTail": false
  },
  {
    "id": "GROW_with_SkillUP_Journey",
    "title": "GROW with SkillUP Journey for Professionals",
    "groupId": "skillup-journeys",
    "categoryId": "skillup",
    "deliveryType": "ONLINE",
    "hours": 0.0,
    "completions": 19,
    "learners": 19,
    "isLongTail": true
  },
  {
    "id": "GS_VISION_BOARD",
    "title": "VISION BOARD WORKSHOP Craft a purposeful 2025!",
    "groupId": "item::GS_VISION_BOARD",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 3.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "Hidden_Disabilities_Sunflower",
    "title": "Hidden Disabilities Sunflower Programme Training",
    "groupId": "item::Hidden_Disabilities_Sunflower",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 18.6,
    "completions": 124,
    "learners": 120,
    "isLongTail": false
  },
  {
    "id": "Introduction_to_Culture-Amp",
    "title": "Introduction to Culture Amp",
    "groupId": "cultureamp",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 266.0,
    "completions": 266,
    "learners": 266,
    "isLongTail": false
  },
  {
    "id": "Introduction_to_Culture_Amp",
    "title": "Culture Amp: Reading your Pulse Report",
    "groupId": "cultureamp",
    "categoryId": "hrsys",
    "deliveryType": "COURSE",
    "hours": 19.5,
    "completions": 13,
    "learners": 7,
    "isLongTail": false
  },
  {
    "id": "LINKEDINLEARNING_18338",
    "title": "Managing Stress for Positive Change",
    "groupId": "linkedin",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 0.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "LINKEDINLEARNING_22987",
    "title": "Holding Yourself Accountable",
    "groupId": "linkedin",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 0.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "LINKEDINLEARNING_24243",
    "title": "Microsoft Teams Essential Training (2019)",
    "groupId": "linkedin",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 2.5,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "LLCOE-LD-BBCS-M1",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​-Module 1: Introduction to Coaching ​",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-BBCS-M2",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​- Module 2: Brain-Based Communication​",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-BBCS-M3",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​- Module 3: Facilitate Insight​",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-BBCS-M4",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​-Module 4: The Dance of Insight",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-BBCS-M5",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​- Module 5: Insight to Action​",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-BBCS-M6",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​-Module 6: Emotional Regulation",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-BBCS-M7",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​- Module 7: Action to Habit​",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-BBCS-M8",
    "title": "Brain-Based Conversation Skills Programme ​[BBCS] ​- Module 8: Brain-Based Communication​",
    "groupId": "bbcs",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 15.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTEP_Y1_M1",
    "title": "Top Talent Executive Development Programme - ​[TTEP-Y1] - Module 1: Enterprise leadership and the importance of strategic alignment",
    "groupId": "ttep",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 60.0,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTEP_Y1_M2",
    "title": "Top Talent Executive Development Programme - ​[TTEP-Y1] - Module 2: The purpose-led enterprise",
    "groupId": "ttep",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 60.0,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTEP_Y1_M3",
    "title": "Top Talent Executive Development Programme - ​[TTEP-Y1] - Module 3: Crafting a Winning Business Strategy",
    "groupId": "ttep",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 60.0,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTEP_Y1_M4",
    "title": "Top Talent Executive Development Programme - ​[TTEP-Y1] - Module 4: Superior organizational capability and architecture",
    "groupId": "ttep",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 60.0,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTEP_Y1_M5",
    "title": "Top Talent Executive Development Programme - ​[TTEP-Y1] - Module 5: Fit-for-purpose management systems",
    "groupId": "ttep",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 60.0,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTEP_Y1_M6",
    "title": "Top Talent Executive Development Programme - ​[TTEP-Y1] - Module 6: Applying the learning to lead your enterprise to success",
    "groupId": "ttep",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 60.0,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y1-SR-MGT-M1",
    "title": "TTLP - Y1 - SR - MGT - Module 1: Making socially responsible decisions",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 102.0,
    "completions": 17,
    "learners": 17,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y1-SR-MGT-M2",
    "title": "TTLP - Y1 - SR - MGT - Module 2: Accelerating change readiness & agility",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 60.0,
    "completions": 10,
    "learners": 10,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y1-SR-MGT-M3",
    "title": "TTLP - Y1 - SR - MGT - Module 3: Navigating strategic inflection points",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 102.0,
    "completions": 17,
    "learners": 17,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y2-M1",
    "title": "TTLP - Y2 - Module 1: Strategic projects: Understanding the complexities and risks​",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 140.0,
    "completions": 14,
    "learners": 14,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y2-M2",
    "title": "TTLP - Y2 - Module 2: Reinterpreting success and performance in strategic projects​",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 140.0,
    "completions": 14,
    "learners": 14,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y2-M3",
    "title": "TTLP - Y2 - Module 3: Structural complexities: Responding to the challenges of scale and pace​",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 140.0,
    "completions": 14,
    "learners": 14,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y2-M4",
    "title": "TTLP - Y2 - Module 4: Sociopolitical complexities: Responding to the challenges of power and people​",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 140.0,
    "completions": 14,
    "learners": 14,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y2-M5",
    "title": "TTLP - Y2 - Module 5: Emergent complexities: Responding to the challenges of uncertainty and change​",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 140.0,
    "completions": 14,
    "learners": 14,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LD-TTLP-Y2-M6",
    "title": "TTLP - Y2 - Module 6: Success by design:  Developing practices for leading strategic projects​",
    "groupId": "ttlp",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 140.0,
    "completions": 14,
    "learners": 14,
    "isLongTail": false
  },
  {
    "id": "LLCOE-LEARN-AI_GO WITH AI_M2",
    "title": "AI Academy Module 2: Career Essentials",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 6.0,
    "completions": 8,
    "learners": 8,
    "isLongTail": false
  },
  {
    "id": "LLCOE-PMA_Managing_Mastery_M2",
    "title": "Managing Mastery - Module 2 cohort 1: Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 208.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH AI_M3_S1",
    "title": "AI Academy: Elevate - Module 3: AI’s Transformation in Business - Part 1",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 18.0,
    "completions": 9,
    "learners": 9,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_C1_L1",
    "title": "AI Academy: Elevate - Global Impact Speaker 1- Fiber 1",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 17.0,
    "completions": 17,
    "learners": 17,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_C1_L2",
    "title": "AI Academy: Elevate - Global Insights Forum - fiber 2",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 11.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_C1_L3",
    "title": "AI Academy: Elevate - Amplif Simulation - fiber 3",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 33.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_C1_L4",
    "title": "AI Academy: Elevate - Global Impact Speaker 2 - fiber 4",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 18.0,
    "completions": 18,
    "learners": 18,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_C1_L5",
    "title": "AI Academy: Elevate - Global Impact Speaker 3 - fiber 5",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 26.0,
    "completions": 26,
    "learners": 26,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_C1_L6",
    "title": "AI Academy: Elevate - Round Table Discussion - fiber 6",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 7.0,
    "completions": 7,
    "learners": 7,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_C1_L7",
    "title": "AI Academy: Elevate - Global Impact Speaker 5 - fiber 7",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 22.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_M3_S2",
    "title": "AI Academy: Elevate - Module 3: AI’s Transformation in Business - Part 2",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 18.0,
    "completions": 9,
    "learners": 9,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_M4",
    "title": "AI Academy: Elevate - Module 4: Data, Decision-Making and Customer Insights",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 220.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_M5_S1",
    "title": "AI Academy: Elevate - Module 5: Ethical AI and Regulatory Considerations - Part 1",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 18.0,
    "completions": 9,
    "learners": 9,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_M5_S2",
    "title": "AI Academy: Elevate - Module 5: Ethical AI and Regulatory Considerations - Part 2",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 18.0,
    "completions": 9,
    "learners": 9,
    "isLongTail": false
  },
  {
    "id": "LLCOE_ELEVATE_WITH_AI_M6",
    "title": "AI Academy: Elevate - Module 6: Leveraging Emerging AI trends for Business Innovation",
    "groupId": "elevate-ai",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 70.0,
    "completions": 10,
    "learners": 10,
    "isLongTail": false
  },
  {
    "id": "LLCOE_MAF_Leads_Keynote",
    "title": "MAF Leads Keynote 'A New World Order' with Professor Rawi Abdelal at The Leadership Institute.",
    "groupId": "maf-leads",
    "categoryId": "llcoe",
    "deliveryType": "COURSE",
    "hours": 13.5,
    "completions": 9,
    "learners": 9,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M1",
    "title": "Managing Mastery – Module 1 Cohort 1: Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 208.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M2_C4",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_Module 2_Managing Others Cohort 4",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 144.0,
    "completions": 18,
    "learners": 18,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M2_C5",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_Module 2_Managing Others Cohort 5",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 120.0,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3",
    "title": "Managing Mastery - Module 3 Cohort 1: Managing the Business",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 208.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C10",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C9 Module 3_Managing the Business",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 208.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C2",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_Module 3_Managing the Business Cohort 2",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 336.0,
    "completions": 21,
    "learners": 21,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C3",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_Module 3_ Managing the Business Cohort 3",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 288.0,
    "completions": 18,
    "learners": 18,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C4",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_Module 3_Managing the Business cohort 4",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 144.0,
    "completions": 18,
    "learners": 18,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C5",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_Module 3_Managing the Business cohort 5",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 120.0,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C6",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C6 Module 3_Managing the Business",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 240.0,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C7",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C7 Module 3_Managing the Business",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 176.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C8",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C8 Module 3_Managing the Business",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 256.0,
    "completions": 16,
    "learners": 16,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Managing_Mastery_M3_C9",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C9 Module 3_Managing the Business",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 256.0,
    "completions": 16,
    "learners": 16,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging Mastery_M1_C2",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C2 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 400.0,
    "completions": 25,
    "learners": 25,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging Mastery_M1_C4",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C4 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 288.0,
    "completions": 18,
    "learners": 18,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging Mastery_M1_C5",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C5 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 240.0,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M1_C10",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C10 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 208.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M1_C3",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C3 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 336.0,
    "completions": 21,
    "learners": 21,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M1_C6",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C6 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 240.0,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M1_C7",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C7 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 176.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M1_C8",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C8 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 256.0,
    "completions": 16,
    "learners": 16,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M1_C9",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C9 Module 1_Managing Self",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 256.0,
    "completions": 16,
    "learners": 16,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M2_C10",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C10 Module 2_Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 208.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M2_C2",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C2 Module 2_Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 336.0,
    "completions": 21,
    "learners": 21,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M2_C3",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C3 Module 2_Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 288.0,
    "completions": 18,
    "learners": 18,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M2_C6",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C6 Module 2_Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 240.0,
    "completions": 15,
    "learners": 15,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M2_C7",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C7 Module 2_Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 176.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M2_C8",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C8 Module 2_Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 256.0,
    "completions": 16,
    "learners": 16,
    "isLongTail": false
  },
  {
    "id": "LLCOE_Manging_Mastery_M2_C9",
    "title": "LLCOE-LEARN-PMA_Managing Mastery_C9 Module 2_Managing Others",
    "groupId": "mm",
    "categoryId": "llcoe",
    "deliveryType": "BLENDED",
    "hours": 256.0,
    "completions": 16,
    "learners": 16,
    "isLongTail": false
  },
  {
    "id": "LYNDA_13164",
    "title": "OneDrive for Business Essential Training",
    "groupId": "linkedin",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 102.0,
    "completions": 102,
    "learners": 102,
    "isLongTail": false
  },
  {
    "id": "LYNDA_8912",
    "title": "Charlene Li on Digital Leadership",
    "groupId": "linkedin",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 0.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFCS_Win_presentation_Skills",
    "title": "MAFCS_Win Your Audience: presentation Skills",
    "groupId": "item::MAFCS_Win_presentation_Skills",
    "categoryId": "rising",
    "deliveryType": "COURSE",
    "hours": 6.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFGS_License_to_Hire",
    "title": "License to Hire",
    "groupId": "lth",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 14.0,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "MAFGS_MID_YEAR_REVIEW",
    "title": "Mid Year Review eLearning",
    "groupId": "item::MAFGS_MID_YEAR_REVIEW",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 7.65,
    "completions": 45,
    "learners": 45,
    "isLongTail": false
  },
  {
    "id": "MAFGS_Year_End_Perf_Review2023",
    "title": "Year End Performance Review 2023",
    "groupId": "item::MAFGS_Year_End_Perf_Review2023",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 32.5,
    "completions": 65,
    "learners": 65,
    "isLongTail": false
  },
  {
    "id": "MAFH_Online_E&M_Self_Service",
    "title": "MySuccess Employee and Manager Self Services",
    "groupId": "item::MAFH_Online_E&M_Self_Service",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 0.5,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFLI_SOAT_EXCITE",
    "title": "School of Analytics & Technology: EXCITE",
    "groupId": "item::MAFLI_SOAT_EXCITE",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 1.0,
    "completions": 4,
    "learners": 4,
    "isLongTail": false
  },
  {
    "id": "MAFLI_SPARK",
    "title": "SPARK Great Moments",
    "groupId": "item::MAFLI_SPARK",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFL_EMBARK",
    "title": "Lifestyle EMBARK Foundation",
    "groupId": "item::MAFL_EMBARK",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 18.0,
    "completions": 2,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFP_Advanced_CX",
    "title": "Advanced CX",
    "groupId": "item::MAFP_Advanced_CX",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 156.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "MAFP_COC_V2",
    "title": "Code of Conduct e-Module",
    "groupId": "coc",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 226.2,
    "completions": 754,
    "learners": 742,
    "isLongTail": false
  },
  {
    "id": "MAFP_Combat_Money_Laundering",
    "title": "Your Role to Combat Money Laundering",
    "groupId": "item::MAFP_Combat_Money_Laundering",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 38.5,
    "completions": 77,
    "learners": 76,
    "isLongTail": false
  },
  {
    "id": "MAFP_Cultivating_Service",
    "title": "Cultivating a Service Excellence Mindset",
    "groupId": "item::MAFP_Cultivating_Service",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 266.0,
    "completions": 19,
    "learners": 19,
    "isLongTail": false
  },
  {
    "id": "MAFP_Culture_Giving_Rec",
    "title": "Culture and Giving & Receiving Feedback",
    "groupId": "item::MAFP_Culture_Giving_Rec",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 58.0,
    "completions": 29,
    "learners": 28,
    "isLongTail": false
  },
  {
    "id": "MAFP_Essential_Negotiator",
    "title": "The Essential Negotiator",
    "groupId": "item::MAFP_Essential_Negotiator",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 352.0,
    "completions": 22,
    "learners": 22,
    "isLongTail": false
  },
  {
    "id": "MAFP_ICG",
    "title": "Internal Control and Governance",
    "groupId": "item::MAFP_ICG",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 98.5,
    "completions": 197,
    "learners": 197,
    "isLongTail": false
  },
  {
    "id": "MAFP_INT_0003_MPJ NEWHIRES",
    "title": "My Performance Journey (New Hires)",
    "groupId": "item::MAFP_INT_0003_MPJ NEWHIRES",
    "categoryId": "hrsys",
    "deliveryType": "COURSE",
    "hours": 2.0,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "MAFP_INT_0072_CODE OF CONDUCT",
    "title": "Code of Conduct",
    "groupId": "coc",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 155.0,
    "completions": 155,
    "learners": 152,
    "isLongTail": false
  },
  {
    "id": "MAFP_INT_0086_INT_SOS",
    "title": "International SOS",
    "groupId": "item::MAFP_INT_0086_INT_SOS",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFP_INT_0087_EMP_SELF_REF",
    "title": "Year End Review Employee Self Reflection",
    "groupId": "item::MAFP_INT_0087_EMP_SELF_REF",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 11.0,
    "completions": 11,
    "learners": 11,
    "isLongTail": false
  },
  {
    "id": "MAFP_INT_0092_EMP_MNGR_REVIEW",
    "title": "Year End Manager Review",
    "groupId": "item::MAFP_INT_0092_EMP_MNGR_REVIEW",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFP_INT_0094_IT_AWARE_ONLINE",
    "title": "MAFP IT Awareness e-Learning",
    "groupId": "item::MAFP_INT_0094_IT_AWARE_ONLINE",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 158.0,
    "completions": 158,
    "learners": 158,
    "isLongTail": false
  },
  {
    "id": "MAFP_INT_0095_TOTAL_REWARDS_IN",
    "title": "MAFP Total Rewards Induction",
    "groupId": "item::MAFP_INT_0095_TOTAL_REWARDS_IN",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 157.0,
    "completions": 157,
    "learners": 157,
    "isLongTail": false
  },
  {
    "id": "MAFP_LTH_Workshop",
    "title": "License to Hire",
    "groupId": "lth",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 91.0,
    "completions": 13,
    "learners": 13,
    "isLongTail": false
  },
  {
    "id": "MAFP_Observation_Debrief",
    "title": "Observation Debrief",
    "groupId": "item::MAFP_Observation_Debrief",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 91.0,
    "completions": 13,
    "learners": 12,
    "isLongTail": false
  },
  {
    "id": "MAFP_PROCESS_EXCELLENCE",
    "title": "Process Excellence Academy",
    "groupId": "item::MAFP_PROCESS_EXCELLENCE",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 0.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFP_Psychological_Safety",
    "title": "The 4 Stages of Psychological Safety™ - AMBU UAE",
    "groupId": "item::MAFP_Psychological_Safety",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 1100.0,
    "completions": 220,
    "learners": 220,
    "isLongTail": false
  },
  {
    "id": "MAFP_RS_Communication Skills",
    "title": "MAFP Rising Stars - Connect and Captivate",
    "groupId": "item::MAFP_RS_Communication Skills",
    "categoryId": "rising",
    "deliveryType": "COURSE",
    "hours": 280.0,
    "completions": 40,
    "learners": 40,
    "isLongTail": false
  },
  {
    "id": "MAFP_RS_Presentation_skills",
    "title": "MAFP _ RS_ Win Your Audience: Presentation Skills",
    "groupId": "item::MAFP_RS_Presentation_skills",
    "categoryId": "rising",
    "deliveryType": "COURSE",
    "hours": 312.0,
    "completions": 39,
    "learners": 39,
    "isLongTail": false
  },
  {
    "id": "MAFP_RS_Teamwork",
    "title": "MAFP_The Power of \"Together\": Teamwork and Collaboration",
    "groupId": "item::MAFP_RS_Teamwork",
    "categoryId": "rising",
    "deliveryType": "COURSE",
    "hours": 336.0,
    "completions": 48,
    "learners": 48,
    "isLongTail": false
  },
  {
    "id": "MAFP_Rise_Mall_management",
    "title": "RISE Mall Management Program",
    "groupId": "item::MAFP_Rise_Mall_management",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 376.0,
    "completions": 188,
    "learners": 35,
    "isLongTail": false
  },
  {
    "id": "MAFP_Self_Leadership_Workshop",
    "title": "Self Leadership Workshop",
    "groupId": "item::MAFP_Self_Leadership_Workshop",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 3984.0,
    "completions": 498,
    "learners": 497,
    "isLongTail": false
  },
  {
    "id": "MAFR_03G963",
    "title": "MAFR SAP Retail and Merchandising Function Overview",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 0.16,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_03G964",
    "title": "MAFR SAP Procurement Function Overview",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 0.16,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_03G966",
    "title": "SAP Overview and Navigation",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_05G032",
    "title": "Code of Conduct",
    "groupId": "mafr",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 1.0,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "MAFR_05G063",
    "title": "Hot Work Training",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 2.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_07M263",
    "title": "Ecommerce Onboarding TTT",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 3.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_07T049",
    "title": "Majid Al Futtaim Values - Arabic Language",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 0.5,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_07T230",
    "title": "Service Now ITSM",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 0.6,
    "completions": 4,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "MAFR_08G233",
    "title": "Change Management Framework",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_08N220",
    "title": "Email, Phishing and Messaging 2.0",
    "groupId": "mafr",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 0.25,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAFR_15M932",
    "title": "EMS Intune MDM/MAM",
    "groupId": "mafr",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 0.08,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAF_ Conflict_of_Interest",
    "title": "Awareness Training on Conflict of Interest",
    "groupId": "item::MAF_ Conflict_of_Interest",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 0.84,
    "completions": 7,
    "learners": 7,
    "isLongTail": true
  },
  {
    "id": "MAF_AMBU_Path",
    "title": "PATH: Own Your Career Growth Journey",
    "groupId": "item::MAF_AMBU_Path",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 132.0,
    "completions": 66,
    "learners": 60,
    "isLongTail": false
  },
  {
    "id": "MAF_AMBU_Resilience_Sessions",
    "title": "Resilience in Uncertain Times online sessions",
    "groupId": "item::MAF_AMBU_Resilience_Sessions",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 108.0,
    "completions": 108,
    "learners": 106,
    "isLongTail": false
  },
  {
    "id": "MAF_Accommodation_Audit",
    "title": "Accommodation Audit Training",
    "groupId": "item::MAF_Accommodation_Audit",
    "categoryId": "compliance",
    "deliveryType": "COURSE",
    "hours": 12.15,
    "completions": 27,
    "learners": 27,
    "isLongTail": false
  },
  {
    "id": "MAF_Annual_Bonus_Plan",
    "title": "New Group Annual Bonus Plan",
    "groupId": "item::MAF_Annual_Bonus_Plan",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 35.25,
    "completions": 705,
    "learners": 518,
    "isLongTail": false
  },
  {
    "id": "MAF_Business_Email_Compromise",
    "title": "Information Security Business Email Compromise Course",
    "groupId": "item::MAF_Business_Email_Compromise",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 73.25,
    "completions": 293,
    "learners": 291,
    "isLongTail": false
  },
  {
    "id": "MAF_DATA_PRIVACY_COMPLIANCE",
    "title": "Data Privacy Awareness",
    "groupId": "privacy",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 26.5,
    "completions": 106,
    "learners": 103,
    "isLongTail": false
  },
  {
    "id": "MAF_DBU_6Thinking_Hats",
    "title": "6 Thinking Hats Workshop",
    "groupId": "item::MAF_DBU_6Thinking_Hats",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 51.0,
    "completions": 17,
    "learners": 17,
    "isLongTail": false
  },
  {
    "id": "MAF_DBU_Lean_Fundamentals",
    "title": "Lean Fundamentals Workshop",
    "groupId": "item::MAF_DBU_Lean_Fundamentals",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 40.0,
    "completions": 8,
    "learners": 8,
    "isLongTail": false
  },
  {
    "id": "MAF_Data_Privacy_E-learning",
    "title": "Data Privacy Awareness",
    "groupId": "privacy",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 457.62,
    "completions": 789,
    "learners": 788,
    "isLongTail": false
  },
  {
    "id": "MAF_GHE_2018",
    "title": "GIFT, HOSPITALITY AND ENTERTAINMENT",
    "groupId": "item::MAF_GHE_2018",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 1.26,
    "completions": 3,
    "learners": 3,
    "isLongTail": false
  },
  {
    "id": "MAF_HSE_Health&Safety",
    "title": "Health and Safety E-learning Module",
    "groupId": "item::MAF_HSE_Health&Safety",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 383.0,
    "completions": 383,
    "learners": 366,
    "isLongTail": false
  },
  {
    "id": "MAF_Human_Rights",
    "title": "MAF Human Rights",
    "groupId": "item::MAF_Human_Rights",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 121.5,
    "completions": 270,
    "learners": 270,
    "isLongTail": false
  },
  {
    "id": "MAF_IDP_Screencast",
    "title": "IDP Screencast",
    "groupId": "item::MAF_IDP_Screencast",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 0.04,
    "completions": 4,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "MAF_IDP_User_Guide",
    "title": "IDP Guide",
    "groupId": "item::MAF_IDP_User_Guide",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 0.05,
    "completions": 5,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "MAF_INFORM_SECURITY_AWARE_2021",
    "title": "Information Security Awareness and Training course",
    "groupId": "infosec",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 34.5,
    "completions": 46,
    "learners": 46,
    "isLongTail": false
  },
  {
    "id": "MAF_INFORM_SECURITY_AWARE_V2",
    "title": "Information Security Awareness V2",
    "groupId": "infosec",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 0.66,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "MAF_Info_Sec_Awareness",
    "title": "Information Security Awareness",
    "groupId": "infosec",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 841.0,
    "completions": 841,
    "learners": 840,
    "isLongTail": false
  },
  {
    "id": "MAF_Marvels_Total_Rewards",
    "title": "Marvels Total Rewards Academy",
    "groupId": "item::MAF_Marvels_Total_Rewards",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 360.75,
    "completions": 481,
    "learners": 481,
    "isLongTail": false
  },
  {
    "id": "MAF_RCM_ONB",
    "title": "E-Learning for Recruitment and Onboarding",
    "groupId": "item::MAF_RCM_ONB",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 165.0,
    "completions": 165,
    "learners": 165,
    "isLongTail": false
  },
  {
    "id": "MAF_Sustainability_E-learning",
    "title": "Sustainability E-learning",
    "groupId": "sustainability",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 553.5,
    "completions": 738,
    "learners": 737,
    "isLongTail": false
  },
  {
    "id": "MAF_Sustainability_Elearning",
    "title": "MAF Sustainability E-learning",
    "groupId": "sustainability",
    "categoryId": "compliance",
    "deliveryType": "ONLINE",
    "hours": 75.2,
    "completions": 188,
    "learners": 177,
    "isLongTail": false
  },
  {
    "id": "MOBILISE_with_SkillUp_Journey",
    "title": "MOBILISE with SkillUp Journey for Managers",
    "groupId": "skillup-journeys",
    "categoryId": "skillup",
    "deliveryType": "ONLINE",
    "hours": 0.0,
    "completions": 9,
    "learners": 9,
    "isLongTail": true
  },
  {
    "id": "MULTIPLY_with_SkillUp_Journey",
    "title": "MULTIPLY with SkillUp Journey for Managers",
    "groupId": "skillup-journeys",
    "categoryId": "skillup",
    "deliveryType": "ONLINE",
    "hours": 0.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": true
  },
  {
    "id": "Managing_Virtual_Effectively",
    "title": "Managing Virtual Teams Effectively",
    "groupId": "item::Managing_Virtual_Effectively",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 72.0,
    "completions": 36,
    "learners": 36,
    "isLongTail": false
  },
  {
    "id": "Mastering_IT_Change_M_NonRetai",
    "title": "Mastering IT Change Management - MAFTech",
    "groupId": "item::Mastering_IT_Change_M_NonRetai",
    "categoryId": "catalogue",
    "deliveryType": "ONLINE",
    "hours": 5.0,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "Mid-Year_Convos_that_Matter",
    "title": "Mid-Year Conversations that Matter",
    "groupId": "item::Mid-Year_Convos_that_Matter",
    "categoryId": "hrsys",
    "deliveryType": "COURSE",
    "hours": 41.0,
    "completions": 41,
    "learners": 41,
    "isLongTail": false
  },
  {
    "id": "MySuccess_System_Walkthrough",
    "title": "MySuccess Employee & Manager Self-Service",
    "groupId": "item::MySuccess_System_Walkthrough",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 25.8,
    "completions": 129,
    "learners": 129,
    "isLongTail": false
  },
  {
    "id": "One_MAF_World_Induction",
    "title": "One MAF World Induction",
    "groupId": "item::One_MAF_World_Induction",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 87.0,
    "completions": 58,
    "learners": 42,
    "isLongTail": false
  },
  {
    "id": "S@M_End_User_Guide",
    "title": "S@M End User Guide",
    "groupId": "item::S@M_End_User_Guide",
    "categoryId": "hrsys",
    "deliveryType": "ONLINE",
    "hours": 21.3,
    "completions": 355,
    "learners": 354,
    "isLongTail": false
  },
  {
    "id": "Situational_Leadership_WorkS",
    "title": "Situational Leadership Workshop",
    "groupId": "item::Situational_Leadership_WorkS",
    "categoryId": "curated",
    "deliveryType": "COURSE",
    "hours": 816.0,
    "completions": 102,
    "learners": 102,
    "isLongTail": false
  },
  {
    "id": "Talent_Convos_that_Matters",
    "title": "Talent & Performance Conversations that Matter",
    "groupId": "item::Talent_Convos_that_Matters",
    "categoryId": "hrsys",
    "deliveryType": "COURSE",
    "hours": 26.0,
    "completions": 26,
    "learners": 26,
    "isLongTail": false
  },
  {
    "id": "True_MAF_Culture",
    "title": "True MAF Culture Offsite",
    "groupId": "item::True_MAF_Culture",
    "categoryId": "catalogue",
    "deliveryType": "COURSE",
    "hours": 9.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "VL_FRAUD_002",
    "title": "Fraud Risk Awareness",
    "groupId": "item::VL_FRAUD_002",
    "categoryId": "compliance",
    "deliveryType": "COURSE",
    "hours": 12.0,
    "completions": 3,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "WLP_2024_Cohort_2",
    "title": "Women in Leadership Programme",
    "groupId": "wlp",
    "categoryId": "catalogue",
    "deliveryType": "BLENDED",
    "hours": 38.0,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "WLP_2024_Cohort_3",
    "title": "Women in Leadership Programme",
    "groupId": "wlp",
    "categoryId": "catalogue",
    "deliveryType": "BLENDED",
    "hours": 57.0,
    "completions": 3,
    "learners": 3,
    "isLongTail": false
  },
  {
    "id": "WLP_Cohort_4",
    "title": "Women in Leadership Programme",
    "groupId": "wlp",
    "categoryId": "catalogue",
    "deliveryType": "BLENDED",
    "hours": 140.0,
    "completions": 7,
    "learners": 7,
    "isLongTail": false
  },
  {
    "id": "a07a4683-cb0a-4099-9d6c-2ccd4284c5ff",
    "title": "Leading through Shared Vision",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 4.48,
    "completions": 7,
    "learners": 7,
    "isLongTail": false
  },
  {
    "id": "a26380b8-feb5-42a8-85fe-38360f1d1d9f",
    "title": "CCSP 2022: Software Assurance & Validation",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.47,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "a4098fac-b3d0-4be3-a8c1-c9c8ee42f157",
    "title": "Enhancing Communication through Listening",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.38,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "a417f131-d11c-4f42-a397-d26d84bcb4de",
    "title": "Cybersecurity for the Federal Government: Securing Federal Systems and Public Services",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "a4cbcf2e-64e2-415b-87a3-e730da6624b1",
    "title": "Problem Solving: Defining and Stating the Problem",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.34,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "a5a48d57-89f9-4498-90cd-d64c1ecf67e9",
    "title": "Making Time for Wellness through Delegation",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.91,
    "completions": 7,
    "learners": 6,
    "isLongTail": true
  },
  {
    "id": "a62defb4-9a98-41e6-9fed-eed0e73ff13c",
    "title": "ITIL®: The Service Value Chain and General Management Practices",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.03,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "a6d2f323-ed52-4b7b-834e-35bc80785802",
    "title": "Problem Solving: Choosing and Implementing the Right Solution",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 6.93,
    "completions": 21,
    "learners": 21,
    "isLongTail": false
  },
  {
    "id": "ab6d3add-79a5-4273-963d-34f11adbf567",
    "title": "CAPM(r): Planning Performance Domain",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.16,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "ae2e0231-6648-4b54-8576-1638d44ce24f",
    "title": "Effective Teamwork",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 7.6,
    "completions": 38,
    "learners": 38,
    "isLongTail": false
  },
  {
    "id": "af058d14-531c-4f0e-a6a3-9bb3e8b27fe2",
    "title": "Setting Professional Boundaries with Peers",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 4.29,
    "completions": 33,
    "learners": 32,
    "isLongTail": false
  },
  {
    "id": "af09b068-b92b-4aa0-88f6-c485c0811873",
    "title": "Optimize and extend Copilot for Microsoft 365",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.78,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "afb3324a-e516-43e8-b73a-01079f03994a",
    "title": "Expanding Your Communication Skill Set",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 33.2,
    "completions": 83,
    "learners": 83,
    "isLongTail": false
  },
  {
    "id": "b15064d1-1e47-4d76-a0c1-59dfebbc7491",
    "title": "Navigating Cross-functional Teams",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.38,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "b166ed3a-b3b4-4345-b30a-5a92da55b80f",
    "title": "Synchronize Goals to Optimize Your Team",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.43,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "b16bbfda-f380-4ccc-a3c8-3cfd0175b323",
    "title": "Running Effective Meetings",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.26,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "b7d1d4a3-36ca-43fc-825c-f95557551bc5",
    "title": "Reinventing and Rethinking Business Models",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.71,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "b8f5e663-f5b3-4516-988e-a075481442cb",
    "title": "Cybersecurity for the Manufacturing Industry: Securing Industrial Systems, Smart Factories, and Global Supply Chains",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "b90f64a3-0df7-41a0-8335-038f8839a1c0",
    "title": "Customer Service: Interpreting Customers' Service Priorities",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.44,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "b9616597-7ee5-4c49-a5a0-62ba38e692b3",
    "title": "Explore the possibilities with Copilot for Microsoft 365",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.73,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "bb6de247-9df2-403b-b227-ebe00d8ee853",
    "title": "CCSP 2022: Manage Security Operations",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.48,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "bc1db6a9-0640-478f-8a35-d2752c1f82ee",
    "title": "CCSP 2022: Cloud Computing Concepts & Reference Architectures",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.0,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "bc468bb8-21bc-483a-a30f-a1d8f0579312",
    "title": "Leading in the Age of Generative AI",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.6,
    "completions": 5,
    "learners": 5,
    "isLongTail": false
  },
  {
    "id": "be77ff33-66f8-44e4-9084-dc2d6358f058",
    "title": "AI Foundations Awareness (Entry Level)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 5.25,
    "completions": 35,
    "learners": 35,
    "isLongTail": false
  },
  {
    "id": "c1c86188-f5b3-4d5a-a8fa-21e95811a7eb",
    "title": "Viewing the Big Picture Strategically",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.34,
    "completions": 6,
    "learners": 6,
    "isLongTail": false
  },
  {
    "id": "c48d05f2-477b-4526-bebf-b62f23e79eec",
    "title": "Considerations for Using AI Responsibly",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 4.16,
    "completions": 32,
    "learners": 28,
    "isLongTail": false
  },
  {
    "id": "c6d81f79-38c1-4419-8233-641798f2040f",
    "title": "Cybersecurity for the Banking Industry: Protecting Core Banking Systems and Digital Channels",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "c7237137-623b-4954-bc10-1af466b194fc",
    "title": "Providing Constructive Feedback During Performance Reviews",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.69,
    "completions": 13,
    "learners": 12,
    "isLongTail": false
  },
  {
    "id": "c81b2c59-580a-488d-917e-3ba4443bf2d0",
    "title": "Product Launch Decisions",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "cae2b447-4040-4ed4-9d1b-9d15ad2afb28",
    "title": "Customer Obsession",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.36,
    "completions": 3,
    "learners": 3,
    "isLongTail": true
  },
  {
    "id": "ccb10cdf-e2cb-4931-bef9-62490ed47a8a",
    "title": "Giving Developmental Feedback to an Underperformer",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "ccf3c746-bd3e-46a8-b6bb-577c29242008",
    "title": "Holding Career Conversations Using the GROW Coaching Model",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "cff0995f-d882-4529-becc-b8f95edfe053",
    "title": "Customer Service: Becoming a Chat Agent Star",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.5,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "d0724370-1e5a-11e9-8c09-d374be0b4595",
    "title": "ITIL(r) 4 Foundation: Key Concepts of Service Management",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.66,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "d09f7e1e-8fe0-444a-8eb2-0efec7d74523",
    "title": "Communicating with Stakeholders when Issues Arise",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "d27ba36a-9163-47bb-8578-71aedca00cb7",
    "title": "Coaching New Manager on their First Software Project",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "d57ef707-9ff3-4548-9149-5e3c1efc9fe2",
    "title": "Reinforcing Strategy with Data",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.33,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "d626e4a1-1693-441d-ad3b-ca17e731119a",
    "title": "Excel 365: Automating data analysis with Copilot in Excel 365",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.08,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "d7764cce-de69-4fb5-82ff-8f8ebc12f160",
    "title": "Program Management Professional (PgMP)(r): Foundations of Program Management",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.8,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "d91f793d-d93a-4d25-bb64-410ac7fdbe3b",
    "title": "Writing Effective User Stories",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "dce1c339-f04d-4237-8118-2395d66dab98",
    "title": "Building Customer Relationships in a Virtual Environment",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.39,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "df2239ae-a90e-4f8c-9f99-a7ee6b197fa9",
    "title": "Customer Service Essentials",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.56,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "dfebf7ce-79e8-4e8d-9674-58502d745a79",
    "title": "Working with Data for Effective Decision Making",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.74,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "e0a6e01d-d87b-45d0-82a3-9676e93a7811",
    "title": "Customer Service: Adapting to Your Customers' Cues",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.56,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "e206942e-69a7-4c63-9bfe-328c0eee2f90",
    "title": "Customer Service: Fostering a Service Mindset",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.47,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "e5d215f9-a7af-43f9-816f-3e63431dc1f4",
    "title": "Artificial Intelligence 2025: Demystifying AI, ML, and Generative AI for Leaders",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.64,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "e5e05add-6ffd-4c60-80dd-c6ce660de86f",
    "title": "Organizational Transformation",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.23,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "e689e101-5d8e-4763-aaab-fb87a5fe095f",
    "title": "Making Ethical Decisions",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.26,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "e9868adc-ee19-4a9f-9441-fae8f705ed7b",
    "title": "Cybersecurity for the Automotive Industry: Securing Connected Vehicles, Embedded Systems, and Mobility Platforms",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "ea3dcc75-d71e-498c-93e9-7832a9e0187c",
    "title": "Managing Conflict on Your Team",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.56,
    "completions": 4,
    "learners": 4,
    "isLongTail": false
  },
  {
    "id": "f007f3d7-379a-4451-89e0-3b53e11fb442",
    "title": "OneDrive for Business 2025: Getting started with OneDrive for Business (2025)",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.78,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "f3a59f2e-2678-4f52-ab86-b4e94788df8f",
    "title": "Demonstrate the capabilities of Microsoft Power Apps",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 1.57,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "f8750f51-ef53-4b9b-a6a5-7662f4928ed8",
    "title": "Customer Focus",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.34,
    "completions": 2,
    "learners": 2,
    "isLongTail": true
  },
  {
    "id": "f94e2a4b-d34b-4384-9954-b80677a40f65",
    "title": "CCSP 2022: Planning & Implementing Security Controls",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.59,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "f9a6a67c-03a4-446d-890b-aa4f6e2cc1e7",
    "title": "Cultivating Empathy and Connection",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "fa9e6fa8-2c77-4aee-8033-e7295ca5fcd9",
    "title": "Customer Empathy and Rapport Building",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.38,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "fb449a0a-7ff8-4c0e-8471-96db1b11f128",
    "title": "Communicating a Security Incident to Executives",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.17,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  },
  {
    "id": "fc8a4589-b043-4fd6-a809-b85287703a0b",
    "title": "Artificial Intelligence 2026: AI in the Workplace",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 13.6,
    "completions": 34,
    "learners": 34,
    "isLongTail": false
  },
  {
    "id": "fd2f4051-e630-4330-bbcf-3f2c807703df",
    "title": "CAPM(r): Project Management Key Concepts",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 2.34,
    "completions": 2,
    "learners": 2,
    "isLongTail": false
  },
  {
    "id": "fd80446e-f309-4818-8016-b08989f72770",
    "title": "Project Risk Identification",
    "groupId": "skillup-courses",
    "categoryId": "skillup",
    "deliveryType": "COURSE",
    "hours": 0.13,
    "completions": 1,
    "learners": 1,
    "isLongTail": true
  }
] as const;

export const byMonth = [
  {
    "month": "2025-01",
    "bu": "AMBU",
    "hours": 97.66,
    "completions": 139
  },
  {
    "month": "2025-01",
    "bu": "DBU",
    "hours": 121.39,
    "completions": 93
  },
  {
    "month": "2025-02",
    "bu": "AMBU",
    "hours": 586.63,
    "completions": 287
  },
  {
    "month": "2025-02",
    "bu": "DBU",
    "hours": 480.1,
    "completions": 182
  },
  {
    "month": "2025-03",
    "bu": "AMBU",
    "hours": 458.18,
    "completions": 160
  },
  {
    "month": "2025-03",
    "bu": "DBU",
    "hours": 121.78,
    "completions": 89
  },
  {
    "month": "2025-04",
    "bu": "AMBU",
    "hours": 791.14,
    "completions": 631
  },
  {
    "month": "2025-04",
    "bu": "DBU",
    "hours": 361.01,
    "completions": 323
  },
  {
    "month": "2025-05",
    "bu": "AMBU",
    "hours": 1493.69,
    "completions": 286
  },
  {
    "month": "2025-05",
    "bu": "DBU",
    "hours": 638.74,
    "completions": 101
  },
  {
    "month": "2025-06",
    "bu": "AMBU",
    "hours": 1200.32,
    "completions": 276
  },
  {
    "month": "2025-06",
    "bu": "DBU",
    "hours": 538.49,
    "completions": 141
  },
  {
    "month": "2025-07",
    "bu": "AMBU",
    "hours": 1445.56,
    "completions": 354
  },
  {
    "month": "2025-07",
    "bu": "DBU",
    "hours": 408.39,
    "completions": 101
  },
  {
    "month": "2025-08",
    "bu": "AMBU",
    "hours": 1539.87,
    "completions": 293
  },
  {
    "month": "2025-08",
    "bu": "DBU",
    "hours": 1013.65,
    "completions": 192
  },
  {
    "month": "2025-09",
    "bu": "AMBU",
    "hours": 323.72,
    "completions": 190
  },
  {
    "month": "2025-09",
    "bu": "DBU",
    "hours": 560.46,
    "completions": 109
  },
  {
    "month": "2025-10",
    "bu": "AMBU",
    "hours": 866.85,
    "completions": 332
  },
  {
    "month": "2025-10",
    "bu": "DBU",
    "hours": 279.15,
    "completions": 112
  },
  {
    "month": "2025-11",
    "bu": "AMBU",
    "hours": 1364.63,
    "completions": 312
  },
  {
    "month": "2025-11",
    "bu": "DBU",
    "hours": 277.09,
    "completions": 111
  },
  {
    "month": "2025-12",
    "bu": "AMBU",
    "hours": 859.22,
    "completions": 276
  },
  {
    "month": "2025-12",
    "bu": "DBU",
    "hours": 181.66,
    "completions": 220
  },
  {
    "month": "2026-01",
    "bu": "AMBU",
    "hours": 420.43,
    "completions": 640
  },
  {
    "month": "2026-01",
    "bu": "DBU",
    "hours": 306.96,
    "completions": 441
  },
  {
    "month": "2026-02",
    "bu": "AMBU",
    "hours": 1076.83,
    "completions": 918
  },
  {
    "month": "2026-02",
    "bu": "DBU",
    "hours": 501.63,
    "completions": 398
  },
  {
    "month": "2026-03",
    "bu": "AMBU",
    "hours": 578.63,
    "completions": 173
  },
  {
    "month": "2026-03",
    "bu": "DBU",
    "hours": 279.63,
    "completions": 56
  },
  {
    "month": "2026-04",
    "bu": "AMBU",
    "hours": 1029.01,
    "completions": 503
  },
  {
    "month": "2026-04",
    "bu": "DBU",
    "hours": 465.72,
    "completions": 260
  },
  {
    "month": "2026-05",
    "bu": "AMBU",
    "hours": 473.76,
    "completions": 421
  },
  {
    "month": "2026-05",
    "bu": "DBU",
    "hours": 216.45,
    "completions": 129
  },
  {
    "month": "2026-06",
    "bu": "AMBU",
    "hours": 684.2,
    "completions": 642
  },
  {
    "month": "2026-06",
    "bu": "DBU",
    "hours": 319.02,
    "completions": 192
  },
  {
    "month": "2026-07",
    "bu": "AMBU",
    "hours": 407.24,
    "completions": 457
  },
  {
    "month": "2026-07",
    "bu": "DBU",
    "hours": 297.44,
    "completions": 393
  },
  {
    "month": "2026-08",
    "bu": "AMBU",
    "hours": 158.8,
    "completions": 381
  },
  {
    "month": "2026-08",
    "bu": "DBU",
    "hours": 59.48,
    "completions": 140
  }
] as const;

export const byCountry = [
  {
    "country": "United Arab Emirates",
    "bu": "AMBU",
    "hours": 8615.88,
    "completions": 4181,
    "learners": 440
  },
  {
    "country": "United Arab Emirates",
    "bu": "DBU",
    "hours": 5823.87,
    "completions": 2369,
    "learners": 252
  },
  {
    "country": "Egypt",
    "bu": "AMBU",
    "hours": 3335.54,
    "completions": 1208,
    "learners": 100
  },
  {
    "country": "Oman",
    "bu": "AMBU",
    "hours": 2314.23,
    "completions": 1224,
    "learners": 109
  },
  {
    "country": "Bahrain",
    "bu": "AMBU",
    "hours": 1147.79,
    "completions": 818,
    "learners": 67
  },
  {
    "country": "Oman",
    "bu": "DBU",
    "hours": 991.92,
    "completions": 846,
    "learners": 123
  },
  {
    "country": "Egypt",
    "bu": "DBU",
    "hours": 460.05,
    "completions": 261,
    "learners": 30
  },
  {
    "country": "Lebanon",
    "bu": "AMBU",
    "hours": 442.93,
    "completions": 240,
    "learners": 24
  },
  {
    "country": "Saudi Arabia",
    "bu": "DBU",
    "hours": 144.38,
    "completions": 291,
    "learners": 17
  },
  {
    "country": "Lebanon",
    "bu": "DBU",
    "hours": 8.02,
    "completions": 16,
    "learners": 5
  }
] as const;

export const byDelivery = [
  {
    "deliveryType": "COURSE",
    "hours": 10960.92,
    "completions": 3032,
    "itemCount": 243
  },
  {
    "deliveryType": "BLENDED",
    "hours": 7809.0,
    "completions": 653,
    "itemCount": 47
  },
  {
    "deliveryType": "ONLINE",
    "hours": 4514.69,
    "completions": 7769,
    "itemCount": 54
  }
] as const;

