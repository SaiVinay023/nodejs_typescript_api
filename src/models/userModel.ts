import { query } from '../db/query';

type  UserData = {
    id: number;
    name: string;
    surname: string;
    birth_date: string;
    sex: string;
  };

export async function createUser(data: UserData) {
  const sql = `INSERT INTO users (name, surname, birth_date, sex) VALUES (?, ?, ?, ?)`;
  const values = [data.name, data.surname, data.birth_date, data.sex];
  return await query(sql, values);
}

export async function getUserById(id: number) {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const users = await query(sql, [id]);
  return users[0];
}

export async function listUsers() {
  const sql = `SELECT * FROM users ORDER BY id DESC`;
  return await query(sql);
}

export async function updateUser(id: number, data: UserData) {
  const sql = `UPDATE users SET name = ?, surname = ?, birth_date = ?, sex = ? WHERE id = ?`;
  const result = await query(sql, [data.name, data.surname, data.birth_date, data.sex, id]);
  return result.affectedRows > 0;
}

export async function deleteUser(id: number) {
  const sql = `DELETE FROM users WHERE id = ?`;
  const result = await query(sql, [id]);
  return result.affectedRows > 0;
}

export async function joinGroup(userId: number, groupId: number) {
  const checkSql = `SELECT * FROM user_groups WHERE user_id = ? AND group_id = ?`;
  const checkValues = [userId, groupId];
  const existingGroup = await query(checkSql, checkValues);

  if (existingGroup.length > 0) {
    return false;
  }

  const sql = `INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)`;
  const values = [userId, groupId];

  try {
    const result = await query(sql, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error joining group:', error);
    throw new Error('Failed to join group');
  }
}

export async function leaveGroup(userId: number, groupId: number) {
  const sql = `DELETE FROM user_groups WHERE user_id = ? AND group_id = ?`;
  const values = [userId, groupId];

  try {
    const result = await query(sql, values);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error leaving group:', error);
    throw new Error('Failed to leave group');
  }
}


