const WORDPRESS_API_ORIGIN = (process.env.WORDPRESS_API_URL || 'https://example.com')
  .replace(/\/$/, '')
  .replace(/\/wp-json\/wp\/v2$/i, '');

export interface WordPressRenderedField { rendered: string; }
export interface WordPressPage {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  parent: number;
  menu_order: number;
  title: WordPressRenderedField;
  content: WordPressRenderedField;
  excerpt: WordPressRenderedField;
}

export interface WordPressPost extends Omit<WordPressPage, 'parent' | 'menu_order'> {
  categories: number[];
  tags: number[];
}

export interface WordPressTerm {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy?: string;
  parent?: number;
}

export interface WordPressQueryOptions {
  page?: number;
  perPage?: number;
  search?: string;
  slug?: string;
  status?: string;
  parent?: number;
  orderby?: string;
  order?: 'asc' | 'desc';
}

function buildQuery(options?: WordPressQueryOptions): string {
  const params = new URLSearchParams();
  if (!options) return '';
  for (const [key, value] of Object.entries({
    page: options.page,
    per_page: options.perPage,
    search: options.search,
    slug: options.slug,
    status: options.status,
    parent: options.parent,
    orderby: options.orderby,
    order: options.order,
  })) {
    if (value !== undefined) params.set(key, String(value));
  }
  return params.toString();
}

async function fetchWordPress<T>(resource: string, options?: WordPressQueryOptions): Promise<T> {
  const query = buildQuery(options);
  const url = `${WORDPRESS_API_ORIGIN}/wp-json/wp/v2/${resource}${query ? `?${query}` : ''}`;
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate: 300 },
  });
  if (!response.ok) throw new Error(`WordPress API request failed: ${response.status}`);
  return (await response.json()) as T;
}

export function getWordPressPages(options?: WordPressQueryOptions) {
  return fetchWordPress<WordPressPage[]>('pages', options);
}

export function getWordPressPosts(options?: WordPressQueryOptions) {
  return fetchWordPress<WordPressPost[]>('posts', options);
}

export function getWordPressCategories(options?: WordPressQueryOptions) {
  return fetchWordPress<WordPressTerm[]>('categories', options);
}

export function getWordPressTags(options?: WordPressQueryOptions) {
  return fetchWordPress<WordPressTerm[]>('tags', options);
}
