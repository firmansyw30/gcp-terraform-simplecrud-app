# Using Node JS 20 Alpine as Image
FROM node:20-alpine

# Create working directory inside container
WORKDIR /project-inslope

# Copy package JSON
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy anything
COPY . .

# Expose Port
EXPOSE 8080

# Command to execute, change to "npm run dev" for local testing, "npm run start" for production
CMD [ "npm", "run", "start"]  