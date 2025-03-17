import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypePlugins from "./rehype-plugins";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://emasuriano.com/",
  integrations: [tailwind(), sitemap(), icon()],
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkMath],
    rehypePlugins,
  },
  redirects: {
    "/resume": "https://emasuriano.github.io/resume/",
    "/life-in-weeks": "https://emasuriano.github.io/life-in-weeks/",
  },
});
