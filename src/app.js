import express from "express";
import router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const swaggerDocument = YAML.load("./docs/openapi.yaml");

// Middleware
app.use(express.json());

// Swagger UI lista las operaciones en el orden en que aparecen en el YAML, donde
// cada ruta agrupa sus propios métodos. Este comparador las reordena por verbo
// dentro de cada tag: GET, POST, PUT y por último DELETE.
const swaggerOptions = {
  swaggerOptions: {
    operationsSorter: (a, b) => {
      const orden = { get: 1, post: 2, put: 3, patch: 4, delete: 5 };
      const porVerbo = orden[a.get("method")] - orden[b.get("method")];
      return porVerbo !== 0 ? porVerbo : a.get("path").localeCompare(b.get("path"));
    },
  },
};

// Documentación OpenAPI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

// Ruta raíz - Información de la API
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Blog API - REST API de Gestión de Autores y Posts',
    version: '1.0.0',
    endpoints: {
      authors: '/api/authors',
      posts: '/api/posts',
      comments: '/api/comments',
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