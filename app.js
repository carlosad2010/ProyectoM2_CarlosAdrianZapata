import express from "express";
import router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const swaggerDocument = YAML.load("./docs/openapi.yaml");

// Middleware
app.use(express.json());

// Documentación OpenAPI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ruta raíz - Información de la API
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Blog API - REST API de Gestión de Autores y Posts',
    version: '1.0.0',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts',
      documentation: '/api-docs'
    }
  });
});

// Rutas de la API
app.use(router);

// Manejo de 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handling middleware (debe ser el último)


app.use(errorHandler);

export default app;