# Phase 7: Animation Polish - Research

**Researched:** 2026-05-12
**Domain:** CSS animation choreography, IntersectionObserver scroll patterns, sticky scroll showcase
**Confidence:** HIGH

---

## Summary

Phase 7 layers three distinct animation concerns onto the existing system built in Phase 5: stagger delays on FeatureGrid cards (ANIM-03), a sequenced hero entrance (ANIM-04), and a sticky scroll showcase on the recovery-scoring page (ANIM-05). All three concerns have clear implementation paths using the existing `data-animate` / `.is-visible` / `AnimationController` system established in Phase 5 — no new libraries are needed.

The most important finding for planning is the `attr()` type hint browser support gap. The UI-SPEC proposed `animation-delay: attr(data-animate-delay ms, 0ms)` in CSS, but this typed `attr()` is supported only in Chrome 133+ as of May 2026 — Firefox and Safari do not support it. The JS fallback (reading `data-animate-delay` in the AnimationController and setting `element.style.animationDelay`) is the required implementation path for cross-browser compatibility.

The sticky scroll showcase is the highest-complexity task: it requires restructuring `recovery-scoring.astro` markup significantly, adding a second `<script is:inline>` block for its dedicated IntersectionObserver (separate from the global AnimationController), and handling the single-screenshot constraint gracefully. With only one recovery screenshot available (`recovery.png`), the swap mechanism must still run correctly — it will swap to the same image, which causes no flicker but means the visual differentiation between steps comes entirely from the text content column, not screenshot changes.

**Primary recommendation:** Implement in three sequential waves — (1) stagger + AnimationController extension, (2) hero entrance choreography, (3) sticky scroll showcase. This order matches increasing complexity and allows each wave to be verified independently.

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Stagger Timing**
- D-01: Quick cascade stagger on FeatureGrid cards — each card enters 80-120ms after the previous, total stagger ~400-500ms for all 5 cards. Move `data-animate` from parent `<section>` to individual `<li>` elements with `data-animate-delay` attributes.
- D-02: Stagger applies to FeatureGrid only. Other repeated elements keep the current fade-up-together behavior.

**Hero Entrance Choreography**
- D-03: Sequenced entrance: headline fades in first, subtitle follows, device mockup enters last with a slight scale-up. Text-first builds anticipation, device is the payoff.
- D-04: Hero animates immediately on page load — no IntersectionObserver trigger. Use CSS animation with no scroll dependency (e.g., `animation` property on load, not gated by `.is-visible`).

**Sticky Scroll Showcase**
- D-05: Recovery Scoring page gets the sticky scroll showcase.
- D-06: Layout: sticky device frame pinned on one side, text content scrolls through 3 steps on the other side. Each step swaps the screenshot inside the DeviceFrame.
- D-07: 3 scroll steps — Claude groups the 4 existing subsections into 3 clean steps.

**Animation Feel**
- D-08: Precise and swift motion personality — fast animations (300-500ms), subtle movements, ease-out curves.
- D-09: Existing fade-up animation (400ms ease-out, 20px translate) stays as-is. Hero and stagger get new animations, scroll sections keep the current fade-up.

### Claude's Discretion
- Exact stagger delay interval within the 80-120ms range
- Hero animation durations and easing curves (within the "precise and swift" direction)
- How to group recovery-scoring subsections into 3 sticky scroll steps
- Whether sticky scroll uses IntersectionObserver, scroll event, or CSS `position: sticky` + scroll-driven animations
- Screenshot swap mechanism in sticky scroll (crossfade, instant swap, slide)
- Responsive behavior of sticky scroll on mobile (may collapse to standard layout)

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| ANIM-03 | Stagger delays on card grids and feature lists via `data-animate-delay` | Existing AnimationController extended with JS delay-reading logic; CSS attr() fallback pattern verified |
| ANIM-04 | Hero entrance choreography (sequenced device + text reveal) | CSS `animation` property with explicit delays; new `hero-device-enter` keyframe with compound transform; `prefers-reduced-motion` gating |
| ANIM-05 | Sticky scroll showcase on at least one feature deep-dive page (Oura-style) | IntersectionObserver on scroll steps; `position: sticky` device column; opacity crossfade; two-column CSS Grid collapsing to single column on mobile |

