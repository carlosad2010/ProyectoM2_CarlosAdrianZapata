import { Pool } from "pg";

export const pool= new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
 });
 
// Sin este listener, un error de conexión en un cliente inactivo del pool
// (p. ej. el proxy público de Railway cerrando el socket) se convierte en una
// excepción no capturada que tumba todo el proceso de Node.
pool.on('error', (err) => {
  console.error('Error inesperado en cliente inactivo del pool:', err);
});

export default pool;