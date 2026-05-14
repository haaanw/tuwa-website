# Phase 10: v2.0 Cleanup - Research

**Researched:** 2026-05-14
**Domain:** CSS dead code removal, scroll-triggered stagger animation, requirements traceability update
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Remove `.feature-card` CSS rules (global.css lines 219-242) — zero `.astro` files reference this class after Phase 8.1 replaced the bento grid with the click wheel.
- **D-02:** Light audit of global.css for other orphaned selectors beyond `.feature-card`. Quick grep-verify each selector against `src/` before removing. Do NOT aggressively refactor — only remove clearly dead code.
- **D-03:** `--shadow-bento-hero` and `--shadow-bento-hero-hover` tokens already removed by Phase 8.1. `--shadow-card` and `--shadow-card-hover` tokens are STILL IN USE (blog listing cards) — do not touch.
- **D-04:** UIPX-05 (bento grid) — mark as "superseded by Phase 8.1 click wheel" in REQUIREMENTS.md. No re-implementation needed.
- **D-05:** ANIM-03 (stagger delays) — re-implement stagger animation on the click wheel segments so the requirement is technically satisfied again. Each wheel arc should animate in with a cascade delay on scroll-into-view.
- **D-06:** SHOT-01 (3x re-exports) — out of scope for this phase. Screenshots work at current resolution. Leave as-is.
- **D-07:** Stagger approach is Claude's discretion. Must work with existing AnimationController (IntersectionObserver + `data-animate` + `data-animate-delay` pattern in BaseLayout.astro).
- **D-08:** Remove `data-animate-delay="0ms"` from FeatureGrid wheel-container if delay is meaningless (single animated element). Or repurpose for stagger if D-05 uses individual arc delays.

### Claude's Discretion

- Stagger animation approach for wheel segments (arc reveal cascade, spin-in, or other)
- Exact delay values between segments
- Whether to use `data-animate-delay` on individual arcs or a different mechanism

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANIM-03 | Stagger delays on card grids and feature lists via `data-animate-delay` | Re-implement on wheel arcs using existing AnimationController; individual `data-animate` + `data-animate-delay` per arc path |
| UIPX-05 | Bento grid layout for feature overview or equivalent high-impact section | Mark as superseded by Phase 8.1 click wheel in REQUIREMENTS.md — no code change needed |
</phase_requirements>

---

## Summary

Phase 10 is a targeted cleanup phase with three concrete deliverables: (1) remove dead `.feature-card` CSS from global.css, (2) re-satisfy ANIM-03 by adding stagger animation to the click wheel's five arc segments, and (3) update REQUIREMENTS.md to mark UIPX-05 as superseded.

The dead CSS audit is already scoped by D-02 — a grep search confirms `.feature-card` appears only in global.css (lines 219-242), with zero references in any `.astro` file. The `.bento-hero-card` selector confirmed absent from codebase (grep returned no matches — was already cleaned in Phase 8.1). The `--shadow-card` and `--shadow-card-hover` tokens referenced within the `.feature-card` block are still alive in `.blog-listing-item` — those tokens must not be removed, only the `.feature-card` rule block that references them.

The stagger animation (ANIM-03) requires a careful approach: the existing AnimationController in BaseLayout.astro observes elements with `[data-animate]` and applies their `data-animate-delay` as inline `animationDelay`. The current wheel-container has a single `data-animate` on the whole container with a meaningless `data-animate-delay="0ms"`. The solution is to move `data-animate` + staggered `data-animate-delay` values onto the individual arc `<path>` elements inside `#wheel-arcs-group`, letting the observer fire a cascade as each arc becomes visible. This reuses the established infrastructure without any new JS.

