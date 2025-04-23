import { query } from '../db/query';
import { ResultSetHeader } from 'mysql2/promise';

export type GroupData = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};
// Function to create a new group
export async function createGroup(name: string) {
  const sql = `INSERT INTO \`groups\` (name, created_at, updated_at) VALUES (?, NOW(), NOW())`;
  const result = await query<{ insertId: number }>(sql, [name]);

  // Return group data with id, name, created_at, and updated_at
  const group = {
    id: result.insertId,
    name,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return group;
}

  export async function getAllGroups() {
    const sql = `SELECT * FROM \`groups\``;  // Escaping 'groups' table name
    return query<GroupData[]>(sql);
  }

// Function to get a group by ID
export async function getGroupById(id: number) {
  const sql = `SELECT * FROM groups WHERE id = ?`;
  const result = await query<GroupData[]>(sql, [id]);
  return result.length > 0 ? result[0] : null;
}

// Function to update group information
export async function updateGroup(id: number, name: string) {
  const sql = `UPDATE \`groups\` SET name = ?, updated_at = NOW() WHERE id = ?`;
  await query<ResultSetHeader>(sql, [name, id]);

  // Return updated group data
  return {
    id,
    name,
    updated_at: new Date().toISOString(),
  };
}

// Function to delete a group
export async function deleteGroup(id: number) {
  const sql = `DELETE FROM \`groups\` WHERE id = ?`;
  const result = await query(sql, [id]);
  await query<ResultSetHeader>(sql, [id]);
  // Return a success message
  return { message: `Group with ID ${id} deleted successfully` };
}

export async function joinGroup(userId: number, groupId: number) {
  const checkSql = `SELECT * FROM user_groups WHERE user_id = ? AND group_id = ?`;
  const existing = await query(checkSql, [userId, groupId]);

  if (existing.length > 0) return false;

  const insertSql = `INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)`;
  const result = await query<ResultSetHeader>(insertSql, [userId, groupId]);
  return result.affectedRows > 0;
}

export async function leaveGroup(userId: number, groupId: number) {
  const deleteSql = `DELETE FROM user_groups WHERE user_id = ? AND group_id = ?`;
  const result = await query<ResultSetHeader>(deleteSql, [userId, groupId]);
  return result.affectedRows > 0;
}
