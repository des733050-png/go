/**
 * SEO Utility Functions
 * Provides helper functions for generating SEO metadata
 */

import { BASE_URL } from './config';

// Re-export BASE_URL for convenience
export { BASE_URL };

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;
const DEFAULT_TWITTER_IMAGE = `${BASE_URL}/twitter-image.jpg`;

/**
 * Generate full page title with brand name
 */
export function generateTitle(pageTitle: string): string {
  const brandName = 'GONEP Healthcare';
  if (pageTitle.includes(brandName)) {
    return pageTitle;
  }
  return `${pageTitle} | ${brandName}`;
}

/**
 * Generate canonical URL
 */
export function generateCanonical(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

/**
 * Generate Open Graph image URL
 */
export function generateOGImage(imagePath?: string): string {
  if (imagePath) {
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  }
  return DEFAULT_OG_IMAGE;
}

/**
 * Generate Twitter image URL
 */
export function generateTwitterImage(imagePath?: string): string {
  if (imagePath) {
    return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
  }
  return DEFAULT_TWITTER_IMAGE;
}

/**
 * Generate keywords string from array
 */
export function generateKeywords(keywords?: string[]): string {
  if (!keywords || keywords.length === 0) {
    return 'healthcare, IoT, rural healthcare, Clinic at Hand, medical devices, Kenya healthcare, point of care diagnostics, portable medical device, Africa healthcare technology';
  }
  return keywords.join(', ');
}

/**
 * Generate robots meta content
 */
export function generateRobots(noindex?: boolean, nofollow?: boolean): string {
  if (noindex && nofollow) {
    return 'noindex, nofollow';
  }
  if (noindex) {
    return 'noindex, follow';
  }
  if (nofollow) {
    return 'index, nofollow';
  }
  return 'index, follow';
}

/**
 * Default SEO data for fallback
 */
export const defaultSEO: SEOData = {
  title: 'GONEP Healthcare - Innovative IoT Healthcare Solutions for Rural Communities',
  description: 'GONEP Healthcare provides innovative IoT healthcare solutions for rural communities. Our Clinic at Hand device transforms healthcare delivery with portable diagnostics, blood testing, and vital signs monitoring.',
  keywords: [
    'healthcare',
    'IoT',
    'rural healthcare',
    'Clinic at Hand',
    'medical devices',
    'Kenya healthcare',
    'point of care diagnostics',
    'portable medical device',
    'Africa healthcare technology',
    'portable diagnostic device',
    'mobile health device'
  ],
  canonical: BASE_URL,
  ogImage: DEFAULT_OG_IMAGE,
  ogType: 'website',
  twitterImage: DEFAULT_TWITTER_IMAGE
};

