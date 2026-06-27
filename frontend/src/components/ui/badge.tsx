import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'neon' | 'purple' | 'cyan' | 'outline';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300',
          {
            'bg-primary/10 text-primary border border-primary/20': variant === 'default',
            'bg-primary/10 text-primary border border-primary/30 shadow-glow-sm': variant === 'neon',
            'bg-secondary/10 text-secondary border border-secondary/30': variant === 'purple',
            'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30': variant === 'cyan',
            'border-2 border-white/[0.12] bg-transparent': variant === 'outline',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
