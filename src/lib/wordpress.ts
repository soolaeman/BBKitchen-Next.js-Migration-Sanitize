const baseUrl = process.env.WORDPRESS_API_URL;

if (!baseUrl) {
  throw new Error('WORDPRESS_API_URL is not configured');
}

export async function fetchWordPress(path: string, init?: RequestInit) {
  const url = new URL(path.replace(/^\//, ''), `${baseUrl.replace(/\/$/, '')}/`);

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`);
  }

  return response.json();
}
