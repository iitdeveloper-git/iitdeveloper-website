import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Megaphone, Search, Hash, TrendingUp, Users, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'SEO & Social Media Marketing Services | Organic Growth | IITDeveloper',
  description: 'SEO and social media marketing that works in 2026. Get found on Google, grow your following, and drive organic traffic that converts.',
  openGraph: {
    title: 'SEO & Social Media Marketing | IITDeveloper',
    description: 'Get found. Get followed. Organic growth strategies that work in 2026.',
    type: 'website',
  },
};

const features = [
  {
    icon: Search,
    title: 'Technical SEO',
    description: 'Site speed, structured data, Core Web Vitals. The technical foundation that ranks.',
  },
  {
    icon: Globe,
    title: 'On-Page Optimization',
    description: 'Content optimization, keyword strategy, and internal linking that works.',
  },
  {
    icon: TrendingUp,
    title: 'Link Building',
    description: 'High-quality backlinks from real sites. No spam, no PBNs, no shortcuts.',
  },
  {
    icon: Hash,
    title: 'Social Media Strategy',
    description: 'Platform-specific content strategies. Not just posting, actually engaging.',
  },
  {
    icon: Users,
    title: 'Community Growth',
    description: 'Real followers, real engagement. No bots, no fake accounts.',
  },
  {
    icon: Megaphone,
    title: 'Content Marketing',
    description: 'Content that ranks, content that converts. SEO + social + conversion.',
  },
];

const technologies = [
  'Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog',
  'Meta Business Suite', 'Hootsuite', 'Buffer', 'Sprout Social',
  'Google Analytics 4', 'Looker Studio', 'Moz', 'BuzzSumo',
];

const processSteps = [
  {
    number: '01',
    title: 'SEO Audit',
    description: 'Complete technical audit, keyword analysis, and competitive research.',
  },
  {
    number: '02',
    title: 'Strategy Development',
    description: 'Custom SEO and social strategy based on your goals and audience.',
  },
  {
    number: '03',
    title: 'Technical Optimization',
    description: 'Fix technical issues, optimize site speed, implement structured data.',
  },
  {
    number: '04',
    title: 'Content Creation',
    description: 'High-quality content optimized for both search engines and humans.',
  },
  {
    number: '05',
    title: 'Link Building & Outreach',
    description: 'Build authoritative backlinks and grow your social presence.',
  },
  {
    number: '06',
    title: 'Monitor & Optimize',
    description: 'Track rankings, traffic, and conversions. Continuous improvement.',
  },
];

const pricing = [
  {
    tier: 'Local SEO',
    price: 'From $1,500/mo',
    description: 'For local businesses wanting to dominate local search.',
    features: [
      'Google Business optimization',
      'Local citation building',
      'Basic on-page SEO',
      'Monthly reporting',
      '6-month minimum',
    ],
  },
  {
    tier: 'Growth Package',
    price: 'From $3,500/mo',
    description: 'Complete SEO and social media management.',
    features: [
      'Full technical SEO',
      'Content creation (4-8 posts)',
      'Link building',
      'Social media management',
      '2 platforms included',
      'Weekly reporting',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise SEO',
    price: 'From $8,000/mo',
    description: 'Enterprise-level SEO for competitive markets.',
    features: [
      'Multi-site SEO',
      'Custom content strategy',
      'Aggressive link building',
      'All social platforms',
      'Dedicated account manager',
      'Real-time reporting',
    ],
  },
];

export default function SEOSMMPage() {
  return (
    <main className="min-h-screen">      <Header />      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Megaphone className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">SEO & SMM</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Page 1 of Google. <span className="gradient-text">That's the Goal</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Get found. Get followed. Organic growth strategies that work in 2026. 
              No page 2 participation trophies. Just rankings that drive traffic.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Free SEO Audit
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
              SEO & Social That <span className="gradient-text">Gets Results</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              White-hat strategies that build long-term, sustainable growth.
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
              Our <span className="gradient-text">SEO & Social Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Professional-grade tools for tracking, analyzing, and optimizing.
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
              Our <span className="gradient-text">SEO Process</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Systematic approach to ranking higher and growing your audience.
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
              Monthly retainers. Cancel anytime after minimum commitment.
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
                Ready to Rank <span className="gradient-text">Higher</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Free SEO audit. We'll show you exactly what's holding you back from page 1.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Get Free SEO Audit
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to SEO Expert
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
