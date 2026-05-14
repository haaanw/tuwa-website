# Phase 7: Animation Polish - Pattern Map

**Mapped:** 2026-05-12
**Files analyzed:** 5 (3 modified, 1 restructured, 1 extended)
**Analogs found:** 5 / 5

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/layouts/BaseLayout.astro` | layout | event-driven | `src/layouts/BaseLayout.astro` lines 36-54 (self — extend) | self-extend |
| `src/styles/global.css` | config/styling | transform | `src/styles/global.css` lines 85-103 (self — extend) | self-extend |
| `src/components/Hero.astro` | component | transform | `src/layouts/FeaturePageLayout.astro` lines 21-47 | role-match (hero section with device) |
| `src/components/FeatureGrid.astro` | component | event-driven | `src/pages/features/recovery-scoring.astro` lines 18-65 (`data-animate` per-section pattern) | role-match |
| `src/pages/features/recovery-scoring.astro` | page | event-driven | `src/components/Header.astro` lines 92-110 (page-scoped `is:inline` IntersectionObserver) | exact — same scoped observer IIFE pattern |

---

## Pattern Assignments

### `src/layouts/BaseLayout.astro` (layout, event-driven)

**Change:** EXTEND the AnimationController `<script is:inline>` block (lines 36-54) to read `data-animate-delay` attribute and apply it as `element.style.animationDelay` before calling `observer.observe(el)`.

**Current code** (BaseLayout.astro lines 36-54 — the existing controller):
```astro
<script is:inline>
  (function () {
    document.documentElement.classList.add('js-enabled');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      observer.observe(el);
    });
  })();
</script>
```

**Target code** — ANIM-03 stagger extension (replace the `querySelectorAll` loop only; everything else stays identical):
```astro
<script is:inline>
  (function () {
    document.documentElement.classList.add('js-enabled');
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      // ANIM-03 stagger: read data-animate-delay, set as inline animationDelay
      // Required: CSS attr() with type hints not supported in Firefox/Safari as of May 2026
      var delay = el.getAttribute('data-animate-delay');
      if (delay) {
        el.style.animationDelay = delay;
      }
      observer.observe(el);
    });
  })();
</script>
```

**Why JS, not CSS `attr()`:** `animation-delay: attr(data-animate-delay ms, 0ms)` typed attr() is Chrome 133+ only. Firefox and Safari silently no-op it, causing all cards to animate simultaneously with zero delay. The inline `el.style.animationDelay` overrides the shorthand delay via CSS cascade.

**`is:inline` IIFE convention** (preserve exactly — from 05-PATTERNS.md):
- ES5 `var` and `function` keyword — no `const`/`let`/arrows
- IIFE wrapper to avoid global scope pollution
- No `defer`, no `type="module"` — `is:inline` emits verbatim into HTML

---

### `src/styles/global.css` (config/styling, transform)

**Change:** ADD hero entrance keyframe and classes after the existing `fade-up` block (after line 103). ADD sticky scroll dot indicator styles. No changes to the existing `fade-up` block.

**Existing block to preserve** (global.css lines 85-103 — DO NOT MODIFY):
```css
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
@media (prefers-reduced-motion: reduce) {
  /* Intentionally empty — [data-animate] elements render at full opacity with no transform */
}
```

**New hero entrance block to ADD** (insert after line 103, after the `reduce` media query):
```css
/* Hero entrance animations — ANIM-04 */
/* Fires immediately on page load. No IntersectionObserver. No .js-enabled gate. */
/* fill-mode: both applies 'from' state before first paint → prevents FOUC */
@media (prefers-reduced-motion: no-preference) {
  .hero-headline {
    animation: fade-up 400ms ease-out 0ms both;
  }
  .hero-subtitle {
    animation: fade-up 400ms ease-out 150ms both;
  }
  .hero-device {
    animation: hero-device-enter 500ms ease-out 350ms both;
  }

  /* hero-device-enter: compound transform preserves perspective tilt from Hero.astro inline style */
  /* The inline transform is REMOVED from Hero.astro and absorbed into both keyframe states */
  @keyframes hero-device-enter {
    from {
      opacity: 0;
      transform: perspective(1600px) rotateY(-2deg) rotateX(1deg) translateY(20px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: perspective(1600px) rotateY(-2deg) rotateX(1deg) translateY(0) scale(1);
    }
  }
}
/* Reduced-motion: classes inert — no animation declaration inside @media no-preference */
/* Hero elements render at full opacity, full position without any transform */
```

**New sticky scroll dot indicator styles to ADD** (insert after hero block):
```css
/* Sticky scroll step indicators — ANIM-05 */
.step-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-3);
  transition: background 200ms ease-out;
}
.step-dot.is-active {
  background: var(--color-accent);
}

