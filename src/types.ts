interface IPaginator {
  pageCount: number;
  index: number;
  pathPrefix: string;
}

interface IGatsbyImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface IGatsbyImageFluid extends IGatsbyImage {
  maxHeight: number;
  maxWidth: number;
}

interface IGatsbyImageFixed extends IGatsbyImage {
  height: number;
  width: number;
}

interface IAuthor {
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
}

interface IArticle {
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
}

interface IArticleQuery {
  edges: {
    node: IArticle;
  }[];
}

interface IProgress {
  height: number;
  offset: number;
  title: string;
  mode: string;
  onClose?: () => void;
}

type Icon = React.FC<{
  fill: string;
}>;

type Layout = 'tiles' | 'rows';

type IProject = {
  name: string;
};

type LandingPage = React.FC<{
  pageContext: {
    author: IAuthor;
    articles: IArticle[];
    projects: IProject[];
  };
  location: Location;
}>;
