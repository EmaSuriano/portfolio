import React from 'react';

import Layout from '@narative/gatsby-theme-novela/src/components/Layout';
import Section from '@narative/gatsby-theme-novela/src/components/Section';
import SEO from '@narative/gatsby-theme-novela/src/components/SEO';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { css } from '@emotion/core';

function NotFoundPage() {
  return (
    <Layout>
      <SEO />
      <Section
        css={css`
          margin-top: 100px;
        `}
      >
        <Headings.h1>404: Page Not Found</Headings.h1>
      </Section>
    </Layout>
  );
}

export default NotFoundPage;
