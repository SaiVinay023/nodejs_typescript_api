import * as groupModel from '../models/groupModel';

export function createGroup(name: string) {
  return groupModel.createGroup(name);
}

export function getAllGroups() {
  return groupModel.getAllGroups();
}

export function getGroupById(id: number) {
  return groupModel.getGroupById(id);
}

export function updateGroup(id: number, name: string) {
  return groupModel.updateGroup(id, name);
}

export function deleteGroup(id: number) {
  return groupModel.deleteGroup(id);
}

export function joinGroup(userId: number, groupId: number) {
  return groupModel.joinGroup(userId, groupId);
}

export function leaveGroup(userId: number, groupId: number) {
  return groupModel.leaveGroup(userId, groupId);
}
