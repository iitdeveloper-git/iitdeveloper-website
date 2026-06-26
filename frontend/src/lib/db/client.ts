import { neon } from '@neondatabase/serverless';

type Row = Record<string, unknown>;
export type QueryRows<T> = T[] & { rows: T[] };
export type QueryClient = { query<T = Row>(text: string, params?: unknown[]): Promise<{ rows: T[] }> };

let sql: ReturnType<typeof neon> | null = null;

export function getDbConnection() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
}

function hybridRows<T>(rows: T[]): QueryRows<T> {
  const result = rows as QueryRows<T>;
  result.rows = result;
  return result;
}

export async function query<T = Row>(text: string, params: unknown[] = []): Promise<QueryRows<T>> {
  const rows = await getDbConnection().query(text, params) as T[];
  return hybridRows(rows);
}

export function getClient(): QueryClient {
  return {
    async query<T = Row>(text: string, params: unknown[] = []) {
      return { rows: await query<T>(text, params) };
    },
  };
}

export async function transaction<T>(callback: (client: QueryClient) => Promise<T>): Promise<T> {
  return callback(getClient());
}

export async function healthCheck() {
  try {
    await query('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
