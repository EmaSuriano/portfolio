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
  projects: allProjectsYaml(sort: { fields: publishedDate, order: DESC }) {
    edges {
      node {
        name
        description
        type
        link
        publishedDate(formatString: "MMMM, YYYY")
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
  const { name, description, type, link, publishedDate, hero } = node;

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
      date: publishedDate,
      type,
    },
  };
};

module.exports = {
  query,
  normalize,
};
