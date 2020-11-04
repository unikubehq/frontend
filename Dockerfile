# Frontend Build
FROM node:lts AS app

## Structure
RUN mkdir /code
WORKDIR /code

## Frontend building
### Copy code & install dependencies
COPY package*.json /code/
RUN npm i
COPY src /code/src
COPY babel.config.js vue.config.js tsconfig.json codegen.yml .browserslistrc .eslintrc.js /code/
COPY public /code/public

### Build ENV variables
ARG VUE_APP_BASE_URL
ARG VUE_APP_PUBLIC_PATH
ARG VUE_APP_I18N_LOCALE=en
ARG VUE_APP_I18N_FALLBACK_LOCALE=en

### Build
RUN ["npm", "run", "build"]

# Nginx
FROM nginx:1.17-alpine

## Structure
RUN mkdir /app
WORKDIR /app

## Nginx config
RUN ["rm", "/etc/nginx/conf.d/default.conf"]
COPY nginx/blueshoe.conf /etc/nginx/conf.d/
EXPOSE 8080

RUN chgrp -R nginx /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

## Copy build assets from previous stage
COPY --from=app /code/dist /app
