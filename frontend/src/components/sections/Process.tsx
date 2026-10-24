'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FileSearch, Lightbulb, Code2, Rocket } from 'lucide-react';
import './ClosingSections.css';

const steps = [
  { number: '01', title: 'Discovery', description: 'We dig deep to understand your business, users, and goals. No assumptions, just facts.', icon: FileSearch },
  { number: '02', title: 'Strategy', description: 'Custom roadmap tailored to your needs. Architecture, timeline, and cost—all transparent.', icon: Lightbulb },
  { number: '03', title: 'Development', description: 'Agile sprints with weekly demos. You see progress, not excuses.', icon: Code2 },
  { number: '04', title: 'Launch & Scale', description: 'Smooth deployment, monitoring, and ongoing optimization. We stick around.', icon: Rocket },
];

function JourneyVisual({ index }: { index: number }) {
  if (index === 0) return <div className="journey__visual journey__visual--discovery" aria-hidden="true"><i /><i /><i /><span>brief</span><b>?</b></div>;
  if (index === 1) return <div className="journey__visual journey__visual--strategy" aria-hidden="true"><svg viewBox="0 0 180 70" fill="none"><path d="M8 56 55 14l34 26 40-28 42 20" stroke="currentColor" /><circle cx="55" cy="14" r="3" fill="currentColor" /><circle cx="129" cy="12" r="3" fill="currentColor" /></svg><span>direction / mapped</span></div>;
  if (index === 2) return <div className="journey__visual journey__visual--development" aria-hidden="true"><span>01</span><span>02</span><span>03</span><div /><div /><div /><b>ship / iterate / test</b></div>;
  return <div className="journey__visual journey__visual--launch" aria-hidden="true"><svg viewBox="0 0 180 70" fill="none"><path d="M12 58h154M28 47l28-23 28 12 38-22 30 8" stroke="currentColor" /><path d="m143 19 9 3-4 9" stroke="currentColor" /></svg><span>production / ongoing</span></div>;
}

export default function Process() {
  const reduced = useReducedMotion();
  return <section className="journey" aria-labelledby="process-heading">
    <div className="journey__shell">
      <motion.header className="journey__intro" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="closing-kicker">PROCESS / 07</span><h2 id="process-heading">How We <span>Get Shit Done</span></h2><p>AI agents that don&apos;t sleep, unlike your team. A process designed for speed and quality.</p>
      </motion.header>
      <div className="journey__rail" aria-label="Project journey">
        {steps.map(({ number, title, description, icon: Icon }, index) => <motion.article className="journey__chapter" key={number} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ delay: index * .08 }}>
          <div className="journey__chapter-top"><span>{number}</span><Icon aria-hidden="true" /></div><div className="journey__chapter-line" aria-hidden="true" /><JourneyVisual index={index} /><h3>{title}</h3><p>{description}</p>
        </motion.article>)}
      </div>
      <p className="journey__quote">&quot;From zero to production faster than your coffee gets cold.&quot;</p>
    </div>
  </section>;
}
