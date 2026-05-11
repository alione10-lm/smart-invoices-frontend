import express from 'express';
import { authMiddleware } from '../middlewares/authenticate.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { clientExist } from '../middlewares/errHandler.js'
import { clientSuppliers, listClient, clientInvoices, clientPayments } from '../controllers/admin.controller.js';

const router = express.Router();

router.use(authMiddleware)

router
  .get('/clients', isAdmin('admin'), listClient)
  .get('/clients/:id/suppliers', isAdmin('admin'), clientExist, clientSuppliers)
  .get('/clients/:id/invoices', isAdmin('admin'), clientExist, clientInvoices)
  .get('/clients/:id/payments', isAdmin('admin'), clientExist, clientPayments)


export default router