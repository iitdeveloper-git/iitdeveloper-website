import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OSSBusinessCTA() {
  return (
    <section className="py-16 lg:py-20 bg-white/[0.02]" aria-labelledby="oss-business-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="oss-business-heading" className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
            Need this kind of engineering inside your company?
          </h2>
          <p className="text-base text-muted-foreground/75 leading-relaxed mb-8 max-w-xl mx-auto">
            Our open-source work reflects how we approach CI/CD, infrastructure, AI automation and production
            systems for clients.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="default" variant="outline">
                Talk to Engineering
              </Button>
            </Link>
            <Link href="/services/devops-cloud">
              <Button size="default" variant="ghost" className="group">
                Explore DevOps Services
                <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
