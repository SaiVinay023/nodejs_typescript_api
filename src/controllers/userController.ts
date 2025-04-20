import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { validateUser } from '../validations/userValidation';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { error, value } = validateUser(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const result = await userService.createUser(value);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
}

export async function listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await userService.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { error, value } = validateUser(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const updated = await userService.updateUser(Number(req.params.id), value);
    if (!updated) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deleted = await userService.deleteUser(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
