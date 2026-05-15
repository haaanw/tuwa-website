# Phase 15: Matisse SVG Art Direction - Context

**Gathered:** 2026-05-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Author Matisse-inspired organic cut-out SVG shapes, compose them as a continuous hero frieze, add lighter decorative touches on feature deep-dive pages, and animate with parallax + entrance effects — all within Lighthouse DOM budget.

</domain>

<decisions>
## Implementation Decisions

### Shape Authoring
- **D-01:** Code-generated SVG shapes using programmatic Bezier curves — no Figma/Inkscape dependency (resolves STATE.md design prerequisite blocker)
- **D-02:** 5-7 distinct biomorphic blob shapes in the vocabulary
- **D-03:** Abstract biomorphic blobs only — no recognizable/figurative forms (leaves, bodies, etc.)
- **D-04:** Shapes stay parametric for iteration; SVGO-optimize final output for DOM budget (ART-03)

### Frieze Composition (Hero)
- **D-05:** Frieze sits as a background layer behind hero content (headline, device frame, badge all render on top)
- **D-06:** Full viewport width — shapes span edge-to-edge, overflow hidden clips naturally
- **D-07:** Defined band height (~200-300px) clustered around the device frame vertical position — not scattered across full hero height
- **D-08:** Uses existing `.matisse-frieze` container (Phase 11 stub) with `position: absolute; inset: 0`

### Feature Page Decoration
- **D-09:** Implement TWO approaches for comparison: (a) small cluster of 2-3 shapes, (b) shapes as section dividers between content blocks — then pick the winner
- **D-10:** Each feature page gets a unique shape from the 5-7 vocabulary (not all reusing the same shape)

### Color & Opacity
- **D-11:** 2-3 color palette — accent green (`--color-accent` #2B5240) as primary, plus 1-2 complementary tones (warm terracotta, soft gold, or muted blue — Claude's discretion on exact hues)
- **D-12:** Hero shapes: more opaque/solid fills for visual impact
- **D-13:** Feature page shapes: more transparent/lighter fills — creates hierarchy between hero and subpages
- **D-14:** Falls back to Phase 11 D-11 if complementary colors clash with travertine background

### Claude's Discretion
- Exact complementary color hues (terracotta, gold, blue — pick what works with travertine)
- Parallax intensity and direction (ART-05) — pick what feels natural
- Entrance animation style and timing (ART-06) — consistent with existing scroll-reveal pattern
- Shape scale/rotation transforms for variety within the 5-7 vocabulary
- Which approach wins for feature pages (cluster vs divider) after visual comparison

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Matisse CSS Scaffolding (Phase 11)
- `src/styles/global.css` lines 710-738 — `.matisse-frieze` and `.matisse-shape` class stubs, GPU pre-promotion, reduced-motion guard

### Hero Layout
- `src/components/Hero.astro` — Current hero structure (headline → subtitle → device frame → badge). Frieze integrates here.

### Animation Patterns
- `src/layouts/BaseLayout.astro` line 39 — IntersectionObserver scroll-reveal pattern (entrance animations must follow this)
- `src/styles/global.css` lines 206-310 — Existing `prefers-reduced-motion` guard patterns

### Requirements
- `.planning/REQUIREMENTS.md` — ART-01, ART-02, ART-03, ART-04, ART-05, ART-06

### Prior Phase Context
- `.planning/phases/11-css-foundation-token-system/11-CONTEXT.md` — D-09 through D-11 (Matisse scaffolding decisions, accent green color)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `.matisse-frieze` CSS class: absolute positioning, full inset, pointer-events none, overflow hidden, accent green color
- `.matisse-shape` CSS class: fill currentColor, GPU-promoted (translateZ(0), will-change), reduced-motion guarded
- IntersectionObserver in BaseLayout.astro for scroll-triggered animations
- Design token system in `global.css` `:root` for colors, spacing

### Established Patterns
- CSS custom properties for all design tokens
- `@media (prefers-reduced-motion: reduce)` wraps animation overrides
- Scroll-reveal via `data-animate` + IntersectionObserver (not scroll-timeline)
- SVG inline in components (FeatureGrid wheel, Header icons) — established pattern for inline SVG

### Integration Points
- `src/components/Hero.astro` — add `.matisse-frieze` container as sibling/child of hero section
- `src/layouts/FeaturePageLayout.astro` — add per-page decoration shapes
- `src/styles/global.css` — extend Matisse class stubs with actual animations, parallax, colors
- `src/layouts/BaseLayout.astro` — may need IO observer additions for Matisse entrance animations

</code_context>

<specifics>
## Specific Ideas

- Matisse's "Swimming Pool" (La Piscine, 1952) as primary reference — continuous frieze of organic blue forms on white. Translate to accent green on travertine.
- 2-3 color palette evokes Matisse's multi-color cut-out period — complementary warm tones against the cool green
- Hero band creates a "paper cut-out strip" feeling — shapes should feel placed, not random
- Feature page comparison (cluster vs divider) ensures the lighter treatment is validated visually before committing

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 15-matisse-svg-art-direction*
*Context gathered: 2026-05-15*
