import { ossPrinciples } from '@/lib/data/oss';

export default function OSSPrinciples() {
  return (
    <section className="py-20 lg:py-28 bg-white/[0.02] relative" aria-labelledby="oss-principles-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 id="oss-principles-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Why we <span className="gradient-text">open source</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {ossPrinciples.map((principle, index) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-primary/25 hover:bg-white/[0.04] transition-all duration-300"
            >
              <span className="block text-xs font-mono text-primary/60 mb-3">{`0${index + 1}`}</span>
              <h3 className="text-lg font-bold mb-2">{principle.title}</h3>
              <p className="text-sm text-muted-foreground/75 leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
