"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
const connection_1 = require("./connection");
async function query(sql, values = []) {
    try {
        const [result] = await connection_1.pool.execute(sql, values);
        return result;
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`SQL Error: ${err.message}\nQuery: ${sql}\nValues: ${JSON.stringify(values)}`);
        }
        else {
            console.error(`SQL Error: ${String(err)}\nQuery: ${sql}\nValues: ${JSON.stringify(values)}`);
        }
        throw err;
    }
}
//# sourceMappingURL=query.js.map