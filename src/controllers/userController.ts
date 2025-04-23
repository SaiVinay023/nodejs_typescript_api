import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { validateUser } from '../validations/userValidation';
import { ApiError } from '../utils/apiError';


export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { error, value } = validateUser(req.body);
    if (error) {
      return next(new ApiError(error.details[0].message, 400));
    }

    const user = await userService.createUser(value);

    res.status(201).json({
      id: user.id,
      name: user.name,
      surname: user.surname,
      birth_date: user.birth_date,
      sex: user.sex,
      message: 'User created successfully',
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return next(new ApiError('Invalid user ID', 400));
    }

    const user = await userService.getUserById(id);

   if (!user) throw new Error('User not found');

    res.status(200).json(user);
  } catch (err) {
    next(err);  
  }
}

// Get all users with pagination
  export async function listUsersController(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = req.query;
  
      const limitValue = limit ? parseInt(limit as string, 10) : undefined;
      const offsetValue = offset ? parseInt(offset as string, 10) : undefined;
  
      const result = await userService.listUsers(limitValue, offsetValue);
      res.status(200).json(result); 
    } catch (err) {
      next(err); 
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

  

export async function softDeleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);

    // Call service to perform soft delete
    const success = await userService.softDeleteUser(id);
    if (!success) {
      return next(new ApiError('User not found for soft delete', 404));
    }

    res.status(200).json({ message: 'User soft-deleted successfully' });
  } catch (err) {
    next(err);
  }
} 

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const success = await userService.deleteUser(id);
    if (!success) {
      return next(new ApiError('User not found for hard delete', 404));
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}

