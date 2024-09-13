import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { PORT, SECRET_KEY } from './config/config.js'; // Importar las variables del archivo config.js
import router from './routes/auth.route.js';
import { getSession } from './controllers/auth.controller.js';
import authMiddleware from './middlewares/authMiddleware.js'; // Ajusta la ruta a tu middleware

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Ruta protegida con autenticación
app.get('/session', authMiddleware, getSession);

app.use('/api', router);

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
