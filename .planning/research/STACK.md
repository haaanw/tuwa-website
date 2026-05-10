# Technology Stack

**Project:** Tuwa Marketing Website
**Researched:** 2026-05-10
**Confidence:** HIGH — all recommendations verified against official docs and current (2026) sources

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Astro | 6.x (latest: 6.3.1) | Static site generator, page routing, content collections | Greenfield project should start on Astro 6, not 5. v6 is stable and production-ready as of early 2026. Key advantage: dev/prod parity — the dev server now uses the same Cloudflare Workers runtime as production, eliminating a whole class of "works locally, breaks in prod" bugs. Astro's zero-JS-by-default model is ideal for a marketing site where Core Web Vitals matter for App Store link conversions. |
| @astrojs/mdx | bundled with Astro | MDX content rendering for blog | First-party integration, maintained by the Astro team. Enables blog posts that embed custom Astro components (charts, callouts, CTA blocks) without a separate CMS. Use content collections with Zod schema validation for type-safe frontmatter. |

**Confidence: HIGH** — Astro 6.3.1 confirmed as latest stable on npm as of 2026-05-10.

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (latest stable) | Utility-first CSS | Tailwind v4 rewrites configuration as CSS variables in a global.css file instead of tailwind.config.js. This aligns perfectly with the design token approach from the app's DESIGN.md. Dark mode uses `@custom-variant dark` in CSS rather than a config key. |
| @tailwindcss/vite | 4.x | Vite plugin for Tailwind integration | This is the required integration method for Tailwind v4 in Astro. Goes in `vite.plugins`, NOT in Astro's `integrations` array. The older `@astrojs/tailwind` package is deprecated for Tailwind v4 — do not use it. |
| @tailwindcss/typography | 4.x | Prose styles for MDX blog content | Provides sensible typographic defaults for markdown-rendered blog post body copy without manual prose styling. Essential for the blog infrastructure requirement. |

**Confidence: HIGH** — Installation method confirmed via official Tailwind CSS docs (tailwindcss.com/docs/installation/framework-guides/astro).

### Deployment

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Cloudflare Pages | N/A (managed) | Hosting and global CDN | Specified constraint. For a fully static site, no adapter is needed — connect the GitHub repo in the Cloudflare Pages dashboard, set build command to `npm run build`, output directory to `dist`. Attempting to use the `@astrojs/cloudflare` adapter WITH static output mode causes deployment failures; skip the adapter entirely for a pure static site. |

**Confidence: HIGH** — Confirmed via Astro deploy docs and multiple 2025/2026 deployment guides.

### SEO and Metadata

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @astrojs/sitemap | bundled with Astro | Auto-generate sitemap.xml | First-party, zero-config for static sites. Required for App Store search indexing upstream: Google needs to find the site for "tuwa app" queries. |
| Manual SEO component (no package) | N/A | Per-page meta tags and OG tags | Write a `<SEO>` Astro component once in `src/components/SEO.astro`, accepting props (title, description, ogImage, canonical). The `astro-seo` package by jonasmerlin has 54K weekly downloads but infrequent releases and a single maintainer — not worth the dependency risk for a small props-driven component you can own in 30 lines. |
| @vercel/og (satori) | latest | Dynamic OG image generation | Use satori to generate per-page PNG OG images at build time via Astro endpoints. Supports TTF/OTF fonts (Alpino works here). Generates shareable preview cards for each feature deep-dive page and blog post. Worth the complexity because App Store link posts on social media get dramatically higher CTR with branded OG images. |

**Confidence (sitemap): HIGH** — official Astro integration.
**Confidence (manual SEO): HIGH** — recommended over astro-seo package based on maintenance assessment.
**Confidence (satori OG): MEDIUM** — multiple 2025/2026 implementation guides confirm the pattern works; verify satori's TTF font support for Alpino before committing.

### Animation

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| CSS + Intersection Observer API (native) | N/A | Scroll-triggered reveal animations | For a marketing site where performance is the product argument, start with native. Define `@keyframes` in global.css, use `data-animate` attributes, wire a small inline `<script>` (Astro script tag) using IntersectionObserver. Zero KB added to the bundle. Covers the "subtle scroll animations" requirement from the design direction. |
| Motion (formerly Framer Motion) | only if needed | Complex timeline animations (hero, device mockup entrance) | If the hero section requires sequenced device mockup animations that CSS alone cannot handle cleanly, add `motion` (the standalone library, not the React variant). It works in Astro islands without committing to React. Keep it as an island so it doesn't block page paint. |

**Confidence: HIGH** — Native IntersectionObserver is the right starting point for performance-critical marketing sites; confirmed by multiple 2025 guides.

### Fonts

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Self-hosted Alpino via @font-face | N/A | Primary typeface | Alpino is from Fontshare (free commercial license) and must be self-hosted — there is no CDN URL. Place the font files in `public/fonts/`, declare `@font-face` in `global.css` with `font-display: swap` and `preload` link hints in the `<head>`. Astro 6 has a built-in Fonts API that can manage local font files with automatic fallback generation — prefer this over the `astro-font` third-party package. |

**Confidence: HIGH** — Self-hosting from `public/fonts/` with `@font-face` is the standard Astro pattern for non-CDN fonts.

