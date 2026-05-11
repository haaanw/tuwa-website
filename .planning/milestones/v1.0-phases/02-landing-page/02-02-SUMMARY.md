---
phase: 02-landing-page
plan: "02"
subsystem: landing-page
tags: [feature-grid, landing-cta, page-assembly, intersection-observer]
dependency_graph:
  requires: [02-01-hero-component, scroll-animation-css]
  provides: [feature-grid, landing-cta, complete-landing-page]
  affects: []
tech_stack:
  - astro-components
  - tailwind-css
  - intersection-observer
---

## What was built

FeatureGrid and LandingCTA components, wired into index.astro with IntersectionObserver scroll animations.

## Key Files

### Created
- `src/components/FeatureGrid.astro` — 5-card feature grid (Recovery, Workload, Templates, Onboarding, Coaching) with responsive layout and hover effects
- `src/components/LandingCTA.astro` — Bottom conversion section with App Store badge, QR code (desktop), and IntersectionObserver script

### Modified
- `src/pages/index.astro` — Assembled Hero + FeatureGrid + LandingCTA into complete landing page
- `src/components/Hero.astro` — Removed badge/QR (moved to CTA only), updated subtitle copy
- `src/components/FeatureGrid.astro` — Updated copy: replaced ACWR reference with "multi-factor fatigue tracking"

## Deviations

1. **Badge/QR removed from Hero** — Per user feedback, App Store badge and QR code appear only in LandingCTA section, not in Hero. Hero now has headline, subtitle, and device mockup only.
2. **Algorithm copy updated** — Replaced "ACWR monitoring" with "Multi-factor fatigue tracking" to reflect the Fatigue Accumulation Index Engine shipped in app v1.2. Updated Recovery card to mention "training context."

## Self-Check: PASSED

- FeatureGrid renders 5 cards with correct responsive grid (1/2/3 columns)
- 5th card centered via `md:col-start-2`
- LandingCTA has badge + desktop-only QR code
- IntersectionObserver fires `is-visible` on scroll
- `npm run build` passes clean
- No ACWR references remain in user-facing copy
