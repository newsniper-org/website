import { defineCollection, z } from "astro:content";

const article = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional(),
    categories: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    series: z.string().optional()
  }),
});

const series = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().optional(),
    statusEnabled: z.boolean().default(true)
  }),
});

const banner = defineCollection({
  type: "content"
})

export const collections = { article, series, banner };
