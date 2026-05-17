---
phase: 17-i18n-infrastructure
verified: 2026-05-17T10:25:00Z
status: gaps_found
score: 3/4 must-haves verified
overrides_applied: 0
gaps:
  - truth: "English pages at unprefixed URLs load identically to before (no performance regression, no new network requests)"
    status: failed
    reason: "CJK font CSS (~235KB across two files) loads on ALL pages including English and French. The `await import()` conditional in BaseLayout.astro frontmatter does not isolate CSS at build time -- Astro/Vite bundles it unconditionally into every page that uses BaseLayout."
    artifacts:
      - path: "src/layouts/BaseLayout.astro"
        issue: "Lines 19-22: `if (isCJK) { await import(...) }` does not prevent Vite from including CSS in the build output for all pages sharing this layout"
      - path: "dist/index.html"
        issue: "Contains <link> tags for 400.CbG1p38Q.css and 700.Blm7sXuU.css (Noto Sans SC) -- should have zero CJK references"
      - path: "dist/fr/index.html"
        issue: "Contains <link> tags for Noto Sans SC CSS -- should have zero CJK references"
    missing:
      - "CJK font CSS must only appear in dist/zh/ pages. Switch to an approach that actually isolates the CSS: either (a) a dedicated CJKLayout.astro that imports the font, used only by zh pages, or (b) conditional <link> tags with resolved URLs that Astro can tree-shake, or (c) move the @fontsource import into zh/index.astro itself rather than the shared BaseLayout."
---

# Phase 17: i18n Infrastructure Verification Report

**Phase Goal:** The site has working locale routing, a type-safe translation utility, and CJK font loading -- without any visible content changes to existing English pages
**Verified:** 2026-05-17T10:25:00Z
**Status:** gaps_found
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Navigating to /zh/ or /fr/ serves a page without 404 | VERIFIED | `dist/zh/index.html` and `dist/fr/index.html` exist; build produces 12 pages; `lang="zh"` and `lang="fr"` confirmed in output |
| 2 | A t() utility resolves translation keys with full type safety | VERIFIED | `src/i18n/utils.ts` exports `useTranslations` with typed return; zh/fr files typed against `Common` from en; IDE autocomplete works via `typeof enCommon` |
| 3 | Chinese text renders in Noto Sans SC on /zh/ pages | VERIFIED | `dist/zh/index.html` contains `--font-sans: 'Noto Sans SC'` override and links to Noto Sans SC CSS files |
| 4 | English pages at unprefixed URLs load identically to before | FAILED | English `dist/index.html` now includes two `<link>` tags for CJK font CSS (~235KB total). Same leak on French pages. Performance regression. |

