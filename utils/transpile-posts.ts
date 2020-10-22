import chokidar from 'chokidar';
import glob from 'glob';
import readline from 'readline';
import fs from 'fs';
import { POSTS_GLOB_PATTERN } from './constants';
import { writeSmartPreview, writeHeader } from './writers';

const removePostExtension = (filePath: string) =>
  filePath.replace(/-raw$|-draft$/, '');

const transpilePost = async (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);
  const writeSteam = fs.createWriteStream(removePostExtension(filePath));

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let index = 0;
  for await (const rawLine of rl) {
    const isFirstLine = index === 0;
    const isPreviewLine = rawLine.startsWith('![');

    const line =
      (isPreviewLine && writeSmartPreview(filePath, rawLine)) ||
      (isFirstLine && writeHeader(filePath, rawLine)) ||
      rawLine;

    writeSteam.write(`${line}\n`);
    index++;
  }

  writeSteam.close();
  fileStream.close();
};

const main = async ({ watch }: { watch: boolean }) => {
  if (watch) {
    chokidar
      .watch(POSTS_GLOB_PATTERN)
      .on('all', (_, file) => transpilePost(file));

    console.log(`Watching posts 👀`);
    return;
  }

  const count = glob.sync(POSTS_GLOB_PATTERN).map(transpilePost).length;
  console.log(`Posts transpiled: ${count} 🔥`);
  return;
};

const parseParams = (params: string[]) => ({
  watch: params.includes('--watch'),
});

main(parseParams(process.argv.slice(2)));
