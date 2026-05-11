# Phase 4: Blog + Polish — Research

**Researched:** 2026-05-11
**Domain:** Astro MDX content collections, SEO/sitemap, font switching, Lighthouse performance
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Blog listing page — minimal list layout, title + date + one-line description per entry. No images.
- **D-02:** Blog post layout — Tailwind Typography prose styling, reading time + date at top, back-to-blog link. No App Store CTA block.
- **D-03:** Blog post — no cover image hero, no author byline, no share buttons, no sidebar.
- **D-04:** Blog schema frontmatter: `title`, `date`, `description`, `tags` (string array), `draft` (boolean). Tags in schema but no listing/filtering pages this phase.
- **D-05:** Whether to include optional `coverImage` field — Claude's Discretion (see below).
- **D-06:** Draft behavior — `draft: true` visible in dev, filtered from production listing and sitemap.
- **D-07:** Switch site font from Alpino to General Sans (Fontshare). Update `astro.config.mjs`, update CSS custom property references in `global.css`.
- **D-08:** Lighthouse >= 95: audit-and-fix approach. Run Lighthouse, identify top bottlenecks, fix what's broken. Not a full overhaul.
- **D-09:** Static branded 1200x630 PNG as default OG image. Replace 1x1 placeholder. One image, site-wide default. Per-page dynamic OG (satori) deferred.
- **D-10:** robots.txt — allow all crawlers, reference `/sitemap.xml`.
- **D-11:** Blog posts auto-included in sitemap. Draft posts excluded.
- **D-12:** Full site semantic HTML audit — all existing pages, fix h1→h2→h3 hierarchy, landmark roles, alt text.
- **D-13:** Canonical URLs on all pages via existing `SEO.astro` component — verify it outputs correctly on every page.

### Claude's Discretion

- **D-05:** Whether to include optional `coverImage` field in blog schema (for OG meta tags).
  - **Recommendation:** YES — include `coverImage: z.string().optional()`. In `src/pages/blog/[...slug].astro`, pass `coverImage ?? "/og-default.png"` to the SEO component. This enables per-post social cards without requiring immediate content. Zero overhead when omitted.
- **Blog post URL structure:** `/blog/[slug]` vs `/blog/[date]/[slug]`
  - **Recommendation:** `/blog/[slug]` — flat slug-only structure. SEO sources are unanimous: date-based paths go stale, break link equity on republishing, and look outdated in SERPs. Use `src/pages/blog/[...slug].astro` with the entry's `id` as the route param.
- **Blog listing page route:** `/blog` vs `/blog/index`
  - **Recommendation:** `src/pages/blog/index.astro` — this renders at `/blog`. Standard Astro convention.
- **Lighthouse bottlenecks to prioritize:** based on audit results — hero image `loading="eager"`, font display swap CLS, image dimensions declared, explicit `width`/`height` on `<img>` elements. See Common Pitfalls section.

### Deferred Ideas (OUT OF SCOPE)

- Per-page dynamic OG images via satori — deferred to v2 (SEO-01)
- Tag listing/filtering pages — tags in schema but no UI this phase
- Blog search functionality
- Author profiles/bylines
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| BLOG-01 | MDX content collection with Zod schema (title, date, description, tags, draft flag) | Content collections API + Zod — fully supported, see Architecture Patterns |
| BLOG-02 | Blog listing page with post cards | `src/pages/blog/index.astro` + `getCollection('blog')` with draft filter |
| BLOG-03 | Individual blog post layout with reading time, date, back navigation | `[...slug].astro` + remark-reading-time plugin pattern |
| BLOG-04 | No initial posts required — infrastructure only | Empty `src/content/blog/` directory; `getCollection` returns `[]` gracefully |
| PERF-01 | Lighthouse performance score >= 95 on landing page | Audit-and-fix: hero image eager load, image dimensions, font swap CLS |
| PERF-02 | Semantic HTML throughout (proper heading hierarchy, landmarks, alt text) | Full site audit across all pages and layouts |
| PERF-03 | XML sitemap generated at build time | `@astrojs/sitemap` already wired; draft filtering via sitemap filter function |
| PERF-04 | robots.txt configured for crawling | Static `public/robots.txt` file; no Astro integration needed |
| PERF-05 | Proper canonical URLs on all pages | `SEO.astro` already outputs canonical; verify each page passes correct value |
</phase_requirements>

