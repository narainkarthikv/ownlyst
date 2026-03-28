# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build


# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to Nginx public folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]