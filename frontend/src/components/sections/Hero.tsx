"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations/variants";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5" />,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <HeroScene />
      
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            variants={staggerItem}
            className="inline-flex items-center space-x-2 glass glass-hover px-5 py-2.5 rounded-full mb-10 shadow-premium"
          >
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium tracking-wide">
              Tech + Design + Growth. No BS. Just solutions that work.
            </span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
          >
            From <span className="text-secondary">Vision</span> to Reality,
            <br />
            <span className="gradient-text">We Build What Works</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground/90 mb-14 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Premium web applications, intelligent AI solutions, and scalable systems built by experts who actually care about your success.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            <Link href="/estimate">
              <Button variant="neon" size="xl" className="group w-full sm:w-auto relative overflow-hidden">
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center">
                  Get Instant Estimate
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support Available" },
              { value: "50+", label: "Happy Clients" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                className="glass dark-surface-hover rounded-xl p-6 border-2 border-secondary/20 hover:border-secondary/40 transition-all shadow-glow-yellow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="dark-surface dark-surface-hover rounded-2xl p-8 transition-all cursor-default shadow-premium hover:shadow-premium-lg"
              >
                <div className="text-4xl lg:text-5xl font-bold text-white mb-3">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
