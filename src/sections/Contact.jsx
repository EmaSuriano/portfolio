import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import MDXRenderer from '@narative/gatsby-theme-novela/src/components/MDX';
import Image from '@narative/gatsby-theme-novela/src/components/Image';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { local } from '@narative/gatsby-theme-novela/src/gatsby/data/data.normalize';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import FloatingLabel from 'floating-label-react';
import Section from '../components/Section';
import useAuthorsQuery from '../queries/useAuthorsQuery';
import 'floating-label-react/styles.css';

const Input = styled.input`
  appearance: none;
  box-sizing: border-box;
  background: transparent;
  border: none;
  border-bottom: 0.5px solid #bdbdbd;

  font-size: 1.25em;
  padding-left: 0.25em;
  padding-top: 0.25em;
  min-width: 20em;

  :focus {
    border-color: ${p => p.theme.colors.accent};
    outline: none;
  }
`;

const About = () => {
  const [email, setEmail] = React.useState('');

  return (
    <Section title="Get in Touch">
      <form>
        <label>
          <Headings.h4>Name</Headings.h4>
          <Input id="name" type="text" />
        </label>

        <label>
          <Headings.h4>Email</Headings.h4>
          <Input id="email" type="text" />
        </label>

        <label>
          <Headings.h4>Message</Headings.h4>
          <textarea id="message" />
        </label>
      </form>
    </Section>
  );
};

export default About;
