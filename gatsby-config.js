const loadSiteMetadata = require('./loadSiteMetadata');

const siteMetadata = loadSiteMetadata();

const config = {
  siteMetadata,
  plugins: [
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        contentPosts: 'posts',
        contentAuthors: 'content/about',
        basePath: '/',
        authorsPage: false,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
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
