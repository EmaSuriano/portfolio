import React from 'react';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import { css } from '@emotion/core';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';

const LastTalks = ({ talks = [] }: { talks: ITalk[] }) => (
  <Section title="Last Talks 🗣">
    <GridLayoutProviderMock layout="tiles">
      <ArticlesList articles={talks} />
    </GridLayoutProviderMock>
    <Headings.h3
      css={css`
        margin-top: 50px;
        text-align: end;
      `}
    >
      <Anchor href="/talks">More Talks</Anchor>
    </Headings.h3>
  </Section>
);

export default LastTalks;
