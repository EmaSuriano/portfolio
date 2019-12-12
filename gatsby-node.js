const {
  local,
} = require('@narative/gatsby-theme-novela/src/gatsby/data/data.query');
const { writeFileSync } = require('fs');
const createPages = require('./createPages');

const createUseQuery = query => `
import { graphql, useStaticQuery } from 'gatsby';

export default () =>
  useStaticQuery(graphql\`
    ${query}
  \`);
 `;

exports.createPages = createPages;

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
