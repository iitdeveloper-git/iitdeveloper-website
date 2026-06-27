import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { insights } from '@/content/insights';

export default function InsightsPreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-center text-sm font-bold tracking-[0.18em] text-secondary">INSIGHTS</p>
        <h2 className="text-center text-4xl font-bold">Practical insights on AI, cloud and product engineering</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {insights.map((article) => (
            <article key={article.slug} className="glass rounded-2xl border border-white/10 p-7">
              <p className="text-xs text-muted-foreground">{article.readingTime}</p>
              <h3 className="mt-3 text-xl font-bold"><Link href={`/insights/${article.slug}`} className="hover:text-secondary">{article.title}</Link></h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.summary}</p>
              <Link href={`/insights/${article.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-secondary">Read insight <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
