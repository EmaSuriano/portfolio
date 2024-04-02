import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeFigure from "@microflash/rehype-figure";
import { toString } from "hast-util-to-string";

export default [
  rehypeFigure,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    { properties: headingNode => ({ "aria-label": toString(headingNode) }) },
  ],
];
