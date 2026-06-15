import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iitdeveloper.com';
  const currentDate = new Date();

  // Main pages
  const routes = [
    '',
    '/about',
    '/contact',
    '/estimate',
    '/pricing-estimator',
    '/case-studies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Service pages
  const services = [
    'website-development',
    'app-development',
    'devops-cloud',
    'salesforce',
    'ai-agents',
    'ai-workflows',
    'marketing',
    'seo-smm',
  ].map((service) => ({
    url: `${baseUrl}/services/${service}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Legal pages
  const legal = ['privacy', 'terms', 'cookies'].map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: currentDate,
    changeFrequency: 'yearly' as const,
    priority: 0.3,
  }));

  return [...routes, ...services, ...legal];
}
