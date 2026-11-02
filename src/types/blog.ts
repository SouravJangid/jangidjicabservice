export interface BlogPost {
  slug: string;
  title: string;
  title_hi: string;
  excerpt: string;
  excerpt_hi: string;
  category: 'Service Information' | 'Routes' | 'Booking';
  publishDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  tags: string[];
  tableOfContents: { id: string; text: string }[];
  contentHtml: string;
  contentHtml_hi: string;
  relatedRouteSlug?: string;
  faq?: { q: string; a: string }[];
}
