import { createConnection } from 'mysql2/promise';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../config/config.js'; // Importar desde config.js

// Creamos una función para realizar la conexión a la base de datos
const database = async () => {
  try {
    const connection = await createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    console.log('Conexión a la base de datos exitosa');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Lanzamos el error para que pueda ser manejado por el llamador
  }
};

export { database };
