// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from './src/remark-reading-time.mjs';

export default defineConfig({
  site: "https://tuwa.app",
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
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
