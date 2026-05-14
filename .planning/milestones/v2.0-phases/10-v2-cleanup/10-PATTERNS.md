# Phase 10: v2.0 Cleanup - Pattern Map

**Mapped:** 2026-05-14
**Files analyzed:** 3 (2 modified source files + 1 modified doc)
**Analogs found:** 3 / 3

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/styles/global.css` | config/styles | transform | `src/styles/global.css` lines 285-303 (existing `fade-up` keyframe block) | exact |
| `src/components/FeatureGrid.astro` | component | event-driven | `src/components/FeatureGrid.astro` — existing `data-animate` usage on wheel-container | exact |
| `.planning/REQUIREMENTS.md` | docs | — | `.planning/REQUIREMENTS.md` — existing traceability table rows | exact |

## Pattern Assignments

### `src/styles/global.css` — dead CSS removal + new keyframe (D-01, ANIM-03)

**Analog:** `src/styles/global.css` lines 285-303 (the existing scroll-reveal animation block)

**Block to delete exactly** (lines 218-242, inclusive of the comment):
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

**Boundary note:** Line 243 is a blank line; line 244 begins `/* Phase 8 — Nav link hover (D-06) */`. Do not delete anything past the closing `}` on line 242.

**New keyframe block to append** — copy the structure of the existing animation block (global.css lines 285-303) and follow the same `.js-enabled` gate + `@media (prefers-reduced-motion: no-preference)` wrapper convention:

**Existing pattern to copy from** (global.css lines 285-303):
```css
/* Scroll-triggered reveal animations -- JS-gated (D-02) + strict reduced-motion (D-03) */
@media (prefers-reduced-motion: no-preference) {
  .js-enabled [data-animate] {
    opacity: 0;
    transform: translateY(16px);
  }
  .js-enabled [data-animate].is-visible {
    animation: fade-up 400ms ease-out forwards;
  }
  @keyframes fade-up {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

**New block to add** (append after line 303, before the `/* Hero headline fluid sizing */` comment):
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

**Key constraint:** The `.js-enabled` prefix is mandatory — it ensures arcs render at full opacity when JS is disabled, matching every other `[data-animate]` rule on the site. Never set `opacity: 0` without this gate.

---

### `src/components/FeatureGrid.astro` — stagger `data-animate` on arc paths (D-05, D-07, D-08, ANIM-03)

**Analog:** `src/components/FeatureGrid.astro` lines 22-28 (existing `data-animate` + `data-animate-delay` on wheel-container)

**Current pattern to remove** (lines 22-28):
```astro
<div
  class="wheel-container"
  id="feature-wheel"
  data-animate
  data-animate-delay="0ms"
  aria-label="Feature navigation wheel"
  role="group"
  tabindex="0"
>
```

**New pattern** — remove `data-animate`/`data-animate-delay` from the container div, add them to each individual `<path class="wheel-arc">` element:

**Container div** (lines 22-28 replacement):
```astro
<div
  class="wheel-container"
  id="feature-wheel"
  aria-label="Feature navigation wheel"
  role="group"
  tabindex="0"
>
```

**Arc paths** (lines 39-48 replacement) — `data-animate` and staggered `data-animate-delay` go on each `<path>`:
```astro
<path class="wheel-arc is-active" data-index="0"
  data-animate data-animate-delay="0ms"
  d="M 119.549 67.978 A 210 210 0 0 1 360.451 67.978 L 303.093 149.893 A 110 110 0 0 0 176.907 149.893 Z" />
<path class="wheel-arc" data-index="1"
  data-animate data-animate-delay="80ms"
  d="M 366.381 72.287 A 210 210 0 0 1 440.824 301.398 L 345.194 272.161 A 110 110 0 0 0 306.200 152.150 Z" />
<path class="wheel-arc" data-index="2"
  data-animate data-animate-delay="160ms"
  d="M 438.559 308.369 A 210 210 0 0 1 243.665 449.968 L 241.920 349.983 A 110 110 0 0 0 344.007 275.812 Z" />
<path class="wheel-arc" data-index="3"
  data-animate data-animate-delay="240ms"
  d="M 236.335 449.968 A 210 210 0 0 1 41.441 308.369 L 135.993 275.812 A 110 110 0 0 0 238.080 349.983 Z" />
<path class="wheel-arc" data-index="4"
  data-animate data-animate-delay="320ms"
  d="M 39.176 301.398 A 210 210 0 0 1 113.619 72.287 L 173.800 152.150 A 110 110 0 0 0 134.806 272.161 Z" />
```

**How the AnimationController picks this up** (BaseLayout.astro lines 84-91 — no changes needed here):
```js
document.querySelectorAll('[data-animate]').forEach(function (el) {
  var delay = el.getAttribute('data-animate-delay');
  if (delay) {
    el.style.animationDelay = delay;
  }
  observer.observe(el);
});
```

The controller automatically observes SVG `<path>` elements the same as HTML elements. No BaseLayout changes are required.

**Anti-patterns to avoid:**
- Do NOT apply `data-animate` to `#wheel-arcs-group` (`<g>`) — all 5 arcs would reveal simultaneously, defeating stagger
- Do NOT apply `data-animate` to `.wheel-segment-billboard` elements — arcs and labels would desynchronize visually
- The wheel rotation JS uses `arcsGroup.setAttribute('transform', ...)` on the parent `<g>` — independent of CSS `animation` on child `<path>` elements; no conflict

---

### `.planning/REQUIREMENTS.md` — traceability update (D-04, ANIM-03, UIPX-05)

**Analog:** `.planning/REQUIREMENTS.md` lines 32 and 74-86 (existing checkbox entries and traceability table rows)

**Existing checkbox format to preserve:**
```markdown
- [x] **UIPX-05**: Bento grid layout for feature overview or equivalent high-impact section
```

**Updated checkbox** (line 32) — add superseded note, keep `[x]` unchanged:
```markdown
- [x] **UIPX-05**: Bento grid layout for feature overview or equivalent high-impact section _(superseded by Phase 8.1 click wheel)_
```

**Traceability table rows to update** (lines 74 and 86):
```markdown
| ANIM-03 | Phase 10 | Complete |
```
```markdown
| UIPX-05 | Phase 10 | Superseded (click wheel) |
```

**Current state of those rows** (for reference before editing):
```markdown
| ANIM-03 | Phase 10 | Pending |
| UIPX-05 | Phase 10 | Pending |
```

**Also update the "Last updated" footer** (line 100):
```markdown
*Last updated: 2026-05-14 after Phase 10 v2.0 cleanup*
```

---

## Shared Patterns

### JS-gated animation CSS convention
**Source:** `src/styles/global.css` lines 285-303
**Apply to:** The new `wheel-arc-reveal` keyframe block in global.css

All scroll-triggered animation CSS on this site follows the same two-selector pattern:
1. `.js-enabled [data-animate].TARGET { opacity: 0; ... }` — initial hidden state (only when JS present)
2. `.js-enabled [data-animate].TARGET.is-visible { animation: NAME duration easing forwards; }` — triggered state

Both selectors are always wrapped in `@media (prefers-reduced-motion: no-preference)`. Never apply initial `opacity: 0` outside this gate.

### AnimationController stagger convention
**Source:** `src/layouts/BaseLayout.astro` lines 84-91
**Apply to:** All elements receiving `data-animate` + `data-animate-delay` attributes

The controller reads `data-animate-delay` as a raw string and assigns it to `el.style.animationDelay`. The attribute value must be a valid CSS time value (e.g., `"0ms"`, `"80ms"`) — not a bare integer. This is the established cross-browser workaround since CSS `attr()` with type hints is not supported in Firefox/Safari as of May 2026.

### SVG CSS transform convention (new — one assumption)
**Source:** RESEARCH.md Pattern 1 analysis
**Apply to:** The new `wheel-arc` CSS rules

SVG `<path>` elements require `transform-box: fill-box` and `transform-origin: center` to anchor CSS `transform: scale()` within the element's own bounding box. Without `transform-box: fill-box`, `transform-origin: center` defaults to the SVG viewport center, causing arcs to scale from the wrong anchor point.

---

## No Analog Found

All files in this phase have close analogs. No new infrastructure patterns are introduced.

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| — | — | — | — |

---

## Metadata

**Analog search scope:** `src/styles/`, `src/components/`, `src/layouts/`, `.planning/`
**Files scanned:** 4 (global.css, FeatureGrid.astro, BaseLayout.astro, REQUIREMENTS.md)
**Pattern extraction date:** 2026-05-14
