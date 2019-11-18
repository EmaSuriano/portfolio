const {
  local,
} = require('@narative/gatsby-theme-novela/src/gatsby/data/data.query');
const { writeFileSync } = require('fs');

const createUseQuery = query => `
import { graphql, useStaticQuery } from 'gatsby';

export default () =>
  useStaticQuery(graphql\`
    ${query}
  \`);
 `;

exports.onCreatePage = ({ page, actions }) => {
  if (page.path === '/' && !page.component.includes('src/pages/index')) {
    const { createPage, deletePage } = actions;
    const newPage = {
      ...page,
      path: '/blog',
    };

    deletePage(page);
    createPage(newPage);
  }
};

exports.onPreInit = () => {
  writeFileSync(
    './src/queries/useArticlesQuery.js',
    createUseQuery(local.articles),
  );
  writeFileSync(
    './src/queries/useAuthorsQuery.js',
    createUseQuery(local.authors),
  );
};
