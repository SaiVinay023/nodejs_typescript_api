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
function query(sql_1) {
    return __awaiter(this, arguments, void 0, function* (sql, values = []) {
        try {
            const [result] = yield connection_1.pool.execute(sql, values);
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
    });
}
