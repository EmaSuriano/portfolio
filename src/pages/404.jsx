import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { css } from '@emotion/core';
import styled from '../helpers/styled';
import NotFound from '../assets/not-found.svg';

const NotFoundThemed = styled(NotFound)`
  color: ${p => p.theme.colors.primary};
  width: ${p => p.theme.colors.primary};
  width: 350px;

  ${mediaqueries.desktop`
    width: 250px;
  `};

  ${mediaqueries.phablet`
    width: 150px;
  `};
`;

const MessageContainer = styled.div`
  margin-top: 80px;
  & h1 {
    margin-bottom: 30px;
  }

  ${mediaqueries.desktop`
    margin-top: 60px;
    & h1 {
      margin-bottom: 25px;
    }
  `};

  ${mediaqueries.phablet`
    margin-top: 40px;
    & h1 {
      margin-bottom: 20px;
    }
  `};
`;

const NotFoundPage = () => (
  <Layout>
    <SEO />
    <Section
      css={css`
        margin-top: 100px;
        text-align: center;
        z-index: 1;
        position: relative;
      `}
    >
      <NotFoundThemed />
      <MessageContainer>
        <Headings.h1>404</Headings.h1>
        <Headings.h2>Houston, we have a problem ...</Headings.h2>
      </MessageContainer>
    </Section>
  </Layout>
);

export default NotFoundPage;
