# Module 01 — Hero inspection and content inventory

Date: 14 October 2026. Phase 1 only: inspection and documentation, with no implementation changes.

## Scope and current working state

Follow root `AGENTS.md`. Only the hero and its direct dependencies are candidates for the next implementation phase. Navigation is inspected for layout coordination; its shared behavior and content must remain intact.

Existing uncommitted work includes homepage wrappers, `homepage.css`, and `EngineeringLab.tsx` from the earlier interrupted redesign. The CSS already affects other sections. This inspection preserves those files without accepting them as a finished design, reverting them, or extending their scope. The original `Hero.tsx` remains intact. The already-disabled Team options and estimator CTAs stay disabled.

## Exact original hero content

| Item | Exact text | Destination / behavior |
| --- | --- | --- |
| Heading, first line | From Vision to Reality, | `Vision` uses the existing secondary color; an explicit line break follows the comma. |
| Heading, second line | We Build What Works | Existing `gradient-text` treatment. |
| Description | Premium web applications, intelligent AI solutions, and scalable systems built by experts who actually care about your success. | Full paragraph remains visible. |
| Primary CTA | Let's Talk | `/contact`; ArrowRight icon and decorative shimmer. |
| Secondary CTA | Explore Services | `/services` |
| Metric | 100+ | Projects Delivered |
| Metric | 99.9% | Uptime SLA |
| Metric | 24/7 | Support Available |
| Metric | 50+ | Happy Clients |

There are no active badges, inline forms, input fields, videos, photographs, or separate eyebrow labels in the original hero. `Get Instant Estimate` → `/contact` is preserved in an existing JSX comment, not an active CTA. Do not silently activate or discard it.

## Media and current additive content

- `HeroScene` renders `TechBackground`: a Canvas 2D particle field with 50 particles, connecting lines, resize handling, and requestAnimationFrame cleanup. Despite the folder name and page comment, this active path does not use Three.js.
- Preserve the original ArrowRight icon, background gradient overlay, two animated glow fields, and static glow field.
- Header: `/logo.png`, alternative text `IIT Developer`, intrinsic 160 × 56; linked to `/`. Adjacent wordmark: `IIT Developer`. Menu, X, and ChevronDown icons express navigation state.
- Current uncommitted EngineeringLab is an additive sibling in `.homepage-hero`. Its exact visible strings are `Engineering lab`, `SYSTEM DESIGN`, `INTERFACE`, `INTELLIGENCE`, `INFRASTRUCTURE`, `Ideas connected. Systems considered.`, `Pause`, and `Resume`.
- Its SVG title is `Connected system blueprint`. Its description is `Interface, intelligence, and infrastructure connected around a central system. An illustrative diagram, not a live system monitor.`
- Its button accessible labels are `Pause blueprint animation` and `Resume blueprint animation`; `aria-pressed` tracks paused state. It pauses only the blueprint orbit, not the original particle canvas.

## Exact active navigation

| Group | Label | Destination |
| --- | --- | --- |
| Main | Home | `/` |
| Main | About Us | `/about` |
| Main | What We Build | `/services` |
| Build | Websites & Apps | `/services/website-development` |
| Build | Mobile Apps | `/services/app-development` |
| Build | Shopify Store | `/services/shopify-store` |
| Build | Ecommerce Solutions | `/services/ecommerce` |
| Build | Cloud & DevOps | `/services/devops-cloud` |
| Build | Salesforce | `/services/salesforce` |
| AI | AI Agents | `/services/ai-agents` |
| AI | AI Workflows | `/services/ai-workflows` |
| Growth | Performance Marketing | `/services/marketing` |
| Growth | SEO & SMM | `/services/seo-smm` |
| Growth | B2B Promotion | `/services/b2b-promotion` |
| Design | Graphic Design | `/services/graphic-design` |
| Services dropdown | View all 12 services → | `/services` |
| Main | Open Source | `/open-source` |
| Main | Company | `/about` |
| Company | Careers | `/careers` |
| Header desktop/mobile CTA | Let's Talk | `/contact` |

Mobile menu accessible label: `Toggle menu`. Existing commented options: `Our Work` → `/case-studies`, `Team` → `/team`, former Company target `/team`, and header `Price It Out` → `/contact`. Preserve their current commented status.

## Brand and theme — exact definitions

- Tailwind primary: `#00539C`; primary foreground: `#FFFFFF`.
- Tailwind secondary/accent: `#FFD662`; secondary foreground: `#0B0F19`.
- Surfaces: dark `#0B1A2B`, darker `#0B0F19`, light `#E6F0FA`.
- Muted: `#9CA3AF`; muted foreground: `#E5E7EB`.
- CSS background: `hsl(215 55% 8%)`; foreground: `hsl(0 0% 100%)`.
- CSS primary token: `206 100% 31%`; CSS secondary/accent token: `45 100% 69%`. These are separate existing definitions from the Tailwind hex palette; do not normalize or substitute them.
- Heading gradient: `linear-gradient(135deg, #00539C 0%, #0073CC 30%, #FFD662 100%)`; background-size `200% 200%`, text clipping, transparent WebKit text fill.
- Hero overlay classes: `bg-gradient-to-b from-transparent via-background/50 to-background`.
- Canvas connection color: `rgba(0, 83, 156, ${(1 - dist / 150) * 0.25})`; dot color: `rgba(0, 115, 204, 0.7)`; canvas inline opacity `0.6`.
- Current added stylesheet aliases: `--home-blue: #00539C`, `--home-yellow: #FFD662`, `--home-rule: rgba(255, 255, 255, 0.12)`.
- Root HTML has `className="dark"`; Tailwind uses `darkMode: 'class'`. No theme switch exists in these inspected components.

