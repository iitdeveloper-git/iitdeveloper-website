import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Building2, Search, FileText, Target, BarChart3, MessageSquare, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'B2B Promotion Services | Lead Generation & Content Marketing | IITDeveloper',
  description: 'End-to-end B2B growth strategies. Market research, lead generation, content marketing, and analytics that fill pipelines and close deals.',
  openGraph: {
    title: 'B2B Promotion Services | IITDeveloper',
    description: 'End-to-end B2B growth strategies — lead generation, content marketing, and analytics that close deals.',
    type: 'website',
  },
};

const features = [
  {
    icon: Search,
    title: 'Market Research',
    description: 'Deep industry analysis, competitor mapping, and ideal customer profile development. Know your market before you enter it.',
  },
  {
    icon: FileText,
    title: 'Content Marketing',
    description: 'Thought leadership content, whitepapers, case studies, and blog strategies that attract and educate your buyers.',
  },
  {
    icon: Target,
    title: 'Lead Generation',
    description: 'Multi-channel outbound and inbound lead generation. LinkedIn outreach, paid B2B ads, and intent-based targeting.',
  },
  {
    icon: Building2,
    title: 'Value Proposition',
    description: 'Craft a clear, compelling value proposition that resonates with decision-makers and differentiates your offering.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Measurement',
    description: 'Pipeline analytics, CAC/LTV tracking, and attribution reporting. Understand what drives revenue, not just traffic.',
  },
  {
    icon: MessageSquare,
    title: 'Customer Feedback & Testimonials',
    description: 'Structured feedback loops, case study creation, and testimonial collection that build trust and accelerate deals.',
  },
  {
    icon: RefreshCcw,
    title: 'Continuous Optimization',
    description: 'Ongoing A/B testing, messaging refinement, and strategy iteration based on real pipeline data.',
  },
];

const technologies = [
  'HubSpot', 'Salesforce', 'LinkedIn Sales Navigator', 'Apollo.io',
  'Outreach', 'ZoomInfo', 'Clearbit', 'G2',
  'Google Analytics 4', 'Looker Studio', 'Tableau', 'Bombora',
];

const processSteps = [
  {
    number: '01',
    title: 'Market & Buyer Analysis',
    description: 'Define your ICP, map the competitive landscape, and identify the highest-value segments.',
  },
  {
    number: '02',
    title: 'Value Proposition Design',
    description: 'Craft messaging that speaks directly to pain points and differentiates your solution.',
  },
  {
    number: '03',
    title: 'Content & Campaign Build',
    description: 'Create content assets and set up lead generation campaigns across channels.',
  },
  {
    number: '04',
    title: 'Launch & Outreach',
    description: 'Execute multi-channel outreach with personalized messaging at scale.',
  },
  {
    number: '05',
    title: 'Measure & Iterate',
    description: 'Track pipeline metrics, collect feedback, and continuously improve.',
  },
];

const pricing = [
  {
    tier: 'Starter',
    price: 'From $3,000/mo',
    description: 'For early-stage B2B companies establishing their pipeline.',
    features: [
      'ICP & market research',
      'LinkedIn outreach campaigns',
      'Monthly pipeline report',
      '1 content asset/month',
      '3-month minimum',
    ],
  },
  {
    tier: 'Growth',
    price: 'From $6,000/mo',
    description: 'For scaling B2B teams ready to build a repeatable engine.',
    features: [
      'Multi-channel lead gen',
      'Content marketing program',
      'Analytics dashboard',
      'Customer testimonials',
      'Bi-weekly strategy calls',
      'CRM setup & management',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise',
    price: 'From $12,000/mo',
    description: 'Full-service B2B growth for complex sales cycles.',
    features: [
      'Full GTM strategy',
      'Dedicated growth team',
      'ABM campaigns',
      'Sales enablement content',
      'Custom attribution models',
      'Weekly strategy calls',
    ],
  },
];

export default function B2BPromotionPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Building2 className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">B2B Promotion</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Fill Your Pipeline. <span className="gradient-text">Close More Deals.</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              End-to-end B2B growth strategies built around your buyers. 
              From market research to lead generation to continuous optimization — we build pipelines that actually convert.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Free Strategy Call
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              B2B Growth That <span className="gradient-text">Actually Scales</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              We don't spray and pray. We build systematic B2B growth engines.
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
              Our <span className="gradient-text">B2B Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Best-in-class tools for data enrichment, outreach, and pipeline intelligence.
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
              How We <span className="gradient-text">Build Your Pipeline</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              A systematic approach to B2B growth — no guesswork, just results.
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
              Flat monthly retainers. No hidden fees. Full transparency on deliverables.
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
                  <div className="mt-8">
                    <Link href="/contact">
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Ready to <span className="gradient-text">Grow Your B2B Pipeline?</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 mb-8">
              Let's build a predictable, scalable revenue engine together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Start a Project
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
