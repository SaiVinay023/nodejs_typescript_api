import { pool } from './connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export async function query<T = any>(sql: string, values: any[] = []): Promise<T> {
  const [rows] = await pool.execute<[RowDataPacket[], ResultSetHeader]>(sql, values);
  return rows as unknown as T;
}