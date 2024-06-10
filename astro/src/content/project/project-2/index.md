---
title: Astro Nano
description: Minimal portfolio and blog build with astro and no frameworks.
date: '2024-03-26'
demoURL: 'https://astro-nano-demo.vercel.app'
repoURL: 'https://github.com/markhorn-dev/astro-nano'
---




export const quartoRawHtml =
[`
<table>
<colgroup>
<col style="width: 33%" />
<col style="width: 66%" />
</colgroup>
<thead>
<tr class="header">
<th style="text-align: left;">Command</th>
<th style="text-align: left;">Action</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td style="text-align: left;"><code>npm install</code></td>
<td style="text-align: left;">Installs dependencies</td>
</tr>
<tr class="even">
<td style="text-align: left;"><code>npm run dev</code></td>
<td style="text-align: left;">Starts local dev server at <code>localhost:4321</code></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><code>npm run dev:network</code></td>
<td style="text-align: left;">Starts local dev server on local network</td>
</tr>
<tr class="even">
<td style="text-align: left;"><code>npm run sync</code></td>
<td style="text-align: left;">Generates TypeScript types for all Astro modules.</td>
</tr>
<tr class="odd">
<td style="text-align: left;"><code>npm run build</code></td>
<td style="text-align: left;">Build your production site to <code>./dist/</code></td>
</tr>
<tr class="even">
<td style="text-align: left;"><code>npm run preview</code></td>
<td style="text-align: left;">Preview your build locally, before deploying</td>
</tr>
<tr class="odd">
<td style="text-align: left;"><code>npm run preview:network</code></td>
<td style="text-align: left;">Preview build on local network</td>
</tr>
<tr class="even">
<td style="text-align: left;"><code>npm run astro ...</code></td>
<td style="text-align: left;">Run CLI commands like <code>astro add</code>, <code>astro check</code></td>
</tr>
<tr class="odd">
<td style="text-align: left;"><code>npm run astro -- --help</code></td>
<td style="text-align: left;">Get help using the Astro CLI</td>
</tr>
<tr class="even">
<td style="text-align: left;"><code>npm run lint</code></td>
<td style="text-align: left;">Run ESLint</td>
</tr>
<tr class="odd">
<td style="text-align: left;"><code>npm run lint:fix</code></td>
<td style="text-align: left;">Auto-fix ESLint issues</td>
</tr>
</tbody>
</table>
`];

<figure>
<img src="../../..\astro-nano.png" alt="Astro Nano" />
<figcaption aria-hidden="true">Astro Nano</figcaption>
</figure>

Astro Nano is a static, minimalist, lightweight, lightning fast
portfolio and blog theme.

Built with Astro, Tailwind and Typescript, and no frameworks.

It was designed as an even more minimal theme than Mark Horn’s popular
theme [Astro Sphere](https://github.com/markhorn-dev/astro-sphere)

## 🚀 Deploy your own {#deploy-your-own}

<a target="_blank" aria-label="Deploy with Vercel" href="https://vercel.com/new/clone?repository-url=https://github.com/markhorn-dev/astro-nano">
<img src="/deploy_vercel.svg" /> </a>
<a target="_blank" aria-label="Deploy with Netlify" href="https://app.netlify.com/start/deploy?repository=https://github.com/markhorn-dev/astro-nano">
<img src="/deploy_netlify.svg" /> </a>

## 📋 Features {#features}

-   ✅ 100/100 Lighthouse performance
-   ✅ Responsive
-   ✅ Accessible
-   ✅ SEO-friendly
-   ✅ Typesafe
-   ✅ Minimal style
-   ✅ Light/Dark Theme
-   ✅ Animated UI
-   ✅ Tailwind styling
-   ✅ Auto generated sitemap
-   ✅ Auto generated RSS Feed
-   ✅ Markdown support
-   ✅ MDX Support (components in your markdown)

## 💯 Lighthouse score {#lighthouse-score}

<figure>
<img src="../../..\astro-nano-lighthouse.jpg"
alt="Astro Nano Lighthouse Score" />
<figcaption aria-hidden="true">Astro Nano Lighthouse Score</figcaption>
</figure>

## 🕊️ Lightweight {#lightweight}

No frameworks or added bulk

## ⚡︎ Fast {#fast}

Rendered in ~40ms on localhost

## 📄 Configuration {#configuration}

The blog posts on the demo serve as the documentation and configuration.

## 💻 Commands {#commands}

All commands are run from the root of the project, from a terminal:

Replace npm with your package manager of choice. `npm`, `pnpm`, `yarn`,
`bun`, etc

<div dangerouslySetInnerHTML={{ __html: quartoRawHtml[0] }} />

## 🏛️ License {#license}

MIT
