/**
 * IITDEVELOPER Open Source — project data.
 * Every capability listed here is verified against the public repository
 * README at the time of writing. Roadmap items are explicitly flagged and
 * must never be presented as shipped.
 */

export interface OSSHighlight {
  label: string;
  /** true = shipped and documented in the current README, false = roadmap */
  shipped: boolean;
}

export interface OSSProject {
  slug: 'deploykit' | 'opspilot';
  name: string;
  tagline: string;
  category: string;
  description: string;
  positioning: string;
  githubOwner: string;
  githubRepo: string;
  githubUrl: string;
  /** Fallback license label shown if the live API can't be reached */
  fallbackLicense: string;
  highlights: OSSHighlight[];
  quickstart: {
    label: string;
    lang: string;
    code: string;
  };
  bannerImage: string;
}

export const ossProjects: OSSProject[] = [
  {
    slug: 'deploykit',
    name: 'DeployKit',
    tagline: 'CI/CD • DevSecOps • Automation',
    category: 'Build & Ship',
    description:
      'Open-source CI/CD, security, release and deployment automation for GitHub Actions. Build, test, secure, release and deploy without duplicating pipeline logic across repositories.',
    positioning:
      'Centralized, reusable GitHub Actions workflows so every repository inherits the same hardened, least-privilege pipeline instead of copy-pasted YAML.',
    githubOwner: 'iitdeveloper-git',
    githubRepo: 'deploykit',
    githubUrl: 'https://github.com/iitdeveloper-git/deploykit',
    fallbackLicense: 'MIT License',
    bannerImage: '/open-source/deploykit-banner.png',
    highlights: [
      { label: 'Reusable GitHub Actions workflows', shipped: true },
      { label: 'Node.js CI (lint, test, build)', shipped: true },
      { label: 'Python CI (lint, test, pytest)', shipped: true },
      { label: 'Multi-arch Docker build & publish', shipped: true },
      { label: 'Security scanning with Trivy', shipped: true },
      { label: 'Secure SSH/Docker Compose VPS deployment', shipped: true },
      { label: 'Health-check rollback protection', shipped: true },
      { label: 'Multi-channel notifications (Telegram, Slack, Teams, Discord, Webhook)', shipped: true },
      { label: 'Automated release publishing', shipped: true },
      { label: 'AutoDeploy AI agent skill', shipped: true },
    ],
    quickstart: {
      label: 'Add Python CI in one line',
      lang: 'yaml',
      code: `jobs:
  test:
    uses: iitdeveloper-git/deploykit/.github/workflows/python-ci.yml@v1
    with:
      python-version: '3.11'
      requirements-file: 'requirements.txt'
      run-lint: true
      run-test: true`,
    },
  },
  {
    slug: 'opspilot',
    name: 'OpsPilot',
    tagline: 'Infrastructure • ChatOps • AI Operations',
    category: 'Operate',
    description:
      'Open-source infrastructure monitoring, secure ChatOps and automation designed to help engineering teams observe systems, understand problems and safely take action.',
    positioning: 'Monitor → Understand → Act — an AI-assisted command center for infrastructure, operated safely from Telegram.',
    githubOwner: 'iitdeveloper-git',
    githubRepo: 'opspilot',
    githubUrl: 'https://github.com/iitdeveloper-git/opspilot',
    fallbackLicense: 'Apache License 2.0',
    bannerImage: '/open-source/opspilot-banner.png',
    highlights: [
      { label: 'Real-time CPU, RAM, disk and load monitoring', shipped: true },
      { label: 'Docker container health checks', shipped: true },
      { label: 'SSL certificate expiration checks', shipped: true },
      { label: 'Telegram ChatOps (/status, /ps, /logs, /restart)', shipped: true },
      { label: 'Zero-shell-injection safe command executor', shipped: true },
      { label: 'Pluggable AI diagnosis (OpenAI, Claude, Gemini, Ollama)', shipped: true },
      { label: 'Local JSONL audit trail for every action', shipped: true },
      { label: 'Opt-in disk auto-prune automation', shipped: true },
      { label: 'Scheduled backups via /backup', shipped: false },
      { label: 'Chat-triggered deployments via /deploy', shipped: false },
      { label: 'AI-driven root cause analysis workflow', shipped: false },
      { label: 'Role-based access control (RBAC)', shipped: false },
    ],
    quickstart: {
      label: 'Install and run',
      lang: 'bash',
      code: `git clone https://github.com/iitdeveloper-git/opspilot.git
cd opspilot
pip install -e ".[ai]"
opspilot start`,
    },
  },
];

export const ossPrinciples = [
  {
    title: 'Built from real problems',
    description: 'Tools originate from engineering problems we encounter ourselves — not roadmap guesses.',
  },
  {
    title: 'Secure by default',
    description: 'Least privilege, predictable automation and explicit safety boundaries, not bolted-on afterthoughts.',
  },
  {
    title: 'Reusable over repetitive',
    description: 'Shared engineering primitives instead of copying infrastructure code between projects.',
  },
  {
    title: 'Community driven',
    description: 'Issues, ideas, pull requests and technical feedback are welcome and reviewed.',
  },
] as const;
