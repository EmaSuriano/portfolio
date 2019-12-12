import React from 'react';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
// import LatestArticles from '../sections/LatestArticles';
import Hero from '../sections/Hero';
import Contact from '../sections/Contact';
// import About from '../sections/About';
// import Projects from '../sections/Projects';

function Landing() {
  return (
    <Layout>
      <SEO />
      <Hero />
      {/* <About /> */}
      {/* <Projects /> */}
      {/* <LatestArticles /> */}
      <Contact />
    </Layout>
  );
}

export default Landing;
