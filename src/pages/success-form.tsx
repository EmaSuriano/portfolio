import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { css } from '@emotion/core';
import styled from '../helpers/styled';
import SuccessFormIcon from '../assets/success-form.svg';
import Anchor from '@narative/gatsby-theme-novela/src/components/Anchor';

const SuccessForm = () => (
  <Layout>
    <SEO />
    <Section
      css={css`
        margin-top: 100px;
        text-align: center;
        z-index: 1;
        position: relative;
      `}
    >
      <Icon />
      <MessageContainer>
        <Headings.h1>Thank you!</Headings.h1>
        <Headings.h3>Your form submission has been received.</Headings.h3>
        <Headings.h3>
          <Anchor href="/">Home Page</Anchor>
        </Headings.h3>
      </MessageContainer>
    </Section>
  </Layout>
);

const Icon = styled(SuccessFormIcon)`
  color: ${(p) => p.theme.colors.primary};
  width: ${(p) => p.theme.colors.primary};
  width: 350px;

  ${mediaqueries.desktop`
    width: 250px;
  `};

  ${mediaqueries.phablet`
    width: 150px;
  `};
`;

const MessageContainer = styled.div`
  margin-top: 80px;
  & h3 {
    margin-top: 30px;
  }

  ${mediaqueries.desktop`
    margin-top: 60px;
    & h3 {
      margin-top: 25px;
    }
  `};

  ${mediaqueries.phablet`
    margin-top: 40px;
    & h3 {
      margin-top: 20px;
    }
  `};
`;

export default SuccessForm;
