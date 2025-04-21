"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.listUsers = listUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
const query_1 = require("../db/query");
async function createUser(data) {
    const sql = `INSERT INTO users (name, surname, birth_date, sex) VALUES (?, ?, ?, ?)`;
    const values = [data.name, data.surname, data.birth_date, data.sex];
    return await (0, query_1.query)(sql, values);
}
async function getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const users = await (0, query_1.query)(sql, [id]);
    return users[0];
}
async function listUsers(limit, offset) {
    const sql = `SELECT * FROM users LIMIT ? OFFSET ?`;
    const users = await (0, query_1.query)(sql, [limit, offset]);
    return users;
}
async function updateUser(id, data) {
    const sql = `UPDATE users SET name = ?, surname = ?, birth_date = ?, sex = ? WHERE id = ?`;
    const result = await (0, query_1.query)(sql, [data.name, data.surname, data.birth_date, data.sex, id]);
    return result.affectedRows > 0;
}
async function deleteUser(id) {
    const sql = `DELETE FROM users WHERE id = ?`;
    const result = await (0, query_1.query)(sql, [id]);
    return result.affectedRows > 0;
}
async function joinGroup(userId, groupId) {
    const checkSql = `SELECT * FROM user_groups WHERE user_id = ? AND group_id = ?`;
    const checkValues = [userId, groupId];
    const existingGroup = await (0, query_1.query)(checkSql, checkValues);
    if (existingGroup.length > 0) {
        return false;
    }
    const sql = `INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)`;
    const values = [userId, groupId];
    try {
        const result = await (0, query_1.query)(sql, values);
        return result.affectedRows > 0;
    }
    catch (error) {
        console.error('Error joining group:', error);
        throw new Error('Failed to join group');
    }
}
async function leaveGroup(userId, groupId) {
    const sql = `DELETE FROM user_groups WHERE user_id = ? AND group_id = ?`;
    const values = [userId, groupId];
    try {
        const result = await (0, query_1.query)(sql, values);
        return result.affectedRows > 0;
    }
    catch (error) {
        console.error('Error leaving group:', error);
        throw new Error('Failed to leave group');
    }
}
//# sourceMappingURL=userModel.js.map