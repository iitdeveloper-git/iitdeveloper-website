import type { ServiceContent } from '../schema';

export const aiWorkflowsContent: ServiceContent = {
  slug: 'ai-workflows',
  title: 'AI Workflows & LLM Integration — IITDeveloper',
  shortTitle: 'AI Workflows',
  metaTitle: 'AI Workflows & LLM Integration | Custom Automation | IITDeveloper',
  description: 'Custom LLM integrations and AI automation systems. MCP protocols, intelligent pipelines, and workflow automation that scales.',
  metaDescription: 'Custom LLM integrations and AI automation systems. MCP protocols, intelligent pipelines, and workflow automation that scales.',
  category: 'AI',
  badge: 'AI Workflows',
  heroHeadline: 'Teaching AI to Do Your Job.',
  heroHighlight: "You're Still Needed.",
  heroSubtitle: 'Custom LLM integrations and automation systems. Connect AI to your databases, tools, and team workflows.',
  features: [
    {
      iconName: 'Workflow',
      title: 'Custom Workflows',
      description: 'Automated workflows tailored to your business processes. No generic templates.',
    },
    {
      iconName: 'Cpu',
      title: 'LLM Integration',
      description: 'Seamless integration with OpenAI, Anthropic, and custom models.',
    },
    {
      iconName: 'GitBranch',
      title: 'MCP Protocols',
      description: 'Model Context Protocol implementations for advanced agent communication.',
    },
    {
      iconName: 'Database',
      title: 'Data Pipelines',
      description: 'Intelligent data processing pipelines with AI at every step.',
    },
    {
      iconName: 'Zap',
      title: 'Real-Time Processing',
      description: 'Stream processing and real-time AI decision making.',
    },
    {
      iconName: 'Lock',
      title: 'Secure & Compliant',
      description: 'Enterprise-grade security. Your data stays your data.',
    },
  ],
  technologies: [
    'LangChain', 'LlamaIndex', 'MCP Protocol', 'OpenAI APIs',
    'Anthropic Claude', 'Vector Stores', 'Redis', 'Kafka',
    'Airflow', 'Prefect', 'n8n', 'Make.com',
  ],
  processSteps: [
    {
      number: '01',
      title: 'Process Mapping',
      description: 'We map your existing business workflows and identify AI automation opportunities.',
    },
    {
      number: '02',
      title: 'Pipeline Architecture',
      description: 'Design secure, high-throughput LLM pipelines and tool integration schemas.',
    },
    {
      number: '03',
      title: 'Model Orchestration',
      description: 'Connect vector stores, RAG retrieval engines, and fine-tuned prompts.',
    },
    {
      number: '04',
      title: 'Verification & Guardrails',
      description: 'Implement content safety guardrails, rate-limiters, and output validation.',
    },
    {
      number: '05',
      title: 'Production Rollout',
      description: 'Deploy resilient pipelines with end-to-end telemetry and token tracking.',
    },
  ],
  ctaHeadline: 'Ready to Supercharge Your Workflows with AI?',
  ctaSubtitle: 'Schedule a discovery session to map your business processes to intelligent automated pipelines.',
};

