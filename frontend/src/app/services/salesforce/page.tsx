import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Sparkles, Workflow, Database, Puzzle, BarChart3, Users, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Salesforce Solutions & Consulting | Custom Implementations | IITDeveloper',
  description: 'Expert Salesforce consulting and custom implementations. CRM optimization, integrations, custom apps, and automation that makes Salesforce work for your business.',
  openGraph: {
    title: 'Salesforce Solutions | IITDeveloper',
    description: 'Custom Salesforce implementations, integrations, and optimizations for your business.',
    type: 'website',
  },
};

const features = [
  {
    icon: Workflow,
    title: 'Custom Implementation',
    description: 'Tailored Salesforce setup that fits your business process, not the other way around.',
  },
  {
    icon: Puzzle,
    title: 'Third-Party Integrations',
    description: 'Connect Salesforce with your existing tools. APIs, webhooks, middleware.',
  },
  {
    icon: Database,
    title: 'Data Migration',
    description: 'Clean data migration from legacy systems. No data loss, validated transfers.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Custom dashboards, reports, and Einstein Analytics for data-driven decisions.',
  },
  {
    icon: Sparkles,
    title: 'Process Automation',
    description: 'Workflows, approval processes, and custom automation. Less manual work.',
  },
  {
    icon: Users,
    title: 'Training & Support',
    description: 'Your team actually knows how to use it. Documentation included.',
  },
];

const technologies = [
  'Salesforce CRM', 'Apex', 'Visualforce', 'Lightning Components',
  'Salesforce APIs', 'Heroku', 'Marketing Cloud', 'Service Cloud',
  'Sales Cloud', 'Einstein Analytics', 'MuleSoft', 'Pardot',
];

const processSteps = [
  {
    number: '01',
    title: 'Business Analysis',
    description: 'We map your sales process, identify pain points, and define success metrics.',
  },
  {
    number: '02',
    title: 'Solution Design',
    description: 'Custom Salesforce architecture designed for your specific workflows.',
  },
  {
    number: '03',
    title: 'Configuration & Development',
    description: 'Custom objects, fields, workflows, and integrations. Built to spec.',
  },
  {
    number: '04',
    title: 'Data Migration',
    description: 'Clean, validated data migration from your existing systems.',
  },
  {
    number: '05',
    title: 'User Training',
    description: 'Hands-on training sessions. Your team becomes Salesforce power users.',
  },
  {
    number: '06',
    title: 'Ongoing Optimization',
    description: 'Continuous improvements based on usage patterns and feedback.',
  },
];

const pricing = [
  {
    tier: 'CRM Setup',
    price: 'From $8,000',
    description: 'Basic Salesforce implementation for small teams.',
    features: [
      'Initial configuration',
      'Custom fields & objects',
      'Basic automation',
      'User training (up to 10 users)',
      '4-6 weeks delivery',
    ],
  },
  {
    tier: 'Business Optimization',
    price: 'From $25,000',
    description: 'Advanced Salesforce setup with integrations.',
    features: [
      'Complex workflows',
      'Third-party integrations',
      'Custom dashboards',
      'Data migration',
      'Extended training',
      '8-12 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise Solution',
    price: 'From $75,000',
    description: 'Complete Salesforce ecosystem with custom apps.',
    features: [
      'Multi-cloud setup',
      'Custom Apex development',
      'Lightning components',
      'Einstein Analytics',
      'Dedicated support',
      '16+ weeks delivery',
    ],
  },
];

export default function SalesforcePage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Salesforce Solutions</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Making Salesforce <span className="gradient-text">Less Painful</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Custom Salesforce implementations that actually fit your business. No forced workflows. 
              No confusion. Just a CRM that your team will actually use.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Free CRM Audit
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
              Salesforce That <span className="gradient-text">Works For You</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Custom implementations designed around your business, not Salesforce defaults.
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
              Our <span className="gradient-text">Salesforce Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Full Salesforce ecosystem coverage. Every cloud, every tool.
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
              Our <span className="gradient-text">Implementation Process</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              From chaos to organized CRM in weeks, not months.
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
              Fixed-price projects. Salesforce licensing separate.
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
                Ready to Optimize Your <span className="gradient-text">Salesforce</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Free CRM audit. We'll show you what's not working and how to fix it.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Request Free Audit
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to Salesforce Expert
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
