import * as userModel from '../models/userModel';

export function createUser(data: any) {
  return userModel.createUser(data);
}

export function getUserById(id: number) {
  return userModel.getUserById(id);
}

export function listUsers() {
  return userModel.listUsers();
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