---
gsd_state_version: 1.0
milestone: v4.1
milestone_name: Internationalization Follow-ups
status: executing
stopped_at: Phase 23 context gathered
last_updated: "2026-05-26T12:45:15.775Z"
last_activity: 2026-05-26 -- Phase 23 execution started
progress:
  total_phases: 3
  completed_phases: 0
  total_plans: 1
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-05-25)

**Core value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing
**Current focus:** Phase 23 — locale-formatting-utility

## Current Position

Phase: 23 (locale-formatting-utility) — EXECUTING
Plan: 1 of 1
Status: Executing Phase 23
Last activity: 2026-05-26 -- Phase 23 execution started

```
Progress: [                    ] 0% (0/3 phases)
```

## Performance Metrics

**Velocity:**

- Total plans completed: 0 (this milestone)
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 23 | TBD | - | - |
| 24 | TBD | - | - |
| 25 | TBD | - | - |

*Updated after each plan completion*

## Accumulated Context

### Decisions

- [Roadmap]: Use Astro built-in i18n routing (no external i18n library)
- [Roadmap]: @fontsource/noto-sans-sc is the only new npm dependency (v4.0)
- [Roadmap]: Per-page TypeScript translation files (not monolithic JSON)
- [Roadmap]: English unprefixed (prefixDefaultLocale: false) to preserve SEO equity
- [Roadmap]: Components receive content via props (locale-agnostic pattern)
- [Roadmap v4.1]: Two new packages only — satori ^0.27.0 + @resvg/resvg-js ^2.6.2
- [Roadmap v4.1]: satori does NOT support WOFF2; load GeneralSans TTF + Noto Sans SC .woff explicitly
- [Roadmap v4.1]: Module-level font cache in src/lib/og/fonts.ts (not per-call) — build time gate
- [Roadmap v4.1]: Translated URL slugs deferred — high ripple cost, marginal SEO benefit; revisit with Search Console data
- [Roadmap v4.1]: Single blog collection with `locale` in frontmatter (post.en.mdx / post.zh.mdx pattern)
- [Roadmap v4.1]: Native Intl (Node 22 full ICU) for formatting — no date-fns or dayjs

### Pending Todos

- Phase 25 research flag: verify satori `loadAdditionalAsset` return shape before coding the font loader
- Phase 25 research flag: confirm GeneralSans-Variable.ttf path (currently WOFF2 in public/fonts/)

### Blockers/Concerns

- None currently blocking

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Content | CONT-01: First blog post | Future milestone | v2.0 planning |
| Content | CONT-02: Case study page | Future milestone | v2.0 planning |
| Advanced Visual | ADVZ-01: Video hero background | Future milestone | v2.0 planning |
| Advanced Visual | ADVZ-02: Dark mode support | Out of scope | PROJECT.md |
| i18n | Translated URL slugs | Deferred — revisit with Search Console data | v4.1 requirements |
| i18n | Additional languages (ja, es, de) | Future milestone | Requirements |

## Quick Tasks Completed

| Date | Task | Summary |
|------|------|---------|
| 2026-05-17 | Performance Briefing full v5 execution | Completed homepage briefing, methodology links, explainer pages, six blog posts, comparison hub/pages, and verification. |
| 2026-05-17 | Performance Briefing plan and Methodology page | Logged v5.0 roadmap, shipped the first methodology page slice, and added Method links in nav/footer/homepage CTAs. |
| 2026-05-16 | Homepage CRO inspired by Contra Labs | Clarified hero positioning, added earlier CTAs, introduced Tuwa Method proof section, strengthened final CTA, and hid empty Blog nav links. |

## Session Continuity

Last session: 2026-05-26T05:36:33.447Z
Stopped at: Phase 23 context gathered
Resume file: .planning/phases/23-locale-formatting-utility/23-CONTEXT.md

## Operator Next Steps

- Run `/gsd:plan-phase 23` to plan Locale Formatting Utility
- Then `/gsd:plan-phase 24` for Blog Translation Infrastructure
- Then `/gsd:plan-phase 25` for Translated OG Images (highest complexity — verify satori font load shape first)
