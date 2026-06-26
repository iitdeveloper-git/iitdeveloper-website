'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/variants';

export default function TechStack() {
  const technologies = [
    {
      category: 'Product Engineering',
      items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    },
    {
      category: 'AI and Data',
      items: ['Python', 'LLM APIs', 'RAG', 'Vector search', 'Evaluation'],
    },
    {
      category: 'Cloud and Platform',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    },
    {
      category: 'Search and Analytics',
      items: ['Technical SEO', 'Structured data', 'Search Console', 'Bing', 'Web analytics'],
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-white/[0.02] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Technology selected for <span className="gradient-text">the operating reality</span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
            Tools are selected around product constraints, team capability, security, reliability, and long-term operating cost.
          </p>
        </motion.div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.category}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass glass-hover rounded-2xl p-8 shadow-premium hover:shadow-glow-yellow-lg border-primary/10 hover:border-secondary/30 border-t-2 border-t-secondary/40"
            >
              <h3 className="text-2xl font-bold mb-5 text-secondary drop-shadow-[0_0_8px_rgba(255,214,98,0.3)]">
                {tech.category}
              </h3>
              <ul className="space-y-3">
                {tech.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground/80 hover:text-foreground transition-colors cursor-default text-base"
                  >
                    • {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-muted-foreground/70 font-light">The exact stack is documented and agreed during solution design.</p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
