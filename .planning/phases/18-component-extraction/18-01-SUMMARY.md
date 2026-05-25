---
phase: 18-component-extraction
plan: "01"
subsystem: i18n
tags: [i18n, translations, footer, mobile-menu, locale-aware-urls]
dependency_graph:
  requires: []
  provides: [translation-dictionary-nav-footer, locale-aware-footer, locale-aware-mobile-menu]
  affects: [src/i18n/locales/en/common.ts, src/i18n/locales/zh/common.ts, src/i18n/locales/fr/common.ts, src/components/Footer.astro, src/components/MobileMenu.astro]
tech_stack:
  added: [WidenStrings<T> TypeScript utility type]
  patterns: [useTranslations(locale) for component text, getRelativeLocaleUrl(locale, path) for all internal links]
key_files:
  created: []
  modified:
    - src/i18n/locales/en/common.ts
    - src/i18n/locales/zh/common.ts
    - src/i18n/locales/fr/common.ts
    - src/i18n/utils.ts
    - src/components/Footer.astro
    - src/components/MobileMenu.astro
decisions:
  - "Use WidenStrings<T> utility type in en/common.ts so zh/fr locale files satisfy Common type with translated string values"
  - "utils.ts CommonTranslations now uses Common (widened) type instead of literal typeof enCommon"
metrics:
  duration_minutes: 12
  completed_date: "2026-05-25"
  tasks_completed: 3
  files_modified: 6
---

# Phase 18 Plan 01: Translation Dictionary Expansion and Component Locale-Wiring Summary

**One-liner:** Added nav/footer translation keys (languageSwitcher, featuresDropdown, methodology, forCoaches, etc.) to all three locale files and wired Footer and MobileMenu to use useTranslations() with getRelativeLocaleUrl() for all internal paths.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Expand translation dictionaries with nav and footer keys | 64f80a2 | en/zh/fr common.ts, utils.ts |
| 2 | Wire Footer with useTranslations and convert bare paths | 98c6c3b | Footer.astro |
| 3 | Wire MobileMenu with useTranslations and convert bare paths | de67019 | MobileMenu.astro |

## Decisions Made

1. **WidenStrings<T> utility type** — The en/common.ts file uses `as const` which creates overly narrow literal string types. zh/fr locale files cannot satisfy `Common = typeof enCommon` since `'功能'` is not assignable to `'Features'`. Added `WidenStrings<T>` generic that recursively converts string literals to `string`, enabling structural type-checking across locales while preserving key shape validation.

2. **utils.ts CommonTranslations** — Updated `CommonTranslations` export to reference `Common` (the widened type) rather than `typeof enCommon`, so callers get a `string`-typed interface rather than English literal types.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript type system too narrow for zh/fr translations**
- **Found during:** Task 1 verification (`npx tsc --noEmit`)
- **Issue:** The plan specified `Common = WidenStrings<typeof common>` but the existing codebase exported `Common = typeof common` (literal types), causing 59 TS2322 errors in zh/fr locale files
- **Fix:** Added `WidenStrings<T>` type utility to en/common.ts and updated the `Common` export; updated utils.ts to use `Common` type for the translations record and return type
- **Files modified:** src/i18n/locales/en/common.ts, src/i18n/utils.ts
- **Commits:** 64f80a2

**2. [Rule 2 - Missing content] Resources column in Footer lacked 5 new pages**
- **Found during:** Task 2 implementation
- **Issue:** The existing Footer.astro Resources column only had Blog and Support links. The plan requires adding methodology, readiness-score, training-load, for-coaches, and compare — these pages exist but were not linked from footer
- **Fix:** Added all 5 links using getRelativeLocaleUrl() with t.footer.* translation keys
- **Files modified:** src/components/Footer.astro
- **Commits:** 98c6c3b

**3. [Rule 2 - Missing content] MobileMenu lacked /methodology and /for-coaches links entirely**
- **Found during:** Task 3 implementation
- **Issue:** The plan references converting "bare paths" at lines 74 and 82, but the actual MobileMenu had no such links at all — Method and Coaches links were absent
- **Fix:** Added both links with getRelativeLocaleUrl() and translated labels
- **Files modified:** src/components/MobileMenu.astro
- **Commits:** de67019

## Known Stubs

None — all translation keys contain real values for all three locales. All internal links are wired to real pages.

## Threat Flags

None — no new trust boundaries introduced. All changes are static HTML generation at build time with no user input, no external API calls, and no new network endpoints.

## Verification Results

- `npx tsc --noEmit`: 0 errors in modified files (1 pre-existing error in content.config.ts unrelated to this plan)
- `npm run build`: exits 0, 12 pages built successfully
- All bare paths removed from Footer.astro and MobileMenu.astro
- All nav/footer text in both components rendered via t() calls
- All three locale files contain identical key structure with locale-specific values

## Self-Check: PASSED

Files exist:
- src/i18n/locales/en/common.ts — FOUND (contains languageSwitcher)
- src/i18n/locales/zh/common.ts — FOUND (contains method: '方法论')
- src/i18n/locales/fr/common.ts — FOUND (contains method: 'Méthode')
- src/components/Footer.astro — FOUND (contains useTranslations)
- src/components/MobileMenu.astro — FOUND (contains useTranslations)

Commits exist:
- 64f80a2 — Task 1 locale dictionaries
- 98c6c3b — Task 2 Footer
- de67019 — Task 3 MobileMenu
