'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'glass-strong shadow-premium-lg backdrop-blur-2xl' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.png"
              alt="IIT Developer"
              width={160}
              height={56}
              className="h-12 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
            <span className="text-xl lg:text-2xl font-bold gradient-text tracking-tight leading-none self-center">
              IIT Developer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation />
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-5">
            <Link href="/estimate">
              <Button variant="neon" size="lg" className="min-w-[140px]">
                Price It Out
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="glass" size="lg" className="min-w-[140px]">
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass hover:bg-primary/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-primary/10">
          <div className="container mx-auto px-4 py-6">
            <Navigation mobile onNavigate={() => setIsMobileMenuOpen(false)} />
            <div className="mt-6 space-y-3">
              <Link href="/estimate" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="neon" size="lg" className="w-full">
                  Price It Out
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="glass" size="lg" className="w-full">
                  Let's Talk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
