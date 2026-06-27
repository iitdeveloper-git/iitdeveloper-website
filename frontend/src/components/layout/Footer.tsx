import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { servicePillars, siteConfig } from '@/content/site';

const links = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cookies', href: '/cookies' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/80">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2">
              <Image src="/logo.png" alt="" width={120} height={42} className="h-10 w-auto" />
              <span className="text-xl font-bold gradient-text">IITDEVELOPER</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              AI, cloud and software engineering for growing businesses. Founded in 2020 and strengthened through real engineering experience.
            </p>
            <a href={`mailto:${siteConfig.email}`} className="mt-5 inline-flex items-center gap-2 text-sm text-secondary hover:underline">
              <Mail className="h-4 w-4" /> {siteConfig.email}
            </a>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">Services</h2>
            <ul className="space-y-3">
              {servicePillars.map((service) => (
                <li key={service.slug}><Link href={`/services/${service.slug}`} className="text-sm text-muted-foreground hover:text-foreground">{service.shortTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">Company</h2>
            <ul className="space-y-3">
              {links.company.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">Legal</h2>
            <ul className="space-y-3">
              {links.legal.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.label}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} IITDEVELOPER. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
