---
phase: 02-landing-page
verified: 2026-05-10T23:10:00Z
status: human_needed
score: 5/5
overrides_applied: 0
human_verification:
  - test: "Verify responsive layout at mobile (<640px), tablet (640-768px), and desktop (>768px) breakpoints"
    expected: "Hero stacks vertically, feature grid shows 1-col on mobile, 2-col on tablet, 3-col on desktop. 5th card centered on desktop. QR codes hidden on mobile, visible on desktop."
    why_human: "Responsive layout correctness cannot be verified programmatically without rendering in a browser"
  - test: "Verify scroll animations fire on FeatureGrid and LandingCTA sections"
    expected: "Both sections fade in smoothly when scrolled into view. Hero does NOT animate (above the fold)."
    why_human: "IntersectionObserver behavior requires a running browser to observe"
  - test: "Verify feature card hover changes background color"
    expected: "Cards subtly change from --color-surface to --color-surface-el on hover"
    why_human: "Interactive hover state requires visual browser testing"
---

# Phase 2: Landing Page Verification Report

**Phase Goal:** Visitors can understand what Tuwa is, see the app, and tap or scan to download it from the App Store
**Verified:** 2026-05-10T23:10:00Z
**Status:** human_needed
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Hero section shows an outcome-led headline, an app screenshot in a device mockup, and a working App Store download badge | VERIFIED | Hero.astro has `<h1>Train smarter. Recover with precision.</h1>`, `<Image src={dashboardScreenshot}>` with `rounded-[44px]`, and App Store badge exists in LandingCTA.astro with `<a href={APP_STORE_URL}>` linking to `/badges/app-store-badge.svg`. Badge was moved from Hero to LandingCTA per user request -- badge is present on the page. |
| 2 | Feature overview grid shows 5 cards that each link to the corresponding feature deep-dive page | VERIFIED | FeatureGrid.astro contains 5 `<li>` cards with `<a>` links to `/features/recovery-scoring`, `/features/workload-tracking`, `/features/smart-templates`, `/features/cold-start`, `/features/coaching`. Each card has icon SVG, category label, title, and description. Grid uses `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`. 5th card has `md:col-start-2` for centering. |
| 3 | Sections fade in on scroll using CSS + IntersectionObserver (no JS framework) | VERIFIED | global.css defines `[data-animate]` with `@keyframes fade-up` (lines 86-109) plus `prefers-reduced-motion` fallback. LandingCTA.astro contains `<script is:inline>` with IntersectionObserver adding `is-visible` class (lines 88-105). FeatureGrid and LandingCTA sections have `data-animate`; Hero correctly omits it. |
| 4 | Desktop visitors see a QR code or "Available on iPhone" message as an alternative to the App Store badge | VERIFIED | LandingCTA.astro generates QR SVG at build time via `QRCode.toString(APP_STORE_URL)` and renders it with `class="hidden md:flex"` -- visible only on desktop (md+). Includes "SCAN TO DOWNLOAD" label. |
| 5 | Page renders correctly at mobile, tablet, and desktop breakpoints | VERIFIED (code) | Responsive Tailwind classes present: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` on feature grid, `hidden md:flex` on QR code, `flex-col sm:flex-row` on badge+QR layout. Needs human visual confirmation. |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/config.ts` | APP_STORE_URL constant | VERIFIED | Exports `APP_STORE_URL = 'https://apps.apple.com/app/tuwa'` (4 lines) |
| `src/components/Hero.astro` | Hero section component (min 40 lines) | VERIFIED | 56 lines. Headline, subtitle, Astro Image device mockup. No data-animate. |
| `src/components/FeatureGrid.astro` | 5-card feature grid (min 50 lines) | VERIFIED | 172 lines. 5 cards with icons, categories, titles, descriptions, links. |
| `src/components/LandingCTA.astro` | Final CTA with badge + QR (min 30 lines) | VERIFIED | 105 lines. Badge, QR code, IntersectionObserver script. |
| `src/pages/index.astro` | Composed landing page | VERIFIED | 14 lines. Imports and renders Hero, FeatureGrid, LandingCTA inside BaseLayout. |
| `src/assets/screenshots/dashboard.png` | Hero screenshot for Astro Image | VERIFIED | File exists, processed to WebP by Astro Image pipeline. |
| `public/badges/app-store-badge.svg` | App Store badge | VERIFIED | Placeholder SVG approximating Apple badge (14 lines). Known stub -- replace with official Apple asset before go-live. |
| `src/styles/global.css` | Scroll animation keyframes | VERIFIED | Contains `[data-animate]`, `@keyframes fade-up`, and both `prefers-reduced-motion` media queries. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/pages/index.astro` | `src/components/Hero.astro` | `import Hero` | WIRED | Line 3: `import Hero from '../components/Hero.astro'`; Line 11: `<Hero />` |
| `src/pages/index.astro` | `src/components/FeatureGrid.astro` | `import FeatureGrid` | WIRED | Line 4: `import FeatureGrid from '../components/FeatureGrid.astro'`; Line 12: `<FeatureGrid />` |
| `src/pages/index.astro` | `src/components/LandingCTA.astro` | `import LandingCTA` | WIRED | Line 5: `import LandingCTA from '../components/LandingCTA.astro'`; Line 13: `<LandingCTA />` |
| `src/components/LandingCTA.astro` | `src/config.ts` | `import { APP_STORE_URL }` | WIRED | Line 2: `import { APP_STORE_URL } from '../config'`; Used in QR generation (line 5) and badge href (line 54) |
| `src/components/Hero.astro` | `src/assets/screenshots/dashboard.png` | `import dashboardScreenshot` | WIRED | Line 3: `import dashboardScreenshot from '../assets/screenshots/dashboard.png'`; Used in `<Image src={dashboardScreenshot}>` (line 45) |
| `src/components/FeatureGrid.astro` | `/features/*` | `href` links | WIRED | 5 cards link to `/features/recovery-scoring`, `/features/workload-tracking`, `/features/smart-templates`, `/features/cold-start`, `/features/coaching`. Pages don't exist yet (Phase 3 -- expected). |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|---------------|--------|--------------------|--------|
| LandingCTA.astro | qrSvg | QRCode.toString(APP_STORE_URL) at build time | Yes -- generates SVG string from config constant | FLOWING |
| Hero.astro | dashboardScreenshot | Static image import, processed by Astro Image | Yes -- produces WebP via build pipeline | FLOWING |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build succeeds | `npm run build` | 1 page built in 1.95s, no errors | PASS |
| index.html generated | Build output shows `/index.html` | Generated (+53ms) | PASS |
| Image optimization runs | Build output shows WebP generation | `/_astro/dashboard.QcFCkhMx_D7X7I.webp` (cache hit) | PASS |
| Sitemap generated | Build output shows sitemap | `sitemap-index.xml created at dist` | PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| LAND-01 | 02-01 | Hero section with outcome-led headline, app screenshot in device mockup, and App Store download badge | SATISFIED | Hero.astro has h1 headline, Image component with dashboard screenshot, badge in LandingCTA per user request |
| LAND-02 | 02-02 | Feature overview grid with 5 cards linking to deep-dive pages | SATISFIED | FeatureGrid.astro has 5 cards each linking to `/features/{slug}` |
| LAND-03 | 02-01, 02-02 | Scroll-triggered fade-in animations (CSS + IntersectionObserver) | SATISFIED | global.css has `[data-animate]` + `@keyframes fade-up` + `prefers-reduced-motion`; LandingCTA has IntersectionObserver script |
| LAND-04 | 02-02 | Final CTA section with App Store badge and reinforcing copy | SATISFIED | LandingCTA.astro has h2 "Built for athletes who take training seriously.", supporting copy, badge + QR |
| LAND-05 | 02-01, 02-02 | Desktop-aware App Store CTA (QR code for non-mobile visitors) | SATISFIED | LandingCTA.astro generates QR code with `hidden md:flex` (desktop only) |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `public/badges/app-store-badge.svg` | -- | Placeholder SVG (not official Apple asset) | Info | Known pre-launch TODO -- replace with official badge from developer.apple.com before go-live. Documented in 02-01-SUMMARY.md. |
| `src/config.ts` | 4 | Placeholder URL `https://apps.apple.com/app/tuwa` | Info | Expected -- real App Store ID not available until app launch. Documented in 02-01-SUMMARY.md. |

### Human Verification Required

### 1. Responsive Layout Check

**Test:** Open http://localhost:4321, resize browser to mobile (<640px), tablet (640-768px), and desktop (>768px)
**Expected:** Hero stacks vertically at all sizes. Feature grid: 1 column on mobile, 2 columns on tablet, 3 columns on desktop with 5th card centered. QR codes hidden on mobile, visible on desktop.
**Why human:** Responsive layout rendering requires a browser viewport

### 2. Scroll Animation Check

**Test:** Scroll down the page from top
**Expected:** FeatureGrid and LandingCTA sections fade in smoothly when scrolled into view. Hero does NOT animate (it should be immediately visible).
**Why human:** IntersectionObserver firing and CSS animation playback require a running browser

### 3. Feature Card Hover State

**Test:** Hover over feature cards on desktop
**Expected:** Card background subtly changes color on hover (from travertine surface to slightly darker surface)
**Why human:** Interactive hover states require mouse interaction in a browser

### Gaps Summary

No code-level gaps found. All 5 success criteria are satisfied at the code/artifact level. The App Store badge SVG is a known placeholder (documented) -- acceptable for development, must be replaced before go-live.

Three items require human visual verification: responsive layout, scroll animations, and hover states. These are inherently visual behaviors that cannot be confirmed through code inspection alone.

---

_Verified: 2026-05-10T23:10:00Z_
_Verifier: Claude (gsd-verifier)_
