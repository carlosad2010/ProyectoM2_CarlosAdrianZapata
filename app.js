import express from "express";
import router from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

const swaggerDocument = YAML.load("./docs/openapi.yaml");

// Middleware
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

// Manejo de 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});


app.use(errorHandler);

export default app;