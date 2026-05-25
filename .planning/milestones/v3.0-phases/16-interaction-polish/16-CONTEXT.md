# Phase 16: Interaction Polish - Context

**Gathered:** 2026-05-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Every interactive element on the site has a smooth, intentional transition; primary CTA buttons have a magnetic hover pull; and page-to-page navigation feels momentum-driven and cohesive. This is an audit + enhancement pass — not new features, but refining the feel of what exists.

</domain>

<decisions>
## Implementation Decisions

### Scroll Feel
- **D-01:** Use Lenis for momentum scroll — gives the contralabs.com-style inertia feel
- **D-02:** Direct `lenis` package integration in BaseLayout.astro `<script>` tag (NOT `astro-lenis` wrapper — thin abstraction, maintenance risk)
- **D-03:** Disable Lenis on touch devices where native momentum already exists (pointer: coarse media query or touch detection)

### Magnetic CTA
- **D-04:** Medium intensity magnetic pull — 10-16px shift, ~150px activation radius from button center
- **D-05:** Apply to ALL `.btn-cta` elements site-wide (not just hero)
- **D-06:** No magnetic effect on touch devices (hover-only behavior)

### Hover Audit
- **D-07:** Complete audit — every clickable element site-wide gets a smooth hover transition
- **D-08:** Elements already covered (Phase 8): `.btn-cta`, `.nav-link`, `.blog-listing-item`
- **D-09:** Elements to add: footer links, FAQ accordion headers, FeatureGrid items, feature page inline links, any other interactive elements found during audit

### Timing Philosophy
- **D-10:** Standardize easing curve only — keep varied durations (contextually appropriate)
- **D-11:** Standard easing: `cubic-bezier(0.25, 0.1, 0.25, 1)` for all hover/interaction transitions
- **D-12:** Define as CSS custom property `--ease-interactive` for consistent use
- **D-13:** Migrate existing transitions from `ease` / `ease-out` to the new standard curve

### Claude's Discretion
- Lenis configuration parameters (lerp value, scroll wrapper approach)
- Magnetic effect implementation approach (mousemove listener, GSAP, or vanilla RAF loop)
- Specific duration values for new hover transitions (keep in the existing 100-250ms range)
- Whether to animate text-decoration or use pseudo-element underlines for link hovers
- Handling Lenis + anchor link navigation (scrollTo integration)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scroll
- `.planning/research/STACK.md` — Contains Lenis integration pattern, version (1.3.23), and contralabs.com reference analysis

### Existing Patterns
- `src/styles/global.css` §260-310 — Current hover/transition implementations (Phase 8 patterns)
- `src/layouts/BaseLayout.astro` — Where Lenis script will be integrated

### Requirements
- `.planning/REQUIREMENTS.md` §IXPN-03, IXPN-04, IXPN-05 — Formal requirement definitions

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.btn-cta` class: Already has hover scale(1.02) + background color change — magnetic effect adds to this
- `.nav-link` class: Has color transition on hover
- `.blog-listing-item`: Has shadow-lift hover
- `prefers-reduced-motion` guard pattern: Wraps all animations in `@media (prefers-reduced-motion: no-preference)`
- CSS custom properties system in global.css (tokens for colors, shadows, radii)

### Established Patterns
- All transitions wrapped in reduced-motion media query
- Hover states defined in global.css (not component-scoped styles)
- Focus-visible outline ring: `2px solid var(--color-accent)` with `2px offset`
- View transitions via native CSS `@view-transition { navigation: auto }`

### Integration Points
- `BaseLayout.astro` — Lenis script goes here (wraps all pages)
- `src/styles/global.css` — All hover transitions live here (centralized)
- Existing `--color-accent-hover: #1E3D2F` token for hover color states
- `--shadow-card-hover` token for elevated hover states

</code_context>

<specifics>
## Specific Ideas

- contralabs.com is the reference for the scroll/momentum feel
- Medium magnetic pull (10-16px) — clearly visible but not gimmicky
- Snappier ease-out variant chosen over standard ease-out — slightly more initial speed, premium feel

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 16-interaction-polish*
*Context gathered: 2026-05-16*
