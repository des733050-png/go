import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEOData, generateTitle, generateCanonical, generateOGImage, generateTwitterImage, generateKeywords, generateRobots } from '../utils/seo';

interface SEOHeadProps {
  seo: SEOData;
}

export function SEOHead({ seo }: SEOHeadProps) {
  const location = useLocation();
  
  const canonical = seo.canonical || generateCanonical(location.pathname);
  const title = generateTitle(seo.title);
  const ogImage = generateOGImage(seo.ogImage);
  const twitterImage = generateTwitterImage(seo.twitterImage);
  const keywords = generateKeywords(seo.keywords);
  const robots = generateRobots(seo.noindex, seo.nofollow);
  const ogType = seo.ogType || 'website';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="GONEP Healthcare" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:site" content="@gonepharm" />
      <meta name="twitter:creator" content="@gonepharm" />
    </Helmet>
  );
}






