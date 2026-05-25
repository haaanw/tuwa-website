---
phase: 21-legal-support-blog
plan: "01"
subsystem: i18n
tags: [i18n, translations, privacy, terms, support, blog, legal, components]
dependency_graph:
  requires: []
  provides:
    - src/i18n/locales/en/privacy.ts
    - src/i18n/locales/en/terms.ts
    - src/i18n/locales/en/support.ts
    - src/i18n/locales/en/blog.ts
    - src/i18n/utils.ts (usePrivacyTranslations, useTermsTranslations, useSupportTranslations, useBlogTranslations)
    - src/layouts/LegalPageLayout.astro (locale-aware with disclaimer banner)
    - src/components/FaqAccordion.astro (locale-aware via useSupportTranslations)
  affects:
    - src/pages/privacy.astro (consumes LegalPageLayout)
    - src/pages/terms.astro (consumes LegalPageLayout)
    - src/pages/support.astro (consumes LegalPageLayout + FaqAccordion)
tech_stack:
  added: []
  patterns:
    - WidenStrings<T> generic utility type for EN namespace files
    - Locale-typed Record map + lookup function pattern in utils.ts
    - Conditional disclaimer banner via showDisclaimer derived boolean
key_files:
  created:
    - src/i18n/locales/en/privacy.ts
    - src/i18n/locales/en/terms.ts
    - src/i18n/locales/en/support.ts
    - src/i18n/locales/en/blog.ts
    - src/i18n/locales/zh/privacy.ts
    - src/i18n/locales/zh/terms.ts
    - src/i18n/locales/zh/support.ts
    - src/i18n/locales/zh/blog.ts
    - src/i18n/locales/fr/privacy.ts
    - src/i18n/locales/fr/terms.ts
    - src/i18n/locales/fr/support.ts
    - src/i18n/locales/fr/blog.ts
  modified:
    - src/i18n/utils.ts
    - src/layouts/LegalPageLayout.astro
    - src/components/FaqAccordion.astro
decisions:
  - "Used disclaimerSection key name in terms.ts EN file to avoid duplicate key collision with translation-disclaimer key (disclaimer is used twice in the EN object)"
  - "zh/fr namespace files use typed annotation pattern (const x: Type = {...}) matching existing zh/fr files"
metrics:
  duration: "~15 minutes"
  completed: "2026-05-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 12
  files_modified: 3
requirements:
  - I18N-09
  - I18N-10
---

# Phase 21 Plan 01: Legal, Support & Blog i18n Namespaces Summary

**One-liner:** 12 typed translation namespace files (privacy/terms/support/blog × en/zh/fr) plus locale-aware LegalPageLayout and FaqAccordion components.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create EN namespace files and extend utils.ts | 3e9ff2b | 12 new namespace files, utils.ts |
| 2 | Update LegalPageLayout and FaqAccordion for locale awareness | c4228d7 | LegalPageLayout.astro, FaqAccordion.astro |

## What Was Built

**12 translation namespace files** following the established WidenStrings pattern:
- EN files: `as const` object + `WidenStrings<typeof x>` exported type
- ZH files: typed annotation with full Chinese translations (formal-but-accessible tone, ISO dates as 2026年X月X日)
- FR files: typed annotation with full French translations (informal "tu" form per D-09, dates as "X mois YYYY")

**utils.ts extensions:**
- 4 new Record maps: `privacyTranslations`, `termsTranslations`, `supportTranslations`, `blogTranslations`
- 4 new lookup functions: `usePrivacyTranslations`, `useTermsTranslations`, `useSupportTranslations`, `useBlogTranslations`

**LegalPageLayout.astro** — now accepts `locale?: string` and `disclaimerText?: string` props. Renders a styled disclaimer banner before the h1 for any non-EN locale when `disclaimerText` is provided. Passes `locale` through to `BaseLayout`.

**FaqAccordion.astro** — now accepts `locale?: string` prop. Replaces hardcoded `faqs` array (8 Q&A items) and "Frequently Asked Questions" heading with `t.faq` and `t.faqHeading` from `useSupportTranslations`. EN pages render identically to before.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Renamed duplicate key `disclaimer` in EN terms.ts**
- **Found during:** Task 1
- **Issue:** The EN terms object had two keys named `disclaimer` — one for the translation disclaimer banner and one for Section 8 (legal disclaimer). TypeScript would silently use the last one, breaking the translation disclaimer.
- **Fix:** Renamed the Section 8 key to `disclaimerSection` in en/terms.ts and corresponding zh/terms.ts and fr/terms.ts files.
- **Files modified:** src/i18n/locales/en/terms.ts, src/i18n/locales/zh/terms.ts, src/i18n/locales/fr/terms.ts
- **Commit:** 3e9ff2b

## Known Stubs

None — all translation keys contain complete content. The namespace files contain placeholder patterns that intentionally defer to Plan 02 for wiring into locale wrapper pages.

## Threat Flags

None — all files are static TypeScript modules committed to git with no runtime user input surface.

## Self-Check: PASSED

- src/i18n/locales/en/privacy.ts — FOUND
- src/i18n/locales/en/terms.ts — FOUND
- src/i18n/locales/en/support.ts — FOUND
- src/i18n/locales/en/blog.ts — FOUND
- src/i18n/locales/zh/privacy.ts — FOUND
- src/i18n/locales/zh/terms.ts — FOUND
- src/i18n/locales/zh/support.ts — FOUND
- src/i18n/locales/zh/blog.ts — FOUND
- src/i18n/locales/fr/privacy.ts — FOUND
- src/i18n/locales/fr/terms.ts — FOUND
- src/i18n/locales/fr/support.ts — FOUND
- src/i18n/locales/fr/blog.ts — FOUND
- Commit 3e9ff2b — FOUND
- Commit c4228d7 — FOUND
- TypeScript: only pre-existing content.config.ts error (astro:content module)
- Astro build: 22 pages built successfully
