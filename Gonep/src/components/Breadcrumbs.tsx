import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { SchemaMarkup } from './SchemaMarkup';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Build breadcrumb items
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' }
  ];

  let currentPath = '';
  pathnames.forEach((pathname, index) => {
    currentPath += `/${pathname}`;
    
    // Convert pathname to readable name
    const name = pathname
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name: name,
      url: currentPath
    });
  });

  // Don't show breadcrumbs on homepage
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <>
      <SchemaMarkup type="breadcrumb" data={breadcrumbs} />
      <nav className="container py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={crumb.url} className="flex items-center">
                {index === 0 ? (
                  <Link
                    to={crumb.url}
                    className="hover:text-primary transition-colors flex items-center"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                    {isLast ? (
                      <span className="text-foreground font-medium" aria-current="page">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        to={crumb.url}
                        className="hover:text-primary transition-colors"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}






