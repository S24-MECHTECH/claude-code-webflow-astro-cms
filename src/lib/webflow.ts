/**
 * Webflow data types and helpers
 */
export interface WebflowItem {
  _id: string;
  slug: string;
  name: string;
  'post-body'?: string;
  'published-on'?: string;
  _meta: {
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
 * Fetch all items from a Webflow collection
 */
export async function getCollection(collectionId: string): Promise<WebflowItem[]> {
  const apiToken = import.meta.env.WEBFLOW_API_TOKEN;
  if (!apiToken) {
    console.warn('WEBFLOW_API_TOKEN not set, returning empty array');
    return [];
  }

  const url = `https://api.webflow.com/v2/collections/${collectionId}/items?limit=100`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    console.error(`Webflow API error: ${response.status} ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  return (data.items || []).map((item: Record<string, unknown>) => ({
    _id: item._id as string,
    slug: (item.slug as string) || (item.name as string)?.toLowerCase().replace(/\s+/g, '-') || '',
    name: item.name as string,
    'post-body': item['post-body'] as string | undefined,
    'published-on': item['published-on'] as string | undefined,
    _meta: {
      webflowId: item._id as string,
      lastModified: item['updated-at'] as string || new Date().toISOString(),
    },
  }));
}

/**
 * Fetch a single item by slug
 */
export async function getItemBySlug(collectionId: string, slug: string): Promise<WebflowItem | null> {
  const items = await getCollection(collectionId);
  return items.find(item => item.slug === slug) || null;
}
