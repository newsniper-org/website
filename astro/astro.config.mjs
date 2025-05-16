import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";


import cloudflare from "@astrojs/cloudflare";


// https://astro.build/config
export default defineConfig({
  site: "https://www.newsniper.org/",
  integrations: [tailwind(), sitemap(), mdx(), pagefind()],

  markdown: {
    shikiConfig: {
      theme: "css-variables"
    }
  },

  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
      configPath: 'wrangler.jsonc',
      persist: true,
    },
    imageService: {
      provider: "cloudflare",
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
      token: process.env.CLOUDFLARE_API_TOKEN,
    },
  }),
  vite: {
    build: {
      minify: false,
    },
  },
});