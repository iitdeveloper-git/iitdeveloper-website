// Service catalog database operations
import { query, transaction } from './client';
import type {
  Service,
  ServiceWithCategory,
  ServiceCategory,
  ServiceConfiguration,
  CreateService,
  UpdateService,
  CreateServiceCategory,
  UpdateServiceCategory,
  CreateServiceConfiguration,
  UpdateServiceConfiguration,
} from './types';

// ============================================================================
// SERVICE CATEGORIES
// ============================================================================

export async function getAllServiceCategories(): Promise<ServiceCategory[]> {
  const result = await query<ServiceCategory>(
    `SELECT * FROM service_categories WHERE is_active = true ORDER BY display_order, name`
  );
  return result.rows;
}

export async function getServiceCategoryBySlug(slug: string): Promise<ServiceCategory | null> {
  const result = await query<ServiceCategory>(
    `SELECT * FROM service_categories WHERE slug = $1 AND is_active = true`,
    [slug]
  );
  return result.rows[0] || null;
}

export async function createServiceCategory(data: CreateServiceCategory): Promise<ServiceCategory> {
  const result = await query<ServiceCategory>(
    `INSERT INTO service_categories (name, slug, description, icon, display_order, is_active)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.name,
      data.slug,
      data.description || null,
      data.icon || null,
      data.display_order || 0,
      data.is_active ?? true,
    ]
  );
  return result.rows[0];
}

export async function updateServiceCategory(
  id: string,
  data: UpdateServiceCategory
): Promise<ServiceCategory> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramCount++}`);
    values.push(data.name);
  }
  if (data.slug !== undefined) {
    updates.push(`slug = $${paramCount++}`);
    values.push(data.slug);
  }
  if (data.description !== undefined) {
    updates.push(`description = $${paramCount++}`);
    values.push(data.description);
  }
  if (data.icon !== undefined) {
    updates.push(`icon = $${paramCount++}`);
    values.push(data.icon);
  }
  if (data.display_order !== undefined) {
    updates.push(`display_order = $${paramCount++}`);
    values.push(data.display_order);
  }
  if (data.is_active !== undefined) {
    updates.push(`is_active = $${paramCount++}`);
    values.push(data.is_active);
  }

  values.push(id);

  const result = await query<ServiceCategory>(
    `UPDATE service_categories SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return result.rows[0];
}

// ============================================================================
// SERVICES
// ============================================================================

export async function getAllServices(): Promise<ServiceWithCategory[]> {
  const result = await query<ServiceWithCategory>(
    `SELECT * FROM active_services ORDER BY display_order, name`
  );
  return result.rows;
}

export async function getFeaturedServices(): Promise<ServiceWithCategory[]> {
  const result = await query<ServiceWithCategory>(
    `SELECT * FROM active_services WHERE is_featured = true ORDER BY display_order, name`
  );
  return result.rows;
}

export async function getServicesByCategory(categorySlug: string): Promise<ServiceWithCategory[]> {
  const result = await query<ServiceWithCategory>(
    `SELECT * FROM active_services WHERE category_slug = $1 ORDER BY display_order, name`,
    [categorySlug]
  );
  return result.rows;
}

export async function getServiceBySlug(slug: string): Promise<ServiceWithCategory | null> {
  const result = await query<ServiceWithCategory>(
    `SELECT * FROM active_services WHERE slug = $1`,
    [slug]
  );
  return result.rows[0] || null;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const result = await query<Service>(
    `SELECT * FROM services WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

export async function createService(data: CreateService): Promise<Service> {
  const result = await query<Service>(
    `INSERT INTO services (
      category_id, name, slug, tagline, description, long_description,
      icon, image_url, color, base_price, price_unit, price_display,
      features, tech_stack, deliverables, timeline_estimate,
      display_order, is_featured, is_active, is_configurable,
      meta_title, meta_description
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
    RETURNING *`,
    [
      data.category_id || null,
      data.name,
      data.slug,
      data.tagline || null,
      data.description || null,
      data.long_description || null,
      data.icon || null,
      data.image_url || null,
      data.color || null,
      data.base_price,
      data.price_unit || 'project',
      data.price_display || null,
      JSON.stringify(data.features || []),
      JSON.stringify(data.tech_stack || []),
      JSON.stringify(data.deliverables || []),
      data.timeline_estimate || null,
      data.display_order || 0,
      data.is_featured ?? false,
      data.is_active ?? true,
      data.is_configurable ?? true,
      data.meta_title || null,
      data.meta_description || null,
    ]
  );
  return result.rows[0];
}

export async function updateService(id: string, data: UpdateService): Promise<Service> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  // Build dynamic update query
  const fields: (keyof UpdateService)[] = [
    'category_id', 'name', 'slug', 'tagline', 'description', 'long_description',
    'icon', 'image_url', 'color', 'base_price', 'price_unit', 'price_display',
    'timeline_estimate', 'display_order', 'is_featured', 'is_active', 
    'is_configurable', 'meta_title', 'meta_description',
  ];

  fields.forEach((field) => {
    if (data[field] !== undefined) {
      updates.push(`${field} = $${paramCount++}`);
      values.push(data[field]);
    }
  });

  // Handle JSONB fields
  if (data.features !== undefined) {
    updates.push(`features = $${paramCount++}`);
    values.push(JSON.stringify(data.features));
  }
  if (data.tech_stack !== undefined) {
    updates.push(`tech_stack = $${paramCount++}`);
    values.push(JSON.stringify(data.tech_stack));
  }
  if (data.deliverables !== undefined) {
    updates.push(`deliverables = $${paramCount++}`);
    values.push(JSON.stringify(data.deliverables));
  }

  values.push(id);

  const result = await query<Service>(
    `UPDATE services SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function deleteService(id: string): Promise<void> {
  await query(`UPDATE services SET deleted_at = NOW() WHERE id = $1`, [id]);
}

// ============================================================================
// SERVICE CONFIGURATIONS
// ============================================================================

export async function getServiceConfigurations(serviceId: string): Promise<ServiceConfiguration[]> {
  const result = await query<ServiceConfiguration>(
    `SELECT * FROM service_configurations WHERE service_id = $1 ORDER BY display_order, name`,
    [serviceId]
  );
  return result.rows;
}

export async function createServiceConfiguration(
  data: CreateServiceConfiguration
): Promise<ServiceConfiguration> {
  const result = await query<ServiceConfiguration>(
    `INSERT INTO service_configurations (
      service_id, name, key, description, input_type, options,
      default_value, min_value, max_value, is_required,
      price_modifier_type, price_modifier, display_order, help_text
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *`,
    [
      data.service_id,
      data.name,
      data.key,
      data.description || null,
      data.input_type || 'select',
      JSON.stringify(data.options || []),
      data.default_value || null,
      data.min_value || null,
      data.max_value || null,
      data.is_required ?? false,
      data.price_modifier_type || 'multiplier',
      data.price_modifier || 1.0,
      data.display_order || 0,
      data.help_text || null,
    ]
  );
  return result.rows[0];
}

export async function updateServiceConfiguration(
  id: string,
  data: UpdateServiceConfiguration
): Promise<ServiceConfiguration> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramCount = 1;

  const fields: (keyof Omit<UpdateServiceConfiguration, 'options'>)[] = [
    'service_id', 'name', 'key', 'description', 'input_type',
    'default_value', 'min_value', 'max_value', 'is_required',
    'price_modifier_type', 'price_modifier', 'display_order', 'help_text',
  ];

  fields.forEach((field) => {
    if (data[field] !== undefined) {
      updates.push(`${field} = $${paramCount++}`);
      values.push(data[field]);
    }
  });

  if (data.options !== undefined) {
    updates.push(`options = $${paramCount++}`);
    values.push(JSON.stringify(data.options));
  }

  values.push(id);

  const result = await query<ServiceConfiguration>(
    `UPDATE service_configurations SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function deleteServiceConfiguration(id: string): Promise<void> {
  await query(`DELETE FROM service_configurations WHERE id = $1`, [id]);
}

// ============================================================================
// BULK OPERATIONS
// ============================================================================

export async function getServiceWithConfigurations(
  slug: string
): Promise<{ service: ServiceWithCategory; configurations: ServiceConfiguration[] } | null> {
  const service = await getServiceBySlug(slug);
  if (!service) return null;

  const configurations = await getServiceConfigurations(service.id);
  return { service, configurations };
}

export async function getAllServicesWithCategories(): Promise<{
  categories: ServiceCategory[];
  services: ServiceWithCategory[];
}> {
  const [categories, services] = await Promise.all([
    getAllServiceCategories(),
    getAllServices(),
  ]);

  return { categories, services };
}
