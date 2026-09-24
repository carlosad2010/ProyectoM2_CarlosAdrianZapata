import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db/config.js";

beforeEach(async () => {
  // Truncar authors en cascada limpia posts y comments de una vez
  await pool.query("TRUNCATE authors RESTART IDENTITY CASCADE");

  await pool.query(`
    INSERT INTO authors (name, email, bio) VALUES
    ('Juan García', 'juan@example.com', 'Autor de prueba 1'),
    ('María López', 'maria@example.com', 'Autor de prueba 2'),
    ('Carlos Ruiz', 'carlos@example.com', 'Autor de prueba 3');
  `);

  await pool.query(`
    INSERT INTO posts (title, content, author_id, published) VALUES
    ('Post de Node.js', 'Contenido sobre Node.js', 1, true),
    ('Post de PostgreSQL', 'Contenido sobre PostgreSQL', 2, true),
    ('Post de APIs', 'Contenido sobre APIs REST', 3, true),
    ('Post sin comentarios', 'Contenido sin comentarios', 1, true);
  `);

  await pool.query(`
    INSERT INTO comments (content, post_id, commenter_name, commenter_email) VALUES
    ('Excelente post', 1, 'Juan Pérez', 'juan@example.com'),
    ('Muy útil', 1, 'María García', 'maria@example.com'),
    ('Gracias por compartir', 2, 'Ana Martínez', 'ana@example.com'),
    ('Comentario sin email', 2, 'Roberto Silva', NULL),
    ('Comentario en post 3', 3, 'Visitante', 'visitante@example.com');
  `);
});

afterAll(async () => {
  await pool.end();
});

describe("GET /api/comments", () => {
  test("Debe retornar todos los comentarios", async () => {
    const response = await request(app).get("/api/comments");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(5);
  });

  test("Cada comentario debe tener estructura correcta", async () => {
    const response = await request(app).get("/api/comments");

    expect(response.statusCode).toBe(200);
    const comment = response.body[0];

    expect(comment).toHaveProperty("id");
    expect(comment).toHaveProperty("content");
    expect(comment).toHaveProperty("post_id");
    expect(comment).toHaveProperty("commenter_name");
    expect(comment).toHaveProperty("created_at");
  });
});

describe("POST /api/comments", () => {
  test("Debe crear un comentario con todos los datos", async () => {
    const response = await request(app)
      .post("/api/comments")
      .send({
        content: "Nuevo comentario de prueba",
        post_id: 1,
        commenter_name: "Test User",
        commenter_email: "test@example.com"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.content).toBe("Nuevo comentario de prueba");
    expect(response.body.commenter_name).toBe("Test User");
  });

  test("Debe crear comentario sin email (nullable)", async () => {
    const response = await request(app)
      .post("/api/comments")
      .send({
        content: "Comentario anónimo",
        post_id: 1,
        commenter_name: "Usuario Anónimo"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.commenter_email).toBeNull();
  });

  test("Debe rechazar sin content", async () => {
    const response = await request(app)
      .post("/api/comments")
      .send({
        post_id: 1,
        commenter_name: "Test User"
      });

    expect(response.statusCode).toBe(400);
  });

  test("Debe rechazar sin post_id", async () => {
    const response = await request(app)
      .post("/api/comments")
      .send({
        content: "Test",
        commenter_name: "Test User"
      });

    expect(response.statusCode).toBe(400);
  });

  test("Debe rechazar sin commenter_name", async () => {
    const response = await request(app)
      .post("/api/comments")
      .send({
        content: "Test",
        post_id: 1
      });

    expect(response.statusCode).toBe(400);
  });

  test("Debe rechazar con post_id inválido", async () => {
    const response = await request(app)
      .post("/api/comments")
      .send({
        content: "Test",
        post_id: 99999,
        commenter_name: "Test User"
      });

    expect(response.statusCode).toBe(404);
  });
});

describe("GET /api/comments/:id", () => {
  test("Debe obtener un comentario específico", async () => {
    const response = await request(app).get("/api/comments/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body).toHaveProperty("content");
  });

  test("Debe retornar 404 si comentario no existe", async () => {
    const response = await request(app).get("/api/comments/99999");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("error");
  });

  test("Debe rechazar ID inválido", async () => {
    const response = await request(app).get("/api/comments/abc");

    expect(response.statusCode).toBe(400);
  });
});

describe("GET /api/comments/post/:post_id", () => {
  test("Debe retornar comentarios de un post específico", async () => {
    const response = await request(app).get("/api/comments/post/1");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach(comment => {
      expect(comment.post_id).toBe(1);
    });
  });

  test("Debe retornar array vacío si post no tiene comentarios", async () => {
    const response = await request(app).get("/api/comments/post/4");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(0);
  });
});

describe("PUT /api/comments/:id", () => {
  test("Debe actualizar un comentario", async () => {
    const response = await request(app)
      .put("/api/comments/1")
      .send({
        content: "Contenido actualizado"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Contenido actualizado");
  });

  test("Debe retornar 404 si comentario no existe", async () => {
    const response = await request(app)
      .put("/api/comments/99999")
      .send({
        content: "Test"
      });

    expect(response.statusCode).toBe(404);
  });

  test("Debe rechazar ID inválido", async () => {
    const response = await request(app)
      .put("/api/comments/abc")
      .send({
        content: "Test"
      });

    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /api/comments/:id", () => {
  test("Debe eliminar un comentario", async () => {
    const response = await request(app).delete("/api/comments/1");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("Debe retornar 404 si comentario no existe", async () => {
    const response = await request(app).delete("/api/comments/99999");

    expect(response.statusCode).toBe(404);
  });

  test("Debe rechazar ID inválido", async () => {
    const response = await request(app).delete("/api/comments/abc");

    expect(response.statusCode).toBe(400);
  });
});
