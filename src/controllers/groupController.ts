import { Request, Response, NextFunction } from 'express';
import * as groupService from '../services/groupService';
import { ApiError } from '../utils/apiError';

export async function createGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;
    if (!name) return next(new ApiError('Group name is required', 400));
    const result = await groupService.createGroup(name);
    res.status(201).json({ id: result.insertId, message: 'Group created successfully' });
  } catch (err) {
    next(err);
  }
}

export async function getAllGroups(req: Request, res: Response, next: NextFunction) {
  try {
    const groups = await groupService.getAllGroups();
    res.status(200).json(groups);
  } catch (err) {
    next(err);
  }
}

export async function updateGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const result = await groupService.updateGroup(id, name);
    res.status(200).json({ message: 'Group updated successfully', result });
  } catch (err) {
    next(err);
  }
}

export async function deleteGroup(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const result = await groupService.deleteGroup(id);
    res.status(200).json({ message: 'Group deleted successfully', result });
  } catch (err) {
    next(err);
  }
}
