---
phase: 06-screenshot-presentation
plan: 02
subsystem: ui
tags: [astro, device-frame, css, screenshot, hero, perspective]

# Dependency graph
requires:
  - phase: 06-01
    provides: DeviceFrame component with CSS iPhone bezel, placeholder gradient, srcset image support

provides:
  - DeviceFrame integrated in FeaturePageLayout.astro replacing ScreenshotBlock
  - DeviceFrame integrated in CoachingPageLayout.astro replacing ScreenshotBlock
  - Hero.astro renders dashboard screenshot inside DeviceFrame with perspective tilt and eager LCP loading
  - Refined iPhone 15 Pro frame proportions (393:852 aspect ratio, 50px border-radius, gradient bezel)
  - Gentler hero perspective (1600px / -2deg / 1deg)
  - Navigation links corrected (/features → /features/recovery-scoring, /coaching → /features/coaching)

affects: [07-animation-system, all feature pages, hero section, navigation]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - DeviceFrame component used in all screenshot contexts (layouts + hero)
    - Perspective CSS transform applied at wrapper div level only, never inside DeviceFrame
    - Eager loading + fetchpriority=high on LCP hero image via DeviceFrame props

key-files:
  created: []
  modified:
    - src/layouts/FeaturePageLayout.astro
    - src/layouts/CoachingPageLayout.astro
    - src/components/Hero.astro
    - src/components/DeviceFrame.astro
    - src/styles/global.css
    - src/components/Header.astro
    - src/components/Footer.astro
    - src/components/MobileMenu.astro

key-decisions:
  - "Perspective transform (1600px/-2deg/1deg) applied on wrapper div around DeviceFrame, not inside the component — keeps DeviceFrame reusable and flat for feature pages"
  - "iPhone frame aspect ratio refined to 393:852 with 50px border-radius to match real iPhone 15 Pro proportions after visual verification"
  - "Navigation links fixed from /features → /features/recovery-scoring and /coaching → /features/coaching during visual QA (deviation Rule 1)"

patterns-established:
  - "Hero perspective pattern: wrap <DeviceFrame> in a div with CSS perspective transform; DeviceFrame itself stays flat"
  - "LCP pattern: Hero DeviceFrame gets loading='eager' and fetchpriority='high' props"
  - "Feature page pattern: DeviceFrame with default lazy loading, widths=[320,640]"

requirements-completed: [SHOT-02, SHOT-04, SHOT-05]

# Metrics
duration: ~30min
completed: 2026-05-11
---

# Phase 06 Plan 02: Screenshot Presentation Integration Summary

**DeviceFrame integrated site-wide — all feature pages and hero render screenshots inside a CSS iPhone 15 Pro bezel, with perspective tilt on hero and flat frames on feature pages**

## Performance

- **Duration:** ~30 min
- **Started:** 2026-05-11
- **Completed:** 2026-05-11
- **Tasks:** 3 (including visual verification checkpoint)
- **Files modified:** 8

## Accomplishments

- Both layout files (FeaturePageLayout, CoachingPageLayout) now use DeviceFrame instead of ScreenshotBlock — all 5 feature pages render through the new component with zero per-page changes
- Hero section renders dashboard screenshot inside a perspective-tilted iPhone frame with eager LCP loading (`loading="eager"`, `fetchpriority="high"`, `widths=[320,640,960]`)
- iPhone frame proportions refined to authentic 393:852 aspect ratio with 50px border-radius and gradient bezel after visual verification pass
- Navigation links corrected in Header, Footer, and MobileMenu to point to the correct URL paths

## Task Commits

1. **Task 1: Swap ScreenshotBlock to DeviceFrame in layouts** - `1350fbb` (feat)
2. **Task 2: Update Hero.astro with DeviceFrame and perspective tilt** - `2fcea6d` (feat)
3. **Task 3: Visual verification + aesthetic refinements** - `a39f9ed` (fix)

## Files Created/Modified

- `src/layouts/FeaturePageLayout.astro` - Swapped ScreenshotBlock import/usage for DeviceFrame
- `src/layouts/CoachingPageLayout.astro` - Same swap; all 3 named slots preserved
- `src/components/Hero.astro` - Replaced `<Image>` with `<DeviceFrame>` inside perspective wrapper div
- `src/components/DeviceFrame.astro` - Refined iPhone 15 Pro proportions (393:852, 50px radius, gradient bezel)
- `src/styles/global.css` - Updated device frame CSS variables for refined proportions
- `src/components/Header.astro` - Fixed nav links (/features → /features/recovery-scoring)
- `src/components/Footer.astro` - Fixed nav links (/coaching → /features/coaching)
- `src/components/MobileMenu.astro` - Same nav link fixes for mobile menu consistency

## Decisions Made

- **Perspective on wrapper div, not inside DeviceFrame:** Keeps DeviceFrame a flat, reusable primitive. Feature pages get flat frames; hero gets a perspective wrapper. This avoids prop-drilling a rarely-used transform and maintains the single-responsibility principle.
- **Gentler hero perspective (1600px / -2deg / 1deg):** Initial spec called for 1200px / -4deg / 2deg; user feedback during visual verification found this too dramatic. Refined values give a premium, subtle depth effect.
- **iPhone proportions refined to 393:852:** Original CSS used an approximate ratio; corrected to the real iPhone 15 Pro screen dimensions for visual authenticity.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed incorrect navigation link targets in Header, Footer, MobileMenu**
- **Found during:** Task 3 (visual verification)
- **Issue:** Nav links pointed to `/features` and `/coaching` (non-existent routes); should be `/features/recovery-scoring` and `/features/coaching`
- **Fix:** Updated href values in Header.astro, Footer.astro, and MobileMenu.astro to correct paths
- **Files modified:** src/components/Header.astro, src/components/Footer.astro, src/components/MobileMenu.astro
- **Verification:** All links resolve to correct pages; build passes 10 pages
- **Committed in:** a39f9ed (Task 3 fix commit)

**2. [Rule 1 - Bug] Refined iPhone frame proportions to match real device dimensions**
- **Found during:** Task 3 (visual verification)
- **Issue:** Frame looked slightly off — border-radius and aspect ratio were approximations rather than 393:852 iPhone 15 Pro spec
- **Fix:** Updated DeviceFrame CSS to 393:852 aspect ratio and 50px border-radius; added gradient bezel for realism
- **Files modified:** src/components/DeviceFrame.astro, src/styles/global.css
- **Committed in:** a39f9ed (Task 3 fix commit)

---

**Total deviations:** 2 auto-fixed (2x Rule 1 - Bug)
**Impact on plan:** Both fixes improve visual quality and correct broken links. No scope creep.

## Issues Encountered

None beyond the deviations documented above.

## User Setup Required

None - no external service configuration required.

## Known Stubs

None. All feature pages with screenshot assets render real images. Coaching and cold-start pages intentionally show gradient placeholders (screenshot assets not yet available — by design).

## Next Phase Readiness

- DeviceFrame is fully integrated and visually verified — Phase 07 (animation system) can target `.device-frame` wrapper and screenshot sections without any prerequisite work
- Navigation is corrected and consistent across Header, Footer, and MobileMenu
- Hero LCP image loads eagerly with high fetchpriority — performance baseline is sound
- Concern: App screenshot assets are currently the originals (not re-exported at 3x from Xcode Simulator as planned in SHOT-01 precondition) — retina quality may improve when assets are refreshed

---
*Phase: 06-screenshot-presentation*
*Completed: 2026-05-11*
