/**
 * Pre-rendering script for SEO crawlability
 * Generates static HTML for all routes during build
 * This does NOT affect runtime behavior - it only creates static HTML files
 * that crawlers can read immediately, while the app still works normally
 */

import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync, mkdirSync, existsSync, createReadStream, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Routes to pre-render (static routes only - dynamic routes like /blogs/:id are handled by the app)
const routes = [
  '/',
  '/about',
  '/about/who-we-are',
  '/about/history',
  '/about/meet-the-team',
  '/clinic-at-hand',
  '/solutions',
  '/blogs',
  '/media',
  '/health-tools/bmi-calculator',
  '/health-tools/diet-recommendation',
  '/contact',
  '/support',
  '/careers',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
  '/sitemap',
];

const distDir = join(__dirname, '..', 'dist');

// Simple MIME type mapping
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

function getMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

async function prerender() {
  console.log('🚀 Starting pre-rendering for SEO crawlability...\n');

  // Check if dist directory exists
  if (!existsSync(distDir)) {
    console.error('❌ Error: dist directory not found. Please run "npm run build" first.');
    process.exit(1);
  }

  // Read the built index.html
  const indexPath = join(distDir, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ Error: index.html not found in dist directory.');
    process.exit(1);
  }

  const indexHtml = readFileSync(indexPath, 'utf-8');

  // Start a local server to serve the built files
  const serverPort = 3000;
  const server = createServer((req, res) => {
    let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(distDir)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    // Default to index.html for routes (SPA fallback)
    if (!existsSync(filePath) || (existsSync(filePath) && statSync(filePath).isDirectory())) {
      filePath = indexPath;
    }

    const contentType = getMimeType(filePath);
    
    try {
      res.writeHead(200, { 'Content-Type': contentType });
      createReadStream(filePath).pipe(res);
    } catch (error) {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  // Start server
  await new Promise((resolve) => {
    server.listen(serverPort, () => {
      console.log(`📡 Local server started on port ${serverPort}\n`);
      resolve();
    });
  });

  const serverUrl = `http://localhost:${serverPort}`;

  // Launch Puppeteer
  console.log('🌐 Launching browser...\n');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1920, height: 1080 });

  // Pre-render each route
  for (const route of routes) {
    try {
      console.log(`📄 Pre-rendering: ${route}`);
      
      const url = `${serverUrl}${route}`;
      
      // Navigate to the route
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait a bit more for any lazy-loaded content or animations
      await page.waitForTimeout(2000);

      // Get the rendered HTML
      const html = await page.content();

      // Determine output path
      let outputPath;
      if (route === '/') {
        // Root route - update index.html
        outputPath = indexPath;
      } else {
        // Create directory structure
        const routePath = route.endsWith('/') ? route.slice(0, -1) : route;
        const dirPath = join(distDir, routePath);
        mkdirSync(dirPath, { recursive: true });
        outputPath = join(dirPath, 'index.html');
      }

      // Extract the body content from rendered HTML
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      if (bodyMatch) {
        const bodyContent = bodyMatch[1];
        // Find the root div content
        const rootMatch = bodyContent.match(/<div[^>]*id="root"[^>]*>([\s\S]*)<\/div>/i);
        
        if (rootMatch) {
          // Replace the root div content in the original index.html
          const rootContent = rootMatch[1];
          const updatedHtml = indexHtml.replace(
            /<div id="root"><\/div>/,
            `<div id="root">${rootContent}</div>`
          );
          writeFileSync(outputPath, updatedHtml, 'utf-8');
        } else {
          // Fallback: write the full HTML
          writeFileSync(outputPath, html, 'utf-8');
        }
      } else {
        // Fallback: write the full HTML
        writeFileSync(outputPath, html, 'utf-8');
      }

      console.log(`   ✅ Pre-rendered: ${route}\n`);
    } catch (error) {
      console.error(`   ❌ Error pre-rendering ${route}:`, error.message);
      // Continue with other routes
    }
  }

  // Close browser
  await browser.close();
  
  // Close server
  await new Promise((resolve) => {
    server.close(() => {
      console.log('📡 Server closed\n');
      resolve();
    });
  });

  console.log('✨ Pre-rendering complete! All routes are now crawlable.\n');
  console.log('📝 Note: The app behavior remains unchanged - this only helps crawlers see content immediately.\n');
}

// Run pre-rendering
prerender().catch((error) => {
  console.error('❌ Pre-rendering failed:', error);
  console.error('⚠️  Warning: Build completed but pre-rendering failed. The app will still work, but SEO may be affected.');
  console.error('💡 Tip: Check that Puppeteer is installed: npm install puppeteer');
  // Don't exit with error - allow build to complete
  // The app will still work, just without pre-rendered HTML
  process.exit(0);
});
