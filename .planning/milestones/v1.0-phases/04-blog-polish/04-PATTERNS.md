# Phase 4: Blog + Polish - Pattern Map

**Mapped:** 2026-05-11
**Files analyzed:** 10 new/modified files
**Analogs found:** 9 / 10

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/content.config.ts` | config | transform | `astro.config.mjs` (existing config file) | partial |
| `src/remark-reading-time.mjs` | utility | transform | none — no remark plugins exist yet | none |
| `src/layouts/BlogPostLayout.astro` | layout | request-response | `src/layouts/LegalPageLayout.astro` | exact |
| `src/pages/blog/index.astro` | page | request-response | `src/pages/index.astro` | role-match |
| `src/pages/blog/[...slug].astro` | page | request-response | `src/pages/privacy.astro` (prose page via layout) | role-match |
| `public/robots.txt` | config | — | none — static text file | none |
| `astro.config.mjs` (modify) | config | — | self (existing file) | exact |
| `src/styles/global.css` (modify) | config | — | self (existing file) | exact |
| `src/layouts/BaseLayout.astro` (modify) | layout | request-response | self (existing file) | exact |
| `src/components/SEO.astro` (modify) | component | request-response | self (existing file) | exact |

---

## Pattern Assignments

### `src/content.config.ts` (config, transform)

**Analog:** `astro.config.mjs` (lines 1–25) — the closest existing config file in the project; demonstrates Astro's defineConfig pattern and how the project wires integrations.

**Imports pattern** (`astro.config.mjs` lines 1–6):
```javascript
// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
```

**Core config pattern** — Zod collection schema (from RESEARCH.md Pattern 1, no codebase analog exists):
```typescript
// src/content.config.ts
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
    coverImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

**Key notes:**
- File MUST live at `src/content.config.ts` (Astro v6 location — NOT `src/content/config.ts`)
- `z.coerce.date()` handles both `2024-01-15` and ISO timestamp formats
- `coverImage` optional — passed as `coverImage ?? '/og-default.png'` in post page

---

### `src/remark-reading-time.mjs` (utility, transform)

**Analog:** None — no remark plugins exist in the codebase. Use RESEARCH.md Pattern 4 directly.

**Core pattern** (RESEARCH.md lines 312–323):
```javascript
// src/remark-reading-time.mjs
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

**Dependency note:** Requires `npm install reading-time mdast-util-to-string` before this file will work.

---

### `src/layouts/BlogPostLayout.astro` (layout, request-response)

**Analog:** `src/layouts/LegalPageLayout.astro` (lines 1–48)

**Imports pattern** (`LegalPageLayout.astro` lines 1–9):
```astro
---
import BaseLayout from './BaseLayout.astro';

interface Props {
  title: string;
  lastUpdated?: string;
}

const { title, lastUpdated } = Astro.props;
---
```

**Core prose container pattern** (`LegalPageLayout.astro` lines 11–48) — blog post follows the same 680px max-width centered container with `prose prose-neutral max-w-none`:
```astro
<BaseLayout title={title} description={...}>
  <div style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <div class="mx-auto px-6" style="max-width: 680px;">
      <h1
        style="
          font-size: var(--text-heading);
          font-weight: 600;
          line-height: var(--leading-heading);
          letter-spacing: var(--tracking-heading);
          color: var(--color-text-1);
        "
      >
        {title}
      </h1>
      ...
      <div class="prose prose-neutral max-w-none">
        <slot />
      </div>
    </div>
  </div>
</BaseLayout>
```

**Blog-specific additions** (not in LegalPageLayout — add above `<h1>`):
- Back link: `<a href="/blog">← Blog</a>` styled with `color: var(--color-text-2)` and `font-size: var(--text-label)`
- Date + reading time row: `<time datetime={...}>` + `<span>{minutesRead}</span>`, styled with `color: var(--color-text-3)` and `font-size: var(--text-label)`

**Props interface** (extends BaseLayout's existing props):
```typescript
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  date: Date;
  minutesRead?: string;
}
```

**SEO integration** — pass `type="article"` to SEO.astro (see SEO.astro modification below):
```astro
<BaseLayout title={title} description={description} ogImage={ogImage} type="article">
```

---

### `src/pages/blog/index.astro` (page, request-response)

**Analog:** `src/pages/index.astro` (lines 1–14) — the existing listing/index page pattern. Also reference `src/pages/privacy.astro` for LegalPageLayout-style prose container that could anchor a minimal listing.

**Imports pattern** (`index.astro` lines 1–6):
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
...
---
```

