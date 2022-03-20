import React from 'react';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import LastArticles from '../sections/LastArticles';
import Hero from '../sections/Hero';
import About from '../sections/About';
import LastTalks from '../sections/LastTalks';
import Projects from '../sections/Projects';

type Props = {
  pageContext: {
    author: IAuthor;
    articles: IArticle[];
    projects: IProject[];
    talks: ITalk[];
  };
  location: Location;
};

const Landing = ({ location, pageContext }: Props) => {
  const { author, articles, projects, talks } = pageContext;

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <Hero />
      <About author={author} />
      <Projects projects={projects} />
      <LastArticles articles={articles} />
      <LastTalks talks={talks} />
    </Layout>
  );
};

export default Landing;
