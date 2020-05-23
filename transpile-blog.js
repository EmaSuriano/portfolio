/* eslint-disable */

const chokidar = require('chokidar');
const glob = require('glob');
const readline = require('readline');
const path = require('path');
const fs = require('fs');
const sizeOf = require('image-size');

const RAW_EXTENSION = 'mdx-raw';
const FOLDER = './content/posts';
const GLOB_PATTERN = `${FOLDER}/**/*.${RAW_EXTENSION}`;
const NAME_SEPARATOR = '_';

const getPostInfo = filePath => {
  const folder = path.dirname(filePath);
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

const writeHeader = (filePath, firstLine) => {
  const { date, title } = getPostInfo(filePath);

  return [
    '---',
    `title: ${title}`,
    `author: Ema Suriano`,
    `date: ${date}`,
    `hero: ./images/hero.jpg`,
    `excerpt: ${firstLine}`,
    `---`,
    '',
    firstLine,
  ].join('\n');
};

const transpileBlog = async filePath => {
  const fileStream = fs.createReadStream(filePath);
  const writeSteam = fs.createWriteStream(filePath.replace('-raw', ''));

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
      (isFirstLine && writeHeader(filePath, rawLine)) ||
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
  glob.sync(GLOB_PATTERN, {}).map(transpileBlog);

  if (watch) {
    chokidar.watch(GLOB_PATTERN).on('all', (_, file) => transpileBlog(file));
  }
};

const parseParams = params => ({
  watch: params.includes('--watch'),
});

main(parseParams(process.argv.slice(2)));
