Simulador de Viajes – API REST (Node + TypeScript)
----------------------------------------------------------------------------------------------------------------------------------------
Descripción General:
Este proyecto corresponde al Taller 3: Inventario de Endpoints + API en Node/TypeScript, cuyo objetivo es definir, documentar e implementar los endpoints REST de un sistema de simulación de viajes, utilizando almacenamiento en memoria (RAM) sin base de datos.

El sistema permite realizar operaciones de creación, consulta, actualización, eliminación y exportación de viajes, administrando información relacionada con destino, transporte, alojamiento, actividades y presupuesto.

Equipo de Desarrollo:

Integrantes:
- Juan Pérez
- Luisa Salgado
- Camila Sandoval

Docente:
Diego Andrés Baquero Tibocha

Asignatura: Construcción de Software
Universidad Antonio Nariño – Sede del Sur
Bogotá D.C., 2025

Tecnologías Utilizadas:

- Node.js v20 o superior
- TypeScript v5 o superior
- Express.js
- Nodemon
- ts-node-dev (opcional)
- Postman para pruebas y validación de endpoints
Instalación y Ejecución del Proyecto:

1. Clonar el repositorio
   git clone https://github.com/tuusuario/Simulador_Viajes.git
   cd Simulador_Viajes

2. Instalar dependencias
   npm install

3. Ejecutar en modo desarrollo
   npm run dev

4. Compilar a JavaScript (opcional)
   npm run build

5. Ejecutar la versión compilada
   npm start

El servidor se ejecutará por defecto en la dirección:
http://localhost:3000

Endpoints Implementados:

Método | Ruta | Descripción | Estado | Seguridad
POST | /travels | Crea un nuevo viaje. Calcula totalBudget = days * travelers * budgetPerPerson | Implementado | No requiere token
GET | /travels | Retorna la lista de viajes registrados en memoria | Implementado | No requiere token
GET | /travels/:id | Devuelve un viaje específico por su ID | Implementado | No requiere token
PUT | /travels/:id | Actualiza completamente un viaje existente y recalcula el presupuesto total | Implementado | No requiere token
PATCH | /travels/:id | Actualiza parcialmente un viaje (por ejemplo, los días o el presupuesto) | Implementado | No requiere token
DELETE | /travels/:id | Elimina un viaje de la lista | Implementado | No requiere token
GET | /travels/:id/export?format=pdf | Simula la exportación del viaje a formato PDF | Solo documentado | No requiere token

Ejemplo de Body (POST /travels):

{
  "destination": "Cartagena",
  "days": 5,
  "travelers": 3,
  "transport": "avion",
  "lodging": "hotel",
  "activities": ["playa", "tour", "comida"],
  "budgetPerPerson": 250000
}

Respuesta exitosa (201):

{
  "id": 1,
  "destination": "Cartagena",
  "days": 5,
  "travelers": 3,
  "transport": "avion",
  "lodging": "hotel",
  "activities": ["playa", "tour", "comida"],
  "budgetPerPerson": 250000,
  "totalBudget": 3750000,
  "createdAt": "2025-11-02T22:30:00.000Z"
}

Colección de Pruebas:

Se incluye una colección de Postman denominada:
Simulador_Viajes.postman_collection.json

La colección contiene los siguientes endpoints probados:
- Creación de viajes
- Listado general de viajes
- Consulta por ID
- Actualización total y parcial
- Eliminación

Validaciones y Manejo de Errores:

Código | Causa | Descripción
400 | Campos faltantes o tipo inválido | Se requiere destination, days, travelers, budgetPerPerson
404 | Viaje no encontrado | El ID no existe en la lista
500 | Error interno | Fallo en la ejecución del servidor

Seguridad:
- No se requiere autenticación, API pública de simulación.
- No se almacena información sensible.
- Los datos se mantienen en memoria y se eliminan al reiniciar el servidor.

Ejemplos CURL:
Crear un viaje:
curl -X POST http://localhost:3000/travels -H "Content-Type: application/json" -d '{"destination":"Cartagena","days":5,"travelers":3,"transport":"avion","lodging":"hotel","activities":["playa","tour"],"budgetPerPerson":250000}'

Listar todos los viajes:
curl http://localhost:3000/travels

Obtener viaje por ID:
curl http://localhost:3000/travels/1

Notas Finales:

Este proyecto fue desarrollado con fines académicos para demostrar el uso de:
- Endpoints RESTful
- TypeScript con Express
- Tipado de datos y DTOs
- Validaciones básicas
- Almacenamiento temporal en memoria

El código está preparado para ser extendido con persistencia en base de datos (MongoDB, PostgreSQL u otras) en versiones futuras.
