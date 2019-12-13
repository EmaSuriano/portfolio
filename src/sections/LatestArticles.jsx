import React from 'react';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import { css } from '@emotion/core';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';

const LatestArticles = ({ articles = [] }) => (
  <Section title="Latest Articles">
    <GridLayoutProviderMock layout="tiles">
      <ArticlesList articles={articles} />
    </GridLayoutProviderMock>
    <Headings.h3
      css={css`
        margin-top: 50px;
        text-align: end;
      `}
    >
      <Anchor href="/blog">More Articles</Anchor>
    </Headings.h3>
  </Section>
);

export default LatestArticles;
