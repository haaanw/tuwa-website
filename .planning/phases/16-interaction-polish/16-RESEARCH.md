# Phase 16: Interaction Polish - Research

**Researched:** 2026-05-16
**Domain:** Smooth scroll (Lenis), magnetic hover effects, CSS transition standardization
**Confidence:** HIGH

## Summary

Phase 16 is a polish pass that adds three layers of interaction refinement: (1) Lenis momentum scroll for desktop browsers, (2) magnetic cursor pull on CTA buttons, and (3) a comprehensive audit to ensure every interactive element has consistent, smooth transitions using a standardized easing curve.

The existing codebase has a clean foundation -- Phase 8 already implemented hover transitions on `.btn-cta`, `.nav-link`, and `.blog-listing-item` with `prefers-reduced-motion` guards. The work here is to standardize the easing, extend coverage to uncovered elements (FAQ accordion headers, FeatureGrid arcs, footer links already use `.nav-link` class), add Lenis as a script in BaseLayout, and implement the magnetic CTA effect as a vanilla JS mousemove handler.

**Primary recommendation:** Implement Lenis with `autoRaf: true` and `anchors: true` in BaseLayout, disabled on touch via `matchMedia('(pointer: coarse)')`. Define `--ease-interactive: cubic-bezier(0.25, 0.1, 0.25, 1)` as a CSS custom property and migrate all existing transitions to use it. Magnetic CTA uses a vanilla RAF-based mousemove listener scoped to `.btn-cta` elements with `pointer: fine` only.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** Use Lenis for momentum scroll (contralabs.com-style inertia)
- **D-02:** Direct `lenis` package in BaseLayout.astro `<script>` (NOT `astro-lenis` wrapper)
- **D-03:** Disable Lenis on touch devices (pointer: coarse media query or touch detection)
- **D-04:** Medium intensity magnetic pull -- 10-16px shift, ~150px activation radius
- **D-05:** Apply magnetic to ALL `.btn-cta` elements site-wide
- **D-06:** No magnetic effect on touch devices
- **D-07:** Complete hover audit -- every clickable element gets smooth transition
- **D-08:** Elements already covered (Phase 8): `.btn-cta`, `.nav-link`, `.blog-listing-item`
- **D-09:** Elements to add: footer links, FAQ accordion headers, FeatureGrid items, feature page inline links
- **D-10:** Standardize easing curve only -- keep varied durations
- **D-11:** Standard easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- **D-12:** Define as CSS custom property `--ease-interactive`
- **D-13:** Migrate existing transitions from `ease` / `ease-out` to new standard curve

### Claude's Discretion
- Lenis configuration parameters (lerp value, scroll wrapper approach)
- Magnetic effect implementation approach (mousemove listener, GSAP, or vanilla RAF loop)
- Specific duration values for new hover transitions (keep in 100-250ms range)
- Whether to animate text-decoration or use pseudo-element underlines for link hovers
- Handling Lenis + anchor link navigation (scrollTo integration)

### Deferred Ideas (OUT OF SCOPE)
None
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| IXPN-03 | Lenis momentum scroll integrated (~3KB, Astro island) | Lenis 1.3.23 confirmed, vanilla JS integration pattern documented, touch disable strategy clear |
| IXPN-04 | Hover micro-interactions on interactive elements (buttons, links, cards) | Full audit of uncovered elements complete, standardized easing approach documented |
| IXPN-05 | Magnetic hover effects on primary CTA buttons | Vanilla RAF implementation pattern documented, activation radius and shift values locked |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Momentum scroll | Browser / Client (JS) | -- | Lenis intercepts native scroll events client-side |
| Magnetic CTA effect | Browser / Client (JS) | -- | mousemove listener + transform, purely client-side |
| Hover transition standardization | Browser / Client (CSS) | -- | CSS custom properties and transition declarations |
| Anchor smooth scroll | Browser / Client (JS) | -- | Lenis scrollTo handles anchor navigation |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| lenis | 1.3.23 | Momentum smooth scroll | Industry standard for premium scroll feel; used by contralabs.com reference; ~3KB gzipped [VERIFIED: npm registry] |

