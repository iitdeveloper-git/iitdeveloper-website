import Image from 'next/image';
import { CheckCircle2, Github, MapPin, Star, GitFork, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { OSSProject } from '@/lib/data/oss';
import type { RepoMeta } from '@/lib/github';
import CopyableCode from './CopyableCode';

interface OSSProjectCardProps {
  project: OSSProject;
  meta: RepoMeta | null;
  reverse?: boolean;
}

export default function OSSProjectCard({ project, meta, reverse }: OSSProjectCardProps) {
  const shipped = project.highlights.filter((h) => h.shipped);
  const roadmap = project.highlights.filter((h) => !h.shipped);
  const license = meta?.license ?? project.fallbackLicense;

  return (
    <article
      id={project.slug}
      className="scroll-mt-28 rounded-3xl border border-white/[0.08] bg-white/[0.02] overflow-hidden shadow-premium hover:shadow-premium-lg hover:border-primary/25 transition-all duration-500"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* Banner */}
        <div className="relative min-h-[220px] lg:min-h-full bg-[#060a12]">
          <Image
            src={project.bannerImage}
            alt={`${project.name} by IITDEVELOPER — ${project.tagline}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a12] via-transparent to-transparent lg:bg-gradient-to-r" />
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/90 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
              {project.category}
            </span>
          </div>

          <h3 className="text-3xl lg:text-4xl font-bold mb-1 tracking-tight">{project.name}</h3>
          <p className="text-sm font-mono text-primary/80 mb-4">{project.tagline}</p>

          <p className="text-muted-foreground/80 leading-relaxed mb-6">{project.description}</p>

          {/* Live GitHub metadata — real values only, gracefully omitted if unavailable */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5">
              <Tag className="w-3.5 h-3.5 text-primary/70" />
              {license}
            </span>
            {meta?.latestRelease && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5">
                <Star className="w-3.5 h-3.5 text-secondary/80" />
                {meta.latestRelease}
              </span>
            )}
            {meta && meta.stars > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5">
                <Star className="w-3.5 h-3.5 text-secondary/80" />
                {meta.stars} stars
              </span>
            )}
            {meta && meta.forks > 0 && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5">
                <GitFork className="w-3.5 h-3.5 text-primary/70" />
                {meta.forks} forks
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              Public repository
            </span>
          </div>

          {/* Capabilities */}
          <div className="mb-6">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {shipped.map((item) => (
                <li key={item.label} className="flex items-start gap-2 text-sm text-foreground/85">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {roadmap.length > 0 && (
            <div className="mb-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-2.5">
                Roadmap — not yet available
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {roadmap.map((item) => (
                  <li key={item.label} className="text-sm text-muted-foreground/60">
                    → {item.label}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quickstart */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-muted-foreground/60 mb-2">{project.quickstart.label}</p>
            <CopyableCode
              code={project.quickstart.code}
              lang={project.quickstart.lang}
              label={`${project.quickstart.lang === 'yaml' ? 'workflow.yml' : 'terminal'}`}
            />
          </div>

          {/* CTAs */}
          <div className="mt-auto flex flex-wrap items-center gap-4">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="neon" className="group">
                <Github className="mr-2 w-4 h-4" />
                View {project.name} on GitHub
              </Button>
            </a>
            <a
              href={`${project.githubUrl}#readme`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary hover:text-secondary transition-colors"
            >
              Explore {project.name} →
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