</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Stagger animation timing | Browser / Client | — | Pure CSS + JS reading HTML attributes; no server involvement |
| Hero entrance choreography | Browser / Client | — | CSS animations with `animation-delay`; fires on page load client-side |
| Sticky scroll showcase layout | Browser / Client | Frontend Server (SSR) | CSS `position: sticky` owns layout; Astro handles markup structure at build time |
| Screenshot swap mechanism | Browser / Client | — | IntersectionObserver toggles `.is-active` class; opacity crossfade is composited on GPU |
| Reduced-motion gating | Browser / Client | — | `@media (prefers-reduced-motion)` is a client-side CSS media query |
| Markup restructuring (recovery page) | Frontend Server (SSR) | — | Astro component restructuring at build time; JS only handles dynamic class toggling |

---

## Standard Stack

### Core (already installed — no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS `animation` + `@keyframes` | Native | Hero entrance choreography | Compositor-only path; zero CLS; no library needed |
| IntersectionObserver API | Native (Baseline 2019) | Scroll step activation for sticky showcase | Async, no scroll jank, existing project pattern |
| `position: sticky` | Native CSS | Device frame pinned during scroll | Native CSS; no JS needed for positioning; existing pattern in UI-SPEC |
| CSS Grid | Native CSS | Two-column layout for sticky scroll | Mobile-first collapse via `grid-template-columns` swap at breakpoint |

### No New npm Packages Required

The UI-SPEC's Registry Safety section confirms: no new npm packages are expected. All three requirements are achievable with native browser APIs and the existing Tailwind CSS utility classes. The `motion` library flagged in STATE.md as a conditional reserve is **not needed** — the hero scale animation can be expressed cleanly in CSS keyframes.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS `animation` for hero | `motion` library | motion adds ~30KB; CSS keyframes are sufficient for a 3-element sequence with fixed delays |
| IntersectionObserver for step activation | `scroll` event listener | Scroll events are synchronous on main thread; IntersectionObserver is async and composited |
| CSS `position: sticky` | `scroll` event + `position: fixed` toggle | Fixed position removes element from flow causing CLS; sticky stays in flow |
| Opacity crossfade for screenshot swap | Slide transition | Slide requires knowing image dimensions at swap time; opacity avoids layout calculation entirely |

---

## Architecture Patterns

### System Architecture Diagram

```
Page load
    │
    ▼
BaseLayout.astro AnimationController (is:inline)
    │
    ├─── Adds .js-enabled to <html>
    │
    ├─── Reads data-animate-delay on each [data-animate] element
    │         └── Sets element.style.animationDelay before observing  [EXTENDED in Phase 7]
    │
    └─── Creates single IntersectionObserver (threshold: 0.15)
              └── On entry: adds .is-visible → CSS fires fade-up keyframe

Hero.astro (page load, no observer)
    │
    ├─── <h1>.hero-headline  → animation: fade-up 400ms ease-out 0ms forwards
    ├─── <p>.hero-subtitle   → animation: fade-up 400ms ease-out 150ms forwards
    └─── <div>.hero-device   → animation: hero-device-enter 500ms ease-out 350ms forwards
              └── hero-device-enter keyframe: opacity + translateY + perspective + scale(0.96→1)

FeatureGrid.astro (scroll-triggered via AnimationController)
    │
    └─── 5 x <li data-animate data-animate-delay="Nms">
              └── AnimationController reads delay → sets animationDelay → observes
                        └── On entry: .is-visible → fade-up fires at individual delay

recovery-scoring.astro sticky scroll (separate inline script)
    │
    ├─── CSS Grid: sticky device column | scrolling steps column
    │
    ├─── StickyScrollController (second is:inline script, scoped to .sticky-showcase)
    │         ├─── IntersectionObserver on .scroll-step elements (threshold: 0.5)
    │         ├─── On step entry: adds .is-active to that step
    │         ├─── Updates dot indicators (.dot-1 / .dot-2 / .dot-3)
    │         └─── Crossfades screenshot: opacity 0→1 on incoming img, 1→0 on outgoing
    │
    └─── Mobile (<md breakpoint): grid-template-columns: 1fr
              Device frame sits above steps; no sticky behavior
```

