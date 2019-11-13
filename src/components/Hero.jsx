import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import styled from '@emotion/styled';

export const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 52px;
  line-height: 1.15;
  color: ${p => p.theme.colors.primary};

  ${mediaqueries.desktop`
  font-size: 38px
`}

  ${mediaqueries.phablet`
  font-size: 32px;
`}
`;

export const HeroSubheading = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 38px;
  margin-top: 20px;
  line-height: 1.15;
  color: ${p => p.theme.colors.grey};

  ${mediaqueries.desktop`
  font-size: 32px
`}
  ${mediaqueries.phablet`
  font-size: 28px;
`}
`;
