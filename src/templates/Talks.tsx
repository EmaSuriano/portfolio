import React from 'react';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import ArticlesList from '@narative/gatsby-theme-novela/src/sections/articles/Articles.List';
import ArticlesHero from '@narative/gatsby-theme-novela/src/sections/articles/Articles.Hero';

type Props = {
  pageContext: {
    author: IAuthor;
    talks: ITalk[];
  };
  location: Location;
};

const Talks = ({ location, pageContext }: Props) => {
  const { talks, author } = pageContext;

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <ArticlesHero authors={[author]} subheader="Talks" />
      <Section narrow>
        <ArticlesList articles={talks} />
      </Section>
    </Layout>
  );
};

export default Talks;
