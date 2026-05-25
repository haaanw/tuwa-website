---
phase: 18-component-extraction
reviewed: 2026-05-25T12:00:00Z
depth: standard
files_reviewed: 7
files_reviewed_list:
  - src/components/Footer.astro
  - src/components/Header.astro
  - src/components/MobileMenu.astro
  - src/i18n/locales/en/common.ts
  - src/i18n/locales/fr/common.ts
  - src/i18n/locales/zh/common.ts
  - src/i18n/utils.ts
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 18: Code Review Report

**Reviewed:** 2026-05-25T12:00:00Z
**Depth:** standard
**Files Reviewed:** 7
**Status:** issues_found

## Summary

The i18n infrastructure and navigation components are well-structured. The locale files share a common type contract enforced via TypeScript, and the `useTranslations` utility is concise with a safe fallback. The main concerns are: a regex in the Header that incorrectly strips the default locale prefix (potential routing bug), hardcoded App Store URLs duplicated across components instead of using the shared config constant, and duplicated dropdown script logic that could drift.

## Warnings

### WR-01: Locale-stripping regex also strips the default locale prefix on root path

**File:** `src/components/Header.astro:15`
**Issue:** The regex `/^\/[a-z]{2}(\/|$)/` matches ANY two-letter path segment at the start (e.g., `/en/blog` becomes `/blog`, but also `/fr` becomes `/`). If the English locale is the default and has no prefix in URLs, this regex could incorrectly strip a page path that happens to start with two lowercase letters (e.g., a hypothetical `/my/...` page). More critically, for the default `en` locale where `rawPath` is `/blog` (no prefix), the regex won't match -- which is correct. But if `en` pages are ever served with the `/en/` prefix, the switcher would generate correct links. The real risk: this regex would match paths like `/uk/some-page` if such a route existed without being a locale, stripping a real path segment.
**Fix:** Use a more precise check that only strips known locale prefixes:
```typescript
const knownLocales = ['en', 'zh', 'fr'];
const pathSegments = rawPath.split('/');
const pathWithoutLocale = knownLocales.includes(pathSegments[1])
  ? '/' + pathSegments.slice(2).join('/')
  : rawPath;
```

### WR-02: Hardcoded App Store URL bypasses shared config constant

**File:** `src/components/Header.astro:205`
**Issue:** The CTA link uses a hardcoded `https://apps.apple.com/app/tuwa` URL instead of the `APP_STORE_URL` constant that the Footer correctly imports from `../config`. If the App Store URL changes (e.g., gets a region or campaign parameter), this hardcoded instance would be missed.
**Fix:**
```astro
---
import { APP_STORE_URL } from '../config';
---
<!-- Then use it: -->
<a href={APP_STORE_URL} ...>
```

### WR-03: Same hardcoded App Store URL in MobileMenu

**File:** `src/components/MobileMenu.astro:111`
**Issue:** Same issue as WR-02 -- the mobile menu CTA uses a hardcoded App Store URL rather than the shared `APP_STORE_URL` config constant.
**Fix:** Import and use `APP_STORE_URL` from `../config`, same as Footer does.

## Info

### IN-01: Duplicated dropdown script logic across three inline scripts

**File:** `src/components/Header.astro:233-356`
**Issue:** Three nearly identical IIFE scripts handle the features dropdown, desktop language switcher, and mobile language switcher. They share the same open/close/click/escape pattern with minor variations (hover behavior). This duplication means bug fixes or behavior changes must be applied in three places.
**Fix:** Extract a shared `initDropdown(elementId, { hoverEnabled })` utility function into a single inline script block, then call it three times with different IDs/options.

### IN-02: Missing `target="_blank"` on App Store CTA links

**File:** `src/components/Header.astro:205`, `src/components/MobileMenu.astro:111`
**Issue:** The Footer's App Store link uses `target="_blank"` (external link opens in new tab), but the Header and MobileMenu CTA links omit it. This is an inconsistency -- users clicking "Get the App" from the header would navigate away from the site.
**Fix:** Add `target="_blank"` to the CTA links in Header and MobileMenu for consistency with the Footer.

### IN-03: Type assertion on locale prop could be narrowed at the interface level

**File:** `src/components/Footer.astro:11`, `src/components/Header.astro:11`, `src/components/MobileMenu.astro:12`
**Issue:** All three components declare `locale?: string` in their Props interface but then cast it with `as 'en' | 'zh' | 'fr'`. The `Locale` type is already exported from `src/i18n/utils.ts`. Using it in the Props interface would eliminate the cast and catch invalid locales at build time.
**Fix:**
```typescript
import type { Locale } from '../i18n/utils';

interface Props {
  locale?: Locale;
}
const { locale = 'en' } = Astro.props;
const t = useTranslations(locale);
```

---

_Reviewed: 2026-05-25T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
