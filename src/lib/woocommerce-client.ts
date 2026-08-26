const WOOCOMMERCE_API_ORIGIN = (process.env.WOOCOMMERCE_API_URL || 'https://example.com')
  .replace(/\/$/, '')
  .replace(/\/wp-json\/wc\/v3$/i, '');

export function hasWooCommerceCredentials(): boolean {
  return Boolean(process.env.WC_CONSUMER_KEY && process.env.WC_CONSUMER_SECRET);
}

export function buildWooCommerceUrl(resource: string, params?: URLSearchParams): string {
  const query = new URLSearchParams(params);
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;
  if (key && secret) {
    query.set('consumer_key', key);
    query.set('consumer_secret', secret);
  }
  const queryString = query.toString();
  return `${WOOCOMMERCE_API_ORIGIN}/wp-json/wc/v3/${resource}${queryString ? `?${queryString}` : ''}`;
}

export function getWooCommerceHeaders(): HeadersInit {
  return { Accept: 'application/json' };
}
