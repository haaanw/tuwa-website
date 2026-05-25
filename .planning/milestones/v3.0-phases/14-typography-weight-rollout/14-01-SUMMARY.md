---
phase: 14-typography-weight-rollout
plan: "01"
subsystem: components
tags: [typography, css-tokens, refactor]
dependency_graph:
  requires: []
  provides: [weight-tokens-in-components]
  affects: [all-pages-using-these-8-components]
tech_stack:
  added: []
  patterns: [css-custom-property-token-substitution, class-consolidation-from-repeated-inline-styles]
key_files:
  modified:
    - src/components/Hero.astro
    - src/components/StatsCounter.astro
    - src/components/Footer.astro
    - src/components/MobileMenu.astro
    - src/components/FaqAccordion.astro
    - src/components/FeatureGrid.astro
    - src/components/FeatureCTA.astro
    - src/components/LandingCTA.astro
decisions:
  - "MobileMenu nav links consolidated into .mobile-nav-link CSS class (4 repetitions triggered class extraction per PATTERNS.md rule)"
  - "FaqAccordion ::after font-weight: 400 preserved — decorative glyph stroke weight, not a design token"
  - "FaqAccordion answer <p> received explicit var(--weight-body) — was previously inheriting ~400, bumped to 500 per D-05"
metrics:
  duration: "133s (~2m)"
  completed: "2026-05-15"
  tasks_completed: 2
  files_modified: 8
---

# Phase 14 Plan 01: Component Weight Token Migration Summary

Replaced all hardcoded `font-weight` numeric literals in 8 shared components with CSS custom property tokens (`var(--weight-*)`). Hero headline 600→200 and StatsCounter numbers 700→200 are the most dramatic visual changes, establishing the editorial ultralight aesthetic. MobileMenu nav links were consolidated from 4 identical long inline style strings into a scoped `.mobile-nav-link` class.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Migrate high-impact components (Hero, StatsCounter, Footer, MobileMenu) | 8063b72 | Hero.astro, StatsCounter.astro, Footer.astro, MobileMenu.astro |
| 2 | Migrate remaining components (FaqAccordion, FeatureGrid, FeatureCTA, LandingCTA) | 39d4f99 | FaqAccordion.astro, FeatureGrid.astro, FeatureCTA.astro, LandingCTA.astro |

## Changes by Component

| Component | Element | Before | After | Token |
|-----------|---------|--------|-------|-------|
| Hero | h1 headline | 600 | 200 | `--weight-display` |
| StatsCounter | span numbers (×3) | 700 | 200 | `--weight-display` |
| Footer | logo link | 600 | 600 | `--weight-label` (tokenized) |
| Footer | section headers (×3) | 600 | 500 | `--weight-body` |
| MobileMenu | nav links (×4) via class | 600 | 500 | `--weight-body` |
| MobileMenu | CTA button | 600 | 600 | `--weight-label` (tokenized) |
| FaqAccordion | h2 section title | 600 | 300 | `--weight-heading` |
| FaqAccordion | summary questions | 600 | 600 | `--weight-label` (tokenized) |
| FaqAccordion | answer paragraphs | (inherited ~400) | 500 | `--weight-body` (explicit) |
| FaqAccordion | ::after glyph | 400 | 400 | PRESERVED (exempt) |
| FeatureGrid | h2 section title | 600 | 300 | `--weight-heading` |
| FeatureCTA | h2 heading | 600 | 300 | `--weight-heading` |
| LandingCTA | h2 heading | 600 | 300 | `--weight-heading` |

## Deviations from Plan

None — plan executed exactly as written. The class consolidation for MobileMenu and the FaqAccordion answer `font-weight` addition were both specified in the plan.

## Verification

- `grep -rn "font-weight: [0-9]" src/components/ --include="*.astro"` returns exactly 1 result: `FaqAccordion.astro:49: font-weight: 400;` (the exempt decorative `::after` glyph)
- TypeScript check: 2 pre-existing errors in `content.config.ts` and `astro.config.mjs` — both unrelated to this plan's changes, present before execution began

## Known Stubs

None. All weight tokens reference real CSS custom properties defined in `src/styles/global.css` lines 80–83.

## Threat Flags

None. This is a pure CSS refactor with no new network endpoints, auth paths, file access patterns, or schema changes.

## Self-Check: PASSED

- src/components/Hero.astro — FOUND, contains `var(--weight-display)`
- src/components/StatsCounter.astro — FOUND, contains `var(--weight-display)` (3 instances)
- src/components/Footer.astro — FOUND, contains `var(--weight-label)` and `var(--weight-body)`
- src/components/MobileMenu.astro — FOUND, contains `.mobile-nav-link` class with `var(--weight-body)`
- src/components/FaqAccordion.astro — FOUND, contains `var(--weight-heading)`, `var(--weight-label)`, `var(--weight-body)`
- src/components/FeatureGrid.astro — FOUND, contains `var(--weight-heading)`
- src/components/FeatureCTA.astro — FOUND, contains `var(--weight-heading)`
- src/components/LandingCTA.astro — FOUND, contains `var(--weight-heading)`
- Commit 8063b72 — FOUND
- Commit 39d4f99 — FOUND
