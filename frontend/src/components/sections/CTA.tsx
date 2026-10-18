'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import './ClosingSections.css';

export default function CTA() {
  const reduced = useReducedMotion();
  return <section className="invitation" aria-labelledby="cta-heading"><div className="invitation__shell">
    <motion.div className="invitation__body" initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}>
      <span className="closing-kicker">NEXT / 09</span><h2 id="cta-heading">Ready to Build Something <span>Legendary?</span></h2><p>Book a free consultation. No sales pitch. Just honest advice.</p><p className="invitation__aside">⚡ PS: Our AI responds faster than your last dev team&apos;s Slack messages.</p>
      <Link href="/contact"><Button variant="neon" size="xl" className="invitation__button">Book Free Consultation <ArrowRight aria-hidden="true" /></Button></Link>
      <p className="invitation__tagline">&quot;We automate things… including your headaches.&quot;</p>
    </motion.div>
    <div className="invitation__trust"><span>⚡ Fast Turnaround</span><span>💯 Quality Guaranteed</span><span>🔒 NDA Protected</span><span>🚀 Scale-Ready</span><span>24/7 Support</span></div>
  </div></section>;
}
