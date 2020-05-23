import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import MDXRenderer from '@narative/gatsby-theme-novela/src/components/MDX';
import { ImageZoom } from '@narative/gatsby-theme-novela/src/components/Image';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '../helpers/styled';
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

const RoundedImage = styled(ImageZoom)`
  border-radius: 50%;
`;

const AboutContainer = styled.div`
  p {
    padding: 0;
  }
`;

const About = ({ author }: { author: IAuthor }) => {
  const { about } = useStaticQuery(siteQuery);
  console.log(author.avatar);
  return (
    <Section title="About me">
      <InfoWrapper>
        <AboutContainer>
          <MDXRenderer content={about.body} />
        </AboutContainer>
        <AvatarContainer>
          <RoundedImage src={author.avatar} alt="Profile Picture" />
        </AvatarContainer>
      </InfoWrapper>
    </Section>
  );
};

export default About;