Full palette ramps, shadows, utility definitions, and class combinations are retained verbatim in the source appendix.

## Typography, animation, and dependencies

- Inter via `next/font/google`, exposed as `--font-geist-sans`; the variable name does not mean the actual font is Geist.
- JetBrains Mono via `next/font/google`, exposed as `--font-geist-mono`; font display is `swap` for both.
- Framer Motion `^11.0.0`, Lucide React `^0.363.0`, React `^18.3.0`, Next.js `^14.2.0`, Tailwind `^3.4.0` (declared package ranges).
- Shared stagger container: 0.1s child delay and stagger. Items animate opacity 0→1 and y 20→0 over 0.4s.
- Metrics: 0.5s entrances starting at 0.8s plus 0.1s per item; hover scale 1.05 and y −5.
- Decorative glow fields: 8s repeating scale/opacity animations; second field delayed 1s.
- Added blueprint: CSS 50s linear rotation, manual pause/resume, reduced-motion stop.
- `Button`, Header/Navigation, `variants.ts`, global styles, theme configuration, and font/layout configuration are shared by other sections/routes. Editing their defaults would exceed hero-only scope.
- HeroScene → TechBackground is the active visual dependency chain. The hero has no API requests or form submissions. Links navigate to existing routes; global analytics and metadata live in the root layout and must remain unchanged.

## Responsive behavior inspected in source

| Width | Current hero behavior | Navigation |
| --- | --- | --- |
| Below 640px | Full-width heading, `clamp(2.6rem, 10.5vw, 4rem)`; 135px top padding; vertically stacked CTAs; two-column metrics; blueprint below hero in document flow. | Mobile toggle/menu. |
| 640–1023px | Full-width heading, `clamp(3rem, 7.8vw, 5.5rem)`; 150px top padding; horizontal CTAs; two-column metrics; blueprint below hero. | Mobile toggle/menu. |
| 1024–1199px | Heading constrained to 68%; description 52%; heading capped at 5rem; 950px minimum hero height; four metrics; blueprint absolutely positioned at top 230px, width 29vw. | Desktop links/dropdowns and CTA. |
| 1200px+ | Heading `clamp(3.4rem, 6vw, 6.5rem)` at 68% width; 180px top padding; blueprint top 245px, width min(30vw, 420px); four metrics. | Desktop navigation. |

The original hero component itself is centered and uses Tailwind responsive classes; the current uncommitted `homepage.css` overrides it to left alignment and the dimensions above. Header height is similarly overridden from 96px to 88px.

## Findings to address during design implementation

1. Absolute placement of the blueprint needs overlap checks at intermediate desktop widths and zoom; source inspection alone cannot prove it fits.
2. The original canvas runs continuously and does not inspect reduced-motion preferences. The added reduced-motion CSS does not stop its JavaScript animation loop.
3. CTA markup currently nests shared Button elements inside links. Keyboard/semantic behavior should be reviewed locally without changing the shared Button default.
4. Desktop dropdowns rely on hover styling; mobile uses explicit expandable buttons. Preserve all menu destinations while evaluating keyboard access.
5. The current `homepage.css` contains broad selectors affecting other sections. Future hero styling should use a hero-specific module or tightly scoped selectors. Existing uncommitted non-hero work must not be reverted or rewritten as part of this module.
6. Entrance animations start original content at opacity zero. A future implementation should keep content available when scripts fail and respect reduced motion.

## Proposed presentation (not implemented)

Use the original heading as the focal point, with deliberate line lengths, generous spacing, and a clear CTA pair. Retain the original metrics in a quiet, readable row. Use restrained, purposeful entrance motion and the existing technical visual assets; avoid adding claims, badges, generic dashboards, or new color treatments. On compact screens, keep every content item in normal flow with comfortable tap targets.

Candidate implementation files: `Hero.tsx` and a dedicated hero CSS module; `HeroScene.tsx`/`TechBackground.tsx` only if motion or sizing changes require them; hero-specific composition in `app/page.tsx` only if necessary. The existing EngineeringLab must be accounted for without losing its content. Do not modify shared theme tokens, shared Button variants, root metadata, other sections, or navigation content.

## Validation and limitations

This phase changes only this documentation file. Exact source snapshots and SHA-256 hashes below preserve the inspected baseline. Existing uncommitted application files are untouched.

Responsive source rules were inspected. Browser inspection was attempted, but the tab encountered a localhost connection failure and its resulting error page could not be navigated by the browser tool. The local development server was restarted. Desktop/tablet/mobile visual checks, interaction checks, and performance measurements remain unverified in this phase; no claim of zero runtime regressions is made.

Lint, type-check, build, and integration tests are implementation-phase checks and were not rerun for this documentation-only inspection. Stop after Phase 1 and wait for the next instruction.

## Verbatim source baseline

The snapshots include existing comments, disabled content, exact punctuation, and the current uncommitted additions. Hashes identify the inspected bytes.

### `frontend/src/components/sections/Hero.tsx`

