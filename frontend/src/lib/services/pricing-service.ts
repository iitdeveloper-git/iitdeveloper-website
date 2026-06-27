import { PoolClient } from 'pg';
import { query, transaction, getClient } from '@/lib/db/client';
import { PricingEstimate, LineItem } from '@/types/pricing';
import { calculateLineItemPrice, serviceTemplates } from '@/lib/pricing-config';

interface EstimateRow {
  id: string;
  po_number: string;
  line_items: any;
  subtotal: number;
  discount_type?: string;
  discount_value?: number;
  discount_reason?: string;
  tax_rate?: number;
  tax_amount?: number;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  customer_name?: string;
  customer_email?: string;
  customer_company?: string;
  customer_phone?: string;
  customer_message?: string;
  valid_until?: Date;
  created_at: Date;
  updated_at: Date;
  sent_at?: Date;
}

export class PricingService {
  // Generate unique PO number
  static async generatePONumber(): Promise<string> {
    const result = await query<{ generate_po_number: string }>(
      'SELECT generate_po_number()'
    );
    return result[0].generate_po_number;
  }

  // Calculate line item price
  static calculateLineItemPrice(
    serviceId: string,
    configuration: any,
    quantity: number
  ): number {
    const service = serviceTemplates.find((s) => s.id === serviceId);
    if (!service) {
      throw new Error(`Service not found: ${serviceId}`);
    }
    return calculateLineItemPrice(service, configuration, quantity);
  }

