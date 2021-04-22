# Unikube Frontend

## Project Setup

Before you start - you need a local instance of the unikube cluster.

After that setup the frontend as follows:

```
npm install
```

Create a file called `.env.development.local` (and adapt according to your cluster):
```dotenv
VUE_APP_UPLOAD_URL=http://gateway.unikube.127.0.0.1.nip.io:8085/upload
VUE_APP_GRAPHQL_URL=http://gateway.unikube.127.0.0.1.nip.io:8085/graphql
VUE_APP_KEYCLOAK_JS=/js/keycloak.js
VUE_APP_KEYCLOAK_AUTHZ_JS=/js/keycloak-authz.js
VUE_APP_KEYCLOAK_URL=http://keycloak.127.0.0.1.nip.io:8085/auth
VUE_APP_KEYCLOAK_REALM=unikube
VUE_APP_KEYCLOAK_CLIENT_ID=frontend
```

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

## General Information

The unikube frontend projects is mostly written with Vue, TypeScript and SASS. 

Notable packages used:

- [vuetify](https://vuetifyjs.com/)  
- [vue-apollo](https://apollo.vuejs.org/)
- [vue-axios](https://www.npmjs.com/package/vue-axios/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [GraphQL-Code-Generator](https://www.graphql-code-generator.com/)

## Authentication

Authentication as well as authorization happens via [Keycloak](https://www.keycloak.org/).
To make sure a user is authenticated before entering the frontend application
it (the VueJS app) is wrapped into a "Keycloak validation".

If everything is fine - the application is initialized with all its plugins.
If not the user is redirected onto the Keycloak authentication page.

The Keycloak auth token is updated as soon as it valid for less then 30 seconds.


## GraphQL

Unikube makes heavy use of GraphQL between frontend and multiple 
microservices. To perform queries we're leveraging [Apollo](https://www.apollographql.com/)
with [vue-apollo](https://apollo.vuejs.org/). 

For enhanced type-safety we're converting the GraphQL schema provided
by the API-Gateway into TypeScript types/enums/interfaces. With a local
cluster the TypeScript definitions can be updated via the following command.

```shell
npm run codegen
```

This command is provided by the [GraphQL-Code-Generator](https://www.graphql-code-generator.com/).
It is extended by a custom command (`npm run kindify`) which extends
the GraphQL converted nodes (TypeScript types then) by a field `kind`.
This field contains an identifier which then is used by CASL to determine
what kind of object it deals with when it comes to permissions.

The automatically generated types are stored within `generated/graphql.ts`.

## Permissions
We're using [CASL](https://casl.js.org/) to handle frontend permissions. 
The `auth.ts` vuex store module converts information from the [Keycloak](https://www.keycloak.org/)
RPT token into CASL permissions.

CASL is neatly integrated with Vue in this project. Therefore, it is possible
to create a permission-based reactive frontend. Meaning as soon as the (rpt)
token for the frontend's requests gets updated the frontend rerenders based
on the updated permissions. Tokens usually have a short lifetime.

### Example CASL

```typescript
import { TProjectNode } from './graphql';

export default class ProjectList extends Vue {
  get projects() {
    this.projectList.filter((project: TProjectNode) => {
      this.$can('view', project)
    })
  }
}
```

The example above may not be needed in a real case, since the backend
will probably not return any `TProjectNode` objects which are not viewable
for the user.