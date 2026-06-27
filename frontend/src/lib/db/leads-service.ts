// Lead management database operations
import { query, transaction } from './client';
import type {
  Lead,
  LeadActivity,
  LeadStats,
  CreateLead,
  UpdateLead,
  CreateLeadActivity,
  LeadStatus,
  LeadQuality,
} from './types';

// ============================================================================
// LEADS
// ============================================================================

export async function getAllLeads(includeDeleted = false): Promise<Lead[]> {
  const sql = includeDeleted
    ? `SELECT * FROM leads ORDER BY created_at DESC`
    : `SELECT * FROM active_leads ORDER BY created_at DESC`;
  
  const result = await query<Lead>(sql);
  return result;
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const result = await query<Lead>(
    `SELECT * FROM leads WHERE id = $1`,
    [id]
  );
  return result[0] || null;
}

export async function getLeadByEmail(email: string): Promise<Lead | null> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
    [email]
  );
  return result[0] || null;
}

export async function getLeadsByStatus(status: LeadStatus): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads WHERE status = $1 ORDER BY created_at DESC`,
    [status]
  );
  return result;
}

export async function getLeadsByQuality(quality: LeadQuality): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads WHERE lead_quality = $1 ORDER BY lead_score DESC, created_at DESC`,
    [quality]
  );
  return result;
}

export async function getLeadsByAssignee(assignedTo: string): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads WHERE assigned_to = $1 ORDER BY created_at DESC`,
    [assignedTo]
  );
  return result;
}

export async function getHotLeads(): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads 
     WHERE lead_quality = 'hot' AND status NOT IN ('won', 'lost', 'disqualified')
     ORDER BY lead_score DESC, created_at DESC`
  );
  return result;
}

// ============================================================================
// FALLBACK FUNCTIONS (when database functions don't exist)
// ============================================================================

function calculateLeadScoreFallback(data: CreateLead): number {
  let score = 0;
  
  // Budget range scoring (0-40 points)
  const budgetScores: { [key: string]: number } = {
    'Under ₹25K': 10,
    '₹25K - ₹50K': 20,
    '₹50K - ₹1L': 30,
    '₹1L - ₹3L': 35,
    '₹3L - ₹7L': 40,
    '₹7L+': 40,
  };
  if (data.budget_range && budgetScores[data.budget_range]) {
    score += budgetScores[data.budget_range];
  }
  
  // Message quality (0-20 points)
  if (data.message) {
    const messageLength = data.message.length;
    if (messageLength > 100) score += 20;
    else if (messageLength > 50) score += 15;
    else if (messageLength > 20) score += 10;
    else score += 5;
  }
  
  // Company provided (0-15 points)
  if (data.company) score += 15;
  
  // Timeline urgency (0-15 points)
  const timelineScores: { [key: string]: number } = {
    'ASAP': 15,
    'Within 1 month': 12,
    'Within 3 months': 10,
    '3-6 months': 7,
    'Just exploring': 3,
  };
  if (data.timeline && timelineScores[data.timeline]) {
    score += timelineScores[data.timeline];
  }
  
  // Source quality (0-10 points)
  const sourceScores: { [key: string]: number } = {
    'contact_form': 10,
    'estimate_request': 10,
    'referral': 10,
    'social': 7,
    'organic': 7,
    'direct': 5,
  };
  if (sourceScores[data.source]) {
    score += sourceScores[data.source];
  }
  
  return Math.min(score, 100); // Cap at 100
}

function assignLeadQualityFallback(score: number): LeadQuality {
  if (score >= 80) return 'hot';
  if (score >= 50) return 'warm';
  return 'cold';
}

// ============================================================================
// CREATE LEAD
// ============================================================================

