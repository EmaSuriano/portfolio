
import { graphql, useStaticQuery } from 'gatsby';

export default () =>
  useStaticQuery(graphql`
    {
    authors: allAuthor {
      edges {
        node {
          authorsPage
          bio
          id
          name
          featured
          social {
            url
          }
          slug
          avatar {
            small: childImageSharp {
              fluid(maxWidth: 50, quality: 100) {
                
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes

              }
            }
            medium: childImageSharp {
              fluid(maxWidth: 100, quality: 100) {
                
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes

              }
            }
            large: childImageSharp {
              fluid(maxWidth: 328, quality: 100) {
                
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes

              }
            }
          }
        }
      }
    }
  }
  `);
 