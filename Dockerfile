# ---------- Build frontend ----------
FROM node:22 AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# ---------- Build backend ----------
FROM node:22 AS backend-build

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ ./
RUN npm run build


# ---------- Production ----------
FROM node:22

WORKDIR /app

ENV NODE_ENV=production

# Backend production dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm ci --omit=dev

# Compiled backend
COPY --from=backend-build /app/backend/dist ./backend/dist

# Built frontend
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

CMD ["node", "backend/dist/index.js"]