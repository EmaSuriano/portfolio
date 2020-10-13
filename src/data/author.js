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
  author {
    bio
    id
    name
    social {
      url
    }
    featured
    avatar {
      small: childImageSharp {
        fluid(maxWidth: 50, quality: 100) {
          ${gatsbyFluid}
        }
      }
      medium: childImageSharp {
        fluid(maxWidth: 100, quality: 100) {
          ${gatsbyFluid}
        }
      }
      large: childImageSharp {
        fluid(maxWidth: 1000, quality: 100) {
          ${gatsbyFluid}
        }
      }
    }
  }
}`;

const normalize = (author) => {
  const avatar = {
    small: author.avatar.small.fluid,
    medium: author.avatar.medium.fluid,
    large: author.avatar.large.fluid,
  };

  return {
    ...author,
    avatar,
  };
};

module.exports = {
  query,
  normalize,
};
