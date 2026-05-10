# Phase 3: Content Pages - Context

**Gathered:** 2026-05-11
**Status:** Ready for planning

<domain>
## Phase Boundary

5 feature deep-dive pages (recovery scoring, workload tracking, smart templates, cold-start onboarding, coaching) and 3 legal/support pages (privacy policy, terms of service, support). All live with accessible-credible copy, unique OG meta tags, contextual App Store CTAs, and redirects from old GitHub Pages URLs.

</domain>

<decisions>
## Implementation Decisions

### Feature Page Layout
- **D-01:** Claude's Discretion — page structure (hero + alternating sections + CTA vs long-form scroll). Pick based on marketing best practices and Rams-inspired aesthetic from Phase 2.
- **D-02:** Claude's Discretion — screenshot treatment (device mockup vs bare screenshots with rounded corners/shadow). Pick for visual consistency with landing page hero.
- **D-03:** 4 feature pages share an identical reusable layout component. Coaching page gets extra sections for coach vs athlete perspective, team features, and invite flow — it targets a distinct audience.
- **D-04:** Screenshots are a mix — some ready, some need placeholders. Build with placeholder image blocks where screenshots aren't available yet; swap in real screenshots later.

### Copy & Content Depth
- **D-05:** Long-form copy (800-1200 words per feature page). Deep enough to explain methodology without jargon walls.
- **D-06:** Claude drafts all feature page copy based on AppStoreMetadata.md and app knowledge. User reviews and iterates on wording after pages are built.
- **D-07:** Content structure is outcome-first — lead with what the athlete GETS, then deeper science sections explaining how the algorithm works. Comprehensive but concise methodology explanations.
- **D-08:** Interactive charts and graphs on feature pages where relevant (ACWR trends, recovery scoring visualization). Implemented as Astro islands with a lightweight chart library. This is in-scope for Phase 3, not deferred.

### Legal Pages
- **D-09:** Legal pages match the site aesthetic — same travertine palette, Alpino font, BaseLayout with header/footer. Clean prose container for legal content. Not a separate minimal style.
- **D-10:** "Bevel style" reference is a general quality bar — clean, well-formatted legal prose with good typography, clear sections, readable. Not a pixel-match to any specific page.
- **D-11:** Support page contains FAQ section (5-8 common questions) plus contact email address.
- **D-12:** Privacy and Terms content migrated from existing source files (~/Desktop/Tonus/PRIVACY.md and ~/Desktop/Tonus/TERMS.md).

### URL Redirects
- **D-13:** Claude's Discretion — redirect implementation for old GitHub Pages URLs (same domain, tuwa.app). Old .html URLs (/privacy.html, /terms.html, /support.html) redirect to clean new routes with 301 permanent redirects.

### Claude's Discretion
Claude has flexibility on D-01 (page structure), D-02 (screenshot treatment), D-13 (redirect implementation), and chart library selection for D-08. For all other areas, follow the decisions above and established patterns from Phases 1-2.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `~/Desktop/Tonus/DESIGN.md` — App color tokens, spacing scale, typography. Web tokens derive from this per Phase 1 D-01.
- `src/styles/global.css` — Live design tokens: travertine palette, forest green accent, Alpino font, spacing/type scales, scroll animation CSS.

### Content Sources
- `~/Desktop/Tonus/AppStoreMetadata.md` — Feature descriptions and marketing copy. Primary source for drafting feature page content (D-06).
- `~/Desktop/Tonus/PRIVACY.md` — Privacy policy markdown source for migration (D-12).
- `~/Desktop/Tonus/TERMS.md` — Terms of service markdown source for migration (D-12).
- `~/Desktop/Tonus/docs/support.html` — Existing support page HTML. Reference for FAQ content and contact info (D-11).
- `~/Desktop/Tonus/docs/privacy.html` — Existing privacy HTML. Cross-reference with PRIVACY.md during migration.
- `~/Desktop/Tonus/docs/terms.html` — Existing terms HTML. Cross-reference with TERMS.md during migration.

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Foundation decisions: travertine palette (D-01), forest green accent (D-02), web softness 4-8px radius (D-03), header nav (D-04), footer structure (D-05), light mode only (D-06).
- `.planning/phases/02-landing-page/02-CONTEXT.md` — Landing page decisions: centered hero (D-01), Dieter Rams device mockup (D-02), feature card links to /features/[slug] routes (D-05), scroll animation approach (D-06).

### Project Configuration
- `CLAUDE.md` — Technology stack (Astro 6, Tailwind v4 via @tailwindcss/vite, no adapter, CSS IntersectionObserver).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/SEO.astro` — Meta tags component accepting title, description, ogImage, canonical. Use for unique OG tags per feature page (FEAT-06).
- `src/layouts/BaseLayout.astro` — Full page shell (SEO, font preload, header, footer). All content pages use this.
- `src/components/LandingCTA.astro` — App Store CTA section with QR code for desktop. May be reusable or adapted for feature page CTAs.
- `src/components/FeatureGrid.astro` — Contains the 5 feature card links with routes: /features/recovery-scoring, /features/workload-tracking, /features/smart-templates, /features/cold-start, /features/coaching.
- `src/config.ts` — APP_STORE_URL constant. Single source of truth for all App Store links.
- `src/styles/global.css` — Scroll animation CSS (`[data-animate]` + `is-visible` pattern). Reuse on feature pages.

### Established Patterns
- Design tokens via CSS custom properties in global.css (not Tailwind config)
- Alpino font loaded via Astro Fonts API with preload
- No client-side JS frameworks — inline scripts only (MobileMenu uses bundled script tag)
- Light mode only — no dark mode tokens
- Scroll animations via data-animate + IntersectionObserver

### Integration Points
- Feature card links in FeatureGrid.astro already point to /features/[slug] — pages must exist at these routes
- Header nav "Features" link needs to work (may link to landing page feature grid or a features index)
- Legal links in Footer.astro need to point to /privacy, /terms, /support routes
- Redirect file (public/_redirects or similar) for old .html URL mappings

</code_context>

<specifics>
## Specific Ideas

- Outcome-first content structure: lead with what the athlete gets, then explain the science behind it deeper in the page
- Interactive charts for data-heavy features (ACWR trends, recovery scoring) — Astro islands with lightweight JS library
- Coaching page is unique among features — needs coach vs athlete perspective, team workflows, invite mechanics
- Copy tone: accessible-credible. Plain language backed by science. Not clinical, not casual. Cite methodology without jargon walls.
- FAQ on support page should cover 5-8 common questions (likely: data privacy, HealthKit, subscription management, contact)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-content-pages*
*Context gathered: 2026-05-11*
