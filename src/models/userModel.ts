import { query } from '../db/query';
import { ResultSetHeader } from 'mysql2/promise';

export type UserData = {
  id?: number;
  name: string;
  surname: string;
  birth_date: string;
  sex: string;
  groups?: GroupData[];
};

export type GroupData = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export async function createUser(data: Omit<UserData, 'id' | 'groups'>): Promise<UserData> {
  const sql = `INSERT INTO users (name, surname, birth_date, sex) VALUES (?, ?, ?, ?)`;
  const values = [data.name, data.surname, data.birth_date, data.sex];
  const result = await query<ResultSetHeader>(sql, values);
  const insertId = result.insertId;

  const sqlSelect = `SELECT * FROM users WHERE id = ? AND deleted_at IS NULL`;
  const [rows]: [UserData[], any] = await query(sqlSelect, [insertId]);
  if (rows.length === 0) {
    throw new Error('User not found after insertion');
  }

  return rows[0];  // Return the first user from the result
}

export async function getUserById(id: number): Promise<UserData> {
  const userSql = `SELECT * FROM users WHERE id = ?`;
  const userValues = [id];

  const groupSql = `SELECT g.id AS group_id, g.name AS group_name 
                    FROM groups g
                    JOIN user_groups ug ON g.id = ug.group_id
                    WHERE ug.user_id = ?`;
  const userResult = await query<UserData[]>(userSql, userValues);

  if (!userResult.length) {
    throw new Error(`User with ID ${id} not found`);
  }

  const user = userResult[0];
  const groups = await query<GroupData[]>(groupSql, [id]);
  user.groups = groups;
  return user;
}

export async function listUsers(limit: number, offset: number): Promise<{ users: UserData[]; total: number; hasMore: boolean }> {
  const sql = `SELECT * FROM users LIMIT ? OFFSET ?`;
  const users = await query<UserData[]>(sql, [limit, offset]);

  const totalResult = await query<{ total: number }[]>(`SELECT COUNT(*) AS total FROM users`);
  const total = totalResult[0]?.total || 0;
  const hasMore = offset + users.length < total;

  return { users, total, hasMore };
}

export async function updateUser(id: number, data: Omit<UserData, 'id' | 'groups'>): Promise<boolean> {
  const sql = `UPDATE users SET name = ?, surname = ?, birth_date = ?, sex = ? WHERE id = ?`;
  const result = await query<ResultSetHeader>(sql, [data.name, data.surname, data.birth_date, data.sex, id]);
  return result.affectedRows > 0;
}

export async function deleteUser(id: number): Promise<boolean> {
  const sql = `DELETE FROM users WHERE id = ?`;
  const result = await query<ResultSetHeader>(sql, [id]);
  return result.affectedRows > 0;
}