**Primary recommendation:** Apply `data-animate` to each of the 5 wheel arc `<path>` elements with delays of 0ms, 80ms, 160ms, 240ms, 320ms respectively. Remove the single `data-animate`/`data-animate-delay="0ms"` from the container div. Add a `wheel-arc-reveal` keyframe to global.css (fade-in + subtle scale from 0.92) that fires when IntersectionObserver triggers `.is-visible`. This satisfies ANIM-03, removes the stale 0ms delay, and requires no new infrastructure.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Dead CSS removal | Static build / CSS | — | CSS-only change in global.css, no runtime impact |
| Wheel arc stagger animation | Browser/Client (CSS keyframes + existing JS) | — | AnimationController already observes `[data-animate]`; arcs are SVG paths in browser DOM |
| REQUIREMENTS.md traceability update | Docs | — | Plaintext file update, no runtime component |

---

## Standard Stack

### Core (already installed — no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS `@keyframes` in global.css | N/A | Wheel arc reveal animation | Established pattern for all scroll-triggered animations on this site |
| IntersectionObserver (native) | N/A | Triggers `.is-visible` on scroll | Already wired globally in BaseLayout.astro AnimationController |
| `data-animate` + `data-animate-delay` attributes | N/A | Per-element stagger configuration | Existing convention from Phase 7 card stagger |

No new packages required. [VERIFIED: grep of package.json and src/ codebase]

---

## Architecture Patterns

### System Architecture Diagram

```
Scroll event
     |
     v
IntersectionObserver (BaseLayout.astro, threshold: 0.15)
     |
     v
[data-animate] elements enter viewport
     |
     +-- reads data-animate-delay attribute
     |   sets el.style.animationDelay = delay
     |
     v
.is-visible class added
     |
     v
CSS: .js-enabled [data-animate].is-visible
     |   triggers @keyframes animation (fade-up or wheel-arc-reveal)
     v
Element visible on screen
```

### Recommended Project Structure

No structural changes. All edits are within:

```
src/
├── components/FeatureGrid.astro   — add data-animate to arc <path> elements
└── styles/global.css             — remove .feature-card block, add wheel-arc-reveal keyframe

.planning/
└── REQUIREMENTS.md               — update UIPX-05 status
```

### Pattern 1: Individual Arc Stagger (ANIM-03 re-implementation)

**What:** Move `data-animate` from the single wheel-container div onto each individual `<path class="wheel-arc">` element with staggered delays. The AnimationController picks them up automatically.

**When to use:** Whenever 2+ elements in a group should cascade-reveal on scroll, using the existing AnimationController.

**Implementation:**

```astro
<!-- Before (stale — single element, meaningless 0ms delay) -->
<div
  class="wheel-container"
  id="feature-wheel"
  data-animate
  data-animate-delay="0ms"
  ...
>
  <svg ...>
    <g id="wheel-arcs-group">
      <circle class="wheel-rim-track" ... />
      <path class="wheel-arc is-active" data-index="0" ... />
      <path class="wheel-arc" data-index="1" ... />
      ...
    </g>
  </svg>
</div>

<!-- After (ANIM-03 satisfied — 5 arcs, cascaded delays) -->
<div
  class="wheel-container"
  id="feature-wheel"
  aria-label="Feature navigation wheel"
  role="group"
  tabindex="0"
>
  <svg ...>
    <g id="wheel-arcs-group">
      <circle class="wheel-rim-track" ... />
      <path class="wheel-arc is-active" data-index="0"
        data-animate data-animate-delay="0ms" ... />
      <path class="wheel-arc" data-index="1"
        data-animate data-animate-delay="80ms" ... />
      <path class="wheel-arc" data-index="2"
        data-animate data-animate-delay="160ms" ... />
      <path class="wheel-arc" data-index="3"
        data-animate data-animate-delay="240ms" ... />
      <path class="wheel-arc" data-index="4"
        data-animate data-animate-delay="320ms" ... />
    </g>
  </svg>
  ...
</div>
```

**CSS to add in global.css (wheel arc reveal keyframe):**

```css
/* Phase 10 — Wheel arc stagger reveal (ANIM-03) */
@media (prefers-reduced-motion: no-preference) {
  .js-enabled [data-animate].wheel-arc {
    opacity: 0;
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(0.92);
  }
  .js-enabled [data-animate].wheel-arc.is-visible {
    animation: wheel-arc-reveal 350ms ease-out forwards;
  }
  @keyframes wheel-arc-reveal {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
```

