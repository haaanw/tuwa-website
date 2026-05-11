---
phase: 03-content-pages
plan: 01
subsystem: ui
tags: [astro, tailwind, chart.js, sharp, og-images, typescript]

# Dependency graph
requires:
  - phase: 02-landing-page
    provides: BaseLayout, LandingCTA IntersectionObserver pattern, config.ts APP_STORE_URL, screenshot assets pattern
provides:
  - FeaturePageLayout wrapping BaseLayout with hero, screenshot, slot, CTA sections
  - ScreenshotBlock component with src/placeholder conditional rendering
  - FeatureCTA component adapted from LandingCTA (no QR code)
  - typography plugin activated via @plugin directive in global.css
  - chart.js installed and importable
  - 3 framed screenshot assets in src/assets/screenshots/
  - 5 static OG images (1200x630) in public/og/ for each feature page
affects: [03-02, 03-03, 03-04, 03-05, 03-06, 03-07]

# Tech tracking
tech-stack:
  added: [chart.js ^4.5.1, @tailwindcss/typography @plugin activated]
  patterns:
    - FeaturePageLayout wraps BaseLayout — layouts compose by wrapping, not inheritance
    - ScreenshotBlock isFramed prop — framed PNGs get box-shadow only, unframed get border-radius too
    - FeatureCTA owns IntersectionObserver script — only one observer per page, in the CTA component
    - OG images generated at build-time via sharp+SVG script then deleted

key-files:
  created:
    - src/components/ScreenshotBlock.astro
    - src/components/FeatureCTA.astro
    - src/layouts/FeaturePageLayout.astro
    - public/og/recovery-scoring.png
    - public/og/workload-tracking.png
    - public/og/smart-templates.png
    - public/og/cold-start.png
    - public/og/coaching.png
    - src/assets/screenshots/recovery.png
    - src/assets/screenshots/workload.png
    - src/assets/screenshots/active-workout.png
  modified:
    - src/styles/global.css (added @plugin "@tailwindcss/typography")
    - package.json (added chart.js)

key-decisions:
  - "FeatureCTA owns IntersectionObserver — not FeaturePageLayout — to match the existing LandingCTA pattern where the CTA fires the observer for all [data-animate] elements on the page"
  - "isFramed defaults to true in ScreenshotBlock — all current screenshots are _framed.png assets with baked-in device bezels"
  - "OG images generated via sharp+SVG script then deleted — avoids committing generator script to repo while producing 1200x630 PNGs"
  - "astro check error in astro.config.mjs (Vite/Tailwind plugin type mismatch) is pre-existing and not caused by this plan's changes — build passes cleanly"

patterns-established:
  - "FeaturePageLayout import pattern: import FeaturePageLayout from '../../layouts/FeaturePageLayout.astro' in feature pages"
  - "OG image reference: ogImage prop uses /og/{slug}.png path relative to public/"
  - "ScreenshotBlock usage: pass imported ImageMetadata as screenshot prop, string as screenshotAlt"

requirements-completed: [FEAT-06, FEAT-07]

# Metrics
duration: 15min
completed: 2026-05-11
---

# Phase 3 Plan 01: Feature Page Infrastructure Summary

**chart.js installed, typography plugin activated, 3 framed screenshot assets copied, 5 per-page OG images generated, and 3 reusable Astro components built (ScreenshotBlock, FeatureCTA, FeaturePageLayout) unblocking all Wave 2 feature page plans**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-05-11T12:00:00Z
- **Completed:** 2026-05-11T12:15:00Z
- **Tasks:** 2
- **Files modified:** 14

## Accomplishments

