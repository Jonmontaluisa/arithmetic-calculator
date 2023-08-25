import { Router } from 'express';
import requestController from '../controllers/requestController';
import validator from '../middlewares/validator';

const router = Router();

router.get('/request-operation', validator.validateOperationsSchema, requestController.fulfillRequest);

export default router;
