import type { ServiceContent } from '../schema';

export const salesforceContent: ServiceContent = {
  slug: 'salesforce',
  title: 'Salesforce Consulting & Custom Development — IITDeveloper',
  shortTitle: 'Salesforce Solutions',
  metaTitle: 'Salesforce Solutions & Consulting | Custom Implementations | IITDeveloper',
  description: 'Expert Salesforce consulting and custom implementations. CRM optimization, integrations, custom apps, and automation that makes Salesforce work for your business.',
  metaDescription: 'Expert Salesforce consulting and custom implementations. CRM optimization, integrations, custom apps, and automation that makes Salesforce work for your business.',
  category: 'Build',
  badge: 'Salesforce CRM',
  heroHeadline: 'Make Salesforce Work for You,',
  heroHighlight: 'Not the Other Way Around.',
  heroSubtitle: 'Custom implementations, Apex development, Lightning Web Components, and seamless third-party integrations.',
  features: [
    {
      iconName: 'Workflow',
      title: 'Custom Implementation',
      description: 'Tailored Salesforce setup that fits your business process, not the other way around.',
    },
    {
      iconName: 'Puzzle',
      title: 'Third-Party Integrations',
      description: 'Connect Salesforce with your existing tools. APIs, webhooks, middleware.',
    },
    {
      iconName: 'Database',
      title: 'Data Migration',
      description: 'Clean data migration from legacy systems. No data loss, validated transfers.',
    },
    {
      iconName: 'BarChart3',
      title: 'Advanced Analytics',
      description: 'Custom dashboards, reports, and Einstein Analytics for data-driven decisions.',
    },
    {
      iconName: 'Sparkles',
      title: 'Process Automation',
      description: 'Workflows, approval processes, and custom automation. Less manual work.',
    },
    {
      iconName: 'Users',
      title: 'Training & Support',
      description: 'Your team actually knows how to use it. Documentation included.',
    },
  ],
  technologies: [
    'Salesforce CRM', 'Apex', 'Visualforce', 'Lightning Components',
    'Salesforce APIs', 'Heroku', 'Marketing Cloud', 'Service Cloud',
    'Sales Cloud', 'Einstein Analytics', 'MuleSoft', 'Pardot',
  ],
  processSteps: [
    {
      number: '01',
      title: 'Discovery & Audit',
      description: 'Assess current CRM structure, data health, and workflow bottlenecks.',
    },
    {
      number: '02',
      title: 'Solution Design',
      description: 'Architect custom objects, LWC components, and security models.',
    },
    {
      number: '03',
      title: 'Implementation & Integration',
      description: 'Build Apex triggers, middleware flows, and API sync pipelines.',
    },
    {
      number: '04',
      title: 'Validation & Testing',
      description: 'End-to-end sandbox testing with real business scenarios.',
    },
    {
      number: '05',
      title: 'Deployment & Training',
      description: 'Change set deployment and comprehensive team training.',
    },
  ],
  ctaHeadline: 'Ready to Transform Your Salesforce?',
  ctaSubtitle: 'Schedule a discovery call with our certified Salesforce specialists.',
};

