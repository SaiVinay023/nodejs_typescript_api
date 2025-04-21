import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
//router.get('/', userController.listUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/join', userController.joinGroup);
router.post('/leave', userController.leaveGroup);
export default router;