# Architecture Patterns

**Project:** Tuwa Marketing Website
**Domain:** iOS app marketing site (Astro + Tailwind + MDX on Cloudflare Pages)
**Researched:** 2026-05-10
**Confidence:** HIGH (Astro docs verified, Cloudflare deployment verified)

---

## Recommended Architecture

A static-first, file-system-routed Astro site. Every page is pre-rendered at build time to plain HTML. JavaScript is added only via Astro Islands where interaction is required (theme toggle, mobile nav). No client-side framework is needed; all animation is CSS or vanilla JS via `<script>` tags.

```
Browser
  └─ Cloudflare Pages CDN (static HTML + assets)
       └─ Astro build output (/dist)
            ├─ Pre-rendered pages (.html)
            ├─ Static assets (/public pass-through)
            └─ Scoped CSS (Tailwind JIT + component styles)
```

Data flows in one direction: markdown/MDX content files → Astro build pipeline → static HTML. No runtime database, no API calls at render time.

---

## Project Directory Structure

```
tuwa-website/
├── astro.config.mjs          # Astro config: integrations, adapter, site URL
├── tailwind.config.mjs       # Tailwind: content paths, dark mode, theme tokens
├── tsconfig.json
├── wrangler.toml             # Cloudflare Pages: project name, assets dir, compat flags
│
├── public/                   # Pass-through assets (no processing)
│   ├── fonts/                # Self-hosted Alpino font files (woff2)
│   ├── images/               # App screenshots, OG default image
│   └── favicon.ico
│
└── src/
    ├── content.config.ts     # Content collection schemas (Astro v5 location)
    │
    ├── content/
    │   └── blog/             # MDX blog posts
    │       └── *.mdx
    │
    ├── pages/                # File-system routing — each file = one URL
    │   ├── index.astro       # / (landing page)
    │   ├── support.astro     # /support
    │   ├── privacy.astro     # /privacy
    │   ├── terms.astro       # /terms
    │   ├── features/
    │   │   ├── recovery-scoring.astro
    │   │   ├── workload-tracking.astro
    │   │   ├── smart-templates.astro
    │   │   ├── cold-start-onboarding.astro
    │   │   └── coaching.astro
    │   └── blog/
    │       ├── index.astro   # /blog (post listing)
    │       └── [...slug].astro  # /blog/[slug] (dynamic, getStaticPaths)
    │
    ├── layouts/
    │   ├── Base.astro        # HTML shell: <head>, font loading, theme init
    │   ├── Marketing.astro   # Wraps Base; adds Header + Footer
    │   ├── FeaturePage.astro # Extends Marketing; structured feature layout
    │   ├── LegalPage.astro   # Extends Marketing; prose wrapper for legal text
    │   └── BlogPost.astro    # Extends Marketing; article chrome + metadata
    │
    ├── components/
    │   ├── head/
    │   │   └── BaseHead.astro      # <title>, <meta>, OG tags, canonical URL
    │   ├── navigation/
    │   │   ├── Header.astro        # Site nav bar
    │   │   ├── MobileMenu.astro    # Island: client:load for toggle interactivity
    │   │   └── Footer.astro        # Links, App Store badge, legal links
    │   ├── sections/               # Landing page sections (used once on index)
    │   │   ├── Hero.astro
    │   │   ├── FeatureGrid.astro
    │   │   ├── SocialProof.astro
    │   │   └── DownloadCTA.astro
    │   ├── feature/                # Reusable on feature deep-dive pages
    │   │   ├── FeatureHero.astro
    │   │   ├── FeatureDetail.astro
    │   │   └── FeatureCTABar.astro
    │   ├── blog/
    │   │   ├── PostCard.astro      # Used on /blog index listing
    │   │   └── PostMeta.astro      # Author, date, reading time
    │   └── ui/
    │       ├── AppStoreBadge.astro # Reusable App Store download CTA
    │       ├── ThemeToggle.astro   # Island: client:load for dark/light switch
    │       ├── Button.astro
    │       └── DeviceMockup.astro  # Wraps screenshot in phone frame
    │
    └── styles/
        ├── global.css        # @font-face, CSS custom properties, Tailwind base
        └── prose.css         # Typography for legal pages and blog
```

