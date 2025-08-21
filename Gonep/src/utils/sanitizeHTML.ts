/**
 * HTML Sanitization Utility
 * Prevents XSS attacks by sanitizing HTML content
 */

// Allowed HTML tags and attributes
const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'div', 'span'
];

const ALLOWED_ATTRIBUTES = {
  'a': ['href', 'target', 'rel'],
  'img': ['src', 'alt', 'title', 'width', 'height'],
  'div': ['class'],
  'span': ['class'],
  'p': ['class'],
  'h1': ['class'], 'h2': ['class'], 'h3': ['class'], 'h4': ['class'], 'h5': ['class'], 'h6': ['class'],
  'ul': ['class'], 'ol': ['class'], 'li': ['class'],
  'blockquote': ['class'], 'code': ['class'], 'pre': ['class']
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Recursively sanitize nodes
  const sanitizeNode = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();

      // Skip disallowed tags
      if (!ALLOWED_TAGS.includes(tagName)) {
        return element.textContent || '';
      }

      // Build sanitized element
      let sanitizedElement = `<${tagName}`;

      // Add allowed attributes
      const allowedAttrs = ALLOWED_ATTRIBUTES[tagName as keyof typeof ALLOWED_ATTRIBUTES] || [];
      for (const attr of allowedAttrs) {
        const value = element.getAttribute(attr);
        if (value) {
          // Additional sanitization for specific attributes
          if (attr === 'href') {
            // Only allow http, https, and mailto protocols
            if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('mailto:')) {
              sanitizedElement += ` ${attr}="${value.replace(/"/g, '&quot;')}"`;
            }
          } else if (attr === 'src') {
            // Only allow http and https protocols for images
            if (value.startsWith('http://') || value.startsWith('https://')) {
              sanitizedElement += ` ${attr}="${value.replace(/"/g, '&quot;')}"`;
            }
          } else {
            sanitizedElement += ` ${attr}="${value.replace(/"/g, '&quot;')}"`;
          }
        }
      }

      sanitizedElement += '>';

      // Process child nodes
      for (const child of Array.from(element.childNodes)) {
        sanitizedElement += sanitizeNode(child);
      }

      sanitizedElement += `</${tagName}>`;
      return sanitizedElement;
    }

    return '';
  };

  // Sanitize all child nodes
  let sanitizedHTML = '';
  for (const child of Array.from(tempDiv.childNodes)) {
    sanitizedHTML += sanitizeNode(child);
  }

  return sanitizedHTML;
};

/**
 * Simple text-only sanitization (fallback)
 * @param html - The HTML string to sanitize
 * @returns Plain text content
 */
export const sanitizeToText = (html: string): string => {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};
