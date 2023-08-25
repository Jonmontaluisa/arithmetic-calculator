import { Router } from 'express';
import operationsController from '../controllers/operationsController';

const router = Router();

router.get('/operations', operationsController.getOperations);
router.post('/operations', operationsController.createOperation);

export default router;
