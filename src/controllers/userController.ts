import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { validateUser } from '../validations/userValidation';
import { ApiError } from '../utils/apiError';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error, value } = validateUser(req.body);
    if (error) return next(new ApiError(error.details[0].message, 400));

    const result = await userService.createUser(value);
    res.status(201).json({ id: result.insertId, message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);

    if (!user) return next(new ApiError('User not found', 404));
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse with defaults
      const limit = Math.min(parseInt(req.query.limit as string) || 5, 100); // Max 100 items
      const offset = parseInt(req.query.offset as string) || 0;
  
      const result = await userService.listUsers(limit, offset);
      
      res.status(200).json({
        success: true,
        data: result.users,
        pagination: {
          limit,
          offset,
          total: result.total,
          hasMore: result.hasMore
        }
      });
    } catch (error) {
      next(error);
    }
  }

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { error, value } = validateUser(req.body);
    if (error) return next(new ApiError(error.details[0].message, 400));

    const updated = await userService.updateUser(id, value);
    if (!updated) return next(new ApiError('User not found', 404));

    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const deleted = await userService.deleteUser(id);

    if (!deleted) return next(new ApiError('User not found', 404));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export async function joinGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const groupId = Number(req.params.groupId);
      await userService.joinGroup(userId, groupId);
  
      res.status(200).json({ message: 'User joined group' });
    } catch (err) {
      next(err);
    }
  }
  
  export async function leaveGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.id);
      const groupId = Number(req.params.groupId);
      await userService.leaveGroup(userId, groupId);
  
      res.status(200).json({ message: 'User left group' });
    } catch (err) {
      next(err);
    }
  }
  