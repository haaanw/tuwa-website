# Phase 11: CSS Foundation & Token System - Context

**Gathered:** 2026-05-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Load General Sans as a variable font (single WOFF2, weights 200–700), define CSS weight design tokens, wire native view-transition page crossfades, and scaffold Matisse CSS classes — **without any visible change to current design**.

</domain>

<decisions>
## Implementation Decisions

### Weight Token Values
- **D-01:** `--weight-display: 200` — ultralight for hero headlines (48px+)
- **D-02:** `--weight-heading: 300` — light for section titles and page titles
- **D-03:** `--weight-body: 500` — medium for paragraphs, nav links, descriptions
- **D-04:** `--weight-label: 600` — semi-bold for micro text, legal, all-caps captions
- **D-05:** Weight gradient is 200 → 300 → 500 → 600 (display → heading → body → label)

### View Transitions
- **D-06:** Use native CSS `@view-transition { navigation: auto }` — NOT `<ClientRouter>` or `<ViewTransitions />` component (would break IO scroll-reveal)
- **D-07:** Crossfade duration: 200ms — quick, snappy, responsive feel
- **D-08:** Global crossfade only — no per-element named transitions in this phase (Phase 16 can add if needed)

### Matisse CSS Scaffolding
- **D-09:** Minimal scaffolding: `.matisse-frieze` and `.matisse-shape` CSS classes with basic positioning
- **D-10:** `prefers-reduced-motion` guard on Matisse classes (consistent with existing pattern)
- **D-11:** Color approach: accent green (`--color-accent` #2B5240) first, charcoal as backup if green doesn't pop on travertine

### Weight Migration Strategy
- **D-12:** Define `--weight-*` tokens in `:root` only — do NOT swap existing hardcoded `font-weight: 600/700` values yet
- **D-13:** Phase 14 handles the search-and-replace of hardcoded weights → tokens across all pages

### Claude's Discretion
- View-transition easing function (ease, ease-out, etc.) — pick what feels best with 200ms duration
- Matisse class property stubs (which CSS properties to pre-declare vs leave for Phase 15)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Typography & Font
- `astro.config.mjs` lines 10-18 — Current font config (needs weight range change from ["400","600"] to "200 700")
- `src/styles/global.css` lines 1-60 — Existing design tokens and type scale

### View Transitions
- `.planning/research/FEATURES.md` §Astro ViewTransitions — Research on implementation approach
- `.planning/research/SUMMARY.md` — Confirms `@view-transition { navigation: auto }` approach

### Existing Animation Patterns
- `src/layouts/BaseLayout.astro` line 39 — IO scroll-reveal + reduced-motion check pattern
- `src/styles/global.css` lines 206-310 — Existing `prefers-reduced-motion` guard patterns

### Requirements
- `.planning/REQUIREMENTS.md` — TYPO-01, TYPO-02, IXPN-01, IXPN-02

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Design token system in `global.css` `:root` — well-established pattern for adding weight tokens
- `prefers-reduced-motion` guards used extensively (10+ instances) — follow same pattern for Matisse classes

### Established Patterns
- CSS custom properties in `:root` for all design tokens (colors, spacing, radii, type scale)
- `@media (prefers-reduced-motion: no-preference)` wraps all animation keyframes
- IntersectionObserver in BaseLayout.astro handles scroll-reveal — view transitions must not break this

### Integration Points
- `astro.config.mjs` `fonts[]` config — switch weight format from array to range string
- `src/styles/global.css` `:root` block — add 4 new `--weight-*` tokens
- `src/styles/global.css` bottom — add `@view-transition` rule and Matisse class definitions

</code_context>

<specifics>
## Specific Ideas

- Weight gradient (200 → 300 → 500 → 600) chosen for maximum editorial contrast at display level while keeping body text comfortable
- Matisse color: try accent green first; if it doesn't read well on travertine background, charcoal (#1C1915 or similar) is the fallback — Phase 15 makes the final call

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 11-css-foundation-token-system*
*Context gathered: 2026-05-14*
