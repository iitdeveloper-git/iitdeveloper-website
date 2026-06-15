'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { LineItem } from '@/types/pricing';
import { serviceTemplates } from '@/lib/pricing-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LineItemCardProps {
  item: LineItem;
  index: number;
  onUpdate: (id: string, updates: Partial<LineItem>) => void;
  onRemove: (id: string) => void;
  onConfigure: (id: string) => void;
}

export default function LineItemCard({
  item,
  index,
  onUpdate,
  onRemove,
  onConfigure,
}: LineItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingQty, setIsEditingQty] = useState(false);

  const service = serviceTemplates.find((s) => s.id === item.serviceId);
  const IconComponent = (service
    ? LucideIcons[service.icon as keyof typeof LucideIcons] || LucideIcons.Box
    : LucideIcons.Box) as React.ComponentType<{ className?: string }>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className="glass glass-hover rounded-2xl border border-primary/10 overflow-hidden group"
    >
      {/* Main Content */}
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Index & Icon */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl glass-strong text-sm font-bold text-muted-foreground/70">
              {index + 1}
            </div>
            <div className="p-3 rounded-xl glass-strong shadow-glow-sm">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg mb-1">{item.serviceName}</h3>
                {service && (
                  <p className="text-sm text-muted-foreground/70 font-light">
                    {service.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg hover:bg-white/[0.05] transition-colors opacity-0 group-hover:opacity-100"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quantity & Price */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground/70">Qty:</span>
                {isEditingQty ? (
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdate(item.id, { quantity: parseInt(e.target.value) || 1 })}
                    onBlur={() => setIsEditingQty(false)}
                    className="w-16 px-3 py-1.5 rounded-lg glass-strong border border-primary/10 text-center focus:outline-none focus:border-primary/40"
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={() => setIsEditingQty(true)}
                    className="px-3 py-1.5 rounded-lg glass-strong hover:bg-white/[0.05] font-medium transition-colors"
                  >
                    {item.quantity}
                  </button>
                )}
                <span className="text-sm text-muted-foreground/70">× {item.unit}</span>
              </div>

              <div className="flex-1" />

              <div className="text-right">
                <p className="text-sm text-muted-foreground/70 mb-1">Base Price</p>
                <p className="font-mono text-lg">
                  ${(item.basePrice * item.quantity).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground/70 mb-1">Total</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  ${item.totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Configuration */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-6 pt-6 border-t border-primary/10"
          >
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">
                Configuration
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onConfigure(item.id)}
                className="gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </Button>
            </div>

            <div className="space-y-3">
              {Object.entries(item.configuration).map(([key, value]) => {
                const option = service?.options.find((opt) => opt.id === key);
                if (!option) return null;

                let displayValue = value;
                if (option.type === 'select') {
                  const selectedOption = option.options?.find((opt) => opt.value === value);
                  displayValue = selectedOption?.label || value;
                } else if (option.type === 'multiselect' && Array.isArray(value)) {
                  displayValue = value
                    .map((v) => {
                      const opt = option.options?.find((o) => o.value === v);
                      return opt?.label || v;
                    })
                    .join(', ');
                } else if (option.type === 'checkbox') {
                  displayValue = value ? 'Yes' : 'No';
                }

                return (
                  <div key={key} className="flex items-center justify-between py-2">
                    <span className="text-sm text-muted-foreground/70">{option.label}:</span>
                    <span className="text-sm font-medium">{String(displayValue)}</span>
                  </div>
                );
              })}
            </div>

            {item.notes && (
              <div className="mt-4 p-4 rounded-xl glass-strong">
                <p className="text-sm text-muted-foreground/70 mb-1">Notes:</p>
                <p className="text-sm">{item.notes}</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
