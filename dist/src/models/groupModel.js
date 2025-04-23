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
exports.createGroup = createGroup;
exports.getAllGroups = getAllGroups;
exports.getGroupById = getGroupById;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
const query_1 = require("../db/query");
// Function to create a new group
function createGroup(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `INSERT INTO \`groups\` (name, created_at, updated_at) VALUES (?, NOW(), NOW())`;
        const result = yield (0, query_1.query)(sql, [name]);
        // Return group data with id, name, created_at, and updated_at
        const group = {
            id: result.insertId,
            name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };
        return group;
    });
}
function getAllGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM \`groups\``; // Escaping 'groups' table name
        return (0, query_1.query)(sql);
    });
}
// Function to get a group by ID
function getGroupById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `SELECT * FROM groups WHERE id = ?`;
        const result = yield (0, query_1.query)(sql, [id]);
        return result.length > 0 ? result[0] : null;
    });
}
// Function to update group information
function updateGroup(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `UPDATE \`groups\` SET name = ?, updated_at = NOW() WHERE id = ?`;
        yield (0, query_1.query)(sql, [name, id]);
        // Return updated group data
        return {
            id,
            name,
            updated_at: new Date().toISOString(),
        };
    });
}
// Function to delete a group
function deleteGroup(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `DELETE FROM \`groups\` WHERE id = ?`;
        const result = yield (0, query_1.query)(sql, [id]);
        yield (0, query_1.query)(sql, [id]);
        // Return a success message
        return { message: `Group with ID ${id} deleted successfully` };
    });
}
function joinGroup(userId, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkSql = `SELECT * FROM user_groups WHERE user_id = ? AND group_id = ?`;
        const existing = yield (0, query_1.query)(checkSql, [userId, groupId]);
        if (existing.length > 0)
            return false;
        const insertSql = `INSERT INTO user_groups (user_id, group_id) VALUES (?, ?)`;
        const result = yield (0, query_1.query)(insertSql, [userId, groupId]);
        return result.affectedRows > 0;
    });
}
function leaveGroup(userId, groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteSql = `DELETE FROM user_groups WHERE user_id = ? AND group_id = ?`;
        const result = yield (0, query_1.query)(deleteSql, [userId, groupId]);
        return result.affectedRows > 0;
    });
}
