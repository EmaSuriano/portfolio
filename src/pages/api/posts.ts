import { getPostLink, sortPostByDate, isDraft } from "helpers";
import { getCollection } from "astro:content";

export async function GET() {
  const blogPosts = await getCollection("blog");
  const externalPosts = await getCollection("external");
  const tilPosts = await getCollection("til");

  const posts = [...blogPosts, ...externalPosts, ...tilPosts]
    .filter((post) => !isDraft(post))
    .sort(sortPostByDate)
    .map((post) => ({
      id: post.id,
      collection: post.collection,
      slug: post.id,
      url: getPostLink(post),
      data: {
        title: post.data.title,
        summary: post.data.summary,
        publishedAt: post.data.publishedAt.toISOString(),
      },
    }));

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
