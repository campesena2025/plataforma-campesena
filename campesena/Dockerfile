# Etapa 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Define ENVs para build-time
ARG NEXT_PUBLIC_API_URL
ARG AUTH_SECRET
ARG NEXTAUTH_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

# Copia dependencias
COPY package*.json ./
RUN npm ci

# Copia código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa 2: Runner
FROM node:20-alpine AS runner

# Ensure all security patches are applied
RUN apk update && apk upgrade --no-cache

WORKDIR /app

ENV NODE_ENV=production

# Define ENVs para runtime
ARG NEXT_PUBLIC_API_URL
ARG AUTH_SECRET
ARG NEXTAUTH_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV AUTH_SECRET=$AUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]