import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || 'db_system';
export const SECRET_KEY = process.env.SECRET_KEY || 'tu-clave-secreta';
