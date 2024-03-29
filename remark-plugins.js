import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';
import { visit } from 'unist-util-visit';
import path from 'path';
import fs from 'fs';

const PUBLIC_FOLDER = 'public';
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
              path.join(reldirMD, img.url),
              path.join(PUBLIC_FOLDER, targetFolder, path.basename(img.url)),
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

export default [
  remarkFigureCaption,
  remarkSlug,
  remarkAutolinkHeadings,
  remarkAstroLocalImages(),
];
