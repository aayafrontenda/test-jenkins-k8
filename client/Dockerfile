# Use a specific version of node to avoid unexpected changes with 'latest'
FROM node:22-slim as builder

# Set the environment variable for PNPM store location
ENV PNPM_STORE="/pnpm-store"

# Include the PNPM store in the PATH for easy access to binaries
ENV PATH="/pnpm:$PATH"

# Enable corepack to manage package managers
RUN corepack enable

# Create and set the working directory
RUN mkdir /app
WORKDIR /app

# Copy package files
COPY ./client/pnpm-lock.yaml ./client/package.json ./

# Configure PNPM to use the persistent store directory
RUN pnpm config set store-dir /pnpm-store

# Install dependencies using the persistent cache
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY ./client .

# Build the application
RUN pnpm run build:webpack