---

## Component Boundaries

| Component | Responsibility | Communicates With | Notes |
|-----------|---------------|-------------------|-------|
| `Base.astro` | HTML shell, `<head>` injection, theme class init | `BaseHead`, all layouts | Single source of `<html>` and `<body>` tags |
| `BaseHead.astro` | All `<meta>`, OG tags, canonical URL, font preloads | `Base` (via slot) | Accepts `title`, `description`, `image` props |
| `Marketing.astro` | Adds `Header` + `Footer` around page slot | `Base`, `Header`, `Footer` | All public pages use this |
| `Header.astro` | Nav links, logo, theme toggle, mobile menu trigger | `ThemeToggle`, `MobileMenu` | Sticky positioning, backdrop blur |
| `MobileMenu.astro` | Collapsible nav for small viewports | `Header` (controlled by) | **Island** — `client:load` for toggle JS |
| `ThemeToggle.astro` | Dark/light mode switch button | DOM (`html.dark` class) | **Island** — `client:load`; reads `localStorage` |
| `Footer.astro` | Links, App Store badge, copyright | `AppStoreBadge` | Static, no interactivity |
| `Hero.astro` | Above-the-fold landing section | `AppStoreBadge`, `DeviceMockup` | Primary conversion surface |
| `FeatureGrid.astro` | 5-feature overview cards on landing | Links to feature deep-dive pages | Static grid |
| `FeaturePage.astro` | Layout for feature deep-dive pages | `Marketing`, `FeatureHero`, `FeatureDetail`, `FeatureCTABar` | Accepts structured props per feature |
| `LegalPage.astro` | Layout for privacy/terms/support | `Marketing` | Sets max-width prose wrapper |
| `BlogPost.astro` | Layout for individual blog posts | `Marketing`, `PostMeta`, content collection render | Receives frontmatter via props |
| Content collections | Blog MDX files with typed frontmatter | `BlogPost.astro`, `/blog/index.astro`, `/blog/[...slug].astro` | Schemas enforced by Zod in `content.config.ts` |

---

## Data Flow

### Static Pages (landing, features, legal)

```
Author edits .astro file
  → Astro build reads component props
  → Tailwind JIT scans markup
  → HTML emitted to /dist
  → Cloudflare Pages serves HTML
```

No runtime data fetching. Content is co-located in the `.astro` file or passed as component props.

### Blog Pages

```
Author writes src/content/blog/post.mdx
  → content.config.ts schema validates frontmatter (Zod)
  → /blog/index.astro: getCollection('blog') → list of posts
  → /blog/[...slug].astro: getStaticPaths() + render() → HTML per post
  → Cloudflare Pages serves pre-built HTML
```

### Theme (Dark/Light)

```
User clicks ThemeToggle (Island, client:load)
  → JS reads localStorage('theme') on mount
  → Writes 'dark' | 'light' to localStorage
  → Toggles html.dark class
  → Tailwind dark: variants respond via CSS
```

Theme class is also set in a `<script>` inside `Base.astro` that runs synchronously before paint to prevent flash of unstyled content (FOUC).

### SEO Metadata

```
Page component passes {title, description, image?} props
  → Marketing.astro / FeaturePage.astro / BlogPost.astro receive props
  → Forward to BaseHead.astro via layout slot
  → BaseHead renders all <meta> tags
```

One component owns all `<head>` content. Every page provides its own title and description. Blog posts use frontmatter fields. Feature pages use hardcoded props in the `.astro` file.

### Font Loading

```
Alpino .woff2 files → public/fonts/
  → global.css: @font-face declarations with font-display: swap
  → Base.astro: <link rel="preload"> for critical weights
  → Tailwind config: fontFamily.sans = ['Alpino', ...]
```

Fonts are self-hosted. No external CDN dependency at runtime.

---

## Layout Hierarchy

```
Base.astro
  └─ Marketing.astro         (adds Header + Footer)
       ├─ index.astro         (landing — no sub-layout, direct sections)
       ├─ FeaturePage.astro   (feature deep-dives)
       │    └─ features/*.astro
       ├─ LegalPage.astro     (prose pages)
       │    ├─ privacy.astro
       │    ├─ terms.astro
       │    └─ support.astro
       └─ BlogPost.astro      (individual posts)
            └─ blog/[...slug].astro
```