**Source:** [VERIFIED: BaseLayout.astro AnimationController — reads `data-animate-delay`, applies as `el.style.animationDelay`; existing pattern confirmed in Phase 7 card stagger implementation]

**Note on SVG transforms:** SVG `<path>` elements support CSS `transform` with `transform-box: fill-box` and `transform-origin: center` — this is the correct approach for SVG element scaling. The AnimationController applies `animationDelay` as an inline style, which works on SVG elements identically to HTML elements. [ASSUMED — standard SVG CSS behavior, not reverified against browser compatibility tables in this session]

### Pattern 2: Dead CSS Removal (D-01, D-02)

**What:** Delete the `.feature-card` rule block from global.css. The block spans lines 219-242 (base styles + hover + motion query).

**Boundary conditions:**
- `--shadow-card` token: referenced by `.feature-card` AND `.blog-listing-item`. Deleting the `.feature-card` block leaves `--shadow-card` in `:root` and used by `.blog-listing-item` — correct, do not touch the token.
- `.bento-hero-card`: confirmed absent from global.css entirely (Phase 8.1 cleaned it). No action needed.

**Verification grep before deleting:**

```bash
grep -r "feature-card" src/  # should return zero results after deletion
grep -r "bento-hero-card" src/  # already zero
```

### Anti-Patterns to Avoid

- **Removing `--shadow-card` or `--shadow-card-hover` design tokens:** These are still used by `.blog-listing-item` and must be preserved. Only the `.feature-card` rule block that references them should be deleted.
- **Applying `data-animate` to the `#wheel-arcs-group` `<g>` element:** The AnimationController adds `.is-visible` to the observed element. Observing a `<g>` instead of individual `<path>` elements means all 5 arcs reveal simultaneously, defeating the stagger.
- **Applying `data-animate` to `.wheel-segment-billboard` elements:** These SVG `<g>` elements contain the text labels. Animating them independently would desynchronize arcs from labels visually. Keep arc paths and labels together by only animating arcs.
- **Using CSS `attr()` with type hints for delay values:** Not cross-browser as of May 2026 — confirmed by Phase 7 decision log. The AnimationController correctly reads `getAttribute('data-animate-delay')` and sets `el.style.animationDelay` as a string.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll trigger for arc reveal | Custom IntersectionObserver in FeatureGrid.astro inline script | Existing AnimationController in BaseLayout.astro | Already global, already deduplication-safe, already gated on `.js-enabled` and `prefers-reduced-motion` |
| Stagger timing | CSS custom properties with JS countdown | `data-animate-delay` HTML attributes + existing controller | Established pattern with zero new code in BaseLayout |

**Key insight:** The AnimationController already handles everything — stagger, reduced-motion guard, JS gate, and unobserve after trigger. Adding `data-animate` to SVG path elements is a drop-in extension of the existing system.

---

## Common Pitfalls

### Pitfall 1: SVG path opacity initial state breaks the wheel SVG layout

**What goes wrong:** Adding `opacity: 0` to `[data-animate].wheel-arc` in the `@media (prefers-reduced-motion: no-preference)` block causes arcs to be invisible until JS fires. If JS is slow or blocked, arcs never appear.

**Why it happens:** The `.js-enabled` class gate in global.css means only `.js-enabled [data-animate].wheel-arc` gets `opacity: 0`. Without JS the class is never added, so arcs render at full opacity. This is actually correct behavior — same pattern as all other `data-animate` elements.

**How to avoid:** Ensure the CSS selector includes `.js-enabled` prefix (already the convention in global.css at line 287). Never set opacity: 0 without the `.js-enabled` gate.

**Warning signs:** Arcs invisible with JS disabled / noscript environment.

### Pitfall 2: `data-animate` on SVG `<path>` interferes with wheel rotation JS

