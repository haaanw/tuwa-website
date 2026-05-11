# Architecture Research

**Domain:** Astro 6 marketing site — animation system, device mockups, UI polish integration
**Researched:** 2026-05-11
**Confidence:** HIGH (based on direct codebase inspection + official Astro docs)

---

## Existing Architecture (What Already Exists)

### Component Inventory

```
src/
├── components/
│   ├── Header.astro           — sticky nav, scroll shadow via sentinel IntersectionObserver
│   ├── Footer.astro           — static footer
│   ├── Hero.astro             — h1, subtitle, dashboard.png (no data-animate yet)
│   ├── FeatureGrid.astro      — 5 feature cards, data-animate on section
│   ├── FeatureCTA.astro       — CTA section + IS:INLINE observer script
│   ├── LandingCTA.astro       — CTA section + IS:INLINE observer script (duplicate!)
│   ├── ScreenshotBlock.astro  — wraps <Image> at max-width: 320px
│   ├── FaqAccordion.astro     — accordion component
│   ├── MobileMenu.astro       — mobile drawer
│   ├── SEO.astro              — meta/OG tags
│   └── charts/
│       ├── AcwrChart.astro    — Chart.js island
│       └── RecoveryChart.astro — Chart.js island
├── layouts/
│   ├── BaseLayout.astro       — html shell, Font API, Header, Footer
│   ├── FeaturePageLayout.astro — hero + ScreenshotBlock + slot + FeatureCTA
│   ├── CoachingPageLayout.astro — variant layout
│   ├── BlogPostLayout.astro   — prose layout
│   └── LegalPageLayout.astro  — legal prose
├── styles/
│   └── global.css             — Tailwind v4 + design tokens + data-animate CSS
└── assets/
    └── screenshots/           — dashboard.png, recovery.png, workload.png, active-workout.png
```

### Current Animation System State

`global.css` defines `[data-animate]` / `.is-visible` with `fade-up` keyframes and reduced-motion fallback. This is the right foundation.

**Critical bug:** `FeatureCTA.astro` and `LandingCTA.astro` each embed an `is:inline` IntersectionObserver script. Astro does NOT deduplicate `is:inline` scripts — they run once per component instance. On the landing page, both components are present, resulting in two observers both racing to add `.is-visible` to every `[data-animate]` element. On feature pages, FeatureCTA fires its observer, observing ALL `[data-animate]` elements on the page, which is correct by accident — but this only works because FeatureCTA is always the last component. This pattern is fragile.

---

## System Overview

### Target Architecture (v2.0 Polish Milestone)