`blog/index.astro` (post listing) uses `Marketing.astro` directly — no sub-layout needed.

---

## Page Inventory

| URL | File | Layout | Notes |
|-----|------|---------|-------|
| `/` | `pages/index.astro` | `Marketing` | Hero + FeatureGrid + SocialProof + DownloadCTA sections |
| `/features/recovery-scoring` | `pages/features/recovery-scoring.astro` | `FeaturePage` | Deep-dive #1 |
| `/features/workload-tracking` | `pages/features/workload-tracking.astro` | `FeaturePage` | Deep-dive #2 |
| `/features/smart-templates` | `pages/features/smart-templates.astro` | `FeaturePage` | Deep-dive #3 |
| `/features/cold-start-onboarding` | `pages/features/cold-start-onboarding.astro` | `FeaturePage` | Deep-dive #4 |
| `/features/coaching` | `pages/features/coaching.astro` | `FeaturePage` | Deep-dive #5 |
| `/blog` | `pages/blog/index.astro` | `Marketing` | getCollection listing |
| `/blog/[slug]` | `pages/blog/[...slug].astro` | `BlogPost` | getStaticPaths + render |
| `/privacy` | `pages/privacy.astro` | `LegalPage` | Migrated from PRIVACY.md |
| `/terms` | `pages/terms.astro` | `LegalPage` | Migrated from TERMS.md |
| `/support` | `pages/support.astro` | `LegalPage` | Migrated from existing HTML |

---

## Astro Configuration

**`astro.config.mjs`**

For a fully static site on Cloudflare Pages, use the `@astrojs/cloudflare` adapter with `output: 'static'`. No server-side rendering is needed.

```javascript
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://tuwa.app',
  adapter: cloudflare(),
  output: 'static',
  integrations: [tailwind(), mdx()],
});
```

**`wrangler.toml`**

```toml
name = "tuwa-website"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = "./dist"
```

---

## Dark Mode Pattern

Tailwind `darkMode: 'class'` in `tailwind.config.mjs`. The `html` element receives the `dark` class.

Anti-FOUC script runs synchronously in `<head>` inside `Base.astro`:

```javascript
// Inline script — must run before paint
const theme = localStorage.getItem('theme') ?? 'light';
document.documentElement.classList.toggle('dark', theme === 'dark');
```

`ThemeToggle.astro` is a client-side island (`client:load`) that reads/writes `localStorage` and toggles the class. All other theme-sensitive styles use Tailwind `dark:` variants scoped to components.

---

## Islands Usage (JavaScript Boundaries)

The site is zero-JS by default. These are the only islands:

| Component | Directive | Reason |
|-----------|-----------|--------|
| `ThemeToggle.astro` | `client:load` | Needs localStorage on mount; must run immediately to set initial state |
| `MobileMenu.astro` | `client:load` | Toggle requires event listeners; visible on mobile immediately |

All scroll-based animations (if used) are implemented via a single inline `<script>` tag in the relevant `.astro` component using `IntersectionObserver`. No framework needed.

---

## Content Collections (Blog)

**`src/content.config.ts`** (Astro v5 location — note: not inside `src/content/`)

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),      // OG image override
  }),
});

export const collections = { blog };
```

Draft posts are excluded by filtering: `getCollection('blog', ({ data }) => !data.draft)`.

---

## Build Order (Suggested Phase Sequence)

Build in dependency order — foundations before consumers.

```
1. Project scaffold
   astro.config.mjs, tailwind.config.mjs, wrangler.toml, tsconfig.json

2. Design tokens + global styles
   public/fonts/, src/styles/global.css, tailwind.config.mjs theme extension

3. Base.astro + BaseHead.astro
   All pages depend on these — build and verify theme/font before anything else

4. Marketing.astro (Header + Footer)
   Required by every public page

5. Landing page (index.astro)
   Hero, FeatureGrid, SocialProof, DownloadCTA
   Most important page — validate design direction here

