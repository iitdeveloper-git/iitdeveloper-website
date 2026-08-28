import Link from 'next/link';
import { Github, GitPullRequest } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OSSCommunityCTA() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="oss-community-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.06] via-transparent to-secondary/[0.04] p-10 lg:p-14 text-center">
          <h2 id="oss-community-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 tracking-tight">
            Build with us, <span className="gradient-text">not just with our code</span>
          </h2>
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Found a bug, have an integration idea, or want to improve the project? Open an issue, start a
            discussion or contribute a pull request.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/iitdeveloper-git" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="neon">
                <Github className="mr-2 w-4 h-4" />
                Explore GitHub
              </Button>
            </a>
            <a href="https://github.com/iitdeveloper-git" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">
                <GitPullRequest className="mr-2 w-4 h-4" />
                Start Contributing
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
