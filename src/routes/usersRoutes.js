import { Router } from 'express';
import usersController from '../controllers/usersController';

const router = Router();

router.get('/users', usersController.getUsers);
router.post('/users', usersController.createUser);

export default router;
