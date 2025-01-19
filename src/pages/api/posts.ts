import { getPostLink, sortPostByDate, isDraft } from "helpers";
import { getCollection } from "astro:content";

export async function GET() {
  const blogPosts = await getCollection("blog");
  const externalPosts = await getCollection("external");
  const tilPosts = await getCollection("til");

  const posts = [...blogPosts, ...externalPosts, ...tilPosts]
    .filter((post) => !isDraft(post))
    .sort(sortPostByDate);

  return new Response(
    JSON.stringify(posts.map((post) => ({ ...post, url: getPostLink(post) }))),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}
