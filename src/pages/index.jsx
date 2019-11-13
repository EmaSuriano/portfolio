import React from 'react';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import LatestArticles from '../sections/LatestArticles';
import Hero from '../sections/Hero';

function Landing() {
  return (
    <Layout>
      <SEO />
      <Hero />
      <LatestArticles />
    </Layout>
  );
}

export default Landing;
