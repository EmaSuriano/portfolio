import React from 'react';
import NovelaSection from '@narative/gatsby-theme-novela/src/components/Section';
import Headings from '@narative/gatsby-theme-novela/src/components/Headings';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

type Props = { children: ReactNode; title: string; right?: ReactNode };

const Section = ({ children, title, right }: Props) => (
  <NovelaSection
    narrow
    css={css`
      margin-bottom: 100px;
    `}
    id={title}
  >
    <HeadingContainer>
      <Headings.h2>{title}</Headings.h2>
      {right && <Headings.h3>{right}</Headings.h3>}
    </HeadingContainer>
    {children}
  </NovelaSection>
);

const HeadingContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default Section;
