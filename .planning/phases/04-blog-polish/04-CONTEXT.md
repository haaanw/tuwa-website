# Phase 4: Blog + Polish - Context

**Gathered:** 2026-05-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Blog MDX infrastructure (content collection schema, listing page, individual post layout) plus site-wide polish: Lighthouse >= 95 performance audit, SEO completeness (robots.txt, sitemap, canonical URLs, semantic HTML audit), branded OG image, and font switch from Alpino to General Sans.

</domain>

<decisions>
## Implementation Decisions

### Blog Listing Page
- **D-01:** Minimal list layout — title + date + one-line description per entry. No images on the listing page. Matches the site's calm, Rams-inspired aesthetic.

### Blog Post Layout
- **D-02:** Clean prose reading experience — Tailwind Typography prose styling with generous breathing room. Reading time + date at top, back-to-blog link. No dedicated App Store CTA block — just natural inline mentions/links when contextually relevant within post content.
- **D-03:** No cover image hero, no author byline, no share buttons, no sidebar. Keep it minimal.

### Blog Content Schema
- **D-04:** Frontmatter fields: title, date, description, tags (string array), draft (boolean). Tags included in schema for future use but no tag listing/filtering pages in this phase.
- **D-05:** Claude's Discretion — whether to include an optional coverImage field for OG meta tags. Pick based on SEO sharing best practices.
- **D-06:** Standard draft behavior — `draft: true` posts visible in dev, filtered from production listing and sitemap.

### Font Switch
- **D-07:** Switch site font from Alpino to General Sans (Fontshare). Update Astro Fonts API config in astro.config.mjs, update CSS custom property references in global.css, and verify all pages render correctly with the new font. This is a site-wide change.

### Performance Strategy
- **D-08:** Audit-and-fix approach for Lighthouse >= 95 target. Run Lighthouse on landing page, identify top bottlenecks (likely images, font loading, render-blocking resources), fix what's broken. Pragmatic, not a full overhaul.
- **D-09:** Create a static branded 1200x630 PNG as the default OG image. Replace the 1x1 placeholder from Phase 1. One image for site-wide default. Per-page dynamic generation (satori) deferred to v2.

### SEO Completeness
- **D-10:** Standard robots.txt — allow all crawlers, reference /sitemap.xml. Public marketing site, no pages to block.
- **D-11:** Blog posts included in sitemap automatically. Astro sitemap integration auto-includes all non-draft pages.
- **D-12:** Full site semantic HTML audit — check ALL existing pages (not just blog) for proper h1→h2→h3 heading hierarchy, landmark roles (main, nav, footer), and alt text on images. Fix issues across the entire site.
- **D-13:** Canonical URLs on all pages via existing SEO.astro component (already outputs canonical — verify it's correct on every page).

### Claude's Discretion
- D-05 (cover image field in blog schema)
- Blog post URL structure (/blog/[slug] vs /blog/[date]/[slug]) — pick based on SEO best practices
- Which specific Lighthouse issues to prioritize — based on audit results
- Blog listing page route (/blog vs /blog/index)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System
- `src/styles/global.css` — Live design tokens: travertine palette, forest green accent, current Alpino font references, spacing/type scales, scroll animation CSS. Font references need updating for D-07.
- `astro.config.mjs` — Fonts API config (currently Alpino, needs General Sans switch), MDX and sitemap integrations already wired.

### Existing Components
- `src/components/SEO.astro` — Meta tags component. Verify canonical URL output for D-13.
- `src/components/FeatureCTA.astro` — Reference for CTA pattern (blog does NOT use this, but it's the established pattern).
- `src/layouts/BaseLayout.astro` — All pages use this. Blog layout will extend it.
- `src/layouts/LegalPageLayout.astro` — Reference for clean prose container pattern. Blog post layout will be similar but with more breathing room.

### Prior Phase Context
- `.planning/phases/01-foundation/01-CONTEXT.md` — Foundation decisions: travertine palette, accent color, web softness, light mode only.
- `.planning/phases/02-landing-page/02-CONTEXT.md` — Landing page: hero, feature grid, scroll animations.
- `.planning/phases/03-content-pages/03-CONTEXT.md` — Content pages: FeaturePageLayout pattern, copy tone, chart islands.

### Project Configuration
- `CLAUDE.md` — Technology stack (Astro 6, Tailwind v4 via @tailwindcss/vite, no adapter, content.config.ts at src/content.config.ts).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/layouts/BaseLayout.astro` — Blog listing and post pages will use this as their base.
- `src/layouts/LegalPageLayout.astro` — Clean prose container pattern. Blog post layout can follow a similar structure (BaseLayout + prose content area) but with reading-specific additions (reading time, date, back link).
- `src/components/SEO.astro` — Already handles title, description, ogImage, canonical. Blog pages pass unique values per post.
- `src/config.ts` — APP_STORE_URL constant for any inline App Store mentions in blog content.
- `src/styles/global.css` — Scroll animation CSS (`[data-animate]` + `is-visible`) available for blog page reveals if desired.

### Established Patterns
- Design tokens via CSS custom properties in global.css
- Font loaded via Astro Fonts API with preload (will change from Alpino to General Sans)
- No client-side JS frameworks — inline scripts only
- Light mode only
- Tailwind Typography plugin already in dependencies (used by content pages)

### Integration Points
- `src/content.config.ts` — Does not exist yet. Must be created for blog content collection with Zod schema.
- `src/content/blog/` — Does not exist yet. Directory for MDX blog posts.
- `src/pages/blog/` — Does not exist yet. Needs index.astro (listing) and [...slug].astro or [slug].astro (post).
- Header nav already has "Blog" link (D-04 Phase 1) — needs to point to /blog.
- `public/robots.txt` — Does not exist yet. Must be created.
- `public/og-default.png` (or similar) — Does not exist yet. Branded OG image to replace 1x1 placeholder.

</code_context>

<specifics>
## Specific Ideas

- General Sans from Fontshare replaces Alpino across the entire site — user requested this font switch during discussion
- Blog inherits the accessible-credible tone from feature pages — plain language backed by science
- Listing page should feel like an index, not a magazine — calm, scannable, minimal
- Post reading experience should have generous whitespace and good typography — similar quality bar to legal pages but less dense
- No blog CTA blocks — App Store mentions happen naturally within post content when relevant

</specifics>

<deferred>
## Deferred Ideas

- Per-page dynamic OG images via satori — deferred to v2 (SEO-01 requirement)
- Tag listing/filtering pages — tags captured in schema but no UI this phase
- Blog search functionality — not in scope
- Author profiles/bylines — single-author site, not needed

</deferred>

---

*Phase: 04-blog-polish*
*Context gathered: 2026-05-11*