---

## Summary

Phase 4 closes out the Tuwa marketing site v1 with four distinct workstreams: (1) blog MDX infrastructure, (2) font switch from Alpino to General Sans, (3) static default OG image creation, and (4) a Lighthouse + semantic HTML polish pass.

The blog infrastructure follows a well-established Astro 6 pattern: define a content collection in `src/content.config.ts` with a Zod schema, create `src/pages/blog/index.astro` for the listing, and `src/pages/blog/[...slug].astro` for individual posts. Reading time is calculated via a remark plugin at build time — zero runtime cost. Draft filtering is applied at the `getCollection` call (`!import.meta.env.PROD || !post.data.draft`) and sitemap exclusion requires a custom `filter` function in the sitemap integration config because `@astrojs/sitemap` does not read content collection draft flags natively.

The font switch from Alpino to General Sans is a one-file config change in `astro.config.mjs` (update `name`, `cssVariable`) plus a global find-and-replace on `--font-alpino` → `--font-general-sans` in `global.css` and `BaseLayout.astro`. General Sans has the same static weights (400/600) that Alpino uses, so no weight changes needed. The Astro Fonts API handles download, caching, and optimized fallback generation automatically.

Lighthouse >= 95 on a static Astro site with no client-side framework is achievable. The primary risks are: hero image `loading="lazy"` (kills LCP), missing `width`/`height` on images (causes CLS), and font swap flash (mitigated by `font-display: swap` and optimized fallbacks already configured). The audit-and-fix approach in D-08 is correct — run Lighthouse first to identify actual bottlenecks rather than pre-optimizing.

**Primary recommendation:** Implement blog infrastructure in one clean pass (content.config.ts → listing page → post layout), then handle font switch as a focused find-and-replace, then run the Lighthouse audit, fix what it surfaces.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Blog MDX schema and validation | Build-time (Astro content collections) | — | Zod schema runs at build time; no runtime validation needed |
| Blog listing page | Frontend Server (SSR/static) | — | Static generation via `getCollection` + `getStaticPaths` |
| Blog post rendering | Frontend Server (SSR/static) | — | MDX rendered to HTML at build time |
| Reading time calculation | Build-time (remark plugin) | — | Computed once during build via remark plugin; injected into frontmatter |
| Draft filtering | Build-time (getCollection filter) | Build-time (sitemap filter) | Both listing and sitemap must independently filter drafts |
| Font loading | CDN / Static | Browser | Astro Fonts API downloads + self-hosts; browser loads from /dist |
| OG image | CDN / Static | — | Static PNG in public/; served as a static asset |
| robots.txt | CDN / Static | — | Static file in public/; no server logic |
| sitemap.xml | Build-time | — | Generated by @astrojs/sitemap at build |
| Canonical URLs | Frontend Server (SEO component) | — | SEO.astro already outputs canonical; verify per-page values |
| Semantic HTML | Frontend Server (templates) | — | Fix in .astro component/page files |
| Lighthouse audit | Developer tooling | — | Manual audit step; fixes applied to static templates |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro content collections | Bundled (Astro 6.3.1) | MDX blog schema, listing, routing | First-party, type-safe, Zod-validated frontmatter, draft support |
| @astrojs/mdx | 5.0.4 (already installed) | Render MDX files in content collection | First-party; already in package.json |
| @astrojs/sitemap | 3.7.2 (already installed) | Auto-generate sitemap.xml | First-party; already wired in astro.config.mjs |
| @tailwindcss/typography | 0.5.19 (already installed) | Prose styling for blog post body | Already a dependency; `prose` class used in LegalPageLayout |
| reading-time | ^1.5.0 | Calculate minutes-to-read from word count | Standard pattern; Astro official recipe uses this |
| mdast-util-to-string | ^4.0.0 | Extract plain text from MDX AST for reading-time | Required peer for the remark plugin pattern |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| General Sans (Fontshare via Astro Fonts API) | font weights 400, 600 | Replace Alpino as primary typeface | D-07 font switch; same API already proven with Alpino |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| remark-reading-time (custom plugin) | `reading-time` npm package only + body word count | Remark plugin approach is the Astro official recipe; body-word-count is simpler but loses accuracy on MDX with JSX components |
| Static robots.txt in public/ | Astro endpoint at src/pages/robots.txt.ts | Static file is simpler and sufficient; endpoint only needed if robots rules are dynamic |

