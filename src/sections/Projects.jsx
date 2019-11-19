import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { local } from '@narative/gatsby-theme-novela/src/gatsby/data/data.normalize';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';
import ProjectList from '../components/ProjectList';

const siteQuery = graphql`
  {
    projects: allProjectsYaml(sort: { fields: publishedDate, order: DESC }) {
      edges {
        node {
          name
          description
          type
          link
          publishedDate
          hero {
            regular: childImageSharp {
              fluid(maxWidth: 653, quality: 100) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
            narrow: childImageSharp {
              fluid(maxWidth: 457, quality: 100) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
        }
      }
    }
  }
`;

const mapProjectToArticle = ({ node }) => {
  const { name, description, type, link, publishedDate, hero } = node;

  return {
    node: {
      title: name,
      hero: {
        ...hero,
        seo: {},
        full: {},
      },
      slug: link,
      excerpt: description,
      date: publishedDate,
      type,
    },
  };
};

const Projects = () => {
  const projects = useStaticQuery(siteQuery)
    .projects.edges.map(mapProjectToArticle)
    .map(local.articles);

  return (
    <Section title="Open Source Projects">
      <GridLayoutProviderMock layout="rows">
        <ProjectList projects={projects} />
      </GridLayoutProviderMock>
    </Section>
  );
};

export default Projects;
