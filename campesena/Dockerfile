# Etapa 1: Builder - Instala dependencias y construye la aplicación
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias (usando 'npm ci' para instalaciones limpias y rápidas)
RUN npm ci

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Runner - Configura el entorno de producción final
FROM node:20-alpine AS runner

WORKDIR /app

# Establece el entorno a producción, lo que deshabilita características de desarrollo
ENV NODE_ENV=production

# Crea un usuario y grupo no-root para mejorar la seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia los archivos de la compilación 'standalone' desde la etapa 'builder'
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambia al usuario no-root
USER nextjs

# Expone el puerto en el que corre la aplicación Next.js
EXPOSE 3000

# Comando para iniciar el servidor de la aplicación
CMD ["node", "server.js"]