**What goes wrong:** The `setWheelRotation()` function applies an SVG `transform` attribute to `#wheel-arcs-group` — it does NOT touch individual `<path>` elements. The AnimationController adds a CSS `animation` inline style. These are different properties and don't conflict.

**Why it happens:** Concern that CSS `animation` on arcs (scale transform) and SVG `transform` attribute on their parent `<g>` would compound unexpectedly.

**How to avoid:** The CSS `transform` on the arc only applies during the reveal animation (0-350ms after scroll trigger). After animation completes, `forwards` fill-mode holds the `to` state (scale 1, opacity 1) — effectively a no-op transform. The SVG group rotation operates on the parent `<g>`, which is independent of CSS transforms on child paths. No conflict.

**Warning signs:** Arcs appearing mispositioned during wheel rotation immediately after page load. Resolve by verifying `transform-box: fill-box` and that `transform-origin: center` anchors correctly within the arc's own bounding box.

### Pitfall 3: Removing the wrong CSS block boundaries

**What goes wrong:** global.css has consecutive rule blocks; accidentally deleting one line too many removes the `.nav-link` block that immediately follows `.feature-card` (line 244 onward).

**How to avoid:** Delete exactly lines 218-242 (the comment + rule block). The comment `/* Phase 8 — Feature card base + hover lift (D-05, UIPX-03) */` is the start marker. The block ends at the closing `}` of the `@media (prefers-reduced-motion: no-preference)` block.

**Warning signs:** Missing `.nav-link` hover styles after deletion — catch with `npm run build` and visual check.

### Pitfall 4: REQUIREMENTS.md checkbox format inconsistency

**What goes wrong:** Changing `[x]` to a different notation breaks any tooling that parses checkbox state.

**How to avoid:** Keep existing `[x]` checkbox format. Add a note in the REQUIREMENTS.md Traceability table column that UIPX-05 status is "Superseded" to provide context without changing the checked state.

---

## Code Examples

### Dead CSS block to remove (global.css lines 218-242)

```css
/* Phase 8 — Feature card base + hover lift (D-05, UIPX-03) */
.feature-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-divider);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  box-shadow: var(--shadow-card);
}
.feature-card:hover,
.feature-card:focus-visible {
  background-color: var(--color-surface-el);
}
@media (prefers-reduced-motion: no-preference) {
  .feature-card {
    transition: box-shadow 200ms ease-out;
  }
  .feature-card:hover,
  .feature-card:focus-visible {
    box-shadow: var(--shadow-card-hover);
  }
}
```

[VERIFIED: Read global.css lines 218-242 directly]

### REQUIREMENTS.md change for UIPX-05

```markdown
<!-- Before -->
- [x] **UIPX-05**: Bento grid layout for feature overview or equivalent high-impact section

<!-- After -->
- [x] **UIPX-05**: Bento grid layout for feature overview or equivalent high-impact section _(superseded by Phase 8.1 click wheel)_
```

Traceability table update:

```markdown
| UIPX-05 | Phase 10 | Superseded (click wheel) |
```

### ANIM-03 checkbox update in REQUIREMENTS.md

```markdown
<!-- Before -->
- [x] **ANIM-03**: Stagger delays on card grids and feature lists via `data-animate-delay`

<!-- After — no change to checkbox, it was already [x] -->
- [x] **ANIM-03**: Stagger delays on card grids and feature lists via `data-animate-delay`
```

The traceability table row needs status updated:

