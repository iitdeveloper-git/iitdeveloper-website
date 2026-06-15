import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { ShoppingBag, Palette, CreditCard, Plug, BarChart2, Truck, Tag, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Shopify Store Development | Custom Themes, Apps & Launch | IITDeveloper',
  description: 'Expert Shopify store creation — custom themes, app integrations, payment setup, and full launch support. We build Shopify stores that convert and scale.',
  openGraph: {
    title: 'Shopify Store Development | IITDeveloper',
    description: 'Custom Shopify stores built to convert — themes, integrations, and launch support.',
    type: 'website',
  },
};

const features = [
  {
    icon: Palette,
    title: 'Custom Theme Design',
    description: 'Pixel-perfect Shopify themes built from scratch or customized from premium bases. Branded, fast, and conversion-optimized.',
  },
  {
    icon: CreditCard,
    title: 'Payment & Checkout Setup',
    description: 'Stripe, Shopify Payments, Razorpay, PayPal, and more. Streamlined checkout flows that reduce abandonment.',
  },
  {
    icon: Plug,
    title: 'App Integrations',
    description: 'Klaviyo, Yotpo, ReCharge, Judge.me, Loox, and custom Shopify apps. Every integration your store needs to grow.',
  },
  {
    icon: Truck,
    title: 'Shipping & Fulfillment',
    description: 'ShipStation, Shiprocket, EasyPost, and third-party logistics (3PL) setup. Automated shipping rules and tracking.',
  },
  {
    icon: Tag,
    title: 'Product Catalog & Collections',
    description: 'Bulk product uploads, smart collections, metafields, and variant management. Organized from day one.',
  },
  {
    icon: BarChart2,
    title: 'Analytics & Conversion Tracking',
    description: 'Google Analytics 4, Meta Pixel, TikTok Pixel, and Shopify analytics dashboards. Know exactly what\'s selling.',
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Markets & Internationalization',
    description: 'Multi-currency, multi-language stores powered by Shopify Markets. Sell globally from a single backend.',
  },
];

const technologies = [
  'Shopify', 'Shopify Plus', 'Liquid', 'Hydrogen',
  'Klaviyo', 'Yotpo', 'ReCharge', 'Judge.me',
  'Stripe', 'Razorpay', 'PayPal', 'ShipStation',
  'Google Analytics 4', 'Meta Pixel', 'TikTok Pixel',
  'Shopify Markets', 'Metafields', 'Shopify Flow',
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'Understand your products, audience, and goals. Choose the right Shopify plan and theme strategy.',
  },
  {
    number: '02',
    title: 'Design & Branding',
    description: 'Custom theme design with your brand identity. Wireframes and mockups reviewed before any code is written.',
  },
  {
    number: '03',
    title: 'Development & Configuration',
    description: 'Theme development, product setup, payment gateways, shipping rules, and app integrations.',
  },
  {
    number: '04',
    title: 'QA & Testing',
    description: 'Full checkout flows, mobile testing, page speed audits, and cross-browser QA before launch.',
  },
  {
    number: '05',
    title: 'Launch & Handoff',
    description: 'Domain setup, DNS, Go Live checklist, and a training session so your team can manage the store independently.',
  },
];

const pricing = [
  {
    tier: 'Starter Store',
    price: 'From $3,000',
    description: 'Perfect for small brands launching their first Shopify store.',
    features: [
      'Premium theme customization',
      'Up to 50 products setup',
      'Payment gateway integration',
      'Basic shipping setup',
      'GA4 & Meta Pixel',
      '3–4 weeks delivery',
    ],
  },
  {
    tier: 'Growth Store',
    price: 'From $8,000',
    description: 'For growing brands that need a fully custom, high-converting store.',
    features: [
      'Custom Liquid theme (built from scratch)',
      'Unlimited products & collections',
      'Multi-payment gateways',
      'Email & retention app integrations',
      'Reviews & loyalty setup',
      'Advanced analytics dashboard',
      '6–8 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Shopify Plus',
    price: 'From $20,000',
    description: 'Enterprise-grade Shopify Plus stores for high-volume merchants.',
    features: [
      'Shopify Plus configuration',
      'Custom checkout extensions',
      'Shopify Flow automation',
      'Shopify Markets (multi-region)',
      'Headless Hydrogen build (optional)',
      'Dedicated post-launch support',
      '10–14 weeks delivery',
    ],
  },
];

export default function ShopifyStorePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <ShoppingBag className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Shopify Store Development</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Your Shopify Store,{' '}
              <span className="gradient-text">Done Right.</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Custom Shopify stores built to convert. From theme design to payment setup to launch — 
              we handle every detail so you can focus on selling.
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

        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Everything Your <span className="gradient-text">Shopify Store Needs</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              From theme to checkout to retention — we build stores that sell while you sleep.
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
              Our <span className="gradient-text">Shopify Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Tools and platforms we use to build and grow your store.
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
              How We <span className="gradient-text">Launch Your Store</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              A proven process from blank canvas to live Shopify store.
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
              Fixed-price projects. No surprise invoices.
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
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link href="/estimate">
                      <Button
                        className="w-full"
                        variant={plan.popular ? 'default' : 'outline'}
                        size="lg"
                      >
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
              Ready to Launch Your{' '}
              <span className="gradient-text">Shopify Store?</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 mb-8 leading-relaxed">
              Tell us about your products, your audience, and your goals — 
              we&apos;ll build a store that converts from day one.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Start Your Project
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
