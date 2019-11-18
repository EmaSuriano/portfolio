const loadSiteMetadata = require('./loadSiteMetadata');

const siteMetadata = loadSiteMetadata();

const config = {
  siteMetadata,
  plugins: [
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        contentPosts: 'content/posts',
        contentAuthors: 'content/about',
        basePath: '/',
        authorsPage: false,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: 'content/projects',
        name: 'content/projects',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.name,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
  ],
};

module.exports = config;
