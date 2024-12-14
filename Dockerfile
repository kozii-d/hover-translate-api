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

# Stage 3: Base image for production and development
FROM node:20 AS base
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY generateGoogleCredentials.sh ./
RUN chmod +x generateGoogleCredentials.sh
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/google-credentials.json

# Stage 4: Final image for production
FROM base AS production
COPY --from=builder /app/dist ./dist
COPY package*.json ./
COPY tsconfig*.json ./
COPY database ./database
EXPOSE 3000
ENTRYPOINT ["sh", "generateGoogleCredentials.sh"]
CMD ["node", "dist/main"]

# Stage 5: Final image for development
FROM base AS development
COPY . .
EXPOSE 3000
ENTRYPOINT ["sh", "generateGoogleCredentials.sh"]
CMD ["npm", "run", "start:dev"]