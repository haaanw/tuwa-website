---
phase: 04-blog-polish
reviewed: 2026-05-11T00:00:00Z
depth: standard
files_reviewed: 10
files_reviewed_list:
  - astro.config.mjs
  - src/components/SEO.astro
  - src/content.config.ts
  - src/layouts/BaseLayout.astro
  - src/layouts/BlogPostLayout.astro
  - src/pages/blog/[...slug].astro
  - src/pages/blog/index.astro
  - src/remark-reading-time.mjs
  - src/styles/global.css
  - public/robots.txt
findings:
  critical: 0
  warning: 4
  info: 4
  total: 8
status: issues_found
---

# Phase 04: Code Review Report

**Reviewed:** 2026-05-11T00:00:00Z
**Depth:** standard
**Files Reviewed:** 10
**Status:** issues_found

## Summary

Reviewed 10 source files covering the blog infrastructure added in Phase 04. The implementation is solid overall — the content collection schema, reading-time plugin, static path generation, and SEO wiring are all correct. No critical security issues found. The primary concerns are: a missing `og:image:alt` tag that affects social sharing accessibility and SEO, a Fontshare provider conflict with CLAUDE.md's self-hosting requirement, a `minutesRead` type mismatch that may silently fail, and a missing last-list-item bottom border on the blog index. Four informational items cover minor quality improvements.

## Warnings

### WR-01: Missing `og:image:alt` on OG/Twitter image tags

**File:** `src/components/SEO.astro:28-35`
**Issue:** `og:image:alt` and `twitter:image:alt` are not set. Without these tags, scrapers and accessibility tools that render social cards cannot describe the image. Some social platforms (LinkedIn) use `og:image:alt` to satisfy alt-text requirements for link previews. This is a correctness gap for the SEO component.
**Fix:**
```astro
---
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  ogImageAlt?: string;   // add this
  canonical?: string;
  type?: string;
}

const {
  ogImage = "/og-default.png",
  ogImageAlt = description,  // default to description, which is always present
  ...
} = Astro.props;
---
<meta property="og:image" content={resolvedOgImage} />
<meta property="og:image:alt" content={ogImageAlt} />
...
<meta name="twitter:image" content={resolvedOgImage} />
<meta name="twitter:image:alt" content={ogImageAlt} />
```

---

### WR-02: Fontshare `fontProviders.fontshare()` loads font from CDN, contradicting self-hosting requirement

**File:** `astro.config.mjs:2,11-21`
**Issue:** `fontProviders.fontshare()` fetches the font from the Fontshare CDN at runtime. The CLAUDE.md stack spec explicitly states: "Alpino is from Fontshare and **must be self-hosted** — there is no CDN URL. Place the font files in `public/fonts/`, declare `@font-face` in `global.css`." The current config also uses "General Sans" rather than "Alpino", which may be a font substitution that bypassed the self-hosting decision. A CDN-loaded font is a single point of failure and adds an external DNS lookup on every page load.
**Fix:** Remove the `fonts` block from `astro.config.mjs` entirely. Add `@font-face` declarations to `global.css` pointing to files in `public/fonts/`. Add `<link rel="preload">` hints in `BaseLayout.astro` for the woff2 variants:
```css
/* global.css */
@font-face {
  font-family: "Alpino";
  src: url("/fonts/Alpino-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Alpino";
  src: url("/fonts/Alpino-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
```
```astro
<!-- BaseLayout.astro <head> — replace <Font ... /> -->
<link rel="preload" href="/fonts/Alpino-Regular.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/Alpino-SemiBold.woff2" as="font" type="font/woff2" crossorigin />
```

---

### WR-03: `minutesRead` type is `any` at consumption point — silent failure if remark plugin is absent