/* Screenshot crossfade layers — future-proof for multi-image steps */
.device-screenshot-layer {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 300ms ease-out;
}
.device-screenshot-layer.is-active {
  opacity: 1;
}
```

**Critical constraint** (from 05-PATTERNS.md): `@keyframes` declarations stay at the top level inside their `@media` block. Never nest `@keyframes` inside a selector like `.js-enabled {}`. The existing pattern uses this correctly — preserve it.

**Design token reference** (global.css lines 10-60 — use these, never hardcode values):
- Spacing: `--space-xs` (4px) through `--space-3xl` (64px)
- Colors: `--color-text-3` (#AFABA5 inactive), `--color-accent` (#2B5240 CTA green)

---

### `src/components/Hero.astro` (component, transform)

**Change:** ADD CSS class names to headline, subtitle, and device wrapper div. REMOVE the inline `transform: perspective(...)` from the device wrapper div (it moves into the keyframe).

**Current code** (Hero.astro lines 1-58 — full file):
```astro
---
import dashboardScreenshot from '../assets/screenshots/dashboard.png';
import DeviceFrame from './DeviceFrame.astro';
---

<section
  class="px-6"
  style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);"
>
  <div class="mx-auto text-center" style="max-width: 768px;">

    <h1
      style="
        font-size: var(--text-display);
        font-weight: 600;
        line-height: var(--leading-display);
        letter-spacing: var(--tracking-display);
        color: var(--color-text-1);
      "
    >
      Train smarter. Recover with precision.
    </h1>

    <p
      class="mx-auto"
      style="
        margin-top: var(--space-lg);
        max-width: 560px;
        font-size: var(--text-body);
        line-height: var(--leading-body);
        color: var(--color-text-2);
      "
    >
      Tuwa combines HRV, sleep, training load, and six fatigue dimensions...
    </p>

    <div
      class="relative mx-auto"
      style="
        margin-top: var(--space-2xl);
        max-width: 320px;
        transform: perspective(1600px) rotateY(-2deg) rotateX(1deg);
      "
    >
      <DeviceFrame ... />
    </div>

  </div>
</section>
```

**Target code** — ANIM-04 changes (3 targeted edits):

1. ADD `class="hero-headline"` to `<h1>` (line 13):
```astro
<h1
  class="hero-headline"
  style="
    font-size: var(--text-display);
    font-weight: 600;
    line-height: var(--leading-display);
    letter-spacing: var(--tracking-display);
    color: var(--color-text-1);
  "
>
```

2. ADD `class="hero-subtitle mx-auto"` to `<p>` (replacing `class="mx-auto"` at line 26):
```astro
<p
  class="hero-subtitle mx-auto"
  style="
    margin-top: var(--space-lg);
    max-width: 560px;
    font-size: var(--text-body);
    line-height: var(--leading-body);
    color: var(--color-text-2);
  "
>
```

3. ADD `hero-device` class AND REMOVE the inline `transform` from the device wrapper div (lines 40-47):
```astro
<div
  class="hero-device relative mx-auto"
  style="
    margin-top: var(--space-2xl);
    max-width: 320px;
  "
>
```

**Why remove the inline transform:** CSS animations override inline styles for the animated property. If `transform` is on the element as an inline style AND in the keyframe, the keyframe's `from` state wins during animation (overriding the inline style), then the inline style snaps back after `animation-fill-mode: both` kicks in. The perspective tilt would disappear after the animation completes. Moving it into both `from` and `to` of `hero-device-enter` is the correct resolution — both states carry `perspective(1600px) rotateY(-2deg) rotateX(1deg)`.

**No `data-animate` on hero elements** — hero elements must NOT use the IntersectionObserver pattern. Adding `data-animate` would make them wait for scroll, which is incorrect for above-fold content. The `.hero-headline`, `.hero-subtitle`, `.hero-device` classes fire immediately via CSS `animation` property on page load.

**No-JS fallback:** Since hero classes are inside `@media (prefers-reduced-motion: no-preference)` only and there is no `.js-enabled` gate, elements render at full opacity without JS. Correct — no fallback needed.

**Analog reference** (FeaturePageLayout.astro lines 21-47 — how hero sections currently look without animation):
```astro
<section data-animate style="padding-top: var(--space-3xl); padding-bottom: var(--space-2xl);">
  <div class="mx-auto text-center" style="max-width: 768px; padding: 0 var(--space-md);">
    <h1
      style="
        font-size: var(--text-display);
        font-weight: 600;
        ...
      "
    >
      {outcomeStatement}
    </h1>
    <p
      class="mx-auto"
      style="
        margin-top: var(--space-lg);
        ...
      "
    >
      {hookLine}
    </p>
  </div>
