# 📚 Blog API - REST API de Gestión de Autores y Posts

Una API REST completa y profesional construida con **Node.js**, **Express** y **PostgreSQL** para la gestión de autores, posts y comentarios de un blog. Incluye validación robusta, tests unitarios (47 tests), documentación OpenAPI interactiva y despliegue automático en Railway.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución Local](#ejecución-local)
- [Tests](#tests)
- [Documentación API](#documentación-api)
- [Endpoints](#endpoints)
- [Ejemplos Visuales de Endpoints](#ejemplos-visuales-de-endpoints)
- [Despliegue en Railway](#despliegue-en-railway)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías](#tecnologías)
- [Registro de Uso de IA](#registro-de-uso-de-ia)

## ✨ Características

✅ **CRUD Completo** - Operaciones completas para Autores, Posts y Comentarios  
✅ **Validación Robusta** - Validación de datos en controladores y middleware  
✅ **47 Tests Unitarios** - Con Vitest y Supertest (todos pasando ✓)  
✅ **Integridad Referencial** - Borrado en cascada entre autores, posts y comentarios  
✅ **Documentación OpenAPI** - Especificación completa y Swagger UI interactivo  
✅ **Manejo de Errores** - Respuestas HTTP coherentes y descriptivas  
✅ **Base de Datos PostgreSQL** - Queries parametrizadas y seguras  
✅ **Despliegue Automático** - En Railway con CI/CD  
✅ **Middleware de Validación** - Validación centralizada de parámetros  
✅ **Variables de Entorno** - Seguridad y flexibilidad en configuración  

## 🔧 Requisitos Previos

- **Node.js** v16 o superior
- **npm** v8 o superior  
- **PostgreSQL** v12 o superior
- **Git**
- **Postman** o **cURL** (para probar endpoints, opcional)

## 📦 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/CarlosAdrianZapata/blog-api.git
cd blog-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus datos:

```env
PORT=3000
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/blog_api
NODE_ENV=development
```

### 4. Configurar Base de Datos

#### Opción A: Usar scripts SQL

```bash
psql -U postgres -f src/db/setup.sql
psql -U postgres -d blog_api -f src/db/seed.sql
```

#### Opción B: Crear manualmente

```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE blog_api;

# Usar la base de datos
\c blog_api

# Crear tablas (copiar contenido de src/db/setup.sql)
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  commenter_name VARCHAR(100) NOT NULL,
  commenter_email VARCHAR(150),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 🚀 Ejecución Local

### Modo Desarrollo (con auto-reload)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

**Acceso:** El servidor estará disponible en `http://localhost:3000`

## ✅ Tests

### Ejecutar todos los tests

```bash
npm test
```

### Ver resultados detallados

```bash
npm test -- --reporter=verbose
```

### Coverage de tests (experimental)

```bash
npm run test:coverage
```

### Resultados actuales: ✅ 47 Tests Passed

- **Validadores** (11 tests) ✓
  - Validación de emails
  - Validación de nombres
  - Validación de edades

- **Autores** (1 test de integración) ✓
  - GET /api/authors

- **Posts** (1 test de integración) ✓
  - GET /api/posts

- **Comentarios** (19 tests de integración) ✓
  - CRUD completo sobre /api/comments
  - Filtrado por post
  - Validación de campos requeridos y de IDs inválidos

- **OpenAPI** (15 tests) ✓
  - Validación de documentación YAML
  - Verificación de esquemas
  - Validación de endpoints

> Los tests de integración comparten una única base de datos, por lo que
> `vitest.config.js` desactiva `fileParallelism` para que los archivos no
> se trunquen las tablas entre sí.

## 📚 Documentación API

### 🔗 Swagger UI (Interfaz Interactiva)

Accede a la documentación interactiva en:

**Local:** `http://localhost:3000/api-docs`  
**Producción:** `https://proyectom2carlosadrianzapata-production.up.railway.app/api-docs`

En Swagger UI puedes:
- Ver todos los endpoints disponibles
- Ver los modelos de datos completos
- Probar los endpoints directamente desde el navegador
- Ver códigos de respuesta y ejemplos
- Descargar la especificación OpenAPI

### 📄 Archivo OpenAPI

La especificación completa está en `docs/openapi.yaml` (OpenAPI 3.0.3)

## 📡 Endpoints

### 👤 Autores

| Método | Ruta | Descripción | Parámetros |
|--------|------|-------------|-----------|
| `GET` | `/api/authors` | Obtener todos los autores | - |
| `GET` | `/api/authors/{id}` | Obtener un autor por ID | `id` (requerido) |
| `POST` | `/api/authors` | Crear nuevo autor | Body: `name`, `email`, `bio` |
| `PUT` | `/api/authors/{id}` | Actualizar autor | `id` (requerido), Body: campos a actualizar |
| `DELETE` | `/api/authors/{id}` | Eliminar autor | `id` (requerido) |

### 📝 Posts

| Método | Ruta | Descripción | Parámetros |
|--------|------|-------------|-----------|
| `GET` | `/api/posts` | Obtener todos los posts | - |
| `GET` | `/api/posts/{id}` | Obtener un post por ID | `id` (requerido) |
| `GET` | `/api/posts/author/{authorId}` | Posts de un autor específico | `authorId` (requerido) |
| `POST` | `/api/posts` | Crear nuevo post | Body: `title`, `content`, `author_id`, `published` |
| `PUT` | `/api/posts/{id}` | Actualizar post | `id` (requerido), Body: campos a actualizar |
| `DELETE` | `/api/posts/{id}` | Eliminar post | `id` (requerido) |

### 💬 Comentarios

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/api/comments` | Obtener todos los comentarios | - |
| `GET` | `/api/comments/{id}` | Obtener un comentario por ID | `id` (requerido) |
| `GET` | `/api/comments/post/{post_id}` | Comentarios de un post específico | `post_id` (requerido) |
| `POST` | `/api/comments` | Crear nuevo comentario | Body: `content`, `post_id`, `commenter_name`, `commenter_email` |
| `PUT` | `/api/comments/{id}` | Actualizar comentario | `id` (requerido), Body: campos a actualizar |
| `DELETE` | `/api/comments/{id}` | Eliminar comentario | `id` (requerido) |

Los comentarios están pensados para **visitantes del blog**: quien comenta se identifica
con su nombre y, opcionalmente, su email — no necesita estar registrado como autor.
Al eliminar un post, sus comentarios se borran en cascada.

## 📸 Ejemplos Visuales de Endpoints

### 👥 Endpoints de Autores

#### GET - Obtener todos los autores
![GET /api/authors](./img/getAuthors.png)

#### GET - Obtener autor por ID
![GET /api/authors/:id](./img/getAuthorsById.png)

#### POST - Crear nuevo autor
![POST /api/authors](./img/createAuthors.png)

#### PUT - Actualizar autor
![PUT /api/authors/:id](./img/updateAuthor.png)

#### DELETE - Eliminar autor
![DELETE /api/authors/:id](./img/deleteAuthor.png)

### 📝 Endpoints de Posts

#### GET - Obtener todos los posts
![GET /api/posts](./img/getPosts.png)

#### GET - Obtener post por ID
![GET /api/posts/:id](./img/getPostsById.png)

#### GET - Obtener posts de un autor
![GET /api/posts/author/:authorId](./img/getPostsByAuthorId.png)

#### POST - Crear nuevo post
![POST /api/posts](./img/createPost.png)

#### PUT - Actualizar post
![PUT /api/posts/:id](./img/updatePost.png)

#### DELETE - Eliminar post
![DELETE /api/posts/:id](./img/deletePost.png)

### 💬 Endpoints de Comentarios

#### GET - Obtener todos los comentarios
![GET /api/comments](./img/getAllComments.png)

#### GET - Obtener comentario por ID
![GET /api/comments/:id](./img/getCommentById.png)

#### GET - Obtener comentarios de un post
![GET /api/comments/post/:post_id](./img/getCommentsByPostId.png)

#### POST - Crear nuevo comentario
![POST /api/comments](./img/createComment.png)

#### PUT - Actualizar comentario
![PUT /api/comments/:id](./img/updateComment.png)

#### DELETE - Eliminar comentario
![DELETE /api/comments/:id](./img/deleteComment.png)

### 📌 Ejemplos de Uso

#### GET - Obtener todos los autores

```bash
curl http://localhost:3000/api/authors
```

**Respuesta:** Array de autores

#### POST - Crear un autor

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Carlos Adrian Zapata",
    "email": "carlos@example.com",
    "bio": "Desarrollador full-stack"
  }'
```

#### PUT - Actualizar un autor

```bash
curl -X PUT http://localhost:3000/api/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Ingeniero de software actualizado"
  }'
```

#### DELETE - Eliminar un autor

```bash
curl -X DELETE http://localhost:3000/api/authors/1
```

## 📚 Manual de Instalación Local (Paso a Paso)

### Paso 1: Requisitos Previos

Antes de comenzar, verifica que tengas instalado:

```bash
# Verificar Node.js
node --version
# Debe ser v16 o superior

# Verificar npm
npm --version
# Debe ser v8 o superior

# Verificar PostgreSQL
psql --version
# Debe ser v12 o superior
```

Si no tienes PostgreSQL instalado:
- **Windows:** Descarga desde https://www.postgresql.org/download/windows/
- **Mac:** `brew install postgresql`
- **Linux:** `sudo apt-get install postgresql postgresql-contrib`

### Paso 2: Clonar el Repositorio

```bash
# Clona el repositorio
git clone https://github.com/CarlosAdrianZapata/blog-api.git

# Entra en la carpeta
cd blog-api
```

### Paso 3: Instalar Dependencias

```bash
# Instala todas las dependencias del proyecto
npm install

# Esto puede tardar 1-2 minutos
```

### Paso 4: Crear la Base de Datos

#### **Opción A: Modo Rápido (Recomendado)**

```bash
# Abre PostgreSQL
psql -U postgres

# Ejecuta estos comandos en PostgreSQL:
```

```sql
CREATE DATABASE blog_api;
\c blog_api
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Comentario adicional sin email (para probar campo nullable)
('Comentario anónimo muy útil', 1, 'Visitante Anónimo', NULL, NOW());
#### **Opción B: Con Scripts SQL**

```bash
# Desde la carpeta del proyecto:
psql -U postgres -f src/db/setup.sql
psql -U postgres -d blog_api -f src/db/seed.sql
```

### Paso 5: Configurar Variables de Entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita el archivo .env con tu editor favorito
# En Windows: notepad .env
# En Mac/Linux: nano .env
```

Contenido del `.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:tu_contraseña@localhost:5432/blog_api
NODE_ENV=development
```

**Nota:** Reemplaza `tu_contraseña` con la contraseña que estableciste en PostgreSQL

### Paso 6: Verificar la Conexión a la BD

```bash
# Prueba la conexión
npm run conex

# Si todo está bien, deberías ver:
# "✅ Conexión a la base de datos exitosa"
```

### Paso 7: Ejecutar la Aplicación

```bash
# Modo desarrollo (con auto-reload)
npm run dev

# Deberías ver:
# "Servidor Express en http://localhost:3000"
```

### Paso 8: Probar la API

En otra terminal:

```bash
# Obtener todos los autores
curl http://localhost:3000/api/authors

# Deberías ver la lista de autores en JSON
```

### Paso 9: Ver la Documentación Interactiva

Abre en tu navegador:

```
http://localhost:3000/api-docs
```

Aquí puedes ver y probar todos los endpoints.

### Paso 10: Ejecutar los Tests

```bash
# Ejecutar todos los tests
npm test

# Ver resultado detallado
npm test -- --reporter=verbose
```

---

## 🚀 Manual de Despliegue en Railway (Paso a Paso)

### Paso 1: Preparar el Repositorio en GitHub

```bash
# Verifica que el repositorio esté en GitHub
git remote -v
# Deberías ver origin apuntando a GitHub

# Si no está en GitHub, agrégalo:
git remote add origin https://github.com/tu_usuario/blog-api.git
git branch -M main
git push -u origin main
```

**Importante:** Verifica que `.env` NO esté en el repositorio:
```bash
cat .gitignore
# Debe contener ".env"
```

### Paso 2: Crear Cuenta en Railway

1. Ve a https://railway.app/
2. Haz clic en "Sign Up"
3. Elige "Continue with GitHub"
4. Autoriza Railway en GitHub
5. Completa tu perfil

### Paso 3: Crear Nuevo Proyecto en Railway

1. En el dashboard de Railway, haz clic en "+ New Project"
2. Selecciona "Deploy from GitHub repo"
3. Busca y selecciona tu repositorio `blog-api`
4. Haz clic en "Deploy"

Railway comenzará a compilar y desplegar tu proyecto.

### Paso 4: Agregar Base de Datos PostgreSQL

1. En tu proyecto de Railway, haz clic en "+ Add"
2. Selecciona "PostgreSQL"
3. Se creará automáticamente una instancia de PostgreSQL
4. Railway proporcionará automáticamente `DATABASE_URL`

### Paso 5: Configurar Variables de Entorno

En el dashboard de Railway:

1. Haz clic en tu proyecto
2. Ve a "Variables"
3. Railway ya ha detectado `DATABASE_URL`
4. Agrega las variables faltantes:

```
PORT=3000
NODE_ENV=production
```

### Paso 6: Ejecutar Setup de Base de Datos

Railway ejecutará automáticamente `npm install` y `npm start`.

Para ejecutar el setup SQL manualmente:

1. En Railway, abre la terminal del servicio PostgreSQL
2. Ejecuta:

```sql
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id),
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO authors (name, email, bio) VALUES
('Ana García', 'ana@example.com', 'Desarrolladora full-stack'),
('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico');
```

### Paso 7: Monitorear el Deploy

En Railway:

1. Ve a la pestaña "Deployments"
2. Verifica el estado del deploy
3. Si hay errores, haz clic en el deployment para ver los logs

### Paso 8: Obtener la URL Pública

1. En tu proyecto, haz clic en el servicio Node.js
2. Ve a "Settings" → "Domains"
3. Railway generará una URL pública automáticamente
4. Copia la URL (ejemplo: `https://blog-api-production-xxxx.up.railway.app/`)

### Paso 9: Probar la API en Producción

```bash
# Reemplaza con tu URL
curl https://tu-url-production.up.railway.app/api/authors

# Deberías ver la respuesta JSON
```

### Paso 10: Acceder a la Documentación

```
https://tu-url-production.up.railway.app/api-docs
```

### Paso 11: Configurar Despliegues Automáticos (Opcional)

Railway despliega automáticamente cuando haces push a `main`:

```bash
# Haz cambios en tu código
git add .
git commit -m "Tu mensaje"

# Push a GitHub
git push origin main

# Railway automáticamente desplegará los cambios
```

### Solucionar Problemas en Railway

#### **Error: Cannot find module**
- Solución: Ejecuta `npm install` en Railway
- En Railway terminal: `npm install`

#### **Error de conexión a BD**
- Verifica que `DATABASE_URL` esté configurado
- Verifica que las tablas estén creadas
- Revisa los logs de Railway

#### **Error 502 Bad Gateway**
- Espera 30-60 segundos a que Railway reinicie
- Revisa los logs del deployment
- Verifica que el `PORT` sea el correcto

---

## 🌐 Despliegue en Railway (Resumen Rápido)

### URLs de Producción

- **API:** https://proyectom2carlosadrianzapata-production.up.railway.app/
- **Documentación:** https://proyectom2carlosadrianzapata-production.up.railway.app/api-docs

## 📁 Estructura del Proyecto

```
blog-api/
├── 📄 package.json                # Dependencias y scripts
├── 📄 vitest.config.js            # Configuración de tests
├── 📄 .env.example                # Plantilla de variables
├── 📄 readme.MD                   # Este archivo
│
├── 📂 src/                        # Código fuente de la aplicación
│   ├── 📄 app.js                  # Configuración Express y middleware
│   ├── 📄 index.js                # Punto de entrada
│   │
│   ├── 📂 controllers/            # Lógica de negocio
│   │   ├── authorsControllers.js
│   │   ├── postsControllers.js
│   │   └── commentsControllers.js
│   │
│   ├── 📂 routes/                 # Definición de rutas
│   │   ├── index.js
│   │   ├── authorsRouter.js
│   │   ├── postsRouters.js
│   │   └── commentsRouter.js
│   │
│   ├── 📂 middleware/             # Middleware personalizado
│   │   ├── validaParametros.js   # Validación centralizada de parámetros
│   │   └── errorHandler.js       # Manejo centralizado de errores
│   │
│   ├── 📂 db/                     # Base de datos
│   │   ├── config.js             # Configuración conexión
│   │   ├── setup.sql             # Crear tablas
│   │   ├── seed.sql              # Datos de ejemplo
│   │   └── test-connection.js
│   │
│   └── 📂 utils/                  # Funciones utilitarias
│       └── validator.js          # Validadores
│
├── 📂 docs/                       # Documentación
│   └── openapi.yaml              # Especificación OpenAPI
│
├── 📂 img/                        # Capturas de los endpoints
│
├── 📂 tests/                      # Tests unitarios
│   ├── validator.test.js
│   ├── authors.test.js
│   ├── posts.test.js
│   ├── comments.test.js
│   └── openapi.test.js
│
└── 📂 Requisitos/                 # Documentación del proyecto
    ├── Consigna.MD
    ├── Objetivos.MD
    ├── Entregable Final.MD
    └── Rubrica PI M2.xlsx
```

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| Node.js | v16+ | Runtime JavaScript |
| Express | ^5.2.1 | Framework web |
| PostgreSQL | v12+ | Base de datos relacional |
| pg | ^8.23.0 | Driver PostgreSQL |
| Vitest | ^5.0.0 | Testing framework |
| Supertest | ^7.2.2 | HTTP testing |
| YAML.js | ^0.3.0 | Parser YAML |
| Swagger UI Express | ^5.0.1 | Documentación interactiva |
| dotenv | ^17.4.2 | Variables de entorno |

## 🤖 Registro de Uso de IA

Este proyecto fue desarrollado **principalmente por el desarrollador Carlos Adrian Zapata**. La IA (Claude AI de Anthropic) fue utilizada de manera **asistida y selectiva** en áreas específicas:

### 🎯 Áreas Donde la IA Proporcionó Asistencia

#### ✅ **1. Documentación (Principal Contribución)**

**OpenAPI Documentation (docs/openapi.yaml)**
- IA ayudó en: Estructura y formato de la especificación
- Generación de esquemas JSON para Author y Post
- Documentación completa de respuestas HTTP
- Ejemplos de payloads
- Stack de IA usado: **Claude Opus 5**

**README.md - Documentación Profesional**
- IA generó estructura y templates
- Manuales paso a paso para instalación local
- Manual paso a paso para Railway
- Tabla de contenidos y organización
- Stack de IA usado: **Claude Opus 5** y **Claude Haiku 4.5**

**Análisis de Requisitos (ANALISIS_REQUISITOS.md)**
- IA ayudó en estructura y formato
- Checklist de cumplimiento
- Identificación de pendientes
- Stack de IA usado: **Claude Opus 5**

#### ✅ **2. Corrección de Errores y Debugging**

**Error 404 en rutas sin parámetro**
- Problema: `PUT /api/authors/` sin ID no retornaba error 400
- IA sugirió: Agregar ruta `PUT /` antes de `PUT /:id`
- Resultado: Error validado correctamente ✓

**SSL Connection Error en Tests**
- Problema: Tests fallaban por error SSL en PostgreSQL
- IA sugirió: Cargar `dotenv` en `vitest.config.js`
- Resultado: Tests funcionan correctamente (28/28 ✓)

**Middleware de Validación**
- Problema: Validación repetida en múltiples endpoints
- IA sugirió: Crear middleware centralizado
- Implementación: `src/middleware/validaParametros.js`
- Stack de IA usado: **Claude Haiku 4.5**

#### ✅ **3. Sugerencias de Mejoras**

**Validación de Parámetros**
- IA sugirió agregar validación de número en IDs
- IA propuso middleware reutilizable
- Developer implementó la solución

**Estructura de Tests**
- IA sugirió mejoras en estructura de tests
- Developer ejecutó y validó

**Manejo de Errores**
- IA sugirió códigos HTTP más apropiados
- Developer revistió y aplicó

### 📊 Stack de IA Utilizado

```
Modelos de Claude AI (Anthropic):
├── Claude Opus 5
│   ├── Documentación completa
│   ├── Análisis de requisitos
│   └── Estructura general
│
└── Claude Haiku 4.5
    ├── Corrección de errores
    ├── Debugging rápido
    ├── Sugerencias específicas
    └── Revisión de código
```

### 👨‍💻 Desarrollo del Proyecto - Responsabilidad del Desarrollador

**Archivos completamente desarrollados por Carlos Adrian Zapata:**

```
✅ src/app.js                      # Configuración Express
✅ src/index.js                    # Punto de entrada
✅ src/controllers/authorsControllers.js
✅ src/controllers/postsControllers.js
✅ src/routes/index.js
✅ src/routes/authorsRouter.js
✅ src/routes/postsRouters.js
✅ src/db/config.js                # Conexión a BD
✅ src/db/setup.sql                # Creación de tablas
✅ src/db/seed.sql                 # Datos de ejemplo
✅ src/utils/validator.js          # Funciones de validación
✅ tests/validator.test.js
✅ tests/authors.test.js
✅ tests/posts.test.js
✅ package.json                    # Configuración del proyecto
```

**Ayuda de IA en estos archivos:** Minimal (revisión y sugerencias)

**Archivos con Asistencia de IA Significativa:**

```
✅ src/middleware/validaParametros.js  # IA sugirió estructura
✅ docs/openapi.yaml              # IA generó estructura
✅ vitest.config.js               # IA sugirió solución SSL
✅ readme.MD                       # IA generó estructura y templates
```

### 🔄 Proceso Real de Desarrollo

1. **Desarrollador:** Escribir código de controllers y routes
2. **IA:** Sugerir mejoras y patrones
3. **Desarrollador:** Implementar sugerencias y ajustar
4. **Desarrollador:** Testing y validación manual
5. **IA:** Ayudar en debugging cuando había errores
6. **Desarrollador:** Escribir documentación
7. **IA:** Mejorar formato y completitud de documentación
8. **Desarrollador:** Review final y despliegue

### 📈 Cuantificación Real del Aporte

| Tarea | % Realizado por Desarrollador | % Ayuda de IA |
|-------|-------------------------------|---------------|
| Backend (Controllers/Routes) | **95%** | 5% |
| Base de Datos | **100%** | 0% |
| Tests | **90%** | 10% |
| Middleware | **70%** | 30% |
| Documentación OpenAPI | **40%** | 60% |
| README y Manuales | **30%** | 70% |
| Debugging | **70%** | 30% |
| **TOTAL** | **~75%** | **~25%** |

### 🎓 Conclusión Honesta

**Este es un proyecto desarrollado por un desarrollador competente (Carlos Adrian Zapata) que utilizó IA como herramienta de asistencia en:**
- Documentación y estructura de archivos
- Corrección de errores específicos
- Mejora de código existente

**La IA NO generó:**
- La arquitectura del sistema (el desarrollador la diseñó)
- Los controllers (el desarrollador los escribió)
- Las rutas (el desarrollador las configuró)
- Los tests principales (el desarrollador los escribió)

**La IA fue útil para:**
- Mejorar la documentación
- Sugerir patrones
- Ayudar en debugging
- Generar templates y estructuras

---

**Stack final de IA utilizado:**
- 🤖 **Claude Opus 5** - Tareas complejas y análisis
- 🤖 **Claude Haiku 4.5** - Debugging rápido y correcciones
- 📌 **Anthropic** - Proveedor de la IA

## 📄 Licencia

ISC License - Este proyecto es de código abierto.

## ✉️ Contacto

**Autor:** Carlos Adrian Zapata  
**Email:** carlosad@gmail.com  
**GitHub:** [@CarlosAdrianZapata](https://github.com/CarlosAdrianZapata)

---

**Estado:** ✅ Producción  
**Última actualización:** Septiembre 2026  
**Versión:** 1.0.0
