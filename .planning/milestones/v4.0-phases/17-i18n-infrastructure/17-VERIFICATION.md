---
phase: 17-i18n-infrastructure
verified: 2026-05-24T19:45:00Z
status: verified
score: 4/4 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 3/4
  gaps_closed:
    - "English pages at unprefixed URLs load identically to before (no performance regression, no new network requests)"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "Open /zh/ in browser, inspect Chinese characters in nav/footer"
    expected: "Characters render in Noto Sans SC (smooth, modern sans-serif), not system fallback (Times New Roman / SimSun)"
    why_human: "Font rendering requires visual inspection; grep can confirm CSS but not actual glyph rendering"
  - test: "Compare English home page before and after i18n changes"
    expected: "Pixel-identical appearance, no layout shifts, no new network requests in DevTools Network tab"
    why_human: "Visual regression and network behavior require browser inspection"
  - test: "Render French text with oeuvre on /fr/ page"
    expected: "General Sans displays U+0153 (oe ligature) correctly"
    why_human: "Font glyph support requires visual verification; automated check was inconclusive per SUMMARY"
---

# Phase 17: i18n Infrastructure Verification Report

**Phase Goal:** The site has working locale routing, a type-safe translation utility, and CJK font loading -- without any visible content changes to existing English pages
**Verified:** 2026-05-24T19:45:00Z
**Status:** verified
**Re-verification:** Yes -- after gap closure (Plan 03 fixed CJK font CSS leak)

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Navigating to /zh/ or /fr/ serves a page without 404 | VERIFIED | `dist/zh/index.html` and `dist/fr/index.html` exist; build produces 27 pages; `lang="zh"` and `lang="fr"` confirmed in output HTML |
| 2 | A t() utility resolves translation keys with full type safety | VERIFIED | `src/i18n/utils.ts` exports `useTranslations` with typed return via `Common` type using `WidenStrings`; zh/fr files typed against Common; fallback `locale ?? 'en'` present |
| 3 | Chinese text renders in Noto Sans SC on /zh/ pages | VERIFIED | `dist/zh/index.html` links to `index.Bf0GZd6p.css` (235KB) containing `--font-sans: "Noto Sans SC"` and `@font-face` declarations with unicode-range subsetting |
| 4 | English pages at unprefixed URLs load identically to before (no performance regression) | VERIFIED | EN page links only `BaseLayout.BBKVwyMO.css` and `StatsCounter.Ca4hXzTV.css` -- zero CJK font CSS. FR page identical CSS set. CJKLayout.astro isolates font imports to zh pages only. |

