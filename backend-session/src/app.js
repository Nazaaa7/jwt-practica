import express from 'express';
import cors from 'cors';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';
import { router } from '../src/routes/auth.route.js'; // Importar el archivo de rutas

const app = express();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve();



// Middlewares 
app.use(cors({
    origin: [
        'http://localhost:5500', // o el dominio de tu frontend
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false, // true solo si usas HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}));


// Montar las rutas
app.use('/api', router);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));
