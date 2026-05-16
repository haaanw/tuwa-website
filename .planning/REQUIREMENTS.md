# Requirements — v4.0 Multi-Language Support

**Defined:** 2026-05-16
**Core Value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing — not another generic fitness tracker.

## Routing & Infrastructure

- [ ] **I18N-01**: Site serves pages at /zh/ and /fr/ URL prefixes with English as unprefixed default
- [ ] **I18N-02**: Translation utility (`t()` function) loads locale-specific strings from JSON/TS dictionary files
- [ ] **I18N-03**: Chinese font (Noto Sans SC) loads via unicode-range subsetting — zero impact on English page performance

## UI & Navigation

- [ ] **I18N-04**: Language switcher component in header allows switching between en/zh/fr on any page
- [ ] **I18N-05**: All navigation links (header, footer, mobile menu) render locale-aware paths

## Content — Landing & Features

- [ ] **I18N-06**: Landing page fully translated (hero, feature overview, stats, CTAs) in zh and fr
- [ ] **I18N-07**: 5 feature deep-dive pages fully translated in zh and fr
- [ ] **I18N-08**: Feature page layouts handle French text expansion without layout breaks

## Content — Legal & Support

- [ ] **I18N-09**: Privacy, Terms, and Support pages translated in zh and fr

## Content — Blog

- [ ] **I18N-10**: Blog listing page translated with i18n routing wired for future translated posts

## SEO & Metadata

- [ ] **I18N-11**: hreflang tags on all pages referencing all locale variants + x-default
- [ ] **I18N-12**: Localized OG metadata (title, description) per locale per page
- [ ] **I18N-13**: Sitemap includes all locale URLs
- [ ] **I18N-14**: Locale-specific 404 pages

## Out of Scope

- RTL language support — not needed for zh/fr
- Translation CMS or external translation management — manual files sufficient at this scale
- Per-locale App Store badges — use same English badge across all locales
- Dark mode per locale — single light theme

## Future Requirements

- Additional languages (Japanese, Spanish, German)
- Blog post translation workflow
- Translation contributor guide

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| I18N-01 | Phase 17 | Pending |
| I18N-02 | Phase 17 | Pending |
| I18N-03 | Phase 17 | Pending |
| I18N-04 | Phase 18 | Pending |
| I18N-05 | Phase 18 | Pending |
| I18N-06 | Phase 19 | Pending |
| I18N-07 | Phase 20 | Pending |
| I18N-08 | Phase 20 | Pending |
| I18N-09 | Phase 21 | Pending |
| I18N-10 | Phase 21 | Pending |
| I18N-11 | Phase 22 | Pending |
| I18N-12 | Phase 22 | Pending |
| I18N-13 | Phase 22 | Pending |
| I18N-14 | Phase 22 | Pending |