**Blog listing page core pattern** (from RESEARCH.md Pattern 2):
```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

const posts = (await getCollection('blog', ({ data }) =>
  !import.meta.env.PROD || !data.draft
)).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
---
<BaseLayout
  title="Blog"
  description="Training science, recovery insights, and coaching notes from Tuwa."
>
  <div style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
    <div class="mx-auto px-6" style="max-width: 680px;">
      <h1 style="font-size: var(--text-heading); font-weight: 600; ...">Blog</h1>
      {posts.length === 0 ? (
        <p style="color: var(--color-text-2);">Posts coming soon.</p>
      ) : (
        <ul style="list-style: none; padding: 0; margin-top: var(--space-2xl);">
          {posts.map(post => (
            <li style="border-top: 1px solid var(--color-divider); padding: var(--space-lg) 0;">
              <a href={`/blog/${post.id}`} style="text-decoration: none; display: block;">
                <time datetime={post.data.date.toISOString()}
                  style="font-size: var(--text-label); color: var(--color-text-3);">
                  {post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h2 style="font-size: var(--text-body); font-weight: 600; color: var(--color-text-1); margin-top: var(--space-xs);">
                  {post.data.title}
                </h2>
                <p style="font-size: var(--text-body); color: var(--color-text-2); margin-top: var(--space-xs);">
                  {post.data.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</BaseLayout>
```

**Styling conventions to copy from existing pages:**
- Spacing tokens: `var(--space-3xl)` for page top/bottom, `var(--space-2xl)` for section gaps — from `LegalPageLayout.astro` lines 12–13
- Divider hairline: `border-top: 1px solid var(--color-divider)` — from `LegalPageLayout.astro` line 37
- Text color hierarchy: `--color-text-1` primary, `--color-text-2` secondary, `--color-text-3` micro — from `global.css` lines 12–18

---

### `src/pages/blog/[...slug].astro` (page, request-response)

**Analog:** `src/pages/features/recovery-scoring.astro` (lines 1–15) — the existing dynamic content page pattern. Also reference `src/pages/privacy.astro` (lines 1–5) for the prose layout pattern.

**Imports and getStaticPaths pattern** (from RESEARCH.md Pattern 3):
```astro
---
import { getCollection, render } from 'astro:content';
import BlogPostLayout from '../../layouts/BlogPostLayout.astro';

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
<BlogPostLayout
  title={post.data.title}
  description={post.data.description}
  ogImage={post.data.coverImage ?? '/og-default.png'}
  date={post.data.date}
  minutesRead={minutesRead}
>
  <Content />
</BlogPostLayout>
```

**Route structure:** Use `[...slug].astro` (catch-all) with `post.id` as the param. Renders at `/blog/[slug]`.

**Draft filter:** Same filter expression as index.astro — `!import.meta.env.PROD || !data.draft`.

---

### `public/robots.txt` (config, static)

**Analog:** None in codebase — new static file. Follows standard robots.txt syntax.

**Complete file content** (from RESEARCH.md Pattern 6):
```
User-agent: *
Allow: /

Sitemap: https://tuwa.app/sitemap-index.xml
```

**Critical:** Reference `sitemap-index.xml` NOT `sitemap.xml` — `@astrojs/sitemap` generates `sitemap-index.xml` as the root file. Verify after `npm run build` that `dist/sitemap-index.xml` exists.

---

### `astro.config.mjs` (modify — font switch + remark plugin)

**Source file:** `astro.config.mjs` (lines 1–25) — modify in place.

**Current state** (lines 9–19):
```javascript
fonts: [
  {
    provider: fontProviders.fontshare(),
    name: "Alpino",
    cssVariable: "--font-alpino",
    weights: ["400", "600"],
    styles: ["normal"],
    display: "swap",
    fallbacks: ["system-ui", "sans-serif"],
    optimizedFallbacks: true,
  }
],
```

**Target state** (D-07 font switch):
```javascript
fonts: [
  {
    provider: fontProviders.fontshare(),
    name: "General Sans",
    cssVariable: "--font-general-sans",
    weights: ["400", "600"],
    styles: ["normal"],
    display: "swap",
    fallbacks: ["system-ui", "sans-serif"],
    optimizedFallbacks: true,
  }
],
```

**Add remark plugin** (new import + markdown section):
```javascript
import { remarkReadingTime } from './src/remark-reading-time.mjs';

export default defineConfig({
  // ... existing config ...
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
});
```

**Verification after edit:** Run `npm run dev` and check browser DevTools Network tab for a font request containing "General Sans" to confirm the Fontshare name resolves.

---

### `src/styles/global.css` (modify — font token rename)

**Source file:** `src/styles/global.css` (lines 43–73) — targeted find-and-replace.

**Current font token** (lines 43–44 and 66):
```css
/* Typography — Alpino */
--font-alpino: "Alpino", system-ui, sans-serif;
...
body {
  font-family: var(--font-alpino);
```

**Target state after D-07**:
```css
/* Typography — General Sans */
--font-general-sans: "General Sans", system-ui, sans-serif;
...
body {
  font-family: var(--font-general-sans);
```

**Search targets:** Grep entire codebase for `--font-alpino` and `font-alpino` to find all reference sites. Current known locations: `global.css` line 44 (token declaration), `global.css` line 66 (body font-family), `BaseLayout.astro` line 22 (`<Font cssVariable="--font-alpino">`).

---

### `src/layouts/BaseLayout.astro` (modify — font CSS variable)

**Source file:** `src/layouts/BaseLayout.astro` (line 22) — single-line change.

