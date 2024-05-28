import { Router } from "express";
import { getUsers, login, logout, protect, register} from "../controllers/auth.js";
import {validation} from '../validators/auth.js';
import {validationMiddleware} from '../middlewares/validations-middleware.js';
import {userAuth} from "../middlewares/auth-middleware.js";

const router= Router();

router.get('/users',getUsers);
router.post('/register', validation.registerValidation ,validationMiddleware,register)
router.post('/login', validation.loginValidation ,validationMiddleware,login)
router.get('/protected',userAuth)
router.get('/logout',logout)

export const authRoutes = router