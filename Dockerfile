# Stage 1: Install dependencies
FROM node:20 AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Build the app
FROM node:20 AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Final image for production
FROM node:20 AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main"]

# Stage 4: Final image for development
FROM node:20 AS development
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:dev"]