**Current** (line 22):
```astro
<Font cssVariable="--font-alpino" preload />
```

**Target** (D-07):
```astro
<Font cssVariable="--font-general-sans" preload />
```

**No other changes needed** in BaseLayout for this phase. The `ogImage` and `canonical` prop passthrough already works for blog pages.

---

### `src/components/SEO.astro` (modify — add og:type prop)

**Source file:** `src/components/SEO.astro` (lines 1–34) — add optional `type` prop.

**Current props interface** (lines 1–7):
```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}
```

**Current hardcoded og:type** (line 29):
```astro
<meta property="og:type" content="website" />
```

**Target** (add `type` prop, default `"website"`, allow blog posts to pass `"article"`):
```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  type?: string;
}

const {
  title,
  description,
  ogImage = "/og-default.png",
  canonical = Astro.url.href,
  type = "website",
} = Astro.props;
...
---
...
<meta property="og:type" content={type} />
```

**How consumed:** `BlogPostLayout.astro` passes `type="article"` to `BaseLayout`, which requires `BaseLayout` to also accept and forward the `type` prop to `SEO.astro`. The `BaseLayout.astro` `Props` interface and `SEO` usage line (line 27) must be updated in tandem.

---

## Shared Patterns

### Design Token Usage
**Source:** `src/styles/global.css` lines 7–62
**Apply to:** All new page and layout files (blog listing, blog post layout)

Tokens in use by every existing prose page:
```css
/* Spacing */
padding-top: var(--space-3xl);     /* 64px — page top */
padding-bottom: var(--space-3xl);
margin-top: var(--space-2xl);      /* 48px — between major sections */
gap: var(--space-lg);              /* 24px — between adjacent elements */

/* Typography */
font-size: var(--text-heading);    /* 28px — h1 page titles */
font-size: var(--text-body);       /* 16px — body, h2 in listing */
font-size: var(--text-label);      /* 13px — dates, reading time, meta */
font-weight: 600;                  /* headings */
line-height: var(--leading-heading);
line-height: var(--leading-body);
letter-spacing: var(--tracking-heading);

/* Color hierarchy */
color: var(--color-text-1);        /* primary text */
color: var(--color-text-2);        /* secondary / descriptions */
color: var(--color-text-3);        /* micro labels, dates */
border-top: 1px solid var(--color-divider);  /* hairline separators */
```

### Prose Container Pattern
**Source:** `src/layouts/LegalPageLayout.astro` lines 11–48
**Apply to:** `BlogPostLayout.astro`, `src/pages/blog/index.astro`

The established centered prose container:
```astro
<div style="padding-top: var(--space-3xl); padding-bottom: var(--space-3xl);">
  <div class="mx-auto px-6" style="max-width: 680px;">
    <!-- content here -->
    <div class="prose prose-neutral max-w-none">
      <slot />
    </div>
  </div>
</div>
```

### Draft Filter Expression
**Source:** RESEARCH.md Pattern 2 (verified against Astro docs)
**Apply to:** `src/pages/blog/index.astro` and `src/pages/blog/[...slug].astro`

```javascript
// Identical expression used in both files — do not vary
!import.meta.env.PROD || !data.draft
```

### Date Formatting
**Source:** RESEARCH.md Code Examples — consistent with site aesthetic
**Apply to:** `src/pages/blog/index.astro` and `BlogPostLayout.astro`

```javascript
post.data.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
// Output: "January 15, 2025"
```

### BaseLayout Wrapper
**Source:** `src/layouts/BaseLayout.astro` lines 1–37
**Apply to:** `BlogPostLayout.astro` (wraps BaseLayout just as LegalPageLayout does)

All layouts in this project follow the same wrapper pattern: define a Props interface, destructure props in frontmatter, pass to `<BaseLayout title={} description={} ogImage={}>`, render a content area with `<slot />`.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `src/remark-reading-time.mjs` | utility | transform | No remark plugins exist in codebase — use RESEARCH.md Pattern 4 verbatim |
| `public/robots.txt` | config | static | New static file — standard format, no codebase precedent needed |

---

## Modification Summary (Existing Files)

These files are modified, not created. The relevant current state has been read and the exact change sites are identified above.

| File | Current State | Change Required | Lines Affected |
|---|---|---|---|
| `astro.config.mjs` | Alpino font config, no markdown section | Font name/cssVariable swap; add markdown.remarkPlugins | lines 10–18, new markdown block |
| `src/styles/global.css` | `--font-alpino` token declared, used in body | Rename token declaration and `body { font-family }` reference | lines 43–44, 66 |
| `src/layouts/BaseLayout.astro` | `<Font cssVariable="--font-alpino">` | Change cssVariable value only | line 22 |
| `src/components/SEO.astro` | `og:type` hardcoded to `"website"` | Add optional `type` prop, thread through to meta tag | lines 1–7, 29 |

---

## Metadata

**Analog search scope:** `src/layouts/`, `src/components/`, `src/pages/`, `astro.config.mjs`, `src/styles/global.css`
**Files scanned:** 14 source files read directly
**Pattern extraction date:** 2026-05-11
