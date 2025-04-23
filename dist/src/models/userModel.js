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
exports.softDeleteUser = softDeleteUser;
exports.deleteUser = deleteUser;
const query_1 = require("../db/query");
function createUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertSql = `INSERT INTO users (name, surname, birth_date, sex) VALUES (?, ?, ?, ?)`;
        const values = [data.name, data.surname, data.birth_date, data.sex];
        const result = yield (0, query_1.query)(insertSql, values);
        const insertId = result.insertId;
        if (!insertId) {
            throw new Error('Insert failed: No ID returned.');
        }
        const sqlSelect = `SELECT * FROM users WHERE id = ? AND deleted_at IS NULL`;
        const rows = yield (0, query_1.query)(sqlSelect, [insertId]);
        if (!rows || rows.length === 0) {
            throw new Error('User not found after insertion.');
        }
        return rows[0];
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userSql = `SELECT * FROM users WHERE id = ?`;
        const userValues = [id];
        const groupSql = `
  SELECT g.id AS group_id, g.name AS group_name
  FROM \`groups\` g
  JOIN user_groups ug ON g.id = ug.group_id
  WHERE ug.user_id = ?
`;
        const userResult = yield (0, query_1.query)(userSql, userValues);
        if (userResult.length === 0) {
            throw new Error(`User with ID ${id} not found`);
        }
        const user = userResult[0];
        // Query for groups
        const groups = yield (0, query_1.query)(groupSql, [id]);
        user.groups = groups.length > 0 ? groups : [];
        return user;
    });
}
function listUsers(limit, offset) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const sql = `SELECT * FROM users WHERE deleted_at IS NULL LIMIT ? OFFSET ?`;
        const users = yield (0, query_1.query)(sql, [limit, offset]);
        const totalResult = yield (0, query_1.query)(`SELECT COUNT(*) AS total FROM users WHERE deleted_at IS NULL`);
        const total = ((_a = totalResult[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
        const hasMore = offset + users.length < total;
        return { users, total, hasMore };
    });
}
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE users SET name = ?, surname = ?, birth_date = ?, sex = ? WHERE id = ?`;
        const result = yield (0, query_1.query)(sql, [data.name, data.surname, data.birth_date, data.sex, id]);
        return result.affectedRows > 0;
    });
}
function softDeleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE users SET deleted_at = NOW() WHERE id = ?`;
        const result = yield (0, query_1.query)(sql, [id]);
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
