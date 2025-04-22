import { Request, Response, NextFunction } from 'express';
import * as groupService from '../services/groupService';  // Importing the service functions
import { ApiError } from '../utils/apiError';  // Error handling utility

// Controller for creating a new group
export async function createGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;  // Extract group name from request body
    if (!name) return next(new ApiError('Group name is required', 400));  // Ensure name is provided

    const group = await groupService.createGroup(name);  // Call service to create group
    res.status(201).json({
      message: 'Group created successfully',
      group,  // Include created group in response
    });
  } catch (err) {
    next(err);  // Pass any errors to the error handler
  }
}

// Controller for getting all groups
export async function getAllGroups(req: Request, res: Response, next: NextFunction) {
  try {
    const groups = await groupService.getAllGroups();  // Call service to get all groups
    res.status(200).json(groups);  // Return the list of groups
  } catch (err) {
    next(err);  // Pass errors to the error handler
  }
}

// Controller for getting a group by ID
export async function getGroupById(req: Request, res: Response, next: NextFunction) {
  try {
    const groupId = parseInt(req.params.id);  // Extract ID from request parameters
    const group = await groupService.getGroupById(groupId);  // Call service to get group by ID
    
    if (!group) return next(new ApiError('Group not found', 404));  // Return error if group is not found

    res.status(200).json(group);  // Return the group data
  } catch (err) {
    next(err);  // Pass errors to the error handler
  }
}

// Controller for updating a group
export async function updateGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const groupId = parseInt(req.params.id);  // Extract ID from request parameters
    const { name } = req.body;  // Extract group name from request body
    
    if (!name) return next(new ApiError('Group name is required', 400));  // Ensure name is provided

    const updatedGroup = await groupService.updateGroup(groupId, name);  // Call service to update group
    res.status(200).json({
      message: 'Group updated successfully',
      group: updatedGroup,  // Return updated group in the response
    });
  } catch (err) {
    next(err);  // Pass errors to the error handler
  }
}

// Controller for deleting a group
export async function deleteGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const groupId = parseInt(req.params.id);  // Extract ID from request parameters
    const result = await groupService.deleteGroup(groupId);  // Call service to delete group
    
    res.status(200).json(result);  // Return success message
  } catch (err) {
    next(err);  // Pass errors to the error handler
  }
}
