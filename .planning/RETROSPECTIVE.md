# Retrospective: Tuwa Marketing Website

## Milestone: v4.0 — Multi-Language Support

**Shipped:** 2026-05-25
**Phases:** 6 (17-22) | **Plans:** 16

### What Was Built
- Astro i18n routing: EN unprefixed (SEO equity), /zh/ and /fr/ prefixes, type-safe `use*Translations()`
- zh + fr translations across all 10 pages; per-page namespace translation files
- Noto Sans SC for Chinese, isolated to /zh/ pages (zero CJK CSS on EN/FR)
- Path-preserving language switcher (desktop + mobile), locale-aware nav across header/footer/menu
- Full SEO i18n: hreflang + x-default, per-locale og:locale, localized sitemap, per-locale 404s

### What Worked
- Components-receive-content-via-props (locale-agnostic) pattern kept translation wiring clean
- Per-page translation namespaces (not one monolith) kept type errors local and reviewable
- Phase 19 home page as end-to-end proof before fanning out to feature/legal pages de-risked the pattern
- Parallel phases 20/21 (both depend on 19, not each other) compressed the schedule

### What Was Inefficient
- **CJK font never actually rendered until milestone close.** Every zh page set an unused CSS
  variable (`--font-sans` instead of the consumed `--font-general-sans`, with wrong font name).
  It looked fine on macOS (PingFang fallback), so it passed casual review and shipped through 6
  phases. Only browser UAT at close (`document.fonts.check`) caught it. Visual UAT was deferred
  as `human_needed` across phases 17-20 and never run until close — the defect lived the whole
  milestone.
- French header overflowed 24px at the 768px breakpoint — text-expansion not checked at the
  tablet breakpoint during phase work.
- summary-extract again produced garbled MILESTONES.md accomplishments — manual rewrite needed.

### Patterns Established
- CJK font wiring: override `--font-general-sans` scoped to `html[lang="zh"]` (beats global.css
  `:root` regardless of stylesheet order); import `@fontsource/noto-sans-sc` only in components
  used by zh pages to keep the bundle isolated. See memory `project-cjk-font-wiring`.
- Responsive nav: tighten gap at `md`, restore at `lg` to absorb longer-locale labels.

### Key Lessons
1. `human_needed` visual UAT must be run before phase sign-off, not deferred to milestone close —
   a font that silently falls back looks correct on the dev's OS and hides real breakage.
2. For i18n, verify the *computed* font (`document.fonts.check`), not just that text renders.
3. Test text-expansion locales (fr/de) at every breakpoint, especially the nav breakpoint.
4. CSS custom-property overrides need specificity OR source-order discipline — `:root` vs `:root`
   ties go to load order; scope to an attribute selector to win deterministically.

---

## Milestone: v2.0 — Visual Overhaul & Polish

**Shipped:** 2026-05-14
**Phases:** 7 (incl. 8.1 decimal) | **Plans:** 12
**Timeline:** 4 days (2026-05-10 → 2026-05-14)

### What Was Built
- Single consolidated AnimationController with reduced-motion + JS-disabled fallbacks
- CSS iPhone 15 Pro device frames on all pages with hero perspective tilt
- Choreographed animations: hero entrance, stagger delays, sticky scroll showcase
- Visual depth: noise texture, micro-interactions, animated stat counters, consistent spacing
- iPod-style SVG click wheel replacing bento grid for feature overview
- Cloudflare Pages deployment — live at tuwa.app, Lighthouse Mobile 98 / Desktop 99
- Dead CSS cleanup closing all milestone audit gaps

### What Worked
- Hard dependency chain (animation → device frames → stagger → visual depth → deploy) enforced correct execution order
- CSS-only approach worked for every animation — motion library never needed (saved 48KB+)
- DeviceFrame component reuse across all pages — build once, use everywhere
- Phase 8.1 decimal insertion worked cleanly for urgent click wheel request mid-milestone
- Milestone audit before Phase 10 caught dead CSS + stagger gaps — targeted cleanup phase was efficient
- Human verification at each phase caught real visual issues

### What Was Inefficient
- Bento grid built in Phase 8 then fully replaced by click wheel in Phase 8.1 — ~2 hours of rework
- Phase 8.1 click wheel required multiple iteration rounds (label positioning, hit areas, rotation physics) — complex interactive SVG harder to get right than anticipated
- summary-extract tool failed to parse most SUMMARY.md one-liners — manual extraction needed
- gsd-tools audit-open has a bug (ReferenceError: output is not defined) — couldn't run pre-close audit automatically

### Patterns Established
- DeviceFrame.astro: CSS-only iPhone bezel with Astro Image srcset integration
- AnimationController: single IntersectionObserver in BaseLayout, data-animate/data-animate-delay attributes
- StickyScrollController: page-scoped IO for step-based scroll content
- .section-spaced utility class: responsive section spacing via CSS custom properties
- .btn-cta hover/active micro-interaction pattern
- StatsCounter with rAF count-up animation + reduced-motion guard

### Key Lessons
1. CSS animations sufficient for marketing site — don't reach for JS animation libraries prematurely
2. Interactive SVG (click wheel) is significantly more complex than static layout — budget extra time
3. Decimal phases (8.1) work well for urgent insertions — numbering stays clear
4. Milestone audit before final cleanup phase is valuable — creates targeted, efficient cleanup scope
5. Device frame as reusable component (not baked into screenshots) enables consistent presentation

---

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

---

## Cross-Milestone Trends

| Metric | v1.0 | v2.0 |
|--------|------|------|
| Phases | 4 | 7 |
| Plans | 12 | 12 |
| Timeline | 2 days | 4 days |
| LOC | 2,399 | ~20,000 |
| Pages | 10 | 10 |
| Lighthouse (Mobile) | >= 95 | 98 |
| Lighthouse (Desktop) | >= 95 | 99 |

### Top Lessons (Verified Across Milestones)

1. CSS-first approach works — native animations and layout before reaching for JS libraries
2. Reusable component patterns (layouts, device frames) compound across phases
3. Human verification checkpoints catch issues automated checks miss
4. Milestone audit before close creates targeted, efficient cleanup work
5. Design tokens in global.css :root pay dividends across every phase
