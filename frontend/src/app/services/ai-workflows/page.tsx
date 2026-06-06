import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Workflow, Cpu, Zap, GitBranch, Database, Lock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Workflows & LLM Integration | Custom Automation | IITDeveloper',
  description: 'Custom LLM integrations and AI automation systems. MCP protocols, intelligent pipelines, and workflow automation that scales.',
  openGraph: {
    title: 'AI Workflows & Integration | IITDeveloper',
    description: 'Custom LLM integrations and automation systems. MCP protocols and intelligent pipelines.',
    type: 'website',
  },
};

const features = [
  {
    icon: Workflow,
    title: 'Custom Workflows',
    description: 'Automated workflows tailored to your business processes. No generic templates.',
  },
  {
    icon: Cpu,
    title: 'LLM Integration',
    description: 'Seamless integration with OpenAI, Anthropic, and custom models.',
  },
  {
    icon: GitBranch,
    title: 'MCP Protocols',
    description: 'Model Context Protocol implementations for advanced agent communication.',
  },
  {
    icon: Database,
    title: 'Data Pipelines',
    description: 'Intelligent data processing pipelines with AI at every step.',
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Stream processing and real-time AI decision making.',
  },
  {
    icon: Lock,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security. Your data stays your data.',
  },
];

const technologies = [
  'LangChain', 'LlamaIndex', 'MCP Protocol', 'OpenAI APIs',
  'Anthropic Claude', 'Vector Stores', 'Redis', 'Kafka',
  'Airflow', 'Prefect', 'n8n', 'Make.com',
];

const processSteps = [
  {
    number: '01',
    title: 'Process Mapping',
    description: 'We map your current workflows and identify automation opportunities.',
  },
  {
    number: '02',
    title: 'AI Strategy',
    description: 'Design intelligent workflows with the right AI models for each task.',
  },
  {
    number: '03',
    title: 'Pipeline Design',
    description: 'Data flow architecture with error handling and monitoring.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'Build custom integrations, connectors, and automation logic.',
  },
  {
    number: '05',
    title: 'Testing & Optimization',
    description: 'Stress testing, performance tuning, and quality validation.',
  },
  {
    number: '06',
    title: 'Deployment & Scale',
    description: 'Production deployment with monitoring and continuous optimization.',
  },
];

const pricing = [
  {
    tier: 'Simple Workflow',
    price: 'From $8,000',
    description: 'Single workflow automation with AI enhancement.',
    features: [
      'Single-purpose workflow',
      'Basic LLM integration',
      'Standard connectors',
      'Documentation',
      '3-4 weeks delivery',
    ],
  },
  {
    tier: 'Smart Pipeline',
    price: 'From $25,000',
    description: 'Complex multi-step workflows with advanced AI.',
    features: [
      'Multi-stage pipelines',
      'Advanced LLM integration',
      'Custom connectors',
      'Error handling & retries',
      'Monitoring dashboards',
      '6-8 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Enterprise Automation',
    price: 'From $60,000',
    description: 'Complete workflow automation ecosystem.',
    features: [
      'Full automation suite',
      'MCP protocol implementation',
      'Multi-model orchestration',
      'Enterprise integrations',
      'Dedicated support',
      '12+ weeks delivery',
    ],
  },
];

export default function AIWorkflowsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Workflow className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI Workflows</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Teaching AI to Do <span className="gradient-text">Your Job</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Custom LLM integrations and automation systems. MCP protocols and intelligent pipelines 
              that handle complex workflows. But don't worry, you're still needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  See Workflow Examples
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
              Workflows That <span className="gradient-text">Think</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Intelligent automation that handles complex decisions, not just simple if/then rules.
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
              Our <span className="gradient-text">Automation Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Best-in-class tools for building intelligent automation systems.
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
              From Manual to <span className="gradient-text">Automated</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Our proven process for building intelligent automation systems.
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
              Fixed development costs. API costs billed separately.
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
                Ready to Automate Your <span className="gradient-text">Workflows</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Free workflow audit. We'll show you what can be automated right now.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Start Automation Project
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to Automation Expert
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
