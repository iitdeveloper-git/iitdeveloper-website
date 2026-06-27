import { z } from 'zod';

// Line item configuration schema
export const lineItemConfigSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])
);

// Line item schema
export const lineItemSchema = z.object({
  id: z.string(),
  serviceId: z.string(),
  serviceName: z.string(),
  quantity: z.number().int().positive(),
  configuration: lineItemConfigSchema,
  basePrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
  unit: z.string(),
  notes: z.string().optional(),
});

// Discount schema
export const discountSchema = z.object({
  type: z.enum(['percentage', 'fixed']),
  value: z.number().nonnegative(),
  reason: z.string().optional(),
});

// Tax schema
export const taxSchema = z.object({
  rate: z.number().nonnegative(),
  amount: z.number().nonnegative(),
});

// Customer info schema
export const customerInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

// Create estimate request schema
export const createEstimateSchema = z.object({
  lineItems: z.array(lineItemSchema).min(1, 'At least one service is required'),
  discount: discountSchema.optional(),
  tax: taxSchema.optional(),
  customerInfo: customerInfoSchema.optional(),
});

// Update estimate request schema
export const updateEstimateSchema = z.object({
  lineItems: z.array(lineItemSchema).optional(),
  discount: discountSchema.optional(),
  tax: taxSchema.optional(),
  status: z.enum(['draft', 'sent', 'approved', 'rejected']).optional(),
  customerInfo: customerInfoSchema.optional(),
});

// Send estimate request schema
export const sendEstimateSchema = z.object({
  estimateId: z.string(),
  customerInfo: customerInfoSchema,
  message: z.string().optional(),
});

// Calculate price request schema
export const calculatePriceSchema = z.object({
  serviceId: z.string(),
  configuration: lineItemConfigSchema,
  quantity: z.number().int().positive().default(1),
});

export type CreateEstimateInput = z.infer<typeof createEstimateSchema>;
export type UpdateEstimateInput = z.infer<typeof updateEstimateSchema>;
export type SendEstimateInput = z.infer<typeof sendEstimateSchema>;
export type CalculatePriceInput = z.infer<typeof calculatePriceSchema>;