**Installation (new packages only):**
```bash
npm install reading-time mdast-util-to-string
```

**Version verification (2026-05-11):**
- `reading-time`: 1.5.0 (stable, no breaking changes in years) [ASSUMED — not npm-view verified]
- `mdast-util-to-string`: 4.0.0 current [ASSUMED — not npm-view verified]

---

## Architecture Patterns

### System Architecture Diagram

```
MDX files in src/content/blog/
         │
         ▼ (build time — glob loader)
src/content.config.ts  ──── Zod schema validation ────► TypeScript error on bad frontmatter
         │
         ▼ getCollection('blog')
         │
         ├── filter(!import.meta.env.PROD || !post.data.draft)
         │                │
         │                ▼
         │      src/pages/blog/index.astro   → /blog (listing page)
         │
         └── getStaticPaths()  → one route per non-draft post
                      │
                      ▼
         src/pages/blog/[...slug].astro   → /blog/[slug]
                      │
                      ├── render(entry)  →  MDX → HTML via Content component
                      └── remarkPluginFrontmatter.minutesRead  →  display in header

sitemap generation (build):
  @astrojs/sitemap walks all generated pages
  + custom filter(page => ...) reads draft files to exclude draft URLs
  → /sitemap.xml

static assets (no build-time processing):
  public/robots.txt   → /robots.txt
  public/og-default.png (1200×630)  → /og-default.png
```

### Recommended Project Structure
```
src/
├── content/
│   ├── blog/          # MDX blog posts go here (empty at phase end)
│   └── (nothing else needed this phase)
├── content.config.ts  # Content collection schema definition
├── layouts/
│   └── BlogPostLayout.astro    # New: post layout (extends BaseLayout)
├── pages/
│   └── blog/
│       ├── index.astro          # New: /blog listing page
│       └── [...slug].astro      # New: /blog/[slug] individual post
└── remark-reading-time.mjs      # New: remark plugin for reading time

public/
├── og-default.png               # New: 1200x630 branded PNG
└── robots.txt                   # New: static robots file
```

### Pattern 1: Content Collection Schema (BLOG-01)
**What:** Define blog collection in `src/content.config.ts` with Zod schema validation.
**When to use:** Every project with MDX content that needs type-safe frontmatter.

```typescript
// src/content.config.ts
// Source: https://docs.astro.build/en/guides/content-collections/
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),   // D-05: optional, used for per-post OG image
  }),
});

export const collections = { blog };
```

**Key notes:**
- File lives at `src/content.config.ts` (Astro v6 location — confirmed in STATE.md decision log)
- `z.coerce.date()` handles both `2024-01-15` and `2024-01-15T00:00:00Z` formats
- `draft` defaults to `false` so omitting it in frontmatter = published
- `coverImage` is optional string (URL or absolute path) for per-post OG images [VERIFIED: docs.astro.build/en/guides/content-collections/]

