import type { Metadata } from 'next';
import { CheckCircle2, Compass, Wrench, ShieldCheck, MessagesSquare } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import CTA from '@/components/sections/CTA';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({ title: 'About IITDEVELOPER', description: 'Founded in 2020, IITDEVELOPER is relaunching with deeper expertise in AI, cloud, DevOps, software engineering and modern search visibility.', canonical: '/about' });

const principles = [
  { icon: Compass, title: 'Business outcome first', text: 'Technology choices follow the objective, constraints, users, and measurable definition of success.' },
  { icon: Wrench, title: 'Build for operation', text: 'Architecture, deployment, observability, documentation, and maintainability are part of delivery.' },
  { icon: ShieldCheck, title: 'Responsible engineering', text: 'Security, privacy, access control, failure modes, and human review are considered from the beginning.' },
  { icon: MessagesSquare, title: 'Transparent communication', text: 'Risks, trade-offs, scope changes, and progress remain visible throughout the engagement.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="pb-20 pt-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.18em] text-secondary">ABOUT IITDEVELOPER</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-bold tracking-tighter sm:text-7xl">Started in 2020. Rebuilt for What Comes Next.</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-muted-foreground">IITDEVELOPER began by delivering websites, applications, design, automation, and digital services. Agency operations later slowed while the founder developed deeper professional engineering experience. The next chapter brings that experience back into a clearer, engineering-led agency.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl border border-white/10 p-8"><h2 className="text-3xl font-bold">The story, honestly told</h2><div className="mt-5 space-y-4 leading-7 text-muted-foreground"><p>Founded in 2020, the agency initially supported a broad mix of digital projects for growing businesses.</p><p>During the slower operating period, expertise expanded through hands-on work in software engineering, cloud platforms, DevOps, platform reliability, automation, AI infrastructure, RAG, multi-agent systems, and open-source engineering.</p><p>IITDEVELOPER is now relaunching with a focused mission: make advanced engineering practical and accessible for startups, SMEs, and digital businesses.</p></div></div>
          <div className="glass rounded-2xl border border-secondary/20 p-8"><h2 className="text-3xl font-bold">Current focus</h2><ul className="mt-5 space-y-4">{['AI applications and intelligent automation','Cloud, DevOps, CI/CD, and platform engineering','Custom SaaS and modern software products','SEO, GEO, AEO, and technical discoverability','End-to-end delivery from discovery to production'].map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-5 w-5 text-secondary" />{item}</li>)}</ul></div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-4xl font-bold">Delivery principles</h2><div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-4">{principles.map((item) => { const Icon=item.icon; return <article key={item.title} className="glass rounded-2xl border border-white/10 p-6"><Icon className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></article>; })}</div></div>
      </section>
      <CTA />
    </PageShell>
  );
}
