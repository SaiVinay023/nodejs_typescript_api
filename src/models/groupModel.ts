import { query } from '../db/query';
import { ResultSetHeader } from 'mysql2/promise';

export type GroupData = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
export async function createGroup(name: string) {
  const sql = `INSERT INTO \`groups\` (name, created_at, updated_at) VALUES (?, NOW(), NOW())`;
  const result = await query<{ insertId: number }>(sql, [name]);

  const group = {
    id: result.insertId,
    name,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return group;
}

  export async function getAllGroups() {
    const sql = `SELECT * FROM \`groups\``; 
    return query<GroupData[]>(sql);
  }

export async function getGroupById(id: number) {
  const sql = `SELECT * FROM groups WHERE id = ?`;
  const result = await query<GroupData[]>(sql, [id]);
  return result.length > 0 ? result[0] : null;
}

export async function updateGroup(id: number, name: string) {
  const sql = `UPDATE \`groups\` SET name = ?, updated_at = NOW() WHERE id = ?`;
  await query<ResultSetHeader>(sql, [name, id]);

  return {
    id,
    name,
    updated_at: new Date().toISOString(),
  };
}

export async function deleteGroup(id: number) {
  const sql = `DELETE FROM \`groups\` WHERE id = ?`;
  const result = await query(sql, [id]);
  await query<ResultSetHeader>(sql, [id]);
  return { message: `Group with ID ${id} deleted successfully` };
}

export async function addUserToGroup(groupId: number, userId: number): Promise<boolean> {
  const sql = 'INSERT INTO user_groups (group_id, user_id) VALUES (?, ?)';
  const result = await query(sql, [groupId, userId]);
  return result.affectedRows > 0;
}

export async function removeUserFromGroup(groupId: number, userId: number): Promise<boolean> {
  const sql = 'DELETE FROM user_groups WHERE group_id = ? AND user_id = ?';
  const result = await query(sql, [groupId, userId]);
  return result.affectedRows > 0;
}