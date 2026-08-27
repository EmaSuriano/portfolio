import about from "author.json";
import { getPostLink, type Post } from "helpers";
import { GET as getPosts } from "./api/posts.ts";

const SITE = "https://emasuriano.com";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const urlEntry = (
  loc: string,
  lastmod?: Date | string,
  changefreq = "weekly",
  priority = "0.7",
) => {
  const lastmodTag = lastmod
    ? `\n    <lastmod>${new Date(lastmod).toISOString().slice(0, 10)}</lastmod>`
    : "";
  return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
};

export async function GET() {
  const posts: Post[] = await getPosts().then((x) => x.json());

  const staticUrls = [
    urlEntry(`${SITE}/`, undefined, "weekly", "1.0"),
    urlEntry(`${SITE}/about`, undefined, "monthly", "0.8"),
    urlEntry(`${SITE}/blog`, undefined, "weekly", "0.8"),
    urlEntry(`${SITE}/til`, undefined, "weekly", "0.7"),
    urlEntry(`${SITE}/llms.txt`, undefined, "weekly", "0.5"),
    urlEntry(`${about.website}rss.xml`, undefined, "daily", "0.5"),
  ];

  const postUrls = posts.flatMap((post) => {
    const loc = getPostLink(post);
    if (!loc.startsWith(SITE)) return [];
    return [urlEntry(loc, post.data.publishedAt, "monthly", "0.6")];
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].join("\n")}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
