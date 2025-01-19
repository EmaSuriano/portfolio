import { sortPostByDate } from "helpers";
import { getCollection } from "astro:content";

export async function GET() {
  const podcasts = await getCollection("podcast");

  return new Response(JSON.stringify(podcasts.sort(sortPostByDate)), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
