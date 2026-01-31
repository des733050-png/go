# Pre-rendering Guide for SEO Crawlability

## Overview

This project uses build-time pre-rendering to ensure all pages are fully crawlable by search engines without affecting the runtime behavior or user experience.

## How It Works

1. **Build Phase**: Normal Vite build creates the React app
2. **Pre-render Phase**: Puppeteer renders each route and saves static HTML
3. **Result**: Crawlers see content immediately, users get the same React app

## What Gets Pre-rendered

All static routes are pre-rendered:
- `/` (Homepage)
- `/about` and all sub-routes
- `/clinic-at-hand`
- `/solutions`
- `/blogs`
- `/media`
- `/health-tools/*`
- `/contact`
- `/support`
- `/careers`
- Legal pages (`/privacy-policy`, `/terms-of-service`, `/cookie-policy`)
- `/sitemap`

**Note**: Dynamic routes (like `/blogs/:id` or `/careers/:jobId`) are handled by the React app at runtime.

## Build Process

The pre-rendering happens automatically during the build:

```bash
npm run build
```

This runs:
1. `npm run generate-sitemap` - Generates sitemap.xml
2. `tsc` - TypeScript compilation
3. `vite build` - Normal Vite build
4. `npm run prerender` - Pre-renders all routes

## Technical Details

### Pre-rendering Script

Located at: `scripts/prerender.js`

The script:
1. Starts a local HTTP server on port 3000
2. Launches Puppeteer (headless Chrome)
3. Visits each route and waits for full render
4. Extracts the rendered HTML
5. Saves it as static HTML files
6. Closes browser and server

### Output Structure

After pre-rendering, the `dist` folder contains:
```
dist/
  index.html (pre-rendered homepage)
  about/
    index.html (pre-rendered about page)
  clinic-at-hand/
    index.html (pre-rendered product page)
  ... (all other routes)
```

### Runtime Behavior

**Important**: Pre-rendering does NOT change how the app works:
- Users still get the full React app
- All JavaScript still executes
- All interactivity works normally
- Routing still works client-side
- The app hydrates normally

The only difference is that crawlers can see content in the initial HTML without executing JavaScript.

## Benefits

1. **Faster Indexing**: Search engines see content immediately
2. **Better SEO**: Content is in HTML, not just JavaScript
3. **Social Sharing**: Facebook/Twitter preview cards work properly
4. **No UX Changes**: Users experience the same React app
5. **Progressive Enhancement**: Works even if JavaScript fails

## Troubleshooting

### Pre-rendering Fails

If pre-rendering fails:
1. Check that `dist` folder exists (run `vite build` first)
2. Ensure port 3000 is available
3. Check Puppeteer installation: `npm install puppeteer`
4. Review error messages in console

### Missing Routes

To add a new route to pre-rendering:
1. Edit `scripts/prerender.js`
2. Add route to the `routes` array
3. Rebuild: `npm run build`

### Build Time

Pre-rendering adds ~30-60 seconds to build time depending on:
- Number of routes
- Page complexity
- Network requests during render

This is acceptable for production builds.

## Verification

### Test Pre-rendered Content

1. Build the project: `npm run build`
2. Check `dist` folder for route directories
3. Open `dist/index.html` in a browser (disable JavaScript)
4. You should see the pre-rendered content

### Test with Crawler Simulation

Use Google Search Console URL Inspection Tool:
1. Go to: https://search.google.com/search-console
2. Use "URL Inspection"
3. Enter your URL
4. Click "Test Live URL"
5. Check "View Tested Page" - should show full content

### Verify No UX Changes

1. Build: `npm run build`
2. Preview: `npm run preview`
3. Navigate through the site
4. Verify all functionality works normally
5. Check that routing works
6. Verify all interactive elements work

## Maintenance

### Updating Routes

When adding new static routes:
1. Add to `routes` array in `scripts/prerender.js`
2. Update sitemap generator if needed
3. Rebuild

### Performance Optimization

If build time becomes an issue:
1. Reduce wait times in script (may affect quality)
2. Pre-render only critical pages
3. Use incremental builds if possible

## Notes

- Pre-rendering only affects the **build process**
- It does NOT change **development** (`npm run dev`)
- It does NOT change **runtime behavior**
- It does NOT affect **user experience**
- It ONLY helps **search engine crawlers**

## Support

For issues or questions:
1. Check build logs for errors
2. Verify Puppeteer installation
3. Test with a simple route first
4. Review the pre-rendering script

