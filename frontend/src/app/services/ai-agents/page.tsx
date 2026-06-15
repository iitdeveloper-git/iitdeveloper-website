import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Bot, Brain, Clock, MessageSquare, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'AI Agents & Automation | Custom AI Solutions | IITDeveloper',
  description: 'Custom AI agents that automate workflows. Available 24/7, powered by GPT-4, Claude, and custom LLMs. Never need coffee breaks or vacations.',
  openGraph: {
    title: 'AI Agents & Automation | IITDeveloper',
    description: 'Intelligent agents that automate your workflows. Available 24/7, never need coffee breaks.',
    type: 'website',
  },
};

const features = [
  {
    icon: Bot,
    title: 'Custom AI Agents',
    description: 'Agents tailored to your business logic. Not generic chatbots.',
  },
  {
    icon: Brain,
    title: 'Multi-Model Support',
    description: 'GPT-4, Claude, Gemini, or custom models. Best tool for each task.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Works while you sleep. No sick days. No vacation requests.',
  },
  {
    icon: MessageSquare,
    title: 'Natural Conversations',
    description: 'Context-aware dialogue. Remembers conversations. Actually helpful.',
  },
  {
    icon: TrendingUp,
    title: 'Learning & Improvement',
    description: 'Gets smarter over time. Learns from interactions and feedback.',
  },
  {
    icon: Zap,
    title: 'Fast Integration',
    description: 'Plug into existing systems. APIs, webhooks, databases.',
  },
];

const technologies = [
  'OpenAI GPT-4', 'Claude 3.5', 'Google Gemini', 'LangChain',
  'Vector Databases', 'Pinecone', 'Weaviate', 'LlamaIndex',
  'Function Calling', 'RAG Systems', 'Fine-tuning', 'Prompt Engineering',
];

const processSteps = [
  {
    number: '01',
    title: 'Use Case Discovery',
    description: 'We identify repetitive tasks that AI can handle better than humans.',
  },
  {
    number: '02',
    title: 'Agent Design',
    description: 'Custom personality, knowledge base, and capabilities tailored to your needs.',
  },
  {
    number: '03',
    title: 'Model Selection',
    description: 'Choose the best LLM for your use case. Cost vs. capability optimization.',
  },
  {
    number: '04',
    title: 'Development & Training',
    description: 'Build the agent, train on your data, and fine-tune responses.',
  },
  {
    number: '05',
    title: 'Testing & Validation',
    description: 'Real-world testing with edge cases. Quality assurance before deployment.',
  },
  {
    number: '06',
    title: 'Deployment & Monitoring',
    description: 'Production deployment with performance monitoring and continuous improvement.',
  },
];

const pricing = [
  {
    tier: 'Basic Agent',
    price: 'From $10,000',
    description: 'Simple AI assistant for common use cases.',
    features: [
      'Single-purpose agent',
      'GPT-3.5 or Claude Haiku',
      'Basic knowledge base',
      'Web interface',
      '4-6 weeks delivery',
    ],
  },
  {
    tier: 'Smart Agent',
    price: 'From $30,000',
    description: 'Advanced AI agent with custom capabilities.',
    features: [
      'Multi-function agent',
      'GPT-4 or Claude Sonnet',
      'RAG with vector database',
      'API integrations',
      'Custom training data',
      '8-10 weeks delivery',
    ],
    popular: true,
  },
  {
    tier: 'Agent Ecosystem',
    price: 'From $75,000',
    description: 'Multiple specialized agents working together.',
    features: [
      'Agent orchestration',
      'Multi-model strategy',
      'Advanced function calling',
      'Enterprise integrations',
      'Dedicated support',
      '12+ weeks delivery',
    ],
  },
];

export default function AIAgentsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Bot className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">AI Agents</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Your New Employee <span className="gradient-text">Never Complains</span>
            </h1>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              Intelligent AI agents that automate your workflows. Available 24/7. Never need coffee breaks 
              or vacation days. Actually get things done.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/estimate">
                <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                  Get a Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  See Agent Demos
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
              AI Agents That <span className="gradient-text">Actually Work</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Not just chatbots. Intelligent agents that understand context and take action.
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
              Our <span className="gradient-text">AI Stack</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Latest models and frameworks. Production-ready AI infrastructure.
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
              How We <span className="gradient-text">Build AI Agents</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              From concept to production in weeks, not months.
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
              Fixed development costs. API usage billed separately.
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
                Ready to Build Your <span className="gradient-text">AI Agent</span>?
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-8 max-w-2xl mx-auto">
                Free consultation. We'll identify tasks AI can automate in your business.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/estimate">
                  <Button size="lg" className="shadow-premium hover:shadow-premium-lg">
                    Start Your AI Project
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to AI Expert
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
