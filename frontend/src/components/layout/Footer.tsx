'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Website Development', href: '/services/website-development' },
    { label: 'App Development', href: '/services/app-development' },
    { label: 'DevOps & Cloud', href: '/services/devops-cloud' },
    { label: 'AI Solutions', href: '/services/ai-agents' },
    { label: 'Shopify Store', href: '/services/shopify-store' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Team', href: '/team' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api-docs' },
    { label: 'Support', href: '/support' },
  ],
};

const socialLinks = [
  // { icon: Github, href: 'https://github.com/iitdeveloper-git', label: 'GitHub' },
  { icon: Instagram, href: 'https://instagram.com/iitdeveloper_official', label: 'Instagram' },
  { icon: Twitter, href: 'https://x.com/developer_iit', label: 'Twitter/X' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/iitdeveloper-com-655a57213/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:info@iitdeveloper.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <Image
                src="/logo.png"
                alt="IIT Developer"
                width={160}
                height={56}
                className="h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <span className="text-xl lg:text-2xl font-bold gradient-text tracking-tight leading-none self-center">
                IIT Developer
              </span>
            </Link>
            <p className="text-muted-foreground/80 mb-8 max-w-sm text-base leading-relaxed font-light">
              Building legendary digital products since [checks notes] recently. We turn "it's impossible" into "it's deployed." ⚡
            </p>
            <div className="flex items-center space-x-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass glass-hover hover:bg-secondary/10 hover:text-secondary hover:border-secondary/30 border border-transparent transition-all shadow-premium hover:shadow-glow-yellow"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Portfolio Spotlight Card */}
            <Link href="/case-studies" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-secondary/5 p-5 transition-all duration-500 hover:border-secondary/40 hover:shadow-[0_0_30px_rgba(0,83,156,0.25)] hover:scale-[1.02]">
                {/* Animated shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/80 bg-secondary/10 px-2.5 py-1 rounded-full border border-secondary/20">
                    ✦ Our Work
                  </span>
                  <span className="text-[10px] text-muted-foreground/50 font-light">100+ Projects</span>
                </div>

                <p className="text-sm font-semibold text-foreground/90 mb-1 leading-snug">
                  See what we've built
                </p>
                <p className="text-xs text-muted-foreground/60 font-light mb-4 leading-relaxed">
                  Case studies, live projects & real results.
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-secondary transition-colors duration-300">
                  <span>View Portfolio</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Corner glow */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-secondary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-secondary">
              Services
            </h3>
            <ul className="space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground/80 hover:text-primary transition-colors text-base font-light hover:translate-x-1 inline-block duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-secondary">
              Company
            </h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground/80 hover:text-primary transition-colors text-base font-light hover:translate-x-1 inline-block duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-6 text-secondary">
              Resources
            </h3>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground/80 hover:text-primary transition-colors text-base font-light hover:translate-x-1 inline-block duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Bottom Bar */}
        <div className="mt-16 pt-10 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-base text-muted-foreground/70 font-light">
                © {new Date().getFullYear()} IITDeveloper. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/50 italic mt-1">
                Handcrafted with ☕ and ⚡. No AI was harmed in the making of this website. (They did all the work.)
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-base">
              <Link
                href="/privacy"
                className="text-muted-foreground/70 hover:text-primary transition-colors font-light"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground/70 hover:text-primary transition-colors font-light"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground/70 hover:text-primary transition-colors font-light"
              >
                Cookie Policy
              </Link>
              <Link
                href="/refund-policy"
                className="text-muted-foreground/70 hover:text-primary transition-colors font-light"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>
    </footer>
  );
}