</section>
```

---

### `src/components/FeatureGrid.astro` (component, event-driven)

**Change:** Move `data-animate` from the `<section>` element (line 22) to each individual `<li>` element. Add `data-animate-delay` with stagger interval on each `<li>`. The `<section>` wrapper loses `data-animate` entirely.

**Current code** (FeatureGrid.astro lines 22-24 and 43-130 — the section wrapper and list items):
```astro
<section
  data-animate
  style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);"
>
  ...
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" role="list">
    <li><!-- Card 1 --></li>
    <li><!-- Card 2 --></li>
    <li><!-- Card 3 --></li>
    <li><!-- Card 4 --></li>
    <li class="md:col-start-2"><!-- Card 5 --></li>
  </ul>
```

**Target code** — ANIM-03 stagger changes:
```astro
<section
  style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);"
>
  ...
  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" role="list">
    <li data-animate data-animate-delay="0ms"><!-- Card 1 --></li>
    <li data-animate data-animate-delay="100ms"><!-- Card 2 --></li>
    <li data-animate data-animate-delay="200ms"><!-- Card 3 --></li>
    <li data-animate data-animate-delay="300ms"><!-- Card 4 --></li>
    <li class="md:col-start-2" data-animate data-animate-delay="400ms"><!-- Card 5 --></li>
  </ul>
```

**Stagger interval:** 100ms per card (within the D-01 range of 80-120ms). Total cascade: 0ms → 400ms across 5 cards — fits the D-01 target of 400-500ms total.

**Why remove `data-animate` from `<section>`:** D-01 specifies per-card stagger. The AnimationController would add `.is-visible` to the entire section at once, firing all cards simultaneously. Moving `data-animate` to `<li>` elements lets each card be observed independently.

**Card 5 `md:col-start-2` class is preserved** — the Tailwind class that centers it in the 3-column grid stays on the `<li>`. The new `data-animate` and `data-animate-delay` attributes are added alongside it.

**Analog reference** (recovery-scoring.astro lines 18-65 — existing per-section `data-animate` pattern to understand what's being changed away from):
```astro
<section data-animate style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
  <div class="mx-auto max-w-3xl px-6">
    ...
  </div>
</section>
<section data-animate style="...">
  ...
</section>
```

---

### `src/pages/features/recovery-scoring.astro` (page, event-driven)

**Change:** RESTRUCTURE the body content (inside `<FeaturePageLayout>` slot) from two plain `<section data-animate>` blocks into a single sticky scroll showcase section with a two-column CSS Grid layout, three scroll steps, step indicator dots, and a second `<script is:inline>` StickyScrollController at the bottom of the page.

**Current structure** (recovery-scoring.astro lines 16-105):
```astro
<FeaturePageLayout ...>

  <!-- Section 1: How it works — 4 h3 sub-sections inside one section -->
  <section data-animate style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <div class="mx-auto max-w-3xl px-6">
      <h2>How it works</h2>
      <p>...</p>  <!-- composite scoring description -->
      <h3>Three zones, clear guidance</h3>
      <p>...</p>
      <h3>Data from any device you already own</h3>
      <p>...</p>
      <h3>A baseline that's yours, not the population's</h3>
      <p>...</p>
    </div>
  </section>

  <!-- Section 2: The science behind it -->
  <section data-animate style="background-color: var(--color-surface); ...">
    <div class="mx-auto max-w-3xl px-6" style="padding-top: var(--space-3xl); ...">
      <h2>The science behind it</h2>
      <p>...</p>
      <p>...</p>
      <p>...</p>
      <RecoveryChart />
    </div>
  </section>

