import rss from "@astrojs/rss";

import { getPostLink, type Summary } from "helpers";
import { GET as getSummary } from "./api/summary.ts";

export async function GET() {
  const summary: Summary = await getSummary().then((x) => x.json());

  return rss({
    title: `${summary.name}'s Blog`,
    description: summary.bio,
    site: import.meta.env.SITE,
    items: summary.posts.map((post) => {
      return {
        link: getPostLink(post),
        title: post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.summary,
        author: summary.name,
      };
    }),
  });
}
