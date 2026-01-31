# Core Web Vitals Optimization Plan

## Current Performance Metrics

### Largest Contentful Paint (LCP)
- **Current**: 4.39s (Poor - Target: <2.5s)
- **LCP Element**: `h1.text-4xl.md:text-5xl.lg:text-6xl.font-bold.text-foreground.leading-tight`
- **Field 75th Percentile**: Poor

### Cumulative Layout Shift (CLS)
- **Current**: 0.22 (Needs Improvement - Target: <0.1)
- **Worst Cluster**: 2 shifts
- **Field 75th Percentile**: Needs Improvement

## Optimization Strategy

### 1. LCP Optimization (4.39s → <2.5s)

#### Issue Analysis
The LCP element is the main H1 heading, which suggests:
- Large font files loading late
- Render-blocking resources
- Slow initial server response
- Large JavaScript bundles delaying content render

#### Solutions (Implementation Plan)

**A. Font Optimization**
- [ ] Preload critical fonts (Inter font family)
- [ ] Use `font-display: swap` for all fonts
- [ ] Subset fonts to include only used characters
- [ ] Consider using system fonts as fallback
- [ ] Implement font preloading in `index.html`:
  ```html
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  ```

**B. Critical CSS Inlining**
- [ ] Extract critical CSS for above-the-fold content
- [ ] Inline critical CSS in `<head>`
- [ ] Defer non-critical CSS loading
- [ ] Use `rel="preload"` for non-critical stylesheets

**C. JavaScript Optimization**
- [ ] Code split routes more aggressively
- [ ] Lazy load non-critical components (modals, popups, animations)
- [ ] Defer non-critical scripts
- [ ] Remove unused dependencies (audit bundle size)
- [ ] Use dynamic imports for heavy libraries (Framer Motion, Recharts)

**D. Image Optimization**
- [ ] Convert all images to WebP format with fallbacks
- [ ] Implement responsive images with `srcset`
- [ ] Preload hero image with `fetchpriority="high"`
- [ ] Use proper image dimensions to prevent layout shifts
- [ ] Consider using Next.js Image component or similar optimization

**E. Server Response Time**
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Implement CDN for static assets
- [ ] Enable compression (Gzip/Brotli)
- [ ] Optimize server-side rendering or pre-rendering
- [ ] Use edge caching for static content

**F. Resource Hints**
- [ ] Add `rel="preconnect"` for external domains (fonts, analytics)
- [ ] Add `rel="dns-prefetch"` for third-party resources
- [ ] Preload critical resources (hero image, fonts)

**G. Reduce Render-Blocking Resources**
- [ ] Move non-critical CSS to bottom or load asynchronously
- [ ] Defer JavaScript execution where possible
- [ ] Minimize render-blocking scripts in `<head>`

### 2. CLS Optimization (0.22 → <0.1)

#### Issue Analysis
CLS of 0.22 indicates significant layout shifts, likely from:
- Images without dimensions
- Dynamic content loading
- Font loading causing text reflow
- Advertisements or embeds
- Animations causing layout changes

#### Solutions (Implementation Plan)

**A. Image Dimensions**
- [x] Add explicit width/height attributes to all images (COMPLETED)
- [ ] Use aspect-ratio CSS property for responsive images
- [ ] Reserve space for images before they load
- [ ] Use placeholder images with same dimensions

**B. Font Loading Strategy**
- [ ] Use `font-display: swap` to prevent invisible text
- [ ] Preload critical fonts
- [ ] Set explicit font sizes to prevent reflow
- [ ] Use `size-adjust` for font fallbacks

**C. Dynamic Content**
- [ ] Reserve space for dynamically loaded content
- [ ] Use skeleton loaders with fixed dimensions
- [ ] Avoid inserting content above existing content
- [ ] Use CSS Grid/Flexbox with fixed dimensions

**D. Animations**
- [ ] Use `transform` and `opacity` only (GPU-accelerated)
- [ ] Avoid animating layout properties (width, height, top, left)
- [ ] Use `will-change` property sparingly
- [ ] Ensure animations don't cause layout shifts

**E. Third-Party Content**
- [ ] Reserve space for iframes (videos, embeds)
- [ ] Use aspect-ratio containers for embeds
- [ ] Lazy load third-party content below the fold
- [ ] Consider using `loading="lazy"` for iframes

**F. Web Fonts**
- [ ] Preload web fonts
- [ ] Use font-display: optional or swap
- [ ] Match fallback font metrics to web font
- [ ] Use `font-size-adjust` for consistent sizing

### 3. Additional Performance Optimizations

**A. Bundle Size Reduction**
- [ ] Audit and remove unused dependencies
- [ ] Tree-shake unused code
- [ ] Split vendor chunks more granularly
- [ ] Use dynamic imports for route-based code splitting
- [ ] Consider replacing heavy libraries with lighter alternatives

**B. Caching Strategy**
- [ ] Implement service worker for offline caching
- [ ] Set appropriate cache headers
- [ ] Use browser caching for static assets
- [ ] Implement stale-while-revalidate strategy

**C. Network Optimization**
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Use CDN for global asset delivery
- [ ] Implement resource prioritization
- [ ] Minimize redirects

**D. Rendering Optimization**
- [ ] Minimize main thread work
- [ ] Use Web Workers for heavy computations
- [ ] Optimize JavaScript execution time
- [ ] Reduce DOM complexity

## Implementation Priority

### Phase 1 (Immediate - High Impact)
1. Add explicit image dimensions (COMPLETED)
2. Preload critical fonts
3. Optimize hero image loading
4. Implement font-display: swap
5. Add resource hints (preconnect, dns-prefetch)

### Phase 2 (Short-term)
1. Code split and lazy load components
2. Optimize bundle sizes
3. Implement critical CSS inlining
4. Convert images to WebP
5. Add aspect-ratio to images

### Phase 3 (Medium-term)
1. Implement service worker
2. Optimize third-party scripts
3. Fine-tune animations
4. Advanced caching strategies
5. CDN implementation

## Monitoring & Validation

### Tools for Testing
- Google PageSpeed Insights
- Chrome DevTools Lighthouse
- WebPageTest
- Chrome User Experience Report (CrUX)
- Real User Monitoring (RUM)

### Success Metrics
- LCP: < 2.5s (Good)
- CLS: < 0.1 (Good)
- FID: < 100ms (Good)
- TTI: < 3.8s (Good)

## Notes

- **Do not remove animations** - Optimize them instead
- **Do not change margins or layout** - Fix CLS through proper sizing
- **Maintain visual design** - All optimizations should be invisible to users
- **Test on real devices** - Mobile performance is critical
- **Monitor after deployment** - Track metrics continuously

## Technical Constraints

- Must maintain all animations and visual effects
- Cannot change CSS margins, padding, or layout structure
- Must preserve all existing functionality
- Should not break responsive design
- Must work across all browsers






