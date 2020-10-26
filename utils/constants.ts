const ROOT = process.cwd();
const STATIC_FOLDER = `${ROOT}/static`;
const CONTENT_FOLDER = `${ROOT}/content`;

export const SUMMARY_PATH = `${STATIC_FOLDER}/summary.yml`;

export const POST_EXTENSION = 'mdx-raw';
export const POST_SECRET_EXTENSION = 'mdx-secret';

export const POSTS_GLOB_PATTERN_FINAL = `${CONTENT_FOLDER}/posts/**/*.mdx`;
export const POSTS_GLOB_PATTERN = `${CONTENT_FOLDER}/posts/**/*.[${POST_EXTENSION}|${POST_SECRET_EXTENSION}]`;
export const ABOUT_GLOB_PATTERN = `${CONTENT_FOLDER}/about/authors.yml`;
export const TALKS_GLOB_PATTERN = `${CONTENT_FOLDER}/talks/**/*.yml`;
export const PROJECTS_GLOB_PATTERN = `${CONTENT_FOLDER}/projects/**/*.yml`;

export const NAME_SEPARATOR = '_';
