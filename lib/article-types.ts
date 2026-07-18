export type PortableArticleBlock = {
  _type: string;
  _key?: string;
  [key: string]: unknown;
};

export type Article = {
  slug: string;
  category: string;
  author: string;
  title: string;
  excerpt: string;
  date: string;
  time: string;
  image: string;
  imageAlt: string;
  content: string[] | PortableArticleBlock[];
};
