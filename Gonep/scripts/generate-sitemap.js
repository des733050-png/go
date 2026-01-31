/**
 * Sitemap Generation Script
 * Generates sitemap.xml using BASE_URL from environment variables
 * 
 * Usage: node scripts/generate-sitemap.js
 * 
 * This script reads VITE_BASE_URL from .env and generates sitemap.xml
 * Run this script before building for production to ensure sitemap uses correct domain
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env file
const envPath = join(__dirname, '..', '.env');
let baseUrl = 'https://gonepharm.com/'; // Default fallback

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  const baseUrlMatch = envContent.match(/VITE_BASE_URL=(.+)/);
  if (baseUrlMatch) {
    baseUrl = baseUrlMatch[1].trim();
  }
}

const sitemapUrls = [
  { path: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 1.0 },
  { path: '/clinic-at-hand', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.9 },
  { path: '/solutions', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.9 },
  { path: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  { path: '/about/who-we-are', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { path: '/about/history', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { path: '/about/meet-the-team', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { path: '/blogs', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { path: '/health-tools/bmi-calculator', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { path: '/health-tools/diet-recommendation', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { path: '/careers', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { path: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.8 },
  { path: '/support', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { path: '/media', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy-policy', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { path: '/terms-of-service', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { path: '/cookie-policy', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { path: '/sitemap', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.4 },
];

const urls = sitemapUrls.map(url => {
  const loc = `${baseUrl}${url.path}`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
}).join('\n');

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  
${urls}
  
</urlset>`;

const sitemapPath = join(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(sitemapPath, sitemapContent, 'utf-8');

console.log(`✅ Sitemap generated successfully using BASE_URL: ${baseUrl}`);
console.log(`📄 Sitemap saved to: ${sitemapPath}`);