### Recommended Project Structure Changes

```
src/
├── styles/
│   └── global.css           # ADD: hero-* keyframes + classes, stagger delay CSS
├── components/
│   ├── Hero.astro            # ADD: hero-headline, hero-subtitle, hero-device classes
│   └── FeatureGrid.astro     # CHANGE: section data-animate → per-li data-animate + data-animate-delay
├── layouts/
│   └── BaseLayout.astro      # EXTEND: AnimationController reads data-animate-delay
└── pages/features/
    └── recovery-scoring.astro # RESTRUCTURE: add sticky-showcase markup + StickyScrollController
```

### Pattern 1: Stagger via JS-applied animationDelay

The `attr()` typed CSS approach (`animation-delay: attr(data-animate-delay ms, 0ms)`) is not cross-browser safe in 2026. Only Chrome 133+ supports typed `attr()`. Firefox and Safari do not support it. [VERIFIED: caniuse.com/mdn-css_types_attr_type-or-unit, max.hn/notes/bawgpc04kmhreggg]

The correct cross-browser implementation reads `data-animate-delay` in JavaScript inside the AnimationController and sets `element.style.animationDelay` before calling `observer.observe(el)`:

```javascript
// In BaseLayout.astro AnimationController (is:inline IIFE)
// Extend the existing querySelectorAll loop:
document.querySelectorAll('[data-animate]').forEach(function (el) {
  var delay = el.getAttribute('data-animate-delay');
  if (delay) {
    el.style.animationDelay = delay;
  }
  observer.observe(el);
});
```

HTML usage in FeatureGrid.astro `<li>` elements:
```html
<li data-animate data-animate-delay="0ms">   <!-- Card 1 -->
<li data-animate data-animate-delay="100ms"> <!-- Card 2 -->
<li data-animate data-animate-delay="200ms"> <!-- Card 3 -->
<li data-animate data-animate-delay="300ms"> <!-- Card 4 -->
<li data-animate data-animate-delay="400ms"> <!-- Card 5 — md:col-start-2 stays -->
```

No CSS change needed for the stagger delay itself. The existing `.js-enabled [data-animate].is-visible { animation: fade-up 400ms ease-out forwards; }` already applies `animation-delay` from the inline style via CSS cascade. [ASSUMED: CSS inline `animation-delay` on element overrides `forwards` fill — verify the cascade interaction during implementation]

### Pattern 2: Hero Load Animation (no IntersectionObserver)

Hero elements must NOT use `data-animate`. They animate on page load before the observer fires. CSS classes applied directly in Hero.astro markup, animation rules in global.css inside `@media (prefers-reduced-motion: no-preference)`:

```css
/* global.css — ADD below existing fade-up block */
@media (prefers-reduced-motion: no-preference) {
  /* Hero entrance — fires on page load, no observer dependency */
  .hero-headline {
    animation: fade-up 400ms ease-out 0ms both;
  }
  .hero-subtitle {
    animation: fade-up 400ms ease-out 150ms both;
  }
  .hero-device {
    animation: hero-device-enter 500ms ease-out 350ms both;
  }
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
```

Critical: Use `both` fill-mode (not `forwards`) so elements start at `from` state immediately on parse, before first paint. This prevents FOUC where the headline appears at full opacity then disappears before animating.

