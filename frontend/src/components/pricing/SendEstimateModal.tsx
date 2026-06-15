'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SendEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (customerInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message?: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

export default function SendEstimateModal({
  isOpen,
  onClose,
  onSend,
  isLoading = false,
}: SendEstimateModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    await onSend({
      name: name.trim(),
      email: email.trim(),
      company: company.trim() || undefined,
      phone: phone.trim() || undefined,
      message: message.trim() || undefined,
    });

    // Reset form
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setMessage('');
    setErrors({});
  };

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
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
          >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={{ pointerEvents: 'auto' }}
            className="w-full sm:max-w-2xl flex flex-col"
          >
            <div
              className="glass-strong sm:rounded-3xl rounded-t-3xl border border-primary/15 shadow-premium-lg flex flex-col overflow-hidden"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="p-8 border-b border-primary/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold gradient-text mb-2">Send Estimate</h2>
                    <p className="text-base text-muted-foreground/70 font-light">
                      Enter customer details to send the estimate
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="p-2.5 rounded-xl glass-hover hover:bg-white/[0.08] transition-all disabled:opacity-50"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 min-h-0 overflow-y-auto p-8">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      disabled={isLoading}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-400 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@company.com"
                      disabled={isLoading}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company (Optional)
                    </label>
                    <Input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone (Optional)
                    </label>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Message (Optional)
                    </label>
                    <Textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any additional notes or requirements..."
                      rows={4}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </form>

              {/* Footer */}
              <div className="p-8 border-t border-primary/10">
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="neon"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex-1 gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Estimate
                      </>
                    )}
                  </Button>
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
