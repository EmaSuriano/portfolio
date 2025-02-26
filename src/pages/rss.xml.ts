import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

import { getPostLink, type Post, type Summary } from "helpers";
import { GET as getSummary } from "./api/summary.ts";
import { GET as getPosts } from "./api/posts.ts";

const parseBody = (body?: string) => {
  if (!body) {
    return undefined;
  }

  return sanitizeHtml(parser.render(body), {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
  });
};

export async function GET() {
  const summary: Summary = await getSummary().then((x) => x.json());
  const posts: Post[] = await getPosts().then((x) => x.json());

  return rss({
    title: `${summary.name}'s Blog`,
    description: summary.bio,
    site: import.meta.env.SITE,
    items: posts.map((post) => {
      return {
        link: getPostLink(post),
        title: post.data.title,
        pubDate: post.data.publishedAt,
        description: post.data.summary,
        author: summary.name,
        content: parseBody(post.body),
      };
    }),
  });
}
