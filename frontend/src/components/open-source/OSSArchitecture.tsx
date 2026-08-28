import { ArrowDown, ArrowRight, Github } from 'lucide-react';
import Link from 'next/link';

export default function OSSArchitecture() {
  return (
    <section className="py-20 lg:py-28 relative" aria-labelledby="oss-ecosystem-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 id="oss-ecosystem-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            From commit to production <span className="gradient-text">— and beyond</span>
          </h2>
          <p className="text-lg text-muted-foreground/80 leading-relaxed">
            DeployKit helps engineering teams ship software safely. OpsPilot helps them understand and operate
            what happens after deployment.
          </p>
        </div>

        {/* Diagram */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-10 relative overflow-hidden">
          {/* subtle circuit grid backdrop */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,83,156,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,83,156,0.6) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
            aria-hidden="true"
          />

          <p className="relative text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50 mb-8">
            IITDEVELOPER OSS
          </p>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
            {/* DeployKit column */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Build &amp; Ship</span>
              <ArrowDown className="w-4 h-4 text-primary/50 mb-3" aria-hidden="true" />
              <div className="w-full rounded-2xl border border-primary/25 bg-primary/[0.06] px-5 py-4 font-mono text-sm font-semibold text-foreground mb-3">
                DeployKit
              </div>
              <p className="text-xs text-muted-foreground/70 font-mono leading-relaxed">
                Build → Test → Secure
                <br />
                Release → Deploy
              </p>
            </div>

            {/* OpsPilot column */}
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">Operate</span>
              <ArrowDown className="w-4 h-4 text-secondary/50 mb-3" aria-hidden="true" />
              <div className="w-full rounded-2xl border border-secondary/25 bg-secondary/[0.06] px-5 py-4 font-mono text-sm font-semibold text-foreground mb-3">
                OpsPilot
              </div>
              <p className="text-xs text-muted-foreground/70 font-mono leading-relaxed">
                Monitor → Understand
                <br />
                → Act → Recover
              </p>
            </div>
          </div>

          {/* Production convergence */}
          <div className="relative flex flex-col items-center mt-8">
            <div className="flex items-center gap-2 text-muted-foreground/50 mb-2" aria-hidden="true">
              <ArrowRight className="w-4 h-4 rotate-[135deg]" />
              <span className="text-xs font-mono">production</span>
              <ArrowRight className="w-4 h-4 rotate-45" />
            </div>
            <div className="rounded-full border border-white/[0.12] bg-white/[0.03] px-6 py-2.5">
              <span className="font-mono text-sm font-semibold text-foreground">Production</span>
            </div>
            <p className="text-xs text-muted-foreground/60 mt-4 max-w-md">
              OpsPilot observes what DeployKit ships — closing the loop from deployment back to operational health.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground/60 mt-8 max-w-2xl mx-auto">
          IITDEVELOPER uses this same DeployKit → production → OpsPilot flow for its own engineering — the tools
          are built from problems we hit ourselves, not designed in the abstract.
        </p>

        <div className="flex justify-center mt-8">
          <Link
            href="https://github.com/iitdeveloper-git"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors"
          >
            <Github className="w-4 h-4" />
            See the organization on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
