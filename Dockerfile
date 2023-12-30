FROM node:18-alpine

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

EXPOSE 4000

# Start the app
CMD [ "node", "./dist/main.js" ]
