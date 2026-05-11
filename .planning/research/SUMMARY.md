# Project Research Summary

**Project:** Tuwa Marketing Website — v2.0 Visual Overhaul
**Domain:** iOS app marketing site — animations, device mockups, screenshot presentation, Cloudflare deployment
**Researched:** 2026-05-11
**Confidence:** HIGH

## Executive Summary

The Tuwa v2.0 visual overhaul is a focused polish milestone on top of an already-functional Astro 6 + Tailwind v4 static site. The core task is bringing the site up to the visual standard of premium fitness brands (Oura, WHOOP, Arc) through three coordinated improvements: crisp device-framed screenshots, refined scroll-reveal animations, and UI depth through noise texture, gradients, and glass morphism. Research confirms all of these are achievable within the existing zero-JS-by-default architecture without adding client-side frameworks or eroding the Lighthouse 95+ performance baseline.

The recommended approach is execution in a strict dependency order: fix the animation system bug first (duplicated IntersectionObserver scripts), then introduce the CSS iPhone device frame component (which all subsequent screenshot work depends on), then layer stagger animations and UI polish. This order avoids rework — every step is independently testable before the next begins. The total new dependencies are one Tailwind CSS plugin (`tailwind-animations` 1.0.1) and optionally the standalone `motion` library (12.38.0) for hero choreography only if CSS proves insufficient.

The most important risks are performance-related and easy to introduce accidentally: lazy-loading the hero/LCP image during device frame refactoring (Lighthouse drops from 95 to 72), animating layout properties instead of only `transform`/`opacity` (CLS penalty), and over-applying `will-change` to all animated elements (GPU memory exhaustion on mobile). All three have simple preventions that should be treated as coding rules rather than per-task checklist items.

---

## Key Findings

### Recommended Stack

The v1.0 stack (Astro 6, Tailwind v4, MDX, Sharp, SEO component) is validated and unchanged. V2.0 adds one confirmed dependency and one conditional dependency.

`tailwind-animations` (1.0.1) is the right scroll animation choice: it is a pure CSS Tailwind plugin using the native CSS View Timeline API, adds zero runtime JS, and integrates via a single `@import` in `global.css`. Firefox requires progressive enhancement handling (animations must not hide content for non-supporting browsers). The `motion` library (12.38.0) is confirmed as the correct choice if JS-driven animation becomes necessary — its standalone non-React API works in Astro `<script>` tags without pulling in any framework runtime.

The CSS-only iPhone device frame (Flowbite pattern) is confirmed as the correct device mockup approach: no SVG asset to maintain, resolution-independent, Tailwind v4 arbitrary value syntax compatible. Cloudflare Pages deployment requires `NODE_VERSION=22` in dashboard environment variables and no adapter — the `@astrojs/cloudflare` adapter causes deployment failures with `output: "static"`.

**Core technologies (additive to v1.0):**
- `tailwind-animations` 1.0.1: CSS View Timeline scroll reveals — zero JS, Tailwind v4 native
- `motion` 12.38.0 (conditional): hero choreography only, standalone vanilla JS, no React
- `DeviceFrame.astro` (custom): CSS iPhone bezel component — zero dependencies, infinite DPR sharpness
- `AnimationController.astro` (custom): single global IntersectionObserver replacing duplicated `is:inline` scripts
- Cloudflare Pages with `NODE_VERSION=22`: explicit setting required to avoid build failures

### Expected Features

Research covered 9 premium competitor sites (WHOOP, Oura, Strava, Apple Fitness+, Eight Sleep, Arc, Linear, Notion, Superhuman). Feature priorities emerge clearly from that analysis.

**Must have (table stakes for 2026 fitness app marketing sites):**
- Crisp Retina-ready screenshots (3x export, Astro `<Image>` with `widths` prop) — blurry screenshots are a credibility failure signal
- Scroll-triggered entrance animations — static pages read as unfinished; already partially implemented but needs refinement and consistent application
- Hover micro-interactions on CTAs — `transform: scale(1.02)` on hover, `scale(0.97)` on active, 150ms ease
- Consistent section spacing rhythm (120-160px desktop gaps, 64-80px mobile)
- `text-wrap: balance` on all headings — eliminates orphaned words, used by Linear, Superhuman, Apple Fitness+

**Should have (competitive differentiators):**
- CSS iPhone device frame on screenshots — naked screenshots read as internal QA exports, not marketing
- Noise/grain texture overlay on hero sections — removes flat design sterility (used by Arc, Linear)
- Gradient brand accents replacing flat solid colors — removes template feel
- Animated stat counters for ACWR/recovery methodology callouts — makes science claims land harder
- Bento grid for feature overview — visual variety over 3-column card grid (Notion pattern)
- Screenshot carousel on feature pages (CSS scroll-snap, no JS library)
- Glass morphism on 1-2 key callout elements — use sparingly (`backdrop-filter: blur(8px)`)

