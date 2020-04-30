import React from 'react';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';

const Projects = ({ projects = [] }: { projects: IProject[] }) => (
  <Section title="Open Source Projects">
    <GridLayoutProviderMock layout="rows">
      <ArticlesList articles={projects} />
    </GridLayoutProviderMock>
  </Section>
);

export default Projects;
