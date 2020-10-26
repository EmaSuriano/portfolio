const ROOT = process.cwd();
const STATIC_FOLDER = `${ROOT}/static`;
const CONTENT_FOLDER = `${ROOT}/content`;

export const SUMMARY_PATH = `${STATIC_FOLDER}/summary.yml`;

export const POSTS_GLOB_PATTERN = `${CONTENT_FOLDER}/posts/**/*.mdx-raw`;
export const POSTS_GLOB_PATTERN_FINAL = `${CONTENT_FOLDER}/posts/**/*.mdx`;
export const POSTS_GLOB_PATTERN_DRAFT = `${CONTENT_FOLDER}/posts/**/*.mdx-draft`;
export const ABOUT_GLOB_PATTERN = `${CONTENT_FOLDER}/about/authors.yml`;
export const TALKS_GLOB_PATTERN = `${CONTENT_FOLDER}/talks/**/*.yml`;
export const PROJECTS_GLOB_PATTERN = `${CONTENT_FOLDER}/projects/**/*.yml`;

export const NAME_SEPARATOR = '_';
