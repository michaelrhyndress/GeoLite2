FROM node:alpine as frontend-stage
WORKDIR ./usr/src/app
COPY ./package*.json ./
RUN npm set progress=false && npm config set depth 0
RUN npm ci
COPY . .
RUN npm run build

# NGINX
FROM nginx

# Place Nginx config file
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# Remove default nginx website
RUN rm /etc/nginx/conf.d/default.conf
# Delete nginx html defaults
RUN rm -rf /usr/share/nginx/html/*

EXPOSE 80
COPY --from=frontend-stage /usr/src/app/build /usr/share/nginx/html