### Pattern 2: Blog Listing Page with Draft Filter (BLOG-02)
**What:** Query collection, filter drafts in production, render post cards.
**When to use:** Any page that lists blog posts.

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('blog', ({ data }) =>
  !import.meta.env.PROD || !data.draft
)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout title="Blog" description="Training science, recovery insights, and coaching notes from Tuwa.">
  <main>
    <h1>Blog</h1>
    {posts.length === 0 && <p>No posts yet — check back soon.</p>}
    <ul>
      {posts.map(post => (
        <li>
          <a href={`/blog/${post.id}`}>
            <time datetime={post.data.date.toISOString()}>
              {post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h2>{post.data.title}</h2>
            <p>{post.data.description}</p>
          </a>
        </li>
      ))}
    </ul>
  </main>
</BaseLayout>
```

**Key notes:**
- `!import.meta.env.PROD || !data.draft` — shows drafts in dev, hides in production
- Posts sorted newest-first by date
- Empty state handled gracefully for BLOG-04 (no initial posts required) [VERIFIED: docs.astro.build/en/guides/content-collections/]

### Pattern 3: Individual Blog Post Layout with Reading Time (BLOG-03)
**What:** Dynamic route that renders MDX content with reading time computed via remark plugin.
**When to use:** Blog post individual pages.

```astro
---
// src/pages/blog/[...slug].astro
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) =>
    !import.meta.env.PROD || !data.draft
  );
  return posts.map(post => ({
    params: { slug: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, remarkPluginFrontmatter } = await render(post);
const minutesRead = remarkPluginFrontmatter.minutesRead;
---
<BaseLayout
  title={post.data.title}
  description={post.data.description}
  ogImage={post.data.coverImage ?? '/og-default.png'}
>
  <!-- meta for blog post OG type -->
  <article>
    <header>
      <a href="/blog">← Blog</a>
      <time datetime={post.data.date.toISOString()}>
        {post.data.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </time>
      {minutesRead && <span>{minutesRead}</span>}
      <h1>{post.data.title}</h1>
    </header>
    <div class="prose prose-neutral max-w-none">
      <Content />
    </div>
  </article>
</BaseLayout>
```

**IMPORTANT:** `og:type` should be `"article"` for blog posts, not `"website"`. The current `SEO.astro` hardcodes `og:type="website"`. This needs a prop or override for blog posts. [VERIFIED: Open Graph protocol docs — og:type "article" is the correct type for blog posts]

### Pattern 4: Remark Reading Time Plugin
**What:** A small remark plugin that adds `minutesRead` to MDX frontmatter at build time.
**When to use:** Any Astro MDX content collection where reading time should be displayed.

```javascript
// src/remark-reading-time.mjs
// Source: https://docs.astro.build/en/recipes/reading-time/
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;  // e.g., "3 min read"
  };
}
```

Wire into `astro.config.mjs`:
```javascript
import { remarkReadingTime } from './src/remark-reading-time.mjs';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  // ... rest of config
});
```

[VERIFIED: docs.astro.build/en/recipes/reading-time/]

### Pattern 5: Font Switch — Alpino to General Sans (D-07)
**What:** Update Astro Fonts API config and CSS custom property name.
**When to use:** Any Fontshare font swap.

In `astro.config.mjs`, change:
```javascript
// BEFORE
{ provider: fontProviders.fontshare(), name: "Alpino", cssVariable: "--font-alpino", ... }

// AFTER
{ provider: fontProviders.fontshare(), name: "General Sans", cssVariable: "--font-general-sans", weights: ["400", "600"], styles: ["normal"], display: "swap", fallbacks: ["system-ui", "sans-serif"], optimizedFallbacks: true }
```

In `BaseLayout.astro`, change:
```astro
<!-- BEFORE -->
<Font cssVariable="--font-alpino" preload />
<!-- AFTER -->
<Font cssVariable="--font-general-sans" preload />
```

In `global.css`, change:
```css
/* BEFORE */
--font-alpino: "Alpino", system-ui, sans-serif;
body { font-family: var(--font-alpino); ... }

/* AFTER */
--font-general-sans: "General Sans", system-ui, sans-serif;
body { font-family: var(--font-general-sans); ... }
```

**Grep targets:** Search entire codebase for `--font-alpino` and `font-alpino` to find all references. [VERIFIED: Astro Fonts API docs — name field accepts the exact Fontshare font family name]

### Pattern 6: robots.txt (PERF-04)
**What:** Static file in `public/` — Astro copies it to `dist/` at build time.
**When to use:** Any public marketing site with no pages to block.

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://tuwa.app/sitemap-index.xml
```

**Note:** `@astrojs/sitemap` generates `sitemap-index.xml` (an index file), NOT `sitemap.xml` directly. The index references `sitemap-0.xml`. Point robots.txt at `sitemap-index.xml`. [VERIFIED: @astrojs/sitemap docs — integration generates sitemap-index.xml]

### Pattern 7: Draft Exclusion from Sitemap (PERF-03 + D-11)
**What:** The `@astrojs/sitemap` integration cannot read content collection `draft` flags — it walks built pages. Since draft posts ARE built when `import.meta.env.PROD` is false, but NOT built in production (due to getStaticPaths filter), drafts are naturally excluded from production sitemaps. No custom filter needed if getStaticPaths properly excludes drafts.

