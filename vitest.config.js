import { defineConfig } from 'vitest/config';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Los tests comparten una sola base de datos: en paralelo se truncan
    // las tablas entre sí y rompen las claves foráneas.
    fileParallelism: false,
  },
});
