import { createLlmsTxtHandler } from '@iitdeveloper/agent-content-nextjs';
import { agentContent } from '@/lib/agent-content.config';

export const dynamic = 'force-dynamic';

export const { GET, HEAD } = createLlmsTxtHandler(agentContent);

