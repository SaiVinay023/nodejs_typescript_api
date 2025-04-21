import { query } from '../db/query';

type  UserData = {
    id: number;
    name: string;
    surname: string;
    birth_date: string;
    sex: string;
    limit: number;
    offset: number;
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

export async function listUsers(limit: number, offset: number) {
  const sql = `SELECT * FROM users LIMIT ? OFFSET ?`;
  const countSql = `SELECT COUNT(*) as total FROM users`;

  const [users, totalResult] = await Promise.all([
    query(sql, [limit, offset]), // Fetch users
    query(countSql), // Fetch total count of users
  ]);

  const total = totalResult[0].total;
  const hasMore = offset + users.length < total; // Correctly define `hasMore`

  return { users, total, hasMore };
}

/*export async function listUsers(limit: number, offset: number) {
    const sql = `
      SELECT * FROM users 
    LIMIT ? OFFSET ?
    `;
    
    // For proper pagination, get total count
    const countSql = `SELECT COUNT(*) as total FROM users`;
    
    const [users, total] = await Promise.all([
      query(sql, [limit, offset]),
      query(countSql)
    ]);
  
    return {
      users,
      total: total[0].total,
      hasMore: offset + limit < total[0].total
    };
  } */

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


