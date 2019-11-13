import React from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import Typed from 'react-typed';
import { graphql, useStaticQuery } from 'gatsby';
import { HeroHeading, HeroSubheading } from '../components/Hero';

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

const Hero = () => {
  const results = useStaticQuery(siteQuery);
  const { name, roles } = results.allSite.edges[0].node.siteMetadata;

  return (
    <Section relative>
      <div style={{ marginTop: '100px' }}>
        <HeroHeading>{`Hello, I'm ${name}`}</HeroHeading>
        <HeroSubheading>
          <Typed
            strings={roles.sort(() => Math.random() - 0.5)}
            backSpeed={70}
            typeSpeed={70}
            backDelay={2000}
            loop
          />
        </HeroSubheading>
      </div>
    </Section>
  );
};

export default Hero;
