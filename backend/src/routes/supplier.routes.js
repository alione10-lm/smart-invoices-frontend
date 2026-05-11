import express from 'express';
import { createSupplier, deleteSupplier, getAllSupplier, getSupplierById, updateSupplier } from '../controllers/supplier.controller.js';
import { supllierExist } from '../middlewares/errHandler.js';
import { verifySupplierOwnership } from '../middlewares/isOwner.js';
import { authMiddleware } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { createSupplierSchema, updateSupplierSchema } from '../validators/validators.js';


const router = express.Router();

router.use(authMiddleware)

router
   .get('/:id', verifySupplierOwnership, getSupplierById)
   .get('/', getAllSupplier)
   .post('/', supllierExist, validateBody(createSupplierSchema),createSupplier)
   .put('/:id', verifySupplierOwnership, validateBody(updateSupplierSchema), updateSupplier)
   .delete('/:id', verifySupplierOwnership, deleteSupplier)

export default router