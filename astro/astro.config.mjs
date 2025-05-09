import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

import netlify from "@astrojs/netlify";

import db from "@astrojs/db";
import studiocms from "studiocms";

// https://astro.build/config
export default defineConfig({
  site: "https://www.newsniper.org/",
  integrations: [db(), studiocms(), tailwind(), sitemap(), mdx(), pagefind()],
  markdown: {
    shikiConfig: {
      theme: "css-variables"
    }
  },
  output: "server",
  adapter: netlify({
    edgeMiddleware: false,
    cacheOnDemandPages: true,
  }),
  vite: {
    build: {
      rollupOptions: {
        input: {
          exclude: ["node_moudles/**"]
        }
      }
    }
  }
});