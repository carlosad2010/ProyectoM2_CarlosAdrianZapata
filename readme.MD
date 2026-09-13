API REST para gestionar autores y posts de un blog. Permite operaciones CRUD completas sobre autores y publicaciones con relaciones entre tablas.

Proyecto construido con Node.js, Express, y PostgreSQL. Desplegado en Railway.
## URL Base

[https://proyectointegradorm2-production-2778.up.railway.app/](https://proyectointegradorm2-production-2778.up.railway.app/)

Todas las rutas están bajo `/api`.

## Tecnologías

- **Backend:** Node.js con Express
- **Base de datos:** PostgreSQL
- **ORM/Cliente DB:** pg (node-postgres)
- **Documentación:** OpenAPI 3.0 con Swagger UI
- **Deployment:** Railway

## Endpoints

### Autores

- `GET /api/authors` - Obtener todos los autores
- `GET /api/authors/:id` - Obtener un autor específico
- `POST /api/authors` - Crear un nuevo autor
- `PUT /api/authors/:id` - Actualizar un autor existente
- `DELETE /api/authors/:id` - Eliminar un autor

### Posts

- `GET /api/posts` - Obtener todos los posts
- `GET /api/posts/:id` - Obtener un post específico
- `GET /api/posts/author/:authorId` - Obtener posts de un autor
- `POST /api/posts` - Crear un nuevo post
- `PUT /api/posts/:id` - Actualizar un post existente
- `DELETE /api/posts/:id` - Eliminar un post

## Ejemplos de Uso

### Obtener todos los autores

```bash
curl https://proyectointegradorm2-production-2778.up.railway.app/api/authors
```

**Respuesta:**

```json
[
  \{
    "id": 1,
    "name": "Ana García",
    "email": "ana@example.com",
    "bio": "Desarrolladora full-stack apasionada por Node.js",
    "created_at": "2024-02-06T15:30:00.000Z"
  \},
  \{
    "id": 2,
    "name": "Carlos Ruiz",
    "email": "carlos@example.com",
    "bio": "Escritor técnico especializado en bases de datos",
    "created_at": "2024-02-06T15:30:00.000Z"
  \}
  \{
    "id": 3,
    "name": "MarÃ­a LÃ³pez",
    "email": "maria@example.com",
    "bio": "Ingeniera de software con foco en APIs REST",
    "created_at": "2026-09-10T03:18:45.166Z"
  \}
  \{
    "id": 4,
    "name": "Yesid Alexis Espinosa",
    "email": "yespinosa@Yahoo.es",
    "bio": "Escritor especializado en cuentos poéticos y críticos del ser",
    "created_at": "2026-09-10T15:49:06.556Z"
  \}
]
```

### Obtener un autor específico

```bash
curl https://proyectointegradorm2-production-2778.up.railway.app/api/authors/1
```

**Respuesta:**

```json
\{
  "id": 1,
  "name": "Ana García",
  "email": "ana@example.com",
  "bio": "Desarrolladora full-stack apasionada por Node.js",
  "created_at": "2024-02-06T15:30:00.000Z"
\}
```

### Crear un nuevo autor

```bash
curl -X POST https://proyectointegradorm2-production-2778.up.railway.app/api/authors \
  -H "Content-Type: application/json" \
  -d '\{
    "name": "Carlos Adrian Zapata García",
    "email": "carlosad@gmail.com",
    "bio": "Ingeniera de software especializada en APIs"
  \}'
```

**Respuesta:**

```json
\{
  "id": 4,
  "name": "Carlos Adrian Zapata García",
  "email": "carlosad@gmail.com",
  "bio": "Ingeniera de software especializada en APIs",
  "created_at": "2024-02-06T16:45:00.000Z"
\}
```

### Actualizar un autor

```bash
curl -X PUT https://proyectointegradorm2-production-2778.up.railway.app/api/authors/4 \
  -H "Content-Type: application/json" \
  -d '\{
    "bio": "Ingeniera de software y speaker internacional"
  \}'
```

**Respuesta:**

```json
\{
  "id": 4,
  "name": "Carlos Adrian Zapata",
  "email": "contrabajo100@msn.com",
  "bio": "Ingeniera de software y speaker internacional",
  "created_at": "2024-02-06T16:45:00.000Z"
\}
```

### Eliminar un autor

```bash
curl -X DELETE https://proyectointegradorm2-production-2778.up.railway.app/api/authors/4
```

**Respuesta:**

```json
\{
  "message": "Autor eliminado exitosamente"
\}
```

### Crear un post

```bash
curl -X POST https://proyectointegradorm2-production-2778.up.railway.app/api/posts \
  -H "Content-Type: application/json" \
  -d '\{
    "title": "Introducción a PostgreSQL",
    "content": "PostgreSQL es una base de datos relacional de código abierto...",
    "author_id": 4,
    "published": true
  \}'
```

**Respuesta:**

```json
\{
  "id": 6,
  "title": "Introducción a PostgreSQL",
  "content": "PostgreSQL es una base de datos relacional de código abierto...",
  "author_id": 4,
  "published": true,
  "created_at": "2024-02-06T17:00:00.000Z"
\}
```

### Obtener posts de un autor específico

```bash
curl https://proyectointegradorm2-production-2778.up.railway.app/api/posts/author/1
```

**Respuesta:**

```json
[
  \{
    "id": 1,
    "title": "Introducción a Node.js",
    "content": "Node.js es un runtime de JavaScript...",
    "author_id": 1,
    "published": true,
    "created_at": "2024-02-06T15:30:00.000Z"
  \},
  /{
    "id": 3,
    "title": "APIs RESTful",
    "content": "REST es un estilo arquitectÃ³nico...",
    "author_id": 1,
    "published": true,
    "created_at": "2026-09-10T03:18:45.351Z"
 \},
  \{
    "id": 5,
    "title": "Async/Await explicado",
    "content": "Las promesas simplifican el cÃ³digo asÃ­ncrono...",
    "author_id": 1,
    "published": false,
    "created_at": "2026-09-10T03:18:45.351Z"
  \}
]
```


## Documentación Completa

La documentación interactiva completa de la API está disponible en:

**https://proyectointegradorm2-production-2778.up.railway.app/api-docs**

Ahí puedes:
- Ver todos los endpoints con detalles completos
- Probar endpoints directamente desde el navegador
- Ver esquemas de datos y ejemplos
- Entender parámetros opcionales y requeridos