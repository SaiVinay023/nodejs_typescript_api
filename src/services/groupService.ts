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
