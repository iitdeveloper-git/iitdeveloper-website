import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
  {
    variants: {
      variant: {
        // Primary CTA - Vibrant Yellow (High conversion)
        default: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-yellow hover:shadow-glow-yellow-lg font-bold',
        
        // Deep Blue - Secondary action button
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow hover:shadow-glow-lg',
        
        // Outlined Deep Blue
        outline: 'border-2 border-primary bg-transparent hover:bg-primary/10 hover:border-primary/80 backdrop-blur-sm text-primary transition-colors',
        
        // Destructive
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-xl',
        
        // Dark surface button
        secondary: 'bg-surface-dark text-foreground hover:bg-surface-darker shadow-md border border-primary/20',
        
        // Ghost button
        ghost: 'hover:bg-primary/10 hover:backdrop-blur-sm text-primary',
        
        // Link style
        link: 'text-primary underline-offset-4 hover:underline hover:text-primary/80',
        
        // Yellow neon (same as default for backward compatibility)
        neon: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-yellow hover:shadow-glow-yellow-lg font-bold relative overflow-hidden group',
        
        // Glass morphism
        glass: 'glass glass-hover backdrop-blur-xl shadow-premium hover:shadow-premium-lg text-foreground border-primary/20',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        lg: 'h-12 rounded-xl px-8 text-base',
        xl: 'h-14 rounded-2xl px-10 text-lg',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
