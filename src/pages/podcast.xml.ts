import rss from "@astrojs/rss";
import path from "path";
import { type Summary } from "helpers";
import { GET as getSummary } from "./api/summary.ts";
import fs from "fs";

export async function GET() {
  const summary: Summary = await getSummary().then((x) => x.json());

  return rss({
    title: `${summary.name}'s Podcast`,
    description: summary.bio,
    site: import.meta.env.SITE,
    xmlns: {
      itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
    },
    customData: `
      <language>en-us</language>
      <itunes:author>${summary.name}</itunes:author>
      <itunes:owner>
        <itunes:name>${summary.name}</itunes:name>
        <itunes:email>emanuel.suriano@gmail.com</itunes:email>
      </itunes:owner>
      <itunes:category text="Technology"/>
      <itunes:image href="${new URL(path.join(import.meta.env.SITE, "icon-512-maskable.png")).href}"/>
      <itunes:explicit>no</itunes:explicit>
    `,
    items: summary.podcasts.map((podcast) => {
      const {
        title,
        publishedAt,
        summary: description,
        src,
        length,
      } = podcast.data;

      return {
        title,
        description,
        pubDate: publishedAt,
        author: summary.name,
        enclosure: {
          url: new URL(path.join(import.meta.env.SITE, src)).href,
          length: fs.statSync(path.join("public", src)).size,
          type: "audio/mpeg",
        },
        customData: `
          <guid>${new URL(path.join(import.meta.env.SITE, "podcast")).href}</guid>
          <itunes:duration>${length}</itunes:duration>
          <itunes:summary>${description}</itunes:summary>
        `,
      };
    }),
  });
}
