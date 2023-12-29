# Stage 1: Build stage
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy only package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Build app
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy only necessary files from the build stage
# COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env ./

# Start the app
CMD [ "node", "./dist/main.js" ]
