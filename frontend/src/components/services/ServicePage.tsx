import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import CTA from '@/components/sections/CTA';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/content/site';

type Props = {
  title: string;
  intro: string;
  outcome: string;
  capabilities: string[];
  deliverables: string[];
  questions: { question: string; answer: string }[];
  slug: string;
};

export default function ServicePage({ title, intro, outcome, capabilities, deliverables, questions, slug }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: intro,
    url: `${siteConfig.url}/services/${slug}`,
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    areaServed: 'Worldwide',
  };
  return (
    <PageShell>
      <JsonLd data={schema} />
      <section className="pb-20 pt-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.18em] text-secondary">ENGINEERING SERVICE</p>
          <h1 className="mt-4 max-w-5xl text-5xl font-bold tracking-tighter sm:text-7xl">{title}</h1>
          <p className="mt-7 max-w-3xl text-xl leading-8 text-muted-foreground">{intro}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact"><span className="inline-flex items-center rounded-xl bg-secondary px-7 py-4 font-bold text-secondary-foreground">Discuss your project <ArrowRight className="ml-2 h-5 w-5" /></span></Link>
            <Link href="/estimate"><span className="glass inline-flex rounded-xl px-7 py-4 font-semibold">Get a project estimate</span></Link>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2 sm:px-6 lg:px-8">
          <div className="glass rounded-2xl border border-white/10 p-8"><h2 className="text-3xl font-bold">What this service helps achieve</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{outcome}</p></div>
          <div className="glass rounded-2xl border border-white/10 p-8"><h2 className="text-3xl font-bold">Core capabilities</h2><ul className="mt-5 space-y-3">{capabilities.map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />{item}</li>)}</ul></div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-4xl font-bold">Typical deliverables</h2><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{deliverables.map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-5">{item}</div>)}</div></div>
      </section>
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-4"><h2 className="text-4xl font-bold">Common questions</h2><div className="mt-8 space-y-4">{questions.map((item) => <details key={item.question} className="glass rounded-xl border border-white/10 p-5"><summary className="cursor-pointer font-bold">{item.question}</summary><p className="mt-4 leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></div>
      </section>
      <CTA />
    </PageShell>
  );
}
