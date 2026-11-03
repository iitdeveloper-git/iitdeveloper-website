/**
 * Automated Verification Suite for IITDeveloper AgentContent Integration
 */
import assert from 'node:assert/strict';
import { shouldRewriteToMarkdown } from '@iitdeveloper/agent-content-nextjs/proxy';
import { createAgentContentHandler, createLlmsTxtHandler, createLlmsFullTxtHandler } from '@iitdeveloper/agent-content-nextjs';
import { agentContent } from '../src/lib/agent-content.config.ts';

const handler = createAgentContentHandler({ content: agentContent, stripPrefix: '/api/agent-content' });
const llmsHandler = createLlmsTxtHandler(agentContent);
const llmsFullHandler = createLlmsFullTxtHandler(agentContent);

async function runTests() {
  console.log('🧪 Running AgentContent Automated Test Suite...\n');
  let passed = 0;

  // 1. Content Negotiation - Browser defaults to HTML
  {
    const req = {
      url: 'https://iitdeveloper.com/services/website-development',
      headers: { get: (h) => (h.toLowerCase() === 'accept' ? 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' : null) },
    };
    const decision = shouldRewriteToMarkdown(req);
    assert.equal(decision.rewrite, false, 'Standard browser request must NOT rewrite to markdown');
    console.log('✅ Test 1: Standard browser Accept header defaults to HTML');
    passed++;
  }

  // 2. Content Negotiation - AI Agent requesting text/markdown
  {
    const req = {
      url: 'https://iitdeveloper.com/services/website-development',
      headers: { get: (h) => (h.toLowerCase() === 'accept' ? 'text/markdown' : null) },
    };
    const decision = shouldRewriteToMarkdown(req);
    assert.equal(decision.rewrite, true, 'Accept: text/markdown must trigger rewrite');
    assert.equal(decision.shouldVaryAccept, true, 'Vary: Accept must be signaled');
    assert.equal(decision.rewritePath, '/api/agent-content/services/website-development');
    console.log('✅ Test 2: Accept: text/markdown rewrites to agent-content handler with Vary: Accept');
    passed++;
  }

  // 3. Content Negotiation - q-values: HTML preferred over Markdown
  {
    const req = {
      url: 'https://iitdeveloper.com/about',
      headers: { get: (h) => (h.toLowerCase() === 'accept' ? 'text/html;q=0.9,text/markdown;q=0.5' : null) },
    };
    const decision = shouldRewriteToMarkdown(req);
    assert.equal(decision.rewrite, false, 'When HTML q-value > Markdown q-value, default to HTML');
    console.log('✅ Test 3: RFC 9111 q-values: HTML preferred over Markdown');
    passed++;
  }

  // 4. Content Negotiation - q-values: Markdown explicitly higher
  {
    const req = {
      url: 'https://iitdeveloper.com/about',
      headers: { get: (h) => (h.toLowerCase() === 'accept' ? 'text/markdown;q=0.9,text/html;q=0.5' : null) },
    };
    const decision = shouldRewriteToMarkdown(req);
    assert.equal(decision.rewrite, true, 'When Markdown q-value > HTML q-value, rewrite to Markdown');
    console.log('✅ Test 4: RFC 9111 q-values: Markdown preferred when q is higher');
    passed++;
  }

  // 5. Access Method: .md extension suffix
  {
    const req = {
      url: 'https://iitdeveloper.com/services/website-development.md',
      headers: { get: () => null },
    };
    const decision = shouldRewriteToMarkdown(req);
    assert.equal(decision.rewrite, true, '.md extension must trigger rewrite');
    assert.equal(decision.rewritePath, '/api/agent-content/services/website-development.md');

    // Test handler response
    const res = await handler.GET(new Request('http://localhost:3000/api/agent-content/services/website-development.md'));
    assert.equal(res.status, 200, 'Handler must return HTTP 200 for .md path');
    assert.ok(res.headers.get('content-type')?.includes('text/markdown'));
    const body = await res.text();
    assert.ok(body.includes('Website & Web Application Development'), 'Body must contain service content');
    console.log('✅ Test 5: .md URL extension resolves to structured Markdown');
    passed++;
  }

  // 6. Access Method: ?format=md query parameter
  {
    const req = {
      url: 'https://iitdeveloper.com/case-studies?format=md',
      headers: { get: () => null },
    };
    const decision = shouldRewriteToMarkdown(req);
    assert.equal(decision.rewrite, true, '?format=md must trigger rewrite');

    const res = await handler.GET(new Request('http://localhost:3000/api/agent-content/case-studies?format=md'));
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.ok(body.includes('BiteBreak'), 'Body must contain case studies content');
    console.log('✅ Test 6: ?format=md query parameter resolves to structured Markdown');
    passed++;
  }

  // 7. Root Path / resolution with Accept: text/markdown
  {
    const res = await handler.GET(new Request('http://localhost:3000/api/agent-content', {
      headers: { accept: 'text/markdown' }
    }));
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.ok(body.includes('IITDeveloper — Digital Engineering Studio'), 'Root / must return homepage content');
    console.log('✅ Test 7: Root path / returns homepage structured Markdown');
    passed++;
  }

  // 8. Security & Whitelisting: Unknown path returns 404
  {
    const res = await handler.GET(new Request('http://localhost:3000/api/agent-content/non-existent-secret-page'));
    assert.equal(res.status, 404, 'Unknown path must return HTTP 404');
    console.log('✅ Test 8: Security: Non-whitelisted route returns HTTP 404');
    passed++;
  }

  // 9. Security: Directory traversal attack rejection
  {
    const res = await handler.GET(new Request('http://localhost:3000/api/agent-content/../../etc/passwd'));
    assert.ok(res.status === 400 || res.status === 404, 'Path traversal must be rejected with 400 or 404');
    console.log('✅ Test 9: Security: Path traversal rejected');
    passed++;
  }

  // 10. Cache Headers & ETag verification
  {
    const res = await handler.GET(new Request('http://localhost:3000/api/agent-content/about', {
      headers: { accept: 'text/markdown' }
    }));
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('etag'), 'ETag header must be present');
    assert.ok(res.headers.get('cache-control')?.includes('max-age=3600'), 'Cache-Control max-age must be set');
    console.log('✅ Test 10: CDN Caching: ETag and Cache-Control headers verified');
    passed++;
  }

  // 11. Discovery: /llms.txt handler
  {
    const res = await llmsHandler.GET(new Request('http://localhost:3000/llms.txt'));
    assert.equal(res.status, 200);
    assert.ok(res.headers.get('content-type')?.includes('text/plain'));
    const body = await res.text();
    assert.ok(body.includes('# IITDeveloper'), 'llms.txt must have site header');
    assert.ok(body.includes('## Services'), 'llms.txt must have Services section');
    console.log('✅ Test 11: Discovery: /llms.txt returns valid llmstxt.org specification');
    passed++;
  }

  // 12. Discovery: /llms-full.txt handler
  {
    const res = await llmsFullHandler.GET(new Request('http://localhost:3000/llms-full.txt'));
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.ok(body.length > 5000, 'llms-full.txt must aggregate full documentation');
    console.log('✅ Test 12: Discovery: /llms-full.txt returns full aggregated documentation');
    passed++;
  }

  console.log(`\n🎉 All ${passed}/12 tests passed successfully!`);
}

runTests().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
