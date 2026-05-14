# Phase 10: v2.0 Cleanup - Context

**Gathered:** 2026-05-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Remove dead CSS from superseded bento grid, clean up stale animation attributes, close partial requirement gaps (ANIM-03, UIPX-05) from milestone audit, and update tracking documents.

</domain>

<decisions>
## Implementation Decisions

### Dead CSS Removal
- **D-01:** Remove `.feature-card` CSS rules (global.css lines 219-242) — zero `.astro` files reference this class after Phase 8.1 replaced the bento grid with the click wheel.
- **D-02:** Light audit of global.css for other orphaned selectors beyond `.feature-card`. Quick grep-verify each selector against `src/` before removing. Do NOT aggressively refactor — only remove clearly dead code.
- **D-03:** `--shadow-bento-hero` and `--shadow-bento-hero-hover` tokens already removed by Phase 8.1. `--shadow-card` and `--shadow-card-hover` tokens are STILL IN USE (blog listing cards) — do not touch.

### Requirement Gap Closure
- **D-04:** UIPX-05 (bento grid) — mark as "superseded by Phase 8.1 click wheel" in REQUIREMENTS.md. No re-implementation needed.
- **D-05:** ANIM-03 (stagger delays) — re-implement stagger animation on the click wheel segments so the requirement is technically satisfied again. Each wheel arc should animate in with a cascade delay on scroll-into-view.
- **D-06:** SHOT-01 (3x re-exports) — out of scope for this phase. Screenshots work at current resolution. Leave as-is.

### Wheel Stagger Animation
- **D-07:** Stagger approach is Claude's discretion. Must work with existing AnimationController (IntersectionObserver + `data-animate` + `data-animate-delay` pattern in BaseLayout.astro). Pick whatever looks best with the wheel's visual structure.

### Stale Animation Attributes
- **D-08:** Remove `data-animate-delay="0ms"` from FeatureGrid wheel-container if delay is meaningless (single animated element). Or repurpose for stagger if D-05 uses individual arc delays.

### Claude's Discretion
- Stagger animation approach for wheel segments (arc reveal cascade, spin-in, or other)
- Exact delay values between segments
- Whether to use `data-animate-delay` on individual arcs or a different mechanism

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Milestone Audit
- `.planning/v2.0-MILESTONE-AUDIT.md` — Defines the 3 partial requirement gaps (ANIM-03, UIPX-05, SHOT-01) and tech debt items this phase closes

### Phase 8.1 (Superseding Phase)
- `.planning/phases/08.1-featuregrid-click-wheel/08.1-01-VERIFICATION.md` — Confirms bento-hero-card already removed, documents what was superseded

### Requirements
- `.planning/REQUIREMENTS.md` — Traceability table showing ANIM-03 and UIPX-05 mapped to Phase 10

### Animation Infrastructure
- `src/layouts/BaseLayout.astro` (lines 80-100) — AnimationController script that reads `data-animate` and `data-animate-delay`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **AnimationController** (BaseLayout.astro): IntersectionObserver-based, reads `data-animate` + `data-animate-delay` attributes, adds `.is-visible` class. Already wired globally.
- **FeatureGrid.astro**: Click wheel component with 5 SVG arc paths, inline script for rotation/interaction.

### Established Patterns
- `data-animate` + `data-animate-delay` pattern for scroll-triggered stagger (used in Phase 7 on card grids before 8.1 replaced them)
- CSS keyframes in global.css, JS in BaseLayout — animation split between CSS and controller script

### Integration Points
- `src/styles/global.css` — dead CSS lives here, new wheel stagger keyframes go here
- `src/components/FeatureGrid.astro` — needs `data-animate-delay` attributes on arcs (or equivalent)
- `.planning/REQUIREMENTS.md` — traceability table needs ANIM-03/UIPX-05 status updates

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches for the cleanup and stagger animation.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 10-v2-cleanup*
*Context gathered: 2026-05-14*
