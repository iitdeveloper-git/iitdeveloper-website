'use client';

import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import './ClosingSections.css';

const projects = [
  { name: 'DeployKit', flow: 'Build • Secure • Release • Deploy', code: 'WORKSHOP / 01', type: 'deploy', href: 'https://github.com/iitdeveloper-git/deploykit', image: '/open-source/deploykit-banner.png', description: 'Open-source CI/CD, security, release and deployment automation for GitHub Actions.' },
  { name: 'OpsPilot', flow: 'Monitor • Understand • Act', code: 'WORKSHOP / 02', type: 'ops', href: 'https://github.com/iitdeveloper-git/opspilot', image: '/open-source/opspilot-banner.png', description: 'Open-source infrastructure monitoring, secure ChatOps and automation for engineering teams.' },
  { name: 'LLM Bridge', flow: 'Connect • Translate • Integrate', code: 'WORKSHOP / 03', type: 'bridge', href: 'https://github.com/iitdeveloper-git/LLMBridge', description: 'An open-source VS Code extension for working across LLM providers through one developer workflow.' },
];

export default function OpenSourceHighlight() {
  const reduced = useReducedMotion();
  return <section className="workshop" aria-labelledby="oss-highlight-heading">
    <div className="workshop__shell">
      <motion.div className="workshop__intro" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="closing-kicker">BUILT IN PUBLIC / 06</span>
        <h2 id="oss-highlight-heading">The tools behind our engineering are <span>open source</span></h2>
        <p>We don&apos;t only deliver client projects. We build reusable infrastructure and automation tools for the engineering community.</p>
      </motion.div>
      <div className="workshop__exhibit">
        {projects.map((project, index) => <a href={project.href} target="_blank" rel="noopener noreferrer" className={`workshop__artifact workshop__artifact--${project.type}`} key={project.name}>
          <div className="workshop__artifact-head"><strong>{project.name}</strong><span>{project.code}</span></div>
          {project.description && <p className="workshop__artifact-description">{project.description}</p>}
          <div className="workshop__artifact-visual" aria-hidden="true">
            {project.image && <Image src={project.image} alt="" fill sizes="(max-width: 800px) 90vw, 45vw" className="workshop__artifact-image" />}
            {project.type === 'deploy' ? <><i /><i /><i /><b>deploy</b><span>→</span><small>BUILD</small><small>SECURE</small><small>SHIP</small><svg viewBox="0 0 280 120" fill="none"><path d="M24 83 91 38l65 34 91-47" stroke="currentColor" strokeDasharray="4 5"/><path d="m234 25 13 1-2 13" stroke="currentColor"/><circle cx="24" cy="83" r="4" fill="currentColor"/><circle cx="91" cy="38" r="4" fill="currentColor"/><circle cx="156" cy="72" r="4" fill="currentColor"/><circle cx="247" cy="25" r="4" fill="currentColor"/></svg></> : project.type === 'ops' ? <><div /><div /><div /><b>observe</b><span>⌁</span><small>ALERTS</small><small>SIGNAL</small><small>ACT</small><svg viewBox="0 0 280 120" fill="none"><path d="M12 75c26 0 22-48 51-48 24 0 19 58 48 58 30 0 28-38 55-38 28 0 22 40 55 40 20 0 23-16 47-16" stroke="currentColor"/><path d="M12 91h250" stroke="currentColor" strokeDasharray="2 6"/><circle cx="111" cy="85" r="4" fill="currentColor"/><circle cx="221" cy="87" r="4" fill="currentColor"/></svg></> : <div className="bridge-switchboard"><div className="bridge-switchboard__rail"><span>INPUT</span><i /><i /><i /><span>OUTPUT</span></div><div className="bridge-switchboard__gate"><b>LLM</b><strong>BRIDGE</strong><small>universal format</small></div><div className="bridge-switchboard__lanes"><span>OPENAI</span><span>ANTHROPIC</span><span>GEMINI</span></div><div className="bridge-switchboard__foot">route / translate / return</div></div>}
          </div>
          <div className="workshop__artifact-copy"><h3>{project.name}</h3><p>{project.flow}</p><ArrowUpRight aria-hidden="true" /></div>
        </a>)}
      </div>
      <div className="workshop__footer"><Link href="/open-source" className="closing-link">Explore IITDEVELOPER Open Source <ArrowUpRight aria-hidden="true" /></Link><a href="https://github.com/iitdeveloper-git" target="_blank" rel="noopener noreferrer" aria-label="IITDEVELOPER on GitHub" className="closing-social"><Github aria-hidden="true" /> GitHub / IITDEVELOPER</a></div>
    </div>
  </section>;
}
