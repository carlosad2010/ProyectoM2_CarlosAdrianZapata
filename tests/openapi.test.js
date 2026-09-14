import { describe, test, expect } from "vitest";
import YAML from "yamljs";

describe("OpenAPI Documentation", () => {
  let swaggerDocument;

  // Cargar el documento antes de los tests
  beforeAll(async () => {
    swaggerDocument = YAML.load("./docs/openapi.yaml");
  });

  test("El archivo YAML debe ser válido y cargable", async () => {
    expect(swaggerDocument).toBeDefined();
    expect(swaggerDocument.openapi).toBeDefined();
  });

  test("Debe tener la información básica correcta", () => {
    expect(swaggerDocument.info.title).toBe("Blog API");
    expect(swaggerDocument.info.version).toBe("1.0.0");
    expect(swaggerDocument.info.description).toBeDefined();
  });

  test("Debe tener servidores configurados", () => {
    expect(swaggerDocument.servers).toBeDefined();
    expect(swaggerDocument.servers.length).toBeGreaterThan(0);
  });

  test("Debe tener todas las rutas de autores", () => {
    const paths = Object.keys(swaggerDocument.paths);
    expect(paths).toContain("/api/authors");
    expect(paths).toContain("/api/authors/{id}");
  });

  test("Debe tener todas las rutas de posts", () => {
    const paths = Object.keys(swaggerDocument.paths);
    expect(paths).toContain("/api/posts");
    expect(paths).toContain("/api/posts/{id}");
  });

  test("GET /api/authors debe estar documentado", () => {
    const authorsPath = swaggerDocument.paths["/api/authors"];
    expect(authorsPath.get).toBeDefined();
    expect(authorsPath.get.summary).toBeDefined();
    expect(authorsPath.get.tags).toContain("Autores");
  });

  test("POST /api/authors debe estar documentado", () => {
    const authorsPath = swaggerDocument.paths["/api/authors"];
    expect(authorsPath.post).toBeDefined();
    expect(authorsPath.post.requestBody).toBeDefined();
  });

  test("PUT /api/authors/{id} debe estar documentado", () => {
    const authorPath = swaggerDocument.paths["/api/authors/{id}"];
    expect(authorPath.put).toBeDefined();
    expect(authorPath.put.parameters).toBeDefined();
  });

  test("DELETE /api/authors/{id} debe estar documentado", () => {
    const authorPath = swaggerDocument.paths["/api/authors/{id}"];
    expect(authorPath.delete).toBeDefined();
  });

  test("GET /api/posts debe estar documentado", () => {
    const postsPath = swaggerDocument.paths["/api/posts"];
    expect(postsPath.get).toBeDefined();
    expect(postsPath.get.tags).toContain("Posts");
  });

  test("POST /api/posts debe estar documentado", () => {
    const postsPath = swaggerDocument.paths["/api/posts"];
    expect(postsPath.post).toBeDefined();
    expect(postsPath.post.requestBody).toBeDefined();
  });

  test("Debe tener esquema de Author", () => {
    const schemas = swaggerDocument.components.schemas;
    expect(schemas.Author).toBeDefined();
    expect(schemas.Author.properties.id).toBeDefined();
    expect(schemas.Author.properties.name).toBeDefined();
    expect(schemas.Author.properties.email).toBeDefined();
  });

  test("Debe tener esquema de Post", () => {
    const schemas = swaggerDocument.components.schemas;
    expect(schemas.Post).toBeDefined();
    expect(schemas.Post.properties.id).toBeDefined();
    expect(schemas.Post.properties.title).toBeDefined();
    expect(schemas.Post.properties.content).toBeDefined();
  });

  test("Debe tener esquema de Error", () => {
    const schemas = swaggerDocument.components.schemas;
    expect(schemas.Error).toBeDefined();
    expect(schemas.Error.properties.error).toBeDefined();
  });

  test("Los endpoints deben tener respuestas documentadas", () => {
    const authorsGet = swaggerDocument.paths["/api/authors"].get;
    expect(authorsGet.responses["200"]).toBeDefined();
    expect(authorsGet.responses["500"]).toBeDefined();
  });
});
