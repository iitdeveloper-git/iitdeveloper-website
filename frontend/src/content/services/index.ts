import type { StructuredPage } from '@iitdeveloper/agent-content';
import type { ServiceContent } from '../schema';
import { websiteDevelopmentContent } from './website-development';
import { appDevelopmentContent } from './app-development';
import { devopsCloudContent } from './devops-cloud';
import { aiAgentsContent } from './ai-agents';
import { aiWorkflowsContent } from './ai-workflows';
import { salesforceContent } from './salesforce';
import { shopifyStoreContent } from './shopify-store';
import { marketingContent } from './marketing';
import { seoSmmContent } from './seo-smm';
import { ecommerceContent } from './ecommerce';
import { graphicDesignContent } from './graphic-design';
import { b2bPromotionContent } from './b2b-promotion';

export const allServices: ServiceContent[] = [
  websiteDevelopmentContent,
  appDevelopmentContent,
  devopsCloudContent,
  aiAgentsContent,
  aiWorkflowsContent,
  salesforceContent,
  shopifyStoreContent,
  marketingContent,
  seoSmmContent,
  ecommerceContent,
  graphicDesignContent,
  b2bPromotionContent,
];

export const servicesBySlug: Record<string, ServiceContent> = Object.fromEntries(
  allServices.map((service) => [service.slug, service])
);

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return servicesBySlug[slug];
}

/**
 * Transforms a canonical ServiceContent model into an AgentContent StructuredPage.
 * Eliminates duplication by generating the exact Markdown representation dynamically.
 */
export function serviceToStructuredPage(service: ServiceContent): StructuredPage {
  const featuresList = service.features
    .map((f) => `- **${f.title}**: ${f.description}`)
    .join('\n');

  const techList = service.technologies.map((t) => `- ${t}`).join('\n');

  const processList = service.processSteps
    .map((s) => `${s.number}. **${s.title}**: ${s.description}`)
    .join('\n');

  const markdownContent = `# ${service.title}

${service.description}

## Core Capabilities
${featuresList}

## Supported Technologies & Frameworks
${techList}

## Delivery & Engineering Process
${processList}

## Engagement & Next Steps
- **Consultation**: ${service.ctaSubtitle || 'Contact our engineering studio to assess scope and architecture.'}
- **Inquiries**: info@iitdeveloper.com
- **Intake Form**: https://iitdeveloper.com/contact
`;

  return {
    url: `/services/${service.slug}`,
    title: service.title,
    description: service.description,
    category: 'Services',
    status: 'published',
    content: markdownContent,
    canonicalUrl: `https://iitdeveloper.com/services/${service.slug}`,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: service.shortTitle,
      provider: {
        '@type': 'Organization',
        name: 'IITDeveloper',
        url: 'https://iitdeveloper.com',
      },
      description: service.description,
    },
  };
}

