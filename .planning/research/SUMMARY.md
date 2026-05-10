# Project Research Summary

**Project:** Tuwa Marketing Website
**Domain:** iOS fitness/athletic app marketing site (download-conversion focused)
**Researched:** 2026-05-10
**Confidence:** HIGH

## Executive Summary

Tuwa's marketing website is a conversion-optimized static marketing site with one primary goal: drive App Store downloads from serious athletes and coaches. Research confirms this is a well-understood product category (fitness app landing page) with clear patterns from direct competitor analysis of WHOOP, TrainingPeaks, and Strava. The right approach is a fully static Astro 6 site deployed to Cloudflare Pages — zero JavaScript by default, pre-rendered HTML, excellent Core Web Vitals baseline, and no runtime infrastructure. The site has 11 pages: one landing page, five feature deep-dive pages, a blog infrastructure (no posts at launch), and three migrated legal/support pages.

The recommended stack is Astro 6.3.1 + Tailwind CSS v4 + MDX content collections, all verified against official documentation as of 2026-05-10. This combination produces a performant, type-safe, maintainable site that matches the design token system already defined for the app. Cloudflare Pages static hosting requires no server adapter — a common mistake to avoid. The architecture is deliberately minimal: only two Astro islands (ThemeToggle and MobileMenu), all other interactivity via CSS and native IntersectionObserver.

The most significant risks are not technical — they are copy and positioning risks. Feature-first hero copy (leading with EWMA/ACWR acronyms instead of athlete outcomes), jargon walls on feature deep-dive pages, and promise-to-onboarding divergence (implying instant insight when the app requires a baseline period) are the pitfalls most likely to damage conversion and generate negative App Store reviews. These must be addressed in copy and design phases before any implementation begins. Technical risks are manageable: font FOUT from Alpino self-hosting, dark mode contrast failures on warm travertine palettes, and SEO content being accidentally hidden inside Astro islands.

## Key Findings

### Recommended Stack

Astro 6.3.1 is the correct framework choice: zero-JS-by-default output, content collections with Zod schema validation, and dev/prod parity with Cloudflare Workers runtime added in v6. Tailwind v4 integrates via the Vite plugin (`@tailwindcss/vite` in `vite.plugins`), not through the deprecated `@astrojs/tailwind` integration — this is a breaking change from v3 patterns. The `@astrojs/sitemap` and `@astrojs/mdx` integrations are first-party and zero-configuration. OG image generation uses satori at build time; Alpino font support in satori should be verified before committing this pattern.

**Core technologies:**
- **Astro 6.3.1**: Static site generator — zero-JS default, file-system routing, content collections, Cloudflare dev parity
- **Tailwind CSS v4** (via `@tailwindcss/vite`): Utility CSS — CSS-variable config maps directly to app DESIGN.md design tokens; v3 is maintenance-only
- **@astrojs/mdx**: Blog content rendering — first-party, enables component embedding in future posts
- **Cloudflare Pages (static, no adapter)**: Hosting — do NOT install `@astrojs/cloudflare` for pure static output; it causes deployment failures
- **@astrojs/sitemap**: SEO crawlability — required, not default; submit to Google Search Console at launch
- **satori (@vercel/og)**: Per-page OG images at build time — verify Alpino TTF support before committing
- **CSS + IntersectionObserver (native)**: Scroll animations — zero KB, covers all "subtle reveal" needs; Motion library only if hero requires sequenced timeline animations
- **Alpino (self-hosted woff2)**: Typeface — Fontshare free commercial license, must be self-hosted from `public/fonts/`, use `font-display: swap` and `<link rel="preload">`

### Expected Features

Research against WHOOP, TrainingPeaks, and Strava confirms the feature set is well-calibrated. Tuwa can meaningfully differentiate by being the only competitor with dark mode, the only one with science-depth feature pages (TrainingPeaks has pillars but not methodology depth), and explicit dual athlete/coach paths.

**Must have (table stakes):**
- Hero with clear value proposition and App Store download badge
- Device mockup / app screenshot in hero (visual proof of real product)
- Feature overview section (3-4 cards linking to deep-dives)
- 5 feature deep-dive pages (recovery scoring, workload tracking, smart templates, cold-start onboarding, coaching)
- Responsive + mobile-first layout (fitness audience is mobile-native)
- SEO meta tags + unique OG images per page
- Support, Privacy, Terms pages (migrated from existing HTML)
- Footer with nav and legal links
- Fast page load / excellent Core Web Vitals

