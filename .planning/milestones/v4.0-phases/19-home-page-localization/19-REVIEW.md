---
phase: 19-home-page-localization
reviewed: 2026-05-25T12:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - src/components/FeatureGrid.astro
  - src/components/Hero.astro
  - src/components/LandingCTA.astro
  - src/components/StatsCounter.astro
  - src/i18n/locales/en/home.ts
  - src/i18n/locales/fr/home.ts
  - src/i18n/locales/zh/home.ts
  - src/i18n/utils.ts
  - src/pages/fr/index.astro
  - src/pages/zh/index.astro
findings:
  critical: 0
  warning: 3
  info: 2
  total: 5
status: issues_found
---

# Phase 19: Code Review Report

**Reviewed:** 2026-05-25T12:00:00Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

This phase adds home page localization for French and Chinese locales. The overall pattern is clean: a typed `Home` translation object per locale, a `useHomeTranslations` helper, and locale props threaded through components. The type system (`WidenStrings` utility + `Home` type constraint on FR/ZH files) ensures structural parity across locales. A few issues exist around hardcoded English strings and a missing locale prop on the Chinese page layout.

## Warnings

### WR-01: Hardcoded English aria-label in StatsCounter

**File:** `src/components/StatsCounter.astro:14`
**Issue:** The `aria-label="Tuwa by the numbers"` on the `<section>` element is hardcoded in English. When rendered on `/fr/` or `/zh/`, screen readers will announce an English label, breaking the localization contract.
**Fix:** Add a `sectionAriaLabel` key to the `stats` translation object and use it:
```astro
<section
  aria-label={t.stats.sectionAriaLabel}
  ...
```
Then add to each locale file:
- EN: `sectionAriaLabel: 'Tuwa by the numbers'`
- FR: `sectionAriaLabel: 'Tuwa en chiffres'`
- ZH: `sectionAriaLabel: 'Tuwa 数据概览'`

### WR-02: Feature hrefs are not localized in FR/ZH translation files

**File:** `src/i18n/locales/fr/home.ts:27` and `src/i18n/locales/zh/home.ts:26`
**Issue:** The `href` values in the FR and ZH feature arrays point to `/features/recovery-scoring`, `/features/workload-tracking`, etc. These are the same English-locale paths. While `FeatureGrid.astro` line 17 does call `getRelativeLocaleUrl(locale, f.href)` to prefix the locale, the underlying feature pages at `/fr/features/recovery-scoring` or `/zh/features/recovery-scoring` may not exist. If they do not exist, users clicking feature links on localized pages will get 404s.
**Fix:** Verify that localized feature pages exist at the prefixed paths. If they do not yet exist, either:
1. Create stub pages under `src/pages/fr/features/` and `src/pages/zh/features/`, or
2. Temporarily override the hrefs in FR/ZH to point to the English versions (remove the locale prefix by using absolute paths like `/features/recovery-scoring` and skipping `getRelativeLocaleUrl`).

### WR-03: Chinese page does not pass locale to CJKLayout

**File:** `src/pages/zh/index.astro:13-14`
**Issue:** The `CJKLayout` component is invoked without a `locale` prop. While `CJKLayout` internally hardcodes `locale="zh"` when delegating to `BaseLayout` (line 21 of CJKLayout.astro), this creates a tight coupling. If CJKLayout is ever reused for Japanese or Korean, the hardcoded `zh` would be wrong. This is a minor coupling concern for now since CJK only serves Chinese, but worth noting for future extensibility.
**Fix:** Pass locale explicitly for clarity and future-proofing:
```astro
<CJKLayout
  title={t.meta.title}
  description={t.meta.description}
  locale="zh"
>
```

## Info

### IN-01: English index.astro does not use translation system for meta tags

**File:** `src/pages/index.astro:9-10`
**Issue:** The English index page hardcodes `title="Tuwa"` and `description="Precision training load..."` directly, while the FR and ZH pages use `t.meta.title` and `t.meta.description` from the translation system. This inconsistency means the English meta strings live in two places (the page file and presumably in `en/common.ts`), creating a drift risk.
**Fix:** Update `src/pages/index.astro` to use the translation system consistently:
```astro
const t = useTranslations('en');
---
<BaseLayout
  title={t.meta.title}
  description={t.meta.description}
>
```

### IN-02: App Store badge image is not localized

**File:** `src/components/Hero.astro:76`
**Issue:** The App Store badge SVG (`/badges/app-store-badge.svg`) is the same across all locales. Apple provides localized badge assets for different languages. For FR and ZH users, showing an English "Download on the App Store" badge is functional but not ideal for conversion.
**Fix:** Consider adding locale-specific badge images (e.g., `/badges/app-store-badge-fr.svg`, `/badges/app-store-badge-zh.svg`) and selecting based on locale. This is a low-priority enhancement.

---

_Reviewed: 2026-05-25T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
