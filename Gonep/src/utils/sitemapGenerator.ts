/**
 * Sitemap Generator Utility
 * Generates sitemap URLs using BASE_URL from environment
 */

import { BASE_URL } from './config';

export interface SitemapUrl {
  path: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const sitemapUrls: SitemapUrl[] = [
  { path: '/', lastmod: '2024-01-15', changefreq: 'weekly', priority: 1.0 },
  { path: '/clinic-at-hand', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.9 },
  { path: '/solutions', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.9 },
  { path: '/about', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.8 },
  { path: '/about/who-we-are', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
  { path: '/about/history', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
  { path: '/about/meet-the-team', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
  { path: '/blogs', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.8 },
  { path: '/health-tools/bmi-calculator', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.6 },
  { path: '/health-tools/diet-recommendation', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.6 },
  { path: '/careers', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.7 },
  { path: '/contact', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.8 },
  { path: '/support', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.7 },
  { path: '/media', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.5 },
  { path: '/terms-of-service', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.5 },
  { path: '/cookie-policy', lastmod: '2024-01-15', changefreq: 'monthly', priority: 0.5 },
  { path: '/sitemap', lastmod: '2024-01-15', changefreq: 'weekly', priority: 0.4 },
];

/**
 * Generate full URL for sitemap entry
 */
export function generateSitemapUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Generate XML sitemap content
 * Note: This is for reference. Actual sitemap.xml should be generated at build time
 * or served dynamically from the backend.
 */
export function generateSitemapXML(): string {
  const urls = sitemapUrls.map(url => {
    const loc = generateSitemapUrl(url.path);
    return `  <url>
    <loc>${loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
${urls}
  
</urlset>`;
}






