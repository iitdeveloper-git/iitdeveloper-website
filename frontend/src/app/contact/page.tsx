import type { Metadata } from 'next';
import { Mail, CalendarDays } from 'lucide-react';
import PageShell from '@/components/layout/PageShell';
import ContactForm from '@/components/forms/ContactForm';
import { generateSEO } from '@/lib/seo';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = generateSEO({ title: 'Contact IITDEVELOPER', description: 'Discuss an AI, cloud, software development, or search visibility project with IITDEVELOPER.', canonical: '/contact' });

export default function ContactPage() {
  return (
    <PageShell>
      <section className="pb-20 pt-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold tracking-[0.18em] text-secondary">CONTACT</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tighter sm:text-7xl">Tell us what you are trying to solve.</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-muted-foreground">Share the business objective, current system, constraints, and desired timeline. We will respond with a practical next step.</p>
        </div>
      </section>
      <section className="pb-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.7fr_1fr] sm:px-6 lg:px-8">
          <ContactForm />
          <aside className="space-y-5">
            <a href={`mailto:${siteConfig.email}`} className="glass flex items-start gap-4 rounded-2xl border border-white/10 p-6"><Mail className="h-6 w-6 text-secondary" /><div><h2 className="font-bold">Email</h2><p className="mt-1 text-sm text-muted-foreground">{siteConfig.email}</p></div></a>
            <a href={siteConfig.bookingUrl} className="glass flex items-start gap-4 rounded-2xl border border-white/10 p-6"><CalendarDays className="h-6 w-6 text-secondary" /><div><h2 className="font-bold">Discovery call</h2><p className="mt-1 text-sm text-muted-foreground">Choose a time using the configured booking link.</p></div></a>
            <div className="glass rounded-2xl border border-white/10 p-6"><h2 className="font-bold">What happens next?</h2><ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground"><li>1. We review the objective and constraints.</li><li>2. We identify missing information and likely approaches.</li><li>3. We recommend discovery, an estimate, or a focused technical next step.</li></ol></div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
