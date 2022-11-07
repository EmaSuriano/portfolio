/* eslint-disable @typescript-eslint/no-var-requires */

const yaml = require('js-yaml');
const fs = require('fs');
require('dotenv').config();

const { ANALYTICS_ID } = process.env;

const [{ name, bio, website, social, roles }] = yaml.load(
  fs.readFileSync('./content/about/authors.yml', 'utf8'),
);

const siteMetadata = {
  title: `${name} Portfolio`,
  siteUrl: website,
  name,
  description: bio,
  hero: {
    heading: `Hello, I'm ${name}`,
    maxWidth: 652,
  },
  social,
  roles,
};

const plugins = [
  `gatsby-plugin-typescript`,
  'gatsby-plugin-remove-serviceworker',
  {
    resolve: '@narative/gatsby-theme-novela',
    options: {
      contentPosts: 'content/posts',
      contentAuthors: 'content/about',
      rootPath: '/',
      basePath: '/blog',
      authorsPage: false,
      sources: { local: true },
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
    resolve: 'gatsby-source-filesystem',
    options: {
      path: 'content/talks',
      name: 'content/talks',
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
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /assets/,
      },
    },
  },
];

if (ANALYTICS_ID) {
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: ANALYTICS_ID,
    },
  });
}

module.exports = {
  siteMetadata,
  plugins,
};
