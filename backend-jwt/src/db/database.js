import { createConnection } from 'mysql2/promise';

// Creamos una función para realizar la conexión a la base de datos
const database = async () => {
  try {
    const connection = await createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'db_system',
    });

    console.log('Conexión a la base de datos exitosa');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error; // Lanzamos el error para que pueda ser manejado por el llamador
  }
};

export { database };
