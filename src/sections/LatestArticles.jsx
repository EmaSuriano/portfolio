import React from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import { local } from '@narative/gatsby-theme-novela/src/gatsby/data/data.normalize';
import { css } from '@emotion/core';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';
import useArticlesQuery from '../queries/useArticlesQuery';

const LatestArticles = () => {
  const articles = useArticlesQuery()
    .articles.edges.filter((_, i) => i < 4)
    .map(local.articles);

  return (
    <Section
      narrow
      css={css`
        margin-top: 100px;
      `}
    >
      <GridLayoutProviderMock layout="tiles">
        <Headings.h2
          css={css`
            margin-bottom: 50px;
          `}
        >
          Latest Articles
        </Headings.h2>
        <ArticlesList articles={articles} />

        <Headings.h3
          css={css`
            margin-top: '50px';
            text-align: 'end';
          `}
        >
          <Anchor href="/blog">More Articles</Anchor>
        </Headings.h3>
      </GridLayoutProviderMock>
    </Section>
  );
};

export default LatestArticles;
