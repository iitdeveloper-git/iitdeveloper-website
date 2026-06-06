import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Cloud, Container, GitBranch, Server, Shield, Zap, Activity, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'DevOps & Cloud Services | AWS, Docker, Kubernetes | IITDeveloper',
  description: 'Professional DevOps and cloud infrastructure services. CI/CD pipelines, containerization, Kubernetes orchestration, and cloud architecture on AWS, GCP, and Azure.',
  openGraph: {
    title: 'DevOps & Cloud Services | IITDeveloper',
    description: 'Infrastructure that scales. CI/CD pipelines, containerization, and cloud architecture.',
    type: 'website',
  },
};

const features = [
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'AWS, GCP, or Azure. Scalable infrastructure designed for growth.',
  },
  {
    icon: Container,
    title: 'Containerization',
    description: 'Docker and Kubernetes. Consistent environments from dev to production.',
  },
  {
    icon: GitBranch,
    title: 'CI/CD Pipelines',
    description: 'Automated testing and deployment. Ship code confidently.',
  },
  {
    icon: Server,
    title: 'Infrastructure as Code',
    description: 'Terraform, CloudFormation, or Pulumi. Version-controlled infrastructure.',
  },
  {
    icon: Activity,
    title: 'Monitoring & Logging',
    description: 'Prometheus, Grafana, ELK stack. Know what\'s happening before users complain.',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'SOC 2, HIPAA, GDPR ready. Security baked in, not bolted on.',
  },
];

const technologies = [
  'AWS', 'Google Cloud', 'Azure', 'Docker',
  'Kubernetes', 'Terraform', 'GitHub Actions', 'Jenkins',
  'Prometheus', 'Grafana', 'ELK Stack', 'Nginx',
];

const processSteps = [
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
];

const pricing = [
  {
    tier: 'Cloud Setup',
    price: 'From $5,000',
    description: 'Basic cloud infrastructure setup for startups.',
    features: [
      'Cloud provider selection',
      'Basic infrastructure setup',
      'CI/CD pipeline',
      'Monitoring setup',
      '2 weeks delivery',
    ],
  },
  {
    tier: 'DevOps Transformation',
    price: 'From $25,000',
    description: 'Complete DevOps implementation for growing teams.',
    features: [
      'Infrastructure as code',
      'Kubernetes cluster setup',
      'Advanced CI/CD',
      'Security hardening',
      'Training & documentation',
      '8-10 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise Cloud',
    price: 'From $75,000',
    description: 'Multi-region, high-availability architecture.',
    features: [
      'Multi-cloud strategy',
      'Auto-scaling setup',
      'Disaster recovery',
      'Compliance (SOC 2, HIPAA)',
      'Dedicated DevOps team',
      '16+ weeks delivery',
    ],
  },
];

export default function DevOpsCloudPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Cloud className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">DevOps & Cloud</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              "It Works on My Machine" <span className="gradient-text">Doesn't Cut It</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Infrastructure that scales. CI/CD pipelines that ship code fast. Monitoring that catches issues 
              before users do. Because production shouldn't be a surprise.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Infrastructure Audit
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Infrastructure That <span className="gradient-text">Just Works</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              From zero to production-ready in weeks, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} glass premium className="dark-surface border-white/[0.08]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 lg:py-28 bg-surface-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Our <span className="gradient-text">Cloud Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Industry-standard tools that Fortune 500 companies trust.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-lg bg-accent/10 border border-accent/20 hover:border-accent/40 transition-all hover:shadow-glow-purple"
              >
                <span className="font-medium text-white">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Our <span className="gradient-text">Approach</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Systematic migration to modern, scalable infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-purple">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground/80 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-28 bg-surface-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Cloud costs included in our estimates. No billing surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <Card
                key={index}
                glass
                premium
                className={`dark-surface border-white/[0.08] relative ${
                  plan.popular ? 'ring-2 ring-accent/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.tier}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/estimate" className="block mt-6">
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card glass premium className="dark-surface border-white/[0.08] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            <CardContent className="relative py-16 px-8 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
                Ready to Scale Your <span className="gradient-text">Infrastructure</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Free infrastructure audit. Get a detailed migration plan in 48 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Request Audit
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to DevOps Expert
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
