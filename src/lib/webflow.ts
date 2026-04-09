/**
 * Webflow data types and helpers
 *
 * IMPORTANT: getCollection() reads from src/data/posts.json at build time.
 * The webflow-sync.yml GitHub Action keeps posts.json up to date automatically.
 * No WEBFLOW_API_TOKEN needed at build time.
 */

// Static import – Vite/Astro resolves this at build time
import postsData from '../data/posts.json';

export interface WebflowItem {
  _id?: string;
  id?: string;
  slug: string;
  name: string;
  title?: string;
  'post-body'?: string;
  'content-article'?: string;
  'seo-title'?: string;
  'seo-description'?: string;
  'published-on'?: string;
  'updated-at'?: string;
  'created-on'?: string;
  // SEO / OG fields
  'og-title-2'?: string;
  'og-description-2'?: string;
  'og-image-3'?: string;
  'og-type'?: string;
  'og-locale'?: string;
  'og-url'?: string;
  // Hero fields
  'hero-heading-2'?: string;
  'hero-subheading-2'?: string;
  'hero-banner'?: string;
  'hero-img-2'?: string;
  'hero-alt'?: string;
  'hero-cta-text'?: string;
  'hero-cta-url'?: string;
  'hero-ready'?: boolean;
  // Article / Banner fields
  'article-image'?: string;
  'article-alt'?: string;
  'banner-image'?: string;
  'banner-text-2'?: string;
  'banner-img-2'?: string;
  // Logo / Footer
  'logo-img-2'?: string;
  'logo-alt'?: string;
  'footer-img'?: string;
  'footer-text'?: string;
  // Product fields
  brand?: string;
  model?: string;
  price?: string;
  currency?: string;
  description?: string;
  // Allow additional fields
  [key: string]: unknown;
  _meta?: {
    webflowId: string;
    lastModified: string;
  };
}

export interface WebflowCollection {
  id: string;
  name: string;
  slug: string;
}

/**
 * Returns all items from src/data/posts.json.
 * The collectionId parameter is accepted for API compatibility but ignored —
 * all posts live in one JSON file managed by webflow-sync.yml.
 */
export async function getCollection(_collectionId?: string): Promise<WebflowItem[]> {
  const posts = (Array.isArray(postsData) ? postsData : []) as WebflowItem[];
  // Normalise: ensure each item has _id and _meta
  return posts.map((item) => ({
    ...item,
    _id: item._id || item.id || '',
    _meta: item._meta || {
      webflowId: item._id || item.id || '',
      lastModified: item['updated-at'] || new Date().toISOString(),
    },
  }));
}

/**
 * Fetch a single item by slug
 */
export async function getItemBySlug(_collectionId: string, slug: string): Promise<WebflowItem | null> {
  const items = await getCollection();
  return items.find((item) => item.slug === slug) || null;
}
