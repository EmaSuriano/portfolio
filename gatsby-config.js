const loadSiteMetadata = require('./loadSiteMetadata');

const siteMetadata = loadSiteMetadata();

const config = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-netlify',
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        contentPosts: 'content/posts',
        contentAuthors: 'content/about',
        basePath: '/',
        authorsPage: false,
        mailchimp: true,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://gmail.us20.list-manage.com/subscribe/post?u=d64a9a03650537be67f7aa60a&amp;id=fcd9f3d1f5',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: 'content/projects',
        name: 'content/projects',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.name,
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        icon: 'src/assets/favicon-ema.png',
      },
    },
  ],
};

module.exports = config;
