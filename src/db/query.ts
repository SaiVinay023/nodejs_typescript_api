import { pool } from './connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

/**
 * Runs a SQL query and dynamically chooses between query() and execute()
 * depending on whether values are passed.
 *
 * @param sql - The raw SQL string
 * @param values - Optional array of parameters for prepared statements
 */
export async function query<T = any>(sql: string, values?: any[]): Promise<T> {
  try {
    console.log("Executing SQL:", sql, "With Values:", values || []);

    let result;
    if (values && values.length > 0) {
      // Use execute if placeholders are used
      [result] = await pool.execute<RowDataPacket[] | ResultSetHeader>(sql, values);
    } else {
      // Use query for direct execution (no ? placeholders)
      [result] = await pool.query<RowDataPacket[] | ResultSetHeader>(sql);
    }

    return result as T;
  } catch (err) {
    const errorDetails = {
      message: err instanceof Error ? err.message : String(err),
      sql,
      values,
    };
    console.error("SQL Execution Error:", JSON.stringify(errorDetails, null, 2));
    throw err;
  }
}
