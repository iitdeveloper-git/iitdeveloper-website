'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import './ClosingSections.css';

const testimonials = [
  { name: 'Devendra Kumar', role: 'CTO, Educare', content: 'Our online visibility was completely changed by IIT DEVELOPER thanks to their excellent software development, web and UI/UX design, and digital marketing techniques. Our dependable partner for all our tech needs, their team\'s skill and inventiveness are evident.', image: '/testimonials-devendra.png' },
  { name: 'Kshitij Chauhan', role: 'Manager, NIIT', content: 'We have had an outstanding experience working with IIT DEVELOPER. Their exact software development, innovative web and UI/UX design, and digital marketing methods have continuously surpassed our expectations. They are our first choice in technology partners.', image: '/testimonials-kshitij.png' },
  { name: 'Nishant', role: 'Product Manager', content: 'IIT DEVELOPER is amazing! Our online game is strong because of their digital marketing methods. Like tech geniuses, the software development team just gets things. The UI/UX and web design teams are another story altogether. Our website has never looked better!', image: '/testimonials-nishant.png' },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = testimonials[active];
  return <section className="voices" aria-labelledby="testimonials-heading">
    <div className="voices__shell">
      <motion.header className="voices__intro" initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}><span className="closing-kicker">CLIENT VOICES / 08</span><h2 id="testimonials-heading">Don&apos;t Take Our <span>Word</span> For It</h2><p>Real results from real clients. No fluff, just facts.</p></motion.header>
      <div className="voices__layout">
        <motion.article className="voices__feature" key={current.name} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
          <span className="voices__quote-mark">“</span><blockquote>&quot;{current.content}&quot;</blockquote>
          <div className="voices__attribution"><Image src={current.image} alt={current.name} width={64} height={64} /><div><strong>{current.name}</strong><span>{current.role}</span><div className="voices__stars" aria-label="5 out of 5 stars">{[1,2,3,4,5].map(i => <Star key={i} aria-hidden="true" />)}</div></div></div>
        </motion.article>
        <div className="voices__index" role="tablist" aria-label="Client testimonials">{testimonials.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={active === index} aria-controls={`testimonial-${index}`} onClick={() => setActive(index)} className={active === index ? 'is-active' : ''}><span>0{index + 1}</span><strong>{item.name}</strong><small>{item.role}</small><em>{item.content}</em></button>)}</div>
      </div>
      <div className="voices__metrics">{[['4.9/5','Client Rating'],['98%','Retention Rate'],['2.5x','Avg ROI'],['100+','Projects']].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </div>
  </section>;
}