  // Calculate estimate totals
  static calculateTotals(
    lineItems: LineItem[],
    discountPercentage: number = 0,
    taxRate: number = 0
  ): {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
  } {
    const subtotal = lineItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const discountAmount = (subtotal * discountPercentage) / 100;
    const afterDiscount = subtotal - discountAmount;
    const taxAmount = (afterDiscount * taxRate) / 100;
    const total = afterDiscount + taxAmount;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      discountAmount: Math.round(discountAmount * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }

  // Create new estimate
  static async createEstimate(data: {
    lineItems: LineItem[];
    discount?: { type: 'percentage' | 'fixed'; value: number; reason?: string };
    tax?: { rate: number; amount: number };
    customerInfo?: {
      name?: string;
      email?: string;
      company?: string;
      phone?: string;
      message?: string;
    };
  }): Promise<PricingEstimate> {
    const poNumber = await this.generatePONumber();
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    // Calculate totals
    const discountValue = data.discount?.type === 'percentage' ? data.discount.value : 0;
    const totals = this.calculateTotals(
      data.lineItems,
      discountValue,
      data.tax?.rate || 0
    );

    const result = await query<EstimateRow>(
      `INSERT INTO estimates (
        po_number, line_items, subtotal, 
        discount_type, discount_value, discount_reason,
        tax_rate, tax_amount, total, valid_until,
        customer_name, customer_email, customer_company, customer_phone, customer_message,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        poNumber,
        JSON.stringify(data.lineItems),
        totals.subtotal,
        data.discount?.type,
        data.discount?.value,
        data.discount?.reason,
        data.tax?.rate,
        totals.taxAmount,
        totals.total,
        validUntil,
        data.customerInfo?.name,
        data.customerInfo?.email,
        data.customerInfo?.company,
        data.customerInfo?.phone,
        data.customerInfo?.message,
        'draft',
      ]
    );

    // Log activity
    await this.logActivity(result[0].id, 'created', 'Estimate created');

    return this.mapRowToEstimate(result[0]);
  }

  // Get estimate by ID
  static async getEstimate(id: string): Promise<PricingEstimate | null> {
    const result = await query<EstimateRow>(
      'SELECT * FROM active_estimates WHERE id = $1',
      [id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.mapRowToEstimate(result[0]);
  }

  // Get estimate by PO number
  static async getEstimateByPONumber(poNumber: string): Promise<PricingEstimate | null> {
    const result = await query<EstimateRow>(
      'SELECT * FROM active_estimates WHERE po_number = $1',
      [poNumber]
    );

    if (result.length === 0) {
      return null;
    }

    return this.mapRowToEstimate(result[0]);
  }

  // Update estimate
  static async updateEstimate(
    id: string,
    data: {
      lineItems?: LineItem[];
      discount?: { type: 'percentage' | 'fixed'; value: number; reason?: string };
      tax?: { rate: number; amount: number };
      status?: 'draft' | 'sent' | 'approved' | 'rejected';
      customerInfo?: {
        name?: string;
        email?: string;
        company?: string;
        phone?: string;
        message?: string;
      };
    }
  ): Promise<PricingEstimate> {
    const current = await this.getEstimate(id);
    if (!current) {
      throw new Error('Estimate not found');
    }

    const lineItems = data.lineItems || current.lineItems;
    const discountValue =
      data.discount?.type === 'percentage'
        ? data.discount.value
        : current.discount?.type === 'percentage'
        ? current.discount.value
        : 0;

    const totals = this.calculateTotals(
      lineItems,
      discountValue,
      data.tax?.rate || current.tax?.rate || 0
    );

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.lineItems) {
      updates.push(`line_items = $${paramIndex++}`);
      values.push(JSON.stringify(data.lineItems));
    }

    updates.push(`subtotal = $${paramIndex++}`);
    values.push(totals.subtotal);

    if (data.discount) {
      updates.push(`discount_type = $${paramIndex++}`);
      values.push(data.discount.type);
      updates.push(`discount_value = $${paramIndex++}`);
      values.push(data.discount.value);
      updates.push(`discount_reason = $${paramIndex++}`);
      values.push(data.discount.reason);
    }

    if (data.tax) {
      updates.push(`tax_rate = $${paramIndex++}`);
      values.push(data.tax.rate);
      updates.push(`tax_amount = $${paramIndex++}`);
      values.push(totals.taxAmount);
    }

    updates.push(`total = $${paramIndex++}`);
    values.push(totals.total);

    if (data.status) {
      updates.push(`status = $${paramIndex++}`);
      values.push(data.status);
      
      if (data.status === 'sent') {
        updates.push(`sent_at = $${paramIndex++}`);
        values.push(new Date());
      }
    }

    if (data.customerInfo) {
      if (data.customerInfo.name) {
        updates.push(`customer_name = $${paramIndex++}`);
        values.push(data.customerInfo.name);
      }
      if (data.customerInfo.email) {
        updates.push(`customer_email = $${paramIndex++}`);
        values.push(data.customerInfo.email);
      }
      if (data.customerInfo.company) {
        updates.push(`customer_company = $${paramIndex++}`);
        values.push(data.customerInfo.company);
      }
      if (data.customerInfo.phone) {
        updates.push(`customer_phone = $${paramIndex++}`);
        values.push(data.customerInfo.phone);
      }
      if (data.customerInfo.message) {
        updates.push(`customer_message = $${paramIndex++}`);
        values.push(data.customerInfo.message);
      }
    }

    values.push(id);

    const result = await query<EstimateRow>(
      `UPDATE estimates SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    // Log activity
    await this.logActivity(id, 'updated', 'Estimate updated');

    return this.mapRowToEstimate(result[0]);
  }

  // List estimates with filters
  static async listEstimates(filters?: {
    status?: string;
    customerEmail?: string;
    limit?: number;
    offset?: number;
  }): Promise<PricingEstimate[]> {
    let sql = 'SELECT * FROM active_estimates WHERE 1=1';
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.status) {
      sql += ` AND status = $${paramIndex++}`;
      params.push(filters.status);
    }

    if (filters?.customerEmail) {
      sql += ` AND customer_email = $${paramIndex++}`;
      params.push(filters.customerEmail);
    }

    sql += ' ORDER BY created_at DESC';

    if (filters?.limit) {
      sql += ` LIMIT $${paramIndex++}`;
      params.push(filters.limit);
    }

    if (filters?.offset) {
      sql += ` OFFSET $${paramIndex++}`;
      params.push(filters.offset);
    }

    const result = await query<EstimateRow>(sql, params);
    return result.map(this.mapRowToEstimate);
  }

  // Delete estimate (soft delete)
  static async deleteEstimate(id: string): Promise<void> {
    await query('UPDATE estimates SET deleted_at = NOW() WHERE id = $1', [id]);
    await this.logActivity(id, 'deleted', 'Estimate deleted');
  }

  // Log activity
  static async logActivity(
    estimateId: string,
    activityType: string,
    description: string,
    metadata?: any
  ): Promise<void> {
    await query(
      `INSERT INTO estimate_activities (estimate_id, activity_type, description, metadata)
       VALUES ($1, $2, $3, $4)`,
      [estimateId, activityType, description, metadata ? JSON.stringify(metadata) : null]
    );
  }

  // Get estimate activities
  static async getActivities(estimateId: string): Promise<any[]> {
    return query(
      'SELECT * FROM estimate_activities WHERE estimate_id = $1 ORDER BY created_at DESC',
      [estimateId]
    );
  }

  // Map database row to PricingEstimate type
  private static mapRowToEstimate(row: EstimateRow): PricingEstimate {
    return {
      id: row.id,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      lineItems: row.line_items,
      subtotal: Number(row.subtotal),
      discount: row.discount_type
        ? {
            type: row.discount_type as 'percentage' | 'fixed',
            value: Number(row.discount_value),
            reason: row.discount_reason,
          }
        : undefined,
      tax: row.tax_rate
        ? {
            rate: Number(row.tax_rate),
            amount: Number(row.tax_amount),
          }
        : undefined,
      total: Number(row.total),
      status: row.status,
      validUntil: row.valid_until ? new Date(row.valid_until) : undefined,
      customerInfo: row.customer_email
        ? {
            name: row.customer_name || '',
            email: row.customer_email,
            company: row.customer_company,
          }
        : undefined,
    };
  }
}
