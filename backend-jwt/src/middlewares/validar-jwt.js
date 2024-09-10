import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/config.js';
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
        const decoded = jwt.verify(token, SECRET_KEY);
        const connection = await database();
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [decoded.userId]);
    
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    
        req.user = rows[0]; // Agrega la información del usuario al request
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ message: 'Token inválido' });
    }
}    