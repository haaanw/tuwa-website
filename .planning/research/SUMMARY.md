# Project Research Summary

**Project:** Tuwa Marketing Website — v3.0 Art Direction & Interaction Polish
**Domain:** Static marketing site — SVG art direction, typography system, CSS animation polish
**Researched:** 2026-05-14
**Confidence:** HIGH

## Executive Summary

The v3.0 milestone adds visual and interaction polish to an already-shipped, Lighthouse 98/99-scoring Astro 6 + Tailwind v4 marketing site. Research unanimously confirms that all major features — Matisse-inspired SVG art, typography weight contrast, iPhone frame realism, and interaction polish — are achievable with zero or near-zero new dependencies, using CSS-native techniques now available in all major browsers. The existing stack is the right stack; this milestone is about precision additions, not architectural change.

The recommended approach is CSS-first at every decision point. Typography weight contrast requires only a font config change and CSS token additions. Matisse cut-out art is hand-authored inline SVG with SVGO-optimized paths. iPhone frame realism is surgical CSS. Page transitions use the native CSS `@view-transition` at-rule — zero JS, Chrome 126+, Safari 18.2+, progressive enhancement on Firefox. The one conditional package — Lenis v1.3.23 at ~3KB gzipped — is optional and only warranted if momentum scroll is confirmed as a design goal. The guiding constraint throughout: preserve the Lighthouse 98/99 baseline.

The primary risk in this milestone is not technical complexity but integration gotchas between existing systems. The most dangerous: Astro `<ViewTransitions />` (the component) and the current IntersectionObserver scroll-reveal system are mutually exclusive without significant rework. Research is clear — if the `<ViewTransitions />` component is added, either remove the IO scroll-reveal or migrate to time-staggered entrance animations. The correct answer for this project is to use native CSS `@view-transition` instead, which does not conflict with IO at all. The second-highest risk is SVG DOM bloat from unoptimized Figma exports displacing the LCP candidate and tanking Lighthouse. Both risks have well-defined prevention strategies documented in PITFALLS.md.

## Key Findings

### Recommended Stack

The existing stack (Astro 6.3.1, Tailwind v4, MDX, Cloudflare Pages) remains unchanged and validated. v3.0 adds exactly one configuration change, one optional package, and several CSS additions.

The Astro Font API must be updated to load General Sans using the variable font range syntax `"200 700"` instead of the current discrete weight array — this downloads one font file instead of five. Font weight 300 is confirmed available from Fontshare. CSS `@view-transition { navigation: auto }` added to `global.css` delivers cross-page transitions at zero bundle cost. The `qrcode` package should be fully removed.

**Core technologies:**
- **Astro 6.3.1 (unchanged):** SSG with Font API — no adapter needed for static Cloudflare Pages
- **Tailwind v4 (unchanged):** CSS-variable token cascade means typography changes propagate to all 10 pages automatically
- **General Sans variable font (config change):** Weight range `"200 700"` covers the display/body contrast system in a single file
- **CSS `@view-transition` (additive):** Zero-JS cross-page transitions; do NOT use `<ClientRouter>` or the Astro `<ViewTransitions />` component
- **Lenis v1.3.23 (conditional, ~3KB gzipped):** Momentum scroll only if confirmed as a design goal — import directly in an Astro `<script>`, never via the `astro-lenis` wrapper
- **SVGO (dev pipeline, no runtime cost):** Mandatory preprocessing for all Matisse SVG shapes before inlining; use `--multipass` flag

**What NOT to add:** `<ClientRouter>`, GSAP, anime.js, Motion library, `astro-lenis` wrapper, or any animation library. CSS covers 100% of the art direction use cases at zero bundle cost.

### Expected Features

**Must have (table stakes):**
- Typography weight contrast: light (300) large headings + heavier (500–600) body — absent on current site, visible quality gap vs. Linear/Apple/Vercel
- Screenshot fit correctness: `object-fit`/`object-position` fix + export dimensions verified at 1179×2556px (3x Retina iPhone 15 Pro)
- Smooth anchor navigation: implemented via JS `scrollIntoView({ behavior: 'smooth' })` on specific links — NOT global `scroll-behavior: smooth` on `html` (Safari bug, IO conflict)
- QR code section removal: deprecated 2021-era pattern, cleaner conversion flow, remove `qrcode` package entirely

