# syntax=docker/dockerfile:1

########################
# Stage 1: Frontend build (Vite + React)
########################
FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

# Install deps first (better layer caching)
COPY frontend/codexa/package.json frontend/codexa/package-lock.json ./
RUN npm ci

# Copy source
COPY frontend/codexa/ ./

# Vite env vars are baked in at build time.
# Render automatically passes service env vars as build args (same names).
ARG VITE_STREAM_API_KEY
ENV VITE_STREAM_API_KEY=$VITE_STREAM_API_KEY

RUN npm run build

########################
# Stage 2: Backend runtime (serves API + frontend from one server)
########################
FROM node:22-alpine AS backend-runtime

WORKDIR /app

ENV NODE_ENV=production
# Render sets PORT at runtime; this is the local fallback
ENV PORT=3000

# Install backend deps (omit devDeps like nodemon)
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/src ./src

# Copy frontend build output into backend/public (served by Express)
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000

# Single command: one server for API + frontend
CMD ["node", "src/server.js"]
