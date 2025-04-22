import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { validateUser } from '../validations/userValidation';
import { ApiError } from '../utils/apiError';
import { query } from '../db/query'; // Assuming you have a db module for querying the database
import { listUsers } from "../models/userModel";

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

/*export async function listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // Parse with defaults
      const limit = parseInt(req.query.limit as string, 10) || 10;
        const offset = parseInt(req.query.offset as string, 10) || 0;
      //const result = await userService.listUsers(limit, offset);
      const result = await userService.listUsers(limit, offset);
        if (result.hasMore) {
          
            res.set('Link', `<${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?limit=${limit}&offset=${offset + limit}>; r}el="next"`);        
        }res.status(200).json(result);
     /* res.status(200).json({
        success: true,
        data: result.users,
        pagination: {
          limit,
          offset,
          total: result.total,
          hasMore: result.hasMore
        }
      })*/
      

        
        
        
       
        export async function listUsersController(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
              const limit = Math.min(parseInt(req.query.limit as string, 10) || 10, 100);  // max limit of 100
              const offset = Math.max(parseInt(req.query.offset as string, 10) || 0, 0);  // ensure offset is at least 0

          
              const { users, total, hasMore } = await userService.listUsers(limit, offset);
          
              res.status(200).json({
                success: true,
                data: users,
                pagination: { total, hasMore, limit, offset },
                message: users.length === 0 ? "No users found" : undefined
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

