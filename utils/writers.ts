import { imageSize } from 'image-size';
import path from 'path';
import { NAME_SEPARATOR, POST_SECRET_EXTENSION } from './constants';
import queryString from 'query-string';
import removeMd from 'remove-markdown';

const DEFAULT_POST_NAME = '1999-01-01_Wrong-folder-name';

export const getPostInfo = (filePath: string) => {
  const folder = path.dirname(filePath).split('/').pop() || DEFAULT_POST_NAME;

  const [date, rawTitle] = folder.split(NAME_SEPARATOR);
  const title = rawTitle.split('-').join(' ');

  return { date, title };
};

type PreviewType = 'Image' | 'Twitter' | 'YouTube' | 'Gist';

const getPreviewType = (src: string): PreviewType => {
  if (src.startsWith('./images/') || src.startsWith('images/')) return 'Image';
  if (src.includes('twitter.com')) return 'Twitter';
  if (src.includes('youtube.com')) return 'YouTube';
  if (src.includes('gist.github.com')) return 'Gist';

  throw Error(`Type not found! ${src}`);
};

export const writeSmartPreview = (filePath: string, line: string) => {
  const [alt, src] = line.replace(/!\[|\)/g, '').split(`](`);
  const type = getPreviewType(src);

  const result: string[] = [];

  switch (type) {
    case 'Image': {
      const imagePath = path.join(path.dirname(filePath), src);
      const { width = 0 } = imageSize(imagePath);

      const size =
        (width > 2000 && 'Large') || (width > 1000 && 'Medium') || 'Small';
      result.push(
        `<div class="Image__${size}">`,
        `  <img src="${src}" alt="${alt}" />`,
      );
      break;
    }
    case 'YouTube': {
      const params = src.split('watch?').pop();
      const { v: id, t: start = 0 } = queryString.parse(params!);
      const options = { start };

      result.push(
        '<div class="Image__Medium">',
        `    <YouTube videoId="${id}" opts={${JSON.stringify(options)}} />`,
      );
      break;
    }
    case 'Twitter': {
      const tweetId = src.split('/').pop();
      result.push(
        '<div class="Image__Small">',
        `  <Tweet tweetId="${tweetId}" />`,
      );
      break;
    }
    case 'Gist': {
      const id = src.split('/').pop();
      result.push('<div class="Image__Medium">', `  <Gist id="${id}" />`);
      break;
    }
    default:
      break;
  }
  result.push(`  <figcaption>${alt}</figcaption>`, `</div>`);

  return result.join('\n');
};

export const writeHeader = (filePath: string, firstLine: string) => {
  const { date, title } = getPostInfo(filePath);
  const secret = filePath.endsWith(POST_SECRET_EXTENSION);

  return [
    '---',
    `title: ${title}`,
    `author: Ema Suriano`,
    `date: ${date}`,
    `hero: ./images/hero.jpg`,
    `excerpt: ${removeMd(firstLine)}`,
    `secret: ${secret ? 'true' : 'false'}`,
    `---`,
    '',
    firstLine,
  ].join('\n');
};
