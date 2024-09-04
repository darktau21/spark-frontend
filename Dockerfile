# Stage 1: Build
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Transfer static files
FROM node:18 AS static-transfer
WORKDIR /usr/src/app/src/app
COPY --from=build /app/dist ./dist