```
┌─────────────────────────────────────────────────────────────┐
│                     BaseLayout.astro                         │
│  (html shell — Font API, SEO, Header, Footer, global.css)    │
├─────────────────────────────────────────────────────────────┤
│             Page-level Layouts (slot consumers)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │FeaturePageL. │  │CoachingPageL.│  │ BlogPostL.   │        │
│  │(new: DeviceF)│  │              │  │              │        │
│  └──────┬───────┘  └──────────────┘  └──────────────┘        │
│         │                                                     │
├─────────┴───────────────────────────────────────────────────┤
│              Shared Components (building blocks)             │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐             │
│  │DeviceFrame│  │AnimateIn  │  │FeatureCTA    │             │
│  │(NEW)      │  │(NEW)      │  │LandingCTA    │             │
│  └───────────┘  └───────────┘  └──────────────┘             │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ AnimationController (NEW — single global observer)   │   │
│  │ Injected once by BaseLayout in <body>                │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     global.css                               │
│  Design tokens + [data-animate] / .is-visible CSS            │
│  + new: data-animate-delay, data-animate-variant tokens      │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Boundaries

| Component | Responsibility | New vs Modified |
|-----------|---------------|-----------------|
| `AnimationController.astro` | Single IntersectionObserver, observes all `[data-animate]` on page, supports delay variants | NEW — replaces duplicated is:inline scripts |
| `DeviceFrame.astro` | Wraps screenshot in iPhone bezel, handles framed vs bare display | NEW — replaces `ScreenshotBlock.astro` |
| `AnimateIn.astro` | Convenience wrapper: applies `data-animate` + optional delay + optional variant to any child content | NEW — optional ergonomic shorthand |
| `BaseLayout.astro` | Add `<AnimationController />` once before `</body>` | MODIFY — add one import + one component tag |
| `FeatureCTA.astro` | Remove is:inline observer script block | MODIFY — delete ~18 lines |
| `LandingCTA.astro` | Remove is:inline observer script block | MODIFY — delete ~18 lines |
| `FeaturePageLayout.astro` | Swap `<ScreenshotBlock>` for `<DeviceFrame>` | MODIFY — swap import + component |
| `global.css` | Add delay CSS variables + new animation variants (fade-left, scale-up) | MODIFY — additive only |
| `Hero.astro` | Add data-animate to h1 and subtitle with stagger delays | MODIFY — add data attributes |

---

## Recommended Project Structure (additions only)

```
src/
├── components/
│   ├── AnimationController.astro   NEW: single observer, placed in BaseLayout
│   ├── AnimateIn.astro             NEW: ergonomic wrapper (optional convenience)
│   ├── DeviceFrame.astro           NEW: replaces ScreenshotBlock
│   └── [existing components]      modified as needed
└── styles/
    └── global.css                  add delay tokens + variants (additive)
