import { describe, test, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import pool from "../db/config.js";

beforeEach(async () => {
  await pool.query("TRUNCATE authors RESTART IDENTITY CASCADE");
  await pool.query(`
    INSERT INTO authors (name, email, bio) VALUES
  ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
  ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');
  `);
});

afterAll(async () => {
  await pool.end();
});

describe("GET /api/authors", () => {
  test("devuelve los autores sembrados", async () => {
    const response = await request(app).get("/api/authors");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty("name");
  });
});