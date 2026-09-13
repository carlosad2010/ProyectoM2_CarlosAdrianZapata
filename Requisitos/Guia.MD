**GUÍA PARA EL DESARROLLO DEL PROYECTO INTEGRADOR 2**

**Propósito de esta guía**

Esta guía tiene como objetivo acompañarte en la implementación técnica del backend del Proyecto Integrador.

No reemplaza la consigna oficial ni define una única forma de resolver el proyecto. Su función es orientarte con ejemplos concretos de estructura, scripts SQL y datos iniciales que puedes utilizar como referencia para organizar tu desarrollo.

El foco está en ayudarte a construir una API REST funcional, bien estructurada y correctamente conectada a PostgreSQL.

**Qué se espera del proyecto**

Se espera que desarrolles una API REST en Node.js \+ Express que:

- Implemente operaciones CRUD para las entidades authors y posts.  
- Persista los datos en PostgreSQL.  
- Maneje validaciones básicas y errores.  
- Incluya documentación mínima y tests automatizados.

Más allá de la cantidad de funcionalidades, se valorará especialmente:

* Que los endpoints funcionen correctamente.  
* Que la conexión con la base de datos esté bien configurada.  
* Que las consultas SQL estén parametrizadas.  
* Que el proyecto esté correctamente versionado.  
* Que la documentación permita ejecutar el proyecto sin ayuda externa.

**Cómo encarar el desarrollo**

**Antes de escribir código:**

- Lee la consigna completa.  
- Identifica las entidades y relaciones (authors → posts).  
- Define una estructura simple de carpetas (routes, services, db, middlewares).  
- Decide qué endpoints implementarás primero.  
- Prepara tu script de base de datos antes de conectar Express.

**Durante el desarrollo:**

Se recomienda avanzar en este orden lógico:

1. Crear el script SQL de setup y seed.  
2. Probar las tablas directamente en PostgreSQL.  
3. Crear los endpoints con datos en memoria (arrays).  
4. Conectar la aplicación a PostgreSQL usando pg.  
5. Reemplazar los arrays por consultas reales a la base de datos.  
6. Agregar validaciones y middleware de manejo de errores.  
7. Incorporar tests.  
8. Documentar con OpenAPI.  
9. Preparar el deployment.

Prueba los endpoints frecuentemente con herramientas como Postman o Thunder Client.

Realiza commits pequeños y descriptivos.

**Ejemplo de Script setup y seed (.sql)**

Puedes utilizar el siguiente ejemplo como base para tu archivo de inicialización de base de datos.

```sql
CREATE TABLE authors (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(150) UNIQUE NOT NULL,
 bio TEXT,
 created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
 id SERIAL PRIMARY KEY,
 title VARCHAR(200) NOT NULL,
 content TEXT NOT NULL,
 author_id INTEGER NOT NULL,
 published BOOLEAN DEFAULT FALSE,
 created_at TIMESTAMPTZ DEFAULT NOW(),
 FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);
```

### **Datos de ejemplo (seed)**

```sql
INSERT INTO authors (name, email, bio) VALUES
 ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
 ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
 ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST');

INSERT INTO posts (title, content, author_id, published) VALUES
 ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 1, true),
 ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 2, true),
 ('APIs RESTful', 'REST es un estilo arquitectónico...', 1, true),
 ('Manejo de errores en Express', 'El manejo apropiado de errores...', 3, false),
 ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 1, false);
```

Antes de conectar tu aplicación, verifica que:

* Las tablas se crearon correctamente.  
* Las claves foráneas funcionan.  
* Puedes ejecutar consultas CRUD manualmente.

**Arrays en memoria para pruebas iniciales**

Antes de conectar PostgreSQL, puedes crear tus endpoints usando datos en memoria. Esto te permitirá validar la lógica HTTP sin depender aún de la base de datos.

### **Ejemplo authors**

