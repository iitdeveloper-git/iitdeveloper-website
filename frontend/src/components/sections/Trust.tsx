import { CheckCircle2 } from 'lucide-react';

const proof = ['Founded in 2020', 'Engineering-led decisions', 'Production-ready delivery', 'Transparent communication'];

export default function Trust() {
  return (
    <section className="py-20">
      <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.18em] text-secondary">BUILT ON REAL ENGINEERING EXPERIENCE</p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Founded in 2020. Strengthened for the AI era.</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">IITDEVELOPER began by helping businesses establish and improve their digital presence. After years of deeper experience in software engineering, DevOps, cloud platforms, automation, and AI systems, the agency is entering its next chapter with a sharper focus: technology that delivers measurable operational and business value.</p>
        </div>
        <div className="glass rounded-2xl border border-white/10 p-8">
          <ul className="space-y-5">
            {proof.map((item) => <li key={item} className="flex items-center gap-3 text-lg"><CheckCircle2 className="h-5 w-5 text-secondary" />{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
