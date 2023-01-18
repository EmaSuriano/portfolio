import { visit } from 'unist-util-visit';
import path from 'path';
import fs from 'fs';

const PUBLIC_FOLDER = 'public';

export function remarkAstroLocalImages() {
  const transformer = async (tree, file) => {
    const reldirMD = path.relative(file.cwd, path.dirname(file.history[0]));

    visit(tree, 'image', (img) => {
      const isLocalImg = img.url.startsWith('./');

      if (isLocalImg) {
        switch (process.env.NODE_ENV) {
          case 'production': {
            fs.copyFileSync(
              path.join(reldirMD, img.url),
              path.join(PUBLIC_FOLDER, path.basename(img.url)),
            );
            img.url = path.join('/', path.basename(img.url));
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
