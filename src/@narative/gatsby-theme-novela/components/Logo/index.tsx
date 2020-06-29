import React from 'react';
import mediaqueries from '@narative/gatsby-theme-novela/src/styles/media';
import styled from '../../../../helpers/styled';

const Hologram = styled.h1`
  display: inline-block;
  padding: 1em 1.7em;
  color: ${(p) => p.color};
  position: relative;
  transition: translate 250ms ease;

  ${mediaqueries.tablet`
    font-size: 0.8em;
  `}

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 2px solid;
    transition: 0.25s;
  }

  &:before {
    transform: translateX(-0.25em) translateY(0.25em);
  }
  &:after {
    transform: translateX(0.25em) translateY(-0.25em);
  }

  &:hover {
    color: ${(p) => p.theme.colors.accent};

    &:before,
    &:after {
      transform: translateX(0) translateY(0);
    }
  }
`;

const Logo = ({ fill = 'white' }: Icon) => <Hologram color={fill}>ES</Hologram>;

export default Logo;
