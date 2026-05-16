# Roadmap: Tuwa Marketing Website

## Milestones

- v1.0 MVP -- Phases 1-4 (shipped 2026-05-11)
- v2.0 Visual Overhaul & Polish -- Phases 5-10 (shipped 2026-05-14)
- v3.0 Art Direction & Interaction Polish -- Phases 11-16 (shipped 2026-05-16)
- v4.0 Multi-Language Support -- Phases 17-22 (in progress)

## Phases

<details>
<summary>v1.0 MVP (Phases 1-4) -- SHIPPED 2026-05-11</summary>

- [x] Phase 1: Foundation (3/3 plans) -- completed 2026-05-10
- [x] Phase 2: Landing Page (2/2 plans) -- completed 2026-05-10
- [x] Phase 3: Content Pages (4/4 plans) -- completed 2026-05-11
- [x] Phase 4: Blog + Polish (3/3 plans) -- completed 2026-05-11

</details>

<details>
<summary>v2.0 Visual Overhaul & Polish (Phases 5-10) -- SHIPPED 2026-05-14</summary>

- [x] Phase 5: Animation Infrastructure (1/1 plan) -- completed 2026-05-11
- [x] Phase 6: Screenshot Presentation (2/2 plans) -- completed 2026-05-11
- [x] Phase 7: Animation Polish (2/2 plans) -- completed 2026-05-12
- [x] Phase 8: UI/UX Visual Depth (4/4 plans) -- completed 2026-05-13
- [x] Phase 8.1: FeatureGrid Click Wheel (1/1 plan) -- completed 2026-05-14
- [x] Phase 9: Deployment & Responsive (2/2 plans) -- completed 2026-05-14
- [x] Phase 10: v2.0 Cleanup (1/1 plan) -- completed 2026-05-14

</details>

<details>
<summary>v3.0 Art Direction & Interaction Polish (Phases 11-16) -- SHIPPED 2026-05-16</summary>

- [x] Phase 11: CSS Foundation & Token System (1/1 plan) -- completed 2026-05-15
- [x] Phase 12: Device Frame Realism (1/1 plan) -- completed 2026-05-15
- [x] Phase 13: QR Code Removal (1/1 plan) -- completed 2026-05-15
- [x] Phase 14: Typography Weight Rollout (2/2 plans) -- completed 2026-05-15
- [x] Phase 15: Matisse SVG Art Direction (2/2 plans) -- completed 2026-05-15
- [x] Phase 16: Interaction Polish (2/2 plans) -- completed 2026-05-16

</details>

### v4.0 Multi-Language Support (In Progress)

**Milestone Goal:** Add Chinese (zh) and French (fr) translations to all 10 pages with proper i18n routing, a language switcher, and full SEO compliance (hreflang, localized sitemap, per-locale 404s).

- [ ] **Phase 17: i18n Infrastructure** - Astro i18n routing, translation utility, CJK font integration
- [ ] **Phase 18: Component Extraction** - Language switcher, locale-aware navigation across header/footer
- [ ] **Phase 19: Home Page Localization** - Prove end-to-end pattern with landing page in zh and fr
- [ ] **Phase 20: Feature Pages** - 5 feature deep-dive pages translated in zh and fr
- [ ] **Phase 21: Legal, Support & Blog** - Privacy, Terms, Support, and Blog listing translated
- [ ] **Phase 22: SEO Verification & Polish** - hreflang, sitemap, locale 404s, Lighthouse audit

## Phase Details

### Phase 17: i18n Infrastructure
**Goal**: The site has working locale routing, a type-safe translation utility, and CJK font loading -- without any visible content changes to existing English pages
**Depends on**: Phase 16 (complete)
**Requirements**: I18N-01, I18N-02, I18N-03
**Success Criteria** (what must be TRUE):
  1. Navigating to /zh/ or /fr/ serves a page (even if content is English fallback) without 404
  2. A `t()` utility function resolves translation keys from per-page TypeScript dictionary files with full type safety (IDE autocomplete works)
  3. Chinese text renders in Noto Sans SC on /zh/ pages with no visible Times New Roman fallback
  4. English pages at unprefixed URLs load identically to before (no performance regression, no new network requests)
**Plans**: TBD

