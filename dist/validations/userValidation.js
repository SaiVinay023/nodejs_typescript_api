"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = validateUser;
const joi_1 = __importDefault(require("joi"));
function validateUser(user) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).max(100).required(),
        surname: joi_1.default.string().min(2).max(100).required(),
        birth_date: joi_1.default.date().required(),
        sex: joi_1.default.string().valid('male', 'female', 'other').required()
    });
    return schema.validate(user);
}
