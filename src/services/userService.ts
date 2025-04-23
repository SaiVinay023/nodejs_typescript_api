import * as userModel from '../models/userModel';
import * as groupModel from '../models/groupModel'; 
import { UserData } from '../models/userModel'; 

export function createUser(data: Omit<UserData, 'id'>): Promise<UserData> {
  return userModel.createUser(data); 
}

export function getUserById(id: number) {
  return userModel.getUserById(id);
}

export async function listUsers(limit: number | undefined, offset: number | undefined): Promise<{ users: UserData[], total: number, hasMore: boolean }> {
  return userModel.listUsers(limit, offset);  
}
export function updateUser(id: number, data: any) {
  return userModel.updateUser(id, data);
}

 export async function softDeleteUser(id: number): Promise<boolean> {
  return userModel.softDeleteUser(id);  
} 

export function deleteUser(id: number): Promise<boolean> {
  return userModel.deleteUser(id);  
}
