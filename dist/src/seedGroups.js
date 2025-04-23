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
const connection_1 = require("../src/db/connection");
const groups = [
    { name: 'admin', description: 'Administrators with full access' },
    { name: 'developer', description: 'Developers with code access' },
    { name: 'staff', description: 'Staff members with limited access' },
];
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield connection_1.pool.getConnection();
        for (const group of groups) {
            yield connection.execute('INSERT INTO `groups` (name, created_at) VALUES (?, NOW())', [group.name]);
        }
        console.log('✅ Groups seeded successfully.');
        connection.release();
    }
    catch (error) {
        console.error('❌ Error seeding groups:', error);
    }
}))();
