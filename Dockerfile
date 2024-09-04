# Stage 1: Build
FROM node:18 AS build
WORKDIR /app
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Transfer static files
FROM node:18 AS static-transfer
WORKDIR /usr/src/app/src/app
COPY --from=build /app/dist ./dist
