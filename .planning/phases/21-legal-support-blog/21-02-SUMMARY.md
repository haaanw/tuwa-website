---
phase: 21-legal-support-blog
plan: "02"
subsystem: i18n
tags: [i18n, pages, privacy, terms, support, blog, legal, zh, fr, locale-pages]
dependency_graph:
  requires:
    - src/i18n/utils.ts (usePrivacyTranslations, useTermsTranslations, useSupportTranslations, useBlogTranslations)
    - src/layouts/LegalPageLayout.astro (locale + disclaimerText props)
    - src/components/FaqAccordion.astro (locale prop)
    - src/i18n/locales/zh/* and src/i18n/locales/fr/* namespace files
  provides:
    - src/pages/zh/privacy.astro
    - src/pages/fr/privacy.astro
    - src/pages/zh/terms.astro
    - src/pages/fr/terms.astro
    - src/pages/zh/support.astro
    - src/pages/fr/support.astro
    - src/pages/zh/blog/index.astro
    - src/pages/fr/blog/index.astro
  affects:
    - /zh/privacy, /fr/privacy, /zh/terms, /fr/terms (new routes)
    - /zh/support, /fr/support, /zh/blog, /fr/blog (new routes)
tech_stack:
  added: []
  patterns:
    - Locale wrapper page pattern (thin wrappers calling useXxxTranslations(locale))
    - CJK font injection via Noto Sans SC for zh pages, not fr pages
    - Locale-aware date formatting (zh-CN vs fr-FR via toLocaleDateString)
    - Blog post links prefixed with locale (/zh/blog/*, /fr/blog/*)
key_files:
  created:
    - src/pages/zh/privacy.astro
    - src/pages/fr/privacy.astro
    - src/pages/zh/terms.astro
    - src/pages/fr/terms.astro
    - src/pages/zh/support.astro
    - src/pages/fr/support.astro
    - src/pages/zh/blog/index.astro
    - src/pages/fr/blog/index.astro
  modified: []
decisions:
  - "Support pages do not pass disclaimerText to LegalPageLayout — legal disclaimer only needed on privacy and terms per D-03"
  - "zh/privacy dataRetention step 1 renders stepOneStrong key inline with surrounding text rather than mapping steps array, since step 1 requires a <strong> tag mid-sentence in Chinese"
  - "healthKitNote rendered as plain paragraph (no strong wrapping) — the Chinese translation embeds 从不写入 naturally in sentence, not as a separate strong span"
metrics:
  duration: "~10 minutes"
  completed: "2026-05-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 8
  files_modified: 0
requirements:
  - I18N-09
  - I18N-10
---

# Phase 21 Plan 02: Locale Wrapper Pages (zh/fr) Summary

**One-liner:** 8 Astro locale wrapper pages delivering fully translated /zh and /fr routes for Privacy, Terms, Support, and Blog using i18n namespace functions from Plan 01.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create zh/fr wrapper pages for Privacy and Terms | 09469f1 | zh/privacy.astro, fr/privacy.astro, zh/terms.astro, fr/terms.astro |
| 2 | Create zh/fr wrapper pages for Support and Blog | e695b9e | zh/support.astro, fr/support.astro, zh/blog/index.astro, fr/blog/index.astro |

## What Was Built

**4 legal locale pages (Task 1):**
- `zh/privacy.astro` — Full Chinese privacy policy with Noto Sans SC font, disclaimer banner via `disclaimerText={t.disclaimer.text}`, all 9 sections rendered via translation keys
- `fr/privacy.astro` — Full French privacy policy without CJK font, disclaimer banner, all 9 sections
- `zh/terms.astro` — Full Chinese terms of service with Noto Sans SC, disclaimer banner, all 12 numbered sections
- `fr/terms.astro` — Full French terms of service without CJK font, disclaimer banner, all 12 numbered sections

**4 support/blog locale pages (Task 2):**
- `zh/support.astro` — Chinese support page with `<FaqAccordion locale="zh" />` and translated contact section with Noto Sans SC. No disclaimerText (support page excluded per D-03).
- `fr/support.astro` — French support page with `<FaqAccordion locale="fr" />` and translated contact section. No CJK font.
- `zh/blog/index.astro` — Chinese blog listing with `useBlogTranslations('zh')`, Noto Sans SC, zh-CN date formatting, locale-prefixed post links (/zh/blog/*)
- `fr/blog/index.astro` — French blog listing with `useBlogTranslations('fr')`, fr-FR date formatting, locale-prefixed post links (/fr/blog/*)

**Build result:** 30 static pages built successfully (up from 22 pre-phase-21, +8 locale pages).

## Deviations from Plan

None — plan executed exactly as written. All 8 wrapper pages follow the established thin-wrapper pattern. The `zh-CN` date format and FR date format work correctly. Blog collection warnings are pre-existing and expected (empty blog collection).

## Known Stubs

None — all pages render from complete translation namespaces. Blog empty state text is intentional per the EN blog page design (blog collection is empty by design at this stage).

## Threat Flags

None — all files are static Astro pages with no runtime user input. Locale is a build-time constant. Blog post listing renders public content.

## Self-Check: PASSED

- src/pages/zh/privacy.astro — FOUND
- src/pages/fr/privacy.astro — FOUND
- src/pages/zh/terms.astro — FOUND
- src/pages/fr/terms.astro — FOUND
- src/pages/zh/support.astro — FOUND
- src/pages/fr/support.astro — FOUND
- src/pages/zh/blog/index.astro — FOUND
- src/pages/fr/blog/index.astro — FOUND
- Commit 09469f1 — FOUND (Task 1: Privacy + Terms)
- Commit e695b9e — FOUND (Task 2: Support + Blog)
- Astro build: 30 pages built successfully
- All 8 dist routes present: /zh/privacy, /fr/privacy, /zh/terms, /fr/terms, /zh/support, /fr/support, /zh/blog, /fr/blog
