
import { graphql, useStaticQuery } from 'gatsby';

export default () =>
  useStaticQuery(graphql`
    {
    articles: allArticle(
      sort: { fields: [date, title], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          id
          slug
          secret
          title
          author
          date(formatString: "MMMM Do, YYYY")
          dateForSEO: date
          timeToRead
          excerpt
          subscription
          body
          hero {
            full: childImageSharp {
              fluid(maxWidth: 944, quality: 100) {
                
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes

              }
            }
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 100) {
                
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes

              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 100) {
                
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes

              }
            }
            seo: childImageSharp {
              fixed(width: 1200, quality: 100) {
                src
              }
            }
          }
        }
      }
    }
  }
  `);
 