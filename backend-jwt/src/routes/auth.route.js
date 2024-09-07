import { Router } from 'express';
import { register, login, getSession, logout } from '../controllers/auth.controller.js';
import validarJwt from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/session', validarJwt, getSession);
router.post('/logout', logout);

export default router;
