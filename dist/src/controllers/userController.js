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
exports.listUsersController = listUsersController;
exports.updateUser = updateUser;
exports.softDeleteUser = softDeleteUser;
exports.deleteUser = deleteUser;
const userService = __importStar(require("../services/userService"));
const userValidation_1 = require("../validations/userValidation");
const apiError_1 = require("../utils/apiError");
function createUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = (0, userValidation_1.validateUser)(req.body);
            if (error) {
                return next(new apiError_1.ApiError(error.details[0].message, 400));
            }
            const user = yield userService.createUser(value);
            res.status(201).json({
                id: user.id,
                name: user.name,
                surname: user.surname,
                birth_date: user.birth_date,
                sex: user.sex,
                message: 'User created successfully',
            });
        }
        catch (err) {
            next(err); // Pass to error handler middleware
        }
    });
}
// Get user by ID
function getUserById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            // Validate if ID is a valid number
            if (isNaN(id) || id <= 0) {
                return next(new apiError_1.ApiError('Invalid user ID', 400));
            }
            const user = yield userService.getUserById(id);
            // if (!user) return next(new ApiError('User not found', 404));  // Handle case where user does not exist
            if (!user)
                throw new Error('User not found');
            res.status(200).json(user);
        }
        catch (err) {
            next(err); // Pass any error to the global error handler
        }
    });
}
// List users with pagination
function listUsersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const limit = parseInt(req.query.limit, 10) || 10;
            const offset = parseInt(req.query.offset, 10) || 0;
            const result = yield userService.listUsers(limit, offset);
            res.status(200).json(result); // Includes { users, total, hasMore }
        }
        catch (err) {
            next(err);
        }
    });
}
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
function softDeleteUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            // Call service to perform soft delete
            const success = yield userService.softDeleteUser(id);
            if (!success) {
                return next(new apiError_1.ApiError('User not found for soft delete', 404));
            }
            res.status(200).json({ message: 'User soft-deleted successfully' });
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
            // Call service to perform hard delete
            const success = yield userService.deleteUser(id);
            if (!success) {
                return next(new apiError_1.ApiError('User not found for hard delete', 404));
            }
            res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (err) {
            next(err);
        }
    });
}
