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
  projects: allProjectsYaml(sort: { fields: date, order: DESC }) {
    edges {
      node {
        name
        description
        type
        link
        date(formatString: "MMMM, YYYY")
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
      }
    }
  }
}`;

const normalize = ({ node }) => {
  const { name, description, type, link, date, hero } = node;

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
