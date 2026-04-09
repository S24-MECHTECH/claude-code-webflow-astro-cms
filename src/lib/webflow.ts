/**
 * Webflow data types and helpers
 *
 * IMPORTANT: getCollection() reads from src/data/posts.json at build time.
 * The webflow-sync.yml GitHub Action keeps posts.json up to date automatically.
 * No WEBFLOW_API_TOKEN needed at build time.
 */
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

// Cache so the JSON is only read once per build
let _postsCache: WebflowItem[] | null = null;

/**
 * Returns all items from src/data/posts.json.
 * The collectionId parameter is accepted for compatibility but ignored —
 * all posts live in one JSON file managed by webflow-sync.yml.
 */
export async function getCollection(_collectionId?: string): Promise<WebflowItem[]> {
  if (_postsCache) return _postsCache;

  try {
    // Dynamic import works in Astro SSG at build time
    const data = await import('../../src/data/posts.json', {
      assert: { type: 'json' },
    });
    const posts = (Array.isArray(data.default) ? data.default : []) as WebflowItem[];
    // Normalise: ensure each item has _id and _meta
    _postsCache = posts.map((item) => ({
      ...item,
      _id: item._id || item.id || '',
      _meta: item._meta || {
        webflowId: item._id || item.id || '',
        lastModified: item['updated-at'] || new Date().toISOString(),
      },
    }));
    return _postsCache;
  } catch (e) {
    console.warn('posts.json konnte nicht geladen werden:', e);
    return [];
  }
}

/**
 * Fetch a single item by slug
 */
export async function getItemBySlug(_collectionId: string, slug: string): Promise<WebflowItem | null> {
  const items = await getCollection();
  return items.find((item) => item.slug === slug) || null;
}