**Defer to v3.0:**
- Sticky scroll feature showcase (Oura-style 6-state carousel) — HIGH complexity, requires multiple screenshot states per feature
- Parallax depth layers on hero — needs design time, risk of feeling overdone
- Dark mode — explicitly descoped per PROJECT.md
- Video autoplay hero — LCP killer, not justified without CDN infrastructure

### Architecture Approach

The existing codebase has a correct foundation but a critical bug: `FeatureCTA.astro` and `LandingCTA.astro` each embed duplicate `is:inline` IntersectionObserver scripts that race to trigger all `[data-animate]` elements on any page where both components are present. This must be fixed before adding more animated elements. The fix is a single `AnimationController.astro` component injected once by `BaseLayout.astro` — Astro's module script deduplication ensures it runs exactly once per page regardless of how many components import it.

The device frame replaces `ScreenshotBlock.astro` with `DeviceFrame.astro`, a self-contained Tailwind CSS component that accepts an Astro `ImageMetadata` prop. The layout change in `FeaturePageLayout.astro` propagates automatically to all 5 feature deep-dive pages. All animation keyframes stay in `global.css` (not component `<style>` blocks, which Astro scopes and prevents from applying to JS-added classes).

**Major components:**
1. `AnimationController.astro` (NEW) — single IntersectionObserver injected by BaseLayout, supports `data-animate-delay` stagger
2. `DeviceFrame.astro` (NEW) — CSS iPhone bezel, replaces ScreenshotBlock, accepts `ImageMetadata`, `showFrame` toggle, `loading` eager/lazy
3. `AnimateIn.astro` (NEW, optional) — ergonomic wrapper applying `data-animate` + delay to child content
4. `BaseLayout.astro` (MODIFY) — add `<AnimationController />` before `</body>`
5. `FeatureCTA.astro` + `LandingCTA.astro` (MODIFY) — delete duplicated `is:inline` observer blocks
6. `global.css` (MODIFY) — add delay tokens, `scale-up` animation variant, CSS View Timeline imports (additive only)

### Critical Pitfalls

Research surfaced 11 v2.0-specific pitfalls and 11 preserved v1.0 pitfalls. The highest-impact v2.0 pitfalls:

1. **LCP image gets lazy-loaded after device frame refactor** — Astro `<Image>` defaults to `loading="lazy"`. During hero refactoring the explicit `loading="eager" fetchpriority="high"` must be set on the hero `DeviceFrame` instance. Recovery is one attribute change, but Lighthouse will drop from 95 to 72 if missed.

2. **Animating layout properties causes CLS** — Using `margin-top`, `height`, `top`, `left` in scroll animations triggers Cumulative Layout Shift under Google's March 2026 Visual Stability Index update. Rule: animate only `transform` (translateY, scale) and `opacity`. Never `margin` or dimension properties.

3. **Missing `prefers-reduced-motion` guard** — Lighthouse Accessibility penalty (score falls below 90) plus genuine harm to ~70M users with vestibular disorders. One `@media (prefers-reduced-motion: reduce)` block in `global.css` prevents this entirely. Add it before writing a single animation rule.

4. **FOIC — invisible content without JS** — Setting `opacity: 0` in base CSS hides content for users where JS fails or is blocked. The hidden state must be applied only via a JS-added class (`.will-animate`), not base CSS. Test by disabling JS in Chrome DevTools.

5. **Cloudflare Pages Node.js version mismatch** — Astro 6 requires Node 22+. Cloudflare's default runtime is older. Set `NODE_VERSION=22` in dashboard environment variables plus add `.nvmrc` with `22` before the first deployment attempt.

6. **`will-change` overuse** — Applying `will-change: transform` globally to all `[data-animate]` elements exhausts GPU compositor layers on mobile. Cap at approximately 5-8 elements per page. Apply dynamically and remove after animation completes via the `animationend` event.

---

## Implications for Roadmap

Based on combined research, a 5-phase execution order is recommended. Each phase is independently testable and unblocks the next.

