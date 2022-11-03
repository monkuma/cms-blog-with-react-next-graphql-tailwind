type category = {
  slug: string;
};

export type Author = {
  name: string;
  photo: {
    url: string;
  };
  bio: string;
};

export type Post = {
  title: string;
  slug: string;
  excerpt: string;
  content: {
    html: string;
  };
  featuredImage: {
    url: string;
  };
  author: Author;
  createdAt: string;
  categories: category[];
};

export type PostRap = {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    content: {
      html: string;
    };
    featuredImage: {
      url: string;
    };
    createdAt: string;
    author: Author;
    categories: category[];
  };
};
