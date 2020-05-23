/* eslint-disable */

const chokidar = require('chokidar');
const glob = require('glob');
const readline = require('readline');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

const FOLDER = './content/posts';

const POST_EXTENSION = 'mdx-raw';
const GLOB_PATTERN = `${FOLDER}/**/*.${POST_EXTENSION}`;

const POST_EXTENSION_DRAFT = 'mdx-draft';
const GLOB_PATTERN_DRAFT = `${FOLDER}/**/*.${POST_EXTENSION_DRAFT}`;

const NAME_SEPARATOR = '_';

const getPostInfo = filePath => {
  const folder = path
    .dirname(filePath)
    .split('/')
    .pop();
  const [date, rawTitle] = folder.split(NAME_SEPARATOR);

  const title = rawTitle.split('-').join(' ');

  return { date, title };
};

const generateNovelaImage = (filePath, line) => {
  const dir = path.dirname(filePath);
  const [alt, src] = line.replace(/\!\[|\)/g, '').split(`](`);
  const { width } = sizeOf(path.join(dir, src));
  const size =
    (width > 2000 && 'Large') || (width > 1000 && 'Medium') || 'Small';

  return [
    `<div class="Image__${size}">`,
    `  <img src="${src}" alt="${alt}" />`,
    `  <figcaption>${alt}</figcaption>`,
    `</div>`,
  ].join('\n');
};

const writeHeader = (filePath, firstLine, draft) => {
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

const transpileBlog = async (filePath, draft) => {
  const fileStream = fs.createReadStream(filePath);
  const writeSteam = fs.createWriteStream(
    filePath.replace(draft ? POST_EXTENSION_DRAFT : POST_EXTENSION, 'mdx'),
  );

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let index = 0;
  for await (const rawLine of rl) {
    const isMarkdownImg = rawLine.startsWith('![');
    const isFirstLine = index === 0;

    const line =
      (isMarkdownImg && generateNovelaImage(filePath, rawLine)) ||
      (isFirstLine && writeHeader(filePath, rawLine, draft)) ||
      rawLine;

    writeSteam.write(`${line}\n`);
    index++;
  }

  const { title } = getPostInfo(filePath);
  console.log(`Blog "${title}" transpiled!`);
  writeSteam.close();
  fileStream.close();
};

const main = async ({ watch }) => {
  if (watch) {
    chokidar.watch(GLOB_PATTERN).on('all', (_, file) => transpileBlog(file));
    chokidar
      .watch(GLOB_PATTERN_DRAFT)
      .on('all', (_, file) => transpileBlog(file, true));
    return;
  }

  glob.sync(GLOB_PATTERN, {}).map(transpileBlog);
  glob.sync(GLOB_PATTERN_DRAFT, {}).map(file => transpileBlog(file, true));
};

const parseParams = params => ({
  watch: params.includes('--watch'),
});

main(parseParams(process.argv.slice(2)));