### Phase 1: Fix Animation Infrastructure
**Rationale:** The duplicated `is:inline` IntersectionObserver scripts are a correctness bug that will cause unpredictable behavior as more animated elements are added. Building v2.0 polish on broken infrastructure masks real issues and creates debugging confusion. This phase has no external dependencies and no visual risk.
**Delivers:** Single reliable `AnimationController.astro`, duplicated observer scripts removed from `FeatureCTA.astro` and `LandingCTA.astro`, `prefers-reduced-motion` guard in `global.css`, FOIC prevention pattern established site-wide.
**Addresses:** All scroll animation features (existing and new)
**Avoids:** Pitfall A2 (missing reduced-motion), Pitfall A3 (FOIC), Anti-Pattern 1 (duplicate observers)

### Phase 2: Screenshots and Device Frame
**Rationale:** All visual work downstream depends on having crisp, properly framed screenshots. The `DeviceFrame.astro` component is shared across the hero and all 5 feature pages — getting it right before touching individual pages prevents repeated fixups.
**Delivers:** `DeviceFrame.astro` (CSS iPhone bezel), `ScreenshotBlock.astro` replaced across all feature page layouts, hero screenshot wrapped in device frame, all screenshots re-exported at 3x from Xcode Simulator, Astro `<Image>` with proper `widths` prop applied throughout.
**Addresses:** Crisp screenshots (P1), iPhone device frame (P1)
**Avoids:** Pitfall A4 (lazy LCP — hero DeviceFrame must set `loading="eager" fetchpriority="high"`), Pitfall A5 (blurry screenshots), Pitfall A6 (device frame responsive breakage via `aspect-ratio: 9/19.5`)

### Phase 3: Stagger Animations and Motion Polish
**Rationale:** Animation system must be stable (Phase 1) and device frames must exist (Phase 2) before layering stagger timing. Hero must be fully composed before its entrance sequence is timed.
**Delivers:** Staggered entrance animations on hero, feature grid cards, and feature page sections. Optional `motion` library for hero choreography if CSS proves insufficient. Animated stat counters. CSS scroll-driven read progress bar on blog posts.
**Uses:** `tailwind-animations` 1.0.1 (CSS View Timeline), optionally `motion` 12.38.0 (standalone in `<script>` tag — never as React island)
**Avoids:** Pitfall A1 (CLS from layout properties), Pitfall A7 (will-change overuse), Pitfall A10 (Motion as React island), Anti-Pattern 5 (GSAP for scroll reveals)

### Phase 4: UI Depth and Visual Polish
**Rationale:** Visual depth tokens (gradients, noise texture, glass morphism, typography refinements) are additive and non-breaking. Applying after structure and animation are locked avoids adjusting the same elements multiple times during development.
**Delivers:** Noise texture overlay on hero/key sections, gradient brand accents replacing flat backgrounds, `text-wrap: balance` on all headings, hover micro-interactions on CTAs, bento grid for feature overview, glass morphism on 1-2 key callout elements, consistent spacing rhythm audit.
**Addresses:** All P2 differentiator features from FEATURES.md
**Avoids:** All anti-features (video autoplay, GSAP, Three.js, Lottie, dark mode toggle)

### Phase 5: Responsive Refinement and Deployment
**Rationale:** Responsive issues are typically exposed by visual changes in Phases 1-4. Testing after all visual work is complete avoids re-testing the same breakpoints multiple times. Deployment configuration verified once at the end.
**Delivers:** Real-device breakpoint testing (375px, 390px, 768px, 1280px, 1440px), Cloudflare Pages deployment with `NODE_VERSION=22`, `.nvmrc` file committed, Lighthouse mobile score >= 95 verified, CDN cache strategy documented for future screenshot updates.
**Avoids:** Pitfall A8 (Node version mismatch), Pitfall A9 (stale CDN cache), Pitfall A11 (responsive regression from animation classes), Anti-Pattern 3 (Cloudflare adapter with static output)

### Phase Ordering Rationale

- Phase 1 before Phase 2: The animation bug means any new `[data-animate]` elements added during the device frame work would fire incorrectly. Fix the foundation first.
- Phase 2 before Phase 3: Hero stagger animations require the hero to be in its final composed state (with device frame in place). Staggering placeholder layout wastes iteration effort.
- Phase 3 before Phase 4: UI depth elements (noise texture, gradients) interact visually with scroll-animated sections. Evaluating these interactions is cleaner when animations are stable.
- Phase 4 before Phase 5: Responsive breakpoints should reflect the final design. Testing after visual changes avoids retesting breakpoints multiple times.

### Research Flags

Phases needing deeper research during planning:
- **Phase 3 (animations):** If `motion` library is needed for hero choreography, validate the specific animation sequence against the Astro `<script>` import pattern before writing hero animation code. The pattern is documented but the specific hero sequence is a judgment call.