SHA-256: `881e2de5445520a431a2ad6c2481ad95c227ce56a72548eaa85c611a3997a556`

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations/variants";
import HeroScene from "@/components/three/HeroScene";

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
            <Link href="/contact">
              <Button variant="neon" size="xl" className="group w-full sm:w-auto relative overflow-hidden">
                <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center">
                  Let's Talk
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="neon" size="xl" className="w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: "100+", label: "Projects Delivered" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "24/7", label: "Support Available" },
              { value: "50+", label: "Happy Clients" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
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
```

### `frontend/src/components/three/HeroScene.tsx`

SHA-256: `d4c1bd788ed420470129c97b655c09b3ab82b5bf7f48545ce5d80b474c9a5b49`

```tsx
'use client';

import TechBackground from './TechBackground';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <TechBackground />
    </div>
  );
}
```

### `frontend/src/components/three/TechBackground.tsx`

SHA-256: `27eb5ff1db88c755173f6bf06e1c20491f0c2b6a790e08d79d32f0f050dfa2c3`

```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const COUNT = 50;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 83, 156, ${(1 - dist / 150) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 115, 204, 0.7)';
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}
```

### `frontend/src/components/sections/EngineeringLab.tsx`

SHA-256: `05ddaf491f0ae128d102fb2c89a8c4aefaf40b55c2329b9aff57d0c92f5d9e58`

```tsx
'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';

/** Additive illustration: none of the original homepage content lives here. */
export default function EngineeringLab() {
  const [paused, setPaused] = useState(false);

  return (
    <aside className={`engineering-lab${paused ? ' engineering-lab--paused' : ''}`} aria-labelledby="engineering-lab-title">
      <div className="engineering-lab__header">
        <span id="engineering-lab-title">Engineering lab</span>
        <span className="engineering-lab__status" aria-hidden="true"><i /> SYSTEM DESIGN</span>
      </div>
      <svg className="engineering-lab__diagram" viewBox="0 0 400 400" role="img" aria-labelledby="engineering-diagram-title engineering-diagram-description">
        <title id="engineering-diagram-title">Connected system blueprint</title>
        <desc id="engineering-diagram-description">Interface, intelligence, and infrastructure connected around a central system. An illustrative diagram, not a live system monitor.</desc>
        <g className="engineering-lab__guides" fill="none">
          <path d="M40 80H360M40 160H360M40 240H360M40 320H360M80 40V360M160 40V360M240 40V360M320 40V360" />
          <circle cx="200" cy="200" r="145" />
          <circle cx="200" cy="200" r="110" />
          <path d="M200 25V375M25 200H375" />
        </g>
        <g className="engineering-lab__orbit" fill="none">
          <circle cx="200" cy="200" r="126" strokeDasharray="44 16 2 16" />
          <circle cx="326" cy="200" r="4" className="engineering-lab__signal" />
          <circle cx="74" cy="200" r="4" className="engineering-lab__signal" />
        </g>
        <g className="engineering-lab__connections" fill="none">
          <path d="M200 95V165M200 235V305M95 200H165M235 200H305" />
          <path d="M110 110L174 174M226 226L290 290M110 290L174 226M226 174L290 110" />
        </g>
        <g className="engineering-lab__core" fill="none">
          <path d="M200 153L242 176V224L200 247L158 224V176Z" />
          <path d="M158 176L200 200L242 176M200 200V247M200 153V200" />
        </g>
        <g className="engineering-lab__nodes">
          <rect x="146" y="57" width="108" height="32" rx="4" />
          <rect x="19" y="294" width="120" height="32" rx="4" />
          <rect x="260" y="294" width="128" height="32" rx="4" />
          <text x="200" y="78" textAnchor="middle">INTERFACE</text>
          <text x="79" y="315" textAnchor="middle">INTELLIGENCE</text>
          <text x="324" y="315" textAnchor="middle">INFRASTRUCTURE</text>
        </g>
      </svg>
      <div className="engineering-lab__footer">
        <span>Ideas connected. Systems considered.</span>
        <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Resume blueprint animation' : 'Pause blueprint animation'}>
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </aside>
  );
}
```

### `frontend/src/components/layout/Header.tsx`

SHA-256: `6b0bd9b5458df58f1940979b690714197bbf38c2c881f58d44ef7d292fbf3329`

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'glass-strong shadow-premium-lg backdrop-blur-2xl' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="IIT Developer"
              width={160}
              height={56}
              className="h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-xl lg:text-2xl font-bold gradient-text tracking-tight leading-none self-center">
              IIT Developer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation />
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* DISABLED: Estimator — uncomment to re-enable
            <Link href="/contact">
              <Button variant="neon" size="lg" className="min-w-[140px]">
                Price It Out
              </Button>
            </Link>
            */}
            <Link href="/contact">
              <Button variant="neon" size="lg" className="min-w-[140px]">
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-primary/10">
          <div className="container mx-auto px-4 py-6">
            <Navigation mobile onNavigate={() => setIsMobileMenuOpen(false)} />
            <div className="mt-6 space-y-3">
              {/* DISABLED: Estimator — uncomment to re-enable
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="neon" size="lg" className="w-full">
                  Price It Out
                </Button>
              </Link>
              */}
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="neon" size="lg" className="w-full">
                  Let's Talk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
```

### `frontend/src/components/layout/Navigation.tsx`

SHA-256: `7aa7297b454cd914231c0ba3cbdcb294adc67f87126a0241b084685975e6c521`

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface NavSubItem {
  label: string;
  href: string;
}

interface NavGroup {
  category: string;
  items: NavSubItem[];
}

interface NavItem {
  label: string;
  href: string;
  submenu?: NavSubItem[];
  submenuGroups?: NavGroup[];
}

interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'What We Build',
    href: '/services',
    submenuGroups: [
      {
        category: 'Build',
        items: [
          { label: 'Websites & Apps', href: '/services/website-development' },
          { label: 'Mobile Apps', href: '/services/app-development' },
          { label: 'Shopify Store', href: '/services/shopify-store' },
          { label: 'Ecommerce Solutions', href: '/services/ecommerce' },
          { label: 'Cloud & DevOps', href: '/services/devops-cloud' },
          { label: 'Salesforce', href: '/services/salesforce' },
        ],
      },
      {
        category: 'AI',
        items: [
          { label: 'AI Agents', href: '/services/ai-agents' },
          { label: 'AI Workflows', href: '/services/ai-workflows' },
        ],
      },
      {
        category: 'Growth',
        items: [
          { label: 'Performance Marketing', href: '/services/marketing' },
          { label: 'SEO & SMM', href: '/services/seo-smm' },
          { label: 'B2B Promotion', href: '/services/b2b-promotion' },
        ],
      },
      {
        category: 'Design',
        items: [
          { label: 'Graphic Design', href: '/services/graphic-design' },
        ],
      },
    ],
  },
  // { label: 'Our Work', href: '/case-studies' },
  { label: 'Open Source', href: '/open-source' },
  {
    label: 'Company',
    // href: '/team', // Temporarily disabled; see docs/COMMENTED_SECTIONS.md.
    href: '/about',
    submenu: [
      // { label: 'Team', href: '/team' }, // Temporarily disabled.
      { label: 'Careers', href: '/careers' },
    ],
  },
];

