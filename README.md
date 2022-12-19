# Ejercicio tecnico de IbisDev

para correr el proyecto necesita tener instalado docker y docker compose

### Backend

1. Abrir la consola den la carpeta del proyecto
2. Escribir `docker-compose up -d` para poner a funcionar la base de datos y el redis
3. Correr el comando `npm run dev`, este comando pondra funcionar el servidor backend en el puerto 8080, este proyecto cuenta con una documentacion swagger (open api) para su facil consulta, esta es en `localhost:8080/doc`, desde alli mismo se pueden enviar peticiones al backend

### Frontend

1. Abrir una consola en la carpeta raiz del proyecto,
2. Correr el comando `npm run dev:frontend`, este comenzara a correr en el puerto 3000

Encontrara el codigo del frontend en la carpeta `src/apps/frontend`