```markdown
| ANIM-03 | Phase 10 | Complete |
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Bento grid `.feature-card` layout | Click wheel (FeatureGrid.astro, Phase 8.1) | Phase 8.1 | `.feature-card` CSS is dead; stagger was on cards, now must target arcs |
| Single `data-animate` on `.wheel-container` | `data-animate` per arc `<path>` | Phase 10 (this phase) | Satisfies ANIM-03 with cascade reveal instead of whole-wheel fade |

**Deprecated/outdated:**
- `.feature-card` CSS class: No HTML element applies this class post-Phase 8.1. Safe to delete.
- `data-animate-delay="0ms"` on wheel-container: Meaningless when only one element is observed — will be replaced by per-arc delays.

---

## Runtime State Inventory

> This is a code-only cleanup phase. No rename or migration involved.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None | — |
| Live service config | None | — |
| OS-registered state | None | — |
| Secrets/env vars | None | — |
| Build artifacts | None — static Astro build, no installed package artifacts affected | — |

**Nothing found in any category** — verified by phase scope analysis. All changes are source file edits only.

---

## Environment Availability

> Step 2.6: SKIPPED (no external dependencies — this phase is CSS/HTML/markdown edits only, no new tools or services needed)

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | CSS `transform: scale()` with `transform-box: fill-box` works on SVG `<path>` elements without conflicting with the parent `<g>` SVG transform attribute used by the wheel rotation JS | Architecture Patterns > Pattern 1 | Arc elements may appear in wrong position during reveal if SVG transform compounding differs from expectation. Mitigation: validate visually in browser during implementation. |

---

## Open Questions

1. **Stagger delay on arc labels**
   - What we know: Arc `<path>` elements and `.wheel-segment-billboard` `<g>` elements are siblings in the SVG DOM. If we only animate arcs, labels appear at full opacity immediately.
   - What's unclear: Whether having labels visible before their arc reveals looks odd, or whether it's fine since labels are text inside the rim area.
   - Recommendation: Animate arcs only — labels are inside the SVG rim area (midRadius=160), not prominent before arc fill appears. Accept the label-first behavior, or add matching `data-animate` + matching delays to the billboard `<g>` elements if visual testing shows it looks wrong.

2. **Wider orphan CSS audit scope**
   - What we know: D-02 scopes the audit to a "light" pass — grep each non-trivial class against `src/`.
   - What's unclear: Whether any Phase 7 card-stagger helper classes (if any were added) are now unused.
   - Recommendation: During execution, grep for any class defined in global.css that isn't referenced by a Tailwind `class=` or by any `.astro` file. Expected result: only `.feature-card` comes up as dead. If others appear, flag for human review rather than auto-deleting.

---

## Sources

### Primary (HIGH confidence)
- `src/styles/global.css` (read directly) — full CSS content, `.feature-card` block location confirmed at lines 218-242
- `src/components/FeatureGrid.astro` (read directly) — current `data-animate`/`data-animate-delay` placement on wheel-container confirmed
- `src/layouts/BaseLayout.astro` lines 80-96 (read directly) — AnimationController implementation: `getAttribute('data-animate-delay')` → `el.style.animationDelay` → `observer.observe(el)` pattern
- `.planning/phases/10-v2-cleanup/10-CONTEXT.md` (read directly) — locked decisions D-01 through D-08
- `.planning/v2.0-MILESTONE-AUDIT.md` (read directly) — requirement gap evidence for ANIM-03 and UIPX-05
- `.planning/REQUIREMENTS.md` (read directly) — current traceability table and checkbox states
- Grep: `grep -r "feature-card" src/` — confirmed zero references outside global.css [VERIFIED]
- Grep: `grep -r "bento-hero-card" src/` — confirmed zero references anywhere [VERIFIED]
- Grep: `grep -r "data-animate" src/` — confirmed all usage sites [VERIFIED]

### Secondary (MEDIUM confidence)
- Phase 7 decision log (STATE.md) — `data-animate-delay` read via JS `getAttribute` + `el.style.animationDelay` pattern documented as cross-browser approach

---

## Metadata

**Confidence breakdown:**
- Dead CSS scope: HIGH — grep-verified, exact line numbers confirmed
- AnimationController reuse: HIGH — read directly from BaseLayout.astro source
- Wheel arc stagger approach: HIGH — direct extension of existing pattern with one LOW assumption about SVG transform interaction
- REQUIREMENTS.md changes: HIGH — checkbox format and content confirmed from file read

**Research date:** 2026-05-14
**Valid until:** 2026-06-14 (stable — CSS patterns don't change, all sources are internal codebase files)