export default function Navigation({ mobile, onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <div key={item.href}>
            {(item.submenu || item.submenuGroups) ? (
              <>
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full text-left px-5 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-300 font-medium"
                >
                  <span className="text-base">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      openSubmenu === item.label && 'rotate-180'
                    )}
                  />
                </button>
                {openSubmenu === item.label && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.submenuGroups
                      ? item.submenuGroups.map((group) => (
                          <div key={group.category}>
                            <p className="px-4 pt-2 pb-1 text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50">
                              {group.category}
                            </p>
                            {group.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={onNavigate}
                                className={cn(
                                  'block px-4 py-2 rounded-lg text-sm transition-colors',
                                  pathname === subItem.href
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                )}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        ))
                      : item.submenu!.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={onNavigate}
                            className={cn(
                              'block px-4 py-2 rounded-lg text-sm transition-colors',
                              pathname === subItem.href
                                ? 'bg-primary/20 text-primary'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'block px-4 py-2 rounded-lg text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary/20 text-primary'
                    : 'text-foreground hover:bg-white/5'
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className={cn(
              'px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 relative',
              pathname === item.href
                ? 'text-primary'
                : 'text-foreground hover:text-primary hover:bg-primary/[0.05]'
            )}
          >
            <span className="relative z-10 flex items-center whitespace-nowrap">
              {item.label}
              {item.submenu && <ChevronDown className="ml-1.5 w-4 h-4" />}
            </span>
            {pathname === item.href && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          {/* Submenu */}
          {(item.submenu || item.submenuGroups) && (
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {item.submenuGroups ? (
                // Grouped dropdown (e.g. "What We Build")
                <div className="glass-strong rounded-2xl shadow-premium-lg border border-white/[0.12] overflow-hidden py-3" style={{ minWidth: '520px' }}>
                  <div className="grid grid-cols-2 gap-x-4 px-4">
                    {item.submenuGroups.map((group) => (
                      <div key={group.category} className="py-2">
                        <p className="px-2 mb-1.5 text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50">
                          {group.category}
                        </p>
                        {group.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                              pathname === subItem.href
                                ? 'bg-primary/20 text-primary'
                                : 'text-foreground hover:bg-primary/5 hover:text-primary'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 mx-4 pt-2 border-t border-white/[0.06]">
                    <Link
                      href="/services"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-secondary hover:bg-secondary/5 transition-colors"
                    >
                      View all 12 services →
                    </Link>
                  </div>
                </div>
              ) : (
                // Flat dropdown (e.g. "Company")
                <div className="glass-strong rounded-2xl shadow-premium-lg border border-white/[0.12] overflow-hidden min-w-[200px] py-2">
                  {item.submenu!.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        'block px-5 py-3 text-sm font-medium transition-colors',
                        pathname === subItem.href
                          ? 'bg-primary/20 text-primary'
                          : 'text-foreground hover:bg-primary/5 hover:text-primary'
                      )}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
```

### `frontend/src/components/ui/button.tsx`

SHA-256: `807ddf8b30a108020af3aea55f852ce6d3b80b50d90a201fa876713f30c674b7`

```tsx
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        // Primary CTA - Vibrant Yellow (High conversion)
        default: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-yellow hover:shadow-glow-yellow-lg font-bold',
        
        // Deep Blue - Secondary action button
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-lg',
        
        // Outlined Deep Blue
        outline: 'border-2 border-primary bg-transparent hover:bg-primary/10 hover:border-primary/80 backdrop-blur-sm text-primary transition-colors',
        
        // Destructive
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl',
        
        // Dark surface button
        secondary: 'bg-surface-dark text-foreground hover:bg-surface-darker shadow-md border border-primary/20',
        
        // Ghost button
        ghost: 'hover:bg-primary/10 hover:backdrop-blur-sm text-primary',
        
        // Link style
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80',
        
        // Yellow neon (same as default for backward compatibility)
        neon: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-yellow hover:shadow-glow-yellow-lg font-bold relative overflow-hidden group',
        
        // Glass morphism
        glass: 'glass glass-hover backdrop-blur-xl shadow-premium hover:shadow-premium-lg text-foreground border-primary/20',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

### `frontend/src/lib/animations/variants.ts`

SHA-256: `595012520ae943749f2f43b66eb08afa64130e9c3ea39a68ead8fa3aec32d5c2`

```tsx
import { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  },
};

export const slideInUp: Variants = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 20
    }
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export const glowPulse: Variants = {
  initial: { 
    boxShadow: '0 0 10px rgba(0, 255, 136, 0.5)',
  },
  animate: {
    boxShadow: [
      '0 0 10px rgba(0, 255, 136, 0.5)',
      '0 0 20px rgba(0, 255, 136, 0.8)',
      '0 0 10px rgba(0, 255, 136, 0.5)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const float: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
```

### `frontend/src/app/page.tsx`

SHA-256: `08ddbaecdb2c26c708ea534cf4c0c0902a0bc00914ec325de7b34a362a0e37cf`

```tsx
// AGENT-CONTEXT: Main landing page for IITDeveloper.
// Uses Framer Motion for animations and Three.js (@react-three/fiber) for the Hero scene.
// Ensure any changes to the 3D canvas are strictly performance-tested.
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Clients from '@/components/sections/Clients';
import TechStack from '@/components/sections/TechStack';
import OpenSourceHighlight from '@/components/sections/OpenSourceHighlight';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import EngineeringLab from '@/components/sections/EngineeringLab';
import './homepage.css';

export default function HomePage() {
  return (
    <main className="relative homepage">
      <Header />
      <div className="homepage-hero" data-home-section="hero">
        <Hero />
        <EngineeringLab />
      </div>
      <div data-home-section="services">
        <Services />
      </div>
      <div data-home-section="clients">
        <Clients />
      </div>
      <div data-home-section="technology">
        <TechStack />
      </div>
      <div data-home-section="open-source">
        <OpenSourceHighlight />
      </div>
      <div data-home-section="process">
        <Process />
      </div>
      <div data-home-section="testimonials">
        <Testimonials />
      </div>
      <div data-home-section="consultation">
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
```

### `frontend/src/app/homepage.css`

SHA-256: `6e8526ac53c840d0084e596a87cf69720b24f713015d17b47b4c9f1360e12389`

```css
/* Homepage presentation only. Original brand tokens and gradients stay in styles.css.
   Existing components, copy, links, assets, and integrations are untouched. */
.homepage {
  --home-rule: rgba(255, 255, 255, 0.12);
  --home-blue: #00539C;
  --home-yellow: #FFD662;
  isolation: isolate;
}
.homepage .container { max-width: 1440px; padding-inline: clamp(1.25rem, 4vw, 4.5rem); }
.homepage > header { border-bottom: 1px solid var(--home-rule); }
.homepage > header > .container > div { height: 88px; gap: 1rem; }
.homepage > header nav { gap: 0; }
.homepage > header nav > div > a { padding-inline: clamp(.7rem, 1.1vw, 1.2rem); font-size: .875rem; }
.homepage h1, .homepage h2 { text-wrap: balance; }
.homepage p { text-wrap: pretty; }
.homepage a:focus-visible, .homepage button:focus-visible {
  outline: 2px solid var(--home-yellow); outline-offset: 6px;
}
.homepage [data-home-section] { position: relative; }
.homepage [data-home-section] > section {
  padding-block: clamp(5rem, 8vw, 8rem);
  border-bottom: 1px solid var(--home-rule);
}
.homepage [data-home-section] h2 {
  font-size: clamp(2.35rem, 4.4vw, 4.75rem);
  line-height: 1.08; letter-spacing: -.045em;
}
.homepage [data-home-section] > section > .container > div:first-child:not(.grid) {
  margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
}
/* The original hero and particle canvas remain intact. */
.homepage .homepage-hero > section {
  min-height: 950px; padding-top: 180px; padding-bottom: 64px;
  align-items: flex-start; overflow: visible;
}
.homepage .homepage-hero > section > .container { position: relative; z-index: 1; }
.homepage .homepage-hero > section > .container > div { max-width: none; text-align: left; }
.homepage .homepage-hero h1 {
  max-width: 68%; font-size: clamp(3.4rem, 6vw, 6.5rem);
  line-height: 1.06; letter-spacing: -.065em; margin-bottom: 2rem;
}
.homepage .homepage-hero h1 + p {
  max-width: 52%; margin-inline: 0; font-size: clamp(1.125rem, 1.6vw, 1.5rem);
  line-height: 1.65; margin-bottom: 2.5rem;
}
.homepage .homepage-hero h1 + p + div { justify-content: flex-start; margin-bottom: 5rem; }
.homepage .homepage-hero .grid { max-width: none; gap: 0; border-top: 1px solid var(--home-rule); }
.homepage .homepage-hero .grid > div {
  border-radius: 0; padding: 2.5rem 1.5rem; box-shadow: none;
  border-right: 1px solid var(--home-rule);
}
.homepage .homepage-hero .grid > div:first-child { padding-left: 0; }
.homepage .homepage-hero .grid > div:last-child { border-right: 0; }
.homepage .homepage-hero .grid > div > div:first-child {
  font-family: var(--font-geist-mono), monospace; font-size: clamp(2.25rem, 4vw, 3.75rem);
  font-weight: 500; letter-spacing: -.06em;
}
/* An additive system illustration, positioned beside the original hero on desktop. */
.engineering-lab {
  position: absolute; top: 245px; right: clamp(1.25rem, 4vw, 4.5rem);
  width: min(30vw, 420px); z-index: 2;
  border: 1px solid var(--home-rule); border-radius: 8px;
  background-color: hsl(var(--background));
  box-shadow: 0 24px 72px rgba(0, 83, 156, .15);
}
.engineering-lab__header, .engineering-lab__footer {
  display: flex; justify-content: space-between; align-items: center; gap: .75rem;
  padding: 1rem 1.25rem; font-family: var(--font-geist-mono), monospace;
}
.engineering-lab__header { border-bottom: 1px solid var(--home-rule); font-size: .75rem; }
.engineering-lab__status { display: flex; align-items: center; gap: .5rem; font-size: .55rem; letter-spacing: .06em; color: var(--home-yellow); }
.engineering-lab__status i { width: 5px; height: 5px; background: var(--home-yellow); border-radius: 50%; }
.engineering-lab__diagram { width: 100%; height: auto; }
.engineering-lab__guides { stroke: var(--home-blue); stroke-opacity: .35; stroke-width: .7; }
.engineering-lab__orbit { stroke: var(--home-yellow); stroke-width: 1; transform-origin: 200px 200px; animation: home-orbit 50s linear infinite; }
.engineering-lab__signal { fill: var(--home-yellow); }
.engineering-lab__connections { stroke: var(--home-blue); stroke-width: 1.5; }
.engineering-lab__core { stroke: var(--home-yellow); stroke-width: 1.5; }
.engineering-lab__nodes rect { fill: hsl(var(--background)); stroke: var(--home-blue); }
.engineering-lab__nodes text { fill: hsl(var(--foreground)); font: 9px var(--font-geist-mono), monospace; letter-spacing: 1px; }
.engineering-lab__footer { border-top: 1px solid var(--home-rule); font-size: .6rem; line-height: 1.6; }
.engineering-lab__footer > span { max-width: 65%; }
.engineering-lab__footer button { display: flex; align-items: center; gap: .35rem; padding: .4rem; border-radius: 4px; color: var(--home-yellow); }
.engineering-lab--paused .engineering-lab__orbit { animation-play-state: paused; }
@keyframes home-orbit { to { transform: rotate(360deg); } }
/* Editorial section headings, with every original sentence retained. */
@media (min-width: 1024px) {
  .homepage [data-home-section="services"] > section > .container > div:first-child,
  .homepage [data-home-section="technology"] > section > .container > div:first-child,
  .homepage [data-home-section="process"] > section > .container > div:first-child,
  .homepage [data-home-section="testimonials"] > section > .container > div:first-child {
    display: grid; grid-template-columns: 1.2fr 1fr; column-gap: 6rem; align-items: end; text-align: left;
  }
  .homepage [data-home-section="services"] > section > .container > div:first-child > div { grid-column: 1 / -1; justify-self: start; }
  .homepage [data-home-section] > section > .container > div:first-child > p { margin-inline: 0; font-size: 1.125rem; line-height: 1.8; }
  .homepage [data-home-section="services"] > section > .container > div:first-child h2 { margin-bottom: 0; }
}
.homepage [data-home-section="services"] .grid { gap: 1.25rem; }
.homepage [data-home-section="services"] .grid > div > a > div { border-radius: 8px; padding: 2.25rem; min-height: 355px; }
.homepage [data-home-section="services"] .grid h3 { font-size: 1.5rem; line-height: 1.3; letter-spacing: -.025em; }
.homepage [data-home-section="services"] .grid p { line-height: 1.8; }
.homepage [data-home-section="services"] .glass-strong { border-radius: 8px; }
.homepage [data-home-section="clients"] > section { padding-block: 4rem; }
.homepage [data-home-section="clients"] h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); }
.homepage [data-home-section="technology"] .grid,
.homepage [data-home-section="process"] .grid { max-width: none; gap: 1.25rem; }
.homepage [data-home-section="technology"] .grid > div,
.homepage [data-home-section="process"] .dark-surface { border-radius: 8px; padding: 2rem; }
.homepage [data-home-section="technology"] h3 { font-family: var(--font-geist-mono), monospace; font-size: 1.25rem; }
.homepage [data-home-section="open-source"] > section > .container {
  display: grid; grid-template-columns: 1fr 1fr; column-gap: 4rem; align-items: center;
}
.homepage [data-home-section="open-source"] .container > div:first-child { text-align: left; margin: 0; }
.homepage [data-home-section="open-source"] .container > .grid { width: 100%; max-width: none; margin-bottom: 0; }
.homepage [data-home-section="open-source"] .container > .grid > a { min-height: 180px; display: flex; flex-direction: column; justify-content: center; border-radius: 8px; }
.homepage [data-home-section="open-source"] .container > div:last-child { grid-column: 2; align-items: flex-start; margin-top: 2rem; }
.homepage [data-home-section="process"] .container > .max-w-5xl { max-width: none; }
.homepage [data-home-section="testimonials"] .grid.max-w-7xl { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.5rem; max-width: none; }
.homepage [data-home-section="testimonials"] .grid.max-w-7xl > div > div { border-radius: 8px; }
.homepage [data-home-section="testimonials"] .grid.max-w-7xl > div > div > div { padding: 2.25rem; }
.homepage [data-home-section="testimonials"] .grid.max-w-7xl p { line-height: 1.85; }
.homepage [data-home-section="consultation"] .max-w-4xl { max-width: none; }
.homepage [data-home-section="consultation"] .glass-strong { border-radius: 8px; padding-block: clamp(3rem, 6vw, 6rem); }
.homepage [data-home-section="consultation"] h2 { max-width: 850px; margin-inline: auto; }
.homepage > footer { border-top: 0; }
.homepage > footer h3 { letter-spacing: .15em; }
/* Compact screens retain all content in normal document flow. */
@media (max-width: 1199px) {
  .homepage .homepage-hero h1 { font-size: clamp(3rem, 6vw, 5rem); }
  .engineering-lab { top: 230px; width: 29vw; }
}
@media (max-width: 1023px) {
  .homepage .homepage-hero > section { min-height: auto; padding-top: 150px; padding-bottom: 2rem; }
  .homepage .homepage-hero h1 { max-width: none; font-size: clamp(3rem, 7.8vw, 5.5rem); }
  .homepage .homepage-hero h1 + p { max-width: 680px; font-size: 1.2rem; }
  .homepage .homepage-hero h1 + p + div { margin-bottom: 3rem; }
  .engineering-lab { position: relative; top: auto; right: auto; width: auto; max-width: 520px; margin: 0 auto 4rem; }
  .homepage [data-home-section="open-source"] > section > .container { display: block; }
  .homepage [data-home-section="open-source"] .container > div:first-child { margin-bottom: 2.5rem; }
  .homepage [data-home-section="open-source"] .container > div:last-child { align-items: center; }
  .homepage [data-home-section="testimonials"] .grid.max-w-7xl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 639px) {
  .homepage .homepage-hero > section { padding-top: 135px; }
  .homepage .homepage-hero h1 { font-size: clamp(2.6rem, 10.5vw, 4rem); letter-spacing: -.05em; }
  .homepage .homepage-hero h1 + p { font-size: 1.05rem; }
  .homepage .homepage-hero .grid > div { padding: 1.75rem 1rem; border-bottom: 1px solid var(--home-rule); }
  .homepage .homepage-hero .grid > div:nth-child(odd) { padding-left: 0; }
  .homepage .homepage-hero .grid > div:nth-child(even) { border-right: 0; }
  .engineering-lab { margin-inline: 1.25rem; }
  .homepage [data-home-section="services"] .grid > div > a > div { min-height: auto; padding: 1.75rem; }
  .homepage [data-home-section="testimonials"] .grid.max-w-7xl { grid-template-columns: minmax(0, 1fr); }
  .homepage [data-home-section="consultation"] .glass-strong { padding-inline: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  .engineering-lab__orbit { animation: none; }
  .homepage *, .homepage *::before, .homepage *::after { scroll-behavior: auto; transition-duration: 0s !important; }
  /* Keep existing entrance content visible for visitors who prefer less motion. */
  .homepage [style*="opacity"] { opacity: 1 !important; transform: none !important; }
}
```

### `frontend/src/app/styles.css`

SHA-256: `b00b70e5f75a59c5479120224030648be2b5c282545a56e56e3c613672e71ac4`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 215 55% 8%;
    --foreground: 0 0% 100%;
    --primary: 206 100% 31%;
    --primary-foreground: 0 0% 100%;
    --secondary: 45 100% 69%;
    --secondary-foreground: 215 60% 5%;
    --accent: 45 100% 69%;
    --accent-foreground: 215 60% 5%;
    --muted: 220 13% 64%;
    --muted-foreground: 214 11% 90%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 215 25% 20%;
    --input: 215 30% 15%;
    --ring: 45 100% 69%;
    --radius: 0.75rem;
    --card: 215 50% 12%;
    --card-hover: 215 45% 15%;
  }
  
  * {
    border-color: hsl(var(--border));
  }
  
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-feature-settings: "rlig" 1, "calt" 1;
  }
  
  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .glass {
    background-color: rgba(11, 26, 43, 0.8);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(0, 83, 156, 0.1);
  }
  
  .glass-strong {
    background-color: rgba(11, 26, 43, 0.95);
    backdrop-filter: blur(40px);
    border: 1px solid rgba(0, 83, 156, 0.2);
  }
  
  .glass-hover:hover {
    background-color: rgba(11, 26, 43, 0.9);
    border-color: rgba(0, 83, 156, 0.25);
  }

  .neon-border {
    box-shadow: 0 0 15px rgba(0, 83, 156, 0.4), 0 0 30px rgba(0, 83, 156, 0.2);
  }

  .neon-border-yellow {
    box-shadow: 0 0 15px rgba(255, 214, 98, 0.4), 0 0 30px rgba(255, 214, 98, 0.2);
  }

  .gradient-text {
    background-image: linear-gradient(135deg, #00539C 0%, #0073CC 30%, #FFD662 100%);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .shadow-premium {
    box-shadow: 0 4px 20px rgba(0, 83, 156, 0.15), 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .shadow-premium-lg {
    box-shadow: 0 8px 30px rgba(0, 83, 156, 0.2), 0 4px 12px rgba(0, 0, 0, 0.4);
  }

  .shadow-glow-yellow {
    box-shadow: 0 4px 20px rgba(255, 214, 98, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .shadow-glow-yellow-lg {
    box-shadow: 0 8px 30px rgba(255, 214, 98, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .shadow-glow {
    box-shadow: 0 4px 20px rgba(0, 83, 156, 0.25), 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .shadow-glow-lg {
    box-shadow: 0 8px 30px rgba(0, 83, 156, 0.35), 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .dark-surface {
    background-color: rgba(11, 26, 43, 0.6);
  }
  
  .dark-surface-hover:hover {
    background-color: rgba(11, 26, 43, 0.8);
  }
}
```

### `frontend/tailwind.config.ts`

SHA-256: `2b5222886738acb40f234d33823083aec350f5b9810589648e1e320467757b31`

```tsx
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          hover: 'hsl(var(--card-hover))',
          foreground: 'hsl(var(--foreground))',
        },
        surface: {
          dark: '#0B1A2B',
          darker: '#0B0F19',
          light: '#E6F0FA',
        },
        // Deep Blue - Primary Brand Color (Trust, Reliability, Technical Expertise)
        primary: {
          DEFAULT: '#00539C',
          foreground: '#FFFFFF',
          50: '#E6F0FA',
          100: '#CCE1F5',
          200: '#99C3EB',
          300: '#66A5E1',
          400: '#3387D7',
          500: '#00539C',
          600: '#00447D',
          700: '#00335E',
          800: '#00223F',
          900: '#001120',
          950: '#000810',
        },
        // Vibrant Yellow - Secondary Accent (Energy, Attention, Conversion)
        secondary: {
          DEFAULT: '#FFD662',
          foreground: '#0B0F19',
          50: '#FFFBF0',
          100: '#FFF7E0',
          200: '#FFEFC2',
          300: '#FFE7A3',
          400: '#FFDF85',
          500: '#FFD662',
          600: '#FFCA3D',
          700: '#FFB800',
          800: '#D69600',
          900: '#8A6100',
        },
        // Strategic Accent Colors
        accent: {
          DEFAULT: '#FFD662',
          foreground: '#0B0F19',
          blue: '#00539C',
          yellow: '#FFD662',
          gray: '#9CA3AF',
          dark: '#0B0F19',
        },
        muted: {
          DEFAULT: '#9CA3AF',
          foreground: '#E5E7EB',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00539C, 0 0 10px #00539C' },
          '100%': { boxShadow: '0 0 15px #00539C, 0 0 20px #FFD662' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        'glow-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(0, 83, 156, 0.3)',
        'glow': '0 0 15px rgba(0, 83, 156, 0.4)',
        'glow-lg': '0 0 20px rgba(0, 83, 156, 0.5)',
        'glow-yellow': '0 0 15px rgba(255, 214, 98, 0.4)',
        'glow-cyan': '0 0 15px rgba(0, 83, 156, 0.3)',
        'premium': '0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)',
        'premium-lg': '0 20px 40px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### `frontend/src/app/layout.tsx`

SHA-256: `3cdd7fc2a8184ca6733f485f916fa7eb2871a30f5d9bbd4dace6035098691b2f`

```tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './styles.css';
import ToastProvider from '@/components/providers/ToastProvider';
import ChatWidget from '@/components/layout/ChatWidget';
import { generateSEO, generateStructuredData } from '@/lib/seo';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iitdeveloper.com'),
  ...generateSEO({
    title: 'Premium Web Development, AI Solutions & DevOps',
    description: 'Expert web development, AI automation, and cloud infrastructure. Build scalable applications with modern frameworks. Fast, reliable, and built to last.',
  }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateStructuredData('Organization');
  const websiteSchema = generateStructuredData('WebSite');

  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external origins for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="theme-color" content="#0b1a2b" />
        <meta name="color-scheme" content="dark" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7VZRZJC8C8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7VZRZJC8C8');
          `}
        </Script>
        <div className="relative min-h-screen bg-background">
          {/* Background gradient overlay - Softer */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/3" />
          
          {/* Grid background - More subtle */}
          <div className="fixed inset-0 -z-10 grid-background opacity-10" />
          
          {children}
          
          <ChatWidget />
          <ToastProvider />
        </div>
      </body>
    </html>
  );
}
```

### `frontend/package.json`

SHA-256: `7016a9c646aac5c3a470e5a255ef895dbf255cf6b268838af626b839ee31fcee`

```json
{
  "name": "iitdeveloper-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:migrate:neon": "node migrate.js",
    "setup:backend": "chmod +x scripts/setup-backend.sh && scripts/setup-backend.sh",
    "test:api": "chmod +x scripts/test-api.sh && scripts/test-api.sh",
    "test:integration": "chmod +x scripts/test-integration.sh && scripts/test-integration.sh",
    "test:pdf": "chmod +x scripts/test-pdf.sh && scripts/test-pdf.sh"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.0",
    "@neondatabase/serverless": "^1.1.0",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-select": "^2.2.6",
    "@react-three/drei": "^9.105.0",
    "@react-three/fiber": "^8.16.0",
    "@types/nodemailer": "^8.0.1",
    "axios": "^1.6.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "date-fns": "^3.3.0",
    "framer-motion": "^11.0.0",
    "html2canvas": "^1.4.0",
    "jspdf": "^2.5.0",
    "lucide-react": "^0.363.0",
    "next": "^14.2.0",
    "nodemailer": "^9.0.1",
    "pdfkit": "^0.15.0",
    "pg": "^8.11.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-hook-form": "^7.51.0",
    "react-hot-toast": "^2.4.0",
    "tailwind-merge": "^2.2.0",
    "three": "^0.163.0",
    "zod": "^3.22.0",
    "zustand": "^4.5.0"
  },
  "devDependencies": {
    "@imgly/background-removal-node": "^1.4.5",
    "@tailwindcss/typography": "^0.5.12",
    "@types/node": "^20.11.0",
    "@types/pdfkit": "^0.13.9",
    "@types/pg": "^8.11.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.163.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^10.4.1",
    "eslint-config-next": "^16.2.4",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.4.0"
  }
}
```
