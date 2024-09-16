import rss from "@astrojs/rss";
import path from "path";
import { type Summary } from "helpers";
import { GET as getSummary } from "./api/summary.ts";

export async function GET() {
  const summary: Summary = await getSummary().then((x) => x.json());

  return rss({
    title: `${summary.name}'s Podcast`,
    description: summary.bio,
    site: import.meta.env.SITE,
    xmlns: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
    },

    items: summary.podcasts.map((podcast) => {
      return {
        title: podcast.data.title,
        pubDate: podcast.data.publishedAt,
        description: podcast.data.summary,
        author: summary.name,
        enclosure: {
          url: new URL(path.join(import.meta.env.SITE, podcast.data.src)).href,
          length: 545,
          type: "audio/mpeg",
        },
      };
    }),
  });
}
