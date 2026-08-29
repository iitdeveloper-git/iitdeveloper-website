import { Metadata } from 'next';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noindex?: boolean;
}

const defaultMetadata = {
  siteName: 'IITDeveloper',
  title: 'IITDeveloper - Premium Web Development, AI Solutions & DevOps',
  description:
    'Expert web development, AI automation, and cloud infrastructure. Build scalable applications with modern frameworks. Fast, reliable, and built to last.',
  keywords: [
    'web development',
    'app development',
    'AI solutions',
    'DevOps',
    'cloud infrastructure',
    'Salesforce',
    'performance marketing',
    'SEO services',
    'Next.js development',
    'React development',
    'AI agents',
    'automation',
  ],
  url: 'https://iitdeveloper.com',
  ogImage: '/og-image.jpg',
  twitterHandle: '@developer_iit',
};

export function generateSEO(config: SEOConfig = {}): Metadata {
  const title = config.title
    ? `${config.title} | ${defaultMetadata.siteName}`
    : defaultMetadata.title;

  const description = config.description || defaultMetadata.description;
  const keywords = config.keywords || defaultMetadata.keywords;
  const ogImage = config.ogImage || defaultMetadata.ogImage;
  const canonical = config.canonical || defaultMetadata.url;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: defaultMetadata.siteName }],
    creator: defaultMetadata.siteName,
    publisher: defaultMetadata.siteName,
    robots: config.noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
    alternates: {
      canonical,
    },
    openGraph: {
      type: config.ogType || 'website',
      locale: 'en_US',
      url: canonical,
      title,
      description,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: defaultMetadata.twitterHandle,
      images: [ogImage],
    },
    verification: {
      google: 'your-google-verification-code',
      // Add other verification codes as needed
    },
    icons: {
      icon: [
        { url: '/favicon.ico',         sizes: '16x16 32x32 48x48 64x64', type: 'image/x-icon' },
        { url: '/favicon-32x32.png',   sizes: '32x32',  type: 'image/png' },
        { url: '/favicon-96x96.png',   sizes: '96x96',  type: 'image/png' },
        { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/favicon-32x32.png',
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    category: 'technology',
  };
}

export function generateStructuredData(type: 'Organization' | 'WebSite' | 'Service' | 'FAQPage', data?: any) {
  const baseUrl = defaultMetadata.url;

  const schemas: Record<string, any> = {
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: defaultMetadata.siteName,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      description: defaultMetadata.description,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
        addressLocality: 'San Francisco',
        addressRegion: 'CA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: 'info@iitdeveloper.com',
        availableLanguage: ['English'],
      },
      sameAs: [
        'https://www.linkedin.com/company/iitdeveloper/',
        'https://github.com/iitdeveloper-git',
        'https://www.instagram.com/iitdeveloper',
        'https://x.com/developer_iit',
      ],
    },
    WebSite: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: defaultMetadata.siteName,
      url: baseUrl,
      description: defaultMetadata.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    Service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: data?.serviceType || 'Web Development',
      provider: {
        '@type': 'Organization',
        name: defaultMetadata.siteName,
      },
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Website Development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'App Development',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Solutions',
            },
          },
        ],
      },
    },
  };

  return schemas[type] || schemas.Organization;
}

export { defaultMetadata };
