import { pool } from './connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export async function query<T = any>(sql: string, values: any[] = []): Promise<T> {
    try {
      const [result] = await pool.execute<RowDataPacket[] | ResultSetHeader>(sql, values);
      return result as T;
    } catch (err) {
      if (err instanceof Error) {
        console.error(`SQL Error: ${err.message}\nQuery: ${sql}\nValues: ${JSON.stringify(values)}`);
      } else {
        console.error(`SQL Error: ${String(err)}\nQuery: ${sql}\nValues: ${JSON.stringify(values)}`);
      }
      throw err;
    }
  }
  