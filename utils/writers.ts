import { imageSize } from 'image-size';
import path from 'path';
import { NAME_SEPARATOR } from './constants';

const DEFAULT_POST_NAME = '1999-01-01_Wrong-folder-name';

const getPostInfo = (filePath: string) => {
  const folder =
    path
      .dirname(filePath)
      .split('/')
      .pop() || DEFAULT_POST_NAME;

  const [date, rawTitle] = folder.split(NAME_SEPARATOR);
  const title = rawTitle.split('-').join(' ');

  return { date, title };
};

type PreviewType = 'Image' | 'Twitter' | 'YouTube' | 'Gist';

const getPreviewType = (src: string): PreviewType | null => {
  if (src.startsWith('./images/') || src.startsWith('images/')) return 'Image';
  if (src.includes('twitter.com')) return 'Twitter';
  if (src.includes('youtube.com')) return 'YouTube';
  if (src.includes('gist.github.com')) return 'Gist';

  return null;
};

export const writeSmartPreview = (filePath: string, line: string) => {
  const [alt, src] = line.replace(/!\[|\)/g, '').split(`](`);
  const type = getPreviewType(src);

  if (!type) {
    console.error(`Type not found! ${src}`);
    return '';
  }

  let size = 'Medium';
  if (type === 'Image') {
    const imagePath = path.join(path.dirname(filePath), src);
    const { width = 0 } = imageSize(imagePath);

    size = (width > 2000 && 'Large') || (width > 1000 && 'Medium') || 'Small';
  }

  const result = [`<div class="Image__${size}">`];

  switch (type) {
    case 'Image': {
      result.push(`  <img src="${src}" alt="${alt}" />`);
      break;
    }
    case 'YouTube': {
      const videoId = src.split('watch?v=').pop();
      result.push(`    <YouTube videoId="${videoId}" />`);
      break;
    }
    case 'Twitter': {
      const tweetId = src.split('/').pop();
      result.push(`  <Tweet tweetId="${tweetId}" />`);
      break;
    }
    case 'Gist': {
      const id = src.split('/').pop();
      result.push(`  <Gist id="${id}" />`);
      break;
    }
    default:
      break;
  }

  result.push(`  <figcaption>${alt}</figcaption>`, `</div>`);

  return result.join('\n');
};

export const writeHeader = (
  filePath: string,
  firstLine: string,
  draft: boolean,
) => {
  const { date, title } = getPostInfo(filePath);

  return [
    '---',
    `title: ${title}`,
    `author: Ema Suriano`,
    `date: ${date}`,
    `hero: ./images/hero.jpg`,
    `excerpt: ${firstLine}`,
    `secret: ${!!draft}`,
    `---`,
    '',
    firstLine,
  ].join('\n');
};