**Score:** 3/4 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `astro.config.mjs` | i18n routing config | VERIFIED | Contains `i18n:` block with `locales: ["en", "zh", "fr"]`, `defaultLocale: "en"`, `prefixDefaultLocale: false` |
| `src/i18n/utils.ts` | useTranslations function | VERIFIED | Exports `useTranslations`, `Locale`, `CommonTranslations`; static imports; fallback `locale ?? 'en'` |
| `src/i18n/locales/en/common.ts` | English baseline + Common type | VERIFIED | `as const` assertion, exports `Common` type, nav/footer/meta keys |
| `src/i18n/locales/zh/common.ts` | Chinese translations | VERIFIED | `import type { Common }` from en, typed `const common: Common`, Chinese strings present |
| `src/i18n/locales/fr/common.ts` | French translations | VERIFIED | `import type { Common }` from en, typed `const common: Common`, proper French diacritics |
| `src/layouts/BaseLayout.astro` | Dynamic lang attr, conditional CJK font, locale prop | PARTIAL | Has `lang={locale}`, `locale` prop, `isCJK` flag, passes locale to Header/Footer. But CJK CSS leaks to all pages. |
| `src/components/Header.astro` | Locale-aware nav links | VERIFIED | Imports `getRelativeLocaleUrl` from `astro:i18n`, wraps all internal hrefs |
| `src/components/Footer.astro` | Locale-aware footer links | VERIFIED | Imports `getRelativeLocaleUrl`, wraps all internal hrefs |
| `src/components/MobileMenu.astro` | Locale-aware mobile menu | VERIFIED | Imports `getRelativeLocaleUrl`, wraps all internal hrefs |
| `src/pages/zh/index.astro` | Chinese locale wrapper page | VERIFIED | Contains `locale="zh"`, imports `useTranslations('zh')` |
| `src/pages/fr/index.astro` | French locale wrapper page | VERIFIED | Contains `locale="fr"`, imports `useTranslations('fr')` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/i18n/utils.ts` | `src/i18n/locales/*/common.ts` | static imports | WIRED | Lines 1-3: `import enCommon`, `import zhCommon`, `import frCommon` |
| `src/i18n/locales/zh/common.ts` | `src/i18n/locales/en/common.ts` | type import | WIRED | Line 1: `import type { Common } from '../en/common'` |
| `src/pages/zh/index.astro` | `src/i18n/utils.ts` | import useTranslations | WIRED | Line 2: `import { useTranslations } from '../../i18n/utils'` |
| `src/layouts/BaseLayout.astro` | `@fontsource/noto-sans-sc` | conditional CSS import | WIRED (but leaky) | Lines 20-21: `await import('@fontsource/noto-sans-sc/400.css')` -- import exists but does not isolate at build time |
| `src/components/Header.astro` | `astro:i18n` | getRelativeLocaleUrl import | WIRED | Line 2: `import { getRelativeLocaleUrl } from 'astro:i18n'` |

### Data-Flow Trace (Level 4)

Not applicable -- this phase produces infrastructure (routing config, translation utility) rather than dynamic data-rendering components.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build succeeds | `npx astro build` | 12 pages built, no errors | PASS |
| zh page has lang="zh" | `grep lang="zh" dist/zh/index.html` | Found | PASS |
| fr page has lang="fr" | `grep lang="fr" dist/fr/index.html` | Found | PASS |
| en page has lang="en" | `grep lang="en" dist/index.html` | Found | PASS |
| CJK font only on zh | `grep noto dist/index.html` | Noto Sans SC CSS present on English page | FAIL |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| I18N-01 | 17-01, 17-02 | Site serves pages at /zh/ and /fr/ URL prefixes with English as unprefixed default | SATISFIED | dist/zh/index.html and dist/fr/index.html exist; English at unprefixed URLs |
| I18N-02 | 17-01 | Translation utility loads locale-specific strings from TS dictionary files | SATISFIED | `useTranslations()` returns typed objects from per-locale common.ts files |
| I18N-03 | 17-01, 17-02 | Chinese font loads via unicode-range subsetting -- zero impact on English page performance | BLOCKED | Font CSS loads on ALL pages including English (~235KB leak) |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| src/layouts/BaseLayout.astro | 19-22 | Conditional `await import()` for CSS does not isolate at Astro/Vite build time | Blocker | 235KB CJK font CSS added to every page |

### Human Verification Required

### 1. CJK Font Rendering Quality

**Test:** Open /zh/ in browser, inspect Chinese characters in nav/footer
**Expected:** Characters render in Noto Sans SC (smooth, modern sans-serif), not system fallback (Times New Roman / SimSun)
**Why human:** Font rendering requires visual inspection; grep can confirm CSS but not actual glyph rendering

### 2. English Page Visual Regression

**Test:** Compare English home page before and after i18n changes
**Expected:** Pixel-identical appearance, no layout shifts from the extra CSS loading
**Why human:** While the CSS leak is confirmed, actual visual impact needs human assessment

### 3. General Sans OE Ligature (D-10)

**Test:** Render French text with "oeuvre" on /fr/ page
**Expected:** General Sans displays U+0153 (oe ligature) correctly
**Why human:** Font glyph support requires visual verification; automated check was inconclusive per SUMMARY

### Gaps Summary

One gap blocks goal achievement: **CJK font CSS leaks to all pages** (~235KB performance regression on English and French pages).

The root cause is that Astro/Vite treats `await import('...css')` in frontmatter as a static dependency regardless of the runtime conditional. The CSS gets bundled into all pages sharing BaseLayout.astro. The fix requires an architectural change to how the CJK font is loaded -- either a separate layout for CJK pages, moving the import into the zh wrapper page itself, or using a conditional `<link>` approach that Astro can statically analyze.

All other phase goals are met: routing works, translation utility is type-safe and functional, locale-aware navigation is wired correctly.

---

_Verified: 2026-05-17T10:25:00Z_
_Verifier: Claude (gsd-verifier)_
