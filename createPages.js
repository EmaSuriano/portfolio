/* eslint-disable @typescript-eslint/no-var-requires */

const createPaginatedPages = require('gatsby-paginate');
const path = require('path');
const query = require('@narative/gatsby-theme-novela/src/gatsby/data/data.query');
const normalize = require('@narative/gatsby-theme-novela/src/gatsby/data/data.normalize');
const project = require('./src/data/project');
const authorData = require('./src/data/author');
const talk = require('./src/data/talk');

// ///////////////// Utility functions ///////////////////
const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO);

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);
// ///////////////////////////////////////////////////////

module.exports = async ({ actions: { createPage }, graphql }) => {
  const rawAuthor = await graphql(authorData.query);
  const author = authorData.normalize(rawAuthor.data.author);

  const rawArticles = await graphql(query.local.articles);
  const articles = rawArticles.data.articles.edges
    .map(normalize.local.articles)
    .filter((article) => !article.secret)
    .slice(0, 4)
    .sort(byDate);

  const rawProjects = await graphql(project.query);
  const projects = rawProjects.data.projects.edges
    .map(project.normalize)
    .map(normalize.local.articles);

  const rawTalks = await graphql(talk.query);
  const talks = rawTalks.data.talks.edges
    .map(talk.normalize)
    .slice(0, 4)
    .map(normalize.local.articles);

  log('Creating', 'Landing page');

  createPaginatedPages({
    edges: [{}],
    pathPrefix: '/',
    createPage,
    pageTemplate: path.resolve(`./src/templates/Landing.tsx`),
    buildPath: '/',
    context: {
      articles,
      author,
      projects,
      talks,
    },
  });

  log('Creating', 'Talks page');

  createPaginatedPages({
    edges: [{}],
    pathPrefix: '/talks',
    createPage,
    pageTemplate: path.resolve(`./src/templates/Talks.tsx`),
    buildPath: '/talks',
    context: {
      author,
      talks,
    },
  });
};
