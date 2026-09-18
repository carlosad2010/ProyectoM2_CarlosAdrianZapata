-- Insertar datos de ejemplo
-- Registros de autores
INSERT INTO authors (name, email, bio) VALUES
  ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
  ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

--Registros de posts
INSERT INTO posts (title, content, author_id, published) VALUES
  ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
  ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
  ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
  ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
  ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);

  --Registros de comentarios
  -- Insertar comentarios de ejemplo
INSERT INTO comments (content, post_id, commenter_name, commenter_email, created_at) VALUES
-- Comentarios para post 1
('Excelente introducción a Node.js, muy bien explicado', 1, 'Juan Pérez', 'juan@example.com', NOW() - INTERVAL '3 days'),
('¿Podrías hacer un tutorial sobre async/await?', 1, 'María García', 'maria@example.com', NOW() - INTERVAL '2 days'),
('Muy útil, gracias por compartir', 1, 'Carlos López', 'carlos@example.com', NOW() - INTERVAL '1 day'),

-- Comentarios para post 2
('PostgreSQL es mucho más robusto que MySQL', 2, 'Ana Martínez', 'ana@example.com', NOW() - INTERVAL '4 days'),
('¿Cuál recomiendas para proyectos grandes?', 2, 'Roberto Silva', 'roberto@example.com', NOW() - INTERVAL '2 days'),
('Me ha ayudado a tomar la decisión correcta', 2, 'Laura Fernández', 'laura@example.com', NOW() - INTERVAL '1 day'),

-- Comentarios para post 3 (si existe)
('Muy interesante el análisis comparativo', 3, 'Diego Ruiz', 'diego@example.com', NOW() - INTERVAL '2 days'),
('Esperaba más detalles sobre rendimiento', 3, 'Sofía Moreno', 'sofía@example.com', NOW() - INTERVAL '1 day'),

-- Comentario adicional sin email (para |probar campo nullable)
('Comentario anónimo muy útil', 1, 'Visitante Anónimo', NULL, NOW());