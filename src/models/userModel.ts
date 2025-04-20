import { query } from '../db/query';

export async function createUser(data: { name: any; surname: any; birth_date: any; sex: any; }) {
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

export async function updateUser(id: number, data: { name: any; surname: any; birth_date: any; sex: any; }) {
  const sql = `UPDATE users SET name = ?, surname = ?, birth_date = ?, sex = ? WHERE id = ?`;
  const result = await query(sql, [data.name, data.surname, data.birth_date, data.sex, id]);
  return result.affectedRows > 0;
}

export async function deleteUser(id: number) {
  const sql = `DELETE FROM users WHERE id = ?`;
  const result = await query(sql, [id]);
  return result.affectedRows > 0;
}
