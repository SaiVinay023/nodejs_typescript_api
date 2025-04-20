import { pool } from './connection';

export async function query<T = any>(sql: string, values: any[] = []): Promise<T> {
  const [results] = await pool.execute<T>(sql, values);
  return results;
}
