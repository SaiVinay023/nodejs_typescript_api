"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.listUsers = listUsers;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
const query_1 = require("../db/query");
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT INTO users (name, surname, birth_date, sex) VALUES (?, ?, ?, ?)`;
        const values = [data.name, data.surname, data.birth_date, data.sex];
        return yield (0, query_1.query)(sql, values);
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM users WHERE id = ?`;
        const users = yield (0, query_1.query)(sql, [id]);
        return users[0];
    });
}
function listUsers(limit, offset) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM users LIMIT ? OFFSET ?`;
        const countSql = `SELECT COUNT(*) as total FROM users`;
        if (isNaN(limit) || isNaN(offset)) {
            throw new Error("Invalid limit or offset type");
        }
        const [users, totalResult] = yield Promise.all([
            ///query(sql, [Number(limit), Number(offset)]), // Fetch users
            (0, query_1.query)(sql),
            (0, query_1.query)(countSql), // Fetch total count of users
        ]);
        const total = totalResult[0].total;
        const hasMore = offset + users.length < total; // Correctly define `hasMore`
        return { users, total, hasMore };
    });
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
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE users SET name = ?, surname = ?, birth_date = ?, sex = ? WHERE id = ?`;
        const result = yield (0, query_1.query)(sql, [data.name, data.surname, data.birth_date, data.sex, id]);
        return result.affectedRows > 0;
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `DELETE FROM users WHERE id = ?`;
        const result = yield (0, query_1.query)(sql, [id]);
        return result.affectedRows > 0;
    });
}
function joinGroup(userId, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkSql = `SELECT * FROM user_groups WHERE user_id = ? AND group_id = ?`;
        const checkValues = [userId, groupId];
        const existingGroup = yield (0, query_1.query)(checkSql, checkValues);
        if (existingGroup.length > 0) {
            return false;
        }
        const sql = `INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)`;
        const values = [userId, groupId];
        try {
            const result = yield (0, query_1.query)(sql, values);
            return result.affectedRows > 0;
        }
        catch (error) {
            console.error('Error joining group:', error);
            throw new Error('Failed to join group');
        }
    });
}
function leaveGroup(userId, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `DELETE FROM user_groups WHERE user_id = ? AND group_id = ?`;
        const values = [userId, groupId];
        try {
            const result = yield (0, query_1.query)(sql, values);
            return result.affectedRows > 0;
        }
        catch (error) {
            console.error('Error leaving group:', error);
            throw new Error('Failed to leave group');
        }
    });
}
