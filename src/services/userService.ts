import * as userModel from '../models/userModel';
import * as groupModel from '../models/groupModel'; // Correct import from groupModel
import { UserData } from '../models/userModel'; // Correct import for UserData type

export function createUser(data: Omit<UserData, 'id'>): Promise<UserData> {
  return userModel.createUser(data);  // Pass the user data to the model
}

export function getUserById(id: number) {
  return userModel.getUserById(id);
}

export async function listUsers(limit: number | undefined, offset: number | undefined): Promise<{ users: UserData[], total: number, hasMore: boolean }> {
  return userModel.listUsers(limit, offset);  // Pass limit and offset to the model
}
export function updateUser(id: number, data: any) {
  return userModel.updateUser(id, data);
}

 export async function softDeleteUser(id: number): Promise<boolean> {
  return userModel.softDeleteUser(id);  // Call to model for soft delete
} 

export function deleteUser(id: number): Promise<boolean> {
  return userModel.deleteUser(id);  // Call to model for hard delete
}