```

No new directories needed. The additions slot cleanly into existing structure.

---

## Architectural Patterns

### Pattern 1: Single Global Animation Controller

**What:** One `<script>` (non-inline) injected once at the bottom of `<body>` via `BaseLayout.astro` that observes all `[data-animate]` elements. Elements declare delay via `data-animate-delay` attribute; the controller reads it and sets `animation-delay` before adding `.is-visible`.

**When to use:** Always — this replaces the duplicated `is:inline` observer pattern.

**Trade-offs:**
- Pro: No duplication, no race conditions, respects Astro's script deduplication for module scripts
- Pro: Single observer is more performant than N observers
- Pro: Astro module scripts are deduplicated automatically — even if AnimationController were imported multiple times, the script runs once
- Con: Slightly less co-located with the animation CSS — acceptable tradeoff

**Implementation:**
```astro
<!-- AnimationController.astro -->
<script>
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.animateDelay ?? '0ms';
          el.style.animationDelay = delay;
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
</script>
```

```astro
<!-- BaseLayout.astro — add before </body> -->
<AnimationController />
```

### Pattern 2: CSS Variable Delay Stagger via data-animate-delay

**What:** Individual sections or cards receive a `data-animate-delay="Xms"` attribute. The controller reads it and sets `animation-delay` inline before adding `.is-visible`. The CSS keyframe runs from that delay onward.

**When to use:** Staggering sibling elements (feature cards, section sub-elements) to create sequential entrance effects.

**Trade-offs:**
- Pro: No JS complexity — delay is data, not logic
- Pro: Works with prefers-reduced-motion (transition fallback still applies)
- Con: Requires explicit delay values per element — not auto-calculated from sibling index

**Example applied to FeatureGrid cards:**
```astro
<!-- FeatureGrid.astro — each <li> gets a stagger -->
<li data-animate data-animate-delay="0ms">...</li>
<li data-animate data-animate-delay="80ms">...</li>
<li data-animate data-animate-delay="160ms">...</li>
```

**global.css addition for scale-up variant:**
```css
@media (prefers-reduced-motion: no-preference) {
  [data-animate-variant="scale-up"] {
    transform: scale(0.96) translateY(8px);
  }
  [data-animate-variant="scale-up"].is-visible {
    animation: scale-up 450ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @keyframes scale-up {
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
}
```

### Pattern 3: Self-Contained Device Frame Component

**What:** `DeviceFrame.astro` accepts an image source and renders it inside a CSS iPhone bezel using Tailwind utility classes + border-radius. No SVG assets, no third-party device CSS libraries.

**When to use:** All screenshot displays on feature pages and hero section. Replaces `ScreenshotBlock.astro` entirely.

**Trade-offs:**
- Pro: No external dependency, no SVG file to maintain, crisp at all sizes
- Pro: Purely CSS — zero JS, zero KB
- Pro: Can show notch + side buttons using small absolutely positioned divs
- Con: Cannot match Apple's photorealistic device renders (acceptable for this site's tone)
- Con: Requires update if iPhone aspect ratio changes significantly (unlikely — 9:19.5 is stable)

**Prop API:**
```typescript
interface Props {
  src?: ImageMetadata;         // Astro image import
  alt: string;                 // required, screen reader text
  width?: number;              // default: 280
  showFrame?: boolean;         // default: true; false = bare screenshot
  loading?: 'eager' | 'lazy'; // default: 'lazy'; hero uses 'eager'
}
```

**Aspect ratio note:** iPhone 15/16 screens are 9:19.5 ratio. At width=280, expected height ~607px. The existing screenshots in `src/assets/screenshots/` already use this ratio — no cropping needed.

### Pattern 4: UI Refinements via CSS Token Adjustments

**What:** Global UI improvements (spacing, border-radii, color tweaks, typography scale) are applied by adjusting design token values in `global.css` `:root {}`. Components inherit changes automatically because they reference CSS variables.

**When to use:** Site-wide spacing or color adjustments. Touch individual components only when a specific element needs structural change (e.g., adding card hover lift to FeatureGrid).

**Trade-offs:**
- Pro: Minimal blast radius — one file change ripples everywhere
- Pro: Reversible quickly
- Con: Token changes affect every component simultaneously — requires visual review pass after changes

---

## Data Flow

### Animation Trigger Flow

```
Page loads (static HTML)
    ↓
BaseLayout renders AnimationController <script> at end of <body>
    ↓
Module script executes after DOM ready
    ↓
querySelectorAll('[data-animate]') — finds all elements on page
    ↓
IntersectionObserver.observe(each element)
    ↓
User scrolls → element enters viewport (threshold: 0.12)
    ↓
Observer callback:
  1. Read data-animate-delay attribute (default '0ms')
  2. Set element.style.animationDelay
  3. Add .is-visible class
  4. unobserve(element) — fires once only, no repeat
    ↓
CSS takes over: fade-up (or variant) keyframe runs
```

### Screenshot Display Flow (DeviceFrame)

```
FeaturePageLayout.astro receives screenshot: ImageMetadata prop
    ↓
Passes to <DeviceFrame src={screenshot} alt={screenshotAlt} />
    ↓
DeviceFrame renders:
  - Outer div: bezel (rounded-[44px], dark border, shadow-2xl)
  - Notch pill: absolute div, centered top
  - Side buttons: absolute divs, left/right edges
  - Inner div: overflow-hidden rounded screen area
  - <Image>: Astro image component (WebP, correct width, quality=90)
    ↓
Browser paints crisp device frame + optimized screenshot
No JS involved — pure HTML/CSS at build time
```

---

## Build Order

This order respects dependencies — each step is independently validatable before the next begins.

### Step 1: Fix Animation System (foundation)

**Files:**
- CREATE `src/components/AnimationController.astro`
- MODIFY `src/layouts/BaseLayout.astro` — import + render AnimationController before `</body>`
- MODIFY `src/components/FeatureCTA.astro` — delete is:inline script block (~18 lines)
- MODIFY `src/components/LandingCTA.astro` — delete is:inline script block (~18 lines)

**Why first:** The duplicated observer scripts are a correctness bug that must be resolved before adding more `[data-animate]` elements. Building on broken infrastructure creates confusion and masks real issues.

**Validation:** Load landing page. All `[data-animate]` elements fade in once on scroll. No double-fire. Check DevTools Performance — single observer active.

### Step 2: Device Frame Component

**Files:**
- CREATE `src/components/DeviceFrame.astro`
- MODIFY `src/layouts/FeaturePageLayout.astro` — swap ScreenshotBlock import and usage
- MODIFY `src/components/Hero.astro` — wrap dashboard.png in DeviceFrame

**Why second:** Device frame is shared across hero + 5 feature pages. One layout change in `FeaturePageLayout.astro` propagates to all feature pages. Getting the component right before touching individual pages avoids N separate fixups.

**Validation:** All 5 feature deep-dive pages show screenshot inside iPhone bezel. Landing hero shows device frame. No overflow clipping. Aspect ratio correct. Lighthouse LCP score maintained (use loading="eager" on hero instance).

### Step 3: Stagger Animations on Key Sections

**Files:**
- MODIFY `src/components/Hero.astro` — add `data-animate` + `data-animate-delay` to h1, subtitle, badge block
- MODIFY `src/components/FeatureGrid.astro` — add per-card `data-animate` + stagger delays
- MODIFY `src/layouts/FeaturePageLayout.astro` — add `data-animate` to hero section and screenshot section
- MODIFY `src/styles/global.css` — add `scale-up` variant if hero device frame entrance needs it

**Why third:** AnimationController must be stable (Step 1) and device frames must exist (Step 2) before layering stagger on top. The hero is the most important animation sequence — hero should be fully composed before timing it.

**Validation:** Hero elements enter sequentially. Feature cards stagger left-to-right. Test with DevTools Rendering: "Emulate CSS prefers-reduced-motion: reduce" — confirms fade-only fallback works. Test with "Emulate CSS prefers-reduced-motion: no-preference" after clearing.

### Step 4: UI/UX Refinement Pass

**Files:**
- MODIFY `src/styles/global.css` — token tuning (spacing scale, potentially typography)
- MODIFY individual components as needed (card hover lift, border improvements, etc.)
- UPDATE `public/badges/` — replace placeholder App Store SVG badge with official Apple asset

**Why fourth:** Visual polish is additive and non-breaking. Spacing token adjustments after structure is locked avoids adjusting the same element twice. App Store badge update is a self-contained swap.

**Validation:** Visual review on Chrome desktop + Safari mobile. Lighthouse Performance >= 95 maintained. Accessibility: tab order, focus rings, screen reader test.

### Step 5: Responsive Refinement

**Files:** Component-by-component as issues discovered.

**Why last:** Responsive issues are often exposed by visual changes in Steps 1-4. Testing after all visual work avoids fixing the same breakpoints twice.

**Validation:** Real device testing on iPhone SE (375px), iPhone 14 Pro (390px), iPad (768px), 1440px desktop. Key checkpoints: device frame doesn't overflow on narrow screens, hero type scale readable at 375px, feature grid card wrapping behaves correctly.

---

## Anti-Patterns

### Anti-Pattern 1: Multiple is:inline IntersectionObserver Scripts

**What people do:** Copy the `is:inline` observer block into each component that needs to trigger animations.

**Why it's wrong:** Astro does NOT deduplicate `is:inline` scripts — confirmed in official docs. Two observers on the same page race to add `.is-visible` to the same elements. The second observer also observes all `[data-animate]` elements globally (including ones the first observer already handled). Results in unreliable animation timing and wasted CPU.

**Do this instead:** `AnimationController.astro` in `BaseLayout.astro`. Regular `<script>` (not is:inline) — Astro deduplicates module scripts. One observer per page, always.

### Anti-Pattern 2: Keyframes Inside Component `<style>` Blocks

**What people do:** Define `@keyframes fade-up` inside `FeatureGrid.astro`'s `<style>` tag to keep animations co-located.

**Why it's wrong:** Astro scopes `<style>` block CSS to the component's elements. The `is-visible` class is added by JavaScript to a plain HTML element — Astro's scoped styles apply a hashed class selector that the JS doesn't know about. Keyframes in component styles may silently not apply.

**Do this instead:** All animation keyframes and `[data-animate]` state CSS belong in `global.css`. Components only apply `data-animate` attributes.

### Anti-Pattern 3: Using @astrojs/cloudflare Adapter with Static Output

**What people do:** Install `@astrojs/cloudflare` assuming it's required for Cloudflare Pages.

**Why it's wrong:** The adapter is for SSR/edge functions only. Using it alongside `output: "static"` causes deployment failures. Documented pitfall from the v1.0 research.

**Do this instead:** Zero adapters. Connect GitHub repo in Cloudflare Pages dashboard directly. Build command: `npm run build`, output directory: `dist`.

### Anti-Pattern 4: Device Frame as Downloaded SVG Asset

**What people do:** Download an iPhone frame SVG and use absolute positioning to layer the screenshot inside it.

**Why it's wrong:** Creates a z-index coordination problem, often produces blurry results at non-native dimensions, breaks if screenshot aspect ratio doesn't match the SVG cutout, requires maintaining an external asset.

**Do this instead:** CSS-only bezel with `border-radius`, `border`, and small absolutely-positioned button divs. Always crisp, no asset to maintain, naturally adapts to image dimensions.

### Anti-Pattern 5: Importing Motion/GSAP for Scroll Reveals

**What people do:** Install GSAP ScrollTrigger or the `motion` library because the API looks clean.

**Why it's wrong:** GSAP adds ~48KB min+gzip. For `fade-up` reveals, native IntersectionObserver + CSS keyframes produces identical visual results with zero added JS. This site's Lighthouse score (>= 95) is directly tied to its download conversion argument for Tuwa — don't erode it.

**Do this instead:** Native IntersectionObserver + CSS. If a complex sequenced animation is later needed in the hero, add `motion` (the standalone library) as a single Astro island — not site-wide.

---

## Integration Points

### Existing to New Component Handoffs

| Integration | Current State | Target State | Change |
|-------------|---------------|--------------|--------|
| Animation observer | is:inline in FeatureCTA + LandingCTA (duplicated) | AnimationController in BaseLayout | DELETE old blocks, INJECT new component |
| Screenshot display | ScreenshotBlock.astro in FeaturePageLayout | DeviceFrame.astro in FeaturePageLayout | SWAP import + component tag |
| Hero screenshot | Bare `<Image>` in Hero.astro | `<DeviceFrame>` wrapping same image | WRAP |
| data-animate elements | Sparse (FeatureGrid section, CTA sections) | Extended to Hero, feature cards, page body sections | ADD data attributes |

### Files Touched Per Step

| Step | Create | Modify |
|------|--------|--------|
| 1: Animation fix | AnimationController.astro | BaseLayout.astro, FeatureCTA.astro, LandingCTA.astro |
| 2: Device frame | DeviceFrame.astro | FeaturePageLayout.astro, Hero.astro |
| 3: Stagger | (optional: AnimateIn.astro) | Hero.astro, FeatureGrid.astro, FeaturePageLayout.astro, global.css |
| 4: UI polish | — | global.css, individual components, public/badges/ |
| 5: Responsive | — | Any component as issues surface |

---

## Sources

- Astro Scripts and event handling — deduplication behavior: https://docs.astro.build/en/guides/client-side-scripts/
- Tailwind CSS Device Mockup component (structure reference): https://flowbite.com/docs/components/device-mockups/
- Apple Design Resources (device proportions): https://developer.apple.com/design/resources/
- IntersectionObserver API (MDN): https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- CSS animation-delay (MDN): https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
- Astro View Transitions docs: https://docs.astro.build/en/guides/view-transitions/
- Direct codebase inspection: `/Users/hanwen/Desktop/tuwa-website/src/` (2026-05-11)

---
*Architecture research for: Tuwa marketing site v2.0 visual polish milestone*
*Researched: 2026-05-11*