6. Legal pages (privacy, terms, support)
   Simple: LegalPage.astro layout + paste migrated content

7. Feature deep-dive pages
   FeaturePage.astro layout + 5 pages

8. Blog infrastructure
   content.config.ts schema, blog/index.astro listing, blog/[...slug].astro

9. Cloudflare Pages deployment
   wrangler.toml, preview deploy, verify build output
```

Each step produces a working deployable artifact. Unblock legal migration (step 6) early — it's low-risk and satisfies existing user expectations.

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Putting JS logic in non-island components
**What:** Adding `<script>` tags with `window` or `document` access in components that are not islands.
**Why bad:** Astro components render at build time; DOM APIs don't exist. Script tags are hoisted but can execute before hydration if not careful.
**Instead:** Limit DOM interaction to components marked with a `client:*` directive, or use an inline `<script>` with explicit null-guards.

### Anti-Pattern 2: One monolithic layout
**What:** A single `Layout.astro` that conditionally renders header/footer/blog chrome.
**Why bad:** Props sprawl, conditional logic in layout instead of composition, harder to extend.
**Instead:** Use the hierarchy above — `Base` → `Marketing` → specialized layouts. Each layout adds exactly one concern.

### Anti-Pattern 3: Blog content in pages/
**What:** Placing blog posts as `.astro` or `.md` files directly in `src/pages/blog/`.
**Why bad:** No type-safe frontmatter, no Zod validation, no `getCollection()` querying, no draft filtering.
**Instead:** Use content collections exclusively. `src/pages/blog/[...slug].astro` reads from the collection via `getStaticPaths`.

### Anti-Pattern 4: Importing client-side libraries globally
**What:** Importing animation libraries (GSAP, Framer Motion) in layouts or global scripts.
**Why bad:** Ships JS to every page even where unused; defeats Astro's zero-JS default.
**Instead:** `IntersectionObserver` with CSS transitions covers 90% of scroll animation needs. If a heavy library is needed, import it only inside the specific island component.

### Anti-Pattern 5: content.config.ts in the wrong place
**What:** Placing the content config at `src/content/config.ts` (Astro v4 convention).
**Why bad:** Astro v5 moved this file to `src/content.config.ts`. Wrong location silently skips schema validation.
**Instead:** Always use `src/content.config.ts` in v5 projects.

---

## Scalability Notes

This is a static marketing site — scalability is about build performance and content maintainability, not runtime load.

| Concern | Now (v1) | If blog grows (50+ posts) |
|---------|----------|--------------------------|
| Build time | <10s (11 pages) | ~30-60s (100 pages); still fast |
| Content authoring | Raw MDX in editor | Consider Decap CMS (Git-based) for non-dev authors |
| OG images | Static default | `@vercel/og` or `satori` can generate per-post images at build time |
| Font variants | 2-3 weights | Add only what Tailwind actually uses; tree-shake unused weights |

---

## Sources

- [Astro Project Structure — Official Docs](https://docs.astro.build/en/basics/project-structure/)
- [Astro Layouts — Official Docs](https://docs.astro.build/en/basics/layouts/)
- [Astro Content Collections — Official Docs](https://docs.astro.build/en/guides/content-collections/)
- [Astro MDX Integration — Official Docs](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Deploy Astro to Cloudflare Pages — Official Docs](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Astro Using Custom Fonts — Official Docs](https://docs.astro.build/en/guides/fonts/)
- [Astro Islands Architecture Explained — Strapi Blog](https://strapi.io/blog/astro-islands-architecture-explained-complete-guide)
- [Migrating Content Collections Astro 4 to 5 — Chen Hui Jing](https://chenhuijing.com/blog/migrating-content-collections-from-astro-4-to-5/)
- [Astro v5 Blog Starter — content.config.ts example](https://github.com/jldec/astro-v5-blog-starter/blob/main/src/content.config.ts)
- [Interactive Dark Mode with Tailwind and Astro View Transitions](https://namoku.dev/blog/darkmode-tailwind-astro/)
- [Astro SEO: The Definitive Guide — joost.blog](https://joost.blog/astro-seo-complete-guide/)
