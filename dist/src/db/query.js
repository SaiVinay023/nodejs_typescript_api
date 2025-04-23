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
exports.query = query;
const connection_1 = require("./connection");
/**
 * Runs a SQL query and dynamically chooses between query() and execute()
 * depending on whether values are passed.
 *
 * @param sql - The raw SQL string
 * @param values - Optional array of parameters for prepared statements
 */
function query(sql, values) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Executing SQL:", sql, "With Values:", values || []);
            let result;
            if (values && values.length > 0) {
                // Use execute if placeholders are used
                [result] = yield connection_1.pool.execute(sql, values);
            }
            else {
                // Use query for direct execution (no ? placeholders)
                [result] = yield connection_1.pool.query(sql);
            }
            return result;
        }
        catch (err) {
            const errorDetails = {
                message: err instanceof Error ? err.message : String(err),
                sql,
                values,
            };
            console.error("SQL Execution Error:", JSON.stringify(errorDetails, null, 2));
            throw err;
        }
    });
}
