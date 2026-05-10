// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tuwa.app",
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
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
