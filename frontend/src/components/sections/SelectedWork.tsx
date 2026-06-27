import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/content/work';

export default function SelectedWork() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="mb-3 text-sm font-bold tracking-[0.18em] text-secondary">SELECTED WORK</p><h2 className="text-4xl font-bold">Products and client delivery</h2></div>
          <Link href="/work" className="inline-flex items-center font-semibold text-secondary">View all work <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.slice(0, 3).map((project) => (
            <article key={project.slug} className="glass rounded-2xl border border-white/10 p-7">
              <p className="text-xs font-bold uppercase tracking-wider text-secondary">{project.label} · {project.status}</p>
              <h3 className="mt-3 text-2xl font-bold">{project.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{project.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-full bg-primary/10 px-3 py-1 text-xs text-muted-foreground">{tech}</span>)}</div>
              <Link href={`/work/${project.slug}`} className="mt-6 inline-flex items-center font-semibold text-secondary">Read case study <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
