"use client";

import { useAnimate } from "framer-motion/mini";
import { useEffect } from "react";
import "./HeroMotion.css";
import "./HeroEditorial.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import EngineeringLab from "./EngineeringLab";
import HeroScene from "@/components/three/HeroScene";

export default function Hero() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let controls: { stop: () => void }[] = [];
    const reveal = () => {
      controls.forEach(control => control.stop());
      if (preference.matches) {
        controls = [animate('[data-hero-reveal]', { opacity: 1, transform: "none" }, { duration: 0 })];
        return;
      }
      // Whole blocks, not words: content is visible in server HTML and without JS.
      controls = ['headline', 'description', 'actions'].map((name, index) =>
        animate(`[data-hero-reveal="${name}"]`,
          { opacity: index === 0 ? [1, 1] : [0.65, 1], transform: [`translateY(${index === 0 ? 16 : 10}px)`, "translateY(0px)"] },
          { duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] })
      );
    };
    reveal();
    preference.addEventListener('change', reveal);
    return () => {
      controls.forEach(control => control.stop());
      preference.removeEventListener('change', reveal);
    };
  }, [animate]);

  return (
    <section ref={scope} className="hero-editorial relative min-h-screen flex items-center justify-center overflow-hidden pt-20" aria-labelledby="hero-heading">
      <HeroScene />
      
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      <div className="absolute inset-0 -z-10">
        <div
          style={{ opacity: 0.08 }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <div
          style={{ opacity: 0.08 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="hero-composition max-w-5xl mx-auto text-center"
        >
          <div className="hero-index">
            <span><span className="hero-index__mark" aria-hidden="true" /> DIGITAL ENGINEERING STUDIO</span>
            <span className="hero-index__number" aria-hidden="true">01 / FROM THE FIRST PRINCIPLE</span>
          </div>
          <h1
            id="hero-heading"
            data-hero-reveal="headline"
            className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
          >
            <span className="hero-title__line">From <span className="text-secondary">Vision</span></span>{" "}
            <span className="hero-title__line">to Reality,</span>{" "}
            <span className="gradient-text hero-title__result"><span>We Build</span>{" "}<span>What Works</span></span>
          </h1>

          <p
            data-hero-reveal="description"
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground/90 mb-14 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Premium web applications, intelligent AI solutions, and scalable systems built by experts who actually care about your success.
          </p>

          <div
            data-hero-reveal="actions"
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            {/* DISABLED: Estimator — uncomment to re-enable
            <Link href="/contact">
              <Button variant="neon" size="xl" className="group w-full sm:w-auto relative overflow-hidden">
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center">
                  Get Instant Estimate
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            */}
            <Link href="/contact" className={buttonVariants({ variant: "neon", size: "xl", className: "hero-cta hero-cta--primary" })}>
              <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              <span className="relative flex items-center">
                Let's Talk
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
            <Link href="/services" className={buttonVariants({ variant: "neon", size: "xl", className: "hero-cta hero-cta--secondary" })}>
              Explore Services
            </Link>
          </div>

          <EngineeringLab />

          <div
            className="hero-metrics grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support Available" },
              { value: "50+", label: "Happy Clients" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="dark-surface dark-surface-hover rounded-2xl p-8 transition-all cursor-default shadow-premium hover:shadow-premium-lg"
              >
                <div className="text-4xl lg:text-5xl font-bold text-foreground mb-3">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
