const yaml = require('js-yaml');
const fs = require('fs');
require('dotenv').config();

const { ANALYTICS_ID } = process.env;

const [{ name, bio, website, social, roles }] = yaml.safeLoad(
  fs.readFileSync('./content/about/authors.yml', 'utf8'),
);

const siteMetadata = {
  title: `${name} Portfolio`,
  siteUrl: website,
  name,
  description: bio,
  hero: {
    heading: `${name}'s Blog`,
    maxWidth: 652,
  },
  social,
  roles,
};

const plugins = [
  `gatsby-plugin-typescript`,
  {
    resolve: '@narative/gatsby-theme-novela',
    options: {
      contentPosts: 'content/posts',
      contentAuthors: 'content/about',
      rootPath: '/',
      basePath: '/blog',
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
      icon: 'src/assets/favicon.png',
    },
  },
  {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: ANALYTICS_ID,
    },
  },
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /assets/,
      },
    },
  },
  'gatsby-plugin-offline',
];

module.exports = {
  siteMetadata,
  plugins,
};