**Should have (competitive differentiators):**
- Dark/light mode (no competitor has this; signals polish and app-brand alignment)
- Science methodology explanations in accessible-credible tone (not jargon walls)
- Explicit dual audience targeting: athletes + coaches
- Scroll-triggered reveal animations (expected by 2025 for consumer fitness products)
- Athlete testimonials (even 2-3 attributed real quotes)
- Blog infrastructure (MDX-ready, no posts at launch)
- Stat/number callouts from validated science (do not fabricate)
- "Who it's for" qualification in hero (name the audience; exclude casuals explicitly)

**Defer (v2+):**
- Actual blog posts (infrastructure at launch is sufficient)
- Testimonial quotes (placeholder App Store review CTA acceptable at launch if outreach is pending)
- Stat callouts (only when validated outcome data is available)
- Scroll animations (add after layout is stable; don't let animation block content shipping)
- Pricing page (out of scope per PROJECT.md; one neutral line about plan tiers is sufficient)

**Hard anti-features (do not build):**
- App Store rating/review widget (dynamic, can go negative, adds JS weight)
- User authentication or account portal
- Video autoplay hero (kills Core Web Vitals on mobile)
- Interactive in-browser demo
- Internationalization (English-only for v1)
- A/B testing infrastructure (premature optimization)

### Architecture Approach

The site is a static-first, file-system-routed Astro project with a strict layout hierarchy: `Base.astro` (HTML shell + theme init) → `Marketing.astro` (adds Header + Footer) → specialized sub-layouts (`FeaturePage`, `LegalPage`, `BlogPost`). All content is pre-rendered to plain HTML at build time. JavaScript exists only in two Astro islands: `ThemeToggle.astro` (`client:load`, reads/writes localStorage) and `MobileMenu.astro` (`client:load`, toggle event listeners). All animation uses CSS and native IntersectionObserver in inline `<script>` tags — no JS framework required. Blog posts live in MDX content collections under `src/content/blog/`, never in `src/pages/`. The `content.config.ts` file lives at `src/content.config.ts` (Astro v5/v6 location — not `src/content/config.ts`).

**Major components:**
1. `Base.astro` + `BaseHead.astro` — HTML shell, all `<meta>` / OG tags, font preloads, anti-FOUC theme init script
2. `Marketing.astro` + `Header.astro` + `Footer.astro` — Site chrome used by every public page
3. `Hero.astro` + `FeatureGrid.astro` + `SocialProof.astro` + `DownloadCTA.astro` — Landing page sections (one-time use on `index.astro`)
4. `FeaturePage.astro` + `FeatureHero` + `FeatureDetail` + `FeatureCTABar` — Reusable layout for all 5 deep-dive pages
5. `LegalPage.astro` — Prose wrapper for privacy, terms, support pages
6. `BlogPost.astro` + content collections — Blog infrastructure; `getStaticPaths()` for pre-rendered post pages
7. `ThemeToggle.astro` + `MobileMenu.astro` — The ONLY Astro islands; all other JS is inline `<script>` tags

### Critical Pitfalls

1. **Feature-first hero copy** — Lead with athlete transformation ("Know when to push. Know when to recover."), not with acronyms (ACWR, EWMA, HRV). Reserve technical terminology for feature deep-dive pages. Validate every above-the-fold sentence against a non-athlete reader.

2. **Promise-to-onboarding divergence** — The app requires a baseline period before scores are meaningful. Copy must not imply instant insight. Reference cold-start onboarding honestly: "Tuwa learns your baseline in your first week." Show realistic (partially populated) screenshots, not empty states.

3. **Dark mode contrast failures** — Warm travertine palette loses contrast headroom in dark mode. Define explicit dark-mode CSS tokens — do not auto-invert light-mode values. Target 4.5:1 WCAG AA for body text; one font weight step up for dark mode body text.

4. **Client-side islands hiding indexable content** — All product copy, feature descriptions, and CTAs must be in the static Astro template layer. Islands are for decorative/interactive UI only. Verify by viewing page source (not browser inspector) for every feature page.

5. **Self-hosted font FOUT/CLS** — Add `<link rel="preload" as="font" crossorigin>` in `<head>` for primary Alpino weights. Without preload, font loading causes Cumulative Layout Shift and degrades Core Web Vitals. Subset the font files to Latin characters.

6. **App Store badge as sole CTA** — Provide a secondary path for desktop visitors (QR code or "send to your phone" link). Feature pages must end with a contextual CTA, not just repeat the badge.

7. **OG tags missing or global on every page** — `BaseHead.astro` must accept per-page `ogImage` prop. All 5 feature pages need unique OG images. OG image URLs must be absolute (use `Astro.site`).

## Implications for Roadmap

Based on dependency analysis in ARCHITECTURE.md and pitfall timing in PITFALLS.md, research recommends 5 phases:

### Phase 1: Foundation — Scaffold, Design System, Base Layout

**Rationale:** Every subsequent phase depends on Astro config, Tailwind design tokens, font loading, and the `Base.astro` / `Marketing.astro` / `BaseHead.astro` components. Dark mode CSS tokens must be defined before any other component is built — retrofitting is painful. Font preload setup must happen here to avoid CLS pitfalls.

**Delivers:** Deployable scaffold with correct Astro config (no adapter, `output: static`), Tailwind v4 Vite plugin, Alpino self-hosted fonts with preload, CSS custom properties for design tokens, anti-FOUC theme init script, Header + Footer shell, Cloudflare Pages deployment verified (even if content is placeholder).

**Addresses:** Dark/light mode baseline (FEATURES.md differentiator), responsive foundation, SEO component infrastructure.

**Avoids:** Pitfall 3 (dark mode contrast — tokens defined correctly from day 0), Pitfall 6 (font FOUT — preload in head from day 0), Pitfall 5 (Tailwind v4 integration error — use `@tailwindcss/vite`).

### Phase 2: Landing Page

**Rationale:** The landing page is the highest-impact page and the design direction validator. Building it second (after foundation) means the team can see the actual product before building 5 derivative pages. Copy and design decisions made here propagate to feature pages.

**Delivers:** `index.astro` with Hero, FeatureGrid, SocialProof, DownloadCTA sections. Primary App Store CTA. Secondary desktop CTA (QR code). Device mockup. Responsive at all breakpoints.

**Addresses:** Table stakes (hero, App Store badge, device mockup, feature overview cards, responsive layout), differentiators (dark/light mode, audience qualification, stat callouts if validated data available).

**Avoids:** Pitfall 1 (feature-first hero copy — outcome-led copy), Pitfall 4 (single CTA — QR code for desktop), Pitfall 9 (OG tags — unique per-page meta from the start), Pitfall 12 (pricing ambiguity — one neutral line about plans).

### Phase 3: Legal + Support Pages (Migration)

**Rationale:** These pages are low-risk (content already written), block no other phases, and satisfy trust/legal obligations. Migrating them immediately after the landing page means the site is "complete enough to share" with real users during feature page development. Do not let legal migration block or delay feature pages.

**Delivers:** `/privacy`, `/terms`, `/support` migrated from existing HTML into `LegalPage.astro` layout. `_redirects` file in `public/` mapping old URLs to new routes.

**Addresses:** Table stakes (footer + legal links, support page), trust signals for health data app.

**Avoids:** Pitfall 10 (redirect configuration — set up at launch for existing URLs, not after).

### Phase 4: Feature Deep-Dive Pages (5 pages)

**Rationale:** These are the second most important conversion surface after the landing page — they're the pages serious athletes and coaches reach from search ("ACWR tracking app," "HRV recovery iOS") or by clicking feature cards. All 5 pages share the same `FeaturePage.astro` layout, so the layout is built once and reused. Copy must be written BEFORE implementation begins (per FEATURES.md dependency note — do not build shells and fill later).

**Delivers:** 5 feature pages (recovery scoring, workload tracking, smart templates, cold-start onboarding, coaching) with 800-1200 word accessible-credible methodology explanations, feature-specific app screenshots, unique OG images, and contextual CTAs. Coach page explicitly addresses coach workflow pain (athlete readiness visibility, not just "share data").

**Addresses:** Differentiators (science methodology, dual audience, app screenshots, feature CTA bars).

**Avoids:** Pitfall 2 (jargon walls — hierarchy: outcome → mechanism → methodology), Pitfall 5 (cold-start honesty on the onboarding page), Pitfall 8 (indexable content in static layer), Pitfall 9 (unique OG per feature page).

### Phase 5: Blog Infrastructure + Polish

**Rationale:** Blog infrastructure is low-effort in Astro (content collections are already set up) but should come after content pages are stable. Scroll animations should be added after layout is stable — not during, to avoid blocking content delivery. Testimonials can be added post-launch or as a polish pass.

**Delivers:** `src/content.config.ts` schema (Zod validated frontmatter), `/blog/index.astro` listing page, `/blog/[...slug].astro` dynamic page, `BlogPost.astro` layout. No actual posts required. Scroll-triggered reveal animations on landing page sections. Sitemap submission to Google Search Console. Lighthouse audit + Core Web Vitals verification.

**Addresses:** Blog infrastructure (FEATURES.md differentiator — high future payoff), scroll animations (FEATURES.md differentiator — add after layout stable), sitemap (Pitfall 13).

**Avoids:** Pitfall 13 (missing sitemap — @astrojs/sitemap installed and submitted), Anti-Pattern 3 (blog content in pages/ — use content collections exclusively), Anti-Pattern 5 (content.config.ts in wrong Astro v4 location).

### Phase Ordering Rationale

- Foundation before everything: Astro config, Tailwind tokens, and Base/Marketing layouts are shared dependencies — every page breaks without them.
- Landing page before feature pages: The landing page validates design direction and establishes the copy tone that feature pages must match.
- Legal migration is non-blocking: It can proceed in parallel with or immediately after landing page; it has no dependencies and unblocks trust.
- Copy before shells: Feature page copy must be written before implementation (FEATURES.md explicitly flags this). Building placeholder shells and filling later produces worse outcomes.
- Blog and polish last: These add value but are not conversion-critical. Deferring them to Phase 5 ensures the site can ship after Phase 4 if needed.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Feature deep-dive pages):** Copy research into ACWR/EWMA/HRV citations and methodology needs to be complete before planning begins. This is domain knowledge, not technical — the roadmapper should flag this as a copy/content task.
- **Phase 5 (OG image generation with satori):** Alpino TTF/OTF support in satori is MEDIUM confidence. Verify before implementing per-page build-time OG generation. Fallback: static per-page PNG files.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Astro + Tailwind v4 setup is fully documented by official sources; HIGH confidence.
- **Phase 2 (Landing page):** Astro static component patterns are well-established; no novel integration needed.
- **Phase 3 (Legal migration):** Straight HTML-to-Astro migration; no research needed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified against official docs as of 2026-05-10; npm versions confirmed |
| Features | HIGH | Competitor analysis performed on live sites (WHOOP, TrainingPeaks, Strava); Apple badge guidelines verified |
| Architecture | HIGH | Component hierarchy verified against official Astro docs; Astro v5/v6 content.config.ts location confirmed |
| Pitfalls | HIGH | Copy/conversion pitfalls from multiple 2025/2026 marketing guides; technical pitfalls from official docs |

