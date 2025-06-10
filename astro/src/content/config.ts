import { defineCollection, z } from "astro:content";
import { glob, type Loader } from "astro/loaders";
import directus, { type Article, type DirectusUser, type Schema, type Series } from "@lib/directus"
import { auth, readItem, readItems, readRole, readUser, type DirectusFile, type DirectusRole } from "@directus/sdk"
import type { JSONContent } from '@tiptap/core';


function projectArticleIds(articles: (number | Article)[]) {
  return articles.map((article) => (typeof article === "number") ? article : article.id)
}

function displayFullName(western: boolean, personal_name: string | null, surname: string | null, middle_name: string | null) {
  if(surname && personal_name) {
    const middle = middle_name ? ` ${middle_name} ` : " ";
    return western ? `${personal_name}${middle}${surname}` : `${surname}${middle}${personal_name}`;
  } else {
    return surname || personal_name || ""
  }
}

const zodTipTapContent: z.ZodType<JSONContent> = z.intersection(z.object({
  type: z.string(),
  attrs: z.record(z.any()).optional(),
  get content() {
    return z.array(zodTipTapContent).optional()
  },
  marks: z.array(z.intersection(z.object({
    type: z.string(),
    attrs: z.record(z.any()).optional(),
  }),z.record(z.any()))).optional(),
  text: z.string().optional(),
}), z.record(z.any()))

type zodTipTapContent = z.infer<typeof zodTipTapContent>;

export async function getFileSrc(id: string | DirectusFile<Schema> | null) {
  if (!id) return null
  const uuid = (typeof id === 'string') ? id : id.id;
  return `https://cms.newsniper.org/assets/${id}?download=`
}

export async function getRoleName(id: string | DirectusRole | null) {
  if (!id) return null
  const uuid = (typeof id === 'string') ? id : id.id;
  const {name} = await directus.request(readRole(uuid,{fields: ['name']}))
  return name;
}

export async function getUserInfo(user: string | DirectusUser) {
  const uuid = (typeof user === 'string') ? user : user.id;
  const {avatar, role, ...u} = {...await directus.request(readUser(uuid, {
    fields: ['first_name', 'middle_name', 'last_name', 'western_name_ordering', 'email', 'slug', 'avatar', 'role', 'description', {'contributed_articles': ['*']}]
  }))}
  return {
    avatar: await getFileSrc(avatar),
    role: await getRoleName(role),
    ...u
  }
}

async function getSeriesBrief(series: string | Series) {
  const uuid = (typeof series === "string") ? series : series.id;
  const {title, id} = await directus.request(readItem("series",uuid,{
    fields: ['title', 'id']
  }))
  return {title, id}
}


async function ArticlesLoader() {
  const articles = await directus.request(readItems("articles", {
    filter: {
      id: {_null: false},
      title: {_null: false},
      status: { _eq: 'published' }
    }
  }));
  return await Promise.all(articles.map(async ({
    id,
    title,
    subtitles,
    date_orig,
    user_created, date_created,
    contributors,
    categories, series, keywords,
    content
  }) => ({
    id: `${id}`,
    title,
    description: subtitles,
    authors: (await Promise.all([user_created, ...contributors].map(async (author) => await getUserInfo(author)))).map((author) => ({
      slug: author.slug,
      avatar: author.avatar,
      email: author.email,
      fullName: displayFullName(author.western_name_ordering,author.first_name, author.last_name, author.middle_name)
    })),
    date: date_orig ?? date_created,
    categories: categories ?? [], series: (series) ? await getSeriesBrief(series) : null, keywords: keywords ?? [],
    content
  })))
}

const article = defineCollection({
  type: 'content_layer',
  loader: ArticlesLoader,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    authors: z.array(z.object({
      slug: z.string(),
      avatar: z.string(),
      email: z.string(),
      fullName: z.string()
    })),
    date: z.coerce.date(),
    categories: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    series: z.object({
      title: z.string(),
      id: z.string()
    }).nullable(),
    content: zodTipTapContent
  }),
});

async function SeriesLoader() {
  const serieses = await directus.request(readItems("series", {
    filter: {
      id: {_null: false},
      articles: {_null: false}
    }
  }));
  return serieses.map(({articles: article_entries, use_banner, simple_description, content, id, title}) => ({
    id, title,
    articleIds: projectArticleIds(article_entries),
    statusEnabled: use_banner,
    description: simple_description,
    content
  }))
}

const series = defineCollection({
  type: 'content_layer',
  loader: SeriesLoader,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    statusEnabled: z.boolean(),
    content: zodTipTapContent,
    articleIds: z.array(z.number())
  }),
});


async function BannerDataLoader() {
  const serieses = await directus.request(readItems("series", {
    filter: {
      articles: {_null: false},
      use_banner: {'_eq': true}
    }
  }));
  return serieses.map(({articles: article_entries, banner_data, simple_description, id, title}) => ({
    id, title,
    articleIds: projectArticleIds(article_entries),
    bannerData: banner_data,
    description: simple_description
  }))
}

const banner = defineCollection({
  type: 'content_layer',
  loader: BannerDataLoader,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    articleIds: z.array(z.number()),
    bannerData: z.record(z.any())
  }),
})

export const collections = { article, series, banner };