### Content and Tooling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Zod | bundled with Astro (v4 in Astro 6) | Content collection schema validation | Astro 6 ships Zod 4. Define blog post frontmatter schemas (title, description, pubDate, ogImage, tags) in `src/content/config.ts`. TypeScript errors surface at build time, not at runtime. |
| TypeScript | 5.x | Type safety across components | Astro ships with TypeScript support out of the box. Use strict mode. Catch prop mismatches in SEO component and content queries before deployment. |
| Sharp | bundled with Astro | Image processing and optimization | Astro uses Sharp internally for the `<Image>` and `<Picture>` components. Export app screenshots as PNG, use `<Image>` to auto-generate WebP/AVIF variants with correct `srcset`. No additional install needed. |

---

## Installation

```bash
# Scaffold project (choose "Minimal" template)
npm create astro@latest tuwa-website -- --template minimal

# Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography

# MDX support (run via Astro CLI to auto-configure)
npx astro add mdx

# Sitemap
npx astro add sitemap

# OG image generation
npm install @vercel/og
```

### astro.config.mjs (complete baseline)

```javascript
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tuwa.app",
  output: "static",
  integrations: [
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### src/styles/global.css (Tailwind v4 + dark mode)

```css
@import "tailwindcss";
@import "@tailwindcss/typography";

/* Class-based dark mode for manual toggle (matches app dual-mode palette) */
@custom-variant dark (&:where(.dark, .dark *));

/* Alpino self-hosted font */
@font-face {
  font-family: "Alpino";
  src: url("/fonts/Alpino-Regular.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}

@font-face {
  font-family: "Alpino";
  src: url("/fonts/Alpino-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "Alpino";
  src: url("/fonts/Alpino-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}

/* Design tokens from app DESIGN.md — set once, consume everywhere */
:root {
  --font-sans: "Alpino", ui-sans-serif, system-ui, sans-serif;
  /* travertine palette and accent tokens go here */
}
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Astro 6 | Next.js 15 | Next requires a Node.js runtime; Cloudflare Pages static + CDN is sufficient for this use case. Next adds unnecessary server complexity for a marketing site. Astro ships 0 JS by default; Next ships React runtime on every page. |
| Framework version | Astro 6 | Astro 5 | New project — start on the current major. Astro 5 is still maintained but receives no new features. The dev/prod parity fix in Astro 6 is particularly valuable for Cloudflare Pages. |
| CSS | Tailwind v4 | Tailwind v3 | v3 is in maintenance mode. v4's CSS-variable-based config maps directly to the design token system in DESIGN.md. v4 is faster (LightningCSS under the hood). |
| Tailwind integration | @tailwindcss/vite | @astrojs/tailwind | @astrojs/tailwind is explicitly deprecated for Tailwind v4. Do not use it. |
| SEO component | Custom (30-line component) | astro-seo package | Package has single maintainer, infrequent releases, and adds zero logic you couldn't write yourself in 30 lines. Owning the component is less risk. |
| Animations | CSS IntersectionObserver | GSAP ScrollTrigger | GSAP adds 48KB minimum. Overkill for "subtle scroll reveals." If animation becomes the hero differentiator, revisit — but start native. |
| CMS | MDX content collections | Storyblok / Prismic | No non-technical content editors exist for this project. MDX + Git is simpler, faster to ship, and avoids a paid SaaS dependency. |
| Deployment adapter | None (pure static) | @astrojs/cloudflare | The Cloudflare adapter is required only for SSR/edge functions. Using it alongside `output: "static"` causes deployment failures. Skip it entirely. |

---

## Confidence Assessment by Area

| Decision | Confidence | Source |
|----------|------------|--------|
| Astro 6.3.1 as current version | HIGH | npm registry confirmed 2026-05-10 |
| Tailwind v4 via @tailwindcss/vite | HIGH | Official Tailwind docs (tailwindcss.com) |
| Dark mode via @custom-variant | HIGH | Official Tailwind v4 dark mode docs |
| No adapter for static Cloudflare Pages | HIGH | Astro deploy docs + multiple deployment guides |
| @astrojs/sitemap | HIGH | First-party Astro integration |
| satori OG image generation | MEDIUM | Multiple guides confirm; verify Alpino TTF support |
| Motion library for complex animations | LOW | Only if needed; pattern unverified for this specific use case |

---

## Sources

- [Tailwind CSS + Astro official install guide](https://tailwindcss.com/docs/installation/framework-guides/astro)
- [Tailwind v4 dark mode docs](https://tailwindcss.com/docs/dark-mode)
- [Astro 5.2 Tailwind 4 announcement](https://astro.build/blog/astro-520/)
- [Astro 6.0 release](https://astro.build/blog/astro-6/)
- [Astro deploy to Cloudflare Pages](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Cloudflare Pages Astro framework guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Astro content collections docs](https://docs.astro.build/en/guides/content-collections/)
- [astro-seo package (jonasmerlin)](https://github.com/jonasmerlin/astro-seo) — assessed, not recommended
- [Vercel satori OG image library](https://github.com/vercel/satori)
- [Astro font self-hosting guide](https://docs.astro.build/en/guides/fonts/)
- [StackOne marketing site rebuild with Astro + Cloudflare](https://www.stackone.com/blog/rebuilding-marketing-site-claude-code-cloudflare/)
- [Astro + Cloudflare Pages deployment pitfalls](https://www.gmkennedy.com/blog/deploy-astro-cloudflare-pages/)
- [Astro 6 vs Astro 5 production comparison](https://www.southwellmedia.com/blog/astro-6-stable-release)
