'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Layers, Pause, Play } from 'lucide-react';
import HeroFilm from './HeroFilm';

/** Additive illustration: none of the original homepage content lives here. */
export default function EngineeringLab() {
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const labRef = useRef<HTMLElement>(null);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const { scrollYProgress } = useScroll({ target: labRef, offset: ['start end', 'end start'] });
  const offset = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
  const y = useSpring(offset, { stiffness: 70, damping: 25, mass: 0.5 });

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1200px) and (prefers-reduced-motion: no-preference)');
    const update = () => setScrollEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <motion.aside ref={labRef} style={{ y: scrollEnabled && !paused ? y : 0 }} className={`engineering-lab${paused ? ' engineering-lab--paused' : ''}`} data-expanded={expanded} aria-labelledby="engineering-lab-title">
      <div className="engineering-lab__header">
        <span id="engineering-lab-title">Engineering lab</span>
        <span className="engineering-lab__status" aria-hidden="true"><i /> SYSTEM DESIGN</span>
      </div>
      <div id="hero-system-drawing"><HeroFilm paused={paused} aspectRatio={600 / 520} /></div>
      <div className="engineering-lab__controls">
      <div className="engineering-lab__interaction">
        <span>THE LIVING SYSTEM <span aria-hidden="true">↗</span></span>
        <button type="button" aria-controls="hero-system-drawing" aria-pressed={expanded} onClick={() => setExpanded(!expanded)}>
          <Layers size={14} aria-hidden="true" />
          {expanded ? 'Connect layers' : 'Separate layers'}
        </button>
      </div>
      <div className="engineering-lab__footer">
        <span>Ideas connected. Systems considered.</span>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Resume blueprint animation' : 'Pause blueprint animation'}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
      </div>
    </motion.aside>
  );
}
