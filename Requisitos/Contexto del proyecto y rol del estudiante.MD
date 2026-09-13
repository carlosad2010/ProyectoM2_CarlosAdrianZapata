API MiniBlog

Contexto del proyecto y rol del estudiante: 

Eres desarrollador/a backend junior en DevSpark, una pequeña startup que está construyendo la versión inicial de su servicio de contenidos llamado MiniBlog. El equipo de producto necesita una API estable y simple para gestionar usuarios y publicaciones que servirá como base para futuras funcionalidades (frontend, recomendaciones, autenticación). 



Tu tarea es entregar una API REST en Node.js/Express conectada a PostgreSQL que permita crear, leer, actualizar y borrar usuarios y posts, con validaciones, tests básicos y documentación mínima para que el resto del equipo (frontend, DevOps) pueda integrarla y desplegarla en producción.



Situación real y objetivos claros:



Problema: El frontend ya tiene prototipos visuales pero no hay backend funcional. El equipo de producto quiere una API fiable y documentada para seguir con la integración.

Tu misión: Implementar los endpoints CRUD para users y posts, asegurar que los datos se persisten en PostgreSQL, manejar errores y validaciones básicas, escribir tests unitarios que cubran casos críticos y entregar documentación OpenAPI y scripts de creación/seed de la base.

Restricciones: Mantener la arquitectura simple, usar consultas SQL directas (pg), exponer respuestas HTTP apropiadas y no introducir dependencias innecesarias. Preparar la aplicación para deployment en Railway siguiendo buenas prácticas básicas (variables de entorno, no subir credenciales a Github).

