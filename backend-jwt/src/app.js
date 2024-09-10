import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { PORT, SECRET_KEY } from './config/config.js'; // Importar las variables del archivo config.js
import authRoutes from './routes/auth.route.js';
import router from './routes/auth.route.js';
import { getSession } from './controllers/auth.controller.js';


const app = express();

app.get('/session', getSession);
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
    cookie: { secure: true } 
}));

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