The existing inline `transform: perspective(1600px) rotateY(-2deg) rotateX(1deg)` on the wrapper div in Hero.astro must be removed from the inline style and absorbed into the `hero-device-enter` keyframe's `to` state. Otherwise the inline style and the keyframe's `from` state will conflict. [VERIFIED: UI-SPEC line 151 — "The inline transform on the wrapper div must be moved into the keyframe to state"]

### Pattern 3: Sticky Scroll — Two-Column Layout with Separate Observer

The sticky scroll showcase requires markup restructuring in `recovery-scoring.astro` to wrap the section content in a two-column CSS Grid:

```html
<!-- Sticky showcase wrapper — CSS Grid, desktop only -->
<section class="sticky-showcase">
  <!-- Left: sticky device column -->
  <div class="sticky-device-col">
    <div class="device-sticky-wrapper">
      <!-- DeviceFrame rendered with screenshot slot for crossfade -->
      <!-- 3 indicator dots -->
    </div>
  </div>
  <!-- Right: scrolling step content -->
  <div class="scroll-steps-col">
    <div class="scroll-step" data-step="1"> ... Step 1 content ... </div>
    <div class="scroll-step" data-step="2"> ... Step 2 content ... </div>
    <div class="scroll-step" data-step="3"> ... Step 3 content ... </div>
  </div>
</section>
```

CSS Grid approach (Tailwind or inline style):
```css
/* Desktop: two columns */
.sticky-showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3xl);
  align-items: start;
}
/* Mobile: single column — device above, steps below */
@media (max-width: 767px) {
  .sticky-showcase {
    grid-template-columns: 1fr;
  }
  .device-sticky-wrapper {
    position: static; /* no sticky on mobile */
  }
}
/* Desktop sticky */
@media (min-width: 768px) {
  .device-sticky-wrapper {
    position: sticky;
    top: var(--space-lg); /* 24px — clears header */
  }
}
```

The StickyScrollController is a second `<script is:inline>` block scoped to this page only (placed at the bottom of `recovery-scoring.astro`, not in BaseLayout). This follows the established pattern of page-scoped inline scripts vs. the global AnimationController.

```javascript
// recovery-scoring.astro — StickyScrollController
(function() {
  var steps = document.querySelectorAll('.scroll-step');
  var dots = document.querySelectorAll('.step-dot');
  if (!steps.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var stepNum = entry.target.getAttribute('data-step');
        // Update active step
        steps.forEach(function(s) { s.classList.remove('is-active'); });
        entry.target.classList.add('is-active');
        // Update dots
        dots.forEach(function(d, i) {
          d.classList.toggle('is-active', String(i + 1) === stepNum);
        });
        // Crossfade screenshot (if multiple images exist)
        // With single recovery.png, this is a no-op — no flicker
      }
    });
  }, { threshold: 0.5 });

  steps.forEach(function(el) { observer.observe(el); });
})();
```

### Pattern 4: Screenshot Crossfade (Single Image Constraint)

Only `recovery.png` exists for the recovery scoring page. With all 3 steps using the same image, the crossfade mechanism still runs but produces no visible change. This is correct behavior — the text content column carries the narrative differentiation between steps.

If multiple screenshots are added in a future phase, the crossfade mechanism can swap images by toggling `opacity` on stacked `<img>` elements with `position: absolute` inside a `position: relative` container. This is a zero-CLS operation because dimensions are fixed by the device frame's `aspect-ratio: 393/852`.

For the initial implementation with a single screenshot: render the DeviceFrame once with `recovery.png`. No image swapping needed. The step indicator dots still update to show progress.

### Anti-Patterns to Avoid