**Overall confidence:** HIGH

### Gaps to Address

- **Satori + Alpino TTF support**: Satori OG image generation is MEDIUM confidence. Verify Alpino font file format compatibility with satori before committing to build-time OG generation. If Alpino is WOFF2 only, convert to TTF/OTF or use a fallback system font for OG images.
- **Validated outcome statistics**: FEATURES.md recommends including stat/number callouts (e.g., "X% reduction in injury risk with ACWR guidance") but notes these must be validated. This is a content gap, not a technical gap. Roadmap should include a task to source or commission these from published ACWR/HRV research before feature pages ship.
- **Testimonial outreach**: Real athlete testimonials are recommended but require outreach to beta users. Roadmap should include this as a pre-launch task with an explicit fallback (placeholder "leave a review" CTA) if outreach is incomplete.
- **App screenshot quality**: Screenshots must show a seeded account with representative data (not empty states). This is an asset preparation task that must be completed before feature pages can be built. Flag as a blocker for Phase 4.
- **ARCHITECTURE.md config discrepancy**: ARCHITECTURE.md's `astro.config.mjs` sample includes `@astrojs/cloudflare` adapter with `output: 'static'`. STACK.md explicitly flags this combination as causing deployment failures — do not install the adapter for a pure static site. STACK.md takes precedence. The correct config is in STACK.md (no adapter).

