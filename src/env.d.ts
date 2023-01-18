/// <reference types="@astrojs/image/client" />

declare module 'astro-imagetools/components' {
  import { ImgConfigOptions } from 'astro-imagetools';

  // real implementation --> node_modules/astro-imagetools/components/Img.astro
  export function Img(props: ImgConfigOptions): Node;
}