**Should have (competitive differentiators):**
- Matisse Swimming Pool SVG frieze in hero: primary visual differentiator — organic cut-out shapes (8–12 SVGO-optimized paths) on full-width SVG band, accent green (`#2B5240`) on travertine (`#F4F1ED`), `aria-hidden`, zero JS
- iPhone frame realism: layered `box-shadow` (4–5 stops), screen-inset shadow, proportional Dynamic Island, action button visual distinction — all pure CSS
- CSS `@view-transition` page transitions: cross-fade between pages, zero JS, progressive enhancement on Firefox
- CSS font-weight token system: `--weight-display`, `--weight-heading`, `--weight-body`, `--weight-label` in `:root`, replacing all inline `font-weight` values across 40+ locations atomically

**Defer (v3.x / v4+):**
- Scroll-driven parallax on Matisse shapes: add only after static shapes confirmed on real iOS devices
- `clamp()` fluid sizing extension to h2/h3 on feature pages
- Matisse-inspired organic section dividers on feature deep-dive pages
- `transition:name` shared-element morphing for device frame across pages

### Architecture Approach

v3.0 integrates with the existing component tree through targeted additions and surgical edits. One new component is created (`MatisseFrieze.astro`); five to eight existing components receive single-purpose modifications. The CSS custom property system is the single integration layer — all typography tokens are set in `:root` in `global.css` and cascade automatically to all pages. No new JS patterns are introduced.

**Major components:**
1. **`MatisseFrieze.astro` (NEW):** Inline SVG organic shapes, `variant: 'hero' | 'divider'` and `animate: boolean` props, SVGO-optimized paths, fills from existing CSS variables — no hardcoded hex values
2. **`DeviceFrame.astro` (EDIT):** Proportional Dynamic Island (percentage width), layered `box-shadow`, screen-inset shadow, side button realism — all CSS, no API changes
3. **`global.css` (EDIT):** `--weight-*` token definitions, `@view-transition`, `.matisse-frieze` / `.matisse-shape` CSS classes, all `@keyframes` — keyframes must always live here, never in component `<style>` blocks (Astro scopes component styles but `@keyframes` registered inside them are globally named, causing collisions)
4. **`LandingCTA.astro` (EDIT):** Remove QR code block and `import QRCode` statement entirely — subtractive only, verify CLS = 0 after
5. **`Hero.astro` (EDIT):** Import `MatisseFrieze`, apply typography weight token on h1
6. **`astro.config.mjs` (EDIT):** Font weight range `"200 700"` for General Sans variable font

**Recommended build order (dependency-driven):**
1. CSS Foundation — tokens, `@view-transition`, `.matisse-*` classes — zero regression risk
2. DeviceFrame realism — self-contained, propagates to all pages automatically
3. QR code removal — purely subtractive, verify CLS
4. Typography weight rollout — distributed but each change is a one-liner token swap, done as single atomic commit
5. MatisseFrieze component — highest creative iteration; benefits from locked typography layout
6. Interaction polish audit — subjective; do last when structure is stable

### Critical Pitfalls

1. **Astro `<ViewTransitions />` component destroys scroll-reveal** (B10) — Using `<ViewTransitions />` causes all `[data-animate]` IO-based scroll-reveal elements to fire simultaneously on every page navigation (IO immediately satisfied on DOM swap). The correct choice for this project is native CSS `@view-transition { navigation: auto }` which provides cross-page crossfade without conflicting with IO. Never add `<ClientRouter>` or `<ViewTransitions />` to this codebase.

2. **SVG DOM bloat from unoptimized Figma exports** (B1) — Raw exports can push DOM nodes from ~200 to 1,400+. Lighthouse fires "Avoid an excessive DOM size" at 800 nodes. Establish the SVGO `--multipass` pipeline before placing any SVG. Budget: < 400 total nodes for the frieze; < 30 nodes per individual shape after optimization.

