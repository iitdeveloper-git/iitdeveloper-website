'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './ImpactTechnology.css';

const technologies = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'], code: 'UI / 01' },
  { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB'], code: 'API / 02' },
  { category: 'Cloud & DevOps', items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'], code: 'OPS / 03' },
  { category: 'AI & ML', items: ['OpenAI', 'Anthropic', 'LangChain', 'TensorFlow', 'PyTorch'], code: 'LAB / 04' },
];

function FrontendArtifact() {
  return <div className="tech-runway__artifact tech-runway__artifact--frontend" aria-hidden="true">
    <div className="tech-runway__browser-bar"><i /><i /><i /><span>product / responsive-system</span></div>
    <div className="tech-runway__interface">
      <div className="tech-runway__interface-nav"><b /><span /><span /><span /></div>
      <div className="tech-runway__interface-hero"><span /><strong /><em /></div>
      <div className="tech-runway__interface-grid"><i /><i /><i /></div>
      <div className="tech-runway__phone"><span /><b /><i /><i /></div>
    </div>
    <svg className="tech-runway__signal tech-runway__signal--frontend" viewBox="0 0 240 80" fill="none"><path d="M8 65C45 65 45 18 82 18S122 58 158 58s38-27 74-27" stroke="currentColor" strokeWidth="1"/><circle cx="82" cy="18" r="3" fill="currentColor"/><circle cx="158" cy="58" r="3" fill="currentColor"/></svg>
    <span className="tech-runway__artifact-note">responsive proof / 01</span>
  </div>;
}

function BackendArtifact() {
  return <div className="tech-runway__artifact tech-runway__artifact--backend" aria-hidden="true">
    <div className="tech-runway__spec-head"><span>REQUEST / RESPONSE</span><b>200 OK</b></div>
    <div className="tech-runway__code-sheet"><span>01</span><span>const route = async (req) =&gt; {'{'}</span><span>02&nbsp;&nbsp;const record = await db.query(</span><span>03&nbsp;&nbsp;&nbsp;&nbsp;SELECT * FROM services</span><span>04&nbsp;&nbsp;);</span><span>05&nbsp;&nbsp;return Response.json(record);</span><span>06 {'}'}</span></div>
    <div className="tech-runway__schema"><i /><i /><i /><span>data contract / stable</span></div>
    <svg className="tech-runway__signal tech-runway__signal--backend" viewBox="0 0 240 54" fill="none"><path d="M8 27h48m16 0h40m16 0h40m16 0h48" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4"/><rect x="56" y="18" width="16" height="18" stroke="currentColor"/><rect x="112" y="12" width="16" height="30" stroke="currentColor"/><rect x="168" y="18" width="16" height="18" stroke="currentColor"/></svg>
    <span className="tech-runway__artifact-note">architecture sheet / 02</span>
  </div>;
}

function CloudArtifact() {
  return <div className="tech-runway__artifact tech-runway__artifact--cloud" aria-hidden="true">
    <div className="tech-runway__cloud-label"><span>DEPLOYMENT PATH</span><b>LIVE</b></div>
    <div className="tech-runway__pipeline"><div><i />commit</div><span /><div><i />build</div><span /><div><i />ship</div></div>
    <div className="tech-runway__cloud-grid"><i /><i /><i /><i /><i /><i /></div>
    <div className="tech-runway__cloud-foot"><span>edge / region-01</span><span>uptime / monitored</span></div>
    <svg className="tech-runway__topology" viewBox="0 0 260 88" fill="none"><path d="M42 44h56m64 0h56M98 44l32-28m-32 28 32 28m32-28-32-28m32 28-32 28" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"/><rect x="18" y="33" width="24" height="22" rx="2" stroke="currentColor"/><rect x="98" y="33" width="32" height="22" rx="2" stroke="currentColor"/><rect x="160" y="33" width="32" height="22" rx="2" stroke="currentColor"/><rect x="216" y="33" width="24" height="22" rx="2" stroke="currentColor"/><circle cx="130" cy="16" r="5" fill="currentColor"/><circle cx="130" cy="72" r="5" fill="currentColor"/></svg>
    <span className="tech-runway__artifact-note">infrastructure blueprint / 03</span>
  </div>;
}

function AiArtifact() {
  return <div className="tech-runway__artifact tech-runway__artifact--ai" aria-hidden="true">
    <div className="tech-runway__lab-head"><span>MODEL INTEGRATION NOTES</span><b>R&amp;D / 04</b></div>
    <div className="tech-runway__lab-flow"><div><i />input</div><span /><div><i />context</div><span /><div><i />output</div></div>
    <div className="tech-runway__research"><span /><span /><span /><span /><span /><span /><span /><span /></div>
    <svg className="tech-runway__signal tech-runway__signal--ai" viewBox="0 0 260 74" fill="none"><path d="M10 62C38 18 63 52 88 28s49 16 71-7 52 18 91-10" stroke="currentColor" strokeWidth="1"/><path d="M10 18c37 30 52 5 82 30s47-17 76 2 55-12 82 7" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5"/><circle cx="88" cy="28" r="3" fill="currentColor"/><circle cx="159" cy="21" r="3" fill="currentColor"/></svg>
    <div className="tech-runway__lab-foot"><em>reasoning trace</em><b>•••</b></div>
    <span className="tech-runway__artifact-note">research study / 04</span>
  </div>;
}

function Artifact({ index }: { index: number }) {
  if (index === 0) return <FrontendArtifact />;
  if (index === 1) return <BackendArtifact />;
  if (index === 2) return <CloudArtifact />;
  return <AiArtifact />;
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={sectionRef} className={`tech-runway${reduceMotion ? ' tech-runway--reduced' : ''}`} aria-labelledby="technology-heading">
      <div className="tech-runway__stage">
        <div className="tech-runway__shell">
          <div className="tech-runway__header" aria-hidden="true"><span>05 / TECHNOLOGY RUNWAY</span><span>FOUR DISCIPLINES / ONE PRACTICE</span></div>
          <motion.div className="tech-runway__intro" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: .7 }}>
            <h2 id="technology-heading"><span>Built</span> With <span>Cutting-Edge Tech</span></h2>
            <div className="tech-runway__copy">
              <p>We don't chase trends. We master tools that solve real problems.</p>
              <p><em>Also, we Googled "best tech stack 2026" and this is what we found.</em></p>
            </div>
          </motion.div>

          <div className="tech-runway__viewport" aria-label="Technology exhibition">
            <motion.div className="tech-runway__track" style={reduceMotion ? undefined : { x }}>
              {technologies.map((tech, index) => (
                <article className={`tech-runway__scene tech-runway__scene--${index}`} key={tech.category}>
                  <div className="tech-runway__scene-meta"><span>0{index + 1} / 04</span><span>{tech.code}</span></div>
                  <div className="tech-runway__scene-body"><div className="tech-runway__scene-copy"><p className="tech-runway__scene-kicker">{tech.category}</p><h3>{tech.category}</h3><div className="tech-runway__items">{tech.items.map(item => <span key={item}>{item}</span>)}</div></div><Artifact index={index} /></div>
                </article>
              ))}
            </motion.div>
          </div>
          <p className="tech-runway__statement">And 50+ more technologies in our arsenal</p>
        </div>
      </div>
    </section>
  );
}
