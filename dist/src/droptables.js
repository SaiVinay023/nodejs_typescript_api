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
const connection_1 = require("./db/connection");
function dropTables() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // SQL queries to drop the tables if they exist
            const dropGroupsTableQuery = `DROP TABLE IF EXISTS groups;`;
            const dropUserGroupsTableQuery = `DROP TABLE IF EXISTS user_groups;`;
            // Execute the queries
            yield connection_1.pool.execute(dropGroupsTableQuery);
            yield connection_1.pool.execute(dropUserGroupsTableQuery);
            console.log('Tables dropped successfully');
        }
        catch (err) {
            console.error('Error dropping tables:', err);
        }
    });
}
// Call the function to drop the tables
dropTables();