### Supporting
No additional libraries needed. Magnetic effect and hover transitions are vanilla JS/CSS.

**Installation:**
```bash
npm install lenis@1.3.23
```

**Version verification:** lenis@1.3.23 confirmed current on npm registry (2026-05-16). [VERIFIED: npm registry]

## Architecture Patterns

### System Architecture Diagram

```
User Input (scroll/mousemove)
       |
       v
+------------------+     +-------------------+
| BaseLayout.astro |---->| Lenis instance    |
| <script> tag     |     | (smoothWheel only)|
+------------------+     +---+---------------+
       |                     |
       v                     v
+------------------+     +-------------------+
| Magnetic CTA     |     | Native scroll     |
| (mousemove RAF)  |     | (touch devices)   |
+------------------+     +-------------------+
       |
       v
+------------------+
| CSS Transitions  |
| --ease-interactive|
| (all elements)   |
+------------------+
```

### Recommended Project Structure

No new files beyond what's added to existing:
```
src/
├── layouts/
│   └── BaseLayout.astro    # +Lenis script, +magnetic CTA script
├── styles/
│   └── global.css          # +--ease-interactive token, +new hover rules
└── (no new components)
```

### Pattern 1: Lenis Integration in Astro

**What:** Single Lenis instance in BaseLayout, disabled on touch devices, with anchor support
**When to use:** All pages (BaseLayout wraps everything)
**Example:**
```typescript
// Source: https://github.com/darkroomengineering/lenis/blob/main/README.md
<script>
  import Lenis from 'lenis';
  import 'lenis/dist/lenis.css';

  // Only enable on pointer: fine (desktop/laptop with mouse/trackpad)
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouch && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,         // Default — smooth without feeling sluggish
      duration: 1.2,     // Consistent with contralabs feel
      anchors: {
        offset: 0,       // Adjust if fixed header exists
      },
    });

    // Expose for potential programmatic scrollTo
    window.__lenis = lenis;
  }
</script>
```

**Key decisions:**
- `autoRaf: true` — no manual RAF loop needed (Lenis manages its own frame updates)
- `anchors: true/object` — handles anchor `<a href="#section">` automatically, no manual scrollTo wiring needed for standard anchor links
- `lerp: 0.1` — default value, smooth and responsive; lower values = more inertia, higher = snappier
- Touch detection via `(pointer: coarse)` media query — reliable, no user-agent sniffing

### Pattern 2: Magnetic CTA Effect

**What:** Cursor proximity triggers subtle translation on CTA buttons toward cursor position
**When to use:** All `.btn-cta` elements, only on `pointer: fine` devices
**Example:**
```typescript
// Vanilla RAF approach — no dependencies
<script>
  const RADIUS = 150;   // Activation radius in px (D-04)
  const STRENGTH = 14;  // Max shift in px (D-04: 10-16px range)

  function initMagnetic() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const buttons = document.querySelectorAll('.btn-cta');

    buttons.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const pull = (1 - dist / RADIUS) * STRENGTH;
          const angle = Math.atan2(dy, dx);
          btn.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px) scale(1.02)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  initMagnetic();
</script>
```

**Implementation notes:**
- The mousemove listener is on each button, not document-level (fewer events, simpler cleanup)
- `scale(1.02)` preserved from existing hover state to avoid flash when magnetic engages
- Reset on mouseleave returns to CSS-defined state
- For smoother return-to-center, use `transition: transform 300ms var(--ease-interactive)` on the element — the JS sets transform directly, CSS transition handles the animate-back

**Alternative considered:** A document-level mousemove with distance checks to all buttons. Rejected — more complex, more events fired, and buttons are sparse enough that per-button listeners are efficient.

### Pattern 3: Standardized Easing Token

