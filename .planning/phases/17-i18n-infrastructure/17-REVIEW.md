---
phase: 17-i18n-infrastructure
reviewed: 2026-05-24T12:00:00Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - astro.config.mjs
  - src/components/Footer.astro
  - src/components/Header.astro
  - src/components/MobileMenu.astro
  - src/i18n/locales/en/common.ts
  - src/i18n/locales/fr/common.ts
  - src/i18n/locales/zh/common.ts
  - src/i18n/utils.ts
  - src/layouts/BaseLayout.astro
  - src/layouts/CJKLayout.astro
  - src/pages/fr/index.astro
  - src/pages/zh/index.astro
findings:
  critical: 0
  warning: 5
  info: 2
  total: 7
status: issues_found
---

# Phase 17: Code Review Report

**Reviewed:** 2026-05-24T12:00:00Z
**Depth:** standard
**Files Reviewed:** 12
**Status:** issues_found

## Summary

The i18n infrastructure has a solid foundation: Astro's built-in i18n routing is configured correctly in `astro.config.mjs`, translation files are type-safe (French and Chinese types are validated against the English source via the `Common` type), and a dedicated `CJKLayout` wrapper loads Noto Sans SC for Chinese pages. However, the translation system is largely unused -- all three navigation components (Header, Footer, MobileMenu) hardcode English text, and several links bypass locale-aware routing entirely. This means non-English pages render English navigation labels and some links break locale context by pointing to the bare English URL.

## Warnings

### WR-01: Footer hardcodes links without locale routing

**File:** `src/components/Footer.astro:56-60`
**Issue:** Five links in the Resources column use bare paths (`/methodology`, `/readiness-score`, `/training-load`, `/for-coaches`, `/compare`) instead of `getRelativeLocaleUrl(locale, ...)`. When rendered on `/fr/` or `/zh/` pages, clicking these links drops the user out of their locale context back to the English version. Other links in the same file correctly use `getRelativeLocaleUrl`, making this inconsistency easy to miss.
**Fix:**
```astro
<li><a href={getRelativeLocaleUrl(locale, '/methodology')} class="nav-link" style="color: var(--color-text-2);">Methodology</a></li>
<li><a href={getRelativeLocaleUrl(locale, '/readiness-score')} class="nav-link" style="color: var(--color-text-2);">Readiness Score</a></li>
<li><a href={getRelativeLocaleUrl(locale, '/training-load')} class="nav-link" style="color: var(--color-text-2);">Training Load</a></li>
<li><a href={getRelativeLocaleUrl(locale, '/for-coaches')} class="nav-link" style="color: var(--color-text-2);">For Coaches</a></li>
<li><a href={getRelativeLocaleUrl(locale, '/compare')} class="nav-link" style="color: var(--color-text-2);">Compare Tuwa</a></li>
```

### WR-02: Header hardcodes links without locale routing

**File:** `src/components/Header.astro:95,98`
**Issue:** The "Method" and "Coaches" desktop nav links use bare paths (`/methodology`, `/for-coaches`) instead of `getRelativeLocaleUrl(locale, ...)`. Same locale-breaking behavior as WR-01, where navigating from a French or Chinese page sends the user to the English version.
**Fix:**
```astro
<a href={getRelativeLocaleUrl(locale, '/methodology')} class="nav-link">Method</a>
<a href={getRelativeLocaleUrl(locale, '/for-coaches')} class="nav-link">Coaches</a>
```

### WR-03: MobileMenu hardcodes links without locale routing

**File:** `src/components/MobileMenu.astro:74,82`
**Issue:** Same as WR-01/WR-02 -- `/methodology` and `/for-coaches` are bare paths, breaking locale context on mobile navigation.
**Fix:**
```astro
<a href={getRelativeLocaleUrl(locale, '/methodology')} class="block mobile-nav-link">Method</a>
<a href={getRelativeLocaleUrl(locale, '/for-coaches')} class="block mobile-nav-link">Coaches</a>
```

### WR-04: Translation keys defined but never consumed by navigation components

**File:** `src/i18n/locales/en/common.ts:1-20`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/MobileMenu.astro`
**Issue:** Translation keys for `nav.features`, `nav.support`, `nav.blog`, `nav.getApp`, `footer.features`, `footer.resources`, `footer.legal`, `footer.privacy`, `footer.terms`, and `footer.copyright` are defined in all three locale files, but none of the navigation components import or use translations. All visible text is hardcoded in English. French and Chinese pages therefore display English navigation labels ("Features", "Support", "Blog", "Get the App", column headings, legal links, and copyright notice).
**Fix:** Import `useTranslations` in each component and use translation keys for all user-visible text. Example for Header:
```astro
---
import { useTranslations, type Locale } from '../i18n/utils';
const { locale = 'en' } = Astro.props;
const t = useTranslations(locale as Locale);
---
<a href={getRelativeLocaleUrl(locale, '/blog')} class="nav-link">{t.nav.blog}</a>
```
For the Footer copyright line with year interpolation:
```astro
{t.footer.copyright.replace('{year}', String(year))}
```

### WR-05: Locale pages do not pass translations or locale to child components

**File:** `src/pages/fr/index.astro:13-28`, `src/pages/zh/index.astro:13-27`
**Issue:** Both locale index pages call `useTranslations()` and obtain `t`, but only use it for `t.meta.title` and `t.meta.description`. The translation object is never passed to any child component (`Hero`, `TrainingDecision`, `TuwaMethod`, `AudienceLanes`, `OutcomeCards`, `FeatureGrid`, `StatsCounter`, `LandingCTA`), so those components will render their default English content regardless of locale. Visiting `/fr/` or `/zh/` produces a page with correct metadata but English body content.
**Fix:** Either pass a `locale` prop to each component and have them call `useTranslations` internally, or pass the translation object directly. The components will also need their own translation keys added to the locale files (hero headline, feature descriptions, etc. are not yet in the translation dictionaries).

## Info

### IN-01: Type export placement in en/common.ts

**File:** `src/i18n/locales/en/common.ts:23-27`
**Issue:** The `WidenStrings` type utility and `Common` type export are placed after the `export default` statement with no visual separation. While valid TypeScript, convention is to place the default export last or to add a comment separator to make secondary exports visible.
**Fix:** Move the type definitions above the `export default` statement, or add a clear comment separator between the default export and the type exports.

### IN-02: CJKLayout overrides --font-sans on :root globally

**File:** `src/layouts/CJKLayout.astro:16-19`
**Issue:** The `<style is:global>` block overrides `--font-sans` on `:root`, which works but is not scoped to Chinese pages. If any other global style later in the cascade also sets `--font-sans`, a specificity conflict could arise. Using `html[lang="zh"]` as the selector would be more defensive and self-documenting.
**Fix:**
```css
html[lang="zh"] {
  --font-sans: 'Noto Sans SC', 'General Sans Variable', system-ui, sans-serif;
}
```

---

_Reviewed: 2026-05-24T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
