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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGroup = createGroup;
exports.getAllGroups = getAllGroups;
exports.getGroupById = getGroupById;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
exports.joinGroup = joinGroup;
exports.leaveGroup = leaveGroup;
const groupModel = __importStar(require("../models/groupModel"));
function createGroup(name) {
    return groupModel.createGroup(name);
}
function getAllGroups() {
    return groupModel.getAllGroups();
}
function getGroupById(id) {
    return groupModel.getGroupById(id);
}
function updateGroup(id, name) {
    return groupModel.updateGroup(id, name);
}
function deleteGroup(id) {
    return groupModel.deleteGroup(id);
}
function joinGroup(userId, groupId) {
    return groupModel.joinGroup(userId, groupId);
}
function leaveGroup(userId, groupId) {
    return groupModel.leaveGroup(userId, groupId);
}
