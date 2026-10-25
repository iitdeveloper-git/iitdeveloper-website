'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ExternalLink,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChefHat,
  Users,
  LayoutDashboard,
  CheckCircle2,
  Copy,
  Check,
  Maximize2,
  RefreshCw,
  GitBranch,
} from 'lucide-react';

type RoleType = 'Worker' | 'Customer' | 'Manager';

interface RoleData {
  title: string;
  badge: string;
  user: string;
  code: string;
  pass: string;
  summary: string;
  headline: string;
  subheadline: string;
  steps: { num: string; title: string; desc: string }[];
  screens: { id: string; label: string }[];
}

const roleDetails: Record<RoleType, RoleData> = {
  Worker: {
    title: 'Store Worker',
    badge: '02 / KITCHEN EXPERIENCE',
    user: 'worker',
    code: 'EMP-WORKER',
    pass: 'BB-GFbZ-u9shUgRGB0T',
    summary: 'Suresh Kumar · @worker',
    headline: 'Less juggling.',
    subheadline: 'More serving.',
    steps: [
      {
        num: '1',
        title: 'See every order',
        desc: 'New, preparing, ready and served — each in its own live queue column.',
      },
      {
        num: '2',
        title: 'Keep customers updated',
        desc: 'One-click status transitions update customer order tracking in real time.',
      },
      {
        num: '3',
        title: 'Stay in control',
        desc: 'Mark counter payments received and instantly toggle dishes as sold out.',
      },
    ],
    screens: [
      { id: '01', label: 'Orders Queue' },
      { id: '02', label: 'Dish Availability' },
      { id: '03', label: 'Staff Profile' },
    ],
  },
  Customer: {
    title: 'Office Customer',
    badge: '01 / CUSTOMER EXPERIENCE',
    user: 'customer',
    code: 'EMP-CUSTOMER',
    pass: 'BB-7G2iWdW4ZvrHo0Hl',
    summary: 'Aarav Sharma · @customer',
    headline: 'Your cafeteria.',
    subheadline: 'In your pocket.',
    steps: [
      {
        num: '1',
        title: 'Discover your next meal',
        desc: 'Browse chef specials, nutritional macros (calories, protein, carbs), and allergen notices.',
      },
      {
        num: '2',
        title: 'Order in a few taps',
        desc: 'Add to lunch bag, confirm counter pickup, and receive a secure unique token.',
      },
      {
        num: '3',
        title: 'Know when it is ready',
        desc: 'Follow food progression from prep to counter pickup with zero cafeteria wait time.',
      },
    ],
    screens: [
      { id: '01', label: 'Explore Menu' },
      { id: '02', label: 'Nutrition & Bag' },
      { id: '03', label: 'Live Order Tracker' },
    ],
  },
  Manager: {
    title: 'Cafeteria Manager',
    badge: '03 / OPERATIONS DASHBOARD',
    user: 'manager',
    code: 'EMP-MANAGER',
    pass: 'BB-oPE9gbYwHvtlDY2v',
    summary: 'Ravi Mehta · @manager',
    headline: 'Your kitchen.',
    subheadline: 'At a glance.',
    steps: [
      {
        num: '1',
        title: 'Real-time kitchen KPIs',
        desc: 'Monitor paid revenue, kitchen volume, and item velocity in live operational charts.',
      },
      {
        num: '2',
        title: 'Full order audit ledger',
        desc: 'Complete timestamped audit log of all orders with one-click CSV export.',
      },
      {
        num: '3',
        title: 'Dynamic store control',
        desc: 'Manage dish pricing, add new menu items, configure staff accounts, and pause orders.',
      },
    ],
    screens: [
      { id: '01', label: 'Overview Metrics' },
      { id: '02', label: 'Menu & Pricing' },
      { id: '03', label: 'Team & Orders' },
    ],
  },
};

