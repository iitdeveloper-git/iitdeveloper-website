import type { ServiceContent } from '../schema';

export const ecommerceContent: ServiceContent = {
  slug: 'ecommerce',
  title: 'Custom Ecommerce Solutions — IITDeveloper',
  shortTitle: 'Ecommerce Solutions',
  metaTitle: 'Ecommerce Solutions | Development, Payments & Marketplace Integration | IITDeveloper',
  description: 'Full-stack ecommerce development with payment gateways, marketplace integrations, brand architecture, and retention strategies. Built to sell, engineered to scale.',
  metaDescription: 'Full-stack ecommerce development with payment gateways, marketplace integrations, brand architecture, and retention strategies. Built to sell, engineered to scale.',
  category: 'Commerce',
  badge: 'Ecommerce Engineering',
  heroHeadline: 'Built to Sell,',
  heroHighlight: 'Engineered to Scale.',
  heroSubtitle: 'Complete ecommerce ecosystems — from custom storefronts and payment gateway integrations to marketplace syndication and retention automation.',
  features: [
    {
      iconName: 'ShoppingCart',
      title: 'Ecommerce Development',
      description: 'Custom storefronts built on Shopify, WooCommerce, or fully bespoke platforms. Fast, beautiful, and conversion-focused.',
    },
    {
      iconName: 'CreditCard',
      title: 'Payment Gateways',
      description: 'Stripe, Razorpay, PayPal, and more. Secure, seamless checkout flows that reduce cart abandonment.',
    },
    {
      iconName: 'Store',
      title: 'Marketplace Setup & Integrations',
      description: 'List and sell across Amazon, Flipkart, Etsy, and other marketplaces. Centralized inventory and order management.',
    },
    {
      iconName: 'Globe',
      title: 'Brand Architecture',
      description: 'Multi-brand or sub-brand structures designed for scale. Consistent identity across every storefront and channel.',
    },
    {
      iconName: 'Package',
      title: 'Inventory & Order Sync',
      description: 'Real-time synchronization across warehouses, marketplaces, and online storefronts. Zero overselling.',
    },
    {
      iconName: 'TrendingUp',
      title: 'Retention & Loyalty Engines',
      description: 'Automated post-purchase sequences, loyalty points, and win-back email automation.',
    },
  ],
  technologies: [
    'Shopify Plus', 'WooCommerce', 'Next.js Commerce', 'Stripe',
    'Razorpay', 'Shiprocket', 'Klaviyo', 'PostgreSQL',
    'Tailwind CSS', 'GraphQL', 'Algolia', 'Redis',
  ],
  processSteps: [
    {
      number: '01',
      title: 'Commerce Architecture',
      description: 'Evaluate catalog size, multi-currency needs, and checkout flow requirements.',
    },
    {
      number: '02',
      title: 'Storefront Engineering',
      description: 'Build responsive, fast-loading storefront with optimized mobile UX.',
    },
    {
      number: '03',
      title: 'Payment & Logistics Integration',
      description: 'Configure regional payment gateways, tax calculation, and automated shipping.',
    },
    {
      number: '04',
      title: 'End-to-End Testing',
      description: 'Simulate high concurrency, payment edge cases, and inventory webhooks.',
    },
    {
      number: '05',
      title: 'Launch & Growth',
      description: 'Go live with full analytics and retention automation active from day one.',
    },
  ],
  ctaHeadline: 'Ready to Scale Your Online Revenue?',
  ctaSubtitle: 'Get a full commerce architectural assessment and delivery timeline in 48 hours.',
};

