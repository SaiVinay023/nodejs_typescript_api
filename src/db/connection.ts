import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // <-- set 10s timeout
});

/*
export async function query<T = any>(sql: string, values: any[] = []): Promise<T> {
  try {
    console.log("Executing SQL:", sql, "With Values:", values); // Debugging log
    const [result] = await pool.execute(sql, values);
    return result as T;
  } catch (err) {
    if (err instanceof Error) {
      console.error(`SQL Error: ${err.message}\nQuery: ${sql}\nValues: ${JSON.stringify(values)}`);
    } else {
      console.error(`Unexpected Error: ${JSON.stringify(err)}\nQuery: ${sql}\nValues: ${JSON.stringify(values)}`);
    }
    throw err;
  }
  
}
*/
pool.getConnection()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Database connection failed:', err));
