// Database client — @neondatabase/serverless v1.1.0+
//
// Breaking change in v1.1.0:
//   sql("SELECT $1", [value])       ← removed, throws now
//   sql.query("SELECT $1", [value]) ← plain array of rows (default)
//   sql.query("SELECT $1", [value], { fullResults: true }) ← { rows, fields, … }
//
// The leads-service / pricing-rules-service code expects a pg-style
// { rows: T[] } result object inside transactions.  We pass fullResults: true
// so client.query() inside the transaction callback returns that shape.

import { Pool } from '@neondatabase/serverless';

// Singleton connection
let _pool: Pool | null = null;

export function getDbConnection(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }
  if (!_pool) {
    _pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return _pool;
}

// ── Top-level query helper ────────────────────────────────────────────────────
// Called from service files as:  query<Row>("SELECT ...", [params])
// Returns T[] directly (rows only — no .rows wrapper needed).
export const getClient = getDbConnection;

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const pool = getDbConnection();
  const start = Date.now();

  try {
    const result = await pool.query(text, params);

    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.warn(`⚠️  Slow query (${duration}ms):`, text.substring(0, 100));
    }

    return result.rows as unknown as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// ── Neon pg-compatible result wrapper ────────────────────────────────────────

interface PgResult<T> {
  rows: T[];
  rowCount?: number | null;
}

export type PgClient = {
  query<T = any>(text: string, params?: any[]): Promise<PgResult<T>>;
};

// ── Transaction helper ────────────────────────────────────────────────────────
export async function transaction<T>(
  callback: (client: PgClient) => Promise<T>
): Promise<T> {
  const pool = getDbConnection();
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    try {
      await client.query('ROLLBACK');
    } catch {
      // ignore rollback errors
    }
    throw error;
  } finally {
    client.release();
  }
}

// ── Health check ──────────────────────────────────────────────────────────────
export async function healthCheck(): Promise<boolean> {
  try {
    await query('SELECT 1');
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}
