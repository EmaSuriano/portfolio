import about from "author.json";
import {
  getPostLink,
  humanize,
  sortPostByDate,
  type Summary,
  isDraft,
} from "helpers";
import { getCollection } from "astro:content";

const { name, bio, website, projects, talks, podcast } = about;

export async function GET() {
  const blogPosts = await getCollection("blog");
  const externalPosts = await getCollection("external");
  const tilPosts = await getCollection("til");
  const podcasts = await getCollection("podcast");

  const posts = [...blogPosts, ...externalPosts, ...tilPosts]
    .filter((post) => !isDraft(post))
    .sort(sortPostByDate);

  const summary: Summary = {
    name,
    bio,
    website,
    podcast,
    projects: projects.map((url) => ({
      title: humanize(url.split("/").pop()),
      url,
    })),
    posts: posts.map((post) => ({
      title: post.data.title,
      url: getPostLink(post),
    })),
    talks: talks.map((talk) => ({ title: talk.title, url: talk.url })),
    podcasts: podcasts
      .sort(sortPostByDate)
      .map((podcast) => ({ title: podcast.data.title, url: podcast.data.src })),
  };

  return new Response(JSON.stringify(summary), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
