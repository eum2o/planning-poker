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

# Define build arguments and set them as environment variables.
ARG REACT_APP_BACKEND_PORT=3001
ARG REACT_APP_BACKEND_HOSTNAME=localhost
ENV REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT
ENV REACT_APP_BACKEND_HOSTNAME=$REACT_APP_BACKEND_HOSTNAME

# Create a new .env file using the build arguments.
RUN echo "REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT" > .env
RUN echo "REACT_APP_BACKEND_HOSTNAME=$REACT_APP_BACKEND_HOSTNAME" >> .env

# Build for production.
RUN yarn build

# Expose ports for the backend server and the React app.
EXPOSE 3000
EXPOSE $REACT_APP_BACKEND_PORT

# Start the server.
CMD ["sh", "-c", "serve -s build -l 3000 & node backend/server.js"]