Phases with well-documented patterns (skip research-phase):
- **Phase 1 (animation fix):** Architecture file provides exact implementation code including the full `AnimationController.astro` script. Standard Astro module script pattern.
- **Phase 2 (device frame):** Flowbite pattern is verified. Architecture file provides the complete prop API and aspect-ratio formula.
- **Phase 4 (visual polish):** All patterns (noise texture, glass morphism, bento grid) are standard CSS with no library dependencies.
- **Phase 5 (deployment):** Astro + Cloudflare Pages is well-documented. All known gotchas are captured in PITFALLS.md with exact recovery steps.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All primary dependencies verified on npm registry as of 2026-05-11. Version numbers confirmed. Firefox View Timeline caveat noted and mitigated with progressive enhancement pattern. |
| Features | HIGH | Competitor analysis from 9 live sites fetched 2026-05-11. Browser support from MDN and caniuse. Feature prioritization reflects actual observed competitor patterns, not inference. |
| Architecture | HIGH | Based on direct codebase inspection of actual Tuwa source files. The observer duplication bug is confirmed by reading component code, not assumed. All proposed components have concrete implementations in the research file. |
| Pitfalls | HIGH | v2.0 pitfalls sourced from Astro official docs, web.dev performance guides, MDN, and 2026 production postmortems. All pitfalls include clear prevention steps and recovery cost estimates. |

**Overall confidence: HIGH**

### Gaps to Address

- **Screenhance output quality:** The tool is confirmed to exist and function, but output visual quality is template-dependent. Evaluate a test export before committing pre-rendered mockups to the hero. The CSS device frame is the correct fallback if Screenhance output doesn't meet quality standards.
- **Hero animation sequence specifics:** Whether CSS View Timeline animations are sufficient for the hero entrance, or whether the `motion` library is needed, cannot be determined until the hero is in its final composed state after Phase 2. This is a design judgment call, not a technical uncertainty.
- **Sticky scroll showcase (v3.0):** Research confirms high impact but high complexity. Content readiness (3-6 screenshot states per feature) is the primary blocker, not technical feasibility. Revisit when content is available.

---

## Sources

### Primary (HIGH confidence)
- [tailwind-animations npm](https://www.npmjs.com/package/tailwind-animations) — v1.0.1 confirmed, Tailwind v4 native
- [motion npm](https://www.npmjs.com/package/motion) — v12.38.0 confirmed, standalone vanilla JS API
- [Astro deploy to Cloudflare Pages — official docs](https://docs.astro.build/en/guides/deploy/cloudflare/) — no-adapter pattern for static output
- [Tailwind CSS + Astro install guide](https://tailwindcss.com/docs/installation/framework-guides/astro) — @tailwindcss/vite, not @astrojs/tailwind
- [Flowbite device mockups](https://flowbite.com/docs/components/device-mockups/) — CSS iPhone frame Tailwind pattern
- [MDN: CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) — View Timeline browser support table
- [web.dev: How to create high-performance CSS animations](https://web.dev/animations-guide/) — transform/opacity vs layout properties
- [web.dev: Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls) — VSI March 2026 update
- [Astro scripts and event handling](https://docs.astro.build/en/guides/client-side-scripts/) — is:inline vs module script deduplication behavior
- Direct codebase inspection: `/Users/hanwen/Desktop/tuwa-website/src/` (2026-05-11) — confirmed observer duplication bug in FeatureCTA.astro and LandingCTA.astro

### Secondary (MEDIUM confidence)
- [BrightCoding: Tailwind Animations plugin 2026](https://www.blog.brightcoding.dev/2026/03/10/tailwind-animations-the-revolutionary-plugin-for-effortless-ui-motion) — production usage confirmed March 2026
- [Motion + Astro guide (Netlify)](https://developers.netlify.com/guides/motion-animation-library-with-astro/) — inView, animate, stagger pattern in Astro script tags
- [gmkennedy.com: Deploy Astro Cloudflare Pages pitfalls](https://www.gmkennedy.com/blog/deploy-astro-cloudflare-pages/) — *.pages.dev vs *.workers.dev gotcha, "Shift to Pages" fix
- [Addy Osmani: fetchpriority=high for LCP](https://addyosmani.com/blog/fetch-priority/) — performance impact data
- [Web Animation Performance Tier List — Motion.dev](https://motion.dev/magazine/web-animation-performance-tier-list) — compositor properties, will-change guidance

### Tertiary (competitor pattern analysis)
- WHOOP, Oura Ring, Strava, Apple Fitness+, Eight Sleep, Arc, Linear, Notion, Superhuman — live site analysis fetched 2026-05-11

---

*Research completed: 2026-05-11*
*Ready for roadmap: yes*
