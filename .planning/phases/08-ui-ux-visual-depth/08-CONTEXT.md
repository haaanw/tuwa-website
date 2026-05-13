# Phase 8: UI/UX Visual Depth - Context

**Gathered:** 2026-05-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Elevate the site's visual quality to premium fitness brand level. Delivers consistent section spacing, noise texture depth, micro-interactions on all interactive elements, a bento grid redesign of the FeatureGrid, and animated counter metrics. Does not add new pages, new components beyond what's needed, or change content/copy.

</domain>

<decisions>
## Implementation Decisions

### Visual Texture & Depth
- **D-01:** Subtle noise overlay across the full page background — very light grain texture applied site-wide, like textured paper. CSS-only via SVG filter (no image asset). Creates uniform premium feel.
- **D-02:** No gradient accents — noise alone provides the visual depth differentiation from default Tailwind.

### Section Spacing
- **D-03:** Claude's Discretion — pick appropriate spacing per section within the 120-160px desktop / 64-80px mobile range defined in success criteria. No specific section needs special treatment.

### Micro-Interactions & Hover States
- **D-04:** Subtle & precise button/CTA hover — `scale(1.02)` on hover, `scale(0.98)` on active. Matches Phase 7's "precise & swift" motion direction. Duration 150-200ms, ease-out.
- **D-05:** Shadow lift on feature cards and blog cards — increase `box-shadow` depth on hover (no translate). Cards appear to rise off page. Classic material-style depth cue.
- **D-06:** All interactive elements (buttons, CTAs, cards, nav links) get hover/active states. Mobile tap feedback via `:active` pseudo-class.

### Bento Grid Layout
- **D-07:** Recovery Scoring is the hero card — largest, most prominent position in the bento grid. It's the most content-rich feature with the sticky scroll showcase.
- **D-08:** Three-tier visual hierarchy: 1 large (Recovery Scoring) + 2 medium (Workload Tracking, Smart Templates) + 2 small (Cold Start Solution, Coaching). Asymmetric grid, not uniform columns.
- **D-09:** FeatureGrid.astro restructured from current `<ul>` list to CSS Grid bento layout. Existing per-card stagger animation (Phase 7) must be preserved.

### Animated Counters
- **D-10:** Claude's Discretion — pick 2-3 compelling metrics with reasonable placeholder numbers. Good candidates: session count, athlete count, accuracy percentage, or similar social proof stats.
- **D-11:** Claude's Discretion — pick best placement for conversion impact (between hero and features, or above CTA section).
- **D-12:** Counters animate on scroll-into-view using existing AnimationController IntersectionObserver pattern. Count-up duration within the 300-500ms "precise & swift" range. Respect `prefers-reduced-motion` — show final numbers immediately when reduced motion enabled.

### Claude's Discretion
- Exact section spacing values within 120-160px desktop / 64-80px mobile range
- Counter metrics selection and placement
- Bento grid CSS Grid template details (exact column/row spans)
- Noise texture opacity and SVG filter parameters
- Card shadow values (base and hover states)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `src/styles/global.css` — All design tokens (colors, spacing, typography, radii), animation keyframes, device frame styles, step dot styles
- `CLAUDE.md` — Technology stack constraints (Astro 6 + Tailwind v4 + @tailwindcss/vite), font setup, performance requirements

### Components to Modify
- `src/components/FeatureGrid.astro` — Current 5-card `<ul>` list with per-card stagger `data-animate-delay` attributes (Phase 7). Restructure to bento grid.
- `src/components/Hero.astro` — Hero section with sequenced entrance animation (Phase 7). May need noise texture integration.
- `src/components/LandingCTA.astro` — CTA section, needs micro-interaction hover states
- `src/components/FeatureCTA.astro` — Feature page CTA, needs micro-interaction hover states
- `src/components/Header.astro` — Nav buttons/links need hover states
- `src/components/Footer.astro` — Footer links need hover states

### Animation System
- `src/layouts/BaseLayout.astro` — AnimationController script (IntersectionObserver + `data-animate-delay` stagger support from Phase 7). Counter animation hooks into this.
- `.planning/phases/07-animation-polish/07-CONTEXT.md` — Phase 7 animation decisions (D-08: precise & swift, D-09: existing fade-up stays)

### Pages
- `src/pages/index.astro` — Landing page (Hero + FeatureGrid + LandingCTA). Section spacing applied here.

### Requirements
- `.planning/REQUIREMENTS.md` — UIPX-01 through UIPX-06 definitions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `AnimationController` in BaseLayout — IntersectionObserver with `data-animate` + `data-animate-delay` + `.is-visible` pattern. Counter animation can use same trigger.
- `fade-up` keyframe in global.css — 400ms ease-out. Cards and counters can reuse.
- Design tokens: `--color-accent`, `--color-accent-hover`, `--color-surface-el`, `--radius-md`, all spacing vars (`--space-xs` through `--space-3xl`).
- `--color-accent-hover: #1E3D2F` already defined for CTA hover states.

### Established Patterns
- `data-animate` attribute triggers observer → `.is-visible` class → CSS animation fires
- `@media (prefers-reduced-motion: no-preference)` gating on all animations
- `is:inline` script pattern for browser-side JS
- Inline `style` attributes with CSS custom properties (established pattern across all components)

### Integration Points
- `FeatureGrid.astro` — bento grid replaces current card list; stagger delays need re-mapping to new grid positions
- `global.css` — noise texture, card hover shadows, button micro-interactions, counter animation keyframes all added here
- `index.astro` — section spacing applied between Hero/FeatureGrid/LandingCTA; counter component inserted
- `BaseLayout.astro` — AnimationController may need counter count-up logic added

</code_context>

<specifics>
## Specific Ideas

- **Noise texture reference**: Whoop and Oura use similar subtle grain overlays on hero sections. Full-page application here (not just hero).
- **Bento grid**: Recovery Scoring card should feel like the "hero" of the feature grid — clearly the most important feature visually.
- **Three-tier card hierarchy**: Large → Medium → Small creates a clear reading order and visual flow through the features.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 08-ui-ux-visual-depth*
*Context gathered: 2026-05-13*
