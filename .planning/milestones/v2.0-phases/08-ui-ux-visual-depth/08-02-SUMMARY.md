---
phase: 08-ui-ux-visual-depth
plan: "02"
subsystem: visual-depth
tags: [micro-interactions, spacing, hover-states, btn-cta, nav-link, section-spaced]
dependency_graph:
  requires: [08-01]
  provides: [consistent-section-spacing, cta-micro-interactions, footer-nav-hover]
  affects:
    - src/components/Hero.astro
    - src/components/LandingCTA.astro
    - src/components/FeatureCTA.astro
    - src/components/Header.astro
    - src/components/Footer.astro
tech_stack:
  added: []
  patterns: [btn-cta-scale-micro-interaction, nav-link-color-transition, section-spaced-responsive-padding]
key_files:
  created: []
  modified:
    - src/components/Hero.astro
    - src/components/LandingCTA.astro
    - src/components/FeatureCTA.astro
    - src/components/Header.astro
    - src/components/Footer.astro
decisions:
  - "Header inline onmouseover bg-color handlers preserved alongside btn-cta — they control backgroundColor/boxShadow while btn-cta controls transform; no conflict"
  - "Footer nav-link replaces hover:underline — color transition to --color-accent on hover is more on-brand than underline"
metrics:
  duration_seconds: 78
  completed_date: "2026-05-13"
  tasks_completed: 2
  files_modified: 5
---

# Phase 8 Plan 2: Spacing Tokens and Micro-Interactions on Interactive Components Summary

Apply `.section-spaced` responsive padding and `.btn-cta` / `.nav-link` micro-interaction classes to Hero, LandingCTA, FeatureCTA, Header, and Footer — delivering consistent 72px/128px section spacing and scale hover states on all CTA buttons and color-transition hover on all footer links.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Apply spacing and btn-cta to Hero, LandingCTA, FeatureCTA | 1bd5fc8 | Hero.astro, LandingCTA.astro, FeatureCTA.astro |
| 2 | Apply btn-cta to Header CTA and nav-link to Footer links | 2a30cba | Header.astro, Footer.astro |

## What Was Built

### Task 1: Hero, LandingCTA, FeatureCTA

**Hero.astro:**
- Replaced `style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);"` with `class="section-spaced px-6"` on the `<section>` element
- No btn-cta needed — Hero has no CTA button (download link is in LandingCTA)

**LandingCTA.astro:**
- Replaced inline padding on inner `<div>` with `class="section-spaced mx-auto max-w-6xl px-6"`
- Added `class="btn-cta inline-block"` to the App Store badge `<a>` — scale(1.02) on hover, scale(0.98) on active

**FeatureCTA.astro:**
- Replaced inline padding on inner `<div>` with `class="section-spaced mx-auto max-w-6xl px-6"`
- Added `class="btn-cta inline-block"` to the App Store badge `<a>`

### Task 2: Header, Footer

**Header.astro:**
- Added `btn-cta` to the "Get the App" CTA link class — scale micro-interaction on hover/active
- Preserved all existing `onmouseover`/`onmouseout` inline handlers (control backgroundColor and boxShadow — different CSS properties from `transform`, no conflict)
- Dropdown nav links and Blog/Support links left unchanged (already have inline color handlers per RESEARCH.md minimal scope decision)

**Footer.astro:**
- Added `btn-cta` to the "Get the App" CTA link class
- Replaced `hover:underline` Tailwind class with `nav-link` on all 9 footer links (recovery-scoring, workload-tracking, smart-templates, cold-start, coaching, blog, support, privacy, terms)
- `.nav-link` provides color transition to `--color-accent` on hover (100ms ease-out) per D-06

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all classes are wired to real CSS in global.css (from Plan 01). No placeholder values.

## Threat Flags

None — presentational class additions only. No new data flow or input surface changes. T-08-03 accepted: existing inline `onmouseover` handlers preserved as-is per plan.

## Self-Check: PASSED

- [x] `src/components/Hero.astro` contains `class="section-spaced px-6"` on section element
- [x] `src/components/Hero.astro` does NOT contain `padding-top: var(--space-3xl)` (old inline removed)
- [x] `src/components/LandingCTA.astro` contains `class="section-spaced mx-auto` on inner div
- [x] `src/components/LandingCTA.astro` contains `class="btn-cta inline-block"` on App Store badge link
- [x] `src/components/FeatureCTA.astro` contains `class="section-spaced mx-auto` on inner div
- [x] `src/components/FeatureCTA.astro` contains `class="btn-cta inline-block"` on App Store badge link
- [x] `src/components/Header.astro` contains `class="btn-cta hidden md:inline-flex` on CTA link
- [x] `src/components/Header.astro` still contains `onmouseover` handlers (preserved)
- [x] `src/components/Footer.astro` contains `class="btn-cta inline-flex` on Get the App link
- [x] `src/components/Footer.astro` does NOT contain `hover:underline`
- [x] `src/components/Footer.astro` contains `class="nav-link"` on 9 link elements
- [x] `npm run build` completes without errors
- [x] Commit 1bd5fc8 exists (Task 1)
- [x] Commit 2a30cba exists (Task 2)
