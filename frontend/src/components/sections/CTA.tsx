'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { scaleIn } from '@/lib/animations/variants';

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 lg:p-16 text-center relative border-2 border-secondary/30 shadow-glow-yellow-lg"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-primary/8 to-secondary/5 rounded-3xl -z-10" />

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
              Ready to Build Something <span className="text-secondary drop-shadow-[0_0_15px_rgba(255,214,98,0.4)]">Legendary?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground/80 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
              Get an instant price estimate or book a free consultation. No sales pitch. Just honest advice.
            </p>
            <p className="text-sm text-muted-foreground/60 mb-12 italic">
              ⚡ PS: Our AI responds faster than your last dev team's Slack messages.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
              <Link href="/estimate">
                <Button variant="neon" size="xl" className="group w-full sm:w-auto relative overflow-hidden">
                  <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center">
                    <Calculator className="mr-2 w-5 h-5" />
                    Get Instant Estimate
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="glass" size="xl" className="w-full sm:w-auto">
                  Book Free Consultation
                </Button>
              </Link>
            </div>

            {/* Tagline */}
            <p className="text-base text-muted-foreground/70 italic font-light">
              "We automate things… including your headaches."
            </p>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {[
              '⚡ Fast Turnaround',
              '💯 Quality Guaranteed',
              '🔒 NDA Protected',
              '🚀 Scale-Ready',
              '24/7 Support',
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="glass glass-hover px-5 py-3 rounded-full text-sm text-muted-foreground/80 font-medium shadow-premium hover:shadow-premium-lg border-primary/10 hover:border-primary/20"
              >
                {feature}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/8 rounded-full blur-3xl -z-10" />
    </section>
  );
}