**The safe approach:** Keep the getStaticPaths draft filter. In production, draft pages never get built, so they never appear in the sitemap. This is simpler than the gray-matter parsing approach. [VERIFIED: Astro sitemap docs + Jakub Tomek implementation article]

### Anti-Patterns to Avoid

- **Using `loading="lazy"` on the hero image:** The hero app screenshot is above the fold and is very likely the LCP element. Lazy loading prevents preload scanner from discovering it early. Use `loading="eager"` (default for Astro `<Image>`) — but explicitly verify no `loading="lazy"` has been added.
- **Missing `width` and `height` on images:** Causes CLS while page loads. Astro's `<Image>` component always emits width/height. If any raw `<img>` tags exist in MDX or components, add explicit dimensions.
- **Using the deprecated `@astrojs/tailwind` package for Tailwind v4:** Already avoided per CLAUDE.md — `@tailwindcss/vite` is the correct integration.
- **Using `output: "server"` or `@astrojs/cloudflare` adapter:** Confirmed out of scope per CLAUDE.md and STATE.md.
- **Using `og:type="website"` on blog post pages:** Blog posts should use `og:type="article"`. The current `SEO.astro` hardcodes `website` — add an optional `type` prop.
- **Pointing robots.txt at `/sitemap.xml`:** @astrojs/sitemap generates `sitemap-index.xml`, not `sitemap.xml`. Using the wrong filename in robots.txt means crawlers cannot discover the sitemap.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Reading time calculation | Manual word-count math in component | `reading-time` npm package via remark plugin | Handles edge cases (code blocks, HTML entities, CJK characters), standard 200wpm assumption, returns formatted string |
| Font download + self-hosting | Manually downloading .woff2 files from Fontshare | Astro Fonts API (`fontProviders.fontshare()`) | API handles download, caching, optimized fallback generation, preload hints — already proven with Alpino |
| Sitemap generation | Custom sitemap.xml endpoint | `@astrojs/sitemap` (already installed) | Handles all static pages automatically; no maintenance overhead |
| MDX content schema validation | Manual frontmatter parsing + validation | Astro content collections + Zod | Build-time TypeScript errors on invalid frontmatter; getCollection returns fully-typed objects |

**Key insight:** Reading time, sitemap, and font loading each have significant edge-case complexity that third-party solutions handle correctly. The one legitimate hand-roll in this phase is the remark plugin file itself, which is a 10-line wrapper around `reading-time`.

---

## Common Pitfalls

### Pitfall 1: @astrojs/sitemap generates `sitemap-index.xml` not `sitemap.xml`
**What goes wrong:** robots.txt references `/sitemap.xml`. Crawlers request that URL and get 404. Sitemap never discovered.
**Why it happens:** The integration generates a sitemap index at `sitemap-index.xml` that links to `sitemap-0.xml`. The flat `sitemap.xml` URL does not exist.
**How to avoid:** In `public/robots.txt`, use `Sitemap: https://tuwa.app/sitemap-index.xml`
**Warning signs:** After build, check `dist/` for file names — should see `sitemap-index.xml` and `sitemap-0.xml`.

### Pitfall 2: `og:type="website"` on blog post pages
**What goes wrong:** Social cards for shared blog posts are categorized as generic website pages, not articles. Some platforms (LinkedIn) treat `og:type="article"` differently for display.
**Why it happens:** `SEO.astro` currently hardcodes `og:type="website"` with no override.
**How to avoid:** Add an optional `type?: string` prop to `SEO.astro`, defaulting to `"website"`. Pass `type="article"` from the blog post page.

### Pitfall 3: Hero image LCP regression from lazy loading
**What goes wrong:** Lighthouse flags "Largest Contentful Paint image was lazily loaded."
**Why it happens:** If the Hero component's app screenshot has `loading="lazy"`, the preload scanner skips it and fetch is deferred until JavaScript runs.
**How to avoid:** The Astro `<Image>` component does NOT default to lazy loading — its default is eager (no attribute). Check no `loading="lazy"` has been added to the Hero screenshot. Set `fetchpriority="high"` on the LCP image for extra signal.
**Warning signs:** Lighthouse Performance panel shows LCP > 2.5s; Opportunity "Remove lazily loaded LCP image."

