import { blogPosts } from '../services/contentCatalog';

export { blogPosts as BLOG_POSTS } from '../services/contentCatalog';

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count = 2) {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, count);
}
