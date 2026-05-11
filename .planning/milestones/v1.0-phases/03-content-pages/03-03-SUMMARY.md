---
phase: 03-content-pages
plan: "03"
subsystem: feature-pages
tags: [astro, feature-pages, copy, charts, og-images]
dependency_graph:
  requires: [03-01, 03-02]
  provides: [recovery-scoring-page, workload-tracking-page, smart-templates-page, cold-start-page]
  affects: [feature-grid-links, sitemap]
tech_stack:
  added: []
  patterns: [FeaturePageLayout, outcome-first-hero, data-animate-sections, surface-bg-science-section]
key_files:
  created:
    - src/pages/features/recovery-scoring.astro
    - src/pages/features/workload-tracking.astro
    - src/pages/features/smart-templates.astro
    - src/pages/features/cold-start.astro
  modified: []
decisions:
  - "RecoveryChart and AcwrChart embedded in science sections of their respective pages, not in hero"
  - "Cold-start page omits screenshot prop entirely, triggering FeaturePageLayout placeholder"
  - "Smart Templates and Cold-Start have no chart components — value prop is workflow/trust, not data viz"
  - "All pages use consistent surface-bg pattern for science sections with divider borders"
metrics:
  duration_minutes: 5
  completed_date: "2026-05-11"
  tasks_completed: 2
  files_created: 4
  files_modified: 0
requirements: [FEAT-01, FEAT-02, FEAT-03, FEAT-04, FEAT-06, FEAT-08]
---

# Phase 03 Plan 03: Feature Pages (Recovery, Workload, Templates, Cold-Start) Summary

**One-liner:** 4 feature pages with accessible-credible long-form copy, embedded charts, per-page OG images, and consistent FeaturePageLayout structure at /features/* routes.

## What Was Built

Created 4 feature deep-dive pages at `/features/recovery-scoring`, `/features/workload-tracking`, `/features/smart-templates`, and `/features/cold-start`. Each page uses `FeaturePageLayout` with outcome-first hero text, a screenshot block, and two `data-animate` content sections.

- **Recovery Scoring** — 2 sections (How it works, The science behind it), RecoveryChart embedded in science section, `recovery.png` screenshot, `/og/recovery-scoring.png` OG image. Explains HRV baselines, zone system (green/yellow/red), rolling average smoothing.
- **Workload Tracking** — 2 sections (How it works, The science behind it), AcwrChart embedded in science section, `workload.png` screenshot, `/og/workload-tracking.png` OG image. Covers acute vs chronic load, ACWR sweet spot (0.8–1.3), Tim Gabbett research, RIR as intensity metric.
- **Smart Templates** — 2 sections (How it works, Built for real programming), `active-workout.png` screenshot, `/og/smart-templates.png` OG image. No chart. Covers coach-to-athlete workflow, exercise groups, prescribed vs actual tracking, autoregulation overlay.
- **Cold-Start Onboarding** — 2 sections (How it works, Why honesty matters), no screenshot (placeholder triggered), `/og/cold-start.png` OG image. No chart. Covers population-to-personal baseline transition across Day 1, Days 3–5, and Day 7+ calibration stages.

## Commits

| Task | Description | Commit |
|------|-------------|--------|
| 1 | Recovery Scoring + Workload Tracking pages | e8788f1 |
| 2 | Smart Templates + Cold-Start Onboarding pages | b23fa12 |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all pages contain real copy and functional component imports. Cold-start screenshot placeholder is intentional (no screenshot asset exists yet) and is correctly handled by FeaturePageLayout's `placeholderLabel` prop.

## Threat Flags

None — all 4 pages are static HTML with no user input, network endpoints, or new auth paths.

## Self-Check: PASSED

- [x] `src/pages/features/recovery-scoring.astro` exists
- [x] `src/pages/features/workload-tracking.astro` exists
- [x] `src/pages/features/smart-templates.astro` exists
- [x] `src/pages/features/cold-start.astro` exists
- [x] Commits e8788f1 and b23fa12 exist in git log
- [x] `npm run build` exits 0 (5 pages built including all 4 feature routes)
- [x] All acceptance criteria verified via grep checks