- **Using `attr()` type hints in CSS for `animation-delay`:** Not supported in Firefox/Safari. Use JS to read the attribute and set `element.style.animationDelay` instead.
- **Animating `margin`, `height`, `top`, or `left`:** These trigger layout recalculation and cause CLS. All animations in this phase must use only `transform` and `opacity`. [VERIFIED: web vitals documentation — transform/opacity are compositor-only properties]
- **Putting `data-animate` on hero elements:** Hero elements must animate on page load without IntersectionObserver gating. Adding `data-animate` would make them wait for scroll, which is incorrect for above-fold content.
- **Using a single IntersectionObserver for both global animation and sticky scroll steps:** They have different thresholds (0.15 for global reveal vs. 0.5 for step activation) and different behaviors (unobserve after first trigger vs. observe continuously). Two separate observers are required.
- **Applying `position: sticky` at the mobile breakpoint:** Sticky pinning on mobile causes the device frame to overlap content. The sticky behavior must be conditional on `@media (min-width: 768px)`.
- **Nesting `@keyframes` inside a selector:** CSS at-rules like `@keyframes` cannot be nested inside `.js-enabled {}` selectors. Keep keyframes at the top level of their `@media` block. [VERIFIED: existing 05-PATTERNS.md — "Critical constraint: @keyframes stays inside @media at the top level"]

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Stagger delays | Custom stagger library | `data-animate-delay` + AnimationController JS extension | 5-line extension; no added dependency |
| Scroll position detection | `scroll` event listener | IntersectionObserver | Async, non-blocking; existing project pattern |
| Sticky positioning | JS scroll + `position: fixed` toggle | `position: sticky` | Fixed removes from flow (CLS); sticky stays in flow |
| Crossfade transitions | CSS animation library | `opacity` + CSS `transition: opacity 300ms ease-out` | Compositor-only; zero CLS; no library |
| Animation sequencing | GSAP timeline | CSS `animation-delay` with explicit ms values | 0KB; GSAP is explicitly out of scope (REQUIREMENTS.md) |

**Key insight:** Every requirement in ANIM-03 through ANIM-05 is achievable with native browser APIs and the existing CSS token system. The primary complexity is in the sticky scroll markup restructuring, not in the animation technology.

---

## Common Pitfalls

### Pitfall 1: `attr()` Type Hint Cross-Browser Failure
**What goes wrong:** CSS `animation-delay: attr(data-animate-delay ms, 0ms)` silently no-ops in Firefox and Safari. Cards all animate simultaneously with zero delay.
**Why it happens:** Typed `attr()` (CSS Values Level 5) is only in Chrome 133+ as of May 2026. Firefox bug 435426 tracks implementation; Safari has no announced timeline. [VERIFIED: caniuse.com/mdn-css_types_attr_type-or-unit, Chrome Developers blog on advanced attr()]
**How to avoid:** Read `data-animate-delay` in JavaScript inside the AnimationController and set `element.style.animationDelay` before observing. Never rely on CSS `attr()` for non-string values.
**Warning signs:** Stagger appears to work in Chrome dev browser but not in Safari/Firefox testing.

### Pitfall 2: Hero FOUC (Flash of Unstyled Content)
**What goes wrong:** Hero elements render at full opacity on first paint, then disappear briefly as CSS `animation-fill-mode` kicks in with `opacity: 0` at the `from` state.
**Why it happens:** `animation-fill-mode: forwards` does not apply the `from` state before the animation starts — only the `to` state after it ends. If the browser paints before the animation clock starts, elements appear fully visible, then snap to `opacity: 0`.
**How to avoid:** Use `animation-fill-mode: both` (or the `both` shorthand keyword). `both` applies the `from` state before the animation begins AND the `to` state after it ends.
**Warning signs:** Brief flash of visible headline before it "animates in" — most visible on fast devices or cached pages.

### Pitfall 3: Hero Inline Transform Conflict
**What goes wrong:** The `.hero-device` keyframe and the wrapper `<div>`'s inline `transform: perspective(...)` fight each other. The CSS animation overrides the inline style, so the perspective tilt disappears during or after the animation.
**Why it happens:** CSS animations override inline styles for the animated property. If `transform` is animated, the inline `transform` is ignored during the animation duration.
**How to avoid:** Remove the inline `transform` from Hero.astro's device wrapper `<div>`. Move `perspective(1600px) rotateY(-2deg) rotateX(1deg)` into both the `from` and `to` states of the `hero-device-enter` keyframe. The `to` state carries the final perspective; the `from` state adds `translateY(20px) scale(0.96)` to the compound transform.
**Warning signs:** Device mockup appears flat (no tilt) after animation completes.

