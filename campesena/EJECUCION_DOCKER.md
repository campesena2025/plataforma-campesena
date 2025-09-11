# Ejecución del Proyecto Campesena con Docker Compose

Esta guía describe los pasos necesarios para ejecutar la aplicación Campesena utilizando Docker Compose.

## Prerrequisitos
-   Tener [Docker](https://www.docker.com/get-started) y [Docker Compose](https://docs.docker.com/compose/install/) instalados en tu sistema.
-   Un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
    ```
    AUTH_SECRET="tu_secreto_de_autenticacion"
    NEXT_PUBLIC_API_URL="http://host.docker.internal:1337"
    NEXTAUTH_URL="http://localhost:3000"
    ```
    **Nota:** Reemplaza `"tu_secreto_de_autenticacion"` y la URL de la API con tus valores reales. `host.docker.internal` es una forma de que el contenedor se comunique con servicios que se ejecutan en tu máquina anfitriona.

## Pasos para la Ejecución

### 1. Construir y Ejecutar los Contenedores

Navega a la raíz del proyecto en tu terminal y ejecuta el siguiente comando. Este comando construirá la imagen de la aplicación (si no existe o si el código ha cambiado) y la iniciará en segundo plano.

```bash
docker-compose up -d --build
```

**Desglose del comando:**
-   `up`: Crea e inicia los contenedores.
-   `-d`: Modo "detached", ejecuta los contenedores en segundo plano.
-   `--build`: Fuerza la reconstrucción de la imagen antes de iniciar los contenedores.

### 2. Verificar el Contenedor

Para verificar que el contenedor está en ejecución, puedes usar:
```bash
docker-compose ps
```
O el comando estándar de Docker:
```bash
docker ps
```

### 3. Ver los Logs de la Aplicación

Para ver los logs del servicio `nextjs-app` en tiempo real:
```bash
docker-compose logs -f nextjs-app
```

### 4. Detener los Contenedores

Para detener y eliminar los contenedores, redes y volúmenes creados por `docker-compose up`, ejecuta:
```bash
docker-compose down
```
