FROM node:19-alpine 

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
RUN npm install --only=production
RUN npm install -g serve

# Copy local code to the container image.
COPY . ./

ARG REACT_APP_SERVER_HOSTNAME=localhost
ENV REACT_APP_SERVER_HOSTNAME=$REACT_APP_SERVER_HOSTNAME

# Build for production.
RUN npm run build

# Expose ports 3000 (react), 3001 (backend socket.io port), and 5000 (backend rest port).
EXPOSE 3000
EXPOSE 3001
EXPOSE 5000

# Start the server.
CMD ["sh", "-c", "serve -s build -l 3000 & node server.js"]