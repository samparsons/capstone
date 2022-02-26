# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build
RUN mkdir /app 
# Set the working directory
WORKDIR /app

# Add the source code to app
COPY ./ /usr/local/app/

WORKDIR /usr/local/app/

# Install all the dependencies
RUN npm install
RUN npm i ng2-search-filter
# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# copy custom nginx.conf file so that AWS will be able to properly reload pages if you refresh the browser.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/foodbox /usr/share/nginx/html

# Expose port 80
EXPOSE 80