# Phase 5: Animation Infrastructure - Context

**Gathered:** 2026-05-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Fix the duplicated IntersectionObserver bug and establish a single, reliable animation system with accessibility guards. This phase delivers ANIM-01 (single AnimationController) and ANIM-02 (prefers-reduced-motion guard). No new animation types, stagger delays, or choreography — those belong to Phase 7.

</domain>

<decisions>
## Implementation Decisions

### Controller Placement
- **D-01:** Single `<script is:inline>` block in BaseLayout.astro, placed after `<Footer />` before `</body>`. Remove the duplicate IntersectionObserver IIFEs from both FeatureCTA.astro (lines 63-80) and LandingCTA.astro (lines 89-106). Every page gets the observer automatically through BaseLayout.

### No-JS Fallback
- **D-02:** JS-applied class gating. The AnimationController script adds `.js-enabled` to `<html>` before observing elements. CSS selectors for `[data-animate]` hiding (opacity:0, transform) are scoped under `.js-enabled [data-animate]`. Without JavaScript, elements render at full opacity with no transform — fully visible by default.

### Reduced-Motion Behavior
- **D-03:** Strict zero-motion for `prefers-reduced-motion: reduce` users. No opacity change, no transitions, no animations. Elements render normally as if `data-animate` were not present. The `@media (prefers-reduced-motion: reduce)` block in global.css should NOT apply opacity:0 or any transition — content is just there.

### Claude's Discretion
- Observer threshold value (currently 0.15) — adjust if needed during implementation
- Whether to use `rootMargin` for earlier/later trigger points
- Script placement within BaseLayout (before or after footer)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Animation System
- `src/components/FeatureCTA.astro` — Contains duplicate IntersectionObserver to remove (lines 63-80)
- `src/components/LandingCTA.astro` — Contains duplicate IntersectionObserver to remove (lines 89-106)
- `src/layouts/BaseLayout.astro` — Target location for single AnimationController script
- `src/styles/global.css` — Contains `@keyframes fade-up`, `data-animate` styles, and `prefers-reduced-motion` media queries (lines 85-109)

### Requirements
- `.planning/REQUIREMENTS.md` §Animation Infrastructure — ANIM-01, ANIM-02 definitions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `global.css` already has `@keyframes fade-up` and `data-animate` styling — refactor in place, don't recreate
- `is:inline` IIFE pattern established in Header.astro scroll shadow — AnimationController follows same pattern

### Established Patterns
- `is:inline` for browser scripts (not bundled, not island) — consistent with ThemeToggle/MobileMenu being the only Astro islands
- `data-animate` attribute on sections/elements triggers observer — this convention stays
- `.is-visible` class added by observer to trigger CSS animation — this convention stays

### Integration Points
- BaseLayout.astro `<body>` — where the single script goes
- All pages using `data-animate` attribute — no changes needed on consuming pages
- Feature pages importing FeatureCTA/LandingCTA — these components lose their script blocks but keep their `data-animate` attributes
- `global.css` animation section — refactored for `.js-enabled` gating and strict reduced-motion

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. The three decisions above fully define the implementation direction.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-animation-infrastructure*
*Context gathered: 2026-05-11*
