const createPaginatedPages = require('gatsby-paginate');
const path = require('path');
const query = require('@narative/gatsby-theme-novela/src/gatsby/data/data.query');
const normalize = require('@narative/gatsby-theme-novela/src/gatsby/data/data.normalize');

// ///////////////// Utility functions ///////////////////
const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO);

// ///////////////////////////////////////////////////////

module.exports = async ({ actions: { createPage }, graphql }, themeOptions) => {
  const { basePath = '/', pageLength = 6 } = themeOptions;

  const localArticles = await graphql(query.local.articles);
  const articles = localArticles.data.articles.edges
    .map(normalize.local.articles)
    .filter(article => !article.secret)
    .filter((_, i) => i < pageLength)
    .sort(byDate);

  if (articles.length === 0) {
    throw new Error(`
    You must have at least one Author and Post. As reference you can view the
    example repository. Look at the content folder in the example repo.
    https://github.com/narative/gatsby-theme-novela-example
  `);
  }

  console.log('creating landing page!');
  createPaginatedPages({
    edges: articles,
    pathPrefix: '/',
    createPage,
    pageLength,
    pageTemplate: path.resolve(`./src/templates/Landing.jsx`),
    buildPath: '/',
    context: {
      basePath,
      skip: pageLength,
      limit: pageLength,
    },
  });
};
