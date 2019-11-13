import React from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';

import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';

// const siteQuery = graphql`
//   {
//     allSite {
//       edges {
//         node {
//           siteMetadata {
//             name
//             roles
//           }
//         }
//       }
//     }
//   }
// `;

const About = () => {
  return (
    <Section
      relative
      css={css`
        margin-top: 100px;
      `}
    >
      <Headings.h2>Latest Articles</Headings.h2>
    </Section>
  );
};

export default About;
