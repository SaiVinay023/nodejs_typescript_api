import * as userModel from '../models/userModel';
import { ApiError } from '../utils/apiError';

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

export function joinGroup(userId: number, groupId: number) {
    return userModel.joinGroup(userId, groupId);
  }
  
  export function leaveGroup(userId: number, groupId: number) {
    return userModel.leaveGroup(userId, groupId);
  }