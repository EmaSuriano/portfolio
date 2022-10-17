type IGatsbyImage = {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
};

type IGatsbyImageFluid = IGatsbyImage & {
  maxHeight: number;
  maxWidth: number;
};

export type IAuthor = {
  authorsPage?: boolean;
  featured?: boolean;
  name: string;
  slug: string;
  bio: string;
  avatar: {
    large: IGatsbyImageFluid;
    medium: IGatsbyImageFluid;
    small: IGatsbyImageFluid;
  };
};

export type IArticle = {
  slug: string;
  authors: IAuthor[];
  excerpt: string;
  body: string;
  id: string;
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    seo: string;
  };
  timeToRead: number;
  date: string;
};

export type IProject = {
  name: string;
};

export type ITalk = {
  name: string;
};
