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
exports.createGroup = createGroup;
exports.getAllGroups = getAllGroups;
exports.getGroupById = getGroupById;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
const groupService = __importStar(require("../services/groupService")); // Importing the service functions
const apiError_1 = require("../utils/apiError"); // Error handling utility
// Controller for creating a new group
function createGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body; // Extract group name from request body
            if (!name)
                return next(new apiError_1.ApiError('Group name is required', 400)); // Ensure name is provided
            const group = yield groupService.createGroup(name); // Call service to create group
            res.status(201).json({
                message: 'Group created successfully',
                group, // Include created group in response
            });
        }
        catch (err) {
            next(err); // Pass any errors to the error handler
        }
    });
}
// Controller for getting all groups
function getAllGroups(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groups = yield groupService.getAllGroups(); // Call service to get all groups
            res.status(200).json(groups); // Return the list of groups
        }
        catch (err) {
            next(err); // Pass errors to the error handler
        }
    });
}
// Controller for getting a group by ID
function getGroupById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupId = parseInt(req.params.id); // Extract ID from request parameters
            const group = yield groupService.getGroupById(groupId); // Call service to get group by ID
            if (!group)
                return next(new apiError_1.ApiError('Group not found', 404)); // Return error if group is not found
            res.status(200).json(group); // Return the group data
        }
        catch (err) {
            next(err); // Pass errors to the error handler
        }
    });
}
// Controller for updating a group
function updateGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupId = parseInt(req.params.id); // Extract ID from request parameters
            const { name } = req.body; // Extract group name from request body
            if (!name)
                return next(new apiError_1.ApiError('Group name is required', 400)); // Ensure name is provided
            const updatedGroup = yield groupService.updateGroup(groupId, name); // Call service to update group
            res.status(200).json({
                message: 'Group updated successfully',
                group: updatedGroup, // Return updated group in the response
            });
        }
        catch (err) {
            next(err); // Pass errors to the error handler
        }
    });
}
// Controller for deleting a group
function deleteGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const groupId = parseInt(req.params.id); // Extract ID from request parameters
            const result = yield groupService.deleteGroup(groupId); // Call service to delete group
            res.status(200).json(result); // Return success message
        }
        catch (err) {
            next(err); // Pass errors to the error handler
        }
    });
}
function joinGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, groupId } = req.params;
        try {
            const success = yield groupService.joinGroup(Number(userId), Number(groupId));
            if (success) {
                res.status(200).json({ message: 'User successfully joined the group.' });
            }
            else {
                res.status(400).json({ message: 'User is already in the group.' });
            }
        }
        catch (error) {
            console.error('Error joining group:', error);
            res.status(500).json({ message: 'Failed to join group' });
        }
    });
}
// Leave a group
function leaveGroup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, groupId } = req.params;
        try {
            const success = yield groupService.leaveGroup(Number(userId), Number(groupId));
            if (success) {
                res.status(200).json({ message: 'User successfully left the group.' });
            }
            else {
                res.status(400).json({ message: 'User is not in the group.' });
            }
        }
        catch (error) {
            console.error('Error leaving group:', error);
            res.status(500).json({ message: 'Failed to leave group' });
        }
    });
}
