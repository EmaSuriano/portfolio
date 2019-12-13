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

const AvatarContainer = styled.div`
  width: 300px;
  overflow: hidden;
  border-radius: 50%;
  margin-left: 16px;

  ${mediaqueries.tablet`
    margin-left: 0;
    margin-top: 16px;
  `}
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

const About = ({ author }) => {
  const { about } = useStaticQuery(siteQuery);

  return (
    <Section title="About me">
      <InfoWrapper>
        <MDXRenderer content={about.body} />
        <AvatarContainer>
          <RoundedImage src={author.avatar.large} />
        </AvatarContainer>
      </InfoWrapper>
    </Section>
  );
};

export default About;
