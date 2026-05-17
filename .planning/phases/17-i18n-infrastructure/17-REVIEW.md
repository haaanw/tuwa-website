---
phase: 17-i18n-infrastructure
reviewed: 2026-05-17T12:00:00Z
depth: standard
files_reviewed: 12
files_reviewed_list:
  - astro.config.mjs
  - package.json
  - src/components/Footer.astro
  - src/components/Header.astro
  - src/components/MobileMenu.astro
  - src/i18n/locales/en/common.ts
  - src/i18n/locales/fr/common.ts
  - src/i18n/locales/zh/common.ts
  - src/i18n/utils.ts
  - src/layouts/BaseLayout.astro
  - src/pages/fr/index.astro
  - src/pages/zh/index.astro
findings:
  critical: 0
  warning: 4
  info: 1
  total: 5
status: issues_found
---

# Phase 17: Code Review Report

**Reviewed:** 2026-05-17T12:00:00Z
**Depth:** standard
**Files Reviewed:** 12
**Status:** issues_found

## Summary

The i18n infrastructure establishes a solid foundation: Astro's built-in i18n routing is configured correctly, translation files are type-safe (French and Chinese types are validated against the English source via `Common` type import), and `BaseLayout` conditionally loads CJK fonts. However, the translations are defined but largely unused -- the Header, Footer, and MobileMenu components still render hardcoded English strings despite receiving a `locale` prop and despite translation keys existing for those exact strings. The localized page components (Hero, FeatureGrid, etc.) also don't receive translations.

## Warnings

### WR-01: Header nav text not using translations

**File:** `src/components/Header.astro:41-98`
**Issue:** The Header component receives a `locale` prop and uses `getRelativeLocaleUrl(locale, ...)` for link URLs, but all visible text ("Features", "Blog", "Support", "Get the App") is hardcoded in English. French and Chinese visitors will see English navigation labels despite translated strings existing in `nav.features`, `nav.support`, `nav.blog`, `nav.getApp`.
**Fix:** Import `useTranslations` and use translation keys:
```astro
---
import { useTranslations } from '../i18n/utils';
import type { Locale } from '../i18n/utils';
// ...
const { locale = 'en' } = Astro.props;
const t = useTranslations(locale as Locale);
---
<!-- Then replace hardcoded text -->
<a href={getRelativeLocaleUrl(locale, '/blog')} class="nav-link">{t.nav.blog}</a>
```

### WR-02: Footer nav text not using translations

**File:** `src/components/Footer.astro:42-67`
**Issue:** Same pattern as Header -- the Footer has a `locale` prop used for URL generation, but column headings ("Features", "Resources", "Legal") and link labels ("Privacy Policy", "Terms of Service", etc.) are all hardcoded English. Translation keys for these exist in `footer.*`.
**Fix:** Import `useTranslations` and replace hardcoded strings with `t.footer.features`, `t.footer.resources`, `t.footer.legal`, `t.footer.privacy`, `t.footer.terms`. Also use template replacement for the copyright line:
```astro
const t = useTranslations(locale as Locale);
// copyright:
t.footer.copyright.replace('{year}', String(year))
```

### WR-03: MobileMenu nav text not using translations

**File:** `src/components/MobileMenu.astro:57-88`
**Issue:** MobileMenu receives `locale` prop but renders hardcoded "Features", "Coaching", "Blog", "Support", and "Get the App" in English.
**Fix:** Import and use `useTranslations(locale as Locale)` for all visible text, same pattern as WR-01.

### WR-04: Localized pages don't pass translations to child components

**File:** `src/pages/fr/index.astro:9-20` and `src/pages/zh/index.astro:9-20`
**Issue:** Both pages call `useTranslations()` to get `t`, but only use `t.meta.title` and `t.meta.description` for the layout. The page-level components (`<Hero />`, `<FeatureGrid />`, `<StatsCounter />`, `<LandingCTA />`) receive no locale or translation props, so they will render English content regardless of locale. This means visiting `/fr/` or `/zh/` produces a page with correct metadata but English body content.
**Fix:** Either pass `locale` prop to each component and have them call `useTranslations` internally, or pass the translation object directly. The components will also need their own translation keys added to the locale files (hero headline, feature descriptions, etc. are not yet in the translation dictionaries).

## Info

### IN-01: Font preload occurs even for CJK locales that override the font

**File:** `src/layouts/BaseLayout.astro:29-33`
**Issue:** Line 29 always preloads `GeneralSans-Variable.woff2`, but for `locale === 'zh'` the CSS variable `--font-sans` is overridden to prioritize Noto Sans SC. The preloaded General Sans font will still be downloaded but used only as a fallback, wasting bandwidth for Chinese users. This is minor since it is a single font file and serves as a legitimate fallback.
**Fix:** Optionally conditionalize the preload:
```astro
{!isCJK && (
  <link rel="preload" href="/fonts/GeneralSans-Variable.woff2" as="font" type="font/woff2" crossorigin />
)}
```

---

_Reviewed: 2026-05-17T12:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
