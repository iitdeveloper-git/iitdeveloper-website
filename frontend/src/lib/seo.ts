import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

type SEOConfig = {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noindex?: boolean;
};

function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

export function generateSEO(config: SEOConfig = {}): Metadata {
  const title = config.title ? `${config.title} | ${siteConfig.name}` : 'AI, Cloud and Software Engineering for Growing Businesses | IITDEVELOPER';
  const description = config.description || siteConfig.description;
  const canonical = absoluteUrl(config.canonical || '/');
  const image = absoluteUrl(config.ogImage || '/logo.png');
  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: { canonical },
    robots: config.noindex ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
    openGraph: { type: config.ogType || 'website', url: canonical, title, description, siteName: siteConfig.name, images: [{ url: image, alt: siteConfig.name }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
    },
  };
}

export function organizationSchema() {
  const sameAs = [process.env.NEXT_PUBLIC_LINKEDIN_URL, process.env.NEXT_PUBLIC_GITHUB_URL, process.env.NEXT_PUBLIC_X_URL].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl('/logo.png'),
    description: siteConfig.description,
    foundingDate: String(siteConfig.founded),
    email: siteConfig.email,
    sameAs,
  };
}

export function websiteSchema() {
  return { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };
}

export { absoluteUrl };
