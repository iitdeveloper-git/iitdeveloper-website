import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Github, Terminal, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ossProjects } from '@/lib/data/oss';
import { getRepoMeta } from '@/lib/github';
import OSSProjectCard from '@/components/open-source/OSSProjectCard';
import OSSArchitecture from '@/components/open-source/OSSArchitecture';
import OSSPrinciples from '@/components/open-source/OSSPrinciples';
import OSSCommunityCTA from '@/components/open-source/OSSCommunityCTA';
import OSSBusinessCTA from '@/components/open-source/OSSBusinessCTA';

const baseUrl = 'https://iitdeveloper.com';

export const metadata: Metadata = {
  title: 'IITDEVELOPER Open Source | DevOps, AI & Infrastructure Tools',
  description:
    'Explore open-source developer tools from IITDEVELOPER, including DeployKit for CI/CD automation and OpsPilot for infrastructure monitoring and ChatOps.',
  keywords: [
    'open source DevOps tools',
    'GitHub Actions CI/CD automation',
    'infrastructure monitoring',
    'ChatOps',
    'developer tools',
    'AI infrastructure automation',
  ].join(', '),
  alternates: {
    canonical: `${baseUrl}/open-source`,
  },
  openGraph: {
    type: 'website',
    url: `${baseUrl}/open-source`,
    title: 'IITDEVELOPER Open Source | DevOps, AI & Infrastructure Tools',
    description:
      'Explore open-source developer tools from IITDEVELOPER, including DeployKit for CI/CD automation and OpsPilot for infrastructure monitoring and ChatOps.',
    siteName: 'IITDeveloper',
    images: [
      {
        url: '/open-source/deploykit-banner.png',
        width: 1024,
        height: 537,
        alt: 'IITDEVELOPER Open Source — DeployKit and OpsPilot',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IITDEVELOPER Open Source | DevOps, AI & Infrastructure Tools',
    description:
      'Open-source infrastructure, automation and AI tools built in public by IITDEVELOPER.',
    images: ['/open-source/deploykit-banner.png'],
  },
};

export default async function OpenSourcePage() {
  const [deploykitMeta, opspilotMeta] = await Promise.all(
    ossProjects.map((project) => getRepoMeta(project.githubOwner, project.githubRepo))
  );
  const metaBySlug: Record<string, Awaited<ReturnType<typeof getRepoMeta>>> = {
    deploykit: deploykitMeta,
    opspilot: opspilotMeta,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Open Source', item: `${baseUrl}/open-source` },
    ],
  };

  const softwareSchemas = ossProjects.map((project) => {
    const meta = metaBySlug[project.slug];
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareSourceCode',
      name: project.name,
      description: project.description,
      codeRepository: project.githubUrl,
      programmingLanguage: project.slug === 'opspilot' ? 'Python' : 'YAML',
      license: meta?.license ?? project.fallbackLicense,
      author: {
        '@type': 'Organization',
        name: 'IITDEVELOPER',
        url: baseUrl,
      },
      isAccessibleForFree: true,
    };
  });

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {softwareSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Background circuit-grid effect */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,83,156,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,83,156,0.8) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
          aria-hidden="true"
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/25 mb-8">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                IITDEVELOPER Open Source
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight">
              We don&apos;t just use technology.
              <br />
              <span className="gradient-text">We build it in public.</span>
            </h1>

            <p className="text-xl text-muted-foreground/80 leading-relaxed font-light mb-10 max-w-2xl mx-auto">
              Open-source infrastructure, automation and AI tools built from real engineering problems at
              IITDEVELOPER.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="#projects">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Explore Projects
                </Button>
              </a>
              <a href="https://github.com/iitdeveloper-git" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="neon">
                  <Github className="mr-2 w-4 h-4" />
                  View GitHub
                </Button>
              </a>
            </div>

            <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground/60 font-mono">
              <Radio className="w-3.5 h-3.5 text-secondary/70" aria-hidden="true" />
              Built in public • Self-hostable • Developer-first
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="scroll-mt-20 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-10">
            {ossProjects.map((project, index) => (
              <OSSProjectCard
                key={project.slug}
                project={project}
                meta={metaBySlug[project.slug] ?? null}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <OSSArchitecture />
      <OSSPrinciples />
      <OSSCommunityCTA />
      <OSSBusinessCTA />
      <Footer />
    </main>
  );
}