### Phase 18: Component Extraction
**Goal**: Users can switch languages from any page, and all navigation links route correctly within the chosen locale
**Depends on**: Phase 17
**Requirements**: I18N-04, I18N-05
**Success Criteria** (what must be TRUE):
  1. A language switcher is visible in the header on every page and allows switching between en/zh/fr
  2. Clicking a nav link while on a /zh/ page navigates to the /zh/ variant of the target page (not back to English)
  3. Footer links, mobile menu links, and CTA buttons all respect the current locale context
  4. Language switcher preserves the current page when switching (e.g., /zh/recovery-scoring switches to /fr/recovery-scoring)
**Plans**: TBD
**UI hint**: yes

### Phase 19: Home Page Localization
**Goal**: The landing page is fully readable and natural in Chinese and French, proving the translation pattern works end-to-end
**Depends on**: Phase 18
**Requirements**: I18N-06
**Success Criteria** (what must be TRUE):
  1. /zh/ displays the complete landing page (hero, feature overview, stats, CTAs) in Chinese with no English fragments
  2. /fr/ displays the complete landing page in French with no English fragments
  3. French text expansion does not cause layout breaks, overflow, or truncation on any viewport width
  4. CJK line breaking is natural (no mid-word breaks, proper punctuation handling)
**Plans**: TBD
**UI hint**: yes

### Phase 20: Feature Pages
**Goal**: All 5 feature deep-dive pages are fully translated and visually intact in both Chinese and French
**Depends on**: Phase 19
**Requirements**: I18N-07, I18N-08
**Success Criteria** (what must be TRUE):
  1. All 5 feature pages (/zh/recovery-scoring, /zh/workload-tracking, etc.) display fully translated Chinese content
  2. All 5 feature pages (/fr/recovery-scoring, /fr/workload-tracking, etc.) display fully translated French content
  3. French text expansion on feature pages does not break device frame layouts, stat counters, or CTA sections
  4. Feature-specific terminology is consistent across pages within each locale
**Plans**: TBD
**UI hint**: yes

### Phase 21: Legal, Support & Blog
**Goal**: Legal and support pages are translated (with binding-language disclaimers), and the blog listing page is i18n-wired
**Depends on**: Phase 19
**Requirements**: I18N-09, I18N-10
**Success Criteria** (what must be TRUE):
  1. Privacy, Terms, and Support pages are available at /zh/ and /fr/ with translated content
  2. Legal pages include a visible disclaimer that English is the legally binding version
  3. Blog listing page at /zh/blog and /fr/blog displays translated UI chrome (headings, empty state text) with correct locale routing
**Plans**: TBD

### Phase 22: SEO Verification & Polish
**Goal**: Search engines correctly index all locale variants, social shares show localized metadata, and broken locale URLs gracefully fallback
**Depends on**: Phase 20, Phase 21
**Requirements**: I18N-11, I18N-12, I18N-13, I18N-14
**Success Criteria** (what must be TRUE):
  1. Every page includes hreflang tags referencing all 3 locale variants plus x-default (verified in page source)
  2. Sharing a /zh/ or /fr/ page on social media shows localized title and description in the preview card
  3. Sitemap.xml includes all locale URLs (30 total: 10 pages x 3 locales) with proper hreflang annotations
  4. Navigating to a nonexistent /zh/ or /fr/ path shows a locale-appropriate 404 page (not the English 404)
  5. Lighthouse scores remain >= 95 on all locale variants (no CJK font regression)
**Plans**: TBD

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
| 11. CSS Foundation & Token System | v3.0 | 1/1 | Complete | 2026-05-15 |
| 12. Device Frame Realism | v3.0 | 1/1 | Complete | 2026-05-15 |
| 13. QR Code Removal | v3.0 | 1/1 | Complete | 2026-05-15 |
| 14. Typography Weight Rollout | v3.0 | 2/2 | Complete | 2026-05-15 |
| 15. Matisse SVG Art Direction | v3.0 | 2/2 | Complete | 2026-05-15 |
| 16. Interaction Polish | v3.0 | 2/2 | Complete | 2026-05-16 |
| 17. i18n Infrastructure | v4.0 | 0/? | Not started | - |
| 18. Component Extraction | v4.0 | 0/? | Not started | - |
| 19. Home Page Localization | v4.0 | 0/? | Not started | - |
| 20. Feature Pages | v4.0 | 0/? | Not started | - |
| 21. Legal, Support & Blog | v4.0 | 0/? | Not started | - |
| 22. SEO Verification & Polish | v4.0 | 0/? | Not started | - |
