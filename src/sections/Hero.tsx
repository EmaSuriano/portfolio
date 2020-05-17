import React from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import Typed from 'react-typed';
import { graphql, useStaticQuery } from 'gatsby';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import { css } from '@emotion/core';
import styled from '../helpers/styled';

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

const randomSort = () => Math.random() - 0.5;

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
          strings={roles.sort(randomSort)}
          backSpeed={40}
          typeSpeed={40}
          backDelay={2000}
          loop
          smartBackspace
        />
      </HeroSubheading>
    </Section>
  );
};

export default Hero;
