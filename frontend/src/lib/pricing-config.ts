import { ServiceTemplate } from '@/types/pricing';

export const pricingTiers = [
  { name: 'Startup', multiplier: 1, description: 'Perfect for MVPs and early stage' },
  { name: 'Growth', multiplier: 1.5, description: 'Scaling businesses with traction' },
  { name: 'Enterprise', multiplier: 2.5, description: 'Large-scale, mission-critical systems' },
];

export const serviceTemplates: ServiceTemplate[] = [
  // Technical Services
  {
    id: 'web-app',
    name: 'Web Application Development',
    category: 'technical',
    description: 'Full-stack web application with modern tech stack',
    basePrice: 15000,
    unit: 'project',
    icon: 'Code',
    estimatedDuration: '8-12 weeks',
    options: [
      {
        id: 'complexity',
        label: 'Project Complexity',
        type: 'select',
        required: true,
        options: [
          { value: 'simple', label: 'Simple (5-10 pages)', priceModifier: 1 },
          { value: 'moderate', label: 'Moderate (10-20 pages)', priceModifier: 1.5 },
          { value: 'complex', label: 'Complex (20+ pages)', priceModifier: 2.2 },
          { value: 'enterprise', label: 'Enterprise (Multi-tenant)', priceModifier: 3 },
        ],
      },
      {
        id: 'features',
        label: 'Core Features',
        type: 'multiselect',
        options: [
          { value: 'auth', label: 'User Authentication', priceModifier: 2000 },
          { value: 'payments', label: 'Payment Integration', priceModifier: 3500 },
          { value: 'admin', label: 'Admin Dashboard', priceModifier: 4000 },
          { value: 'api', label: 'REST API', priceModifier: 3000 },
          { value: 'realtime', label: 'Real-time Features', priceModifier: 5000 },
          { value: 'search', label: 'Advanced Search', priceModifier: 2500 },
        ],
      },
      {
        id: 'users',
        label: 'Expected Users (monthly)',
        type: 'select',
        options: [
          { value: '1k', label: '< 1,000', priceModifier: 1 },
          { value: '10k', label: '1,000 - 10,000', priceModifier: 1.2 },
          { value: '100k', label: '10,000 - 100,000', priceModifier: 1.5 },
          { value: '1m', label: '100,000+', priceModifier: 2 },
        ],
      },
    ],
  },
  {
    id: 'mobile-app',
    name: 'Mobile App Development',
    category: 'technical',
    description: 'Native or cross-platform mobile application',
    basePrice: 25000,
    unit: 'project',
    icon: 'Smartphone',
    estimatedDuration: '12-16 weeks',
    options: [
      {
        id: 'platform',
        label: 'Platform',
        type: 'select',
        required: true,
        options: [
          { value: 'ios', label: 'iOS Only', priceModifier: 1 },
          { value: 'android', label: 'Android Only', priceModifier: 1 },
          { value: 'both', label: 'iOS + Android', priceModifier: 1.8 },
        ],
      },
      {
        id: 'approach',
        label: 'Development Approach',
        type: 'select',
        options: [
          { value: 'native', label: 'Native (Swift/Kotlin)', priceModifier: 1.3 },
          { value: 'cross', label: 'Cross-platform (React Native)', priceModifier: 1 },
        ],
      },
      {
        id: 'features',
        label: 'Features',
        type: 'multiselect',
        options: [
          { value: 'push', label: 'Push Notifications', priceModifier: 2000 },
          { value: 'offline', label: 'Offline Mode', priceModifier: 3500 },
          { value: 'camera', label: 'Camera Integration', priceModifier: 2500 },
          { value: 'location', label: 'GPS/Location', priceModifier: 2000 },
          { value: 'social', label: 'Social Login', priceModifier: 1500 },
        ],
      },
    ],
  },
  {
    id: 'api-backend',
    name: 'Backend API Development',
    category: 'technical',
    description: 'Scalable REST/GraphQL API with database',
    basePrice: 8000,
    unit: 'project',
    icon: 'Server',
    estimatedDuration: '4-6 weeks',
    options: [
      {
        id: 'type',
        label: 'API Type',
        type: 'select',
        options: [
          { value: 'rest', label: 'REST API', priceModifier: 1 },
          { value: 'graphql', label: 'GraphQL API', priceModifier: 1.3 },
          { value: 'both', label: 'REST + GraphQL', priceModifier: 1.6 },
        ],
      },
      {
        id: 'endpoints',
        label: 'Number of Endpoints',
        type: 'number',
        min: 5,
        max: 100,
        step: 5,
        priceModifier: 200,
      },
      {
        id: 'database',
        label: 'Database',
        type: 'select',
        options: [
          { value: 'postgres', label: 'PostgreSQL', priceModifier: 1 },
          { value: 'mongo', label: 'MongoDB', priceModifier: 1 },
          { value: 'mysql', label: 'MySQL', priceModifier: 1 },
          { value: 'multi', label: 'Multiple Databases', priceModifier: 1.5 },
        ],
      },
    ],
  },

  // AI Services
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Integration',
    category: 'ai',
    description: 'Custom AI chatbot with RAG capabilities',
    basePrice: 12000,
    unit: 'project',
    icon: 'Bot',
    estimatedDuration: '6-8 weeks',
    options: [
      {
        id: 'model',
        label: 'AI Model',
        type: 'select',
        options: [
          { value: 'gpt-3.5', label: 'GPT-3.5 Turbo', priceModifier: 1 },
          { value: 'gpt-4', label: 'GPT-4', priceModifier: 1.4 },
          { value: 'claude', label: 'Claude 3', priceModifier: 1.3 },
          { value: 'custom', label: 'Custom Fine-tuned Model', priceModifier: 2.5 },
        ],
      },
      {
        id: 'features',
        label: 'Features',
        type: 'multiselect',
        options: [
          { value: 'rag', label: 'RAG (Knowledge Base)', priceModifier: 3000 },
          { value: 'voice', label: 'Voice Input/Output', priceModifier: 4000 },
          { value: 'multilang', label: 'Multi-language Support', priceModifier: 2500 },
          { value: 'analytics', label: 'Conversation Analytics', priceModifier: 2000 },
        ],
      },
      {
        id: 'channels',
        label: 'Deployment Channels',
        type: 'multiselect',
        options: [
          { value: 'web', label: 'Web Widget', priceModifier: 1000 },
          { value: 'whatsapp', label: 'WhatsApp', priceModifier: 2000 },
          { value: 'slack', label: 'Slack', priceModifier: 1500 },
          { value: 'discord', label: 'Discord', priceModifier: 1500 },
        ],
      },
    ],
  },
  {
    id: 'ml-model',
    name: 'Machine Learning Model',
    category: 'ai',
    description: 'Custom ML model training and deployment',
    basePrice: 20000,
    unit: 'project',
    icon: 'Brain',
    estimatedDuration: '10-14 weeks',
    options: [
      {
        id: 'type',
        label: 'Model Type',
        type: 'select',
        options: [
          { value: 'classification', label: 'Classification', priceModifier: 1 },
          { value: 'regression', label: 'Regression', priceModifier: 1 },
          { value: 'nlp', label: 'NLP/Text Analysis', priceModifier: 1.3 },
          { value: 'cv', label: 'Computer Vision', priceModifier: 1.5 },
          { value: 'recommender', label: 'Recommendation System', priceModifier: 1.4 },
        ],
      },
      {
        id: 'data',
        label: 'Data Preparation',
        type: 'checkbox',
        priceModifier: 5000,
      },
      {
        id: 'deployment',
        label: 'Deployment',
        type: 'select',
        options: [
          { value: 'cloud', label: 'Cloud API', priceModifier: 3000 },
          { value: 'edge', label: 'Edge Deployment', priceModifier: 5000 },
          { value: 'both', label: 'Hybrid', priceModifier: 7000 },
        ],
      },
    ],
  },

  // Marketing Services
  {
    id: 'seo',
    name: 'SEO Optimization',
    category: 'marketing',
    description: 'Complete SEO audit and implementation',
    basePrice: 3500,
    unit: 'month',
    icon: 'TrendingUp',
    estimatedDuration: '3-6 months',
    options: [
      {
        id: 'pages',
        label: 'Pages to Optimize',
        type: 'number',
        min: 5,
        max: 100,
        step: 5,
        priceModifier: 50,
      },
      {
        id: 'services',
        label: 'Services',
        type: 'multiselect',
        options: [
          { value: 'audit', label: 'Technical Audit', priceModifier: 500 },
          { value: 'keywords', label: 'Keyword Research', priceModifier: 400 },
          { value: 'content', label: 'Content Optimization', priceModifier: 800 },
          { value: 'backlinks', label: 'Link Building', priceModifier: 1000 },
        ],
      },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    category: 'marketing',
    description: 'Custom analytics and reporting dashboard',
    basePrice: 6000,
    unit: 'project',
    icon: 'BarChart3',
    estimatedDuration: '4-6 weeks',
    options: [
      {
        id: 'sources',
        label: 'Data Sources',
        type: 'multiselect',
        options: [
          { value: 'ga', label: 'Google Analytics', priceModifier: 500 },
          { value: 'fb', label: 'Facebook Ads', priceModifier: 500 },
          { value: 'google-ads', label: 'Google Ads', priceModifier: 500 },
          { value: 'custom', label: 'Custom Database', priceModifier: 2000 },
        ],
      },
      {
        id: 'reports',
        label: 'Custom Reports',
        type: 'number',
        min: 3,
        max: 20,
        step: 1,
        priceModifier: 300,
      },
    ],
  },

  // Consulting Services
  {
    id: 'consulting',
    name: 'Technical Consulting',
    category: 'consulting',
    description: 'Expert technical guidance and architecture review',
    basePrice: 200,
    unit: 'hour',
    icon: 'Lightbulb',
    estimatedDuration: 'Flexible',
    options: [
      {
        id: 'hours',
        label: 'Hours per Month',
        type: 'number',
        min: 4,
        max: 160,
        step: 4,
        priceModifier: 1,
      },
      {
        id: 'focus',
        label: 'Focus Area',
        type: 'select',
        options: [
          { value: 'architecture', label: 'System Architecture', priceModifier: 1 },
          { value: 'performance', label: 'Performance Optimization', priceModifier: 1.2 },
          { value: 'security', label: 'Security Audit', priceModifier: 1.3 },
          { value: 'devops', label: 'DevOps/Infrastructure', priceModifier: 1.1 },
        ],
      },
    ],
  },
  {
    id: 'maintenance',
    name: 'Ongoing Maintenance',
    category: 'consulting',
    description: 'Monthly support and maintenance package',
    basePrice: 2000,
    unit: 'month',
    icon: 'Wrench',
    estimatedDuration: 'Ongoing',
    options: [
      {
        id: 'level',
        label: 'Support Level',
        type: 'select',
        options: [
          { value: 'basic', label: 'Basic (Business hours)', priceModifier: 1 },
          { value: 'standard', label: 'Standard (Extended hours)', priceModifier: 1.5 },
          { value: 'premium', label: 'Premium (24/7)', priceModifier: 2.5 },
        ],
      },
      {
        id: 'services',
        label: 'Included Services',
        type: 'multiselect',
        options: [
          { value: 'updates', label: 'Security Updates', priceModifier: 0 },
          { value: 'monitoring', label: 'Performance Monitoring', priceModifier: 500 },
          { value: 'backups', label: 'Automated Backups', priceModifier: 300 },
          { value: 'fixes', label: 'Bug Fixes', priceModifier: 800 },
        ],
      },
    ],
  },

  // ─── AI Services (additional) ────────────────────────────────────────────
  {
    id: 'ai-agents',
    name: 'AI Agent Development',
    category: 'ai',
    description: 'Custom autonomous AI agents powered by GPT-4, Claude, or Gemini',
    basePrice: 10000,
    unit: 'project',
    icon: 'Bot',
    estimatedDuration: '6-10 weeks',
    options: [
      {
        id: 'tier',
        label: 'Agent Tier',
        type: 'select',
        required: true,
        options: [
          { value: 'basic', label: 'Basic Agent (Single-task)', priceModifier: 1 },
          { value: 'smart', label: 'Smart Agent (Multi-task)', priceModifier: 2 },
          { value: 'ecosystem', label: 'Agent Ecosystem (Multi-agent)', priceModifier: 5 },
        ],
      },
      {
        id: 'model',
        label: 'AI Model',
        type: 'select',
        options: [
          { value: 'gpt4', label: 'GPT-4o', priceModifier: 1 },
          { value: 'claude', label: 'Claude 3.5 Sonnet', priceModifier: 1 },
          { value: 'gemini', label: 'Gemini 1.5 Pro', priceModifier: 1 },
          { value: 'custom', label: 'Custom Fine-tuned Model', priceModifier: 1.5 },
        ],
      },
      {
        id: 'capabilities',
        label: 'Capabilities',
        type: 'multiselect',
        options: [
          { value: 'rag', label: 'RAG / Knowledge Base', priceModifier: 3000 },
          { value: 'function-calling', label: 'Tool & Function Calling', priceModifier: 2500 },
          { value: 'multi-modal', label: 'Multi-modal (Vision/Audio)', priceModifier: 4000 },
          { value: 'memory', label: 'Long-term Memory', priceModifier: 3500 },
          { value: 'web-browsing', label: 'Web Browsing & Research', priceModifier: 3000 },
        ],
      },
    ],
  },
  {
    id: 'ai-workflows',
    name: 'AI Workflow Automation',
    category: 'ai',
    description: 'Custom LLM-powered automation pipelines and intelligent data processing',
    basePrice: 8000,
    unit: 'project',
    icon: 'Workflow',
    estimatedDuration: '4-8 weeks',
    options: [
      {
        id: 'complexity',
        label: 'Pipeline Complexity',
        type: 'select',
        required: true,
        options: [
          { value: 'simple', label: 'Simple Workflow (1-3 steps)', priceModifier: 1 },
          { value: 'smart', label: 'Smart Pipeline (4-8 steps)', priceModifier: 2 },
          { value: 'enterprise', label: 'Enterprise Automation (8+ steps)', priceModifier: 5 },
        ],
      },
      {
        id: 'integrations',
        label: 'System Integrations',
        type: 'multiselect',
        options: [
          { value: 'crm', label: 'CRM (Salesforce / HubSpot)', priceModifier: 2000 },
          { value: 'erp', label: 'ERP Systems', priceModifier: 3000 },
          { value: 'email', label: 'Email / Calendar', priceModifier: 1000 },
          { value: 'storage', label: 'Cloud Storage / Documents', priceModifier: 1500 },
          { value: 'communication', label: 'Slack / Teams / WhatsApp', priceModifier: 1500 },
        ],
      },
      {
        id: 'extras',
        label: 'Additional Features',
        type: 'multiselect',
        options: [
          { value: 'monitoring', label: 'Monitoring Dashboard', priceModifier: 2000 },
          { value: 'error-handling', label: 'Error Handling & Retry Logic', priceModifier: 1500 },
          { value: 'mcp', label: 'MCP Protocol Support', priceModifier: 3000 },
        ],
      },
    ],
  },

  // ─── Ecommerce Services ───────────────────────────────────────────────────
  {
    id: 'ecommerce-store',
    name: 'Custom Ecommerce Development',
    category: 'ecommerce',
    description: 'Full-stack ecommerce platform with multi-channel selling capabilities',
    basePrice: 5000,
    unit: 'project',
    icon: 'ShoppingCart',
    estimatedDuration: '6-10 weeks',
    options: [
      {
        id: 'tier',
        label: 'Store Tier',
        type: 'select',
        required: true,
        options: [
          { value: 'starter', label: 'Starter Store', priceModifier: 1 },
          { value: 'growth', label: 'Growth Store', priceModifier: 2.5 },
          { value: 'enterprise', label: 'Enterprise Platform', priceModifier: 7 },
        ],
      },
      {
        id: 'features',
        label: 'Features',
        type: 'multiselect',
        options: [
          { value: 'payments', label: 'Multi-gateway Payments (Stripe / Razorpay / PayPal)', priceModifier: 2000 },
          { value: 'marketplace', label: 'Marketplace Integration (Amazon / Flipkart)', priceModifier: 3000 },
          { value: 'inventory', label: 'Inventory Management', priceModifier: 2500 },
          { value: 'loyalty', label: 'Loyalty & Rewards Program', priceModifier: 2000 },
          { value: 'analytics', label: 'Sales Analytics Dashboard', priceModifier: 1500 },
        ],
      },
    ],
  },
  {
    id: 'shopify-store',
    name: 'Shopify Store Development',
    category: 'ecommerce',
    description: 'Custom Shopify store with premium theme design and app integrations',
    basePrice: 3000,
    unit: 'project',
    icon: 'Store',
    estimatedDuration: '3-6 weeks',
    options: [
      {
        id: 'tier',
        label: 'Shopify Plan',
        type: 'select',
        required: true,
        options: [
          { value: 'starter', label: 'Starter Store', priceModifier: 1 },
          { value: 'growth', label: 'Growth Store', priceModifier: 2.2 },
          { value: 'plus', label: 'Shopify Plus', priceModifier: 5.5 },
        ],
      },
      {
        id: 'apps',
        label: 'App Integrations',
        type: 'multiselect',
        options: [
          { value: 'klaviyo', label: 'Klaviyo (Email Marketing)', priceModifier: 800 },
          { value: 'yotpo', label: 'Yotpo (Reviews & Loyalty)', priceModifier: 600 },
          { value: 'recharge', label: 'ReCharge (Subscriptions)', priceModifier: 1000 },
          { value: 'gorgias', label: 'Gorgias (Customer Support)', priceModifier: 700 },
          { value: 'shipping', label: 'Shipping Automation', priceModifier: 800 },
        ],
      },
      {
        id: 'markets',
        label: 'Shopify Markets (International Selling)',
        type: 'checkbox',
        priceModifier: 2000,
      },
    ],
  },

  // ─── DevOps Services ──────────────────────────────────────────────────────
  {
    id: 'devops-cloud',
    name: 'DevOps & Cloud Infrastructure',
    category: 'devops',
    description: 'Scalable cloud setup, CI/CD pipelines, and infrastructure automation',
    basePrice: 5000,
    unit: 'project',
    icon: 'Cloud',
    estimatedDuration: '4-8 weeks',
    options: [
      {
        id: 'provider',
        label: 'Cloud Provider',
        type: 'select',
        required: true,
        options: [
          { value: 'aws', label: 'Amazon Web Services (AWS)', priceModifier: 1 },
          { value: 'gcp', label: 'Google Cloud Platform (GCP)', priceModifier: 1 },
          { value: 'azure', label: 'Microsoft Azure', priceModifier: 1 },
          { value: 'multi', label: 'Multi-cloud Setup', priceModifier: 1.8 },
        ],
      },
      {
        id: 'services',
        label: 'Services',
        type: 'multiselect',
        options: [
          { value: 'cicd', label: 'CI/CD Pipeline (GitHub Actions / GitLab)', priceModifier: 3000 },
          { value: 'kubernetes', label: 'Kubernetes Orchestration', priceModifier: 8000 },
          { value: 'iac', label: 'Infrastructure as Code (Terraform)', priceModifier: 4000 },
          { value: 'monitoring', label: 'Monitoring & Logging (Prometheus / Grafana)', priceModifier: 3000 },
          { value: 'security', label: 'Security Hardening & WAF', priceModifier: 4000 },
        ],
      },
      {
        id: 'scale',
        label: 'Infrastructure Scale',
        type: 'select',
        options: [
          { value: 'startup', label: 'Startup (1-5 services)', priceModifier: 1 },
          { value: 'growth', label: 'Growth (5-20 services)', priceModifier: 2.5 },
          { value: 'enterprise', label: 'Enterprise (20+ services)', priceModifier: 6 },
        ],
      },
    ],
  },

  // ─── Design Services ──────────────────────────────────────────────────────
  {
    id: 'graphic-design',
    name: 'Graphic Design & Branding',
    category: 'design',
    description: 'Visual design, motion graphics, video editing, and brand identity',
    basePrice: 500,
    unit: 'project',
    icon: 'Palette',
    estimatedDuration: '1-4 weeks',
    options: [
      {
        id: 'type',
        label: 'Design Type',
        type: 'select',
        required: true,
        options: [
          { value: 'static', label: 'Static Design (Posters / Banners)', priceModifier: 1 },
          { value: 'motion', label: 'Motion Graphics & Video Editing', priceModifier: 4 },
          { value: 'brand', label: 'Brand Identity Package', priceModifier: 10 },
        ],
      },
      {
        id: 'deliverables',
        label: 'Deliverables',
        type: 'multiselect',
        options: [
          { value: 'logo', label: 'Logo Design (3 concepts)', priceModifier: 500 },
          { value: 'guidelines', label: 'Brand Guidelines Document', priceModifier: 800 },
          { value: 'social', label: 'Social Media Templates (20 designs)', priceModifier: 600 },
          { value: 'video', label: 'Promo / Launch Video', priceModifier: 1500 },
          { value: 'animation', label: '2D Animation (30s After Effects)', priceModifier: 2000 },
        ],
      },
    ],
  },

  // ─── CRM Services ─────────────────────────────────────────────────────────
  {
    id: 'salesforce',
    name: 'Salesforce Solutions',
    category: 'crm',
    description: 'Custom Salesforce CRM implementation, optimization, and integrations',
    basePrice: 8000,
    unit: 'project',
    icon: 'Database',
    estimatedDuration: '6-12 weeks',
    options: [
      {
        id: 'scope',
        label: 'Engagement Scope',
        type: 'select',
        required: true,
        options: [
          { value: 'setup', label: 'CRM Setup & Configuration', priceModifier: 1 },
          { value: 'optimization', label: 'Business Process Optimization', priceModifier: 2.5 },
          { value: 'enterprise', label: 'Enterprise Implementation', priceModifier: 8 },
        ],
      },
      {
        id: 'features',
        label: 'Features',
        type: 'multiselect',
        options: [
          { value: 'automation', label: 'Process Automation (Flows & Triggers)', priceModifier: 2500 },
          { value: 'integration', label: 'Third-party Integrations', priceModifier: 3000 },
          { value: 'migration', label: 'Data Migration', priceModifier: 3500 },
          { value: 'analytics', label: 'Einstein Analytics & Dashboards', priceModifier: 4000 },
          { value: 'training', label: 'Team Training & Documentation', priceModifier: 2000 },
        ],
      },
    ],
  },

  // ─── B2B Services ─────────────────────────────────────────────────────────
  {
    id: 'b2b-promotion',
    name: 'B2B Lead Generation & Promotion',
    category: 'b2b',
    description: 'End-to-end B2B growth strategy, outbound lead gen, and pipeline management',
    basePrice: 3000,
    unit: 'month',
    icon: 'Target',
    estimatedDuration: '3-6 months',
    options: [
      {
        id: 'tier',
        label: 'Package Tier',
        type: 'select',
        required: true,
        options: [
          { value: 'starter', label: 'Starter', priceModifier: 1 },
          { value: 'growth', label: 'Growth', priceModifier: 2 },
          { value: 'enterprise', label: 'Enterprise', priceModifier: 4 },
        ],
      },
      {
        id: 'services',
        label: 'Services Included',
        type: 'multiselect',
        options: [
          { value: 'icp', label: 'Market Research & ICP Definition', priceModifier: 500 },
          { value: 'outbound', label: 'Outbound Email & LinkedIn Campaigns', priceModifier: 800 },
          { value: 'content', label: 'Content Marketing & Thought Leadership', priceModifier: 1000 },
          { value: 'pipeline', label: 'Pipeline Analytics & CRM Setup', priceModifier: 700 },
        ],
      },
    ],
  },

  // ─── Performance Marketing ────────────────────────────────────────────────
  {
    id: 'performance-marketing',
    name: 'Performance Marketing',
    category: 'marketing',
    description: 'Data-driven paid advertising, conversion optimization, and full-funnel campaigns',
    basePrice: 2500,
    unit: 'month',
    icon: 'TrendingUp',
    estimatedDuration: '3+ months',
    options: [
      {
        id: 'channels',
        label: 'Ad Channels',
        type: 'multiselect',
        options: [
          { value: 'google-ads', label: 'Google Ads (Search / Display)', priceModifier: 500 },
          { value: 'meta', label: 'Meta Ads (Facebook / Instagram)', priceModifier: 500 },
          { value: 'linkedin', label: 'LinkedIn Ads', priceModifier: 700 },
          { value: 'youtube', label: 'YouTube Ads', priceModifier: 600 },
        ],
      },
      {
        id: 'budget',
        label: 'Monthly Ad Spend Budget',
        type: 'select',
        options: [
          { value: 'small', label: '< $5,000 / month', priceModifier: 1 },
          { value: 'medium', label: '$5,000 – $20,000 / month', priceModifier: 1.3 },
          { value: 'large', label: '$20,000 – $50,000 / month', priceModifier: 1.6 },
          { value: 'enterprise', label: '$50,000+ / month', priceModifier: 2 },
        ],
      },
      {
        id: 'extras',
        label: 'Additional Services',
        type: 'multiselect',
        options: [
          { value: 'landing-pages', label: 'Landing Page Design & Development', priceModifier: 1000 },
          { value: 'ab-testing', label: 'A/B Testing Setup', priceModifier: 500 },
          { value: 'email', label: 'Email Automation & Sequences', priceModifier: 800 },
        ],
      },
    ],
  },
];

export function calculateLineItemPrice(
  service: ServiceTemplate,
  configuration: any,
  quantity: number
): number {
  let price = service.basePrice;

  // Apply configuration modifiers
  service.options.forEach((option) => {
    const configValue = configuration[option.id];
    
    if (option.type === 'select' && configValue) {
      const selectedOption = option.options?.find((opt) => opt.value === configValue);
      if (selectedOption?.priceModifier !== undefined) {
        price *= selectedOption.priceModifier;
      }
    } else if (option.type === 'multiselect' && Array.isArray(configValue)) {
      configValue.forEach((value: string) => {
        const selectedOption = option.options?.find((opt) => opt.value === value);
        if (selectedOption?.priceModifier !== undefined) {
          price += selectedOption.priceModifier;
        }
      });
    } else if (option.type === 'number' && typeof configValue === 'number') {
      if (option.priceModifier !== undefined) {
        price += configValue * option.priceModifier;
      }
    } else if (option.type === 'checkbox' && configValue === true) {
      if (option.priceModifier !== undefined) {
        price += option.priceModifier;
      }
    }
  });

  return price * quantity;
}
