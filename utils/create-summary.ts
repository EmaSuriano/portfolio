import { sync } from 'glob';
import { writeFileSync, readFileSync } from 'fs';
import {
  POSTS_GLOB_PATTERN_FINAL,
  PROJECTS_GLOB_PATTERN,
  ABOUT_GLOB_PATTERN,
  SUMMARY_PATH,
  TALKS_GLOB_PATTERN,
} from './constants';

const getContent = (path: string) => readFileSync(path, 'utf8');

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

const about = sync(ABOUT_GLOB_PATTERN).map(getContent);
const talks = sync(TALKS_GLOB_PATTERN).map(getContent).map(addPadding);
const projects = sync(PROJECTS_GLOB_PATTERN).map(getContent).map(addPadding);
const posts = sync(POSTS_GLOB_PATTERN_FINAL)
  .map(getPostContent)
  .map(addPadding);

const content = [
  'about:',
  ...about,
  'talks:',
  ...talks,
  'projects:',
  ...projects,
  'posts:',
  ...posts,
];

writeFileSync(SUMMARY_PATH, content.join('\n'));
console.log('info: Summary updated!');