**What:** CSS custom property for consistent interaction feel
**When to use:** Every transition on interactive elements
**Example:**
```css
:root {
  --ease-interactive: cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Migration example — before: */
.btn-cta {
  transition: background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease-out;
}

/* After: */
.btn-cta {
  transition: background-color 150ms var(--ease-interactive),
              box-shadow 150ms var(--ease-interactive),
              transform 150ms var(--ease-interactive);
}
```

### Anti-Patterns to Avoid
- **Lenis on touch devices:** Native iOS/Android momentum scroll is superior to any JS-based alternative. Lenis's `syncTouch` option exists but is explicitly unstable on iOS <16 and adds unnecessary processing.
- **Document-level mousemove for magnetic:** Fires on every pixel of mouse movement across the entire page. Use per-button listeners instead.
- **Animating non-composited properties in hover:** Stick to `transform`, `opacity`, `box-shadow`, `color`, `background-color`. Never animate `width`, `height`, `padding`, `margin` on hover.
- **Forgetting reduced-motion:** ALL new transitions must be inside `@media (prefers-reduced-motion: no-preference)` blocks, consistent with existing codebase pattern.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth momentum scroll | Custom scroll interceptor | Lenis 1.3.23 | Edge cases: keyboard navigation, nested scrollables, anchor links, focus management, accessibility |
| Easing functions | Custom bezier math | CSS `cubic-bezier()` | Browser-optimized, declarative, no JS needed |

**Key insight:** The magnetic CTA IS hand-rolled (vanilla JS) because it's simple geometry (distance + angle) and no library adds value for this specific effect. Lenis is NOT hand-rolled because scroll interception has dozens of edge cases.

## Common Pitfalls

### Pitfall 1: Lenis Breaks Keyboard Scroll Navigation
**What goes wrong:** Users pressing Page Down, Space, Home/End get janky behavior
**Why it happens:** Lenis intercepts wheel but keyboard scroll events need careful handling
**How to avoid:** Lenis 1.3.x handles keyboard by default with `smoothWheel: true`. Test Tab + Space navigation after integration.
**Warning signs:** Focus jumps but scroll doesn't follow

### Pitfall 2: Magnetic Effect Persists After Fast Mouse Exit
**What goes wrong:** Button stays offset if mouse leaves viewport quickly
**Why it happens:** `mouseleave` may not fire if mouse exits the window abruptly
**How to avoid:** Add a `document.addEventListener('mouseleave')` fallback that resets all `.btn-cta` transforms. Or use CSS transition on transform so it auto-returns.
**Warning signs:** Button visually stuck offset after mouse disappears

### Pitfall 3: View Transitions + Lenis Conflict
**What goes wrong:** After page navigation (view transition), Lenis scroll position or instance breaks
**Why it happens:** Native `@view-transition` does a full page swap; Lenis instance from old page is destroyed
**How to avoid:** Lenis script in BaseLayout re-initializes on every page load (Astro MPA behavior — each page load runs scripts fresh). No SPA lifecycle issue since there's no `<ClientRouter>`.
**Warning signs:** Scroll feels native (non-smooth) after navigating

### Pitfall 4: Safari Anchor Scroll Jank
**What goes wrong:** Clicking anchor links on Safari causes visible jump then smooth scroll
**Why it happens:** Safari's native `scroll-behavior: smooth` conflicts with JS-based scroll
**How to avoid:** Do NOT set `scroll-behavior: smooth` in CSS when using Lenis. Lenis handles anchor scrolling via its `anchors` option. Remove any `html { scroll-behavior: smooth }` if present.
**Warning signs:** Double-scroll animation on anchor clicks

### Pitfall 5: Magnetic Transform Overrides CSS Hover Transform
**What goes wrong:** `.btn-cta:hover { transform: scale(1.02) }` fights with JS-set `transform`
**Why it happens:** Inline `style.transform` from JS has higher specificity than CSS hover rule
**How to avoid:** Include `scale(1.02)` in the JS-applied transform string (already shown in pattern). On mouseleave, clear `style.transform` to let CSS take over again.
**Warning signs:** Button shrinks when magnetic engages, or doesn't scale on hover

## Code Examples

