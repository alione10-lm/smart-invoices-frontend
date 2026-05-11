import express from 'express';
import { authMiddleware } from '../middlewares/authenticate.js'
import { verifySupplierOwnership } from '../middlewares/isOwner.js'
import { stats } from '../controllers/stats.controller.js';

const router = express.Router();

router.use(authMiddleware)

router.get('/suppliers/:id/stats', verifySupplierOwnership, stats)


export default router