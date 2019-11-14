import React from 'react';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import { graphql, useStaticQuery } from 'gatsby';
import { local } from '@narative/gatsby-theme-novela/src/gatsby/data/data.normalize';
import Section from '../components/Section';
import GridLayoutProviderMock from '../components/GridLayoutProviderMock';

const siteQuery = graphql`
  {
    projects: allProjectsYaml {
      edges {
        node {
          name
          description
          type
          sites {
            name
            url
          }
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
  const { name, description, type, sites, publishedDate, hero } = node;

  return {
    node: {
      title: name,
      hero: {
        ...hero,
        seo: {},
        full: {},
      },
      slug: sites[0].url,
      excerpt: description,
      date: publishedDate,
      timeToRead: type,
    },
  };
};

const changeNodeRecursive = (children, type, transform) => {
  return React.Children.map(children, child => {
    console.log(child.type.name);
    if (child.type.name === type) {
      return transform(child);
    }
    if (React.Children.count(child) > 0) {
      return React.Children.map(child.props.children, innerChild =>
        changeNodeRecursive(innerChild, type, transform),
      );
    }
    return React.cloneElement(child);
  });
};

const Projects = () => {
  const projects = useStaticQuery(siteQuery)
    .projects.edges.map(mapProjectToArticle)
    .map(local.articles);

  const articlesRendered = (
    <GridLayoutProviderMock layout="rows">
      <ArticlesList articles={projects} />
    </GridLayoutProviderMock>
  );

  // const result = changeNodeRecursive(articlesRendered, 'Metadata', child => {
  //   return React.cloneElement(child, { children: 'cloned!' });
  // });

  return <Section title="Open Source Projects">{articlesRendered}</Section>;
};

export default Projects;