### Pitfall 4: Sticky Scroll on Mobile Overlapping Content
**What goes wrong:** `position: sticky` device frame overlaps step text on mobile because the column layout doesn't collapse.
**Why it happens:** CSS Grid with two equal columns on mobile means both columns are narrow and the sticky element pins at top while text scrolls underneath it.
**How to avoid:** Explicitly set `grid-template-columns: 1fr` below the `md` breakpoint (768px). Remove `position: sticky` on the device wrapper below `md`. Both handled via Tailwind responsive utilities or CSS `@media` guard.
**Warning signs:** Device frame overlaps text on iPhone-size viewport.

### Pitfall 5: Global AnimationController Observes Sticky Scroll Steps
**What goes wrong:** `.scroll-step` elements have `data-animate` applied, causing the global AnimationController to also observe them with threshold 0.15. This triggers `is-visible` before the sticky scroll observer fires, causing unexpected double-animation behavior.
**Why it happens:** The global AnimationController in BaseLayout runs on all `[data-animate]` elements on every page.
**How to avoid:** Do NOT add `data-animate` to `.scroll-step` elements. The sticky scroll steps are managed exclusively by the StickyScrollController. Use a different class/attribute pattern for step activation — the StickyScrollController adds/removes `is-active`, not `is-visible`.
**Warning signs:** Step content fades in immediately on scroll (global observer) instead of activating at 50% viewport (sticky observer).

### Pitfall 6: FeatureGrid Section Losing `data-animate` Before Controller Loads
**What goes wrong:** Moving `data-animate` from `<section>` to each `<li>` means the section wrapper is no longer hidden before JS loads. If the section is partially in view on initial load (e.g., on tall screens), all cards appear simultaneously without animation.
**Why it happens:** Without `data-animate` on the section, the `.js-enabled [data-animate]` hiding rule only applies to individual `<li>` elements, which may already be partially visible before the observer fires.
**How to avoid:** This is the intended behavior per D-02. The IntersectionObserver fires on DOMContentLoaded. Individual `<li>` elements below the fold start at `opacity: 0` and animate in as they scroll into view. Elements already in viewport on load fire immediately when the observer is created. The stagger delay creates the cascade. This is correct — do not add `data-animate` back to the `<section>`.
**Warning signs:** (None — this is expected behavior. Verify that visible cards animate correctly on load.)

---

## Code Examples

### Extending AnimationController for Stagger

```javascript
// BaseLayout.astro — extended AnimationController (is:inline IIFE)
// Source: Phase 5 PATTERNS.md + stagger extension for ANIM-03
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
    // ANIM-03 extension: read data-animate-delay and apply as inline style
    var delay = el.getAttribute('data-animate-delay');
    if (delay) {
      el.style.animationDelay = delay;
    }
    observer.observe(el);
  });
})();
```

### Hero CSS Classes in global.css

```css
/* Source: UI-SPEC Phase 7 Animation Contract + pitfall analysis */
@media (prefers-reduced-motion: no-preference) {
  /* Hero entrance — fires immediately on page load, no IntersectionObserver */
  .hero-headline {
    animation: fade-up 400ms ease-out 0ms both;
  }
  .hero-subtitle {
    animation: fade-up 400ms ease-out 150ms both;
  }
  .hero-device {
    animation: hero-device-enter 500ms ease-out 350ms both;
  }

  /* hero-device-enter: compound transform preserves perspective tilt + adds scale payoff */
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
/* Reduced-motion: hero elements render at full opacity, no delay, no transform */
/* (The @media no-preference wrapper means these classes are inert under reduce) */
```

### Sticky Scroll Step Indicator Dots

```css
/* Source: UI-SPEC Phase 7 — step indicator */
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
```

### Screenshot Crossfade (future-proof, single image now)

