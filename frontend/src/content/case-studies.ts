import type { CaseStudyProject, StatItem } from './schema';

export const caseStudyStats: StatItem[] = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '100%', label: 'On-Time Delivery' },
];

export const featuredCaseStudies: CaseStudyProject[] = [
  {
    title: 'BiteBreak — Smart Cafeteria System',
    client: 'Corporate Cafeterias',
    category: 'Mobile & Kitchen System',
    description: 'A multi-role cafeteria ordering and kitchen management platform with real-time ticket queues, nutritional tracking, and store analytics. Interactive live prototype available.',
    url: '/case-studies/bitebreak',
    displayUrl: 'Launch Live Prototype →',
    isInternal: true,
    metrics: [
      { label: 'Role Workspaces', value: '3 Roles', change: 'Synced' },
      { label: 'Queue Sync', value: '<100ms', change: 'Real-time' },
      { label: 'Throughput', value: '3x Faster', change: '+200%' },
    ],
    tech: ['Next.js', 'Python', 'Docker', 'SQLite', 'Tailwind CSS', 'Framer Motion'],
    timeline: '4 weeks',
    year: '2026',
  },
  {
    title: 'PulsarIP — Intellectual Property Platform',
    client: 'PulsarIP Legal',
    category: 'Legaltech Platform',
    description: 'An intellectual property and corporate legal services portal with digital trademark & patent filing workflows, legal consultancy booking, and automated compliance tracking.',
    url: 'https://pulsarip.com',
    displayUrl: 'pulsarip.com',
    isInternal: false,
    metrics: [
      { label: 'Practice Areas', value: '12+', change: 'Full Scope' },
      { label: 'Consultation SLA', value: '24hr', change: 'Guaranteed' },
      { label: 'Client Trust', value: 'Enterprise', change: 'Verified' },
    ],
    tech: ['Next.js', 'Tailwind CSS', 'Cloud Infrastructure', 'Analytics'],
    timeline: '6 weeks',
    year: '2025',
  },
  {
    title: 'Sendrin — Enterprise Notification & Messaging Engine',
    client: 'Internal Product & Enterprise Clients',
    category: 'Cloud Communications Platform',
    description: 'A high-throughput multi-tenant communication platform routing transactional email, SMS, and WhatsApp messages with real-time delivery telemetry and Keycloak SSO.',
    url: 'https://sendrin.com',
    displayUrl: 'sendrin.com',
    isInternal: false,
    metrics: [
      { label: 'Throughput', value: '10k+ msgs/min', change: 'High Volume' },
      { label: 'Delivery Rate', value: '99.9%', change: 'Zero Drop' },
      { label: 'Latency', value: '<250ms', change: 'Real-time' },
    ],
    tech: ['Next.js', 'FastAPI', 'Keycloak', 'Redis', 'Docker', 'Caddy'],
    timeline: 'Production',
    year: '2026',
  },
];

