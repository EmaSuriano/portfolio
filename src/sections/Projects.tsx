import React from 'react';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';

import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';
import { IProject } from '../types';

type Props = { projects: IProject[] };

const Projects = ({ projects }: Props) => (
  <Section title="Open Source Projects">
    <GridLayoutProviderMock layout="rows">
      <ArticlesList articles={projects} />
    </GridLayoutProviderMock>
  </Section>
);

export default Projects;
