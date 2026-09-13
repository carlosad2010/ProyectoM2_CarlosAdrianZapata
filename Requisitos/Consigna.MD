Detalle
Debes crear una API REST sencilla en Node.js + Express que gestione usuarios y posts (modelo tipo JSONPlaceholder). Usar PostgreSQL para persistencia, implementar operaciones CRUD básicas, pruebas unitarias, documentación OpenAPI y desplegar la aplicación (Railway). El objetivo es practicar conexión Express–Postgres, SQL CRUD, validación y testing sin modelos demasiado complejos.

Buenas prácticas y recomendaciones
Mantener relaciones simples: un author puede tener muchos posts.
Prueba tus endpoints y queries en cada paso, por ejemplo si acabas de setear la base de datos usando el script, asegúrate que puedes hacer todas las consultas CRUD sobre las tablas; Cuando enchufes Express a tu base de datos, prueba todos los endpoints.
Las consultas SQL en services deben estar parametrizadas (evitar SQL injection).
Escribir unit tests usando supertest.
En Github, no subir .env con credenciales; sólo subir .env.example.
Alcance funcional mínimo
Entidades:

authors: id, name, email, bio, created_at
posts: id, author_id (FK -> users.id), title, content, published created_at
Endpoints (REST):

GET /authors - listar usuarios
GET /authors/:id - detalle de usuario
POST /authors - crear usuario
PUT /authors/:id - actualizar usuario
DELETE /authors/:id - eliminar usuario
GET /posts - listar posts
GET /posts/:id - detalle post
GET /posts/author/:authorId - posts con detalle de su author
POST /posts - crear post
PUT /posts/:id - actualizar post
DELETE /posts/:id - eliminar post
Validaciones:

name no vacío para authors
email único en authors
title, content, y author_id no vacíos para posts
Respuestas con códigos HTTP adecuados (200/201/204/400/404/500)
😎Extra credit
Extiende tu API agregando una nueva entidad comments, asociada a posts y authors.

Tu desafío extra consiste en:

Diseñar e implementar una nueva tabla comments en PostgreSQL con sus claves foráneas correspondientes.
Incorporar endpoints REST para crear y listar comentarios.
Mantener coherencia con la arquitectura actual (services, routes, middlewares).
Asegurar integridad referencial y comportamiento adecuado ante eliminaciones (por ejemplo, borrado en cascada o manejo de valores nulos).
Desplegar los cambios en Railway como parte de la aplicación productiva.