</FeaturePageLayout>
```

**Target structure** — ANIM-05 sticky scroll showcase:

The 4 existing h3 sub-sections within Section 1 are grouped into 3 sticky scroll steps per D-07:
- **Step 1:** "How it works" overview paragraph + "Three zones, clear guidance" h3
- **Step 2:** "Data from any device you already own" h3
- **Step 3:** "A baseline that's yours, not the population's" h3

Section 2 ("The science behind it") is placed after the sticky showcase section, unchanged except removing `data-animate` (it would conflict with the StickyScrollController — see Pitfall 5 in RESEARCH.md).

```astro
<FeaturePageLayout ...>

  <!-- Sticky scroll showcase — ANIM-05 -->
  <section class="sticky-showcase">

    <!-- Left column: sticky device frame -->
    <div class="sticky-device-col">
      <div class="device-sticky-wrapper">
        <DeviceFrame
          src={recoveryScreenshot}
          alt="Tuwa recovery scoring screen"
          loading="lazy"
          widths={[320, 640]}
        />
        <!-- Step indicator dots -->
        <div style="display: flex; justify-content: center; gap: var(--space-sm); margin-top: var(--space-lg);">
          <div class="step-dot is-active"></div>
          <div class="step-dot"></div>
          <div class="step-dot"></div>
        </div>
      </div>
    </div>

    <!-- Right column: scrolling step content -->
    <div class="scroll-steps-col">

      <div class="scroll-step is-active" data-step="1"
           style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
        <h2>How it works</h2>
        <p>...composite scoring description...</p>
        <h3>Three zones, clear guidance</h3>
        <p>...zones description...</p>
      </div>

      <div class="scroll-step" data-step="2"
           style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
        <h3>Data from any device you already own</h3>
        <p>...device compatibility description...</p>
      </div>

      <div class="scroll-step" data-step="3"
           style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
        <h3>A baseline that's yours, not the population's</h3>
        <p>...personal baseline description...</p>
      </div>

    </div>
  </section>

  <!-- Science section — after sticky showcase, unchanged content -->
  <section style="background-color: var(--color-surface); border-top: 1px solid var(--color-divider); border-bottom: 1px solid var(--color-divider);">
    <div class="mx-auto max-w-3xl px-6" style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
      <h2>The science behind it</h2>
      <p>...</p>
      <RecoveryChart />
    </div>
  </section>

</FeaturePageLayout>

<style>
  /* Sticky showcase layout */
  .sticky-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-3xl);
    align-items: start;
    padding: 0 var(--space-lg);
    max-width: 1152px;
    margin: 0 auto;
  }

  /* Desktop sticky */
  @media (min-width: 768px) {
    .device-sticky-wrapper {
      position: sticky;
      top: var(--space-lg); /* 24px — clears header */
    }
  }

  /* Mobile: single column — device above, steps below, no sticky */
  @media (max-width: 767px) {
    .sticky-showcase {
      grid-template-columns: 1fr;
    }
    .device-sticky-wrapper {
      position: static;
    }
  }

  /* Step text styles */
  .scroll-step {
    /* No data-animate — managed exclusively by StickyScrollController */
  }
  .scroll-step h2,
  .scroll-step h3 {
    font-size: var(--text-heading);
    font-weight: 600;
    line-height: var(--leading-heading);
    letter-spacing: var(--tracking-heading);
    color: var(--color-text-1);
    margin-bottom: var(--space-lg);
  }
  .scroll-step p {
    font-size: var(--text-body);
    line-height: var(--leading-body);
    color: var(--color-text-2);
    margin-top: var(--space-md);
  }
</style>

<script is:inline>
  /* StickyScrollController — scoped to recovery-scoring.astro only */
  /* Separate from the global AnimationController in BaseLayout.astro */
  /* Uses threshold: 0.5 (vs. global 0.15) for step activation at scroll midpoint */
  /* Does NOT call unobserve — must observe continuously as user scrolls up/down */
  (function () {
    var steps = document.querySelectorAll('.scroll-step');
    var dots = document.querySelectorAll('.step-dot');
    if (!steps.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var stepNum = entry.target.getAttribute('data-step');
          /* Update active step */
          steps.forEach(function (s) { s.classList.remove('is-active'); });
          entry.target.classList.add('is-active');
          /* Update indicator dots */
          dots.forEach(function (d, i) {
            d.classList.toggle('is-active', String(i + 1) === stepNum);
          });
          /* Screenshot crossfade — no-op with single recovery.png */
          /* If multiple images are added in a future phase, toggle .device-screenshot-layer.is-active here */
        }
      });
    }, { threshold: 0.5 });

    steps.forEach(function (el) { observer.observe(el); });
  })();
</script>
```

**Analog reference** (Header.astro lines 92-110 — the established page-scoped `is:inline` IIFE IntersectionObserver pattern):
```astro
<script is:inline>
  (function() {
    const header = document.querySelector("header");
    const sentinel = document.createElement("div");
    ...
    const observer = new IntersectionObserver(
      ([entry]) => {
        header.style.boxShadow = entry.isIntersecting ? "none" : "0 1px 0 var(--color-divider)";
      },
      { threshold: 1 }
    );
    observer.observe(sentinel);
  })();
