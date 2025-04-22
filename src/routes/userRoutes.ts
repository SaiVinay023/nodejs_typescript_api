import express from "express";
import { Router } from 'express';
import * as userController from '../controllers/userController';

const userRouter = express.Router();


userRouter.post('/', userController.createUser);
userRouter.get('/:id', userController.getUserById);
userRouter.get("/list", userController.listUsersController);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);
userRouter.post('/join', userController.joinGroup);
userRouter.post('/leave', userController.leaveGroup);
export default userRouter;
