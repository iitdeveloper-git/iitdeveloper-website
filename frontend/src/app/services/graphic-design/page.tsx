import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Palette, Image, Film, Play, Monitor, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Graphic Design Services | Video Editing & Motion Graphics | IITDeveloper',
  description: 'Professional graphic design — posters, banners, video editing, 2D animations, After Effects motion graphics, and online/offline marketing materials.',
  openGraph: {
    title: 'Graphic Design Services | IITDeveloper',
    description: 'Visual design, video editing, 2D animation, and After Effects motion graphics.',
    type: 'website',
  },
};

const features = [
  {
    icon: Image,
    title: 'Poster & Banner Design',
    description: 'Eye-catching posters and banners for digital campaigns, events, and physical marketing materials. Print-ready and pixel-perfect.',
  },
  {
    icon: Film,
    title: 'Video Editing',
    description: 'Professional video editing for promotional, product, and social media content. From raw footage to polished final cut.',
  },
  {
    icon: Play,
    title: 'Launching Video & 2D Video',
    description: 'Compelling product launch videos and 2D animated explainers that communicate your value proposition clearly and memorably.',
  },
  {
    icon: Monitor,
    title: 'Online & Offline Designs',
    description: 'Consistent visual identity across digital channels (social, web, email) and offline materials (brochures, flyers, signage).',
  },
  {
    icon: Sparkles,
    title: 'After Effects Animation',
    description: 'Smooth motion graphics and animated sequences using After Effects. Logo animations, transitions, and full motion design packages.',
  },
  {
    icon: Layers,
    title: 'Brand Identity Design',
    description: 'Logos, color palettes, typography systems, and brand guidelines that make your brand instantly recognizable.',
  },
];

const technologies = [
  'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign',
  'Adobe After Effects', 'Adobe Premiere Pro', 'Adobe XD',
  'Figma', 'Canva Pro', 'DaVinci Resolve', 'Blender',
];

const processSteps = [
  {
    number: '01',
    title: 'Brief & Discovery',
    description: 'Understand your brand, target audience, and design objectives. The brief guides everything.',
  },
  {
    number: '02',
    title: 'Concept & Moodboard',
    description: 'Develop visual concepts and moodboards for your approval before any production begins.',
  },
  {
    number: '03',
    title: 'Design & Production',
    description: 'Create all assets — static designs, motion graphics, and video — with your feedback at each stage.',
  },
  {
    number: '04',
    title: 'Revision & Refinement',
    description: 'Two rounds of revisions included. We refine until the output matches your vision.',
  },
  {
    number: '05',
    title: 'Final Delivery',
    description: 'Deliver all files in required formats — web, print, social, and source files.',
  },
];

const pricing = [
  {
    tier: 'Static Design',
    price: 'From $500',
    description: 'For individual design assets or small campaigns.',
    features: [
      'Up to 5 design assets',
      'Poster / banner / social graphics',
      'Online & offline formats',
      '2 revision rounds',
      '5-7 day delivery',
    ],
  },
  {
    tier: 'Motion & Video',
    price: 'From $2,000',
    description: 'For video production and motion graphics projects.',
    features: [
      'Video editing (up to 3 mins)',
      'After Effects animation',
      '2D explainer or launch video',
      'Brand-consistent motion design',
      '2 revision rounds',
      '7-14 day delivery',
    ],
    popular: true,
  },
  {
    tier: 'Brand Package',
    price: 'From $5,000',
    description: 'Complete visual identity and design system for your brand.',
    features: [
      'Full brand identity design',
      'Logo & guidelines',
      'Full marketing design kit',
      'Launch video + animations',
      'Online & offline assets',
      'Source files included',
      '3-5 week delivery',
    ],
  },
];

export default function GraphicDesignPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Palette className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Graphic Design</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Design That <span className="gradient-text">Gets Noticed.</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              From static posters to After Effects animations, product launch videos to full brand identities — 
              we create visuals that stop the scroll and stick in the mind.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Share Your Brief
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
              Design Across <span className="gradient-text">Every Medium</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Static, motion, or video — we handle the full visual production stack.
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
              Our <span className="gradient-text">Design Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Industry-standard tools for every type of visual production.
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
              How We <span className="gradient-text">Create Your Visuals</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              A collaborative design process — you're involved at every step.
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
              Fixed-price packages. Source files always included.
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
              Ready for Design That <span className="gradient-text">Gets Noticed?</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 mb-8">
              Share your brief and let's create visuals that your audience remembers.
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
