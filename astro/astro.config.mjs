// import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import netlify from "@astrojs/netlify";

import db from "@astrojs/db";
import studiocms from "studiocms";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://www.newsniper.org/",
  integrations: [sitemap(), mdx(), pagefind(), db(), studiocms()],
  markdown: {
    shikiConfig: {
      theme: "css-variables"
    }
  },
  output: "server",
  adapter: netlify({
    edgeMiddleware: true,
    cacheOnDemandPages: true,
    excludeFiles: ["./node_modules/**"],
    imageCDN: false
  }),
  vite: {
    plugins: [tailwindcss(),]
  }
});