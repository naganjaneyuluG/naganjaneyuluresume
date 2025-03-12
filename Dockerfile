
# Use Node.js LTS as base image
FROM node:23-alpine	

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .


# Expose port 80
EXPOSE 8080

# Start nginx
CMD ["npm", "run", "dev"]
