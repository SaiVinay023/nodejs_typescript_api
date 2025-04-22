import express from "express";
import { Router } from 'express';
import * as groupController from '../controllers/groupController';

const router = express.Router();

router.post('/', groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.put('/:id', groupController.updateGroup);
router.delete('/:id', groupController.deleteGroup);

export default router;
