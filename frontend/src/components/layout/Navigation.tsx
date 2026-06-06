'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface NavSubItem {
  label: string;
  href: string;
}

interface NavGroup {
  category: string;
  items: NavSubItem[];
}

interface NavItem {
  label: string;
  href: string;
  submenu?: NavSubItem[];
  submenuGroups?: NavGroup[];
}

interface NavigationProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  {
    label: 'What We Build',
    href: '/services',
    submenuGroups: [
      {
        category: 'Build',
        items: [
          { label: 'Websites & Apps', href: '/services/website-development' },
          { label: 'Mobile Apps', href: '/services/app-development' },
          { label: 'Shopify Store', href: '/services/shopify-store' },
          { label: 'Ecommerce Solutions', href: '/services/ecommerce' },
          { label: 'Cloud & DevOps', href: '/services/devops-cloud' },
          { label: 'Salesforce', href: '/services/salesforce' },
        ],
      },
      {
        category: 'AI',
        items: [
          { label: 'AI Agents', href: '/services/ai-agents' },
          { label: 'AI Workflows', href: '/services/ai-workflows' },
        ],
      },
      {
        category: 'Growth',
        items: [
          { label: 'Performance Marketing', href: '/services/marketing' },
          { label: 'SEO & SMM', href: '/services/seo-smm' },
          { label: 'B2B Promotion', href: '/services/b2b-promotion' },
        ],
      },
      {
        category: 'Design',
        items: [
          { label: 'Graphic Design', href: '/services/graphic-design' },
        ],
      },
    ],
  },
  { label: 'Our Work', href: '/case-studies' },
  {
    label: 'Company',
    href: '/team',
    submenu: [
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
    ],
  },
];

export default function Navigation({ mobile, onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <div key={item.href}>
            {(item.submenu || item.submenuGroups) ? (
              <>
                <button
                  onClick={() => setOpenSubmenu(openSubmenu === item.label ? null : item.label)}
                  className="flex items-center justify-between w-full text-left px-5 py-3 rounded-xl hover:bg-white/[0.05] transition-all duration-300 font-medium"
                >
                  <span className="text-base">{item.label}</span>
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 transition-transform',
                      openSubmenu === item.label && 'rotate-180'
                    )}
                  />
                </button>
                {openSubmenu === item.label && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.submenuGroups
                      ? item.submenuGroups.map((group) => (
                          <div key={group.category}>
                            <p className="px-4 pt-2 pb-1 text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50">
                              {group.category}
                            </p>
                            {group.items.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={onNavigate}
                                className={cn(
                                  'block px-4 py-2 rounded-lg text-sm transition-colors',
                                  pathname === subItem.href
                                    ? 'bg-primary/20 text-primary'
                                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                                )}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        ))
                      : item.submenu!.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={onNavigate}
                            className={cn(
                              'block px-4 py-2 rounded-lg text-sm transition-colors',
                              pathname === subItem.href
                                ? 'bg-primary/20 text-primary'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'block px-4 py-2 rounded-lg text-base font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary/20 text-primary'
                    : 'text-foreground hover:bg-white/5'
                )}
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
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className={cn(
              'px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 relative',
              pathname === item.href
                ? 'text-primary'
                : 'text-foreground hover:text-primary hover:bg-primary/[0.05]'
            )}
          >
            <span className="relative z-10 flex items-center whitespace-nowrap">
              {item.label}
              {item.submenu && <ChevronDown className="ml-1.5 w-4 h-4" />}
            </span>
            {pathname === item.href && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>

          {/* Submenu */}
          {(item.submenu || item.submenuGroups) && (
            <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              {item.submenuGroups ? (
                // Grouped dropdown (e.g. "What We Build")
                <div className="glass-strong rounded-2xl shadow-premium-lg border border-white/[0.12] overflow-hidden py-3" style={{ minWidth: '520px' }}>
                  <div className="grid grid-cols-2 gap-x-4 px-4">
                    {item.submenuGroups.map((group) => (
                      <div key={group.category} className="py-2">
                        <p className="px-2 mb-1.5 text-[10px] font-bold tracking-widest uppercase text-muted-foreground/50">
                          {group.category}
                        </p>
                        {group.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                              pathname === subItem.href
                                ? 'bg-primary/20 text-primary'
                                : 'text-foreground hover:bg-primary/5 hover:text-primary'
                            )}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 mx-4 pt-2 border-t border-white/[0.06]">
                    <Link
                      href="/services"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-secondary hover:bg-secondary/5 transition-colors"
                    >
                      View all 12 services →
                    </Link>
                  </div>
                </div>
              ) : (
                // Flat dropdown (e.g. "Company")
                <div className="glass-strong rounded-2xl shadow-premium-lg border border-white/[0.12] overflow-hidden min-w-[200px] py-2">
                  {item.submenu!.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        'block px-5 py-3 text-sm font-medium transition-colors',
                        pathname === subItem.href
                          ? 'bg-primary/20 text-primary'
                          : 'text-foreground hover:bg-primary/5 hover:text-primary'
                      )}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
