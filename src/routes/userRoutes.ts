import express from "express";
import { Router } from 'express';
import * as userController from '../controllers/userController';
import { asyncHandler } from '../utils/asyncHandler';
const userRouter = express.Router();


userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUserById);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
//userRouter.get('/', userController.listUsersController);
userRouter.get('/', asyncHandler(userController.listUsersController));
userRouter.get('/', asyncHandler(userController.listUsersController));
userRouter.get('/', asyncHandler(userController.listUsersController));

userRouter.put('/:id/soft', userController.softDeleteUser); 
export default userRouter;