export async function createLead(data: CreateLead): Promise<Lead> {
  // Calculate lead score with fallback
  let leadScore = 50; // Default score
  try {
    const scoreResult = await query<{ calculate_lead_score: number }>(
      `SELECT calculate_lead_score($1, $2, $3, $4, $5) as calculate_lead_score`,
      [
        data.budget_range || null,
        data.timeline || null,
        data.message || null,
        data.company || null,
        data.source,
      ]
    );
    if (scoreResult && scoreResult[0]) {
      leadScore = scoreResult[0].calculate_lead_score;
    }
  } catch (error) {
    // Function doesn't exist, use simple scoring
    console.log('Using fallback lead scoring');
    leadScore = calculateLeadScoreFallback(data);
  }

  // Determine lead quality based on score with fallback
  let leadQuality: LeadQuality = 'cold';
  try {
    const qualityResult = await query<{ assign_lead_quality: LeadQuality }>(
      `SELECT assign_lead_quality($1) as assign_lead_quality`,
      [leadScore]
    );
    if (qualityResult && qualityResult[0]) {
      leadQuality = qualityResult[0].assign_lead_quality;
    }
  } catch (error) {
    // Function doesn't exist, use simple quality assignment
    console.log('Using fallback quality assignment');
    leadQuality = assignLeadQualityFallback(leadScore);
  }

  // Create lead with transaction to include activity log
  const leadResult = await transaction(async (client) => {
    const insertResult = await client.query<Lead>(
      `INSERT INTO leads (
        name, email, phone, company, job_title, message,
        source, source_url, status, budget_range, estimated_value,
        timeline, estimate_id, lead_data, tags, lead_score, lead_quality
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
      [
        data.name,
        data.email,
        data.phone || null,
        data.company || null,
        data.job_title || null,
        data.message || null,
        data.source,
        data.source_url || null,
        data.status || 'new',
        data.budget_range || null,
        data.estimated_value || null,
        data.timeline || null,
        data.estimate_id || null,
        JSON.stringify(data.lead_data || {}),
        JSON.stringify(data.tags || []),
        leadScore,
        leadQuality,
      ]
    );

    const lead = insertResult.rows[0];

    // Log creation activity
    await client.query(
      `INSERT INTO lead_activities (lead_id, activity_type, title, description, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        lead.id,
        'note',
        'Lead Created',
        `Lead created from ${data.source}`,
        JSON.stringify({
          source: data.source,
          score: leadScore,
          quality: leadQuality,
        }),
      ]
    );

    return lead;
  });

  return leadResult;
}

export async function updateLead(id: string, data: UpdateLead): Promise<Lead> {
  return await transaction(async (client) => {
    // Get current lead
    const currentResult = await client.query<Lead>(
      `SELECT * FROM leads WHERE id = $1`,
      [id]
    );
    const currentLead = currentResult.rows[0];

    // Build update query
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    const fields: (keyof Omit<UpdateLead, 'lead_data' | 'tags'>)[] = [
      'name', 'email', 'phone', 'company', 'job_title', 'message',
      'status', 'assigned_to', 'lead_score', 'lead_quality',
      'budget_range', 'estimated_value', 'timeline', 'last_contact_at',
      'lost_reason',
    ];

    fields.forEach((field) => {
      if (data[field] !== undefined) {
        updates.push(`${field} = $${paramCount++}`);
        values.push(data[field]);
      }
    });

    if (data.lead_data !== undefined) {
      updates.push(`lead_data = $${paramCount++}`);
      values.push(JSON.stringify(data.lead_data));
    }
    if (data.tags !== undefined) {
      updates.push(`tags = $${paramCount++}`);
      values.push(JSON.stringify(data.tags));
    }

    // Track status change
    if (data.status && data.status !== currentLead.status) {
      if (data.status === 'won') {
        updates.push(`converted_at = $${paramCount++}`);
        values.push(new Date());
      } else if (data.status === 'lost') {
        updates.push(`lost_at = $${paramCount++}`);
        values.push(new Date());
      }
    }

    values.push(id);

    const updateResult = await client.query<Lead>(
      `UPDATE leads SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    const updatedLead = updateResult.rows[0];

    // Log status change activity
    if (data.status && data.status !== currentLead.status) {
      await client.query(
        `INSERT INTO lead_activities (lead_id, activity_type, title, description, metadata)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          id,
          'status_change',
          'Status Changed',
          `Status changed from ${currentLead.status} to ${data.status}`,
          JSON.stringify({
            old_status: currentLead.status,
            new_status: data.status,
          }),
        ]
      );
    }

    // Log score change activity
    if (data.lead_score !== undefined && data.lead_score !== currentLead.lead_score) {
      await client.query(
        `INSERT INTO lead_activities (lead_id, activity_type, title, description, metadata)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          id,
          'score_change',
          'Score Updated',
          `Lead score changed from ${currentLead.lead_score} to ${data.lead_score}`,
          JSON.stringify({
            old_score: currentLead.lead_score,
            new_score: data.lead_score,
          }),
        ]
      );
    }

    // Log assignment activity
    if (data.assigned_to && data.assigned_to !== currentLead.assigned_to) {
      await client.query(
        `INSERT INTO lead_activities (lead_id, activity_type, title, description, metadata, created_by)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          id,
          'assignment',
          'Lead Assigned',
          `Lead assigned to ${data.assigned_to}`,
          JSON.stringify({
            assigned_to: data.assigned_to,
            assigned_from: currentLead.assigned_to,
          }),
          data.assigned_to,
        ]
      );
    }

    return updatedLead;
  });
}

export async function deleteLead(id: string): Promise<void> {
  await query(`UPDATE leads SET deleted_at = NOW() WHERE id = $1`, [id]);
}

