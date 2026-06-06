import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Code, Smartphone, Cloud, Sparkles, Bot, Workflow, TrendingUp, Megaphone, ArrowRight, Building2, ShoppingCart, Palette, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'What We Build - Full-Stack Development & AI Solutions | IITDeveloper',
  description: 'Comprehensive software development services: web apps, mobile apps, AI agents, DevOps, Salesforce, and growth marketing. We build digital products that scale.',
  openGraph: {
    title: 'What We Build | IITDeveloper',
    description: 'Full-stack development, AI solutions, and growth marketing services.',
    type: 'website',
  },
};

const services = [
  {
    icon: Code,
    title: 'Website Development',
    description: 'Custom web applications built with modern frameworks. Fast, scalable, and beautiful.',
    tagline: '💻 We turn caffeine into code. Actually tested on real users.',
    href: '/services/website-development',
    features: ['UX Design', 'Quality Control', 'Real-time Deployment', 'Website Maintenance'],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description: 'Native and cross-platform mobile apps that users love. iOS, Android, and everything in between.',
    tagline: '📱 Apps so smooth, your users will forget they have a browser.',
    href: '/services/app-development',
    features: ['React Native', 'Flutter', 'Native iOS/Android', '60 FPS animations'],
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Infrastructure that scales. CI/CD pipelines, containerization, and cloud architecture.',
    tagline: '☁️ Because "it works on my machine" doesn\'t cut it anymore.',
    href: '/services/devops-cloud',
    features: ['AWS/GCP/Azure', 'Kubernetes', 'Terraform', 'CI/CD pipelines'],
  },
  {
    icon: Sparkles,
    title: 'Salesforce Solutions',
    description: 'Custom Salesforce implementations, integrations, and optimizations for your business.',
    tagline: '⚡ Making Salesforce less painful since... well, recently.',
    href: '/services/salesforce',
    features: ['Custom implementation', 'Third-party integrations', 'Data migration', 'Process automation'],
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent agents that automate your workflows. Available 24/7, never need coffee breaks.',
    tagline: '🤖 Your new employee. Doesn\'t complain. Doesn\'t take vacations.',
    href: '/services/ai-agents',
    features: ['GPT-4 & Claude', 'Custom training', 'Function calling', 'RAG systems'],
  },
  {
    icon: Workflow,
    title: 'AI Workflows',
    description: 'Custom LLM integrations and automation systems. MCP protocols and intelligent pipelines.',
    tagline: '🧠 Teaching AI to do your job. But don\'t worry, you\'re still needed.',
    href: '/services/ai-workflows',
    features: ['LangChain', 'MCP protocol', 'Multi-model', 'Real-time processing'],
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Data-driven campaigns that convert. PPC, social ads, and conversion optimization.',
    tagline: '📈 Stop burning money. Start burning competitors.',
    href: '/services/marketing',
    features: ['Email Marketing', 'Social Media Marketing', 'Product Launch', 'Brand Awareness'],
  },
  {
    icon: Megaphone,
    title: 'SEO & SMM',
    description: 'Get found. Get followed. Organic growth strategies that work in 2026.',
    tagline: '🎯 Page 1 of Google. That\'s the goal. No page 2 participation trophies.',
    href: '/services/seo-smm',
    features: ['Technical SEO', 'Link building', 'Social media', 'Content marketing'],
  },
  {
    icon: Building2,
    title: 'B2B Promotion',
    description: 'End-to-end B2B growth strategies. Lead generation, content marketing, and analytics that close deals.',
    tagline: '🤝 Your pipeline deserves better than cold emails nobody reads.',
    href: '/services/b2b-promotion',
    features: ['Lead Generation', 'Content Marketing', 'Market Research', 'Analytics & Measurement'],
  },
  {
    icon: ShoppingCart,
    title: 'Ecommerce Solutions',
    description: 'Full-stack ecommerce development with payment gateways, marketplace integrations, and retention strategies.',
    tagline: '🛒 Built to sell. Designed to retain. Engineered to scale.',
    href: '/services/ecommerce',
    features: ['Payment Gateways', 'Marketplace Integrations', 'Product Launch', 'Retention Strategies'],
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Store',
    description: 'Custom Shopify stores built to convert. Theme design, payment setup, app integrations, and full launch support.',
    tagline: '🛍️ Your store live in weeks. Designed to sell from day one.',
    href: '/services/shopify-store',
    features: ['Custom Theme Design', 'Payment Gateways', 'App Integrations', 'Shopify Plus'],
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Visual identity, motion graphics, and multimedia design. Posters, banners, videos, and After Effects animations.',
    tagline: '🎨 Design so good, your competitors will think you hired someone expensive.',
    href: '/services/graphic-design',
    features: ['Poster & Banner Design', 'Video Editing', '2D Animation', 'After Effects'],
  },
];

const techStack = {
  frontend: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
  backend: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'],
  ai: ['OpenAI GPT-4', 'Claude', 'LangChain', 'Vector DBs'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'GitHub Actions'],
  marketing: ['Google Ads', 'Meta Ads', 'Analytics', 'SEMrush'],
};

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We understand your business, goals, and technical requirements. No assumptions.',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Custom solution architecture designed for your specific needs and constraints.',
  },
  {
    step: '03',
    title: 'Design',
    description: 'User-centric design with pixel-perfect mockups. You see before we build.',
  },
  {
    step: '04',
    title: 'Development',
    description: 'Clean code, agile sprints, and weekly demos. You\'re in the loop.',
  },
  {
    step: '05',
    title: 'Testing',
    description: 'Automated tests, manual QA, security audits. We break it so users don\'t.',
  },
  {
    step: '06',
    title: 'Launch',
    description: 'Smooth deployment with monitoring, documentation, and training.',
  },
  {
    step: '07',
    title: 'Support',
    description: 'Post-launch support, performance monitoring, and continuous improvements.',
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              What We <span className="gradient-text">Build</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
              Full-stack development, AI solutions, and growth marketing. We build digital products that scale. 
              From idea to production, we handle everything.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button variant="outline" size="lg">
                  See Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Comprehensive solutions for modern businesses. Click any service to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href}>
                  <Card glass premium className="h-full dark-surface dark-surface-hover transition-all group cursor-pointer border-white/[0.08] hover:border-accent/30">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-all group-hover:shadow-glow-purple">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl flex items-center justify-between">
                        {service.title}
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4">
                        {service.description}
                      </CardDescription>
                      <div className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground/60">
                            <div className="w-1 h-1 rounded-full bg-accent/50" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-accent/70 italic font-medium mt-4">
                        {service.tagline}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 lg:py-28 bg-surface-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Our <span className="gradient-text">Tech Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              We use battle-tested technologies that actually work in production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Object.entries(techStack).map(([category, technologies]) => (
              <Card key={category} glass premium className="dark-surface border-white/[0.08]">
                <CardHeader>
                  <CardTitle className="text-lg capitalize">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-accent/10 text-sm text-white/90 border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              How We <span className="gradient-text">Work</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Our proven process delivers results every time. From discovery to deployment and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow-purple mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground/80 text-sm leading-relaxed">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-accent/30 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-surface-dark">
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
