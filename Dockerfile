FROM node:19-alpine 

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND yarn.lock are copied.
# Copying this separately prevents re-running yarn install on every code change.
COPY package*.json yarn.lock ./

# Install dependencies.
RUN yarn install --production
RUN yarn global add serve

# Copy local code to the container image.
COPY . ./

ARG REACT_APP_SERVER_HOSTNAME=localhost
ENV REACT_APP_SERVER_HOSTNAME=$REACT_APP_SERVER_HOSTNAME

# Build for production.
RUN yarn build

# Expose ports 3000 (react), 3001 (backend socket.io port)
EXPOSE 3000
EXPOSE 3001

# Start the server.
CMD ["sh", "-c", "serve -s build -l 3000 & node server.js"]
