# Stage 1
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json .

# install dependencies
RUN npm install

# copy files and folders to the working directory
COPY . .

# build
RUN npm run build

# Stage 2
FROM node:18-alpine

WORKDIR /usr/src/app

# copy the bundle from the previous stage
COPY --from=builder /usr/src/app/dist .

# it doesn't work without it :'(
EXPOSE 4000

# run the app
CMD [ "node", "main.js" ]
