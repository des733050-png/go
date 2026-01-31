/**
 * Schema Markup Utilities
 * Generates JSON-LD structured data for SEO
 */

import { BASE_URL } from './config';

export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

export interface ProductSchema {
  name: string;
  description: string;
  image?: string;
  brand?: {
    name: string;
  };
  offers?: {
    priceCurrency: string;
    availability: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

export interface ArticleSchema {
  headline: string;
  description: string;
  image?: string;
  author?: {
    name: string;
    url?: string;
  };
  datePublished?: string;
  dateModified?: string;
  publisher?: {
    name: string;
    logo?: {
      url: string;
    };
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(data?: Partial<OrganizationSchema>) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data?.name || "GONEP Healthcare",
    "url": data?.url || BASE_URL,
    "logo": data?.logo || `${BASE_URL}/logo-without-tagline-bg-white.jpeg`,
    "description": data?.description || "GONEP Healthcare provides innovative IoT healthcare solutions for rural communities. Our Clinic at Hand device transforms healthcare delivery with portable diagnostics.",
    "address": data?.address || {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Chandaria Innovation Centre Building",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "contactPoint": data?.contactPoint || {
      "@type": "ContactPoint",
      "telephone": "+254-707-231-654",
      "contactType": "Customer Service",
      "email": "info@gonepharm.com"
    },
    "sameAs": data?.sameAs || [
      "https://www.linkedin.com/company/g-one-pharmaceuticals",
      "https://www.instagram.com/gonep_pharmaceauticals/",
      "https://www.facebook.com/Gonepharmaceuticals"
    ]
  };
}

/**
 * Generate Product/MedicalDevice schema
 */
export function generateProductSchema(data: ProductSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalDevice",
    "name": data.name,
    "description": data.description,
    "image": data.image || `${BASE_URL}/clinic-at-hand-device.jpg`,
    "brand": data.brand || {
      "@type": "Brand",
      "name": "GONEP Healthcare"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "GONEP Healthcare"
    },
    "offers": data.offers || {
      "@type": "Offer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": data.aggregateRating
  };
}

/**
 * Generate Article schema
 */
export function generateArticleSchema(data: ArticleSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline,
    "description": data.description,
    "image": data.image,
    "author": data.author ? {
      "@type": "Person",
      "name": data.author.name,
      "url": data.author.url
    } : {
      "@type": "Organization",
      "name": "GONEP Healthcare"
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "publisher": data.publisher || {
      "@type": "Organization",
      "name": "GONEP Healthcare",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo-without-tagline-bg-white.jpeg`
      }
    }
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "GONEP Healthcare",
    "image": `${BASE_URL}/logo-without-tagline-bg-white.jpeg`,
    "@id": BASE_URL,
    "url": BASE_URL,
    "telephone": "+254-707-231-654",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor, Chandaria Innovation Centre Building",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi",
      "postalCode": "",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.2921,
      "longitude": 36.8219
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    }
  };
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

