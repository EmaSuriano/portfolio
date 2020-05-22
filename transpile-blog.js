/* eslint-disable */

const chokidar = require('chokidar');
const glob = require('glob');
const readline = require('readline');

const fs = require('fs');

const RAW_EXTENSION = 'mdx-raw';
const FOLDER = './content/posts';
const GLOB_PATTERN = `${FOLDER}/**/*.${RAW_EXTENSION}`;

const generateNovelaImage = line => {
  const [alt, src] = line.replace(/\!\[|\)/g, '').split(`](`);
  const size = src.endsWith('.gif') ? 'Small' : 'Medium';
  // const style = src.endsWith('.gif')
  //   ? 'display: flex; flex-direction: column;'
  //   : '';

  const tags = [
    `<div class="Image__${size}">`,
    // `<div class="Image__${size}" style="${style}">`,
    `  <img src="${src}" alt="${alt}" />`,
    `  <figcaption>${alt}</figcaption>`,
    `</div>`,
  ];

  return tags.join('\n');
};

const transpileBlog = async path => {
  const fileStream = fs.createReadStream(path);
  const writeSteam = fs.createWriteStream(path.replace('-raw', ''));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const rawLine of rl) {
    const isMarkdownImg = rawLine.startsWith('![');

    const line = isMarkdownImg ? generateNovelaImage(rawLine) : rawLine;
    writeSteam.write(`${line}\n`);
  }
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
