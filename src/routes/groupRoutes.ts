import express from "express";
import { Router } from 'express';
import * as groupController from '../controllers/groupController';

const router = express.Router();

router.post('/', groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);
router.delete('/:userId/groups/:groupId', groupController.leaveGroup);
router.post('/:userId/groups/:groupId', groupController.joinGroup);


export default router;
