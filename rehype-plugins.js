import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFigure from "@microflash/rehype-figure";
import rehypeKatex from "rehype-katex";
import { toString } from "hast-util-to-string";
import rehypeMermaid from "rehype-mermaid";
const mermaidOpts = globalThis.process?.env?.PAGES_BASE ? { strategy: "pre-mermaid" } : { strategy: "img-png", dark: true };

export default [
  rehypeFigure,
  rehypeKatex,
  rehypeSlug,
  [rehypeMermaid, mermaidOpts],
  [
    rehypeAutolinkHeadings,
    { properties: (headingNode) => ({ "aria-label": toString(headingNode) }) },
  ],
];
