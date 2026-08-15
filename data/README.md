# Raw LMS/HR Data Exports - DO NOT COMMIT

## ⚠️ SECURITY WARNING

This directory is reserved for raw LMS and HR data exports that contain **employee PII** including:
- Full names
- @maf.ae email addresses  
- Employee IDs
- Manager email addresses
- Per-person training compliance records

**These files must NEVER be committed to this repository.**

## Source Files (Stored Securely Only)

The following raw export files are stored in the controlled SharePoint location only:

1. `AMBU-DBU-Master-2025-2026-Fixed-v2-3-246896.xlsx` - AMBU/DBU master learning data
2. `AMBU-DBU-Master-2025-2026-Updated-154467.xlsx` - Updated AMBU/DBU master data  
3. `AMBU-DBU-SKILL-UP-DATA-83c817.xlsx` - Skill Up program assignment data

## What Belongs Here

Only the following should ever be committed:
- This README.md file
- Generated aggregate files in `lib/*.ts` that contain **no PII** (no names, no emails, no employee IDs)

## Data Regeneration

When regenerating the aggregate lib/*.ts files from these sources:
1. Download the latest exports from SharePoint
2. Run the transformation scripts locally
3. Verify no PII leaks into the output
4. Commit only the aggregate .ts files
5. Delete the raw .xlsx files immediately

## Storage Location

Raw files are stored in: `[Controlled SharePoint Location - Contact L&D Team]`

---
*Last security review: 2025-08-15*
