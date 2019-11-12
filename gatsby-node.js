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

exports.onPreInit = () => {
  writeFileSync(
    './src/queries/useArticlesQuery.js',
    createUseQuery(local.articles),
  );
};
