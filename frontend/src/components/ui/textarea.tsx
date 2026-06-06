import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  glass?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, glass = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-xl border-2 px-5 py-4 text-base',
          'backdrop-blur-xl shadow-premium transition-all duration-300',
          'placeholder:text-muted-foreground/50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          'focus-visible:border-primary/30 focus-visible:shadow-glow',
          'hover:border-white/[0.12] hover:bg-white/[0.05]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'resize-none',
          glass
            ? 'border-white/[0.08] bg-white/[0.03]'
            : 'border-white/[0.08] bg-white/[0.03]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