**File:** `src/pages/blog/[...slug].astro:17`
**Issue:** `remarkPluginFrontmatter.minutesRead` is typed as `any` because `remarkPluginFrontmatter` has no declared type in Astro's `render()` return. If the `reading-time` package or the remark plugin fails silently (e.g., `mdast-util-to-string` returns an empty string for an empty post), `readingTime.text` is still set (`"0 min read"`) but `minutesRead` could be `undefined` if the plugin throws and the frontmatter key is never written. `BlogPostLayout` accepts `minutesRead?: string` which gracefully hides it — but the failure is invisible in CI. A defensive check is warranted.
**Fix:**
```astro
// src/pages/blog/[...slug].astro
const minutesRead: string | undefined =
  typeof remarkPluginFrontmatter?.minutesRead === 'string'
    ? remarkPluginFrontmatter.minutesRead
    : undefined;
```

---

### WR-04: Blog index list has no bottom border on the last item

**File:** `src/pages/blog/index.astro:38`
**Issue:** Each `<li>` has `border-top: 1px solid var(--color-divider)`, which means the list has an opening rule before each card but no closing rule after the last card. Visually, the list appears to float without a bottom boundary, which looks unfinished against the page background. This is a deliberate design choice in some systems, but given the site's card-border aesthetic used elsewhere, it is likely an oversight.
**Fix:** Add a border-bottom to the `<ul>`:
```astro
<ul style="list-style: none; padding: 0; margin-top: var(--space-2xl); border-bottom: 1px solid var(--color-divider);">
```

---

## Info

### IN-01: `@tailwindcss/typography` version mismatch with Tailwind v4

**File:** `package.json` (via `src/styles/global.css:4`)
**Issue:** `package.json` lists `"@tailwindcss/typography": "^0.5.19"`, but `global.css` uses the v4 plugin syntax `@plugin "@tailwindcss/typography"`. The v0.5.x package is for Tailwind v3. Tailwind v4 requires `@tailwindcss/typography` v0.6+ which uses the new `@plugin` API. This may work currently if Tailwind v4 applies a compatibility shim, but it is a fragile dependency pairing.
**Fix:** Upgrade to the latest `@tailwindcss/typography` that supports Tailwind v4:
```bash
npm install @tailwindcss/typography@latest
```
Verify the installed version is 0.6.x or higher.

---

### IN-02: `getCollection` draft filter duplicated between two pages

**File:** `src/pages/blog/[...slug].astro:6-8`, `src/pages/blog/index.astro:5-7`
**Issue:** Both pages repeat the identical draft-filter predicate `!import.meta.env.PROD || !data.draft`. This logic will need to be updated in two places if filtering requirements change (e.g., adding a `scheduledDate` field). Extract to a shared utility.
**Fix:**
```typescript
// src/lib/blog.ts
import { getCollection } from 'astro:content';

export function getBlogPosts() {
  return getCollection('blog', ({ data }) =>
    !import.meta.env.PROD || !data.draft
  );
}
```

---

### IN-03: `astro.config.mjs` `@ts-check` pragma with no JSDoc types provides no enforcement

**File:** `astro.config.mjs:1`
**Issue:** The `// @ts-check` comment at the top enables TypeScript checking of the JS file, but there are no JSDoc type annotations in the file. This means `@ts-check` only catches basic JS type errors. The `defineConfig` return type is inferred correctly via the import, so this is not a bug — just a note that `@ts-check` without annotations is mostly decorative here.
**Fix:** No change required. If type safety of the config becomes important, consider renaming to `astro.config.ts`.

---

### IN-04: `src/content.config.ts` — no `readingTime` field in schema; `minutesRead` only available from remark, not queryable

**File:** `src/content.config.ts:6-13`
**Issue:** The reading time is computed by the remark plugin at render time and stored in `remarkPluginFrontmatter`, not in the collection's Zod schema. This means `minutesRead` cannot be used on the blog index listing (e.g., "5 min read" next to each post title) without rendering each post individually — which defeats static pre-rendering efficiency. If the blog index should eventually show reading times, the architecture needs to either add it to the schema as a manually-set field, or use the `reading-time` package directly in the collection loader.
**Fix (option A — manual field in schema):** Add `minutesRead: z.string().optional()` to the schema and set it in each MDX frontmatter.
**Fix (option B — keep current):** Acceptable if the blog index listing does not need to show reading times. Document the limitation with a comment in the schema.

---

_Reviewed: 2026-05-11T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
