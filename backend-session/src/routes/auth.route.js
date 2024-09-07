import express from 'express';
import { login, getSession, logout } from '../controllers/auth.controller.js';

const router = express.Router();

// Definir rutas y conectar con los controladores
router.post('/login', login);
router.get('/session', getSession);
router.post('/logout', logout);

export { router };
