'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations/variants';

export default function TechStack() {
  const technologies = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Cloud & DevOps',
      items: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes'],
    },
    {
      category: 'AI & ML',
      items: ['OpenAI', 'Anthropic', 'LangChain', 'TensorFlow', 'PyTorch'],
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
            <span className="text-secondary">Built</span> With <span className="gradient-text">Cutting-Edge Tech</span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
            We don't chase trends. We master tools that solve real problems. <br />
            <span className="text-base text-muted-foreground/60 italic">Also, we Googled "best tech stack 2026" and this is what we found.</span>
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
          <p className="text-xl text-muted-foreground/70 italic font-light">
            And 50+ more technologies in our arsenal
          </p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
