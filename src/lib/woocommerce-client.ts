const apiUrl = process.env.WOOCOMMERCE_API_URL;
const consumerKey = process.env.WC_CONSUMER_KEY;
const consumerSecret = process.env.WC_CONSUMER_SECRET;

if (!apiUrl || !consumerKey || !consumerSecret) {
  throw new Error('WooCommerce server configuration is incomplete');
}

export async function fetchWooCommerce(path: string, init?: RequestInit) {
  const url = new URL(path.replace(/^\//, ''), `${apiUrl.replace(/\/$/, '')}/`);
  url.searchParams.set('consumer_key', consumerKey);
  url.searchParams.set('consumer_secret', consumerSecret);

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`WooCommerce request failed: ${response.status}`);
  }

  return response.json();
}
