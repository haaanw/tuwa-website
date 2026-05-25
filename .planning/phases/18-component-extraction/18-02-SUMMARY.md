---
phase: 18-component-extraction
plan: "02"
subsystem: i18n
tags: [i18n, language-switcher, header, locale-aware-urls, navigation]
dependency_graph:
  requires: [18-01]
  provides: [language-switcher-desktop, language-switcher-mobile, locale-aware-header]
  affects: [src/components/Header.astro]
tech_stack:
  added: []
  patterns: [useTranslations(locale) for Header nav text, getRelativeLocaleUrl for path-preserving locale switching, IIFE inline scripts for dropdown toggle]
key_files:
  created: []
  modified:
    - src/components/Header.astro
decisions:
  - "Mobile language switcher positioned between logo and hamburger using flex layout — no extra spacer div needed since justify-between distributes the three items correctly"
  - "pathWithoutLocale regex /^\/[a-z]{2}(\/|$)/ strips 2-char locale prefix from both /zh/path and / (English, no prefix) correctly"
  - "Desktop dropdown uses same IIFE pattern as Features dropdown for consistency and zero-dependency JS"
  - "Active locale gets checkmark SVG inline (right-aligned via margin-left:auto) plus accent color text per UI-SPEC"
metrics:
  duration_minutes: 8
  completed_date: "2026-05-25"
  tasks_completed: 1
  files_modified: 1
---

# Phase 18 Plan 02: Language Switcher and Header Locale-Wiring Summary

**One-liner:** Built desktop and mobile language switcher dropdowns in Header.astro with globe icon, locale-code trigger, and path-preserving navigation, plus translated all nav text and converted bare paths via useTranslations() and getRelativeLocaleUrl().

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add language switcher, translate nav text, convert bare paths in Header | dc45783 | src/components/Header.astro |
| 2 | Verify language switcher functionality | PENDING HUMAN VERIFICATION | — |

## Checkpoint Pending

**Task 2 is a `checkpoint:human-verify` gate.** Human verification of the language switcher is required before this plan is considered fully complete.

**How to verify:**
1. Run `npm run dev` and open http://localhost:4321
2. **Desktop switcher:** Click the globe/EN dropdown in the nav bar (after Support). Verify dropdown shows "English" (checkmark), "中文", "Français". Click each to navigate to /zh/ and /fr/. Check hover, Escape, and outside-click close.
3. **Mobile switcher:** At viewport <768px, globe + locale code appears between logo and hamburger. Tap to open dropdown. Switching preserves current page.
4. **Nav text translation:** On /zh/ verify header shows Chinese nav labels. On /fr/ shows French labels.
5. **No regressions:** English homepage looks identical to before.

## Decisions Made

1. **pathWithoutLocale regex** — `rawPath.replace(/^\/[a-z]{2}(\/|$)/, '/')` handles both English (no prefix) and zh/fr (strips 2-char prefix). This prevents the double-prefix bug `/fr/zh/path` that would occur if `Astro.url.pathname` were passed directly.

2. **Flex layout for mobile** — The nav flex container (`justify-between`) already distributes logo (left), mobile lang switcher (center-left), and hamburger (right) correctly without a spacer div. The mobile lang switcher is wrapped in `md:hidden` so it only appears on mobile.

3. **Active locale indicator** — Active locale item gets `color: var(--color-accent)` text + a 14×14 checkmark SVG right-aligned via `margin-left: auto` inside the flex `.nav-dropdown-item` row, matching the UI-SPEC component inventory.

4. **Method and Coaches links added** — The previous Header only had Blog and Support links. Method (`/methodology`) and Coaches (`/for-coaches`) links were added to complete the nav (Rule 2: missing content).

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing content] Header lacked Method and Coaches nav links**
- **Found during:** Task 1 implementation
- **Issue:** The plan references converting "bare paths" at lines 95 and 98 for `/methodology` and `/for-coaches`, but the actual Header.astro only had Blog and Support links — Method and Coaches were absent entirely
- **Fix:** Added both `<li>` items with `getRelativeLocaleUrl(locale, '/methodology')` and `getRelativeLocaleUrl(locale, '/for-coaches')` plus translated labels via `{t.nav.method}` and `{t.nav.coaches}`
- **Files modified:** src/components/Header.astro
- **Commit:** dc45783

## Known Stubs

None — all translation keys resolve to real strings from the locale dictionaries. All nav links point to real pages. The language switcher `current` field correctly shows locale-specific codes (EN/中文/FR) from the translation dictionary.

## Threat Flags

None — no new trust boundaries. Language switcher generates static `<a href>` links at build time from a hardcoded LOCALES array. No user input enters URL construction. `getRelativeLocaleUrl()` only accepts known locale codes.

## Verification Results

- `npm run build`: exits 0, 12 pages built in 4.00s (worktree has no blog MDX — benign warning, pre-existing)
- `npx tsc --noEmit`: 0 errors
- No bare `/methodology` or `/for-coaches` paths remain in Header.astro
- `id="lang-dropdown"` and `id="lang-dropdown-mobile"` present
- `aria-haspopup="listbox"` on both switcher buttons
- Globe SVG `viewBox="0 0 16 16"` present in both desktop and mobile switchers
- All nav text rendered via t() calls — zero hardcoded English strings

## Self-Check: PASSED

Files exist:
- src/components/Header.astro — FOUND (contains useTranslations, lang-dropdown, lang-dropdown-mobile)

Commits exist:
- dc45783 — Task 1 Header language switcher and nav translation
