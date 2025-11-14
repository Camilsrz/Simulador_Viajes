import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Neon requiere SSL
});

// Probar conexión al iniciar
pool.connect()
  .then(() => console.log('conectado a Neon PostgreSQL'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

