import glob from 'glob';
import fs from 'fs';
import {
  POSTS_GLOB_PATTERN_FINAL,
  PROJECTS_GLOB_PATTERN,
  SUMMARY_PATH,
  TALKS_GLOB_PATTERN,
} from './constants';

const getContent = (path: string) => fs.readFileSync(path, 'utf8');

const getPostContent = (path: string) => {
  let header = true;
  const rawContent = getContent(path);
  return rawContent
    .split('\n')
    .filter((line, i) => {
      if (!i) return false;
      if (line === '---') header = false;

      return header;
    })
    .join('\n');
};

const addPadding = (text: string) => {
  return text
    .split('\n')
    .map((y, i) => `  ${i === 0 ? '- ' : '  '}${y}`)
    .join('\n');
};

const main = async () => {
  const talks = glob.sync(TALKS_GLOB_PATTERN).map(getContent);
  const projects = glob.sync(PROJECTS_GLOB_PATTERN).map(getContent);
  const posts = glob.sync(POSTS_GLOB_PATTERN_FINAL).map(getPostContent);

  const content = [
    'talks:',
    ...talks.map(addPadding),
    'projects:',
    ...projects.map(addPadding),
    'posts:',
    ...posts.map(addPadding),
  ];

  fs.writeFileSync(SUMMARY_PATH, content.join('\n'));
};

main();
