import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Smartphone, Apple, Play, Zap, Shield, Users, Cpu, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Mobile App Development Services | iOS & Android Apps | IITDeveloper',
  description: 'Professional mobile app development for iOS and Android. Native and cross-platform apps that users love. React Native, Flutter, Swift, and Kotlin expertise.',
  openGraph: {
    title: 'Mobile App Development Services | IITDeveloper',
    description: 'Native and cross-platform mobile apps that users love. iOS, Android, and everything in between.',
    type: 'website',
  },
};

const features = [
  {
    icon: Smartphone,
    title: 'Cross-Platform Development',
    description: 'React Native or Flutter. Write once, deploy everywhere. 60% cost savings.',
  },
  {
    icon: Apple,
    title: 'Native iOS Apps',
    description: 'Swift and SwiftUI expertise. Full access to iOS features and APIs.',
  },
  {
    icon: Play,
    title: 'Native Android Apps',
    description: 'Kotlin and Jetpack Compose. Material Design 3 implementations.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: '60 FPS animations. Native-like performance. Battery-optimized.',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Encrypted storage, secure APIs, biometric auth. OWASP Mobile Top 10.',
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Intuitive UX following iOS and Android guidelines. Users love it.',
  },
];

const technologies = [
  'React Native', 'Flutter', 'Swift', 'Kotlin',
  'TypeScript', 'Firebase', 'GraphQL', 'REST APIs',
  'Redux', 'MobX', 'Push Notifications', 'In-App Purchases',
];

const processSteps = [
  {
    number: '01',
    title: 'Ideation & Strategy',
    description: 'Market research, competitor analysis, and feature prioritization. We validate your idea.',
  },
  {
    number: '02',
    title: 'UX/UI Design',
    description: 'Wireframes, prototypes, and pixel-perfect designs. iOS and Android guidelines followed.',
  },
  {
    number: '03',
    title: 'Development Sprint',
    description: 'Agile development with 2-week sprints. You see progress every two weeks.',
  },
  {
    number: '04',
    title: 'Quality Assurance',
    description: 'Automated tests, device testing, and performance profiling. Works on all devices.',
  },
  {
    number: '05',
    title: 'App Store Launch',
    description: 'App Store and Play Store submission. Optimized listings for discovery.',
  },
  {
    number: '06',
    title: 'Growth & Updates',
    description: 'Analytics, user feedback, and continuous improvements. Your app evolves.',
  },
];

const pricing = [
  {
    tier: 'MVP App',
    price: 'From $15,000',
    description: 'Minimum viable product to test your idea in the market.',
    features: [
      'Cross-platform (iOS + Android)',
      'Core features only',
      'Basic UI/UX design',
      'App Store submission',
      '8-10 weeks delivery',
    ],
  },
  {
    tier: 'Production App',
    price: 'From $40,000',
    description: 'Full-featured mobile app ready for scale.',
    features: [
      'Cross-platform or native',
      'Custom UI/UX design',
      'Backend & APIs',
      'Push notifications',
      'Analytics integration',
      'App Store optimization',
      '14-16 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise App',
    price: 'From $100,000',
    description: 'Complex apps with advanced features and integrations.',
    features: [
      'Native iOS + Android',
      'Advanced animations',
      'Offline functionality',
      'Third-party integrations',
      'Admin dashboard',
      'Dedicated support',
      '20+ weeks delivery',
    ],
  },
];

export default function AppDevelopmentPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Smartphone className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">App Development</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Apps So Good, Users <span className="gradient-text">Forget Browsers Exist</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Native and cross-platform mobile apps that users love. iOS, Android, and everything in between. 
              60 FPS smooth, battery-optimized, and actually tested on real devices.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  See Our Portfolio
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
              Why Users <span className="gradient-text">Love Our Apps</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              We build mobile experiences that feel native, perform flawlessly, and users can't uninstall.
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
              Our <span className="gradient-text">Mobile Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Battle-tested frameworks that ship apps users actually use.
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
              From Idea to <span className="gradient-text">App Store</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Our proven process gets your app live in weeks, not months.
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
              Fixed-price projects. No surprises. No hidden costs.
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
                Ready to Launch Your <span className="gradient-text">App</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Let's turn your idea into an app users love. Free consultation and detailed quote.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Book a Discovery Call
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
