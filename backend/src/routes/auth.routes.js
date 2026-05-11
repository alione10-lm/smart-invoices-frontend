import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../validators/validators.js';
import { userExist } from '../middlewares/errHandler.js';



const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), userExist, login);



export default router