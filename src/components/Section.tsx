import React, { ReactNode } from 'react';
import NovelaSection from '@narative/gatsby-theme-novela/src/components/Section';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { css } from '@emotion/core';

type Props = { children: ReactNode; title: string };

const Section = ({ children, title }: Props) => (
  <NovelaSection
    narrow
    css={css`
      margin-bottom: 100px;
    `}
    id={title}
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

export default Section;
