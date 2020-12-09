# unikube-frontend2

## Project setup
```
npm install
```

Create a file called `.env.development.local`:
```dotenv
VUE_APP_GRAPHQL_URL=http://localhost:8090/graphql
VUE_APP_AUTH_URL=http://localhost:8090
```

Run [docu-compose](https://gitlab.blueshoe.de/unikube/docu-compose/) locally.


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
