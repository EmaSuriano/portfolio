import styled from '@emotion/styled';

type ColorPalette = {
  primary: string;
  secondary: string;
  grey: string;
  background: string;
  accent: string;
  hover: string;
  gradient: string;
  articleText: string;
  track: string;
  progress: string;
  card: string;
  error: string;
  success: string;
  errorBackground: string;
  horizontalRule: string;
  inputBackground: string;
};

type Theme = {
  colors: ColorPalette;
  fonts: {
    serif: string;
    sansSerif: string;
    monospace: string;
  };
};

export default styled as CreateStyled<Theme>;
