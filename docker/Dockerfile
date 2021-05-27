# Frontend Build
FROM quay.io/blueshoe/node14.4-slim AS app

## Structure
RUN mkdir /code
WORKDIR /code

## Frontend building
### Copy code & install dependencies
COPY package*.json /code/
RUN npm i
COPY src /code/src
COPY babel.config.js vue.config.js tsconfig.json codegen.yml .browserslistrc .eslintrc.js .eslintignore /code/
COPY public /code/public

### Build ENV variables
ARG VUE_APP_BASE_URL
ARG VUE_APP_PUBLIC_PATH
ARG VUE_APP_I18N_LOCALE
ARG VUE_APP_I18N_FALLBACK_LOCALE
ARG VUE_APP_GRAPHQL_URL
ARG VUE_APP_KEYCLOAK_JS
ARG VUE_APP_KEYCLOAK_AUTHZ_JS
ARG VUE_APP_KEYCLOAK_URL
ARG VUE_APP_KEYCLOAK_REALM
ARG VUE_APP_KEYCLOAK_CLIENT_ID
ARG VUE_APP_UPLOAD_URL

### Build
RUN ["npm", "run", "build"]

# Nginx
FROM quay.io/bitnami/nginx:latest


## Nginx config
COPY nginx/blueshoe.conf /opt/bitnami/nginx/conf/server_blocks/blueshoe.conf
EXPOSE 8080

## Copy build assets from previous stage
COPY --from=app /code/dist /app


