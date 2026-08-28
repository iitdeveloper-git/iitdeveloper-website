import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';

const cards = [
  {
    name: 'DeployKit',
    flow: 'Build • Secure • Release • Deploy',
    accent: 'primary' as const,
  },
  {
    name: 'OpsPilot',
    flow: 'Monitor • Understand • Act',
    accent: 'secondary' as const,
  },
];

export default function OpenSourceHighlight() {
  return (
    <section className="py-20 lg:py-28 relative" aria-labelledby="oss-highlight-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Built in public</span>
          </div>
          <h2 id="oss-highlight-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            The tools behind our engineering are <span className="gradient-text">open source</span>
          </h2>
          <p className="text-lg text-muted-foreground/80 leading-relaxed">
            We don&apos;t only deliver client projects. We build reusable infrastructure and automation tools
            for the engineering community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          {cards.map((card) => (
            <Link
              key={card.name}
              href="/open-source"
              className={`group rounded-2xl border p-6 bg-white/[0.02] transition-all duration-300 ${
                card.accent === 'primary'
                  ? 'border-primary/20 hover:border-primary/40 hover:shadow-glow'
                  : 'border-secondary/20 hover:border-secondary/40 hover:shadow-glow-yellow'
              }`}
            >
              <h3 className="text-xl font-bold mb-1.5">{card.name}</h3>
              <p className="text-sm font-mono text-muted-foreground/70">{card.flow}</p>
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/open-source"
            className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-secondary transition-colors group"
          >
            Explore IITDEVELOPER Open Source
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/iitdeveloper-git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="IITDEVELOPER on GitHub"
            className="text-muted-foreground/50 hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
