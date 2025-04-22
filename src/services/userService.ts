import * as userModel from '../models/userModel';
import { ApiError } from '../utils/apiError';
import * as groupModel from '../models/groupModel'; // Correct import from groupModel


export function createUser(data: any) {
  return userModel.createUser(data);
}

export function getUserById(id: number) {
  return userModel.getUserById(id);
}

export async function listUsers(limit: number, offset: number) {

  return userModel.listUsers(limit, offset);

  // Validate inputs
 /* if (!Number.isInteger(limit) || limit <= 0) {
    throw new ApiError('Limit must be a positive integer', 400);
  }
  
  if (!Number.isInteger(offset) || offset < 0) {
    throw new ApiError('Offset must be a non-negative integer', 400);
  }

  try {
    return await userModel.listUsers(limit, offset);
  } catch (error) {
    throw new ApiError('Failed to fetch users', 500);
  } } */
}
export function updateUser(id: number, data: any) {
  return userModel.updateUser(id, data);
}

export function deleteUser(id: number) {
  return userModel.deleteUser(id);
}

export async function joinUserToGroup(userId: number, groupId: number) {
  return await groupModel.joinGroup(userId, groupId); // Call the function from groupModel
}

export async function leaveUserFromGroup(userId: number, groupId: number) {
  return await groupModel.leaveGroup(userId, groupId); // Call the function from groupModel
}