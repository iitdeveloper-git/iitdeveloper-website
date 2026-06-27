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

import { neon } from '@neondatabase/serverless';

// Singleton connection
let _sql: ReturnType<typeof neon> | null = null;

export function getDbConnection(): ReturnType<typeof neon> {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured');
  }
  if (!_sql) {
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

// ── Top-level query helper ────────────────────────────────────────────────────
// Called from service files as:  query<Row>("SELECT ...", [params])
// Returns T[] directly (rows only — no .rows wrapper needed).
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const sql = getDbConnection();
  const start = Date.now();

  try {
    // sql.query() returns a plain T[] (not { rows }).
    const result = await sql.query(text, params ?? []) as unknown as T[];

    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.warn(`⚠️  Slow query (${duration}ms):`, text.substring(0, 100));
    }

    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// ── Neon pg-compatible result wrapper ────────────────────────────────────────
// The transaction callbacks in leads-service.ts / pricing-rules-service.ts
// use client.query<T>(text, params) and then read result.rows[0], matching
// the node-postgres (pg) API.  We expose a pgQuery helper on the connection
// object that returns { rows: T[] } by using fullResults: true.

interface PgResult<T> {
  rows: T[];
  rowCount?: number;
}

// A thin wrapper around the neon sql object that surfaces a pg-compatible
// .query() method returning { rows }.
export type PgClient = {
  query<T = any>(text: string, params?: any[]): Promise<PgResult<T>>;
};

function makePgClient(sql: ReturnType<typeof neon>): PgClient {
  return {
    async query<T = any>(text: string, params?: any[]): Promise<PgResult<T>> {
      // fullResults: true → returns { rows, fields, rowCount, command, … }
      const result = await sql.query(text, params ?? [], { fullResults: true } as any);
      return result as unknown as PgResult<T>;
    },
  };
}

// ── Transaction helper ────────────────────────────────────────────────────────
// The callback receives a pg-compatible client whose .query() returns { rows }.
// This matches how leads-service.ts / pricing-rules-service.ts use it.
export async function transaction<T>(
  callback: (client: PgClient) => Promise<T>
): Promise<T> {
  const sql = getDbConnection();
  const pgClient = makePgClient(sql);

  try {
    await sql.query('BEGIN');
    const result = await callback(pgClient);
    await sql.query('COMMIT');
    return result;
  } catch (error) {
    try {
      await sql.query('ROLLBACK');
    } catch {
      // ignore rollback errors
    }
    throw error;
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
