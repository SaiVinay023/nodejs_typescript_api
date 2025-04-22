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
  const userSql = `SELECT * FROM users WHERE id = ?`;
  const userValues = [id];

  const groupSql = `SELECT g.id AS group_id, g.name AS group_name 
                    FROM groups g
                    JOIN user_groups ug ON g.id = ug.group_id
                    WHERE ug.user_id = ?`;
  const groupValues = [id];

  try {
    // Fetch the user details
    const userResult = await query(userSql, userValues);
    const user = userResult[0]; // Assuming the user exists and we get the first result

    // Fetch the groups the user belongs to
    const groupResult = await query(groupSql, groupValues);
    const groups = groupResult; // The list of groups the user belongs to

    // Merge user details with their group information
    user.groups = groups;

    return user;
  } catch (error) {
    console.error('Error fetching user and their groups:', error);
    throw new Error('Failed to fetch user and their groups');
  }
}

export async function listUsers(limit: number, offset: number): Promise<{ users: any[]; total: number; hasMore: boolean }> {
  // Inject LIMIT and OFFSET directly into SQL (safe because numbers)
  const sql = 'SELECT * FROM users LIMIT ? OFFSET ?';
  const users = await query<any[]>(sql, [limit, offset]);
   // no placeholder values here

  const totalResult = await query<any[]>(`SELECT COUNT(*) AS total FROM users`);
  const total = totalResult[0]?.total || 0;

  const hasMore = offset + users.length < total;

  return { users, total, hasMore };
}





 /* const countSql = `SELECT COUNT(*) as total FROM users`;

  if (isNaN(limit) || isNaN(offset)) {
    throw new Error("Invalid limit or offset type");
  }

  const [users, totalResult] = await Promise.all([
    ///query(sql, [Number(limit), Number(offset)]), // Fetch users
    query(sql),
    query(countSql), // Fetch total count of users
  ]);
 
  const total = totalResult[0].total;
  const hasMore = offset + users.length < total; // Correctly define `hasMore`

  return { users, total, hasMore }; */


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

