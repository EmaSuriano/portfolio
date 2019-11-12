import React from 'react';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import Typed from 'react-typed';
import { graphql, useStaticQuery } from 'gatsby';
import { HeroHeading, HeroSubheading } from '../components/Hero';
import LatestArticles from '../sections/LatestArticles';

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

  // localStorage.setItem('gridLayout', 'tiles');

  return (
    <Layout>
      <SEO />
      <Section relative>
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
      <LatestArticles />
    </Layout>
  );
}

export default Landing;