### Pitfall 4: Font switch CLS from changed fallback metrics
**What goes wrong:** After switching from Alpino to General Sans, the optimized fallback metrics may differ, causing layout shift during font swap.
**Why it happens:** Astro's `optimizedFallbacks: true` generates CSS metrics (`size-adjust`, `ascent-override`, etc.) specific to each font's metrics. These need to be regenerated for General Sans.
**How to avoid:** The Astro Fonts API regenerates fallback metrics automatically when `optimizedFallbacks: true` is set in the new font config. Run a build and measure CLS with Lighthouse after the font switch. Target CLS < 0.1.
**Warning signs:** Lighthouse CLS score > 0.1; visible text reflow on page load.

### Pitfall 5: content.config.ts path — Astro v6 location
**What goes wrong:** File placed at `src/content/config.ts` (Astro v4/v5 location) and not recognized.
**Why it happens:** Astro v6 changed the content config location.
**How to avoid:** File must be at `src/content.config.ts` (not inside the content/ directory). Confirmed in STATE.md decision log: "content.config.ts lives at `src/content.config.ts` (Astro v6 location)."

### Pitfall 6: SEO.astro canonical URL on blog post pages
**What goes wrong:** Blog posts inherit `canonical = Astro.url.href` from SEO.astro default — this should be correct for static generation. But verify it resolves to `https://tuwa.app/blog/[slug]` not `http://localhost:4321/blog/[slug]`.
**Why it happens:** `Astro.url.href` uses the request URL, which is the `site` config during static builds. Since `site: "https://tuwa.app"` is set in astro.config.mjs, this should resolve correctly.
**How to avoid:** Build and inspect the generated HTML to confirm canonical URLs are absolute and use the production domain. The `SEO.astro` does not pass `canonical` from blog pages — it relies on the `Astro.url.href` default, which is correct.

---

## Code Examples

### Empty state listing (BLOG-04 — zero posts)
```astro
{posts.length === 0 ? (
  <p style="color: var(--color-text-2);">Posts coming soon.</p>
) : (
  <ul>
    {posts.map(post => (...))}
  </ul>
)}
```
Source: BLOG-04 requirement — listing must render correctly with zero posts.

### Date formatting (consistent with site aesthetic)
```javascript
// Source: MDN Date docs — toLocaleDateString
post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
// Output: "January 15, 2025"
```

