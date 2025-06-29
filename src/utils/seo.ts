export const updateMetaTags = (data: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}) => {
  // Update title
  if (data.title) {
    document.title = `${data.title} | Blossom Wrap Studio`;
  }

  // Update meta description
  if (data.description) {
    updateMetaTag('description', data.description);
  }

  // Update meta keywords
  if (data.keywords) {
    updateMetaTag('keywords', data.keywords);
  }

  // Update Open Graph tags
  if (data.title) {
    updateMetaTag('og:title', data.title, 'property');
  }
  if (data.description) {
    updateMetaTag('og:description', data.description, 'property');
  }
  if (data.image) {
    updateMetaTag('og:image', data.image, 'property');
  }
  if (data.url) {
    updateMetaTag('og:url', data.url, 'property');
  }

  // Update Twitter Card tags
  if (data.title) {
    updateMetaTag('twitter:title', data.title, 'name');
  }
  if (data.description) {
    updateMetaTag('twitter:description', data.description, 'name');
  }
  if (data.image) {
    updateMetaTag('twitter:image', data.image, 'name');
  }
};

const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

export const generateStructuredData = (type: 'Product' | 'Organization' | 'WebSite', data: any) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  let script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(structuredData);
};