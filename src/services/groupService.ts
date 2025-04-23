import * as groupModel from '../models/groupModel';
import * as userModel from '../models/userModel';


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

export async function addUserToGroup(groupId: number, userId: number): Promise<boolean> {
  const group = await groupModel.getGroupById(groupId);
  const user = await userModel.getUserById(userId);

  if (!group || !user) {
    return false;
  }

  return groupModel.addUserToGroup(groupId, userId);
}

export async function removeUserFromGroup(groupId: number, userId: number): Promise<boolean> {
  const group = await groupModel.getGroupById(groupId);
  const user = await userModel.getUserById(userId);

  if (!group || !user) {
    return false;
  }

  return groupModel.removeUserFromGroup(groupId, userId);
}