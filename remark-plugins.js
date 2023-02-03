import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import path from 'path';
import fs from 'fs';

const PUBLIC_FOLDER = 'public';
const SRC_FOLDER = 'src';
const ASSETS = 'assets';

const ensureDir = (dir) => {
  if (fs.existsSync(dir)) {
    return;
  }
  return fs.mkdirSync(dir);
};

export function remarkAstroLocalImages() {
  ensureDir(path.join(PUBLIC_FOLDER, ASSETS));

  const transformer = async (tree, file) => {
    const reldirMD = path.relative(file.cwd, path.dirname(file.history[0]));

    const targetFolder = path.join(ASSETS, path.basename(reldirMD));
    ensureDir(path.join(PUBLIC_FOLDER, targetFolder));

    visit(tree, 'image', (img) => {
      const isLocalImg = img.url.startsWith('./');

      if (isLocalImg) {
        switch (process.env.NODE_ENV) {
          case 'production': {
            fs.copyFileSync(
              path.join(reldirMD, img.url).replaceAll('%20', ' '),
              path
                .join(PUBLIC_FOLDER, targetFolder, path.basename(img.url))
                .replaceAll('%20', ' '),
            );
            img.url = path.join('/', targetFolder, path.basename(img.url));
            break;
          }

          case 'development':
          default: {
            img.url = path.join('/', reldirMD, img.url);
          }
        }
      }
    });
  };

  return function attacher() {
    return transformer;
  };
}

function remarkReadingTime() {
  return function (tree, { data }) {
    if (!data.astro.frontmatter.minutesRead) {
      const textOnPage = toString(tree);
      const readingTime = getReadingTime(textOnPage);
      data.astro.frontmatter.minutesRead = readingTime.text;
    }
  };
}

export default [
  remarkFigureCaption,
  remarkSlug,
  remarkAutolinkHeadings,
  remarkReadingTime,
  remarkAstroLocalImages(),
];
