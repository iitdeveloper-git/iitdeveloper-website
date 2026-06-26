'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site';

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
      <HeroScene />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/20 via-background/70 to-background" />
      <div className="container mx-auto px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-background/70 px-5 py-2 text-xs font-bold tracking-[0.18em] text-secondary backdrop-blur-xl">
            <Sparkles className="h-4 w-4" /> AI • CLOUD • SOFTWARE • GROWTH
          </div>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter sm:text-6xl lg:text-8xl">
            Engineering Digital Products That <span className="gradient-text">Work, Scale and Get Discovered</span>
          </h1>
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
            IITDEVELOPER helps startups and growing businesses build AI-powered products, reliable cloud platforms, custom software, and search-ready digital experiences.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={siteConfig.bookingUrl}>
              <Button variant="neon" size="xl" className="w-full sm:w-auto">
                Book a Discovery Call <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <Link href="/work"><Button variant="glass" size="xl" className="w-full sm:w-auto">Explore Our Work</Button></Link>
          </div>
          <p className="mt-10 text-sm text-muted-foreground">Founded in 2020 · Engineering-led delivery · Built for production</p>
        </motion.div>
      </div>
    </section>
  );
}
