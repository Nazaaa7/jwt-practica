import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env.js';
import { database } from '../db/database.js';

// Middleware para verificar el token JWT
export default async (req, res, next) => {
    console.log(req.session);
    console.log('-----------');
    console.log(req.cookies);

    const token = req.cookies.authToken || req.session.token;

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        // Verifica el token y decodifica la información
        const decoded = jwt.verify(token, SECRET_KEY);

        // Obtén el usuario de la base de datos usando el userId del token
        const connection = await database();
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [decoded.userId]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const user = rows[0];

        req.user = user; // Agrega la información del usuario decodificada al request

        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ message: 'Token inválido' });
    }
};
