# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /my_docker

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the required dependencies in the container
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Specify the command to run when the container starts
CMD ["npm", "run", "start"]