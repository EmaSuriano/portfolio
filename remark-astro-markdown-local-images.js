import { visit } from 'unist-util-visit';
import path from 'path';
import fs from 'fs';

const PUBLIC_FOLDER = 'public';
const ASSETS = 'assets';

export function remarkAstroLocalImages() {
  const transformer = async (tree, file) => {
    const reldirMD = path.relative(file.cwd, path.dirname(file.history[0]));

    visit(tree, 'image', (img) => {
      const isLocalImg = img.url.startsWith('./');

      if (isLocalImg) {
        switch (process.env.NODE_ENV) {
          case 'production': {
            fs.copyFileSync(
              path.join(reldirMD, img.url).replaceAll('%20', ' '),
              path
                .join(PUBLIC_FOLDER, ASSETS, path.basename(img.url))
                .replaceAll('%20', ' '),
            );
            img.url = path.join('/', ASSETS, path.basename(img.url));
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
