type IPaginator = {
  pageCount: number;
  index: number;
  pathPrefix: string;
};

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

type IGatsbyImageFixed = IGatsbyImage & {
  height: number;
  width: number;
};

type IAuthor = {
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

type IArticle = {
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

type IArticleQuery = {
  edges: {
    node: IArticle;
  }[];
};

type IProgress = {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
};

type Icon = React.FC<{
  fill: string;
}>;

type Layout = 'tiles' | 'rows';

type IProject = {
  name: string;
};