3. **Font weight 300 must be loaded before any CSS uses it** (B4) — Astro Font API currently loads only `["400", "600"]`. Writing `font-weight: 300` in CSS without updating the config causes silent browser synthesis — light titles look identical to regular body text, defeating the entire design intent. Update `astro.config.mjs` to `"200 700"` (variable font range) as the very first action in the typography phase.

4. **Typography weight system requires atomic sweep across 40+ locations** (B5) — `font-weight: 600` is hardcoded as inline styles in 40+ locations. Patching page-by-page ships a visually inconsistent product. Establish `--weight-*` CSS variables in `global.css` first, then replace all inline `font-weight` values in one commit. Post-sweep: grep for any remaining hardcoded values outside `global.css`.

5. **Device frame realism decorations must use percentage-based offsets** (B8) — Pixel-offset pseudo-element buttons calibrated at 320px break at 260px (the narrowest mobile). Use `%` or `em` units so decorations scale with frame width. Test at 260px, 300px, and 320px after every addition.

## Implications for Roadmap

Based on combined research, a 6-phase execution order is recommended. Each phase is independently testable, has a clear verification criterion, and unblocks the next.

### Phase 1: CSS Foundation & Token System
**Rationale:** Pure additive CSS with zero regression risk. All subsequent phases depend on the `--weight-*` token system and the updated font config. The `@view-transition` CSS at-rule must be in place before interaction polish is assessed. This phase also resolves the ViewTransitions/IO incompatibility before it can be accidentally introduced.
**Delivers:** `--weight-*` token system in `:root`; updated General Sans weight range `"200 700"` in `astro.config.mjs`; `@view-transition { navigation: auto }` in `global.css`; `.matisse-frieze` / `.matisse-shape` CSS classes; `prefers-reduced-motion` guards for any new keyframes
**Addresses:** Typography weight system (foundation), page transitions (complete), Matisse art (CSS foundation)
**Avoids:** B4 (font not loaded before CSS uses it), B10 (no `<ViewTransitions />` component ever added), A2 (reduced-motion guards from day one)

### Phase 2: DeviceFrame Realism
**Rationale:** Self-contained component with no external dependencies. Improvements propagate automatically to all pages via the single `DeviceFrame.astro` component. Hero layout must be stable before Matisse shapes are positioned against it.
**Delivers:** Layered `box-shadow` (4–5 stop penumbra), proportional Dynamic Island (percentage-based width), screen-inset shadow, action button visual distinction, screenshot `object-fit`/`object-position` fix
**Addresses:** Screenshot fit correctness (table stakes), iPhone frame realism (differentiator)
**Avoids:** B8 (percentage-based offsets throughout, test at 260/300/320px), A4 (LCP image `loading="eager" fetchpriority="high"` preserved after any hero restructure)

### Phase 3: QR Code Removal
**Rationale:** Purely subtractive, no dependencies, fastest verification cycle. Removes a deprecated pattern and eliminates a build-time dependency before adding any new visual elements.
**Delivers:** Clean `LandingCTA.astro` with QR block and `import QRCode` fully removed; `qrcode` removed from `package.json`; Lighthouse CLS = 0 confirmed; App Store badge visual balance verified at desktop widths
**Addresses:** QR code removal (table stakes)
**Avoids:** B7 (complete DOM removal not CSS-hide — no layout footprint, no CLS risk)

### Phase 4: Typography Weight Rollout
**Rationale:** Depends on Phase 1 token system. Requires touching multiple files but each change is a one-liner variable swap. Typography changes affect hero heading size and visual breathing room — must be locked before Matisse shapes are authored against that layout.
**Delivers:** Light headings (300) and heavier body (500–600) on all 10 pages and 12 components; `body { font-weight: var(--weight-body) }` inheritance cut in `global.css`; zero inline `font-weight` values remaining outside `global.css`
**Addresses:** Typography weight contrast (table stakes + primary differentiator)
**Avoids:** B5 (single atomic commit, not page-by-page), B6 (inheritance cut prevents light weight reaching small text — `font-weight: 300` only on elements >= 28px)

