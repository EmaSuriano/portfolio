import chokidar from 'chokidar';
import glob from 'glob';
import readline from 'readline';
import fs from 'fs';
import { GLOB_PATTERN, GLOB_PATTERN_DRAFT } from './constants';
import { writeSmartPreview, writeHeader } from './writers';

const removePostExtension = (filePath: string) =>
  filePath.replace(/-raw$|-draft$/, '');

const transpilePost = async (filePath: string, draft: boolean) => {
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
      (isFirstLine && writeHeader(filePath, rawLine, draft)) ||
      rawLine;

    writeSteam.write(`${line}\n`);
    index++;
  }

  console.log(`Blog "${filePath}" transpiled!`);
  writeSteam.close();
  fileStream.close();
};

const main = async ({ watch }: { watch: boolean }) => {
  if (watch) {
    chokidar
      .watch(GLOB_PATTERN)
      .on('all', (_, file) => transpilePost(file, false));
    chokidar
      .watch(GLOB_PATTERN_DRAFT)
      .on('all', (_, file) => transpilePost(file, true));
    return;
  }

  glob.sync(GLOB_PATTERN).map(file => transpilePost(file, false));
  glob.sync(GLOB_PATTERN_DRAFT).map(file => transpilePost(file, true));
  return;
};

const parseParams = (params: string[]) => ({
  watch: params.includes('--watch'),
});

main(parseParams(process.argv.slice(2)));
