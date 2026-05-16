# Roadmap: Tuwa Marketing Website

## Milestones

- ✅ **v1.0 MVP** — Phases 1-4 (shipped 2026-05-11)
- ✅ **v2.0 Visual Overhaul & Polish** — Phases 5-10 (shipped 2026-05-14)
- 🚧 **v3.0 Art Direction & Interaction Polish** — Phases 11-16 (in progress)

## Phases

<details>
<summary>✅ v1.0 MVP (Phases 1-4) — SHIPPED 2026-05-11</summary>

- [x] Phase 1: Foundation (3/3 plans) — completed 2026-05-10
- [x] Phase 2: Landing Page (2/2 plans) — completed 2026-05-10
- [x] Phase 3: Content Pages (4/4 plans) — completed 2026-05-11
- [x] Phase 4: Blog + Polish (3/3 plans) — completed 2026-05-11

</details>

<details>
<summary>✅ v2.0 Visual Overhaul & Polish (Phases 5-10) — SHIPPED 2026-05-14</summary>

- [x] Phase 5: Animation Infrastructure (1/1 plan) — completed 2026-05-11
- [x] Phase 6: Screenshot Presentation (2/2 plans) — completed 2026-05-11
- [x] Phase 7: Animation Polish (2/2 plans) — completed 2026-05-12
- [x] Phase 8: UI/UX Visual Depth (4/4 plans) — completed 2026-05-13
- [x] Phase 8.1: FeatureGrid Click Wheel (1/1 plan) — completed 2026-05-14
- [x] Phase 9: Deployment & Responsive (2/2 plans) — completed 2026-05-14
- [x] Phase 10: v2.0 Cleanup (1/1 plan) — completed 2026-05-14

</details>

### v3.0 Art Direction & Interaction Polish (In Progress)

**Milestone Goal:** Transform site visual identity with Matisse-inspired art direction, a precision typography weight system, realistic device frames, and premium interaction feel — all while preserving the Lighthouse 98/99 baseline.

- [x] **Phase 11: CSS Foundation & Token System** - Load variable font, define weight tokens, wire view transitions (completed 2026-05-15)
- [x] **Phase 12: Device Frame Realism** - Multi-layer shadow, Dynamic Island, screenshot fit fix (completed 2026-05-15)
- [x] **Phase 13: QR Code Removal** - Remove QR block and adjacent badge section, verify CLS = 0 (completed 2026-05-15)
- [x] **Phase 14: Typography Weight Rollout** - Apply light headings + heavier body across all 10 pages (completed 2026-05-15)
- [x] **Phase 15: Matisse SVG Art Direction** - Author frieze shapes, integrate hero, add parallax and entrance animations (completed 2026-05-15)
- [x] **Phase 16: Interaction Polish** - Hover micro-interactions, magnetic CTA, Lenis scroll, audit pass (completed 2026-05-16)

## Phase Details

### Phase 11: CSS Foundation & Token System
**Goal**: The site has a working variable-font weight axis, CSS weight design tokens, view-transition page crossfades, and Matisse CSS class scaffolding — without any visible change to current design
**Depends on**: Phase 10 (complete)
**Requirements**: TYPO-01, TYPO-02, IXPN-01, IXPN-02
**Success Criteria** (what must be TRUE):
  1. Network tab shows a single WOFF2 file loaded for General Sans covering weights 200-700 (not five separate files)
  2. DevTools shows `--weight-display`, `--weight-heading`, `--weight-body`, `--weight-label` defined in `:root`
  3. Navigating between any two pages produces a visible crossfade animation in Chrome 126+ and Safari 18.2+
  4. Existing scroll-reveal animations still fire correctly on page load after navigation (IO not broken)
  5. `.matisse-frieze` and `.matisse-shape` CSS classes exist in the stylesheet and `prefers-reduced-motion` guards are in place
**Plans:** 1/1 plans complete
Plans:
- [x] 11-01-PLAN.md — Variable font, weight tokens, view transitions, Matisse stubs

### Phase 12: Device Frame Realism
**Goal**: The CSS iPhone device frames look like physical hardware — with layered shadow falloff, a proportional Dynamic Island, visible side buttons, and screenshots that fit without misalignment
**Depends on**: Phase 11
**Requirements**: DFRM-01, DFRM-02, DFRM-03, DFRM-04, DFRM-05
**Success Criteria** (what must be TRUE):
  1. Device frame displays a Dynamic Island notch with proportions that match an actual iPhone 15 Pro
  2. Side button pseudo-elements are visible and scale correctly at 260px, 300px, and 320px frame widths
  3. Shadow has 4-5 distinct layers creating a soft, natural light falloff (visible on white background)
  4. Screen interior has an inset shadow making the display appear recessed into the bezel
  5. All screenshots fill the frame correctly with no extra border gap or text misalignment
**Plans:** 1/1 plans complete
Plans:
- [x] 12-01-PLAN.md — Device frame CSS realism: shadow, Dynamic Island, side buttons, screen inset, screenshot fit
**UI hint**: yes

### Phase 13: QR Code Removal
**Goal**: The QR code block and adjacent App Store badge section are fully removed from the landing page — no hidden DOM footprint, no layout shift
**Depends on**: Phase 11
**Requirements**: CTA-01, CTA-02, CTA-03
**Success Criteria** (what must be TRUE):
  1. The QR code and adjacent App Store badge section do not appear anywhere on the landing page
  2. Lighthouse CLS score remains 0 after removal (no layout shift from the deleted block)
  3. Header button, hero CTA button, and footer CTA button all remain functional and navigable
