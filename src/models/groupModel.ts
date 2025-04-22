import { query } from '../db/query';

export async function createGroup(name: string) {
  const sql = `INSERT INTO groups (name) VALUES (?)`;
  const result = await query<{ insertId: number }>(sql, [name]);
  return result;
}

export async function getAllGroups() {
  const sql = `SELECT * FROM groups`;
  return query(sql);
}

export async function getGroupById(id: number) {
  const sql = `SELECT * FROM groups WHERE id = ?`;
  const result = await query<any[]>(sql, [id]);
  return result[0];
}

export async function updateGroup(id: number, name: string) {
  const sql = `UPDATE groups SET name = ? WHERE id = ?`;
  const result = await query(sql, [name, id]);
  return result;
}

export async function deleteGroup(id: number) {
  const sql = `DELETE FROM groups WHERE id = ?`;
  return query(sql, [id]);
}
