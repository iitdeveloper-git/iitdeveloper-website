import { createLlmsFullTxtHandler } from '@iitdeveloper/agent-content-nextjs';
import { agentContent } from '@/lib/agent-content.config';

export const dynamic = 'force-dynamic';

export const { GET, HEAD } = createLlmsFullTxtHandler(agentContent);

