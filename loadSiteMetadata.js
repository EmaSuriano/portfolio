const yaml = require('js-yaml');
const fs = require('fs');

const loadSiteMetadata = () => {
  const [data] = yaml.safeLoad(
    fs.readFileSync('./content/about/authors.yml', 'utf8'),
  );

  const { name, bio, social, website, ...rest } = data;

  return {
    title: `${name} Portfolio`,
    name,
    siteUrl: website,
    description: bio,
    hero: {
      heading: `Ema Suriano's blog`,
      maxWidth: 652,
    },
    social,
    ...rest,
  };
};

module.exports = loadSiteMetadata;
