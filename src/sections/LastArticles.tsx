import React from 'react';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import { css } from '@emotion/core';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';

const LastArticles = ({ articles = [] }: { articles: IArticle[] }) => (
  <Section title="Last Articles ✍️">
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

export default LastArticles;
