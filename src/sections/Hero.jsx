import React from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import Typed from 'react-typed';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';
import { HeroHeading, HeroSubheading } from '../components/Hero';

const siteQuery = graphql`
  {
    site {
      siteMetadata {
        name
        roles
      }
    }
  }
`;

const Hero = () => {
  const results = useStaticQuery(siteQuery);
  const { name, roles } = results.site.siteMetadata;

  return (
    <Section
      relative
      css={css`
        margin-top: 100px;
        margin-bottom: 100px;
      `}
    >
      <HeroHeading>{`Hello, I'm ${name}`}</HeroHeading>
      <HeroSubheading>
        <Typed
          strings={roles.sort(() => Math.random() - 0.5)}
          backSpeed={50}
          typeSpeed={70}
          backDelay={2000}
          loop
        />
      </HeroSubheading>
    </Section>
  );
};

export default Hero;
