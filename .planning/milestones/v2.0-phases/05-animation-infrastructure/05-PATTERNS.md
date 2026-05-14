# Phase 5: Animation Infrastructure - Pattern Map

**Mapped:** 2026-05-11
**Files analyzed:** 4 (3 modified, 1 refactored)
**Analogs found:** 4 / 4

---

## File Classification

| Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---------------|------|-----------|----------------|---------------|
| `src/layouts/BaseLayout.astro` | layout | event-driven | `src/components/Header.astro` lines 92-110 | exact — same `is:inline` IIFE + IntersectionObserver pattern |
| `src/styles/global.css` | config/styling | transform | `src/styles/global.css` lines 85-109 (self — refactor) | self-refactor |
| `src/components/FeatureCTA.astro` | component | event-driven | `src/components/LandingCTA.astro` lines 87-106 | exact — identical script block to remove |
| `src/components/LandingCTA.astro` | component | event-driven | `src/components/FeatureCTA.astro` lines 61-80 | exact — identical script block to remove |

---

## Pattern Assignments

### `src/layouts/BaseLayout.astro` (layout, event-driven)

**Change:** ADD `<script is:inline>` AnimationController after `<Footer />` before `</body>`.

**Analog:** `src/components/Header.astro` lines 92-110

**`is:inline` IIFE pattern** (Header.astro lines 92-110):
```astro
<script is:inline>
  (function() {
    const header = document.querySelector("header");
    const sentinel = document.createElement("div");
    sentinel.style.height = "1px";
    sentinel.style.position = "absolute";
    sentinel.style.top = "0";
    document.body.prepend(sentinel);
    const observer = new IntersectionObserver(
      ([entry]) => {
        header.style.boxShadow = entry.isIntersecting
          ? "none"
          : "0 1px 0 var(--color-divider)";
      },
      { threshold: 1 }
    );
    observer.observe(sentinel);
  })();
</script>
```

**New AnimationController to insert** (after `<Footer />` at line 35, before `</body>` at line 36):
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

**Key differences from Header.astro analog:**
- First line adds `.js-enabled` to `<html>` before observing — enables CSS gating (D-02)
- Uses ES5 `function` syntax (not arrow functions) matching existing component scripts
- Calls `unobserve` after firing — identical to existing component pattern
- Placed at end of `<body>` so all `[data-animate]` elements exist in DOM when `querySelectorAll` runs

**Current BaseLayout.astro structure** (lines 30-37 — injection target):
```astro
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>   <!-- <-- AnimationController goes between <Footer /> and </body> -->
```

---

### `src/styles/global.css` (config/styling, transform)

**Change:** REFACTOR lines 85-109 — add `.js-enabled` scope to hiding rules, empty the reduced-motion block.

**Current code** (global.css lines 85-109 — the bug):
```css
/* Scroll-triggered reveal animations (Phase 2 — LAND-03) */
@media (prefers-reduced-motion: no-preference) {
  [data-animate] {
    opacity: 0;
    transform: translateY(16px);
  }
  [data-animate].is-visible {
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
  [data-animate] {
    opacity: 0;
    transition: opacity 200ms ease-out;
  }
  [data-animate].is-visible {
    opacity: 1;
  }
}
```

**Target code** (replace lines 85-109 in their entirety):
```css
/* Scroll-triggered reveal animations — JS-gated (D-02) + strict reduced-motion (D-03) */
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

**Two bugs fixed by this refactor:**
1. `[data-animate]` hiding is now scoped to `.js-enabled` — without JS, no class is added, selectors never match, content stays visible (D-02)
2. `prefers-reduced-motion: reduce` block is now empty — the old `opacity: 0` + `transition` was itself motion, violating WCAG 2.1 SC 2.3.3 (D-03)

**Critical constraint:** `@keyframes fade-up` stays inside `@media (prefers-reduced-motion: no-preference)` at the top level of the block — NOT nested inside `.js-enabled {}`. Keyframe declarations are global at-rules and cannot be nested inside selectors. This is the existing valid structure — preserve it.

---

### `src/components/FeatureCTA.astro` (component, event-driven)

**Change:** REMOVE lines 61-80 (the entire `<script is:inline>` block and its comment).

**Exact content to delete** (lines 61-80):
```astro
<!-- IntersectionObserver — triggers scroll fade-in for all [data-animate] elements on the page -->
<!-- Follows is:inline IIFE pattern established in Header.astro scroll shadow script -->
<script is:inline>
  (function () {
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

**After removal:** File ends at line 59 (`</section>`). The `data-animate` attribute on `<section>` at line 7 stays — it is still observed by the BaseLayout AnimationController.

---

### `src/components/LandingCTA.astro` (component, event-driven)

**Change:** REMOVE lines 87-106 (the entire `<script is:inline>` block and its comment).

**Exact content to delete** (lines 87-106):
```astro
<!-- IntersectionObserver — triggers scroll fade-in for all [data-animate] elements on the page -->
<!-- Follows is:inline IIFE pattern established in Header.astro scroll shadow script -->
<script is:inline>
  (function () {
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

**After removal:** File ends at line 85 (`</section>`). The `data-animate` attribute on `<section>` at line 19 stays — it is still observed by the BaseLayout AnimationController.

---

## Shared Patterns

### `is:inline` IIFE Convention
**Source:** `src/components/Header.astro` lines 92-110
**Apply to:** The new AnimationController in BaseLayout.astro
```astro
<script is:inline>
  (function() {
    // ... synchronous, non-bundled, executes at parse time
  })();
</script>
```
- Use ES5 `var` and `function` keyword (not `const`/`let`/arrows) — matches existing component scripts
- Wrap in IIFE to avoid polluting global scope
- No `defer`, no `type="module"` — `is:inline` emits verbatim into HTML, not processed by Vite

### CSS Custom Property Reference
**Source:** `src/styles/global.css` lines 10-60
**Apply to:** Any inline styles added during this phase (none expected, but reference if needed)
- All spacing via `--space-*` tokens
- All colors via `--color-*` tokens
- No hardcoded hex values in component styles

---

## No Analog Found

None — all four files have direct analogs or are self-refactors.

---

## Implementation Order

The three changes have a dependency order that matters for testing:

1. **global.css refactor first** — establishes the correct CSS contract before any JS runs
2. **BaseLayout.astro script injection second** — adds the AnimationController that the CSS now expects
3. **FeatureCTA.astro and LandingCTA.astro script removal third** — removes duplicates after replacement is confirmed working

This order ensures at no point is a page left with zero observers (if testing between steps, the component scripts still work during step 1).

---

## Metadata

**Analog search scope:** `src/layouts/`, `src/components/`, `src/styles/`
**Files scanned:** 4 source files read directly
**Pattern extraction date:** 2026-05-11
