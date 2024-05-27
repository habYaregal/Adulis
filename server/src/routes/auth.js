import { Router } from "express";
import { getUsers, login, register} from "../controllers/auth.js";
import {validation} from '../validators/auth.js';
import {validationMiddleware} from '../middlewares/validations-middleware.js';

const router= Router();

router.get('/users',getUsers);
router.post('/register', validation.registerValidation ,validationMiddleware,register)
router.post('/login', validation.loginValidation ,validationMiddleware,login)

export const authRoutes = router