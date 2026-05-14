---
phase: 09-deployment-responsive
plan: "01"
subsystem: frontend/components
tags: [badge, responsive, css, hero, footer]
dependency_graph:
  requires: []
  provides: [official-apple-badge, responsive-css-foundation]
  affects: [Hero, LandingCTA, FeatureCTA, Footer, BaseLayout, global.css]
tech_stack:
  added: []
  patterns: [clamp-fluid-typography, max-width-cap, overflow-guard]
key_files:
  created: []
  modified:
    - public/badges/app-store-badge.svg
    - src/components/Hero.astro
    - src/components/LandingCTA.astro
    - src/components/FeatureCTA.astro
    - src/components/Footer.astro
    - src/styles/global.css
    - src/layouts/BaseLayout.astro
decisions:
  - "Official Apple SVG badge (119.66407 viewBox) committed to repo as static asset — downloaded from developer.apple.com at plan execution time"
  - "Hero badge uses loading=eager (above fold); all other badges use loading=lazy"
  - "Footer badge anchor uses no btn-cta class — Apple SVG provides its own visual chrome; green background would clash with black badge"
  - "clamp(32px, 7vw, 48px) on .hero-headline — fluid scaling without new breakpoints per D-05/D-06"
  - "max-w-[1440px] on BaseLayout main — Tailwind arbitrary value, no custom token needed"
metrics:
  duration_seconds: 124
  completed_date: "2026-05-14"
  tasks_completed: 2
  files_modified: 7
---

# Phase 9 Plan 01: App Store Badge + Responsive CSS Summary

Official Apple "Download on the App Store" badge (viewBox 0 0 119.66407 40) replaces placeholder SVG in all four download locations, with fluid hero headline scaling via clamp() and a 1440px content cap on the main wrapper.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Replace App Store badge SVG and update all four component locations | 2aca19a | public/badges/app-store-badge.svg, Hero.astro, LandingCTA.astro, FeatureCTA.astro, Footer.astro |
| 2 | Apply responsive CSS fixes — fluid headline, 1440px cap, overflow guard | 09383a0 | src/styles/global.css, src/layouts/BaseLayout.astro, src/components/Hero.astro |

## What Was Built

### Task 1: Official Apple Badge

- Replaced the placeholder SVG (148x44, custom-drawn) with the official Apple "Download on the App Store" badge downloaded from `developer.apple.com/assets/elements/badges/download-on-the-app-store.svg`
- Official badge has `viewBox="0 0 119.66407 40"` — all img tags use `width=120 height=40` to match
- **Hero.astro**: Added `APP_STORE_URL` import, added badge `<img>` with `loading="eager"` below device mockup
- **LandingCTA.astro**: Updated badge dimensions from 148x44 to 120x40; kept `loading="lazy"` and `btn-cta` on anchor
- **FeatureCTA.astro**: Updated badge dimensions from 148x44 to 120x40; kept `loading="lazy"` and `btn-cta` on anchor
- **Footer.astro**: Added `APP_STORE_URL` import; replaced hardcoded text "Get the App" anchor (with `btn-cta` and inline green styles) with badge `<img>` using clean anchor; no `btn-cta` class (Apple black badge provides its own chrome)

### Task 2: Responsive CSS Fixes

- **overflow-x: hidden** added to `body` rule in global.css — prevents horizontal scroll at 375px viewport
- **.hero-headline clamp rule** added outside all media queries: `font-size: clamp(32px, 7vw, 48px)` — fluid scaling from 32px (375px viewport) to 48px (686px+) without new breakpoints
- **Hero h1 inline font-size removed** — `font-size: var(--text-display)` stripped from inline style so CSS class rule takes effect (inline styles beat class selectors)
- **BaseLayout main** updated to `class="max-w-[1440px] mx-auto w-full"` — content capped at 1440px and centered on wider screens

## Verification

- `npx astro build` completes without errors (10 pages built)
- Badge SVG contains `119.66407` (official Apple viewBox width) — confirmed
- All four components render badge with 120x40 dimensions — confirmed
- Hero badge `loading="eager"` — confirmed
- Footer no `btn-cta` on badge anchor — confirmed
- Footer no hardcoded `https://apps.apple.com/app/tuwa` (uses APP_STORE_URL import) — confirmed
- `overflow-x: hidden` in body rule — confirmed
- `clamp(32px, 7vw, 48px)` in `.hero-headline` rule — confirmed
- `max-w-[1440px] mx-auto` on BaseLayout `<main>` — confirmed
- Hero h1 inline style does not contain `font-size: var(--text-display)` — confirmed

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All download locations wire to `APP_STORE_URL` from `src/config.ts` which points to the live App Store URL.

## Threat Flags

No new security surface introduced. All badge anchors use `rel="noopener noreferrer"` and `target="_blank"` per T-09-03 (reverse tabnapping mitigation). The badge SVG is committed as a static asset — no runtime fetch, no user input path.

## Self-Check: PASSED

- `public/badges/app-store-badge.svg` — exists, contains `119.66407`
- `src/components/Hero.astro` — contains `APP_STORE_URL`, `app-store-badge.svg`, `loading="eager"` on badge
- `src/components/Footer.astro` — contains `APP_STORE_URL`, `app-store-badge.svg`, no `btn-cta` on badge anchor
- `src/layouts/BaseLayout.astro` — contains `max-w-[1440px] mx-auto`
- `src/styles/global.css` — contains `overflow-x: hidden` in body, `clamp(32px, 7vw, 48px)` in `.hero-headline`
- Commits `2aca19a` and `09383a0` exist in git log