export default function BitebreakCaseStudy() {
  const [selectedRole, setSelectedRole] = useState<RoleType>('Worker');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeRole = roleDetails[selectedRole];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    if (iframeRef.current) {
      iframeRef.current.src = `/demos/bitebreak/index.html?role=${role.toLowerCase()}`;
    }
  };

  const reloadIframe = () => {
    if (iframeRef.current) {
      iframeRef.current.src = `/demos/bitebreak/index.html?role=${selectedRole.toLowerCase()}&t=${Date.now()}`;
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Header />

      {/* Atmospheric Background Effects */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-secondary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-0 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Header */}
      <section className="pt-32 pb-10 border-b border-border/40 bg-surface-dark/40 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-secondary text-xs font-semibold tracking-wide uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Digital Prototype</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4">
              BiteBreak <span className="gradient-text">— Smart Cafeteria System</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-3xl leading-relaxed">
              A high-throughput, multi-role operating platform built for corporate cafeterias.
              Synchronizes customer orders, kitchen display queue tickets, and managerial oversight in sub-100ms real-time states.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ChefHat className="w-4 h-4 text-secondary" />
                <span>Client: <strong>Corporate Cafeterias</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Security: <strong>RBAC + Session Guard</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Architecture: <strong>Zero-Latency Sync</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-muted-foreground" />
                <a
                  href="https://github.com/iitdeveloper-git/bitebreak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-secondary underline transition-colors"
                >
                  GitHub Repository
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Sandbox (3-Column Layout Matching Prototype) */}
      <section className="py-12 lg:py-16 bg-surface-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
          {/* Top Bar for Studio */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-card/60 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold tracking-wide">
                LIVE INTERACTIVE RUNTIME · <strong>IITDEVELOPER STUDIO</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={reloadIframe}
                className="gap-2 text-xs border-border/60 hover:border-secondary/40"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset Simulator
              </Button>
              <a
                href="/demos/bitebreak/index.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="gap-2 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Open Fullscreen
                </Button>
              </a>
            </div>
          </div>

          {/* 3-Column Studio Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Controls, Role Switcher, & Credentials */}
            <div className="lg:col-span-3 bg-card/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col gap-6">
              {/* Brand Logo */}
              <div className="border-b border-border/40 pb-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-md bg-[#086c60] text-white font-bold flex items-center justify-center text-xs">
                    b.
                  </span>
                  <span className="text-xl font-bold tracking-tight text-foreground">
                    bite<em className="text-secondary not-italic">break</em>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  One cafeteria. Everyone connected.
                </p>
              </div>

              {/* Role Switcher */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-3">
                  Select Preview Persona
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(['Worker', 'Customer', 'Manager'] as RoleType[]).map((role) => {
                    const isSelected = selectedRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => handleRoleSelect(role)}
                        className={`text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                          isSelected
                            ? 'bg-secondary/15 border-secondary/50 text-foreground shadow-glow-yellow'
                            : 'bg-surface-muted/50 border-white/5 text-muted-foreground hover:border-white/20 hover:text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {role === 'Worker' && <ChefHat className={`w-4 h-4 ${isSelected ? 'text-secondary' : ''}`} />}
                          {role === 'Customer' && <Users className={`w-4 h-4 ${isSelected ? 'text-secondary' : ''}`} />}
                          {role === 'Manager' && <LayoutDashboard className={`w-4 h-4 ${isSelected ? 'text-secondary' : ''}`} />}
                          <div>
                            <div className="text-sm font-semibold">{roleDetails[role].title}</div>
                            <div className="text-[11px] opacity-75 font-mono">@{roleDetails[role].user}</div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-secondary" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Profile Card */}
              <div className="p-4 rounded-xl bg-surface-muted/60 border border-white/5 text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-secondary">ACTIVE DEMO ACCOUNT</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-dark border border-white/10">
                    {activeRole.code}
                  </span>
                </div>
                <div className="font-bold text-foreground text-base mb-1">{activeRole.summary.split(' · ')[0]}</div>
                <div className="text-xs text-muted-foreground mb-3">{activeRole.summary.split(' · ')[1]}</div>

                {/* Quick Copy Credentials */}
                <div className="space-y-1.5 pt-2 border-t border-border/40 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">User:</span>
                    <span className="text-foreground">{activeRole.user}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">Pass:</span>
                    <span className="text-foreground truncate max-w-[120px]">{activeRole.pass}</span>
                    <button
                      onClick={() => copyToClipboard(activeRole.pass, 'pass')}
                      className="p-1 hover:text-secondary text-muted-foreground"
                      title="Copy password"
                    >
                      {copiedKey === 'pass' ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* App Screens List */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                  App Screens
                </label>
                <div className="space-y-1.5">
                  {activeRole.screens.map((scr) => (
                    <div
                      key={scr.id}
                      className="px-3.5 py-2 rounded-lg bg-surface-dark/40 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-foreground/90">{scr.label}</span>
                      <span className="font-mono text-muted-foreground/70">{scr.id}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colophon */}
              <div className="pt-4 border-t border-border/40 text-[11px] text-muted-foreground leading-relaxed">
                <strong>DESIGNED BY IITDEVELOPER</strong>
                <p>High-fidelity client simulation · Zero personal data collected.</p>
              </div>
            </div>

            {/* CENTER COLUMN: iPhone Device Mockup Simulator */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              {/* iPhone Bezel Wrapper */}
              <div className="relative w-full max-w-[390px] h-[780px] bg-[#1a1c1e] rounded-[52px] p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-[#2e3236]">
                {/* Side Buttons & Accents */}
                <div className="absolute -left-[7px] top-[115px] w-[3px] h-[26px] bg-[#2a2c30] rounded-l" />
                <div className="absolute -left-[7px] top-[155px] w-[3px] h-[45px] bg-[#2a2c30] rounded-l" />
                <div className="absolute -left-[7px] top-[210px] w-[3px] h-[45px] bg-[#2a2c30] rounded-l" />
                <div className="absolute -right-[7px] top-[160px] w-[3px] h-[65px] bg-[#2a2c30] rounded-r" />

                {/* iPhone Screen Container */}
                <div className="relative w-full h-full bg-black rounded-[42px] overflow-hidden flex flex-col">
                  {/* Dynamic Island Pill */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0a251b]" />
                  </div>

                  {/* Embedded Prototype Iframe */}
                  <iframe
                    ref={iframeRef}
                    src="/demos/bitebreak/index.html"
                    title="Bitebreak Cafeteria App Prototype"
                    className="w-full h-full border-0 bg-[#f7faf6]"
                    loading="eager"
                  />
                </div>
              </div>

              <div className="text-xs text-muted-foreground text-center mt-4 flex items-center gap-2">
                <Smartphone className="w-3.5 h-3.5 text-secondary" />
                <span>Interactive viewport: Click, scroll, place demo orders</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Editorial Storytelling & Architecture */}
            <div className="lg:col-span-4 bg-card/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col gap-6">
              {/* Eyebrow & Headline */}
              <div>
                <span className="text-xs font-bold tracking-wider text-secondary uppercase block mb-2 font-mono">
                  {activeRole.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                  {activeRole.headline}
                  <br />
                  <span className="text-secondary drop-shadow-[0_0_25px_rgba(139,224,186,0.3)]">
                    {activeRole.subheadline}
                  </span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                  A synchronized, role-based architecture designed to eliminate cafeteria bottlenecks and keep tickets moving smoothly.
                </p>
              </div>

              {/* Step Walkthrough */}
              <div className="space-y-4 pt-4 border-t border-border/40">
                {activeRole.steps.map((st) => (
                  <div key={st.num} className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-full bg-secondary/10 border border-secondary/30 text-secondary font-bold text-xs flex items-center justify-center shrink-0">
                      {st.num}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{st.title}</h3>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Design System Swatches */}
              <div className="pt-4 border-t border-border/40">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2.5">
                  Design Tokens
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#086c60] border border-white/10 shadow-sm" />
                    <span className="text-[11px] text-muted-foreground font-mono">#086c60</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#d9e9ce] border border-white/10 shadow-sm" />
                    <span className="text-[11px] text-muted-foreground font-mono">#d9e9ce</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#e98243] border border-white/10 shadow-sm" />
                    <span className="text-[11px] text-muted-foreground font-mono">#e98243</span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-2">
                  Forest Teal · Soft Sage · Warm Orange · Built for high readability under cafeteria lighting.
                </p>
              </div>

              {/* CTA Panel */}
              <div className="pt-4 border-t border-border/40 space-y-3">
                <Link href="/contact" className="w-full">
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-glow-yellow">
                    Build a Prototype for Your Business
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <a
                  href="/demos/bitebreak/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button variant="outline" className="w-full text-xs border-border/60">
                    <ExternalLink className="w-3.5 h-3.5 mr-2" />
                    Open Dedicated Browser Tab
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Deep-Dive Section */}
      <section className="py-20 bg-background border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest uppercase text-secondary font-mono">
              ENGINEERING LAB REPORT
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold mt-3 mb-4">
              Architecture & Technical Precision
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              How IITDeveloper conceptualized, designed, and engineered BiteBreak into a scalable, production-ready full-stack system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-card border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Sub-100ms Ticket Sync</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                State updates automatically propagate between the customer checkout queue, worker station, and manager totalizer without page reloads.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Zero-Leakage RBAC</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Multi-tenant session tokens enforce strict isolation. Customer accounts cannot access KDS ticket manipulation or manager financial summaries.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">Containerized Fleet</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Packaged with Docker and Gunicorn with automated healthcheck probes, read-only root filesystems, and minimal memory footprints.
              </p>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="text-center pt-8 border-t border-border/40">
            <Link href="/case-studies">
              <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                ← Back to All Portfolio & Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