```css
/* Position images absolutely for crossfade — device screen area is relative */
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

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS `attr()` type hints for `animation-delay` | JS reads `data-*` attribute, sets `element.style.animationDelay` | attr() type hints still not cross-browser (2026) | Use JS approach; CSS attr() approach deferred until Baseline |
| GSAP ScrollTrigger for sticky scroll | Native `position: sticky` + IntersectionObserver | CSS sticky is Baseline 2017 | Zero-KB solution; GSAP explicitly out of scope for this project |
| `animation-fill-mode: forwards` | `animation-fill-mode: both` | Best practice for load-time animations | Prevents FOUC on hero elements |
| Scroll event listeners for activation | IntersectionObserver | Baseline 2019 | Non-blocking; compositor thread; better battery life |

**Deprecated/outdated:**
- `scroll` event listeners for detecting element visibility: replaced by IntersectionObserver — do not use
- `@astrojs/tailwind`: explicitly deprecated for Tailwind v4 (already established in project)
- CSS `attr()` with type hints for non-string values: use JS attribute reading as fallback until Baseline

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | CSS inline `animation-delay` set via JS correctly overrides the animation shorthand applied by the `.is-visible` class rule | Pattern 1: Stagger | Cards all animate at 0ms delay despite JS setting — verify CSS cascade during implementation |
| A2 | `animation-fill-mode: both` prevents FOUC for hero elements on initial page load in all major browsers | Pitfall 2: Hero FOUC | Hero headline visible at full opacity before animating in — switch to `forwards` + initial `opacity:0` in CSS if needed |
| A3 | IntersectionObserver with `threshold: 0.5` reliably activates scroll steps on the recovery page given typical step block heights | Pattern 3: Sticky Scroll | Steps activate too early or too late on short screen heights — may need `rootMargin` adjustment |
| A4 | Single `recovery.png` for all 3 sticky scroll steps is acceptable per D-07 discretion | Pattern 4: Screenshot Constraint | Visual differentiation between steps is insufficient — would require additional screenshots from Xcode Simulator |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | ✓ | v24.7.0 | — |
| Astro | Project framework | ✓ | 11.5.1 (CLI) | — |
| IntersectionObserver API | AnimationController, StickyScrollController | ✓ (Baseline 2019) | — | Graceful: without JS, all content visible at full opacity |
| CSS `position: sticky` | Sticky scroll layout | ✓ (Baseline 2017) | — | — |
| CSS Grid | Two-column layout | ✓ (Baseline 2017) | — | — |
| `recovery.png` screenshot | Sticky scroll device frame | ✓ | 462KB, 1x | — |

**Missing dependencies with no fallback:** None.

**Missing dependencies with fallback:** None — all required capabilities are available.

**Screenshot constraint:** Only one recovery screenshot (`recovery.png`) exists. Multiple screenshots would enable visual differentiation between the 3 scroll steps (D-06 intent). With a single screenshot, all steps show the same image — the narrative differentiation relies entirely on the text content. This is noted as A4 in the Assumptions Log.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no automated test framework detected in project) |
| Config file | none |
| Quick run command | `npm run dev` → open browser |
| Full suite command | Manual verification checklist across Chrome, Firefox, Safari, and mobile viewport |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ANIM-03 | FeatureGrid cards stagger 100ms apart on scroll into view | Manual visual | — | n/a — visual |
| ANIM-03 | Stagger works in Firefox and Safari (not just Chrome) | Manual cross-browser | — | n/a — visual |
| ANIM-04 | Hero sequence: headline (0ms) → subtitle (150ms) → device (350ms) | Manual visual | — | n/a — visual |
| ANIM-04 | Hero animates on load, not on scroll | Manual visual | — | n/a — visual |
| ANIM-04 | Hero elements visible at full opacity without JS | Manual with JS disabled | — | n/a — manual |
| ANIM-04 | Device perspective tilt persists after animation completes | Manual visual | — | n/a — visual |
| ANIM-05 | Sticky device frame stays pinned while step text scrolls | Manual visual | — | n/a — visual |
| ANIM-05 | Dot indicators update as each step activates | Manual visual | — | n/a — visual |
| ANIM-05 | Mobile (<768px): collapses to single-column, no sticky behavior | Manual — iPhone viewport | — | n/a — visual |
| ANIM-03/04/05 | DevTools Performance tab shows zero CLS from animation | Manual — DevTools | — | n/a — DevTools |
| ANIM-03/04/05 | `prefers-reduced-motion: reduce` — all animations absent | Manual — OS setting | — | n/a — manual |

### Sampling Rate

- Per task commit: `npm run build` (TypeScript errors caught at build time)
- Per wave merge: full manual visual review in Chrome + Firefox + Safari
- Phase gate: All manual checks pass before `/gsd-verify-work`

### Wave 0 Gaps

None — no automated test framework to scaffold. All verification is manual visual/DevTools.

---

## Security Domain

Security enforcement applies — no security concerns identified for this phase. Phase 7 adds only CSS and `is:inline` scripts. No user input, no network requests, no authentication, no data persistence. The `is:inline` pattern is the established project convention and does not bypass Astro's security model.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | — |
| V3 Session Management | No | — |
| V4 Access Control | No | — |
| V5 Input Validation | No | No user input in animation code |
| V6 Cryptography | No | — |

---

## Sources

### Primary (HIGH confidence)
- `src/layouts/BaseLayout.astro` — AnimationController implementation (verified by direct read)
- `src/styles/global.css` — existing keyframes, data-animate pattern (verified by direct read)
- `src/components/Hero.astro` — inline transform on device wrapper (verified by direct read)
- `src/components/FeatureGrid.astro` — current section-level data-animate (verified by direct read)
- `src/pages/features/recovery-scoring.astro` — 4 subsections, single recovery.png (verified by direct read)
- `src/components/DeviceFrame.astro` — aspect-ratio 393/852, overflow hidden screen area (verified by direct read)
- `.planning/phases/07-animation-polish/07-CONTEXT.md` — locked decisions D-01 through D-09
- `.planning/phases/07-animation-polish/07-UI-SPEC.md` — animation contract, step timing values
- `.planning/phases/05-animation-infrastructure/05-PATTERNS.md` — is:inline IIFE convention, ES5 style requirement
- [caniuse.com/mdn-css_types_attr_type-or-unit](https://caniuse.com/mdn-css_types_attr_type-or-unit) — typed attr() browser support
- [max.hn/notes/bawgpc04kmhreggg](https://max.hn/notes/bawgpc04kmhreggg) — "Safari not supporting the typed attr()"
- [developer.chrome.com/blog/advanced-attr](https://developer.chrome.com/blog/advanced-attr) — Chrome 133 typed attr() support confirmation

### Secondary (MEDIUM confidence)
- [corewebvitals.io — Layout Shift caused by CSS transitions](https://www.corewebvitals.io/pagespeed/layout-shift-caused-by-css-transitions) — transform/opacity compositor-only, no CLS
- [pyk.sh — IntersectionObserver over Scroll Listener (2025)](https://pyk.sh/blog/2025-10-01-intersection-observer-over-scroll-listener) — async, non-blocking rationale

### Tertiary (LOW confidence)
- None — all critical claims verified via primary sources or official documentation

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries; all native browser APIs at Baseline
- Architecture: HIGH — pattern follows established Phase 5 conventions, verified against actual code
- Pitfalls: HIGH — attr() cross-browser gap confirmed by official CanIUse/Chrome dev blog; hero FOUC is a known CSS animation property behavior; inline transform conflict verified against UI-SPEC
- Sticky scroll: MEDIUM — IntersectionObserver threshold value (0.5) is a reasonable default but may need tuning based on step block heights

**Research date:** 2026-05-12
**Valid until:** 2026-06-12 (stable; only risk is attr() gaining cross-browser support, which would simplify but not invalidate the JS approach)
