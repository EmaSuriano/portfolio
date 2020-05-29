const createPaginatedPages = require('gatsby-paginate');
const path = require('path');
const query = require('@narative/gatsby-theme-novela/src/gatsby/data/data.query');
const normalize = require('@narative/gatsby-theme-novela/src/gatsby/data/data.normalize');
const project = require('./src/data/project');

// ///////////////// Utility functions ///////////////////
const byDate = (a, b) => new Date(b.dateForSEO) - new Date(a.dateForSEO);

const log = (message, section) =>
  console.log(`\n\u001B[36m${message} \u001B[4m${section}\u001B[0m\u001B[0m\n`);
// ///////////////////////////////////////////////////////

const AUTHOR_QUERY = `{
  author {
    bio
    id
    name
    social {
      url
    }
    avatar {
      childImageSharp {
        fluid(maxWidth: 1024, quality: 100) {
          src
        }
      }
    }
  }
}`;

module.exports = async ({ actions: { createPage }, graphql }) => {
  const rawAuthor = await graphql(AUTHOR_QUERY);
  const author = {
    ...rawAuthor.data.author,
    avatar: rawAuthor.data.author.avatar.childImageSharp.fluid.src,
  };

  const localArticles = await graphql(query.local.articles);
  const articles = localArticles.data.articles.edges
    .map(normalize.local.articles)
    .filter(article => !article.secret)
    .slice(0, 4)
    .sort(byDate);

  const localProjects = await graphql(project.query);
  const projects = localProjects.data.projects.edges
    .map(project.normalize)
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
    },
  });
};
