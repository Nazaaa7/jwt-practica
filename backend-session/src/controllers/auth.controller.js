import { connectDB } from '../db/database.js'

// Controlador para manejar el inicio de sesión
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

        if (rows.length > 0) {
            const user = rows[0];
            req.session.userId = user.id;
            return res.json({ message: 'Inicio de sesión exitoso' });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error('Error al conectarse a la base de datos:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};


// Controlador para obtener los datos de la sesión
export const getSession = (req, res) => {
    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
};

// Controlador para cerrar la sesión
export const logout = (req, res) => {
    console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
};
