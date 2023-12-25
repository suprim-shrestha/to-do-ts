FROM node:lts-alpine

# Configure the main working directory inside the docker image.
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json .

# Install dependencies
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Expose the port the app runs in.
EXPOSE 5173

# Run the application.
CMD npm run dev -- --host