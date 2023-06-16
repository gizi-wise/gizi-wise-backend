# Use the official NGINX base image
FROM nginx

# Copy the NGINX configuration file from the nginx-image folder to the container
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80