import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUser);
router.get('/:userId', userControllers.getUser);
router.put('/:userId', userControllers.updateUser);
router.delete('/:userId', userControllers.updateUser);

export const userRoutes = router;