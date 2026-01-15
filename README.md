# UCAB Tasks API - Sistema de Gestión de Notas

API RESTful desarrollada con **NestJS** para la gestión de notas (creación, lectura, actualización y eliminación). El proyecto implementa persistencia de datos mediante archivos (JSON), validaciones y lógica de negocio específica.

## Características y Requisitos Cumplidos

### Funcionales

- **CRUD Completo:** Gestión total de notas (Título y Contenido).
- **Persistencia en Archivo:** Los datos se almacenan físicamente en `data.json` y persisten ante reinicios del servidor.
- **Seguridad en Listado:** El endpoint `GET /notes` devuelve el listado de notas **ocultando el campo `content`** por privacidad.
- **Detalle Completo:** El endpoint `GET /notes/:id` permite ver la nota completa (incluyendo contenido).
- **Ordenamiento:** Capacidad de ordenar el listado por Título, Fecha de Creación o Modificación (`?sort=title`).
- **Generación de IDs:** Uso de UUIDs (v4) para identificadores únicos.

### No Funcionales

- **Arquitectura Modular:** Separación de responsabilidades (Controller, Service, Repository).
- **Inyección de Dependencias:** Uso de Interfaces para desacoplar la lógica de negocio del almacenamiento.
- **Pruebas Unitarias:** Cobertura de tests para Controladores y Servicios (`.spec.ts`).
- **Documentación API:** Integración con Swagger/OpenAPI.

## Instalación y Configuración

1. **Clonar el repositorio:**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd ucab-tasks

   ```

2. **Instalar Dependencias:**
   npm install

3. **Ejecucion:**
   npm run start:dev

## Swagger (API)

1. Inicie el servidor.

2.Acceder a la pagina: http://localhost:3000/api

3. **Endpoints Principales**

- POST,/notes,Crear una nueva nota,N/A

- GET,/notes,Listar notas (Sin contenido),?sort=title

- GET,/notes/{id},Ver detalle de nota (Con contenido)

- PATCH,/notes/{id},Actualizar título o contenido

- DELETE,/notes/{id},Eliminar una nota

## Pruebas Unitarias y de Integracion

- **Ejecutar todas las pruebas**: npm run test

- **Ver cobertura del codigo**: npm run test:cov

## Estructura del proyecto

src/
├── notes/
│ ├── dto/ # Data Transfer Objects (Validaciones)
│ ├── interfaces/ # Contratos de Repositorio
│ ├── notes.controller.ts # Manejo de peticiones HTTP
│ ├── notes.service.ts # Lógica de Negocio (Ordenamiento/Filtros)
│ ├── file-notes.repository.ts # Implementación de persistencia (JSON)
│ └── ...
├── app.module.ts # Módulo principal
└── main.ts # Punto de entrada

## AUTORES

**David Crespo y Kelly Apolinar**

Proyecto de Tópicos Especiales de Programacion.

UCAB