### Phase 5: Matisse SVG Art Direction
**Rationale:** Highest creative iteration risk — requires design work (SVG path authoring) before code work. Benefits from all foundation phases being stable: CSS color tokens resolve immediately, hero typography is locked, device frame is in its final state. SVGO pipeline must be established as the first step of this phase.
**Delivers:** `MatisseFrieze.astro` with 8–12 SVGO-optimized organic paths; integrated into `Hero.astro` below the device frame in DOM order; art sub-palette derived from existing CSS variables (no raw hex in SVG); < 400 total DOM nodes for the frieze; verified Lighthouse LCP element unchanged
**Addresses:** Matisse cut-out SVG frieze (primary visual differentiator)
**Avoids:** B1 (SVGO pipeline first, < 400 node budget), B2 (no static `<clipPath>` IDs — use fills only), B3 (frieze after DeviceFrame in DOM source order; LCP verified after placement), B11 (palette derived from tokens), B12 (if any animation: `transform`/`opacity` only, never `fill`/`stroke`/`d`)

### Phase 6: Interaction Polish Audit
**Rationale:** Subjective and iterative — do last when all structural changes are stable so polish decisions are not revisited as elements change. The `@view-transition` CSS is already active from Phase 1. This phase audits existing micro-interactions and adds targeted smooth navigation.
**Delivers:** Consistent `transition` declarations on nav/footer links; verified MobileMenu drawer animation; smooth anchor navigation via JS `scrollIntoView({ behavior: 'smooth' })` on specific links (not global CSS); Lenis added only if momentum scroll confirmed as a design goal
**Addresses:** Smooth anchor navigation (table stakes), overall flow polish (differentiator)
**Avoids:** B9 (no global `scroll-behavior: smooth` on `html` or `body` — Safari 15.4 bug breaks `window.scrollTo()`, IO timing jank), B10 (already resolved in Phase 1 — no `<ViewTransitions />` in the codebase)

### Phase Ordering Rationale

- CSS Foundation first because the `--weight-*` token system is consumed by Phase 4, the font config must precede any `font-weight: 300` CSS, and the ViewTransitions/IO incompatibility is resolved declaratively before it can be accidentally triggered.
- DeviceFrame second because it is the visual anchor for the hero — Matisse shapes must be positioned knowing the final frame layout and size.
- QR removal third because it is purely subtractive with no dependencies — the fastest win and a clean base before adding new elements.
- Typography before Matisse because heading size and weight affect vertical rhythm and visual breathing room — art shapes must be authored against the locked text hierarchy.
- Matisse last among structural changes because it requires the most creative iteration and is the only phase with a design-work prerequisite (SVG path authoring).
- Interaction polish last because it is subjective, and the main tool (CSS `@view-transition`) was already deployed in Phase 1.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 5 (Matisse SVG):** SVG path authoring is creative/craft work with no single right answer. Shape design requires Figma or Inkscape work outside code. Recommend a visual prototype pass (static SVG comped in browser) before committing paths. SVGO configuration (`floatPrecision`, `removeGroups`, `mergePaths`) may need tuning per shape complexity.

