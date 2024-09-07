import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { database } from '../db/database.js';
import generarJwt from '../helpers/generar-jwt.js';
import { SECRET_KEY } from '../config/env.js';

export const register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        const connection = await database();
        
        // Verificar si el usuario ya existe
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE username = ?', 
            [username]
        );

        if (rows.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario
        const [result] = await connection.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)', 
            [username, hashedPassword]
        );

        return res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        return res.status(500).json({ message: 'Error inesperado', error: error.message });
    }
};
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await database();
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = await generarJwt(user.id);

        // Almacenar el token en la sesión del servidor
        req.session.token = token;

        // Almacenar el token en una cookie segura
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: false, // Cambiar a true en producción con HTTPS
            maxAge: 14400000 // Expiración en milisegundos (4 horas)
        });

        return res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error inesperado' });
    }
};


export const getSession = (req, res) => {
    try {
        return res.json({ message: 'Acceso permitido a área protegida', user: req.user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error inesperado' });
    }
};

export const logout = (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar sesión' });
            }

            res.clearCookie('authToken');
            return res.json({ message: 'Cierre de sesión exitoso' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error inesperado' });
    }
};
