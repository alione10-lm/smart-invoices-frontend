import express from 'express';
import { authMiddleware } from '../middlewares/authenticate.js'
import { verifyIvoiceOwnership } from '../middlewares/isOwner.js';
import { listPayment, recordPayment } from '../controllers/payment.controller.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { recordPaymentSchema } from '../validators/validators.js';

const router =  express.Router();

router.use(authMiddleware);

router
  .get('/:id/payments', verifyIvoiceOwnership, listPayment)
  .post('/:id/payments', verifyIvoiceOwnership, validateBody(recordPaymentSchema), recordPayment)



export default router