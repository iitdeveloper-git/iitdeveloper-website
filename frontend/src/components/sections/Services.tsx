'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { servicePillars } from '@/content/site';

export default function Services() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="services-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm font-bold tracking-[0.18em] text-secondary">FOUR CORE CAPABILITIES</p>
          <h2 id="services-heading" className="text-4xl font-bold tracking-tight sm:text-5xl">One practical partner from idea to production</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">Product engineering, AI implementation, cloud operations, and modern discoverability—planned as one connected system.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {servicePillars.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article key={service.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass dark-surface rounded-2xl border border-white/10 p-8 shadow-premium">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10">
                  <Icon className="h-7 w-7 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{service.description}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="flex gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />{capability}</li>
                  ))}
                </ul>
                <Link href={`/services/${service.slug}`} className="mt-7 inline-flex items-center font-semibold text-secondary hover:underline">
                  {service.cta}<ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