## Sources

### Primary (HIGH confidence)
- [Astro 6 official docs](https://docs.astro.build) — project structure, content collections, layouts, islands, deployment
- [Tailwind CSS + Astro install guide](https://tailwindcss.com/docs/installation/framework-guides/astro) — Tailwind v4 Vite plugin setup
- [Cloudflare Pages Astro deploy guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) — static deployment without adapter
- [Apple App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) — badge assets and usage rules
- WHOOP.com, TrainingPeaks.com, Strava.com — live competitor analysis (2026-05-10)

### Secondary (MEDIUM confidence)
- [Vercel satori](https://github.com/vercel/satori) — build-time OG image generation; Alpino TTF support unverified
- [App Landing Pages for Mobile Products 2026](https://unicornplatform.com/blog/app-landing-pages-for-mobile-products-in-2026/) — conversion and copy pitfalls
- [PMC — HRV in athlete monitoring (2025)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12787763/) — HRV science citations
- [PMC — ACWR scientific evidence review](https://pmc.ncbi.nlm.nih.gov/articles/PMC8138569/) — ACWR methodology backing

### Tertiary (LOW confidence)
- Motion library for complex hero animations — only if CSS timeline is insufficient; pattern unverified for this specific use case

---
*Research completed: 2026-05-10*
*Ready for roadmap: yes*
