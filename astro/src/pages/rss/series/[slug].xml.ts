import rss from "@astrojs/rss";
import { SITE } from "@consts";
import { getCollection, getEntry } from "astro:content";
import type {APIRoute} from "astro"

import { getPageURL } from "@lib/utils";

export const GET: APIRoute = async ({params, request, redirect, ...context}) => {
  const slug = params['slug']
  if(!slug) {
    return redirect("/rss.xml");
  }
  const series = await getEntry("series", slug)
  if(!series) {
    return new Response(null, {
      status: 404,
      statusText: "Series not found",
    });
  }
  const articles = (await Promise.all(series.data.articleIds.map(async (id) => await getEntry("article",`${id}`)))).filter((article) => (article !== undefined))
  const items = articles.sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf(),
  );

  return rss({
    title: series.data.title,
    description: series.data.description,
    site: context.site ? getPageURL(context.site,"series",slug) : "",
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.id}/`,
    })),
  });
}
