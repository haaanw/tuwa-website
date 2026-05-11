# Phase 7: Animation Polish - Context

**Gathered:** 2026-05-12
**Status:** Ready for planning

<domain>
## Phase Boundary

Layer stagger timing, hero entrance choreography, and a sticky scroll showcase onto the existing animation system (Phase 5). Delivers ANIM-03 (stagger delays), ANIM-04 (hero entrance choreography), and ANIM-05 (sticky scroll showcase). Does not change the AnimationController, add new pages, or modify layout structure beyond what's needed for sticky scroll on the recovery-scoring page.

</domain>

<decisions>
## Implementation Decisions

### Stagger Timing
- **D-01:** Quick cascade stagger on FeatureGrid cards — each card enters 80-120ms after the previous, total stagger ~400-500ms for all 5 cards. Move `data-animate` from the parent `<section>` to individual `<li>` elements with `data-animate-delay` attributes.
- **D-02:** Stagger applies to FeatureGrid only. Other repeated elements (feature page sections, CTAs) keep the current fade-up-together behavior.

### Hero Entrance Choreography
- **D-03:** Sequenced entrance: headline fades in first → subtitle follows → device mockup enters last with a slight scale-up. Text-first builds anticipation, device is the payoff.
- **D-04:** Hero animates immediately on page load — no IntersectionObserver trigger. It's above the fold, so animate as soon as the page renders. Use CSS animation with no scroll dependency (e.g., `animation` property on load, not gated by `.is-visible`).

### Sticky Scroll Showcase
- **D-05:** Recovery Scoring page gets the sticky scroll showcase. Most content-rich page with natural scroll steps (recovery zones, data sources, personal baseline).
- **D-06:** Layout: sticky device frame pinned on one side, text content scrolls through 3 steps on the other side. Each step swaps the screenshot inside the DeviceFrame. Oura Ring feature page style.
- **D-07:** 3 scroll steps — Claude groups the 4 existing subsections into 3 clean steps, picking the best content grouping.

### Animation Feel
- **D-08:** Precise & swift motion personality — fast animations (300-500ms), subtle movements, ease-out curves. Matches the app's data-precision brand. Nothing lingers.
- **D-09:** Existing fade-up animation (400ms ease-out, 20px translate) stays as-is. Hero and stagger get new animations, scroll sections keep the current fade-up.

### Claude's Discretion
- Exact stagger delay interval within the 80-120ms range
- Hero animation durations and easing curves (within the "precise & swift" direction)
- How to group recovery-scoring subsections into 3 sticky scroll steps
- Whether sticky scroll uses IntersectionObserver, scroll event, or CSS `position: sticky` + scroll-driven animations
- Screenshot swap mechanism in sticky scroll (crossfade, instant swap, slide)
- Responsive behavior of sticky scroll on mobile (may collapse to standard layout)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Animation System
- `src/layouts/BaseLayout.astro` — AnimationController script (lines 36-54), single IntersectionObserver with `.js-enabled` gating
- `src/styles/global.css` — `@keyframes fade-up`, `data-animate` styles, `prefers-reduced-motion` media queries (lines 85-109)
- `.planning/phases/05-animation-infrastructure/05-CONTEXT.md` — Phase 5 decisions (D-01 through D-03) on controller placement, no-JS fallback, reduced-motion behavior

### Components to Modify
- `src/components/Hero.astro` — Hero section, needs sequenced entrance animation
- `src/components/FeatureGrid.astro` — 5 feature cards in `<ul>`, needs per-card stagger via `data-animate-delay`
- `src/components/DeviceFrame.astro` — CSS iPhone frame component, used in sticky scroll

### Sticky Scroll Target
- `src/pages/features/recovery-scoring.astro` — Target page for sticky scroll showcase, has 4 subsections + RecoveryChart
- `src/layouts/FeaturePageLayout.astro` — Layout wrapper for feature pages, may need modification for sticky scroll section
- `src/assets/screenshots/recovery.png` — Primary screenshot for sticky scroll device frame

### Phase 6 Context
- `.planning/phases/06-screenshot-presentation/06-CONTEXT.md` — DeviceFrame component decisions, Matisse art direction

### Requirements
- `.planning/REQUIREMENTS.md` — ANIM-03, ANIM-04, ANIM-05 definitions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AnimationController` in BaseLayout — single IntersectionObserver, `data-animate` + `.is-visible` pattern. Extend for stagger support via `data-animate-delay`.
- `DeviceFrame.astro` — CSS iPhone frame, already used in Hero and feature pages. Reuse in sticky scroll showcase.
- `fade-up` keyframe in global.css — 400ms ease-out, 20px translateY. Keep for scroll sections.
- `RecoveryChart.astro` — Chart.js component on recovery page, may need repositioning for sticky scroll layout.

### Established Patterns
- `data-animate` attribute triggers observer → `.is-visible` class added → CSS animation fires
- `is:inline` script pattern for browser-side JS (not bundled)
- Design tokens in global.css for spacing, colors, radii
- Astro `<Image>` component for optimized images with srcset

### Integration Points
- `BaseLayout.astro` AnimationController — may need to read `data-animate-delay` for stagger
- `FeatureGrid.astro` `<section data-animate>` → change to per-`<li>` `data-animate` with delay
- `Hero.astro` — add CSS animation classes for sequenced entrance (no observer, immediate)
- `recovery-scoring.astro` — restructure into sticky scroll layout (significant markup change)

</code_context>

<specifics>
## Specific Ideas

- **Oura Ring reference** for sticky scroll: device pinned on one side, text steps scroll on the other. Each step swaps what's shown in the device frame.
- **Recovery Scoring content grouping**: 4 subsections → 3 scroll steps. Claude picks the best grouping (likely: overview + zones as step 1, data sources as step 2, personal baseline as step 3).
- **Hero as brand moment**: The sequenced entrance (text → subtitle → device) should feel like the hero "assembles" — not just fades in piece by piece.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 07-animation-polish*
*Context gathered: 2026-05-12*
