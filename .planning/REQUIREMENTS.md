# Requirements: Tuwa Marketing Website

**Defined:** 2026-05-14
**Core Value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing — not another generic fitness tracker.

## v3.0 Requirements

Requirements for Art Direction & Interaction Polish milestone. Each maps to roadmap phases.

### Typography

- [ ] **TYPO-01**: Site loads General Sans variable font with weight range 200–700 (single file)
- [ ] **TYPO-02**: CSS `--weight-*` design tokens defined (display, heading, body, label) in global.css
- [ ] **TYPO-03**: All page titles and subtitles use large size with light weight (300 or below)
- [ ] **TYPO-04**: All body text uses smaller size with heavier weight (500+)
- [ ] **TYPO-05**: Typography weight system applied consistently across all 10 pages

### Device Frame

- [ ] **DFRM-01**: CSS device frame includes Dynamic Island notch with correct proportions
- [ ] **DFRM-02**: Side button pseudo-elements visible on device frames
- [ ] **DFRM-03**: Multi-layer shadow system (4-5 layers) for natural light falloff
- [ ] **DFRM-04**: Inset screen shadow makes display appear embedded in bezel
- [ ] **DFRM-05**: Screenshots fit device frame without extra border/text misalignment

### CTA Cleanup

- [ ] **CTA-01**: QR code and adjacent App Store download badge removed from landing page
- [ ] **CTA-02**: Layout reflows cleanly after removal (CLS = 0)
- [ ] **CTA-03**: Header button, hero button, and footer button CTAs remain functional

### Matisse Art Direction

- [x] **ART-01**: Organic cut-out SVG shapes authored (Matisse Swimming Pool inspired)
- [x] **ART-02**: Shapes arranged as continuous frieze/strip (条带) in hero section
- [x] **ART-03**: SVGO-optimized SVGs keep DOM node count within Lighthouse budget
- [x] **ART-04**: Lighter decorative Matisse touches on feature deep-dive pages
- [x] **ART-05**: Scroll-driven parallax movement on cut-out shapes
- [x] **ART-06**: Entrance animations on Matisse cut-out elements

### Interaction Polish

- [ ] **IXPN-01**: CSS `@view-transition` page crossfades between all pages
- [ ] **IXPN-02**: Existing scroll-reveal animations compatible with View Transitions (astro:page-load migration)
- [ ] **IXPN-03**: Lenis momentum scroll integrated (~3KB, Astro island)
- [ ] **IXPN-04**: Hover micro-interactions on interactive elements (buttons, links, cards)
- [ ] **IXPN-05**: Magnetic hover effects on primary CTA buttons

## Future Requirements

Deferred to future milestones. Tracked but not in current roadmap.

### Content

- **CONT-01**: First blog post published
- **CONT-02**: Case study page with athlete testimonial

### Advanced Visual

- **ADVZ-01**: Video hero background

## Out of Scope

| Feature | Reason |
|---------|--------|
| Dark mode | Descoped in PROJECT.md — light mode only |
| Blog content (posts) | Infrastructure ready, content is separate milestone |
| Custom cursor | Over-designed for a fitness app marketing site |
| 3D device frame (WebGL) | Overkill — CSS realism sufficient |
| Video hero background | Deferred from v2.0, not in v3.0 scope |
| User accounts / auth | App handles this |
| Pricing page | Subscription info lives in-app |
| i18n / multi-language | English only |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| TYPO-01 | Phase 11 | Pending |
| TYPO-02 | Phase 11 | Pending |
| TYPO-03 | Phase 14 | Pending |
| TYPO-04 | Phase 14 | Pending |
| TYPO-05 | Phase 14 | Pending |
| DFRM-01 | Phase 12 | Pending |
| DFRM-02 | Phase 12 | Pending |
| DFRM-03 | Phase 12 | Pending |
| DFRM-04 | Phase 12 | Pending |
| DFRM-05 | Phase 12 | Pending |
| CTA-01 | Phase 13 | Pending |
| CTA-02 | Phase 13 | Pending |
| CTA-03 | Phase 13 | Pending |
| ART-01 | Phase 15 | Complete |
| ART-02 | Phase 15 | Complete |
| ART-03 | Phase 15 | Complete |
| ART-04 | Phase 15 | Complete |
| ART-05 | Phase 15 | Complete |
| ART-06 | Phase 15 | Complete |
| IXPN-01 | Phase 11 | Pending |
| IXPN-02 | Phase 11 | Pending |
| IXPN-03 | Phase 16 | Pending |
| IXPN-04 | Phase 16 | Pending |
| IXPN-05 | Phase 16 | Pending |

**Coverage:**
- v3.0 requirements: 24 total
- Mapped to phases: 24
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-14*
*Last updated: 2026-05-14 after v3.0 roadmap created*
