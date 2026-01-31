import { Helmet } from 'react-helmet-async';
import {
  generateOrganizationSchema,
  generateProductSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  OrganizationSchema,
  ProductSchema,
  ArticleSchema,
  BreadcrumbItem
} from '../utils/schema';

interface SchemaMarkupProps {
  type: 'organization' | 'product' | 'article' | 'breadcrumb' | 'localBusiness' | 'faq';
  data?: any;
}

export function SchemaMarkup({ type, data }: SchemaMarkupProps) {
  let schema: any;

  switch (type) {
    case 'organization':
      schema = generateOrganizationSchema(data);
      break;
    case 'product':
      schema = generateProductSchema(data);
      break;
    case 'article':
      schema = generateArticleSchema(data);
      break;
    case 'breadcrumb':
      schema = generateBreadcrumbSchema(data as BreadcrumbItem[]);
      break;
    case 'localBusiness':
      schema = generateLocalBusinessSchema();
      break;
    case 'faq':
      schema = generateFAQSchema(data);
      break;
    default:
      return null;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}






