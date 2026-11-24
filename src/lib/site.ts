export const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') || '';
export const asset = (path: string) => `${basePath}${path}`;
export const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
export const siteUrl = `${origin || 'http://localhost:3100'}${basePath}`;
