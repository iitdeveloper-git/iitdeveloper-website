import type { MetadataRoute } from 'next';
import { siteConfig, servicePillars } from '@/content/site';
import { caseStudies } from '@/content/work';
import { insights } from '@/content/insights';
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/services', '/work', '/about', '/insights', '/contact', '/estimate', '/privacy', '/terms', '/cookies'];
  const routes = [...staticRoutes, ...servicePillars.map((item) => `/services/${item.slug}`), ...caseStudies.map((item) => `/work/${item.slug}`), ...insights.map((item) => `/insights/${item.slug}`)];
  return routes.map((route) => ({ url: `${siteConfig.url}${route}`, changeFrequency: route.startsWith('/insights') ? 'monthly' : 'monthly', priority: route === '' ? 1 : route.split('/').length <= 2 ? 0.8 : 0.7 }));
}
