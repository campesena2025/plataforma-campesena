# Usa una imagen base de Node
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /srv/app

# Copia package.json y package-lock.json o yarn.lock
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Construye el proyecto (opcional, depende del setup)
RUN npm run build

# Exponer el puerto para acceder a Strapi
EXPOSE 1337

# Comando para correr Strapi
CMD ["npm", "run", "develop"]