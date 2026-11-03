import type { ServiceContent } from '../schema';

export const devopsCloudContent: ServiceContent = {
  slug: 'devops-cloud',
  title: 'DevOps & Cloud Infrastructure — IITDeveloper',
  shortTitle: 'DevOps & Cloud',
  metaTitle: 'DevOps & Cloud Services | AWS, Docker, Kubernetes | IITDeveloper',
  description: 'Professional DevOps and cloud infrastructure services. CI/CD pipelines, containerization, Kubernetes orchestration, and cloud architecture on AWS, GCP, and Azure.',
  metaDescription: 'Professional DevOps and cloud infrastructure services. CI/CD pipelines, containerization, Kubernetes orchestration, and cloud architecture on AWS, GCP, and Azure.',
  category: 'Cloud',
  badge: 'DevOps & Cloud',
  heroHeadline: '"It Works on My Machine"',
  heroHighlight: "Doesn't Fly in Production.",
  heroSubtitle: 'Infrastructure that scales automatically. CI/CD pipelines that let you ship with confidence. 99.9% uptime guaranteed.',
  features: [
    {
      iconName: 'Cloud',
      title: 'Cloud Architecture',
      description: 'AWS, GCP, or Azure. Scalable infrastructure designed for growth.',
    },
    {
      iconName: 'Container',
      title: 'Containerization',
      description: 'Docker and Kubernetes. Consistent environments from dev to production.',
    },
    {
      iconName: 'GitBranch',
      title: 'CI/CD Pipelines',
      description: 'Automated testing and deployment. Ship code confidently.',
    },
    {
      iconName: 'Server',
      title: 'Infrastructure as Code',
      description: 'Terraform, CloudFormation, or Pulumi. Version-controlled infrastructure.',
    },
    {
      iconName: 'Activity',
      title: 'Monitoring & Logging',
      description: "Prometheus, Grafana, ELK stack. Know what's happening before users complain.",
    },
    {
      iconName: 'Shield',
      title: 'Security & Compliance',
      description: 'SOC 2, HIPAA, GDPR ready. Security baked in, not bolted on.',
    },
  ],
  technologies: [
    'AWS', 'Google Cloud', 'Azure', 'Docker',
    'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins',
    'Prometheus', 'Grafana', 'ELK Stack', 'Nginx',
  ],
  processSteps: [
    {
      number: '01',
      title: 'Infrastructure Audit',
      description: 'We assess your current setup, identify bottlenecks, and spot security issues.',
    },
    {
      number: '02',
      title: 'Architecture Design',
      description: 'Scalable, cost-effective infrastructure blueprint. No over-engineering.',
    },
    {
      number: '03',
      title: 'Migration Strategy',
      description: 'Zero-downtime migration plan. We move fast without breaking things.',
    },
    {
      number: '04',
      title: 'Implementation',
      description: 'Infrastructure as code, CI/CD setup, and monitoring configuration.',
    },
    {
      number: '05',
      title: 'Testing & Validation',
      description: 'Load testing, security audits, and disaster recovery drills.',
    },
    {
      number: '06',
      title: 'Ongoing Support',
      description: '24/7 monitoring, performance optimization, and incident response.',
    },
  ],
  ctaHeadline: 'Ready to Scale Your Infrastructure?',
  ctaSubtitle: 'Free infrastructure audit. Get a detailed migration plan in 48 hours.',
};