export async function assignLead(leadId: string, assignedTo: string): Promise<Lead> {
  return await updateLead(leadId, {
    assigned_to: assignedTo,
  });
}

export async function convertLead(
  leadId: string,
  customerId?: string
): Promise<Lead> {
  return await updateLead(leadId, {
    status: 'won',
    ...(customerId && { converted_to_customer_id: customerId }),
  });
}

export async function markLeadAsLost(
  leadId: string,
  reason: string
): Promise<Lead> {
  return await updateLead(leadId, {
    status: 'lost',
    lost_reason: reason,
  });
}

// ============================================================================
// LEAD ACTIVITIES
// ============================================================================

export async function getLeadActivities(leadId: string): Promise<LeadActivity[]> {
  const result = await query<LeadActivity>(
    `SELECT * FROM lead_activities WHERE lead_id = $1 ORDER BY created_at DESC`,
    [leadId]
  );
  return result.rows;
}

export async function createLeadActivity(data: CreateLeadActivity): Promise<LeadActivity> {
  const result = await query<LeadActivity>(
    `INSERT INTO lead_activities (lead_id, activity_type, title, description, metadata, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.lead_id,
      data.activity_type,
      data.title || null,
      data.description || null,
      JSON.stringify(data.metadata || {}),
      data.created_by || null,
    ]
  );
  return result.rows[0];
}

export async function addLeadNote(
  leadId: string,
  note: string,
  createdBy?: string
): Promise<LeadActivity> {
  return await createLeadActivity({
    lead_id: leadId,
    activity_type: 'note',
    title: 'Note Added',
    description: note,
    created_by: createdBy,
  });
}

export async function logLeadCall(
  leadId: string,
  description: string,
  duration?: number,
  createdBy?: string
): Promise<LeadActivity> {
  return await createLeadActivity({
    lead_id: leadId,
    activity_type: 'call',
    title: 'Call Made',
    description,
    metadata: { duration },
    created_by: createdBy,
  });
}

export async function logLeadEmail(
  leadId: string,
  subject: string,
  body: string,
  createdBy?: string
): Promise<LeadActivity> {
  return await createLeadActivity({
    lead_id: leadId,
    activity_type: 'email',
    title: subject,
    description: body,
    created_by: createdBy,
  });
}

export async function logLeadMeeting(
  leadId: string,
  description: string,
  duration?: number,
  createdBy?: string
): Promise<LeadActivity> {
  return await createLeadActivity({
    lead_id: leadId,
    activity_type: 'meeting',
    title: 'Meeting Held',
    description,
    metadata: { duration },
    created_by: createdBy,
  });
}

// ============================================================================
// STATISTICS
// ============================================================================

export async function getLeadStats(): Promise<LeadStats> {
  const result = await query<LeadStats>(
    `SELECT * FROM lead_stats`
  );
  return result.rows[0];
}

export async function getLeadsByDateRange(
  startDate: Date,
  endDate: Date
): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads 
     WHERE created_at >= $1 AND created_at <= $2 
     ORDER BY created_at DESC`,
    [startDate, endDate]
  );
  return result.rows;
}

export async function getLeadConversionRate(): Promise<{
  total: number;
  won: number;
  lost: number;
  conversionRate: number;
}> {
  const result = await query<{
    total: number;
    won: number;
    lost: number;
  }>(
    `SELECT 
       COUNT(*) as total,
       COUNT(*) FILTER (WHERE status = 'won') as won,
       COUNT(*) FILTER (WHERE status = 'lost') as lost
     FROM active_leads
     WHERE status IN ('won', 'lost')`
  );

  const { total, won, lost } = result.rows[0];
  const conversionRate = total > 0 ? (won / total) * 100 : 0;

  return {
    total,
    won: Number(won),
    lost: Number(lost),
    conversionRate,
  };
}

// ============================================================================
// SEARCH & FILTERS
// ============================================================================

export async function searchLeads(searchTerm: string): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads 
     WHERE 
       name ILIKE $1 OR 
       email ILIKE $1 OR 
       company ILIKE $1 OR 
       message ILIKE $1
     ORDER BY created_at DESC
     LIMIT 50`,
    [`%${searchTerm}%`]
  );
  return result.rows;
}

export async function getLeadsByTag(tag: string): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads 
     WHERE tags @> $1
     ORDER BY created_at DESC`,
    [JSON.stringify([tag])]
  );
  return result.rows;
}

export async function getRecentLeads(limit = 10): Promise<Lead[]> {
  const result = await query<Lead>(
    `SELECT * FROM active_leads 
     ORDER BY created_at DESC 
     LIMIT $1`,
    [limit]
  );
  return result.rows;
}
