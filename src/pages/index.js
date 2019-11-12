import React from 'react';

import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import Typed from 'react-typed';
import mediaqueries from '@styles/media';
import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            roles
          }
        }
      }
    }
  }
`;

function Landing() {
  const results = useStaticQuery(siteQuery);
  const { name, roles } = results.allSite.edges[0].node.siteMetadata;

  return (
    <Layout>
      <SEO />
      <Section>
        <div style={{ marginTop: '100px' }}>
          <HeroHeading>{`Hello, I'm ${name}`}</HeroHeading>
          <HeroSubheading>
            <Typed
              strings={roles.sort(() => Math.random() - 0.5)}
              typeSpeed={50}
              backSpeed={40}
              backDelay={2000}
              loop
            />
          </HeroSubheading>
        </div>
      </Section>
    </Layout>
  );
}

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 1.15;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const HeroSubheading = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 38px;
  margin-top: 20px;
  line-height: 1.15;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.desktop`
    font-size: 32px
  `}
  ${mediaqueries.phablet`
    font-size: 28px;
  `}
`;

export default Landing;
