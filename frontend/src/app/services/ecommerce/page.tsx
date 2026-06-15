import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { ShoppingCart, CreditCard, Store, Package, Users, TrendingUp, Globe, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Ecommerce Solutions | Development, Payments & Marketplace Integration | IITDeveloper',
  description: 'Full-stack ecommerce development with payment gateways, marketplace integrations, brand architecture, and retention strategies. Built to sell, engineered to scale.',
  openGraph: {
    title: 'Ecommerce Solutions | IITDeveloper',
    description: 'Full-stack ecommerce development — payment gateways, marketplace integrations, and retention strategies.',
    type: 'website',
  },
};

const features = [
  {
    icon: ShoppingCart,
    title: 'Ecommerce Development',
    description: 'Custom storefronts built on Shopify, WooCommerce, or fully bespoke platforms. Fast, beautiful, and conversion-focused.',
  },
  {
    icon: CreditCard,
    title: 'Payment Gateways',
    description: 'Stripe, Razorpay, PayPal, and more. Secure, seamless checkout flows that reduce cart abandonment.',
  },
  {
    icon: Store,
    title: 'Marketplace Setup & Integrations',
    description: 'List and sell across Amazon, Flipkart, Etsy, and other marketplaces. Centralized inventory and order management.',
  },
  {
    icon: Globe,
    title: 'Brand Architecture',
    description: 'Multi-brand or sub-brand structures designed for scale. Consistent identity across every storefront and channel.',
  },
  {
    icon: Users,
    title: 'Retention Strategies',
    description: 'Loyalty programs, email automation, and re-engagement flows that keep customers coming back.',
  },
  {
    icon: Package,
    title: 'Product Launch Across Digital Platforms',
    description: 'Coordinated product launches across your website, social, and marketplace channels for maximum visibility.',
  },
  {
    icon: TrendingUp,
    title: 'Conversion Optimization',
    description: 'A/B testing, UX improvements, and data-driven tweaks that turn browsers into buyers.',
  },
];

const technologies = [
  'Shopify', 'WooCommerce', 'Magento', 'Next.js Commerce',
  'Stripe', 'Razorpay', 'PayPal', 'Klarna',
  'Amazon Seller Central', 'Flipkart Marketplace', 'Etsy',
  'Klaviyo', 'Yotpo', 'ReCharge',
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery & Platform Selection',
    description: 'Understand your product catalog, volume, and goals. Choose the right platform for your business.',
  },
  {
    number: '02',
    title: 'Design & Brand Architecture',
    description: 'Build a storefront that reflects your brand and converts visitors into customers.',
  },
  {
    number: '03',
    title: 'Development & Integrations',
    description: 'Build the store, integrate payment gateways, and connect to marketplaces and tools.',
  },
  {
    number: '04',
    title: 'Product Launch',
    description: 'Coordinated launch across all channels with SEO, social, and paid support.',
  },
  {
    number: '05',
    title: 'Retention & Growth',
    description: 'Loyalty programs, email flows, and analytics to maximize customer lifetime value.',
  },
];

const pricing = [
  {
    tier: 'Starter Store',
    price: 'From $5,000',
    description: 'Perfect for small businesses launching their first online store.',
    features: [
      'Shopify or WooCommerce setup',
      'Payment gateway integration',
      'Up to 100 products',
      'Basic SEO setup',
      'Mobile responsive design',
      '4-6 weeks delivery',
    ],
  },
  {
    tier: 'Growth Store',
    price: 'From $15,000',
    description: 'For scaling brands that need advanced features and marketplace reach.',
    features: [
      'Custom storefront design',
      'Multi-payment gateways',
      'Marketplace integrations',
      'Loyalty & retention setup',
      'Analytics dashboard',
      'Product launch support',
      '8-12 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise Commerce',
    price: 'From $40,000',
    description: 'Full-scale commerce infrastructure for high-volume businesses.',
    features: [
      'Custom platform development',
      'Multi-brand architecture',
      'Full marketplace network',
      'Advanced retention engine',
      'Headless commerce setup',
      'Dedicated support',
      '16+ weeks delivery',
    ],
  },
];

export default function EcommercePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <ShoppingCart className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Ecommerce Solutions</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Built to Sell. <span className="gradient-text">Engineered to Scale.</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Custom ecommerce stores, payment integrations, and marketplace setups that convert. 
              From first sale to full-scale multi-channel commerce — we handle everything.
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
              Everything Your <span className="gradient-text">Store Needs</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              From development to launch to retention — we've got every layer covered.
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
              Our <span className="gradient-text">Commerce Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Platforms, payment processors, and retention tools we use every day.
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
              From concept to conversion — a proven ecommerce launch process.
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
              Ready to <span className="gradient-text">Launch Your Store?</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 mb-8">
              Let's build an ecommerce experience your customers will love — and keep coming back to.
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
