export type Post = {
  frontmatter: {
    title: string;
    summary: string;
    original?: {
      url: string;
      external?: boolean;
    };
    minutesRead: string;
    publishedAt: string;
  };
  url: string;
};
