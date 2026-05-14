# Phase 9: Deployment & Responsive - Context

**Gathered:** 2026-05-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship the site live on tuwa.app via Cloudflare Pages, replace the placeholder App Store badge with the official Apple asset, fix responsive issues at all target breakpoints, and verify Lighthouse >= 95 on mobile and desktop.

</domain>

<decisions>
## Implementation Decisions

### App Store Badge
- **D-01:** Replace placeholder SVG with official Apple "Download on the App Store" SVG badge
- **D-02:** Badge appears in all download locations — Hero, LandingCTA, FeatureCTA, and Footer
- **D-03:** SVG format for crisp scaling and small file size
- **D-04:** English-only (consistent with project out-of-scope: no i18n)

### Responsive Strategy
- **D-05:** Keep current breakpoints (479/767/768px). Do NOT add explicit breakpoints for 375/390/1280/1440px — rely on fluid design
- **D-06:** Use fluid sizing (clamp(), percentages, etc.) for scaling between breakpoints. Only add new breakpoints if testing reveals actual layout breaks
- **D-07:** Max-width container cap at 1440px — content centered on wider screens
- **D-08:** Test at all 5 success criteria widths: 375px, 390px, 768px, 1280px, 1440px

### Deployment Setup
- **D-09:** Cloudflare Pages via GitHub integration (connect repo in dashboard, auto-deploy on push to main)
- **D-10:** Build command: `npm run build`, output directory: `dist/`, NODE_VERSION=22
- **D-11:** tuwa.app DNS already on Cloudflare — add custom domain in Pages settings
- **D-12:** No `@astrojs/cloudflare` adapter needed — pure static output (carried from Phase 1)

### Lighthouse Performance
- **D-13:** If Lighthouse drops below 95, first sacrifice is noise texture (body::after overlay) — purely decorative
- **D-14:** Run Lighthouse both locally during development AND on live Cloudflare deployment
- **D-15:** Performance budget: Lighthouse >= 95 on both mobile and desktop profiles

### Claude's Discretion
- Image optimization specifics (format selection, compression levels)
- Order of responsive fixes (which pages/components to fix first)
- Specific Lighthouse audit items to address beyond noise texture

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Deployment
- `.planning/REQUIREMENTS.md` — DEPL-01 through DEPL-04 requirements
- `astro.config.mjs` — Current Astro config (site URL, integrations, vite plugins)
- `public/_redirects` — Cloudflare 301 redirects for old GitHub Pages URLs

### App Store Badge
- `src/config.ts` — APP_STORE_URL constant
- `src/components/Hero.astro` — Current placeholder badge location
- `src/components/LandingCTA.astro` — CTA with download action
- `src/components/FeatureCTA.astro` — Feature page CTA with download action
- `src/components/Footer.astro` — Footer download link

### Responsive
- `src/styles/global.css` — Current media queries and breakpoints
- `src/components/Header.astro` — Navigation responsive behavior
- `src/components/MobileMenu.astro` — Mobile navigation overlay
- `src/components/FeatureGrid.astro` — Complex click wheel layout needs responsive testing

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/config.ts` — APP_STORE_URL already defined, badge components can import from here
- `src/components/SEO.astro` — Already handles meta tags, OG images for all pages
- `public/_redirects` — Cloudflare redirect rules already in place

### Established Patterns
- Media queries use mobile-first with min-width: 768px as primary tablet/desktop break
- Additional granular breakpoints at 479px and 480-767px for click wheel and feature grid
- All animations gated behind `prefers-reduced-motion: no-preference`
- Astro islands used sparingly (only ThemeToggle and MobileMenu)

### Integration Points
- Badge SVG file goes in `public/` directory (Astro copies to dist/)
- Cloudflare Pages reads `dist/` output directly
- `astro.config.mjs` site URL already set to `https://tuwa.app`
- `@astrojs/sitemap` already configured — sitemap-index.xml auto-generated

</code_context>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 09-deployment-responsive*
*Context gathered: 2026-05-14*