```javascript
let authors = [
 {
   id: 1,
   name: 'Ana García',
   email: 'ana@example.com',
   bio: 'Desarrolladora full-stack apasionada por Node.js'
 },
 {
   id: 2,
   name: 'Carlos Ruiz',
   email: 'carlos@example.com',
   bio: 'Escritor técnico especializado en bases de datos'
 },
 {
   id: 3,
   name: 'María López',
   email: 'maria@example.com',
   bio: 'Ingeniera de software con foco en APIs REST'
 }
];
```

### **Ejemplo posts**

```javascript
let posts = [
 {
   id: 1,
   title: 'Introducción a Node.js',
   content: 'Node.js es un runtime de JavaScript...',
   author_id: 1,
   published: true
 },
 {
   id: 2,
   title: 'PostgreSQL vs MySQL',
   content: 'Ambas bases de datos tienen ventajas...',
   author_id: 2,
   published: true
 },
 {
   id: 3,
   title: 'APIs RESTful',
   content: 'REST es un estilo arquitectónico...',
   author_id: 1,
   published: true
 },
 {
   id: 4,
   title: 'Manejo de errores en Express',
   content: 'El manejo apropiado de errores...',
   author_id: 3,
   published: false
 },
 {
   id: 5,
   title: 'Async/Await explicado',
   content: 'Las promesas simplifican el código asíncrono...',
   author_id: 3,
   published: false
 }
];
```

Una vez que tu API funcione con estos arrays, podrás reemplazar la lógica por consultas SQL reales.

**Buenas prácticas recomendadas**

**Arquitectura**

- Separa rutas (routes) de lógica de negocio (services).  
- Centraliza la conexión a la base de datos.  
- Implementa un middleware global de manejo de errores.

**SQL**

- Usa consultas parametrizadas ($1, $2, etc.).  
- No concatenes strings para construir queries.  
- Maneja correctamente los casos donde no hay resultados (404).

**Validaciones**

- Verifica campos obligatorios.  
- Controla que el email sea único.  
- Retorna códigos HTTP adecuados (400, 404, 201, etc.).

**Tests**

- Cubre al menos:  
  * Crear author.  
  * Obtener author.  
  * Crear post.  
  * Eliminar recurso inexistente.  
- Usa supertest para testear endpoints HTTP.

**Git**

- No subas tu archivo .env.  
- Incluye un .env.example.  
- Mantén el repositorio público.

**Errores comunes a evitar**

- Conectar Express a PostgreSQL sin haber probado el script SQL primero.  
- No manejar errores de base de datos.  
- No validar inputs antes de hacer la consulta.  
- Responder siempre 200 aunque haya errores.  
- No documentar cómo ejecutar el proyecto.

**Sobre el uso de IA**

Puedes utilizar herramientas de IA como apoyo, siguiendo lo aprendido en el módulo, debes documentar los prompts utilizados y explicar cómo influyeron en el desarrollo del proyecto.

**Deployment en Railway**

Para completar el deployment en Railway vas a necesitar:

1. Crear un proyecto en Railway y configurar una base de datos PostgreSQL en la plataforma.  
2. Conectar tu repositorio de GitHub al proyecto para que Railway pueda desplegarlo automáticamente.  
3. Configurar las variables de entorno en Railway con los mismos nombres que definiste en tu .env.example.  
4. Inicializar la base de datos remota ejecutando tu script SQL de setup y seed.  
5. Verificar que la URL pública esté operativa probando alguno de tus endpoints.

Recuerda incluir en tu README la URL pública y evidencia de que el deploy está funcionando.

**Cierre**

Esta guía está pensada para ayudarte a organizar tu implementación técnica y evitar errores frecuentes en proyectos backend.

El objetivo final es que puedas demostrar que:

* Comprendes cómo construir una API REST.  
* Sabes modelar y consultar una base de datos relacional.  
* Puedes estructurar un proyecto Node.js de manera profesional.  
* Eres capaz de entregar un backend funcional, documentado y desplegado.