Phases with standard patterns (skip research-phase):
- **Phase 1 (CSS Foundation):** `@view-transition` syntax and Tailwind v4 token patterns are fully documented with official sources. One-line font config change is deterministic.
- **Phase 2 (DeviceFrame):** CSS-only component edit with clear before/after spec in FEATURES.md and ARCHITECTURE.md; percentage-based offset pattern is established.
- **Phase 3 (QR Removal):** Deletion — no research needed.
- **Phase 4 (Typography):** Token swap pattern is deterministic; font config is one line; grep verifies completion.
- **Phase 6 (Interaction Polish):** Audit-and-patch guided by pitfall checklist; Lenis integration is documented vanilla JS.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro 6 Font API variable font syntax confirmed in official docs; `@view-transition` confirmed with browser support matrix (Chrome 126, Edge 126, Safari 18.2); Lenis v1.3.23 vanilla JS usage confirmed; ClientRouter conflict documented in Astro GitHub issue #12725 |
| Features | HIGH | Table stakes derived from direct competitive analysis (TrainingPeaks, Garmin, WHOOP); differentiators cross-validated against MDN, Codrops, MoMA reference; anti-features grounded in specific Lighthouse metrics |
| Architecture | HIGH | Based on direct codebase inspection of existing component tree — named files, concrete CSS class names, confirmed observer pattern; integration points are specific, not approximations |
| Pitfalls | HIGH | Critical pitfalls (B10, B4, B1) have confirmed bug reports and official issue tracker references (Astro #9650, Lighthouse #6807, W3C CSSWG #8269); Safari `scroll-behavior` bug confirmed on Apple Developer Forums |

**Overall confidence:** HIGH

### Gaps to Address

- **General Sans variable vs. static font files:** STACK.md describes General Sans as a variable font (single weight axis); ARCHITECTURE.md notes Fontshare may serve separate static files per weight. Both are true — Fontshare provides both. Using the `"200 700"` range syntax in the Astro Font API resolves this: the API downloads whichever format Fontshare provides. Verify in the Network tab after the Phase 1 config change — confirm a WOFF2 file appears for weight 300.
- **Lenis inclusion decision:** Research recommends Lenis only if momentum scroll is a confirmed design goal. This is a product owner decision, not a technical gap. Resolve before Phase 6 begins.
- **Matisse shape authoring:** The SVG paths for the frieze do not exist and must be authored in Figma or Inkscape. This is design work. Plan for a design prototype pass as the first step of Phase 5 — code cannot begin until paths exist.

## Sources

### Primary (HIGH confidence)
- [Astro Font Provider API docs](https://docs.astro.build/en/reference/font-provider-reference/) — variable font weight range syntax, `weights` array behavior
- [Astro zero-JS view transitions blog](https://astro.build/blog/future-of-astro-zero-js-view-transitions/) — `@view-transition { navigation: auto }` canonical reference, browser support
- [Astro view transitions docs](https://docs.astro.build/en/guides/view-transitions/) — ClientRouter vs. native CSS guidance
- [MDN CSS scroll-driven animations](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations) — `animation-timeline: scroll()`, browser support matrix
- [Lenis GitHub — darkroomengineering/lenis](https://github.com/darkroomengineering/lenis) — v1.3.23, vanilla JS, npm package name
- [Astro + Lenis ClientRouter conflict issue #12725](https://github.com/withastro/astro/issues/12725) — conflict confirmed; mitigated by using native transitions
- [Lighthouse issue #6807](https://github.com/GoogleChrome/lighthouse/issues/6807) — SVG nodes counted in DOM size audit
- [Astro Font API issue #14819](https://github.com/withastro/astro/issues/14819) — variable font loading verification required
- [W3C CSSWG issue #8269](https://github.com/w3c/csswg-drafts/issues/8269) — ViewTransitions + IntersectionObserver incompatibility (unresolved as of 2026)
- [Astro GitHub issue #9650](https://github.com/withastro/astro/issues/9650) — IO fires immediately after ViewTransitions navigation
- [Apple Developer Forums — scroll-behavior breaks JS scroll](https://developer.apple.com/forums/thread/703294) — Safari 15.4+ bug confirmed
- Direct codebase inspection: `src/styles/global.css`, `src/components/DeviceFrame.astro`, `src/components/Hero.astro`, `src/layouts/BaseLayout.astro` (2026-05-14)

### Secondary (MEDIUM confidence)
- [pimpmytype.com — General Sans](https://pimpmytype.com/font/general-sans/) — variable font axis confirmed, ExtraLight–Bold range
- [Interop 2026 — WebKit](https://webkit.org/blog/17818/announcing-interop-2026/) — scroll-driven animations and view transitions as cross-browser focus areas
- [Dev.to: CSS scroll-driven animations 2026](https://dev.to/nickbenksim/creating-complex-scroll-driven-animations-with-pure-css-in-2026-17l) — scroll-driven parallax patterns
- [MoMA Henri Matisse: The Swimming Pool](https://www.moma.org/interactives/exhibitions/2014/matisse/the-swimming-pool.html) — art direction reference; horizontal frieze, biomorphic forms
- [SVGO — official GitHub](https://github.com/svg/svgo) — v4 optimization configuration, `--multipass` flag

### Tertiary (LOW confidence)
- Lenis bundle size ~3KB gzipped — consistently described across multiple sources but not independently measured from npm bundle analysis tools

---
*Research completed: 2026-05-14*
*Ready for roadmap: yes*
