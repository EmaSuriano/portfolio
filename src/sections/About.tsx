import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import MDX from '@narative/gatsby-theme-novela/src/components/MDX';
import { ImageZoom } from '@narative/gatsby-theme-novela/src/components/Image';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '../helpers/styled';
import Section from '../components/Section';
import { IAuthor } from '../types';

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
  max-width: 300px;
  max-height: 300px;
  overflow: hidden;
  border-radius: 50%;

  ${mediaqueries.desktop`
    max-width: 200px;
    max-height: 200px;
  `}

  ${mediaqueries.tablet`
    max-width: 300px;
    max-height: 300px;
  `}
`;

const RoundedImage = styled(ImageZoom)<{ src: string; alt: string }>`
  border-radius: 50%;
`;

const AboutContainer = styled.div`
  p {
    padding: 0;
  }

  [data-emotion-css] {
    display: none;
  }
`;

type Props = { author: IAuthor };

const About = ({ author }: Props) => {
  const { about } = useStaticQuery(siteQuery);

  return (
    <Section title="About me">
      <InfoWrapper>
        <AboutContainer>
          <MDX content={about.body} />
        </AboutContainer>
        <AvatarContainer>
          <RoundedImage src={author.avatar.large.src} alt="Profile Picture" />
        </AvatarContainer>
      </InfoWrapper>
    </Section>
  );
};

export default About;
