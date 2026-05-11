import express from 'express';
import { createInvoice, deleteInvoice, getInvoiceById, listInvoice, updateInvoice } from '../controllers/invoice.controller.js';
import { authMiddleware } from '../middlewares/authenticate.js'
import { verifyIvoiceOwnership } from '../middlewares/isOwner.js';
import { createInvoiceSchema, updateInvoiceSchema } from '../validators/validators.js';
import { validateBody } from '../middlewares/validateRequest.js'

const router = express.Router();

router.use(authMiddleware)

router
   .get('/:id', verifyIvoiceOwnership, getInvoiceById)
   .get('/', listInvoice)
   .post('/', validateBody(createInvoiceSchema), createInvoice)
   .put('/:id', validateBody(updateInvoiceSchema), verifyIvoiceOwnership, updateInvoice)
   .delete('/:id', verifyIvoiceOwnership, deleteInvoice)



export default router