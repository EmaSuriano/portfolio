import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import MDXRenderer from '@narative/gatsby-theme-novela/src/components/MDX';
import Image from '@narative/gatsby-theme-novela/src/components/Image';
import { local } from '@narative/gatsby-theme-novela/src/gatsby/data/data.normalize';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Section from '../components/Section';
import useAuthorsQuery from '../queries/useAuthorsQuery';

const siteQuery = graphql`
  {
    about: mdx(fileAbsolutePath: { regex: "/\\\\about.mdx$/" }) {
      body
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${mediaqueries.tablet`
    flex-direction: column;
  `}
`;

const BioAvatarInner = styled.div`
  width: 300px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  overflow: hidden;
  margin-left: 16px;

  ${mediaqueries.tablet`
    margin-left: 0;
    margin-top: 16px;
  `}
`;

const About = () => {
  const { about } = useStaticQuery(siteQuery);
  const author = local.authors(useAuthorsQuery().authors.edges[0]);

  return (
    <Section title="About me">
      <InfoWrapper>
        <MDXRenderer content={about.body} />
        <BioAvatarInner>
          <Image src={author.avatar.large} />
        </BioAvatarInner>
      </InfoWrapper>
    </Section>
  );
};

export default About;
