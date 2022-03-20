import React from 'react';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';

type Props = { articles: IArticle[] };

const LastArticles = ({ articles }: Props) => (
  <Section title="Last Articles" right={<Anchor href="/blog">See all</Anchor>}>
    <GridLayoutProviderMock layout="tiles">
      <ArticlesList articles={articles} />
    </GridLayoutProviderMock>
  </Section>
);

export default LastArticles;
