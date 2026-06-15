import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { TrendingUp, Target, DollarSign, BarChart3, MousePointer, Users, CheckCircle2, Mail, Megaphone, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Performance Marketing Services | PPC & Paid Ads | IITDeveloper',
  description: 'Data-driven performance marketing that converts. PPC campaigns, social ads, conversion optimization, and growth marketing that stops burning money.',
  openGraph: {
    title: 'Performance Marketing Services | IITDeveloper',
    description: 'Data-driven campaigns that convert. PPC, social ads, and conversion optimization.',
    type: 'website',
  },
};

const features = [
  {
    icon: Target,
    title: 'Targeted Campaigns',
    description: 'Precision targeting based on data, not guesswork. Right audience, right message.',
  },
  {
    icon: DollarSign,
    title: 'ROI-Focused',
    description: 'Every dollar tracked. Clear attribution. No vanity metrics.',
  },
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description: 'Deep dive into metrics. We optimize what matters: conversions and revenue.',
  },
  {
    icon: MousePointer,
    title: 'Conversion Optimization',
    description: 'Landing pages that convert. A/B testing. Heat maps. Real improvements.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Marketing',
    description: 'Systematic experimentation. Find what works, scale it aggressively.',
  },
  {
    icon: Users,
    title: 'Full-Funnel Strategy',
    description: 'Awareness to conversion. We handle the entire customer journey.',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Automated drip campaigns, newsletters, and re-engagement flows. High open rates, higher conversions.',
  },
  {
    icon: Megaphone,
    title: 'Social Media Marketing',
    description: 'Platform-specific paid social campaigns. Reach your audience where they scroll.',
  },
  {
    icon: Rocket,
    title: 'Product Launch',
    description: 'Full-funnel launch strategy — from pre-launch buzz to post-launch scaling. Get noticed on day one.',
  },
  {
    icon: Star,
    title: 'Brand Awareness',
    description: 'Top-of-funnel campaigns that build recognition. Be the brand they remember.',
  },
];

const technologies = [
  'Google Ads', 'Meta Ads', 'LinkedIn Ads', 'TikTok Ads',
  'Google Analytics 4', 'Tag Manager', 'Hotjar', 'Optimizely',
  'HubSpot', 'Marketo', 'Salesforce', 'Looker Studio',
];

const processSteps = [
  {
    number: '01',
    title: 'Market Research',
    description: 'Competitor analysis, audience research, and opportunity identification.',
  },
  {
    number: '02',
    title: 'Strategy Development',
    description: 'Channel selection, budget allocation, and campaign structure.',
  },
  {
    number: '03',
    title: 'Campaign Setup',
    description: 'Ad creation, landing pages, tracking pixels, and conversion goals.',
  },
  {
    number: '04',
    title: 'Launch & Monitor',
    description: 'Campaigns go live. Real-time monitoring and rapid response.',
  },
  {
    number: '05',
    title: 'Optimize & Scale',
    description: 'A/B testing, bid optimization, and scaling winners.',
  },
  {
    number: '06',
    title: 'Report & Improve',
    description: 'Transparent reporting with actionable insights and next steps.',
  },
];

const pricing = [
  {
    tier: 'Startup Growth',
    price: 'From $2,500/mo',
    description: 'Perfect for startups testing channels.',
    features: [
      '1-2 ad platforms',
      'Basic campaign management',
      'Monthly reporting',
      'Ad spend: $5k-$15k/mo',
      '3-month minimum',
    ],
  },
  {
    tier: 'Business Scale',
    price: 'From $5,000/mo',
    description: 'For growing businesses ready to scale.',
    features: [
      'Multi-channel campaigns',
      'Advanced optimization',
      'Landing page optimization',
      'Bi-weekly reporting',
      'Ad spend: $15k-$50k/mo',
      'CRO included',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise Growth',
    price: 'From $10,000/mo',
    description: 'Complete growth marketing for scale.',
    features: [
      'Full-stack marketing',
      'Dedicated strategist',
      'Custom attribution models',
      'Weekly strategy calls',
      'Ad spend: $50k+/mo',
      'Marketing automation',
    ],
  },
];

export default function MarketingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Performance Marketing</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Stop Burning Money. <span className="gradient-text">Start Burning Competitors</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Data-driven campaigns that convert. PPC, social ads, and conversion optimization. 
              Every dollar tracked, every click optimized, every campaign profitable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Free Marketing Audit
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
              Marketing That <span className="gradient-text">Actually Works</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              No vanity metrics. No fluffy reports. Just conversions and revenue.
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
              Our <span className="gradient-text">Marketing Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Industry-leading platforms for campaign management and analytics.
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
              How We <span className="gradient-text">Drive Growth</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Systematic approach to finding and scaling profitable channels.
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
              Management fees shown below. Ad spend billed separately.
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
                Ready to Scale Your <span className="gradient-text">Growth</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Free marketing audit. We'll show you exactly where to improve ROI.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Get Free Audit
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to Growth Strategist
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
