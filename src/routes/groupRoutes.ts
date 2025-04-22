import express from "express";
import { Router } from 'express';
import * as groupController from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.post('/', groupController.createGroup);
groupRouter.get('/', groupController.getAllGroups);
groupRouter.put('/:id', groupController.updateGroup);
groupRouter.delete('/:id', groupController.deleteGroup);

export default groupRouter;