</script>
```

Key differences from the Header.astro analog:
- Observes multiple elements (all `.scroll-step`), not one
- Uses `threshold: 0.5` (step activation at 50% viewport), not `threshold: 1`
- Does NOT call `observer.unobserve()` — must re-fire as user scrolls back up
- Uses ES5 `var` and `function` — matching the AnimationController convention from 05-PATTERNS.md (not the arrow functions in Header.astro, which predates the ES5 convention)

**Critical: Do NOT add `data-animate` to `.scroll-step` elements.** The global AnimationController (threshold 0.15) would fire `.is-visible` on scroll steps before the StickyScrollController fires `.is-active` (threshold 0.5), causing double-animation. The two observers must manage mutually exclusive sets of elements.

---

## Shared Patterns

### `is:inline` IIFE Convention
**Source:** `src/components/Header.astro` lines 92-110 + `src/layouts/BaseLayout.astro` lines 36-54
**Apply to:** StickyScrollController in `recovery-scoring.astro`
```astro
<script is:inline>
  (function () {
    // ... synchronous, non-bundled, executes at parse time
    // ES5 var + function (no const/let/arrows) per 05-PATTERNS.md convention
  })();
</script>
```
- Use ES5 `var` and `function` keyword — matches AnimationController convention
- Wrap in IIFE
- No `defer`, no `type="module"`

### Design Token Reference
**Source:** `src/styles/global.css` lines 10-60
**Apply to:** All new CSS in this phase
- Spacing: `--space-xs` (4px) through `--space-3xl` (64px)
- Colors: `--color-text-1` (headings), `--color-text-2` (body), `--color-text-3` (inactive dots), `--color-accent` (active dots, CTAs)
- Radii: `--radius-sm` (4px), `--radius-md` (6px), `--radius-lg` (8px)
- No hardcoded hex values in any new styles

### Animation Property Rules
**Source:** Research.md + 05-PATTERNS.md
**Apply to:** All new animations in this phase
- Animate only `transform` and `opacity` — compositor-only, zero CLS
- Never animate `margin`, `height`, `top`, `left`, `width`
- Use `ease-out` curves for the "precise & swift" motion personality (D-08)
- Duration range: 300-500ms (D-08)
- `@keyframes` at top level of `@media` block — never nested inside a selector

### `data-animate` / `.is-visible` Pattern
**Source:** `src/styles/global.css` lines 85-103 + `src/layouts/BaseLayout.astro` lines 36-54
**Apply to:** FeatureGrid `<li>` elements (stagger); NOT hero elements; NOT scroll-step elements
- Elements with `data-animate` start hidden under `.js-enabled` (CSS gate)
- AnimationController adds `.is-visible` on intersection → `fade-up` fires
- `data-animate-delay` attribute is read by JS, applied as `el.style.animationDelay`
- Hero elements: use direct CSS class animation, no `data-animate`
- Scroll steps: use StickyScrollController `.is-active` toggle, no `data-animate`

---

## No Analog Found

None — all five files have direct analogs or are self-extensions of existing code.

---

## Implementation Order

Per RESEARCH.md recommendation (increasing complexity, independently verifiable waves):

1. **Wave 1 — Stagger** (lowest risk, no markup restructuring)
   - Extend `BaseLayout.astro` AnimationController with `data-animate-delay` reading
   - Modify `FeatureGrid.astro`: remove `data-animate` from `<section>`, add to each `<li>` with delay attributes

2. **Wave 2 — Hero choreography** (medium risk, inline transform removal is load-bearing)
   - Add hero keyframe + classes to `global.css`
   - Modify `Hero.astro`: add class names, remove inline `transform` from device wrapper

3. **Wave 3 — Sticky scroll** (highest complexity, full markup restructure)
   - Add sticky showcase CSS to `global.css` OR `<style>` block in recovery-scoring.astro
   - Restructure `recovery-scoring.astro` into sticky showcase layout with 3 scroll steps
   - Add StickyScrollController `<script is:inline>` to bottom of recovery-scoring.astro

---

## Metadata

**Analog search scope:** `src/layouts/`, `src/components/`, `src/styles/`, `src/pages/features/`, `.planning/phases/05-animation-infrastructure/`
**Files scanned:** 9 source files read directly
**Pattern extraction date:** 2026-05-12
