import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import CTA from '@/components/sections/CTA';
import { additionalCapabilities, servicePillars } from '@/content/site';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'AI, Cloud and Software Engineering Services',
  description: 'Explore IITDEVELOPER services across AI automation, cloud and DevOps, SaaS development, and SEO, GEO and AI search visibility.',
  canonical: '/services',
});

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="pb-16 pt-36 text-center">
        <div className="container mx-auto px-4">
          <p className="text-sm font-bold tracking-[0.18em] text-secondary">SERVICES</p>
          <h1 className="mx-auto mt-4 max-w-5xl text-5xl font-bold tracking-tighter sm:text-7xl">AI, Cloud and Software Engineering for Growing Businesses</h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">Design, build, automate, deploy, and improve reliable technology products with one engineering-led delivery partner.</p>
        </div>
      </section>
      <section className="pb-24">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2 sm:px-6 lg:px-8">
          {servicePillars.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.slug} className="glass rounded-2xl border border-white/10 p-8">
                <Icon className="h-9 w-9 text-secondary" />
                <h2 className="mt-5 text-3xl font-bold">{service.title}</h2>
                <p className="mt-4 leading-7 text-muted-foreground">{service.description}</p>
                <ul className="mt-6 space-y-3">{service.capabilities.map((item) => <li key={item} className="flex gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-secondary" />{item}</li>)}</ul>
                <Link href={`/services/${service.slug}`} className="mt-7 inline-flex items-center font-semibold text-secondary">{service.cta}<ArrowRight className="ml-2 h-4 w-4" /></Link>
              </article>
            );
          })}
        </div>
      </section>
      <section className="border-y border-white/10 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Additional capabilities</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">Available when they support a broader product or growth engagement, without competing with the four primary service pillars.</p>
          <div className="mt-7 flex flex-wrap gap-3">{additionalCapabilities.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">{item}</span>)}</div>
        </div>
      </section>
      <CTA />
    </PageShell>
  );
}
