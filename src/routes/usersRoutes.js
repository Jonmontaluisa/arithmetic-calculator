import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUser);
// router.get('/users/:id', usersController.getUserById);

export default router;
