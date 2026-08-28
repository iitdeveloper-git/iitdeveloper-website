'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyableCodeProps {
  code: string;
  lang?: string;
  label?: string;
  className?: string;
}

export default function CopyableCode({ code, lang, label, className }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently, code is still selectable.
    }
  };

  return (
    <div className={cn('rounded-xl border border-white/[0.08] bg-[#080d16] overflow-hidden', className)}>
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex gap-1.5 shrink-0" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </span>
          {label && (
            <span className="text-xs text-muted-foreground/60 font-mono truncate">{label}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/70 hover:text-secondary transition-colors shrink-0"
          aria-label={copied ? 'Copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-secondary" />
              <span className="text-secondary">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className={cn('font-mono text-foreground/90', lang && `language-${lang}`)}>
          {code}
        </code>
      </pre>
    </div>
  );
}
