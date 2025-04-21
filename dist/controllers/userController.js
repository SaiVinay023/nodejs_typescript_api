"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
const userService = __importStar(require("../services/userService"));
const userValidation_1 = require("../validations/userValidation");
const apiError_1 = require("../utils/apiError");
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = (0, userValidation_1.validateUser)(req.body);
            if (error)
                return next(new apiError_1.ApiError(error.details[0].message, 400));
            const result = yield userService.createUser(value);
            res.status(201).json({ id: result.insertId, message: 'User created successfully' });
        }
        catch (err) {
            next(err);
        }
    });
}
function getUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const user = yield userService.getUserById(id);
            if (!user)
                return next(new apiError_1.ApiError('User not found', 404));
            res.status(200).json(user);
        }
        catch (err) {
            next(err);
        }
    });
}
/*export async function listUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const users = await userService.listUsers(limit, offset);
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
} */
function updateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const { error, value } = (0, userValidation_1.validateUser)(req.body);
            if (error)
                return next(new apiError_1.ApiError(error.details[0].message, 400));
            const updated = yield userService.updateUser(id, value);
            if (!updated)
                return next(new apiError_1.ApiError('User not found', 404));
            res.status(200).json({ message: 'User updated successfully' });
        }
        catch (err) {
            next(err);
        }
    });
}
function deleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const deleted = yield userService.deleteUser(id);
            if (!deleted)
                return next(new apiError_1.ApiError('User not found', 404));
            res.status(204).send();
        }
        catch (err) {
            next(err);
        }
    });
}
function joinGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = Number(req.params.id);
            const groupId = Number(req.params.groupId);
            yield userService.joinGroup(userId, groupId);
            res.status(200).json({ message: 'User joined group' });
        }
        catch (err) {
            next(err);
        }
    });
}
function leaveGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = Number(req.params.id);
            const groupId = Number(req.params.groupId);
            yield userService.leaveGroup(userId, groupId);
            res.status(200).json({ message: 'User left group' });
        }
        catch (err) {
            next(err);
        }
    });
}