### Lenis with Anchor Offset for Fixed Header
```typescript
// Source: https://github.com/darkroomengineering/lenis/blob/main/README.md
const lenis = new Lenis({
  autoRaf: true,
  anchors: {
    offset: 80, // height of fixed header in px
  },
});
```

### Complete Hover Audit — New CSS Rules
```css
/* Source: Project pattern from global.css Phase 8 conventions */

/* FAQ accordion summary hover */
@media (prefers-reduced-motion: no-preference) {
  details > summary {
    transition: color 150ms var(--ease-interactive);
  }
  details > summary:hover {
    color: var(--color-accent);
  }
}

/* FeatureGrid wheel arc hover */
@media (prefers-reduced-motion: no-preference) {
  .wheel-arc {
    transition: opacity 200ms var(--ease-interactive);
  }
  .wheel-arc:hover {
    opacity: 0.8;
  }
}

/* Feature page inline links */
@media (prefers-reduced-motion: no-preference) {
  main a:not(.btn-cta):not(.nav-link) {
    transition: color 150ms var(--ease-interactive);
  }
  main a:not(.btn-cta):not(.nav-link):hover {
    color: var(--color-accent);
  }
}
```

### Lenis CSS Import
```css
/* Required: Lenis sets html/body overflow handling */
/* Import in global.css or via Astro script */
@import 'lenis/dist/lenis.css';
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `scroll-behavior: smooth` CSS | Lenis JS smooth scroll | 2023+ | CSS approach lacks momentum/inertia control |
| GSAP ScrollSmoother (paid) | Lenis (free, MIT) | 2022 | Same quality, no license cost |
| `ease` / `ease-out` keywords | Custom `cubic-bezier()` tokens | Always available | Precise control over feel, brand consistency |
| Per-element transition declarations | CSS custom property easing | CSS Variables support (2017+) | Single source of truth for interaction feel |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Header is not fixed/sticky (anchor offset = 0) | Lenis Pattern | If header is fixed, anchors will scroll under it — trivial fix (set offset to header height) |
| A2 | FeatureGrid wheel arcs respond to hover via opacity change | Code Examples | May need different visual treatment; audit will confirm |
| A3 | `lenis/dist/lenis.css` import is required for correct behavior | Code Examples | If omitted, Lenis may still work but html/body overflow won't be set correctly |

## Open Questions (RESOLVED)

1. **Fixed header height for anchor offset**
   - RESOLVED: Header is sticky at 64px. Lenis `anchors.offset` set to 64.

2. **Lenis lerp vs duration**
   - RESOLVED: Using `lerp: 0.1` for contralabs-style momentum feel. Tunable at runtime.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| lenis (npm) | IXPN-03 | Not yet installed | 1.3.23 on registry | `npm install lenis` |
| Node.js | Build | Available | 22.x+ | -- |

**Missing dependencies with no fallback:** None (lenis is installable via npm)

## Sources

### Primary (HIGH confidence)
- [Lenis GitHub README](https://github.com/darkroomengineering/lenis/blob/main/README.md) — Full API: constructor options, scrollTo, anchors, touch handling
- [npm registry: lenis@1.3.23](https://www.npmjs.com/package/lenis) — Version confirmed 2026-05-16
- Project codebase: `src/styles/global.css` lines 251-313 — existing Phase 8 hover patterns
- Project codebase: `src/layouts/BaseLayout.astro` — integration target
- `.planning/research/STACK.md` — Prior Lenis research, ClientRouter conflict note

### Secondary (MEDIUM confidence)
- [Lenis official site](https://www.lenis.dev/) — Configuration examples
- [Building Smooth Scroll in 2025 with Lenis](https://www.edoardolunardi.dev/blog/building-smooth-scroll-in-2025-with-lenis) — Integration patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — single dependency (lenis), version confirmed, API documented
- Architecture: HIGH — patterns are straightforward vanilla JS/CSS, existing codebase well-understood
- Pitfalls: HIGH — documented from official sources and known Astro interaction patterns

**Research date:** 2026-05-16
**Valid until:** 2026-06-16 (stable domain, unlikely to change)