- Installed chart.js ^4.5.1 and activated @tailwindcss/typography plugin — both required by later Wave plans
- Copied 3 framed app screenshots (recovery, workload, active-workout) from Tonus project into src/assets/screenshots/
- Generated 5 unique static OG images (1200x630 PNG each) for recovery-scoring, workload-tracking, smart-templates, cold-start, coaching pages using sharp+SVG pipeline
- Created ScreenshotBlock with conditional render (Image component when src provided, accessible placeholder div when not)
- Created FeatureCTA adapted from LandingCTA — QR code removed, IntersectionObserver IIFE retained, rel="noopener noreferrer" on App Store link (T-03-01 threat mitigation)
- Created FeaturePageLayout composing BaseLayout + ScreenshotBlock + FeatureCTA with hero h1, screenshot section, content slot

## Task Commits

1. **Task 1: Install chart.js, activate typography plugin, copy screenshots, generate OG images** - `9a03afa` (chore)
2. **Task 2: Create ScreenshotBlock, FeatureCTA, and FeaturePageLayout** - `8e1883a` (feat)

**Plan metadata:** *(pending docs commit)*

## Files Created/Modified

- `src/styles/global.css` - Added `@plugin "@tailwindcss/typography"` after @import
- `package.json` / `package-lock.json` - Added chart.js ^4.5.1
- `src/assets/screenshots/recovery.png` - Recovery framed screenshot (462KB)
- `src/assets/screenshots/workload.png` - Workload framed screenshot (448KB)
- `src/assets/screenshots/active-workout.png` - Active workout framed screenshot (225KB)
- `public/og/recovery-scoring.png` - OG image 1200x630
- `public/og/workload-tracking.png` - OG image 1200x630
- `public/og/smart-templates.png` - OG image 1200x630
- `public/og/cold-start.png` - OG image 1200x630
- `public/og/coaching.png` - OG image 1200x630
- `src/components/ScreenshotBlock.astro` - Screenshot display with placeholder fallback
- `src/components/FeatureCTA.astro` - Feature page CTA section with IntersectionObserver
- `src/layouts/FeaturePageLayout.astro` - Reusable layout for standard feature pages

## Decisions Made

- **FeatureCTA owns IntersectionObserver:** Matched existing LandingCTA pattern — the CTA component fires the observer for all `[data-animate]` elements on the page. Did not duplicate in FeaturePageLayout.
- **isFramed defaults true:** All current screenshots are `_framed.png` assets with baked-in device bezels; no extra border-radius should be applied.
- **OG via sharp+SVG script:** Temporary script generated PNGs and was deleted post-run. Clean approach without committing generator tooling.
- **Pre-existing astro check error:** The `astro check` error in `astro.config.mjs` (Vite/Tailwind plugin type mismatch `ts(2322)`) pre-existed this plan's changes — confirmed by stash/check/unstash. Build passes cleanly.

## Deviations from Plan

None — plan executed exactly as written. The `astro check` type error was pre-existing in `astro.config.mjs` and not caused by this plan.

## Issues Encountered

- `astro check` reports 1 pre-existing error in `astro.config.mjs` (Vite/Tailwind plugin type incompatibility). Confirmed pre-existing by running check on stashed state. Build (`npm run build`) passes cleanly — this is the meaningful check for static site generation.

## Known Stubs

None — no placeholder text or hardcoded empty values introduced. ScreenshotBlock placeholder is intentional and functional (renders when no screenshot is provided).

## Threat Flags

| Flag | File | Description |
|------|------|-------------|
| T-03-01 mitigated | src/components/FeatureCTA.astro | rel="noopener noreferrer" on target="_blank" App Store link — as specified in threat register |

## Next Phase Readiness

Wave 2 plans can now create feature pages by:
1. Importing `FeaturePageLayout` from `../../layouts/FeaturePageLayout.astro`
2. Importing screenshot assets from `../../assets/screenshots/{name}.png`
3. Passing `ogImage="/og/{slug}.png"` (files exist in `public/og/`)
4. Writing slot content as `<section>` blocks starting at `<h2>`

Blockers from STATE.md still apply: feature page copy should be ready before page implementation to avoid placeholder shells.

---
*Phase: 03-content-pages*
*Completed: 2026-05-11*

## Self-Check: PASSED

All created files verified present. Both task commits (9a03afa, 8e1883a) exist in git log.
