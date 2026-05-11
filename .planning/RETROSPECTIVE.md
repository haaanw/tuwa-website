# Retrospective: Tuwa Marketing Website

## Milestone: v1.0 — MVP

**Shipped:** 2026-05-11
**Phases:** 4 | **Plans:** 12

### What Was Built
- Astro 6 + Tailwind v4 foundation with design token system
- Landing page with hero, app screenshots, feature grid, App Store CTA
- 5 feature deep-dive pages with Chart.js visualizations
- Blog infrastructure (MDX collection, listing, post layout, reading time)
- Legal pages migrated with Cloudflare 301 redirects
- SEO: robots.txt, branded OG images, sitemap, Lighthouse >= 95

### What Worked
- Phase-by-phase execution kept scope tight — each phase built on the last cleanly
- Design token system (Phase 1) paid off across all subsequent phases — consistent spacing/colors
- Reusable layout components (FeaturePageLayout, LegalPageLayout) made Phase 3 feature pages fast
- Astro Font API handled font preloading/hashing automatically — zero FOUT issues
- Human verification checkpoints caught real issues (visual QA, Lighthouse)

### What Was Inefficient
- Font switch from Alpino to General Sans in Phase 4 required touching files already modified in Phase 1 — would have been cleaner to decide font earlier
- CSS variable override bug (global.css clobbering Astro Font API's hashed name) wasn't caught until Codex cross-AI review — automated tests for font loading would prevent this class of bug
- Phase 2 ROADMAP status wasn't marked complete by executor agent (minor tracking gap)

### Patterns Established
- FeaturePageLayout pattern: hero → explanation → screenshot → CTA (reusable for future feature pages)
- OG image generation: temp script → sharp → delete script (used in both Phase 2 and Phase 4)
- Design tokens in global.css :root — spacing, colors, typography all centralized
- Blog draft filter: `!import.meta.env.PROD || !data.draft` — consistent across listing and route

### Key Lessons
- Astro Font API owns the CSS variable — never redeclare font variables in global.css
- @astrojs/sitemap generates sitemap-index.xml, not sitemap.xml — reference correctly in robots.txt
- @astrojs/cloudflare adapter is NOT needed for static output — causes deployment failures
- Tailwind v4 uses @tailwindcss/vite in vite.plugins, NOT @astrojs/tailwind in integrations

## Cross-Milestone Trends

| Metric | v1.0 |
|--------|------|
| Phases | 4 |
| Plans | 12 |
| Timeline | 2 days |
| LOC | 2,399 |
| Pages | 10 |
