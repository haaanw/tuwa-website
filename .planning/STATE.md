---
gsd_state_version: 1.0
milestone: v4.0
milestone_name: Multi-Language Support
status: roadmapped
stopped_at: Roadmap created — ready for phase planning
last_updated: "2026-05-16T12:00:00Z"
last_activity: 2026-05-16 -- Roadmap v4.0 created (Phases 17-22)
progress:
  total_phases: 6
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-16)

**Core value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing
**Current focus:** Milestone v4.0 — Multi-Language Support (Chinese + French)

## Current Position

Phase: 17 (i18n Infrastructure) — not started
Plan: —
Status: Roadmap created, ready for phase planning
Last activity: 2026-05-16 — Roadmap v4.0 defined (6 phases, 14 requirements)

Progress: [░░░░░░░░░░] 0% milestone

## Performance Metrics

**Velocity:**

- Total plans completed: 0 (this milestone)
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 17 | 0 | - | - |
| 18 | 0 | - | - |
| 19 | 0 | - | - |
| 20 | 0 | - | - |
| 21 | 0 | - | - |
| 22 | 0 | - | - |

*Updated after each plan completion*

## Accumulated Context

### Decisions

- [Roadmap]: Use Astro built-in i18n routing (no external i18n library)
- [Roadmap]: @fontsource/noto-sans-sc is the only new npm dependency
- [Roadmap]: Per-page TypeScript translation files (not monolithic JSON)
- [Roadmap]: English unprefixed (prefixDefaultLocale: false) to preserve SEO equity
- [Roadmap]: Components receive content via props (locale-agnostic pattern)
- [Roadmap]: Phase 20 and 21 can run in parallel (both depend on 19, not each other)

### Pending Todos

- Translation source decision: LLM draft + human review vs professional translators
- FeatureGrid (15.5K) decomposition strategy for i18n refactor
- Verify General Sans oe ligature (U+0153) for French before Phase 19

### Blockers/Concerns

- None currently blocking

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Content | CONT-01: First blog post | Future milestone | v2.0 planning |
| Content | CONT-02: Case study page | Future milestone | v2.0 planning |
| Advanced Visual | ADVZ-01: Video hero background | Future milestone | v2.0 planning |
| Advanced Visual | ADVZ-02: Dark mode support | Out of scope | PROJECT.md |
| i18n | Translated OG images (CJK in satori) | v4.1+ | Research |
| i18n | Blog post translations | v4.1+ | Research |
| i18n | URL slug translation | v4.1+ | Research |
| i18n | Additional languages (ja, es, de) | Future milestone | Requirements |

## Session Continuity

Last session: 2026-05-16T12:00:00Z
Stopped at: Roadmap v4.0 created — 6 phases (17-22), 14 requirements mapped
Resume file: —
