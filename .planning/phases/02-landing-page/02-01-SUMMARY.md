---
phase: 02-landing-page
plan: "01"
subsystem: landing-page
tags: [hero, app-store-badge, qr-code, scroll-animation, astro-image]
dependency_graph:
  requires: [01-foundation]
  provides: [hero-component, config-ts, scroll-animation-css, app-store-assets]
  affects: [02-02-landing-page]
tech_stack:
  added: [qrcode, "@types/qrcode", "@astrojs/check", typescript]
  patterns: [build-time-qr-svg, astro-image-webp, css-intersection-observer, inline-svg-set-html]
key_files:
  created:
    - src/config.ts
    - src/components/Hero.astro
    - src/assets/screenshots/dashboard.png
    - public/badges/app-store-badge.svg
  modified:
    - src/styles/global.css
    - package.json
    - package-lock.json
decisions:
  - "Used Dashboard_framed.png as-is (no CSS border frame) per RESEARCH.md Pitfall 1 option 2 — avoids doubled frame visual"
  - "QR code color values use raw hex literals not CSS vars — qrcode library requires raw color values, not custom properties"
  - "App Store badge is a placeholder SVG approximating Apple badge — official asset requires manual download from developer.apple.com"
  - "Pre-existing tsc errors in astro.config.mjs (vite version mismatch) are out of scope — src/config.ts compiles clean"
metrics:
  duration_seconds: 938
  completed_date: "2026-05-10"
  tasks_completed: 2
  files_created: 4
  files_modified: 3
---

# Phase 02 Plan 01: Hero Section and Scroll Animation Setup Summary

**One-liner:** Build-time QR code Hero with App Store badge, Astro Image WebP pipeline, and CSS IntersectionObserver scroll animation keyframes.

---

## What Was Built

Plan 02-01 (Wave 1) established all foundational assets and components that unblock Wave 2 work:

1. **`src/config.ts`** — Single source of truth for `APP_STORE_URL`. Both Hero.astro and future LandingCTA.astro import from here.

2. **`src/components/Hero.astro`** — Centered hero section with:
   - Display-size headline: "Train smarter. Recover with precision."
   - Subtitle copy referencing HRV, sleep, and training load readiness score
   - App Store badge (`/badges/app-store-badge.svg`) linking to APP_STORE_URL
   - QR code generated at build time via `qrcode` package, hidden on mobile (`hidden md:flex`)
   - Dashboard screenshot processed through Astro's Image pipeline as WebP with `loading="eager"` (LCP-critical)
   - No `data-animate` attribute (hero is above the fold)

3. **`src/assets/screenshots/dashboard.png`** — Dashboard_framed.png copied from Tonus project for Astro Image optimization.

4. **`public/badges/app-store-badge.svg`** — App Store badge SVG (placeholder matching Apple badge design).

5. **`src/styles/global.css`** — Scroll animation keyframes appended with full `prefers-reduced-motion` support.

---

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1 | `3f212f2` | feat(02-01): install qrcode, add config.ts, copy assets, add scroll animation CSS |
| Task 2 | `5e8b83e` | feat(02-01): create Hero.astro component with device mockup, App Store badge, and QR code |

---

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written (with one acceptable deviation noted below).

### Acceptable Deviations (Rule 2 — documented for transparency)

**1. App Store badge is a placeholder SVG**
- **Found during:** Task 1
- **Issue:** The official Apple App Store badge SVG cannot be directly downloaded via CLI — Apple's marketing guidelines page requires manual interaction. The curl to `tools.applemediaservices.com` returned an empty file.
- **Fix:** Created a hand-crafted SVG approximating the Apple badge design (black background, rounded corners, Apple logo, "Download on the App Store" text). This is functionally correct for development.
- **Action required:** Before go-live, replace `/public/badges/app-store-badge.svg` with the official badge downloaded from https://developer.apple.com/app-store/marketing/guidelines/
- **Files modified:** `public/badges/app-store-badge.svg`
- **Commit:** `3f212f2`

**2. Pre-existing TypeScript errors not fixed**
- **Found during:** Task 1 type check
- **Issue:** `astro.config.mjs` has a vite Plugin type mismatch (internal vite version conflict between `@tailwindcss/vite`'s bundled vite and the project's pinned vite). This was pre-existing before Plan 02-01.
- **Fix:** Not fixed — out of scope. `src/config.ts` compiles cleanly with no errors.
- **Files modified:** None

---

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| App Store badge placeholder SVG | `public/badges/app-store-badge.svg` | Official Apple SVG requires manual download from Apple's guidelines page before go-live |
| `APP_STORE_URL = 'https://apps.apple.com/app/tuwa'` | `src/config.ts` | Placeholder — update with real App Store ID before launch |

---

## Threat Flags

No new security-relevant surface introduced beyond what the plan's threat model covers (T-02-01 through T-02-03). All threats accepted as documented.

---

## Self-Check: PASSED

| Check | Result |
|-------|--------|
| src/config.ts | FOUND |
| src/components/Hero.astro | FOUND |
| src/assets/screenshots/dashboard.png | FOUND |
| public/badges/app-store-badge.svg | FOUND |
| commit 3f212f2 | FOUND |
| commit 5e8b83e | FOUND |
