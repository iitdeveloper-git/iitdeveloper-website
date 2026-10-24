'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Code, Bot, ShoppingBag, TrendingUp, Palette, Workflow, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import ServicePinboard from './ServicePinboard';
import './ServicesShowcase.css';

// Only 6 flagship services on the home page — one per major category.
// Full list lives at /services.
const services = [
  {
    icon: Code,
    title: 'Website & App Development',
    description: 'Custom web and mobile apps built with modern frameworks. Fast, scalable, and conversion-focused.',
    tagline: '💻 We turn caffeine into code. Actually tested on real users.',
    category: 'Build',
    categoryColor: 'primary',
    href: '/services/website-development',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent agents that automate your workflows. Available 24/7, never need coffee breaks.',
    tagline: '🤖 Your new employee. Doesn\'t complain. Doesn\'t take vacations.',
    category: 'AI',
    categoryColor: 'secondary',
    href: '/services/ai-agents',
  },
  {
    icon: Workflow,
    title: 'AI Workflows',
    description: 'Custom LLM integrations and automation systems. MCP protocols and intelligent pipelines.',
    tagline: '🧠 Teaching AI to do your job. But don\'t worry, you\'re still needed.',
    category: 'AI',
    categoryColor: 'secondary',
    href: '/services/ai-workflows',
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Store',
    description: 'Custom Shopify stores built to convert. Theme design, payment setup, app integrations, and full launch support.',
    tagline: '🛍️ Your store live in weeks. Designed to sell from day one.',
    category: 'Commerce',
    categoryColor: 'primary',
    href: '/services/shopify-store',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Data-driven campaigns that convert. PPC, social ads, and conversion optimization.',
    tagline: '📈 Stop burning money. Start burning competitors.',
    category: 'Grow',
    categoryColor: 'secondary',
    href: '/services/marketing',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Visual identity, motion graphics, and multimedia design. Posters, banners, videos, and After Effects.',
    tagline: '🎨 Design so good, your competitors will think you hired someone expensive.',
    category: 'Design',
    categoryColor: 'secondary',
    href: '/services/graphic-design',
  },
];

function ServiceChapter({ service, index, active }: { service: typeof services[number]; index: number; active: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const x = useTransform(scrollYProgress, [0, 1], index % 2 ? [-10, 10] : [10, -10]);
  const settle = useTransform(scrollYProgress, [0, 0.24, 0.72, 1], [0.96, 1, 1, 0.96]);
  const panelY = useTransform(scrollYProgress, [0, 0.24, 0.72, 1], [22, 0, 0, -10]);
  const Icon = service.icon;
  return (
    <motion.article ref={ref} style={{ scale: reducedMotion ? 1 : settle, y: reducedMotion ? 0 : panelY }} id={`service-chapter-${index + 1}`} className="service-chapter" data-chapter-index={index} data-active={active} aria-labelledby={`service-title-${index + 1}`}>
      <Link href={service.href} className="service-chapter__link">
        <div className="service-chapter__meta">
          <span className="service-chapter__number" aria-hidden="true">0{index + 1} / 06</span>
          <span className={service.categoryColor === 'primary' ? 'text-primary' : 'text-secondary'}><Icon size={18} aria-hidden="true" />{service.category}</span>
          <ArrowRight size={20} className="service-chapter__arrow" aria-hidden="true" />
        </div>
        <div className={`service-chapter__art service-chapter__art--${index + 1}`}>
          <div className="service-chapter__wash bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" aria-hidden="true" />
          <motion.div style={{ y: reducedMotion ? 0 : y, x: reducedMotion ? 0 : x }} className="service-chapter__drawing">
            <ServicePinboard variant={index} />
          </motion.div>
          <span className="service-chapter__plate" aria-hidden="true">IIT / {String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="service-chapter__copy">
          <h3 id={`service-title-${index + 1}`}>{service.title}</h3>
          <p className="service-chapter__description">{service.description}</p>
          <p className="service-chapter__tagline">{service.tagline}</p>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useEffect(() => {
    const chapters = ref.current?.querySelectorAll<HTMLElement>('.service-chapter');
    if (!chapters) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.chapterIndex);
      if (!Number.isNaN(index)) setActive(current => current === index ? current : index);
    }, { rootMargin: '-34% 0px -48% 0px', threshold: [0, 0.2, 0.5, 0.8, 1] });
    chapters.forEach(chapter => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="services-showcase" aria-labelledby="services-heading">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>
      <div className="services-shell">
        <div className="services-edition"><span>WHAT WE DO</span><span aria-hidden="true">02 / CAPABILITIES IN PRACTICE</span></div>
        <motion.div
          className="services-introduction-block"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="services-gallery-name">THE SERVICES GALLERY</p>
          <h2 id="services-heading"><span className="text-secondary">Services</span> That <span className="gradient-text">Actually Work</span></h2>
          <p className="services-introduction">We automate things… including your headaches. Full-stack development, AI solutions, and marketing that scales.</p>
        </motion.div>
        <div className="engineering-blueprint">
          <div className="engineering-blueprint__head">
            <span>ENGINEERING BLUEPRINT</span>
            <span aria-hidden="true">ACTIVE SYSTEM / 0{active + 1}</span>
          </div>
          <div className="services-chapters">
            {services.map((service, index) => <ServiceChapter key={service.href} service={service} index={index} active={active === index} />)}
          </div>
        </div>
        <div className="services-index">
          <div className="services-index__header">
            <p className="services-current" aria-live="polite"><span>0{active + 1}</span> / 06</p>
            <div className="services-progress" aria-hidden="true"><motion.span style={{ scaleX: scrollYProgress }} /></div>
          </div>
          <nav className="services-navigation" aria-label="Service chapters">
            {services.map((service, index) => (
              <a key={service.href} href={`#service-chapter-${index + 1}`} onClick={() => setActive(index)} aria-current={active === index ? 'location' : undefined}>
                <span aria-hidden="true">0{index + 1}</span><span>{service.title}</span><ArrowRight size={14} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
        <div className="services-outro">
          <div className="services-outro__index" aria-hidden="true"><span>AFTER THE GALLERY</span><span>03 / CONTINUE</span></div>
          <div><h3>We offer 12 services in total.</h3><p>From DevOps to Salesforce, B2B to SEO — explore everything we do.</p></div>
          <div className="services-outro__actions">
            <Link href="/services">View All 12 Services<ArrowRight size={20} aria-hidden="true" /></Link>
            <Link href="/contact">Book a Call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
