import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const allBlogPosts = await getCollection("blog");

export const GET: APIRoute = async ({ params }) => {
  const count = await fetch(
    `https://counter-visits.emanuel-suriano.workers.dev/api/${params.id}`,
  ).then((x) => x.json());
  return new Response(JSON.stringify(count));
};

export const POST: APIRoute = async ({ params }) => {
  const count = await fetch(
    `https://counter-visits.emanuel-suriano.workers.dev/api/${params.id}`,
    {
      method: "POST",
    },
  ).then((x) => x.json());
  return new Response(JSON.stringify(count));
};

export function getStaticPaths() {
  return allBlogPosts.map((blog) => ({ params: { id: blog.slug } }));
}
