'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { apiClient } from '@/lib/api-client';
import { PricingEstimate } from '@/types/pricing';
import { 
  Loader2, 
  FileText, 
  Calendar, 
  Mail, 
  Building2, 
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  Calculator,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ViewEstimatePage() {
  const params = useParams();
  const [estimate, setEstimate] = useState<PricingEstimate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEstimate = async () => {
      if (!params.id) return;

      try {
        const result = await apiClient.getEstimate(params.id as string);
        
        if (result.error) {
          setError(result.error);
        } else {
          setEstimate(result.data!);
        }
      } catch (err) {
        setError('Failed to load estimate');
      } finally {
        setIsLoading(false);
      }
    };

    loadEstimate();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-accent-neon mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Loading estimate...</p>
        </div>
      </div>
    );
  }

  if (error || !estimate) {
    return (
      <div className="min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-strong mb-6">
              <XCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Estimate Not Found</h1>
            <p className="text-lg text-muted-foreground/70 mb-8">
              {error || "The estimate you're looking for doesn't exist or has been removed."}
            </p>
            <Link href="/estimate">
              <Button variant="neon" size="lg">
                Create New Estimate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const statusColors = {
    draft: 'outline',
    sent: 'cyan',
    approved: 'neon',
    rejected: 'default',
  } as const;

  const statusIcons = {
    draft: Clock,
    sent: Mail,
    approved: CheckCircle2,
    rejected: XCircle,
  };

  const StatusIcon = statusIcons[estimate.status];

  return (
    <div className="min-h-screen py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass glass-hover mb-6 shadow-premium">
            <FileText className="w-4 h-4 text-accent-neon" />
            <span className="text-sm font-medium">Project Estimate</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 gradient-text tracking-tighter">
            Your Custom Quote
          </h1>
          <p className="text-lg text-muted-foreground/70">
            Estimate ID: <span className="font-mono text-accent-neon">{estimate.id.substring(0, 8)}</span>
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Status & Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass glass-hover rounded-2xl p-8 shadow-premium"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant={statusColors[estimate.status]} className="text-sm">
                    <StatusIcon className="w-4 h-4 mr-1.5" />
                    {estimate.status.charAt(0).toUpperCase() + estimate.status.slice(1)}
                  </Badge>
                  {estimate.validUntil && (
                    <span className="text-sm text-muted-foreground/70">
                      Valid until {new Date(estimate.validUntil).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground/70">
                  Created {new Date(estimate.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Customer Info */}
            {estimate.customerInfo && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-accent-neon" />
                  <div>
                    <p className="text-xs text-muted-foreground/70">Email</p>
                    <p className="text-sm font-medium">{estimate.customerInfo.email}</p>
                  </div>
                </div>
                {estimate.customerInfo.company && (
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-accent-purple" />
                    <div>
                      <p className="text-xs text-muted-foreground/70">Company</p>
                      <p className="text-sm font-medium">{estimate.customerInfo.company}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Line Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass glass-hover rounded-2xl p-8 shadow-premium"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-accent-neon" />
              Services
            </h2>

            <div className="space-y-4">
              {estimate.lineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-4 rounded-xl glass-strong"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg glass-strong text-sm font-bold text-muted-foreground/70">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.serviceName}</h3>
                      <p className="text-sm text-muted-foreground/70">
                        Qty: {item.quantity} × {item.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold font-mono text-accent-neon">
                      ${item.totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass glass-hover rounded-2xl p-8 shadow-premium"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="text-base text-muted-foreground/70">Subtotal</span>
                <span className="text-xl font-mono font-bold">
                  ${estimate.subtotal.toLocaleString()}
                </span>
              </div>

              {estimate.discount && (
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <span className="text-base text-muted-foreground/70">
                    Discount ({estimate.discount.value}%)
                  </span>
                  <span className="text-xl font-mono text-green-400">
                    -${((estimate.subtotal * estimate.discount.value) / 100).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <span className="text-2xl font-bold">Total</span>
                <div className="text-right">
                  <span className="text-4xl font-bold font-mono text-accent-neon">
                    ${estimate.total.toLocaleString()}
                  </span>
                  <p className="text-xs text-muted-foreground/70 mt-1">USD</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="flex-1">
              <Button variant="neon" size="lg" className="w-full">
                Get Started
              </Button>
            </Link>
            <Link href="/estimate" className="flex-1">
              <Button variant="glass" size="lg" className="w-full">
                Create New Estimate
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
