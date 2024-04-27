# Use official Node.js image with the desired version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

RUN npm run build

# Command to run your app
CMD ["node", "dist/index.js"]
