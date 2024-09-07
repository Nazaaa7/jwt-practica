import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' }); // Carga el archivo .env.development

export const SECRET_KEY = process.env.SECRET_KEY; // Exporta SECRET_KEY
export const PORT = process.env.PORT || 4000;