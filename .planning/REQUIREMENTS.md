# Requirements — v4.1 Internationalization Follow-ups

**Defined:** 2026-05-25
**Core Value:** Convince serious athletes that Tuwa is the evidence-based workload management tool they've been missing — not another generic fitness tracker.

**Builds on:** v4.0 trilingual foundation (EN/zh/fr routing, switcher, hreflang, sitemap, Noto Sans SC).

## OG Images (Localized Social Preview)

- [ ] **I18N-15**: A build-time OG image pipeline (satori + @resvg/resvg-js) generates per-locale, per-page PNG preview cards for all translated pages
- [ ] **I18N-16**: Chinese OG cards render Chinese text in Noto Sans SC with correct weight (no tofu/empty boxes, no thin-bold fallback); French cards render accented Latin correctly
- [ ] **I18N-17**: Every zh and fr page references its locale-specific OG image (no English-text card served on a translated page)

## Blog Internationalization

- [ ] **I18N-18**: The blog content collection supports a per-post `locale` field (+ canonical/translation key) with type-safe Zod schema
- [ ] **I18N-19**: zh and fr blog routes (`/zh/blog/...`, `/fr/blog/...`) serve only posts authored for that locale; untranslated posts are hidden, never English-fallback
- [ ] **I18N-20**: Blog listing pages filter posts by locale, and hreflang on blog pages reflects only the locales a post actually exists in (English-only posts emit only `hreflang="en"` + `x-default`)

## Locale Formatting

- [x] **I18N-21**: A shared formatting utility formats dates per locale (en-US / zh-CN / fr-FR) via native `Intl`; blog post dates and listing cards use it (no hardcoded locale strings)

## Out of Scope

- **Translated URL slugs** — deferred (marginal SEO for short technical slugs; high ripple cost across switcher/hreflang/sitemap). Revisit only with Search Console data showing zh/fr keyword impressions.
- Runtime/on-demand OG generation — requires SSR adapter, incompatible with static Cloudflare Pages
- English fallback for untranslated blog posts — breaks the language promise, creates duplicate-content risk
- Additional languages (ja/es/de) — separate future milestone
- New blog content authoring — infrastructure only; writing posts is content work, not this milestone

## Future Requirements

- Translated URL slugs (if Search Console justifies)
- Blog post authoring workflow / first real posts
- Additional languages

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| I18N-15 | Phase 25 | Pending |
| I18N-16 | Phase 25 | Pending |
| I18N-17 | Phase 25 | Pending |
| I18N-18 | Phase 24 | Pending |
| I18N-19 | Phase 24 | Pending |
| I18N-20 | Phase 24 | Pending |
| I18N-21 | Phase 23 | Complete |
