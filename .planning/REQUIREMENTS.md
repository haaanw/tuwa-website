# Requirements: Tuwa Marketing Website

**Defined:** 2026-05-11
**Core Value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing — not another generic fitness tracker.

## v2.0 Requirements

Requirements for visual overhaul milestone. Each maps to roadmap phases.

### Animation Infrastructure

- [ ] **ANIM-01**: Fix duplicated IntersectionObserver bug — single AnimationController in BaseLayout
- [ ] **ANIM-02**: Add `prefers-reduced-motion` guard in global.css animation section
- [x] **ANIM-03**: Stagger delays on card grids and feature lists via `data-animate-delay`
- [x] **ANIM-04**: Hero entrance choreography (sequenced device + text reveal)
- [x] **ANIM-05**: Sticky scroll showcase on at least one feature deep-dive page (Oura-style)

### Screenshot Presentation

- [x] **SHOT-01**: Re-export all app screenshots at 3x resolution from Xcode Simulator
- [x] **SHOT-02**: Implement proper srcset/DPR handling via Astro `<Image>` component
- [x] **SHOT-03**: Build CSS-only iPhone device frame component (DeviceFrame.astro)
- [x] **SHOT-04**: Replace ScreenshotBlock with DeviceFrame across all feature pages
- [x] **SHOT-05**: Generate polished hero mockup images via Screenhance or equivalent tool

### UI/UX Polish

- [x] **UIPX-01**: Spacing and typography consistency pass across all pages
- [x] **UIPX-02**: Hover micro-interactions on buttons, links, and navigation
- [x] **UIPX-03**: Card hover lift effects on feature cards and blog listing
- [x] **UIPX-04**: Noise texture and glass morphism accents on key sections
- [x] **UIPX-05**: Bento grid layout for feature overview or equivalent high-impact section _(superseded by Phase 8.1 click wheel)_
- [x] **UIPX-06**: Animated counters for key metrics (athletes served, workouts tracked)

### Deployment & Responsive

- [ ] **DEPL-01**: Configure Cloudflare Pages deployment (build command, output dir, NODE_VERSION=22)
- [ ] **DEPL-02**: Replace placeholder App Store badge SVG with official Apple asset
- [ ] **DEPL-03**: Responsive design testing and fixes across all breakpoints (mobile, tablet, desktop)
- [ ] **DEPL-04**: Maintain Lighthouse Performance >= 95 on both mobile and desktop after all changes

## Future Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content

- **CONT-01**: First blog post (training load management explainer)
- **CONT-02**: Case study page (athlete testimonial with data)

### Advanced Visual

- **ADVZ-01**: Video hero background (app walkthrough)
- **ADVZ-02**: Dark mode support

## Out of Scope

| Feature | Reason |
|---------|--------|
| GSAP / heavy animation libraries | 48KB+ overkill for marketing site; CSS + minimal JS sufficient |
| Framer Motion | Requires React; incompatible with Astro zero-JS philosophy |
| Video autoplay hero | LCP killer; defer until performance budget allows |
| CMS integration | No non-technical editors; MDX + Git is simpler |
| Internationalization | English only for foreseeable future |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| ANIM-01 | Phase 5 | Complete |
| ANIM-02 | Phase 5 | Complete |
| ANIM-03 | Phase 10 | Complete |
| ANIM-04 | Phase 7 | Complete |
| ANIM-05 | Phase 7 | Complete |
| SHOT-01 | Phase 6 | Complete |
| SHOT-02 | Phase 6 | Complete |
| SHOT-03 | Phase 6 | Complete |
| SHOT-04 | Phase 6 | Complete |
| SHOT-05 | Phase 6 | Complete |
| UIPX-01 | Phase 8 | Complete |
| UIPX-02 | Phase 8 | Complete |
| UIPX-03 | Phase 8 | Complete |
| UIPX-04 | Phase 8 | Complete |
| UIPX-05 | Phase 10 | Superseded (click wheel) |
| UIPX-06 | Phase 8 | Complete |
| DEPL-01 | Phase 9 | Complete |
| DEPL-02 | Phase 9 | Complete |
| DEPL-03 | Phase 9 | Complete |
| DEPL-04 | Phase 9 | Complete |

**Coverage:**
- v2.0 requirements: 20 total
- Mapped to phases: 20
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-11*
*Last updated: 2026-05-14 after Phase 10 v2.0 cleanup*
