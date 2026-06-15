'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Download,
  Send,
  Save,
  Calculator,
  Calendar,
  FileText,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { LineItem, ServiceTemplate, LineItemConfig } from '@/types/pricing';
import { serviceTemplates, calculateLineItemPrice } from '@/lib/pricing-config';
import { apiClient } from '@/lib/api-client';
import ServiceSelector from './ServiceSelector';
import ConfigurationModal from './ConfigurationModal';
import LineItemCard from './LineItemCard';
import SendEstimateModal from './SendEstimateModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function PricingEstimator() {
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceTemplate | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [savedEstimateId, setSavedEstimateId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Generate Quotation number client-side only to avoid SSR/hydration mismatch
  const [quotationNumber, setQuotationNumber] = useState('');

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const seq = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    setQuotationNumber(`IIT-QT-${year}${month}-${seq}`);
  }, []);

  const handleAddService = (service: ServiceTemplate) => {
    setSelectedService(service);
    setEditingItemId(null);
    setIsConfigModalOpen(true);
  };

  const handleSaveConfiguration = (config: LineItemConfig, notes?: string) => {
    if (!selectedService) return;

    const totalPrice = calculateLineItemPrice(selectedService, config, 1);

    if (editingItemId) {
      // Update existing item
      setLineItems((items) =>
        items.map((item) =>
          item.id === editingItemId
            ? { ...item, configuration: config, totalPrice, notes }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: LineItem = {
        id: `item-${Date.now()}`,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        quantity: 1,
        configuration: config,
        basePrice: selectedService.basePrice,
        totalPrice,
        unit: selectedService.unit,
        notes,
      };
      setLineItems([...lineItems, newItem]);
    }

    setIsConfigModalOpen(false);
    setSelectedService(null);
    setEditingItemId(null);
  };

  const handleUpdateItem = (id: string, updates: Partial<LineItem>) => {
    setLineItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item;

        const updatedItem = { ...item, ...updates };

        // Recalculate price if quantity changed
        if (updates.quantity !== undefined) {
          const service = serviceTemplates.find((s) => s.id === item.serviceId);
          if (service) {
            updatedItem.totalPrice = calculateLineItemPrice(
              service,
              item.configuration,
              updates.quantity
            );
          }
        }

        return updatedItem;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setLineItems((items) => items.filter((item) => item.id !== id));
  };

  const handleConfigureItem = (id: string) => {
    const item = lineItems.find((i) => i.id === id);
    if (!item) return;

    const service = serviceTemplates.find((s) => s.id === item.serviceId);
    if (!service) return;

    setSelectedService(service);
    setEditingItemId(id);
    setIsConfigModalOpen(true);
  };

  // Save estimate to backend
  const handleSave = async () => {
    if (lineItems.length === 0) {
      toast.error('Add at least one service before saving');
      return;
    }

    setIsSaving(true);
    const loadingToast = toast.loading('Saving estimate...');

    try {
      if (savedEstimateId) {
        // Update existing estimate
        const result = await apiClient.updateEstimate(savedEstimateId, {
          lineItems,
          discount: discountPercentage > 0
            ? { type: 'percentage', value: discountPercentage }
            : undefined,
        });

        if (result.error) {
          throw new Error(result.error);
        }

        toast.success('Estimate updated successfully!', { id: loadingToast });
      } else {
        // Create new estimate
        const result = await apiClient.createEstimate({
          lineItems,
          discount: discountPercentage > 0
            ? { type: 'percentage', value: discountPercentage }
            : undefined,
        });

        if (result.error) {
          throw new Error(result.error);
        }

        setSavedEstimateId(result.data!.id);
        toast.success('Estimate saved successfully!', { id: loadingToast });
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to save estimate',
        { id: loadingToast }
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Send estimate via email
  const handleSendEstimate = async (customerInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message?: string;
  }) => {
    setIsSending(true);

    try {
      // First, save or update the estimate
      let estimateId = savedEstimateId;

      if (!estimateId) {
        const result = await apiClient.createEstimate({
          lineItems,
          discount: discountPercentage > 0
            ? { type: 'percentage', value: discountPercentage }
            : undefined,
          customerInfo,
        });

        if (result.error) {
          throw new Error(result.error);
        }

        estimateId = result.data!.id;
        setSavedEstimateId(estimateId);
      } else {
        // Update with customer info
        const result = await apiClient.updateEstimate(estimateId, {
          customerInfo,
        });

        if (result.error) {
          throw new Error(result.error);
        }
      }

      // Send email
      const sendResult = await apiClient.sendEstimate({
        estimateId: estimateId!,
        customerInfo,
      });

      if (sendResult.error) {
        throw new Error(sendResult.error);
      }

      toast.success(
        `Estimate sent to ${customerInfo.email} successfully!`,
        { duration: 5000 }
      );
      setIsSendModalOpen(false);
    } catch (error) {
      console.error('Send error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to send estimate'
      );
    } finally {
      setIsSending(false);
    }
  };

  // Export as PDF
  const handleExportPDF = async () => {
    // Must save estimate first
    if (!savedEstimateId) {
      if (lineItems.length === 0) {
        toast.error('Add at least one service before exporting');
        return;
      }

      // Save first
      toast('Saving estimate before export...', { icon: '💾' });
      
      try {
        const result = await apiClient.createEstimate({
          lineItems,
          discount: discountPercentage > 0
            ? { type: 'percentage', value: discountPercentage }
            : undefined,
        });

        if (result.error) {
          throw new Error(result.error);
        }

        setSavedEstimateId(result.data!.id);
        
        // Now export
        await exportPDF(result.data!.id);
      } catch (error) {
        console.error('Save before export error:', error);
        toast.error(
          error instanceof Error ? error.message : 'Failed to save estimate'
        );
      }
    } else {
      // Already saved, just export
      await exportPDF(savedEstimateId);
    }
  };

  const exportPDF = async (estimateId: string) => {
    setIsExporting(true);
    const loadingToast = toast.loading('Generating PDF...');

    try {
      const result = await apiClient.exportPDF(estimateId);

      if (!result.success) {
        throw new Error(result.error || 'Failed to export PDF');
      }

      toast.success('PDF downloaded successfully!', { id: loadingToast });
    } catch (error) {
      console.error('Export error:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to export PDF',
        { id: loadingToast }
      );
    } finally {
      setIsExporting(false);
    }
  };

  // Calculate totals
  const subtotal = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount;

  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + 30);

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
            <Calculator className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Smart Pricing Engine</span>
          </div>
          <h1 className="text-7xl font-bold mb-6 gradient-text tracking-tighter leading-[1.1]">
            Project Estimator
          </h1>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto font-light">
            Build your custom quote by selecting services and configuring them to your needs
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Line Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* PO Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass glass-hover rounded-2xl p-8 shadow-premium"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold">Quotation</h2>
                  </div>
                  <p className="text-sm text-muted-foreground/70">
                    Configure your project requirements
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground/70 mb-1">Quotation No.</p>
                  <p className="text-xl font-mono font-bold text-primary">{quotationNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground/70 mb-2">Created</p>
                  <div className="flex items-center gap-2 text-base">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date().toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground/70 mb-2">Valid Until</p>
                  <div className="flex items-center gap-2 text-base">
                    <Calendar className="w-4 h-4 text-secondary" />
                    {validUntil.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Add Service Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="neon"
                size="lg"
                onClick={() => setIsSelectorOpen(true)}
                className="w-full gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Service
              </Button>
            </motion.div>

            {/* Line Items */}
            <div className="space-y-4">
              {lineItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-2xl p-16 text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-strong mb-6">
                    <FileText className="w-10 h-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">No services added yet</h3>
                  <p className="text-base text-muted-foreground/70 mb-8 font-light">
                    Click "Add Service" to start building your estimate
                  </p>
                  <Button variant="neon" onClick={() => setIsSelectorOpen(true)} className="gap-2">
                    <Plus className="w-5 h-5" />
                    Add Your First Service
                  </Button>
                </motion.div>
              ) : (
                lineItems.map((item, index) => (
                  <LineItemCard
                    key={item.id}
                    item={item}
                    index={index}
                    onUpdate={handleUpdateItem}
                    onRemove={handleRemoveItem}
                    onConfigure={handleConfigureItem}
                  />
                ))
              )}
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass glass-hover rounded-2xl p-8 shadow-premium sticky top-24"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-primary" />
                Summary
              </h2>

              <div className="space-y-6 mb-8">
                {/* Subtotal */}
                <div className="flex items-center justify-between pb-4 border-b border-primary/10">
                  <span className="text-base text-muted-foreground/70">Subtotal</span>
                  <span className="text-xl font-mono font-bold">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Discount */}
                <div className="space-y-3">
                  <label className="text-sm text-muted-foreground/70">Discount (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value) || 0)}
                    placeholder="0"
                  />
                  {discountAmount > 0 && (
                    <p className="text-sm text-primary">
                      -${discountAmount.toLocaleString()}
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="pt-4 border-t border-primary/10">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xl font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-4xl font-bold font-mono text-primary">
                        ${total.toLocaleString()}
                      </span>
                      <p className="text-xs text-muted-foreground/70 mt-1">USD</p>
                    </div>
                  </div>
                </div>

                {/* Item Count */}
                <div className="flex items-center gap-2">
                  <Badge variant="neon">{lineItems.length} Services</Badge>
                  <Badge variant="outline">
                    {lineItems.reduce((sum, item) => sum + item.quantity, 0)} Total Items
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  variant="neon"
                  size="lg"
                  className="w-full gap-2"
                  disabled={lineItems.length === 0 || isSending}
                  onClick={() => setIsSendModalOpen(true)}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Request Quote
                    </>
                  )}
                </Button>
                <Button
                  variant="glass"
                  size="lg"
                  className="w-full gap-2"
                  disabled={lineItems.length === 0 || isExporting}
                  onClick={handleExportPDF}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Export PDF
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full gap-2"
                  disabled={lineItems.length === 0 || isSaving}
                  onClick={handleSave}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : savedEstimateId ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      Update Draft
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Draft
                    </>
                  )}
                </Button>
              </div>

              {/* Info */}
              <div className="mt-8 p-4 rounded-xl glass-strong">
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                  This is an estimated quote. Final pricing may vary based on specific requirements
                  and project scope. All prices in USD.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ServiceSelector
        isOpen={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={handleAddService}
      />

      <ConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={() => {
          setIsConfigModalOpen(false);
          setSelectedService(null);
          setEditingItemId(null);
        }}
        service={selectedService}
        initialConfig={
          editingItemId ? lineItems.find((i) => i.id === editingItemId)?.configuration : undefined
        }
        onSave={handleSaveConfiguration}
      />

      <SendEstimateModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        onSend={handleSendEstimate}
        isLoading={isSending}
      />
    </div>
  );
}
