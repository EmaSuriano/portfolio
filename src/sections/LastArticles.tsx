import React from 'react';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';

const LastArticles = ({ articles = [] }: { articles: IArticle[] }) => (
  <Section
    title="Last Articles ✍️"
    right={<Anchor href="/blog">See all</Anchor>}
  >
    <GridLayoutProviderMock layout="tiles">
      <ArticlesList articles={articles} />
    </GridLayoutProviderMock>
  </Section>
);

export default LastArticles;
