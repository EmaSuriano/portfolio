import React from 'react';
import NovelaSection from '@narative/gatsby-theme-novela/src/components/Section';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { css } from '@emotion/core';

const Section = ({ children, title }) => {
  return (
    <NovelaSection
      relative
      css={css`
        margin-top: 100px;
      `}
      id="projects"
    >
      <Headings.h2
        css={css`
          margin-bottom: 50px;
        `}
      >
        {title}
      </Headings.h2>
      {children}
    </NovelaSection>
  );
};

export default Section;
