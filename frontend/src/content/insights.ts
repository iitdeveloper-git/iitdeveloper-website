export type Insight = {
  slug: string;
  title: string;
  summary: string;
  published: string;
  updated: string;
  readingTime: string;
  sections: { heading: string; paragraphs: string[] }[];
  relatedService: string;
};

export const insights: Insight[] = [
  {
    slug: 'geo-vs-seo-ai-search',
    title: 'GEO vs SEO: What Actually Changes in AI Search?',
    summary: 'SEO remains the foundation. GEO adds clearer entities, evidence, answer-ready structure, and measurement for generative discovery experiences.',
    published: '2026-06-25',
    updated: '2026-06-25',
    readingTime: '6 min read',
    relatedService: '/services/seo-geo-ai-visibility',
    sections: [
      {
        heading: 'SEO is not being replaced',
        paragraphs: [
          'Technical SEO still determines whether content can be crawled, indexed, understood, and discovered. Generative systems often depend on the same public web ecosystem.',
          'GEO focuses on making a brand and its expertise easier to retrieve and represent accurately through clear entities, direct answers, supporting evidence, and consistent source information.',
        ],
      },
      {
        heading: 'What changes in practice',
        paragraphs: [
          'Teams should invest in original examples, strong author context, explicit definitions, useful comparisons, structured data that matches visible content, and pages that answer real decision questions.',
          'No ethical practitioner can guarantee inclusion in an AI answer. The practical goal is to improve clarity, authority, retrievability, and measurement.',
        ],
      },
    ],
  },
  {
    slug: 'valuable-ai-automation-use-case',
    title: 'How to Identify a Valuable AI Automation Use Case',
    summary: 'Start with repetitive, measurable work and a safe review path—not with a model or a fashionable agent framework.',
    published: '2026-06-25',
    updated: '2026-06-25',
    readingTime: '5 min read',
    relatedService: '/services/ai-automation',
    sections: [
      {
        heading: 'Look for operational friction',
        paragraphs: [
          'Strong candidates have repeated inputs, a recognizable decision pattern, costly delays, and an outcome that can be checked. Document intake, support triage, knowledge retrieval, and structured drafting are common examples.',
          'Avoid starting with high-risk decisions that have weak data, no accountable owner, or no reliable way to evaluate quality.',
        ],
      },
      {
        heading: 'Define the human role',
        paragraphs: [
          'Production automation needs explicit review boundaries. Decide what the system may suggest, what it may execute, what requires approval, and how failures are surfaced.',
          'A useful pilot measures time saved, correction rate, completion rate, latency, and the cost of operating the workflow.',
        ],
      },
    ],
  },
  {
    slug: 'production-ready-rag-system',
    title: 'Building a Production-Ready RAG System',
    summary: 'Reliable retrieval requires more than embeddings: source quality, access control, evaluation, observability, and update workflows matter just as much.',
    published: '2026-06-25',
    updated: '2026-06-25',
    readingTime: '7 min read',
    relatedService: '/services/ai-automation',
    sections: [
      {
        heading: 'Treat retrieval as a system',
        paragraphs: [
          'A production RAG system needs ingestion, chunking, metadata, permissions, retrieval, reranking, prompting, citations, evaluation, and monitoring. Each stage can change the final answer.',
          'The source corpus should have owners, freshness rules, and deletion behavior. Sensitive documents must follow the same access boundaries as the systems they came from.',
        ],
      },
      {
        heading: 'Evaluate before scaling',
        paragraphs: [
          'Build a representative question set and measure retrieval relevance, groundedness, answer usefulness, and abstention behavior. Review failures by category instead of relying on a single aggregate score.',
          'Launch with observable traces and a feedback path so the team can distinguish model failures from retrieval, data, or product-design failures.',
        ],
      },
    ],
  },
];

