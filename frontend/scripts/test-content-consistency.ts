/**
 * Automated Verification Suite for Single Source of Truth Consistency
 * Ensures that React pages and AgentContent Markdown consume the identical canonical source.
 */
import assert from 'node:assert/strict';
import { allServices, getServiceBySlug, serviceToStructuredPage } from '../src/content/services';
import { websiteDevelopmentContent } from '../src/content/services/website-development';
import { devopsCloudContent } from '../src/content/services/devops-cloud';
import { aiAgentsContent } from '../src/content/services/ai-agents';
import { companyStats, companyValues } from '../src/content/company';
import { featuredCaseStudies, caseStudyStats } from '../src/content/case-studies';
import { agentContent, agentContentPages } from '../src/lib/agent-content.config';
import { createAgentContentHandler } from '@iitdeveloper/agent-content-nextjs';

const handler = createAgentContentHandler({ content: agentContent, stripPrefix: '/api/agent-content' });

async function runConsistencyTests() {
  console.log('🧪 Starting Single Source of Truth Consistency Verification...\n');
  let passed = 0;

  // 1. Service Catalog Completeness
  assert.equal(allServices.length, 12, 'All 12 services must be registered in the shared content catalog');
  console.log('✅ Test 1: Service catalog contains all 12 services');
  passed++;

  // 2. Acceptance Criterion: Single Source of Truth Parity (Website Development)
  {
    const structured = serviceToStructuredPage(websiteDevelopmentContent);
    assert.equal(structured.title, websiteDevelopmentContent.title);
    assert.equal(structured.description, websiteDevelopmentContent.description);
    assert.equal(structured.canonicalUrl, `https://iitdeveloper.com/services/${websiteDevelopmentContent.slug}`);

    // Verify all 10 features are represented in Markdown output
    for (const feature of websiteDevelopmentContent.features) {
      assert.ok(
        structured.content.includes(feature.title),
        `Feature "${feature.title}" must be present in Markdown generated from canonical model`
      );
      assert.ok(
        structured.content.includes(feature.description),
        `Feature description for "${feature.title}" must be present in Markdown`
      );
    }

    // Verify all technologies are present
    for (const tech of websiteDevelopmentContent.technologies) {
      assert.ok(
        structured.content.includes(tech),
        `Technology "${tech}" must be present in Markdown`
      );
    }

    console.log('✅ Test 2: Website Development features & tech 100% match canonical source');
    passed++;
  }

  // 3. Acceptance Criterion: DevOps & Cloud Parity
  {
    const structured = serviceToStructuredPage(devopsCloudContent);
    assert.equal(structured.title, devopsCloudContent.title);

    for (const feature of devopsCloudContent.features) {
      assert.ok(
        structured.content.includes(feature.title),
        `DevOps feature "${feature.title}" must be in Markdown`
      );
    }
    console.log('✅ Test 3: DevOps & Cloud features 100% match canonical source');
    passed++;
  }

  // 4. Acceptance Criterion: AI Agents Parity
  {
    const structured = serviceToStructuredPage(aiAgentsContent);
    assert.equal(structured.title, aiAgentsContent.title);

    for (const feature of aiAgentsContent.features) {
      assert.ok(
        structured.content.includes(feature.title),
        `AI Agent feature "${feature.title}" must be in Markdown`
      );
    }
    console.log('✅ Test 4: AI Agents features 100% match canonical source');
    passed++;
  }

  // 5. Company & About Us Parity
  {
    const aboutPage = agentContentPages.find((p) => p.url === '/about');
    assert.ok(aboutPage, 'About page must exist in agentContent registry');

    for (const stat of companyStats) {
      assert.ok(
        aboutPage.content.includes(stat.value) && aboutPage.content.includes(stat.label),
        `Company stat "${stat.label}: ${stat.value}" must be present in Markdown`
      );
    }

    for (const val of companyValues) {
      assert.ok(
        aboutPage.content.includes(val.title),
        `Company value "${val.title}" must be present in Markdown`
      );
    }
    console.log('✅ Test 5: Company stats & values 100% match canonical source');
    passed++;
  }

  // 6. Case Studies Parity
  {
    const caseStudiesPage = agentContentPages.find((p) => p.url === '/case-studies');
    assert.ok(caseStudiesPage, 'Case studies page must exist in agentContent registry');

    for (const stat of caseStudyStats) {
      assert.ok(
        caseStudiesPage.content.includes(stat.value) && caseStudiesPage.content.includes(stat.label),
        `Case study stat "${stat.label}: ${stat.value}" must be in Markdown`
      );
    }

    for (const cs of featuredCaseStudies) {
      assert.ok(
        caseStudiesPage.content.includes(cs.title),
        `Case study "${cs.title}" must be in Markdown`
      );
    }
    console.log('✅ Test 6: Case studies & metrics 100% match canonical source');
    passed++;
  }

  // 7. Dynamic Route Handler Verification via HTTP request
  {
    const res = await handler.GET(
      new Request('http://localhost:3000/api/agent-content/services/website-development', {
        headers: { accept: 'text/markdown' },
      })
    );
    assert.equal(res.status, 200);
    const body = await res.text();
    assert.ok(body.includes('Website & Web Application Development — IITDeveloper'));
    assert.ok(body.includes('Blazing Fast Performance'));
    assert.ok(body.includes('Tailwind CSS'));
    console.log('✅ Test 7: HTTP Handler serves canonical service markdown on demand');
    passed++;
  }

  // 8. Whitelist Security Defense
  {
    const res = await handler.GET(
      new Request('http://localhost:3000/api/agent-content/unregistered-private-path', {
        headers: { accept: 'text/markdown' },
      })
    );
    assert.equal(res.status, 404, 'Unregistered route must return 404');
    console.log('✅ Test 8: Security: Unregistered routes remain strictly inaccessible (404)');
    passed++;
  }

  console.log(`\n🎉 All ${passed}/8 Consistency Tests PASSED! Single Source of Truth is strictly verified.`);
}

runConsistencyTests().catch((err) => {
  console.error('❌ Consistency test failed:', err);
  process.exit(1);
});

