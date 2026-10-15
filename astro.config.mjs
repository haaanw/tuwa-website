// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from './src/remark-reading-time.mjs';

// Astro and @tailwindcss/vite can resolve Vite through different package paths.
// The runtime plugin is valid; this narrow cast keeps Astro's stricter config check green.
const tailwindPlugin = /** @type {any} */ (tailwindcss());

export default defineConfig({
  site: "https://tuwa.app",
  i18n: {
    locales: ["en", "zh", "fr"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [
    mdx(),
    sitemap({
      // The referral fallback (/r/<token> → /friend-link/) and the MCP connector's OAuth consent
      // page (/oauth/consent/) are utility pages, never search results.
      filter: (page) => !page.includes('/friend-link/') && !page.includes('/oauth/'),
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          zh: 'zh-CN',
          fr: 'fr',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindPlugin],
  },
});