**Score:** 4/4 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `astro.config.mjs` | i18n routing config | VERIFIED | Contains `i18n:` block with `locales: ["en", "zh", "fr"]`, `defaultLocale: "en"`, `prefixDefaultLocale: false` |
| `src/i18n/utils.ts` | useTranslations function and Locale type | VERIFIED | Exports `useTranslations`, `Locale`, `CommonTranslations`; static imports; fallback `locale ?? 'en'` |
| `src/i18n/locales/en/common.ts` | English baseline + Common type | VERIFIED | `as const` assertion, exports `Common` via `WidenStrings<typeof common>`, nav/footer/meta keys |
| `src/i18n/locales/zh/common.ts` | Chinese translations typed against English | VERIFIED | `import type { Common }`, typed `const common: Common`, Chinese strings present |
| `src/i18n/locales/fr/common.ts` | French translations typed against English | VERIFIED | `import type { Common }`, typed `const common: Common`, French diacritics present |
| `src/layouts/BaseLayout.astro` | Shared layout WITHOUT CJK font imports | VERIFIED | No `@fontsource/noto-sans-sc` import; has `locale` prop with default `'en'`, `lang={locale}`, passes locale to Header/Footer |
| `src/layouts/CJKLayout.astro` | Dedicated layout for zh with CJK font imports | VERIFIED | Imports `@fontsource/noto-sans-sc/400.css` and `700.css`; wraps BaseLayout with `locale="zh"`; `is:global` style sets `--font-sans` |
| `src/components/Header.astro` | Locale-aware nav links | VERIFIED | Imports `getRelativeLocaleUrl` from `astro:i18n`; wraps all internal hrefs |
| `src/components/Footer.astro` | Locale-aware footer links | VERIFIED | Imports `getRelativeLocaleUrl`; wraps all internal hrefs |
| `src/components/MobileMenu.astro` | Locale-aware mobile menu | VERIFIED | Imports `getRelativeLocaleUrl`; wraps all internal hrefs |
| `src/pages/zh/index.astro` | Chinese locale wrapper page using CJKLayout | VERIFIED | Imports `CJKLayout`, uses `useTranslations('zh')`, passes translated meta |
| `src/pages/fr/index.astro` | French locale wrapper page | VERIFIED | Imports `BaseLayout`, uses `useTranslations('fr')`, sets `locale="fr"` |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/i18n/utils.ts` | `src/i18n/locales/*/common.ts` | static imports | WIRED | Lines 1-4: imports enCommon, zhCommon, frCommon |
| `src/i18n/locales/zh/common.ts` | `src/i18n/locales/en/common.ts` | type import | WIRED | `import type { Common } from '../en/common'` |
| `src/pages/zh/index.astro` | `src/layouts/CJKLayout.astro` | import CJKLayout | WIRED | Line 3: `import CJKLayout from '../../layouts/CJKLayout.astro'` |
| `src/layouts/CJKLayout.astro` | `@fontsource/noto-sans-sc` | CSS import in frontmatter | WIRED | Lines 3-4: static `import '@fontsource/noto-sans-sc/400.css'` and `700.css` |
| `src/components/Header.astro` | `astro:i18n` | getRelativeLocaleUrl import | WIRED | `import { getRelativeLocaleUrl } from 'astro:i18n'` |

### Data-Flow Trace (Level 4)

Not applicable -- this phase produces infrastructure (routing config, translation utility) rather than dynamic data-rendering components.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build succeeds | `npm run build` | 27 pages built, no errors | PASS |
| zh page has lang="zh" | `grep lang="zh" dist/zh/index.html` | Found | PASS |
| fr page has lang="fr" | `grep lang="fr" dist/fr/index.html` | Found | PASS |
| en page has lang="en" | `grep lang="en" dist/index.html` | Found | PASS |
| CJK CSS only on zh page | CSS link comparison | `index.Bf0GZd6p.css` (235KB) only linked from zh page | PASS |
| EN page zero CJK font CSS | `grep noto dist/index.html` | Only "Noto Color Emoji" from Tailwind defaults (not CJK font) | PASS |
| FR page zero CJK font CSS | `grep noto dist/fr/index.html` | Only "Noto Color Emoji" from Tailwind defaults | PASS |
| Nav links zh-prefixed on zh page | `grep href="/zh/" dist/zh/index.html` | Found: /zh/features/*, /zh/blog/, /zh/support/ | PASS |
| No zh links on EN page | `grep href="/zh/" dist/index.html` | No matches | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| I18N-01 | 17-01, 17-02 | Site serves pages at /zh/ and /fr/ URL prefixes with English as unprefixed default | SATISFIED | dist/zh/index.html and dist/fr/index.html exist; English at unprefixed URLs; Astro i18n config with `prefixDefaultLocale: false` |
| I18N-02 | 17-01 | Translation utility loads locale-specific strings from TS dictionary files | SATISFIED | `useTranslations()` returns typed objects from per-locale common.ts files with compile-time shape validation via `WidenStrings` type |
| I18N-03 | 17-01, 17-02, 17-03 | Chinese font loads via unicode-range subsetting -- zero impact on English page performance | SATISFIED | CJKLayout isolates 235KB CJK CSS to zh pages only; EN and FR pages link zero CJK CSS bundles |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| (none) | -- | -- | -- | No anti-patterns found in phase 17 files |

### Human Verification Required

### 1. CJK Font Rendering Quality

**Test:** Open /zh/ in browser, inspect Chinese characters in nav/footer
**Expected:** Characters render in Noto Sans SC (smooth, modern sans-serif), not system fallback (Times New Roman / SimSun)
**Why human:** Font rendering requires visual inspection; grep can confirm CSS but not actual glyph rendering

### 2. English Page Visual Regression

**Test:** Compare English home page before and after i18n changes
**Expected:** Pixel-identical appearance, no layout shifts, no new network requests in DevTools Network tab
**Why human:** Visual regression and network behavior require browser inspection

### 3. General Sans OE Ligature (D-10)

**Test:** Render French text with "oeuvre" on /fr/ page
**Expected:** General Sans displays U+0153 (oe ligature) correctly
**Why human:** Font glyph support requires visual verification; automated check was inconclusive per SUMMARY

### Gaps Summary

No automated gaps remain. The CJK font CSS leak identified in the initial verification has been fully resolved by Plan 03, which introduced `CJKLayout.astro` to isolate CJK font imports to zh pages only. English and French pages now load zero CJK font CSS.

Three items require human visual verification: CJK font rendering quality on zh pages, English page visual regression check, and French OE ligature support in General Sans.

---

_Verified: 2026-05-24T19:45:00Z_
_Verifier: Claude (gsd-verifier)_

<!-- 2026-05-25: human_needed items resolved via gsd-progress browser/code UAT (Opus 4.7). See 17-HUMAN-UAT.md. -->
