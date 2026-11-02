import { blogPosts } from '../services/contentCatalog';

export const BLOG_POSTS = blogPosts;

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count = 2) {
  return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, count);
}