**Plans:** 1/1 plans complete
Plans:
- [x] 13-01-PLAN.md — Remove QR code, badge, and qrcode dependency from LandingCTA

### Phase 14: Typography Weight Rollout
**Goal**: All 10 pages display the weight contrast system — large light headings (weight 300) and smaller heavier body text (weight 500+) — with no hardcoded font-weight values remaining outside global.css
**Depends on**: Phase 11
**Requirements**: TYPO-03, TYPO-04, TYPO-05
**Success Criteria** (what must be TRUE):
  1. All page titles and section headings are visibly lighter than body text (observable contrast without DevTools)
  2. Body paragraphs and labels appear measurably bolder than headings at the same size
  3. Typography weight system is consistent across all 10 pages (landing, 5 feature pages, blog listing, privacy, terms, support)
  4. A grep for hardcoded `font-weight` values outside `global.css` returns zero results
**Plans:** 2/2 plans complete
Plans:
- [x] 14-01-PLAN.md — Migrate 8 component files to weight tokens (Hero, StatsCounter, Footer, MobileMenu, FaqAccordion, FeatureGrid, FeatureCTA, LandingCTA)
- [x] 14-02-PLAN.md — Migrate 4 layouts, 7 pages, and 6 global.css selectors to weight tokens
**UI hint**: yes

### Phase 15: Matisse SVG Art Direction
**Goal**: The hero section features a continuous organic cut-out frieze of Matisse-inspired shapes, lighter decorative touches appear on feature deep-dive pages, and shapes animate on scroll and entrance — all within Lighthouse DOM budget
**Depends on**: Phase 14
**Requirements**: ART-01, ART-02, ART-03, ART-04, ART-05, ART-06
**Success Criteria** (what must be TRUE):
  1. The hero section displays a full-width horizontal band of blue abstract human movement SVG shapes on a pale pool-wall frieze band
  2. Feature deep-dive pages each show a lighter decorative Matisse element (not the full frieze)
  3. Matisse shapes shift vertically at a different rate than the page scroll (visible parallax effect)
  4. Shapes animate into view on page load with an entrance sequence
  5. Lighthouse DOM size audit stays within budget (no "Avoid an excessive DOM size" warning) and LCP element is unchanged
**Plans:** 2/2 plans complete
Plans:
- [x] 15-01-PLAN.md — Shape vocabulary, Astro components (MatisseShape, MatisseFrieze, MatisseDecoration), CSS animations and parallax
- [x] 15-02-PLAN.md — Hero frieze integration, cluster feature-page decoration, visual verification checkpoint
**UI hint**: yes

### Phase 16: Interaction Polish
**Goal**: Every interactive element on the site has a smooth, intentional transition; primary CTA buttons have a magnetic hover pull; and page-to-page navigation feels momentum-driven and cohesive
**Depends on**: Phase 15
**Requirements**: IXPN-03, IXPN-04, IXPN-05
**Success Criteria** (what must be TRUE):
  1. Hovering nav links, footer links, and cards produces consistent smooth transition animations (no abrupt state changes)
  2. Primary CTA buttons respond to cursor proximity with a subtle magnetic pull effect
  3. Page scroll has a momentum feel (either via Lenis or confirmed design decision to use native scroll)
  4. Anchor navigation scrolls smoothly to target sections without triggering Safari scroll jank
**Plans:** 2/2 plans complete
Plans:
- [x] 16-01-PLAN.md — Easing token + hover micro-interaction audit
- [x] 16-02-PLAN.md — Lenis momentum scroll + magnetic CTA effect

## Progress

| Phase | Milestone | Plans Complete | Status | Completed |
|-------|-----------|----------------|--------|-----------|
| 1. Foundation | v1.0 | 3/3 | Complete | 2026-05-10 |
| 2. Landing Page | v1.0 | 2/2 | Complete | 2026-05-10 |
| 3. Content Pages | v1.0 | 4/4 | Complete | 2026-05-11 |
| 4. Blog + Polish | v1.0 | 3/3 | Complete | 2026-05-11 |
| 5. Animation Infrastructure | v2.0 | 1/1 | Complete | 2026-05-11 |
| 6. Screenshot Presentation | v2.0 | 2/2 | Complete | 2026-05-11 |
| 7. Animation Polish | v2.0 | 2/2 | Complete | 2026-05-12 |
| 8. UI/UX Visual Depth | v2.0 | 4/4 | Complete | 2026-05-13 |
| 8.1 FeatureGrid Click Wheel | v2.0 | 1/1 | Complete | 2026-05-14 |
| 9. Deployment & Responsive | v2.0 | 2/2 | Complete | 2026-05-14 |
| 10. v2.0 Cleanup | v2.0 | 1/1 | Complete | 2026-05-14 |
| 11. CSS Foundation & Token System | v3.0 | 1/1 | Complete    | 2026-05-15 |
| 12. Device Frame Realism | v3.0 | 1/1 | Complete    | 2026-05-15 |
| 13. QR Code Removal | v3.0 | 1/1 | Complete    | 2026-05-15 |
| 14. Typography Weight Rollout | v3.0 | 2/2 | Complete    | 2026-05-15 |
| 15. Matisse SVG Art Direction | v3.0 | 2/2 | Complete | 2026-05-15 |
| 16. Interaction Polish | v3.0 | 2/2 | Complete   | 2026-05-16 |
