import { query } from '../db/query';

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

// Function to get all groups
/*export async function getAllGroups() {
  const sql = `SELECT * FROM groups`;
  const result = await query(sql);

  return result.map((group: any) => ({
    id: group.id,
    name: group.name,
    created_at: group.created_at,
    updated_at: group.updated_at,
  }));
} */
  export async function getAllGroups() {
    const sql = `SELECT * FROM \`groups\``;  // Escaping 'groups' table name
    return query(sql);
  }

// Function to get a group by ID
export async function getGroupById(id: number) {
  const sql = `SELECT * FROM groups WHERE id = ?`;
  const result = await query<any[]>(sql, [id]);

  // Return group data if found, otherwise null
  return result.length > 0 ? result[0] : null;
}

// Function to update group information
export async function updateGroup(id: number, name: string) {
  const sql = `UPDATE \`groups\` SET name = ?, updated_at = NOW() WHERE id = ?`;
  const result = await query(sql, [name, id]);

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

  // Return a success message
  return { message: `Group with ID ${id} deleted successfully` };
}

export async function joinGroup(userId: number, groupId: number) {
  const checkSql = `SELECT * FROM user_groups WHERE user_id = ? AND group_id = ?`;
  const checkValues = [userId, groupId];
  
  try {
    const existingGroup = await query(checkSql, checkValues);

    if (existingGroup.length > 0) {
      return false; // User is already in this group
    }

    const insertSql = `INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)`;
    const insertValues = [userId, groupId];

    const result = await query(insertSql, insertValues);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error joining group:', error);
    throw new Error('Failed to join group');
  }
}

// Function to leave a group
export async function leaveGroup(userId: number, groupId: number) {
  const deleteSql = `DELETE FROM user_groups WHERE user_id = ? AND group_id = ?`;
  const deleteValues = [userId, groupId];

  try {
    const result = await query(deleteSql, deleteValues);
    return result.affectedRows > 0; // Returns true if the delete was successful
  } catch (error) {
    console.error('Error leaving group:', error);
    throw new Error('Failed to leave group');
  }
}