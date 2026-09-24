import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import pool from "../src/db/config.js";

beforeEach(async () => {
  await pool.query("TRUNCATE authors RESTART IDENTITY CASCADE");
  await pool.query(`
    INSERT INTO authors (name, email, bio) VALUES
    ('Ana García', 'ana@example.com', 'Desarrolladora full-stack'),
    ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico'),
    ('María López', 'maria@example.com', 'Ingeniera de software');
  `);
  await pool.query(`
    INSERT INTO posts (title, content, author_id, published) VALUES
    ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
    ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
    ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
    ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
    ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);
    `);
});

afterAll(async () => {
  await pool.end();
});

describe("GET /api/posts", () => {
  test("devuelve los posts sembrados", async () => {
    const response = await request(app).get("/api/posts");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toHaveProperty("title");
  });
});