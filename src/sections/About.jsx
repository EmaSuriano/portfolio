import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import MDXRenderer from '@narative/gatsby-theme-novela/src/components/MDX';
import Image from '@narative/gatsby-theme-novela/src/components/Image';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Section from '../components/Section';

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
  overflow: hidden;
  background: rgba(0, 0, 0, 0.25);
  grid-row: 1 / -1;
  border-radius: 50%;
  margin-left: 16px;

  ${mediaqueries.tablet`
    margin-left: 0;
    margin-top: 16px;
  `}
`;

const RoundedImage = styled(Image)`
  background: rgba(0, 0, 0, 0.25);
  grid-row: 1 / -1;
  border-radius: 50%;
`;

const About = ({ author }) => {
  const { about } = useStaticQuery(siteQuery);

  return (
    <Section title="About me">
      <InfoWrapper>
        <MDXRenderer content={about.body} />
        <BioAvatarInner>
          <RoundedImage src={author.avatar.large} />
        </BioAvatarInner>
      </InfoWrapper>
    </Section>
  );
};

export default About;
