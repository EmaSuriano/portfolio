import React from 'react';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';

import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';
import { ITalk } from '../types';

type Props = { talks: ITalk[] };

const LastTalks = ({ talks }: Props) => (
  <Section title="Last Talks" right={<Anchor href="/talks">See all</Anchor>}>
    <GridLayoutProviderMock layout="tiles">
      <ArticlesList articles={talks} />
    </GridLayoutProviderMock>
  </Section>
);

export default LastTalks;
