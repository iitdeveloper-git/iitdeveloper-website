'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { servicePillars } from '@/content/site';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', children: servicePillars.map((service) => ({ label: service.shortTitle, href: `/services/${service.slug}` })) },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation({ mobile, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  if (mobile) {
    return (
      <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
        {navItems.map((item) => (
          <div key={item.href}>
            {item.children ? (
              <>
                <div className="flex items-center gap-2">
                  <Link href={item.href} onClick={onNavigate} className="flex-1 rounded-xl px-4 py-3 font-medium hover:bg-white/5">
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    aria-label="Toggle services menu"
                    onClick={() => setServicesOpen((value) => !value)}
                    className="rounded-xl p-3 hover:bg-white/5"
                  >
                    <ChevronDown className={cn('h-4 w-4 transition-transform', servicesOpen && 'rotate-180')} />
                  </button>
                </div>
                {servicesOpen && (
                  <div className="ml-4 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground">
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn('block rounded-xl px-4 py-3 font-medium hover:bg-white/5', pathname === item.href && 'bg-primary/15 text-secondary')}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav aria-label="Primary navigation" className="flex items-center gap-1">
      {navItems.map((item) => (
        <div key={item.href} className="group relative">
          <Link
            href={item.href}
            className={cn(
              'flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-secondary xl:px-4',
              (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))) && 'text-secondary'
            )}
          >
            {item.label}
            {item.children && <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />}
          </Link>
          {item.children && (
            <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="glass-strong w-80 rounded-2xl border border-white/10 p-2 shadow-premium-lg">
                {item.children.map((child) => (
                  <Link key={child.href} href={child.href} className="block rounded-xl px-4 py-3 text-sm hover:bg-primary/10 hover:text-secondary">
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