### Draft filter (used in both listing and getStaticPaths)
```javascript
// Source: https://docs.astro.build/en/guides/content-collections/
await getCollection('blog', ({ data }) => !import.meta.env.PROD || !data.draft)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Astro content `config.ts` at `src/content/config.ts` | `src/content.config.ts` at project root level | Astro v6 | Must use new location — old location not recognized |
| Fonts API under `experimental: { fonts: [...] }` | Stable `fonts: [...]` at top-level defineConfig | Astro 6.0 (March 2026) | Already using correct stable API in astro.config.mjs |
| `@astrojs/tailwind` integration | `@tailwindcss/vite` plugin in vite.plugins | Tailwind v4 | Already using correct approach per CLAUDE.md |

**Deprecated/outdated:**
- `experimental.fonts` key: Removed in Astro 6.0 — replaced by stable top-level `fonts`. Codebase already uses stable form.
- `@astrojs/tailwind`: Explicitly deprecated for Tailwind v4. Not in use.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build tooling | ✓ | >= 22.12.0 (engines constraint) | — |
| npm | Package install | ✓ | 11.5.1 | — |
| Astro 6.3.1 | All | ✓ | 6.3.1 | — |
| @astrojs/mdx | MDX blog | ✓ | 5.0.4 (installed) | — |
| @astrojs/sitemap | sitemap.xml | ✓ | 3.7.2 (installed) | — |
| @tailwindcss/typography | Blog prose | ✓ | 0.5.19 (installed) | — |
| reading-time | Reading time calc | ✗ | — | Manual word count (not recommended) |
| mdast-util-to-string | Remark plugin | ✗ | — | Required peer — no fallback |

**Missing dependencies (need install):**
- `reading-time` and `mdast-util-to-string` — both needed for BLOG-03. Single install command: `npm install reading-time mdast-util-to-string`

**Missing dependencies with no fallback:**
- None that block execution — only reading-time packages need installing.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `reading-time@1.5.0` is current npm version | Standard Stack | Low — package is stable and widely used; worst case install a different patch version |
| A2 | `mdast-util-to-string@4.0.0` is current npm version | Standard Stack | Low — same reasoning; Astro official recipe documents this package |
| A3 | General Sans weights 400 and 600 available on Fontshare | Font Switch | Medium — if 600 not available, use 500 (Medium) for headings; check Fontshare UI or build output |
| A4 | `@astrojs/sitemap` generates `sitemap-index.xml` as the root file | Pitfall 1 / robots.txt | Medium — if wrong, robots.txt Sitemap URL would be incorrect. Verify by running `npm run build` and checking dist/ |

---

## Open Questions (RESOLVED)

1. **Does General Sans weight 600 exist on Fontshare?** -- RESOLVED
   - What we know: General Sans covers 6 weights from 200 to 700 per search results; weight 600 should exist.
   - What's unclear: The Fontshare API uses font family names exactly. If the name is "GeneralSans" not "General Sans" the API call will silently fail.
   - Recommendation: After updating astro.config.mjs, run `npm run dev` and check browser DevTools Network tab for the font request URL to confirm the name resolves correctly.
   - **Resolution:** General Sans supports weights 200-700; weight 600 (Semibold) is available. If the exact name fails, verify at build time and adjust.

2. **Does SEO.astro need an `og:type` prop for blog articles?** -- RESOLVED
   - What we know: Currently hardcodes `og:type="website"`. Blog posts should ideally use `og:type="article"`.
   - What's unclear: Whether this matters enough to change vs. scope.
   - Recommendation (Claude's Discretion): Add `type?: string = "website"` prop to SEO.astro. Minimal change, correct semantics, planner should include this as a sub-task of BLOG-03.
   - **Resolution:** Yes, adding `type` prop to SEO.astro is included in Plan 02 (blog infrastructure). Blog posts pass `type="article"`.

---

## Sources

### Primary (HIGH confidence)
- [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/) — collection schema, getCollection, getStaticPaths, render()
- [Astro reading time recipe](https://docs.astro.build/en/recipes/reading-time/) — remark plugin pattern, reading-time + mdast-util-to-string packages
- [Astro @astrojs/sitemap integration](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — filter function, sitemap-index.xml output
- Existing codebase: `astro.config.mjs`, `BaseLayout.astro`, `global.css`, `SEO.astro`, `LegalPageLayout.astro` — read directly via tools
- [Astro 6.0 release announcement](https://astro.build/blog/astro-6/) — stable Fonts API at top-level, not experimental

### Secondary (MEDIUM confidence)
- [Excluding drafts from Astro sitemap (Jakub Tomek)](https://www.jakubtomek.com/blog/excluding-drafts-in-astro-sitemap-integration) — confirmed that natural getStaticPaths filtering is sufficient for static output
- [Lighthouse optimization guide for Astro (BetterLink)](https://eastondev.com/blog/en/posts/dev/20251202-astro-performance-optimization/) — confirmed hero image eager load as primary LCP fix
- [Astro Font Provider Reference](https://docs.astro.build/en/reference/font-provider-reference/) — `name: "General Sans"` as correct field value for Fontshare

### Tertiary (LOW confidence)
- General Sans weight availability on Fontshare — inferred from search results, not directly verified via API

---

## Metadata

**Confidence breakdown:**
- Blog infrastructure (content collections, routing): HIGH — verified against official Astro 6 docs
- Remark reading time: HIGH — Astro official recipe
- Font switch pattern: HIGH — same API already proven with Alpino in this codebase
- General Sans weights: MEDIUM — search result inference, not directly API-verified
- Lighthouse bottlenecks: MEDIUM — general Astro optimization literature; actual bottlenecks depend on audit results
- Sitemap draft exclusion: HIGH — static output naturally excludes non-built pages

**Research date:** 2026-05-11
**Valid until:** 2026-06-11 (Astro stable; no fast-moving dependencies in this phase)
