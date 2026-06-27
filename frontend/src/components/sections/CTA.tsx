import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/content/site';

export default function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong mx-auto max-w-5xl rounded-3xl border border-secondary/30 p-10 text-center shadow-glow-yellow-lg lg:p-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Have a Product, Platform or Automation Challenge?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Share the problem you are trying to solve. We will help you determine the right technical approach, realistic scope, and next step.</p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={siteConfig.bookingUrl}><Button variant="neon" size="xl">Book a Discovery Call <ArrowRight className="ml-2 h-5 w-5" /></Button></a>
            <Link href="/estimate"><Button variant="glass" size="xl">Request an Estimate</Button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
