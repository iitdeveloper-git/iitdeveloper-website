import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
export default function robots(): MetadataRoute.Robots {
  const deploymentContext = process.env.CONTEXT || process.env.VERCEL_ENV;
  const production = deploymentContext ? deploymentContext === 'production' : process.env.NODE_ENV === 'production';
  return {
    rules: production ? { userAgent: '*', allow: '/', disallow: ['/api/', '/estimate/'] } : { userAgent: '*', disallow: '/' },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
