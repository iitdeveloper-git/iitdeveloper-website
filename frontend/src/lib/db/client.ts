// Cloudflare Pages / Edge Runtime compatible database client
import { neon } from '@neondatabase/serverless';

// Get database connection
// This is edge-compatible and works with Cloudflare Pages
let sql: ReturnType<typeof neon> | null = null;

export function getDbConnection() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  
  if (!sql) {
    sql = neon(process.env.DATABASE_URL);
  }
  
  return sql;
}

// Query helper for edge runtime
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const sql = getDbConnection();
  const start = Date.now();
  
  try {
    const result = await sql(text, params || []);
    
    // Log slow queries in development
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.warn(`⚠️  Slow query (${duration}ms):`, text.substring(0, 100));
    }
    
    return result as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Transaction helper (simplified for edge)
// Note: Neon serverless uses HTTP, so traditional transactions work differently
export async function transaction<T>(
  callback: (sql: ReturnType<typeof neon>) => Promise<T>
): Promise<T> {
  const sql = getDbConnection();
  
  try {
    // For Neon serverless, transactions need to be handled with SQL commands
    await sql('BEGIN');
    const result = await callback(sql);
    await sql('COMMIT');
    return result;
  } catch (error) {
    await sql('ROLLBACK');
    throw error;
  }
}

// Health check
export async function healthCheck(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
