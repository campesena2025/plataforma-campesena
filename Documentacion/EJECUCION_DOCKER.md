# Ejecución del Proyecto Campesena con Docker

Esta guía describe los pasos necesarios para construir y ejecutar la aplicación Campesena utilizando Docker.

## Prerrequisitos

-   Tener [Docker](https://www.docker.com/get-started) instalado en tu sistema.
-   Tener un archivo `.env` en la raíz del proyecto con las variables de entorno necesarias para la aplicación.

## Pasos para la Ejecución

### 1. Construir la Imagen de Docker

Navega a la raíz del proyecto en tu terminal y ejecuta el siguiente comando para construir la imagen de Docker. Esto creará una imagen llamada `campesena-app`.

```bash
docker build -t campesena-app .
```

### 2. Ejecutar el Contenedor

Una vez que la imagen se ha construido correctamente, puedes iniciar un contenedor a partir de ella. El siguiente comando iniciará la aplicación y la hará accesible en `http://localhost:3000`.

Este comando utiliza la bandera `--env-file .env` para cargar las variables de entorno desde tu archivo `.env` local directamente en el contenedor, sin necesidad de incluir el archivo en la imagen.

```bash
docker run -p 3000:3000 --env-file .env --name campesena campesena-app
```

**Desglose del comando:**

-   `docker run`: Comando para crear e iniciar un nuevo contenedor.
-   `-p 3000:3000`: Mapea el puerto `3000` de tu máquina local al puerto `3000` del contenedor, donde se ejecuta la aplicación Next.js.
-   `--env-file .env`: Lee el archivo `.env` del directorio actual y pasa las variables al entorno del contenedor.
-   `--name campesena`: Asigna un nombre legible (`campesena`) al contenedor para facilitar su gestión (ver, detener, etc.).
-   `campesena-app`: El nombre de la imagen que se utilizará para crear el contenedor.

### 3. Verificar el Contenedor (Opcional)

Para verificar que el contenedor está en ejecución, puedes usar:

```bash
docker ps
```

Deberías ver un contenedor con el nombre `campesena` en la lista.

### 4. Detener y Eliminar el Contenedor (Opcional)

Para detener el contenedor, ejecuta:

```bash
docker stop campesena
```

Y para eliminarlo (después de detenerlo):

```bash
docker rm campesena
```