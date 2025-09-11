# Usar una imagen base de Node.js LTS
FROM node:22-alpine

# Instalar dependencias necesarias para compilar algunas dependencias de Strapi
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

# Establecer el directorio de trabajo
WORKDIR /opt/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --production

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación Strapi
RUN npm run build

# Exponer el puerto que Strapi usa por defecto
EXPOSE 1337

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "start"]
