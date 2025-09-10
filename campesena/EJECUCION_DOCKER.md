# Ejecución del Proyecto Campesena con Docker

Esta guía describe los pasos necesarios para construir y ejecutar la aplicación Campesena utilizando Docker.

## Prerrequisitos

-   Tener [Docker](https://www.docker.com/get-started) instalado en tu sistema.
-   Conocer la URL de la API a la que se conectará la aplicación (ej. `http://host.docker.internal:1337`).

## Pasos para la Ejecución

### 1. Construir la Imagen de Docker

Navega a la raíz del proyecto en tu terminal y ejecuta el siguiente comando para construir la imagen de Docker. Esto creará una imagen llamada `campesena-app`.

```bash
docker build -t campesena-app .
```

### 2. Ejecutar el Contenedor

Una vez que la imagen se ha construido, puedes iniciar un contenedor. A continuación se muestran los comandos para diferentes sistemas operativos.

**Importante:** Reemplaza los valores de ejemplo (`http://host.docker.internal:1337`, `tu_auth_secret_aqui`) con tu configuración real.

**En Windows o macOS (con Docker Desktop):**

Usa el siguiente comando, pasando la URL de la API directamente con la bandera `-e`.

```bash
docker run -p 3000:3000 \
  -e "NEXT_PUBLIC_API_URL=http://host.docker.internal:1337" \
  -e "NEXTAUTH_URL=http://localhost:3000" \
  -e "AUTH_SECRET=u+mX91LuAGNfSvzm1QcJOTZSucM/YYpDXFxw2Uug4Ts=" \
  --name campesena \
  campesena-app
```

**En Linux:**

En Linux, es crucial añadir la bandera `--add-host` para que el contenedor pueda comunicarse con tu máquina local a través de `host.docker.internal`.

```bash
docker run -p 3000:3000 -e "NEXT_PUBLIC_API_URL=http://host.docker.internal:8000" --add-host=host.docker.internal:host-gateway --name campesena campesena-app
```

**Desglose del comando:**

-   `-p 3000:3000`: Mapea el puerto `3000` de tu máquina al puerto `3000` del contenedor.
-   `-e "VARIABLE=VALOR"`: Pasa una variable de entorno directamente al contenedor. Es el método más explícito.
-   `--add-host=host.docker.internal:host-gateway` (Solo Linux): Permite que el contenedor resuelva `host.docker.internal` a la IP de la máquina anfitriona.
-   `--name campesena`: Asigna un nombre legible al contenedor.
-   `campesena-app`: El nombre de la imagen a usar.

### 3. Verificar el Contenedor (Opcional)

Para verificar que el contenedor está en ejecución, puedes usar: `docker ps`

### 4. Detener y Eliminar el Contenedor (Opcional)

Para detener el contenedor, ejecuta: `docker stop campesena`

Para eliminarlo (después de detenerlo): `docker rm campesena`