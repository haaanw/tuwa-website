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

- [ ] **ART-01**: Organic cut-out SVG shapes authored (Matisse Swimming Pool inspired)
- [ ] **ART-02**: Shapes arranged as continuous frieze/strip (条带) in hero section
- [ ] **ART-03**: SVGO-optimized SVGs keep DOM node count within Lighthouse budget
- [ ] **ART-04**: Lighter decorative Matisse touches on feature deep-dive pages
- [ ] **ART-05**: Scroll-driven parallax movement on cut-out shapes
- [ ] **ART-06**: Entrance animations on Matisse cut-out elements

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
| TYPO-01 | — | Pending |
| TYPO-02 | — | Pending |
| TYPO-03 | — | Pending |
| TYPO-04 | — | Pending |
| TYPO-05 | — | Pending |
| DFRM-01 | — | Pending |
| DFRM-02 | — | Pending |
| DFRM-03 | — | Pending |
| DFRM-04 | — | Pending |
| DFRM-05 | — | Pending |
| CTA-01 | — | Pending |
| CTA-02 | — | Pending |
| CTA-03 | — | Pending |
| ART-01 | — | Pending |
| ART-02 | — | Pending |
| ART-03 | — | Pending |
| ART-04 | — | Pending |
| ART-05 | — | Pending |
| ART-06 | — | Pending |
| IXPN-01 | — | Pending |
| IXPN-02 | — | Pending |
| IXPN-03 | — | Pending |
| IXPN-04 | — | Pending |
| IXPN-05 | — | Pending |

**Coverage:**
- v3.0 requirements: 24 total
- Mapped to phases: 0
- Unmapped: 24 ⚠️

---
*Requirements defined: 2026-05-14*
*Last updated: 2026-05-14 after initial definition*
