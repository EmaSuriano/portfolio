const gatsbyFluid = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`;

const query = `{
  talks: allTalksYaml(sort: {fields: date, order: DESC}) {
    edges {
      node {
        name
        description
        hero {
          regular: childImageSharp {
            fluid(maxWidth: 653, quality: 100) {
              ${gatsbyFluid}
            }
          }
          narrow: childImageSharp {
            fluid(maxWidth: 457, quality: 100) {
              ${gatsbyFluid}
            }
          }
        }
        type
        date(formatString: "MMMM, YYYY")
        link
      }
    }
  }
}`;

const normalize = ({ node }) => {
  const { name, description, link, date, hero, type } = node;

  return {
    node: {
      title: name,
      hero: {
        ...hero,
        seo: {},
        full: {},
      },
      slug: link,
      excerpt: description,
      date,
      type,
    },
  };
};

module.exports = {
  query,
  normalize,
};
