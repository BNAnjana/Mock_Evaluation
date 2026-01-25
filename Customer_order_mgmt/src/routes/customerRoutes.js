import { Router } from 'express';
import { registerCustomer, deleteCustomer } from './controllers/customerController.js';

const router = Router();

router.post('/register', registerCustomer);
router.delete('/delete/:customerId', deleteCustomer);

export default router;