'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info } from 'lucide-react';
import { ServiceTemplate, LineItemConfig } from '@/types/pricing';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceTemplate | null;
  initialConfig?: LineItemConfig;
  onSave: (config: LineItemConfig, notes?: string) => void;
}

export default function ConfigurationModal({
  isOpen,
  onClose,
  service,
  initialConfig,
  onSave,
}: ConfigurationModalProps) {
  const [config, setConfig] = useState<LineItemConfig>(initialConfig || {});
  const [notes, setNotes] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (service && !initialConfig) {
      // Set defaults
      const defaults: LineItemConfig = {};
      service.options.forEach((option) => {
        if (option.default !== undefined) {
          defaults[option.id] = option.default;
        } else if (option.type === 'multiselect') {
          defaults[option.id] = [];
        } else if (option.type === 'checkbox') {
          defaults[option.id] = false;
        }
      });
      setConfig(defaults);
    }
  }, [service, initialConfig]);

  if (!service) return null;
  if (!mounted) return null;

  const handleSave = () => {
    onSave(config, notes);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-6"
            style={{ pointerEvents: 'none' }}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{ pointerEvents: 'auto' }}
            className="w-full sm:max-w-3xl flex flex-col"
          >
            <div
              className="glass-strong sm:rounded-3xl rounded-t-3xl border border-primary/15 shadow-premium-lg flex flex-col overflow-hidden"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="p-8 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold gradient-text mb-2">Configure Service</h2>
                    <p className="text-base text-muted-foreground/70 font-light">
                      {service.name}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2.5 rounded-xl glass-hover hover:bg-white/[0.08] transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <div className="flex-1 min-h-0 overflow-y-auto p-8">
                <div className="space-y-8">
                  {service.options.map((option) => (
                    <div key={option.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-base font-semibold flex items-center gap-2">
                          {option.label}
                          {option.required && (
                            <Badge variant="neon" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </label>
                        {option.priceModifier && (
                          <span className="text-sm text-primary font-mono">
                            +{formatCurrency(option.priceModifier)}
                          </span>
                        )}
                      </div>

                      {option.type === 'select' && (
                        <select
                          value={String(config[option.id] || '')}
                          onChange={(e) => setConfig({ ...config, [option.id]: e.target.value })}
                          className="w-full h-12 px-4 rounded-xl glass-strong border border-primary/10 focus:outline-none focus:border-primary/40 focus:shadow-glow transition-all bg-transparent"
                        >
                          <option value="">Select an option...</option>
                          {option.options?.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-[#0a0a0a]">
                              {opt.label}
                              {opt.priceModifier &&
                                ` (+${formatCurrency(opt.priceModifier)})`}
                            </option>
                          ))}
                        </select>
                      )}

                      {option.type === 'multiselect' && (
                        <div className="space-y-2">
                          {option.options?.map((opt) => {
                            const isSelected = Array.isArray(config[option.id])
                              ? (config[option.id] as string[]).includes(opt.value)
                              : false;

                            return (
                              <label
                                key={opt.value}
                                className={`flex items-center justify-between p-4 rounded-xl glass-hover cursor-pointer transition-all border ${
                                  isSelected
                                    ? 'border-primary/40 bg-primary/10'
                                    : 'border-primary/10'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      const current = (config[option.id] as string[]) || [];
                                      const updated = e.target.checked
                                        ? [...current, opt.value]
                                        : current.filter((v) => v !== opt.value);
                                      setConfig({ ...config, [option.id]: updated });
                                    }}
                                    className="w-5 h-5 rounded accent-primary"
                                  />
                                  <span className="text-base">{opt.label}</span>
                                </div>
                                {opt.priceModifier && (
                                  <span className="text-sm text-primary font-mono">
                                    +{formatCurrency(opt.priceModifier)}
                                  </span>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      )}

                      {option.type === 'number' && (
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            min={option.min}
                            max={option.max}
                            step={option.step}
                            value={(typeof config[option.id] === 'number' ? config[option.id] : (option.min || 0)) as number}
                            onChange={(e) =>
                              setConfig({ ...config, [option.id]: parseInt(e.target.value) || 0 })
                            }
                            className="flex-1"
                          />
                          {option.min !== undefined && option.max !== undefined && (
                            <span className="text-sm text-muted-foreground/70 whitespace-nowrap">
                              ({option.min} - {option.max})
                            </span>
                          )}
                        </div>
                      )}

                      {option.type === 'checkbox' && (
                        <label className="flex items-start gap-4 p-4 rounded-xl glass-hover cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(config[option.id])}
                            onChange={(e) =>
                              setConfig({ ...config, [option.id]: e.target.checked })
                            }
                            className="w-5 h-5 rounded accent-primary mt-0.5"
                          />
                          <div className="flex-1">
                            <p className="text-base mb-1">{option.label}</p>
                            {option.priceModifier && (
                              <p className="text-sm text-primary font-mono">
                                +{formatCurrency(option.priceModifier)}
                              </p>
                            )}
                          </div>
                        </label>
                      )}
                    </div>
                  ))}

                  {/* Notes */}
                  <div className="space-y-3">
                    <label className="text-base font-semibold">Additional Notes (Optional)</label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requirements or details..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-primary/10">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
                    <Info className="w-4 h-4" />
                    <span>Configuration can be edited later</span>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="ghost" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant="neon" onClick={handleSave} className="px-8">
                      Save Configuration
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
