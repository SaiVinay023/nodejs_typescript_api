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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../src/index")); // Adjust the path to your app instance
describe('User API Endpoints', () => {
    let createdUserId;
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).post('/users').send({
            name: 'Test',
            surname: 'User',
            birth_date: '1990-01-01',
            sex: 'male'
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdUserId = res.body.id;
    }));
    it('should fetch the created user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get(`/users/${createdUserId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('Test');
    }));
    it('should return 404 for unknown user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).get(`/users/999999`);
        expect(res.statusCode).toBe(404);
    }));
    it('should update the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).put(`/users/${createdUserId}`).send({
            name: 'Updated',
            surname: 'User',
            birth_date: '1990-01-01',
            sex: 'male'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User updated successfully');
    }));
    it('should delete the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.default).delete(`/users/${createdUserId}`);
        expect(res.statusCode).toBe(204);
    }));
});
