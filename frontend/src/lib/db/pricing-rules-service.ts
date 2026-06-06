// Pricing rules database operations
import { query, transaction } from './client';
import type {
  PricingRule,
  PricingRuleApplication,
  CreatePricingRule,
  UpdatePricingRule,
  PricingRuleConditions,
} from './types';

// ============================================================================
// PRICING RULES
// ============================================================================

export async function getAllPricingRules(): Promise<PricingRule[]> {
  const result = await query<PricingRule>(
    `SELECT * FROM pricing_rules ORDER BY priority DESC, created_at DESC`
  );
  return result.rows;
}

export async function getActivePricingRules(): Promise<PricingRule[]> {
  const result = await query<PricingRule>(
    `SELECT * FROM pricing_rules 
     WHERE is_active = true 
     AND (valid_from IS NULL OR valid_from <= NOW())
     AND (valid_until IS NULL OR valid_until >= NOW())
     AND (max_usage IS NULL OR usage_count < max_usage)
     ORDER BY priority DESC`
  );
  return result.rows;
}

export async function getPricingRuleById(id: string): Promise<PricingRule | null> {
  const result = await query<PricingRule>(
    `SELECT * FROM pricing_rules WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function getPricingRulesByType(ruleType: string): Promise<PricingRule[]> {
  const result = await query<PricingRule>(
    `SELECT * FROM pricing_rules WHERE rule_type = $1 AND is_active = true ORDER BY priority DESC`,
    [ruleType]
  );
  return result.rows;
}

export async function createPricingRule(data: CreatePricingRule): Promise<PricingRule> {
  const result = await query<PricingRule>(
    `INSERT INTO pricing_rules (
      name, description, rule_type, conditions, value_type, value,
      max_discount, valid_from, valid_until, priority, is_cumulative,
      is_active, max_usage
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *`,
    [
      data.name,
      data.description || null,
      data.rule_type,
      JSON.stringify(data.conditions),
      data.value_type,
      data.value,
      data.max_discount || null,
      data.valid_from || null,
      data.valid_until || null,
      data.priority || 0,
      data.is_cumulative ?? false,
      data.is_active ?? true,
      data.max_usage || null,
    ]
  );
  return result.rows[0];
}

export async function updatePricingRule(
  id: string,
  data: UpdatePricingRule
): Promise<PricingRule> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  const fields: (keyof Omit<UpdatePricingRule, 'conditions'>)[] = [
    'name', 'description', 'rule_type', 'value_type', 'value',
    'max_discount', 'valid_from', 'valid_until', 'priority',
    'is_cumulative', 'is_active', 'max_usage',
  ];

  fields.forEach((field) => {
    if (data[field] !== undefined) {
      updates.push(`${field} = $${paramCount++}`);
      values.push(data[field]);
    }
  });

  if (data.conditions !== undefined) {
    updates.push(`conditions = $${paramCount++}`);
    values.push(JSON.stringify(data.conditions));
  }

  values.push(id);

  const result = await query<PricingRule>(
    `UPDATE pricing_rules SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function deletePricingRule(id: string): Promise<void> {
  await query(`UPDATE pricing_rules SET is_active = false WHERE id = $1`, [id]);
}

export async function incrementRuleUsage(id: string): Promise<void> {
  await query(
    `UPDATE pricing_rules SET usage_count = usage_count + 1 WHERE id = $1`,
    [id]
  );
}

// ============================================================================
// RULE EVALUATION
// ============================================================================

interface EstimateContext {
  total: number;
  subtotal: number;
  serviceIds: string[];
  serviceCount: number;
  categoryIds?: string[];
  customerEmail?: string;
  customerSegment?: string;
}

export function evaluatePricingRule(
  rule: PricingRule,
  context: EstimateContext
): boolean {
  const conditions = rule.conditions;

  // Check minimum total
  if (conditions.minTotal && context.total < conditions.minTotal) {
    return false;
  }

  // Check maximum total
  if (conditions.maxTotal && context.total > conditions.maxTotal) {
    return false;
  }

  // Check minimum service count
  if (conditions.minServiceCount && context.serviceCount < conditions.minServiceCount) {
    return false;
  }

  // Check specific service IDs
  if (conditions.serviceIds && conditions.serviceIds.length > 0) {
    const hasRequiredService = conditions.serviceIds.some((id: string) =>
      context.serviceIds.includes(id)
    );
    if (!hasRequiredService) {
      return false;
    }
  }

  // Check category IDs
  if (conditions.categoryIds && conditions.categoryIds.length > 0 && context.categoryIds) {
    const hasRequiredCategory = conditions.categoryIds.some((id: string) =>
      context.categoryIds?.includes(id)
    );
    if (!hasRequiredCategory) {
      return false;
    }
  }

  // Check customer segment
  if (conditions.customerSegment && conditions.customerSegment !== context.customerSegment) {
    return false;
  }

  return true;
}

export function calculateDiscount(rule: PricingRule, total: number): number {
  let discount = 0;

  switch (rule.value_type) {
    case 'percentage':
      discount = total * (rule.value / 100);
      // Apply max discount cap if set
      if (rule.max_discount && discount > rule.max_discount) {
        discount = rule.max_discount;
      }
      break;
    case 'flat':
      discount = rule.value;
      break;
    case 'multiplier':
      discount = total * (1 - rule.value); // e.g., 0.9 multiplier = 10% off
      break;
  }

  return Math.max(0, discount);
}

export async function evaluateAllRules(
  context: EstimateContext
): Promise<{
  applicableRules: PricingRule[];
  totalDiscount: number;
  discountBreakdown: Array<{ rule: PricingRule; discount: number }>;
}> {
  const activeRules = await getActivePricingRules();
  const applicableRules: PricingRule[] = [];
  const discountBreakdown: Array<{ rule: PricingRule; discount: number }> = [];
  let totalDiscount = 0;
  let runningTotal = context.total;

  for (const rule of activeRules) {
    if (evaluatePricingRule(rule, context)) {
      applicableRules.push(rule);
      const discount = calculateDiscount(rule, runningTotal);
      
      discountBreakdown.push({ rule, discount });
      totalDiscount += discount;

      // If rule is cumulative, apply discount for next rules
      if (rule.is_cumulative) {
        runningTotal -= discount;
      }
    }
  }

  return {
    applicableRules,
    totalDiscount,
    discountBreakdown,
  };
}

// ============================================================================
// PRICING RULE APPLICATIONS
// ============================================================================

export async function getPricingRuleApplications(
  estimateId: string
): Promise<PricingRuleApplication[]> {
  const result = await query<PricingRuleApplication>(
    `SELECT * FROM pricing_rule_applications WHERE estimate_id = $1 ORDER BY applied_at DESC`,
    [estimateId]
  );
  return result.rows;
}

export async function recordPricingRuleApplication(
  estimateId: string,
  ruleId: string,
  ruleName: string,
  ruleType: string,
  discountAmount: number
): Promise<PricingRuleApplication> {
  return await transaction(async (client) => {
    // Record the application
    const result = await client.query<PricingRuleApplication>(
      `INSERT INTO pricing_rule_applications (estimate_id, pricing_rule_id, rule_name, rule_type, discount_amount)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [estimateId, ruleId, ruleName, ruleType, discountAmount]
    );

    // Increment rule usage count
    await client.query(
      `UPDATE pricing_rules SET usage_count = usage_count + 1 WHERE id = $1`,
      [ruleId]
    );

    return result.rows[0];
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export async function getExpiringSoonRules(daysAhead = 7): Promise<PricingRule[]> {
  const result = await query<PricingRule>(
    `SELECT * FROM pricing_rules 
     WHERE is_active = true 
     AND valid_until IS NOT NULL 
     AND valid_until <= NOW() + INTERVAL '${daysAhead} days'
     AND valid_until >= NOW()
     ORDER BY valid_until ASC`
  );
  return result.rows;
}

export async function getUnusedRules(): Promise<PricingRule[]> {
  const result = await query<PricingRule>(
    `SELECT * FROM pricing_rules 
     WHERE is_active = true 
     AND usage_count = 0
     AND created_at < NOW() - INTERVAL '30 days'
     ORDER BY created_at ASC`
  );
  return result.rows;
}

export async function getMostUsedRules(limit = 10): Promise<PricingRule[]> {
  const result = await query<PricingRule>(
    `SELECT * FROM pricing_rules 
     WHERE usage_count > 0
     ORDER BY usage_count DESC 
     LIMIT $1`,
    [limit]
  );
  return result.rows;
}

export async function getRuleEffectiveness(): Promise<
  Array<{
    rule: PricingRule;
    usage_count: number;
    total_discount: number;
    avg_discount: number;
  }>
> {
  const result = await query<{
    rule_id: string;
    rule_name: string;
    usage_count: number;
    total_discount: number;
    avg_discount: number;
  }>(
    `SELECT 
       pra.pricing_rule_id as rule_id,
       pra.rule_name,
       COUNT(*) as usage_count,
       SUM(pra.discount_amount) as total_discount,
       AVG(pra.discount_amount) as avg_discount
     FROM pricing_rule_applications pra
     WHERE pra.pricing_rule_id IS NOT NULL
     GROUP BY pra.pricing_rule_id, pra.rule_name
     ORDER BY total_discount DESC`
  );

  const rulesData = await Promise.all(
    result.rows.map(async (row) => {
      const rule = await getPricingRuleById(row.rule_id);
      return {
        rule: rule!,
        usage_count: Number(row.usage_count),
        total_discount: Number(row.total_discount),
        avg_discount: Number(row.avg_discount),
      };
    })
  );

  return rulesData.filter((data) => data.rule !== null);
}
