'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { ServiceTemplate } from '@/types/pricing';
import { serviceTemplates } from '@/lib/pricing-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface ServiceSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (service: ServiceTemplate) => void;
}

export default function ServiceSelector({ isOpen, onClose, onSelect }: ServiceSelectorProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const categories = [
    { id: 'technical', label: 'Technical', color: 'neon' },
    { id: 'ai', label: 'AI & ML', color: 'purple' },
    { id: 'marketing', label: 'Marketing', color: 'cyan' },
    { id: 'consulting', label: 'Consulting', color: 'default' },
  ];

  const filteredServices = serviceTemplates.filter((service) => {
    const matchesSearch =
      search === '' ||
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!mounted) return null;

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
            className="w-full sm:max-w-4xl flex flex-col"
          >
            <div
              className="glass-strong sm:rounded-3xl rounded-t-3xl border border-primary/15 shadow-premium-lg flex flex-col overflow-hidden"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="p-8 border-b border-primary/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold gradient-text">Add Service</h2>
                  <button
                    onClick={onClose}
                    className="p-2.5 rounded-xl glass-hover hover:bg-white/[0.08] transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/50" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-12"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === null
                        ? 'bg-primary/20 text-primary shadow-glow-sm'
                        : 'glass-hover hover:bg-white/[0.05]'
                    }`}
                  >
                    All Services
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary/20 text-primary shadow-glow-sm'
                          : 'glass-hover hover:bg-white/[0.05]'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services Grid */}
              <div className="flex-1 min-h-0 overflow-y-auto p-8">
                {filteredServices.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground/70">No services found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredServices.map((service) => {
                      const IconComponent = (
                        LucideIcons[service.icon as keyof typeof LucideIcons] || LucideIcons.Box
                      ) as React.ComponentType<{ className?: string }>;
                      return (
                        <motion.button
                          key={service.id}
                          onClick={() => {
                            onSelect(service);
                            onClose();
                          }}
                          className="glass glass-hover p-6 rounded-2xl text-left hover:border-primary/40 transition-all group"
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl glass-strong shadow-glow-sm group-hover:shadow-glow transition-shadow">
                              <IconComponent className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg mb-1.5 group-hover:text-primary transition-colors">
                                {service.name}
                              </h3>
                              <p className="text-sm text-muted-foreground/80 mb-3 line-clamp-2 font-light">
                                {service.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <p className="text-primary font-semibold">
                                  ${service.basePrice.toLocaleString()}
                                  <span className="text-xs text-muted-foreground/70 ml-1">
                                    / {service.unit}
                                  </span>
                                </p>
                                {service.estimatedDuration && (
                                  <Badge variant="outline" className="text-xs">
                                    {service.estimatedDuration}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
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
