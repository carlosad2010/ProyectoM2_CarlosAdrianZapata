-- Tabla de autores
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);

-- Tabla de coments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INTEGER NOT NULL,
  commenter_name VARCHAR(100) NOT NULL,
  commenter_email VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

