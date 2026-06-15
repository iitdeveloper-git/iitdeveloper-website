'use client';

import { motion } from 'framer-motion';
import { FileSearch, Lightbulb, Code2, Rocket } from 'lucide-react';
import { fadeInUp } from '@/lib/animations/variants';

const steps = [
  {
    icon: FileSearch,
    number: '01',
    title: 'Discovery',
    description: 'We dig deep to understand your business, users, and goals. No assumptions, just facts.',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Strategy',
    description: 'Custom roadmap tailored to your needs. Architecture, timeline, and cost—all transparent.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Development',
    description: 'Agile sprints with weekly demos. You see progress, not excuses.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Launch & Scale',
    description: 'Smooth deployment, monitoring, and ongoing optimization. We stick around.',
  },
];

export default function Process() {
  return (
    <section className="py-24 lg:py-32 relative">
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
            How We <span className="text-secondary">Get Shit Done</span>
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
            AI agents that don't sleep, unlike your team. A process designed for speed and quality.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector Line (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                      className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent/50 to-transparent origin-left"
                    />
                  )}

                  <motion.div
                    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                    className="dark-surface dark-surface-hover rounded-2xl p-8 h-full transition-all shadow-premium hover:shadow-glow-yellow-lg border-primary/10 hover:border-secondary/40 border-t-2 border-t-secondary/30"
                  >
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 neon-border shadow-glow">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    {/* Number */}
                    <div className="text-6xl font-bold text-secondary/30 mb-3">
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground/80 text-base leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-muted-foreground/70 italic font-light">
            "From zero to production faster than your coffee gets cold."
          </p>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
