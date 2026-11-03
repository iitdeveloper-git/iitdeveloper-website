import type { ServiceContent } from '../schema';

export const aiAgentsContent: ServiceContent = {
  slug: 'ai-agents',
  title: 'AI Agents & Automation — IITDeveloper',
  shortTitle: 'AI Agents',
  metaTitle: 'AI Agents & Automation Services | Intelligent Systems | IITDeveloper',
  description: 'Custom AI agents that automate complex workflows. Autonomous, intelligent, and available 24/7. Built with modern LLMs and agent frameworks.',
  metaDescription: 'Custom AI agents that automate complex workflows. Autonomous, intelligent, and available 24/7. Built with modern LLMs and agent frameworks.',
  category: 'AI',
  badge: 'AI Agents',
  heroHeadline: 'Your New Employee',
  heroHighlight: "Doesn't Need Coffee Breaks.",
  heroSubtitle: 'Autonomous AI agents that handle repetitive tasks, customer inquiries, and complex workflows. 24/7. Zero complaints.',
  features: [
    {
      iconName: 'Bot',
      title: 'Custom AI Agents',
      description: 'Agents tailored to your business logic. Not generic chatbots.',
    },
    {
      iconName: 'Brain',
      title: 'Multi-Model Support',
      description: 'GPT-4, Claude, Gemini, or custom models. Best tool for each task.',
    },
    {
      iconName: 'Clock',
      title: '24/7 Availability',
      description: 'Works while you sleep. No sick days. No vacation requests.',
    },
    {
      iconName: 'MessageSquare',
      title: 'Natural Conversations',
      description: 'Context-aware dialogue. Remembers conversations. Actually helpful.',
    },
    {
      iconName: 'TrendingUp',
      title: 'Learning & Improvement',
      description: 'Gets smarter over time. Learns from interactions and feedback.',
    },
    {
      iconName: 'Zap',
      title: 'Fast Integration',
      description: 'Plug into existing systems. APIs, webhooks, databases.',
    },
  ],
  technologies: [
    'OpenAI GPT-4', 'Claude 3.5', 'Google Gemini', 'LangChain',
    'Vector Databases', 'Pinecone', 'Weaviate', 'LlamaIndex',
    'Function Calling', 'RAG Systems', 'Fine-tuning', 'Prompt Engineering',
  ],
  processSteps: [
    {
      number: '01',
      title: 'Use Case Discovery',
      description: 'We identify repetitive tasks that AI can handle better than humans.',
    },
    {
      number: '02',
      title: 'Agent Architecture',
      description: 'Design the agent logic, knowledge base, and integration points.',
    },
    {
      number: '03',
      title: 'Development & Training',
      description: 'Build the agent, configure prompts, and connect to your data sources.',
    },
    {
      number: '04',
      title: 'Testing & Refinement',
      description: 'Rigorous testing with edge cases and unexpected inputs.',
    },
    {
      number: '05',
      title: 'Deployment & Monitoring',
      description: 'Launch the agent with full monitoring, analytics, and fallback mechanisms.',
    },
    {
      number: '06',
      title: 'Continuous Learning',
      description: 'Regular updates and improvements based on real conversation data.',
    },
  ],
  ctaHeadline: 'Ready to Automate with AI?',
  ctaSubtitle: 'Free consultation. We explore how AI agents can save your team 20+ hours a week.',
};

