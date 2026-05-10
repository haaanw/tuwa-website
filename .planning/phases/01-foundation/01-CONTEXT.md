# Phase 1: Foundation - Context

**Gathered:** 2026-05-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Deployed Astro 6 site with design token system, Alpino font, light-mode-only styling, responsive navigation header with mobile menu, columned footer, and SEO meta component. Deploys to Cloudflare Pages at tuwa.app. Ready to receive content pages in Phase 2+.

</domain>

<decisions>
## Implementation Decisions

### Color Palette & Design Tokens
- **D-01:** Web tokens use the same warm travertine family as the app's DESIGN.md but are tuned for web rendering — not exact hex copies. Keep the vibe, adjust for screen context.
- **D-02:** Introduce a distinct contrasting accent color for web CTAs (App Store buttons, interactive elements) that complements the travertine palette but stands out. Not a warmer travertine — something that pops against it.
- **D-03:** Web styling uses subtle softness: small border-radius (4-8px), subtle shadows on cards. Clean and minimal but not the app's strict 0pt-radius/no-shadow rule. Recognizably related to the app, not a clone.

### Navigation & Footer
- **D-04:** Header nav links: Features, Coaching, Blog, Support — plus a compact "Get the App" CTA button. Coaching surfaced separately since coaches are a distinct audience.
- **D-05:** Footer is multi-column: Product (Features, Coaching), Resources (Blog, Support), Legal (Privacy, Terms, ©). App Store badge prominent.

### Dark Mode
- **D-06:** Light mode only — no dark mode, no toggle. Simplifies implementation. FOUND-04 requirement is descoped: no dark/light switching, no system preference detection, no flash-prevention needed.

### Page Routes & Structure
- **D-07:** Claude's Discretion — URL structure for feature pages (/features/[slug] vs flat /[slug]). Pick based on SEO best practices.
- **D-08:** Claude's Discretion — Sticky vs scrolling header. Pick based on conversion best practices for marketing sites.

### Claude's Discretion
Claude has flexibility on D-07 and D-08 above. For all other areas not explicitly discussed, follow standard Astro + marketing site conventions.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `~/Desktop/Tonus/DESIGN.md` — App color tokens (dark + light mode hex values), spacing scale (8pt base), typography scale. Web tokens derive from this but are web-tuned per D-01.

### Existing Assets
- `~/Desktop/Tonus/PRIVACY.md` — Privacy policy source (Phase 3)
- `~/Desktop/Tonus/TERMS.md` — Terms of service source (Phase 3)
- `~/Desktop/Tonus/AppStoreMetadata.md` — App Store description and metadata

### Project Configuration
- `CLAUDE.md` — Technology stack decisions (Astro 6, Tailwind v4 via @tailwindcss/vite, no @astrojs/cloudflare adapter, content.config.ts at src/content.config.ts)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — bare Astro scaffold with only `src/pages/index.astro` and default favicons.

### Established Patterns
- None — greenfield. All patterns will be established in this phase.

### Integration Points
- `astro.config.mjs` — needs Tailwind vite plugin, MDX, sitemap integrations added
- `package.json` — needs Tailwind, MDX, and related dependencies
- `src/pages/` — currently only index.astro, will expand with feature pages in Phase 2+

</code_context>

<specifics>
## Specific Ideas

- App's aesthetic is "International Style Minimalism" (Barcelona Pavilion, Braun) — website inherits the calm, authoritative mood but softens the strict rules for web context
- Travertine warmth is the brand signature — warm off-whites, warm near-blacks, not clinical white/black
- Alpino font replaces DM Sans (app will follow later) — self-hosted from Fontshare
- App Store download is the primary conversion goal — CTA button in header + badge in footer

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-05-10*
