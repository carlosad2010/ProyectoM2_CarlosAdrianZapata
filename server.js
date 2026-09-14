import { loadEnvFile } from 'node:process';
import express from 'express';
import authorsRouter from './routes/authors.js';
import postsRouter from './routes/posts.js';

import  swaggerUi from 'swagger-ui-express';
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/openapi.yaml');

if (process.env.NODE_ENV !== 'production') {
  loadEnvFile('.env');
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rutas
 app.use('/api/authors', authorsRouter);
 app.use('/api/posts', postsRouter);
 app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog API',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts'
    }
  });
});

app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  
  // Error de PostgreSQL
  if (err.code) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Registro duplicado' });
    }
    if (err.code === '23503') {
      return res.status(409).json({ error: 'Violación de relación entre tablas' });
    }
    if (err.code === '23502') {
      return res.status(400).json({ error: 'Campo requerido faltante' });
    }
    
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'El cuerpo de la petición no contiene JSON válido'
    });
  }

  }
  
  res.status(500).json({ error: 'Error interno del servidor' });
});



// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

