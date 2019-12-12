import React from 'react';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import LatestArticles from '../sections/LatestArticles';
import Hero from '../sections/Hero';
import Contact from '../sections/Contact';
import About from '../sections/About';
import Projects from '../sections/Projects';

const Landing = ({ location, pageContext }) => {
  console.log(pageContext);
  const articles = pageContext.group;

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <Hero />
      <About />
      {/* <Projects /> */}
      <LatestArticles articles={articles || []} />
      <Contact />
    </Layout>
  );
};

export default Landing;
