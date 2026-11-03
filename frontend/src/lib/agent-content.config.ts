import { defineAgentContent, type StructuredPage } from '@iitdeveloper/agent-content';
import {
  siteContent,
  companyStats,
  companyValues,
  companyMission,
  featuredCaseStudies,
  caseStudyStats,
  legalContent,
  allServices,
  serviceToStructuredPage,
} from '../content/index';

// 1. Home Page Structured View
const homePage: StructuredPage = {
  url: '/',
  title: `${siteContent.name} — Premium Web Development, AI Solutions & DevOps`,
  description: siteContent.description,
  category: 'Overview',
  status: 'published',
  content: `# ${siteContent.name} — Digital Engineering Studio & Cloud Infrastructure Lab

${siteContent.description}

## Core Services
${allServices.map((s) => `- **${s.shortTitle}** (/services/${s.slug}): ${s.description}`).join('\n')}

## Featured Products & Ecosystem
- **Sendrin** (https://sendrin.com): Enterprise multi-tenant communication and notification engine.
- **IITD IAM** (https://iam.iitdeveloper.com): Central identity provider with RFC 7636 PKCE.
- **Growixa** (https://growixa.com): Growth engineering, lead intake, and marketing automation.

## Quick Contact
- Website: ${siteContent.url}
- Inquiries: ${siteContent.email}
- Intake: ${siteContent.url}/contact
`,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteContent.name,
    url: siteContent.url,
    logo: `${siteContent.url}/logo.png`,
    description: siteContent.description,
  },
};

// 2. About Page (Generated directly from companyStats and companyValues)
const aboutPage: StructuredPage = {
  url: '/about',
  title: `About Us — ${siteContent.name} Engineering Studio`,
  description: `Learn about ${siteContent.name}, founded in 2019, MSME certified, our mission, core values, and engineering philosophy.`,
  category: 'Company',
  status: 'published',
  content: `# About ${siteContent.name}

${companyMission.description}

## Studio Milestones & Stats
${companyStats.map((st) => `- **${st.label}**: ${st.value}`).join('\n')}

## Core Engineering Values
${companyValues.map((v) => `### ${v.title}\n${v.description}`).join('\n\n')}

## Contact & Hubs
- Email: ${siteContent.email}
- Address: ${siteContent.address.city}, ${siteContent.address.region}, ${siteContent.address.country}
`,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${siteContent.name}`,
    url: `${siteContent.url}/about`,
  },
};

// 3. Contact Page
const contactPage: StructuredPage = {
  url: '/contact',
  title: `Contact & Project Intake — ${siteContent.name}`,
  description: `Get in touch with the ${siteContent.name} engineering team for project consultations, architectural reviews, and enterprise engagements.`,
  category: 'Company',
  status: 'published',
  content: `# Contact & Project Intake

Schedule a technical consultation or submit a project brief to the ${siteContent.name} team.

## Official Communication Channels
- **General Inquiries**: ${siteContent.email}
- **Billing & Operations**: ${siteContent.billingEmail}
- **Intake Form**: ${siteContent.url}/contact

## Engagement Workflow
1. **Discovery & Architecture Review**: 15–30 minute scope assessment.
2. **Technical Proposal & Estimation**: Detailed milestone roadmap and transparent budget.
3. **Sprint Execution**: Agile sprints with automated previews and continuous integration.
4. **Production Deployment & SLA**: Safe release, SSL setup, and ongoing maintenance.
`,
};

// 4. Case Studies (Generated directly from featuredCaseStudies & caseStudyStats)
const caseStudiesPage: StructuredPage = {
  url: '/case-studies',
  title: `Case Studies & Engineering Portfolio — ${siteContent.name}`,
  description: `Explore verified production case studies delivered by ${siteContent.name} across legaltech, mobile ordering, enterprise IAM, and cloud infrastructure.`,
  category: 'Portfolio',
  status: 'published',
  content: `# Verified Case Studies & Production Portfolio

${siteContent.name} track record across delivered enterprise systems:
${caseStudyStats.map((st) => `- **${st.label}**: ${st.value}`).join('\n')}

## Featured Case Studies
${featuredCaseStudies
  .map(
    (cs) => `### ${cs.title}
- **Client/Domain**: ${cs.client} (${cs.category})
- **Overview**: ${cs.description}
- **Tech Stack**: ${cs.tech.join(', ')}
- **Outcomes**: ${cs.metrics.map((m) => `${m.label}: ${m.value} (${m.change})`).join('; ')}
- **URL**: ${cs.url}
`
  )
  .join('\n')}
`,
};

// 5. Open Source
const openSourcePage: StructuredPage = {
  url: '/open-source',
  title: `Open Source Initiatives — ${siteContent.name}`,
  description: `Explore open-source tools, developer utilities, and AI modules published and maintained by ${siteContent.name}.`,
  category: 'Community',
  status: 'published',
  content: `# Open Source at ${siteContent.name}

We contribute back to the global developer ecosystem through resilient, production-tested open-source software.

## Key Repositories
- **AgentContent** (https://github.com/iitdeveloper-git/agent-content): Next.js & Node.js content negotiation adapter and llms.txt discovery engine for AI agents and LLMs.
- **GitHub**: ${siteContent.socials.github}
`,
};

// 6. All Service Pages (Generated via canonical service models)
const servicePages: StructuredPage[] = allServices.map(serviceToStructuredPage);

// 7. Legal Pages
const privacyPage: StructuredPage = {
  url: '/privacy',
  title: legalContent.privacy.title,
  description: legalContent.privacy.description,
  category: 'Legal',
  status: 'published',
  content: legalContent.privacy.content,
};

const termsPage: StructuredPage = {
  url: '/terms',
  title: legalContent.terms.title,
  description: legalContent.terms.description,
  category: 'Legal',
  status: 'published',
  content: legalContent.terms.content,
};

export const agentContentPages: StructuredPage[] = [
  homePage,
  aboutPage,
  contactPage,
  caseStudiesPage,
  openSourcePage,
  ...servicePages,
  privacyPage,
  termsPage,
];

export const agentContent = defineAgentContent({
  site: {
    name: siteContent.name,
    url: siteContent.url,
    description: siteContent.description,
    language: 'en',
    author: siteContent.name,
  },
  pages: agentContentPages,
  render: {
    includeMetadata: true,
    includeStructuredData: true,
  },
  cache: {
    maxAge: 3600,
    staleWhileRevalidate: 86400,
    public: true,
    etagPrefix: 'iitd-md-',
  },
  negotiation: {
    defaultFormat: 'html',
    enableExtensionSuffix: true,
    queryParam: 'format',
    minQualityThreshold: 0.001,
  },
  security: {
    // Whitelist only registered public paths
    allowedPaths: agentContentPages.map((p) => p.url),
    maxOutputSizeBytes: 5 * 1024 * 1024,
  },
});
