/* eslint-disable */

const GatsbyFluid_withWebp = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`;

module.exports = `{
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
              ${GatsbyFluid_withWebp}
            }
          }
          narrow: childImageSharp {
            fluid(maxWidth: 457, quality: 100) {
              ${GatsbyFluid_withWebp}
            }
          }
        }
      }
    }
  }
}`;
