import React from 'react';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import { local } from '@narative/gatsby-theme-novela/src/gatsby/data/data.normalize';
import useArticlesQuery from '../queries/useArticlesQuery';

const LatestArticles = () => {
  const articles = useArticlesQuery()
    .articles.edges.filter((_, i) => i < 4)
    .map(local.articles);

  return (
    <Section narrow>
      <GridLayoutProviderMock layout="tiles">
        <div style={{ marginTop: '100px' }}>
          <div
            style={{
              marginBottom: '50px',
            }}
          >
            <Headings.h2>Latest Articles</Headings.h2>
          </div>
          <ArticlesList articles={articles} />
          <div
            style={{
              marginTop: '50px',
              textAlign: 'end',
            }}
          >
            <Headings.h3>
              <Anchor href="/blog">More Articles</Anchor>
            </Headings.h3>
          </div>
        </div>
      </GridLayoutProviderMock>
    </Section>
  );
};

export default LatestArticles;
