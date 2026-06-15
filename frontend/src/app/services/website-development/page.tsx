import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Code, Rocket, Zap, Shield, Globe, Smartphone, Database, CheckCircle2, UserCheck, Settings, RefreshCcw, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Website Development Services | Custom Web Applications | IITDeveloper',
  description: 'Professional custom website development services. We build fast, scalable, and beautiful web applications with modern frameworks like Next.js, React, and TypeScript.',
  openGraph: {
    title: 'Website Development Services | IITDeveloper',
    description: 'Custom web applications built with modern frameworks. Fast, scalable, and beautiful.',
    type: 'website',
  },
};

const features = [
  {
    icon: Rocket,
    title: 'Blazing Fast Performance',
    description: 'Optimized for Core Web Vitals with SSR, SSG, and ISR. Your users won\'t wait.',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Perfect on any device. Mobile-first approach that actually works.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'OWASP compliance, XSS protection, CSRF tokens. Sleep better at night.',
  },
  {
    icon: Database,
    title: 'Scalable Architecture',
    description: 'From 100 to 100,000 users. Your infrastructure grows with you.',
  },
  {
    icon: Globe,
    title: 'SEO Optimized',
    description: 'Built-in SEO best practices. Structured data, meta tags, sitemaps included.',
  },
  {
    icon: Zap,
    title: 'Modern Tech Stack',
    description: 'Next.js 14, React 18, TypeScript, Tailwind CSS. The good stuff.',
  },
  {
    icon: UserCheck,
    title: 'Personalized UX Design',
    description: 'User experience tailored to your audience. Wireframes, prototypes, and pixel-perfect interfaces.',
  },
  {
    icon: Settings,
    title: 'Quality Control',
    description: 'Rigorous QA testing — automated and manual. We find the bugs before your users do.',
  },
  {
    icon: RefreshCcw,
    title: 'Real-time Deployment',
    description: 'CI/CD pipelines for instant, zero-downtime deployments. Ship faster, ship safer.',
  },
  {
    icon: Wrench,
    title: 'Website Maintenance',
    description: 'Ongoing updates, security patches, and performance monitoring. We keep your site running.',
  },
];

const technologies = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'Node.js', 'PostgreSQL', 'MongoDB', 'Prisma',
  'GraphQL', 'REST APIs', 'Docker', 'AWS/Vercel',
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description: 'We understand your business goals, target audience, and technical requirements. No assumptions, just facts.',
  },
  {
    number: '02',
    title: 'Design & Architecture',
    description: 'Wireframes, mockups, and system architecture. You see exactly what you\'re getting.',
  },
  {
    number: '03',
    title: 'Development',
    description: 'Clean code, test-driven development, and regular progress updates. Weekly demos.',
  },
  {
    number: '04',
    title: 'Testing & QA',
    description: 'Automated tests, manual QA, security audits. We break it so users don\'t.',
  },
  {
    number: '05',
    title: 'Deployment & Launch',
    description: 'Smooth production deployment with monitoring, analytics, and documentation.',
  },
  {
    number: '06',
    title: 'Support & Growth',
    description: 'Post-launch support, performance monitoring, and continuous improvements.',
  },
];

const pricing = [
  {
    tier: 'Landing Page',
    price: 'From $2,500',
    description: 'Single-page websites for marketing campaigns or product launches.',
    features: [
      'Responsive design',
      'Contact form integration',
      'Basic SEO setup',
      'Fast hosting setup',
      '2 weeks delivery',
    ],
  },
  {
    tier: 'Business Website',
    price: 'From $8,000',
    description: 'Multi-page corporate websites with CMS and advanced features.',
    features: [
      'Custom design system',
      'Headless CMS integration',
      'Advanced SEO optimization',
      'Analytics & tracking',
      'Content migration',
      '6-8 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Web Application',
    price: 'From $25,000',
    description: 'Full-stack applications with authentication, databases, and APIs.',
    features: [
      'Custom functionality',
      'User authentication',
      'Database design & setup',
      'Third-party integrations',
      'Admin dashboard',
      'Ongoing support',
      '12+ weeks delivery',
    ],
  },
];

export default function WebsiteDevelopmentPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Code className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Website Development</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Custom Websites That <span className="gradient-text">Convert</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              We turn caffeine into code. Fast, scalable, and beautiful web applications built with modern frameworks. 
              Actually tested on real users.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Schedule a Call
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
              Why Choose <span className="gradient-text">Our Development</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              We don't just write code. We build digital experiences that scale.
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
              Our <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              We use battle-tested technologies that actually work in production.
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
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              A proven methodology that delivers results every time.
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
              No hidden fees. No surprises. Just honest pricing.
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
                Ready to Build Something <span className="gradient-text">Amazing</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Let's discuss your project. Get a detailed quote in 24 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to Our Team
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
