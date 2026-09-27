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

# --- Vite env vars are baked in at build time ---
# On Render: add these as Environment Variables on the service
# and they are automatically passed as build args.
ARG VITE_API_URL
ARG VITE_FRONTEND_URL
ARG VITE_STREAM_API_KEY
ENV VITE_API_URL=$VITE_API_URL \
    VITE_FRONTEND_URL=$VITE_FRONTEND_URL \
    VITE_STREAM_API_KEY=$VITE_STREAM_API_KEY

RUN npm run build

########################
# Stage 2: Backend runtime
########################
FROM node:22-alpine AS backend-runtime

WORKDIR /app

ENV NODE_ENV=production
# Render sets PORT, but keep a sane default
ENV PORT=3000

# Install backend deps (omit devDeps)
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/src ./src
COPY backend/nodemon.json ./

# Copy frontend build output into backend/public
COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000

# Single command: one server for API + frontend
CMD ["node", "src/server.js"]
