import { Request, Response, NextFunction } from 'express';
import * as groupService from '../services/groupService'; 

import { ApiError } from '../utils/apiError';  

export async function createGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;  
    if (!name) return next(new ApiError('Group name is required', 400));  

    const group = await groupService.createGroup(name);  
    res.status(201).json({
      message: 'Group created successfully',
      group, 
    });
  } catch (err) {
    next(err); 
  }
}

export async function getAllGroups(req: Request, res: Response, next: NextFunction) {
  try {
    const groups = await groupService.getAllGroups();  // Call service to get all groups
    res.status(200).json(groups);  // Return the list of groups
  } catch (err) {
    next(err); 
  }
}

export async function getGroupById(req: Request, res: Response, next: NextFunction) {
  try {
    const groupId = parseInt(req.params.id);  
    const group = await groupService.getGroupById(groupId);  
    
    if (!group) return next(new ApiError('Group not found', 404));  

    res.status(200).json(group);  
  } catch (err) {
    next(err);  
  }
}

export async function updateGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const groupId = parseInt(req.params.id);  
    const { name } = req.body;  
    
    if (!name) return next(new ApiError('Group name is required', 400));  

    const updatedGroup = await groupService.updateGroup(groupId, name); 
    res.status(200).json({
      message: 'Group updated successfully',
      group: updatedGroup, 
    });
  } catch (err) {
    next(err);  
  }
}

export async function deleteGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const groupId = parseInt(req.params.id);  
    const result = await groupService.deleteGroup(groupId);  
    
    res.status(200).json(result); 
  } catch (err) {
    next(err); 
  }
}

export async function joinGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseInt(req.params.userId, 10);
    const groupId = parseInt(req.params.groupId, 10);

    const result = await groupService.addUserToGroup(groupId, userId);
    if (result) {
      res.status(200).json({ message: 'User successfully joined the group' });
    } else {
      res.status(400).json({ message: 'User or Group not found' });
    }
  } catch (err) {
    next(err);
  }
}

export async function leaveGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseInt(req.params.userId, 10);
    const groupId = parseInt(req.params.groupId, 10);

    const result = await groupService.removeUserFromGroup(groupId, userId);
    if (result) {
      res.status(200).json({ message: 'User successfully left the group' });
    } else {
      res.status(400).json({ message: 'User or Group not found' });
    }
  } catch (err) {
    next(err);
  }
}