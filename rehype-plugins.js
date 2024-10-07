import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFigure from "@microflash/rehype-figure";
import rehypeKatex from "rehype-katex";
import { toString } from "hast-util-to-string";
import rehypeMermaid from "rehype-mermaid";

export default [
  rehypeFigure,
  rehypeKatex,
  rehypeSlug,
  [rehypeMermaid, { strategy: "img-png", dark: true }],
  [
    rehypeAutolinkHeadings,
    { properties: (headingNode) => ({ "aria-label": toString(headingNode) }) },
  ],
];
