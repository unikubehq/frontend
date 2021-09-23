
<p align="center">
  <img src="https://raw.githubusercontent.com/unikubehq/frontend/main/project_logo.png" width="400">
</p>
<p align="center">
  <a href="https://coveralls.io/github/unikubehq/frontend?branch=main"><img alt="Coverage Status" src="https://coveralls.io/repos/github/unikubehq/frontend/badge.svg?branch=main"></a>
  <a href="https://raw.githubusercontent.com/unikubehq/frontend/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"></a>
  <a href="https://github.com/unikubehq/frontend/releases"><img alt="GitHub release" src="https://img.shields.io/github/release/unikubehq/frontend.svg"></a>
</p>

# Unikube Frontend

## Table of contents

* [Development](#development)
  * [Authentication](#authentication)
  * [GraphQL](#graphql)
  * [Permissions](#permissions)
      * [CASL Example](#example-casl)
  * [New Releases](#new-releases)

## Development

Before you start - you need a local instance of the unikube cluster.

After that setup the frontend as follows:

```
npm install
```

The unikube frontend projects is mostly written with Vue, TypeScript and SASS. 

Notable packages used:

- [vuetify](https://vuetifyjs.com/)  
- [vue-apollo](https://apollo.vuejs.org/)
- [vue-axios](https://www.npmjs.com/package/vue-axios/)
- [vue-router](https://router.vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [GraphQL-Code-Generator](https://www.graphql-code-generator.com/)


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

**Compiles and hot-reloads for development**
```shell
npm run serve
```

**Compiles and minifies for production**
```shell
npm run build
```

**Run your unit tests**

Unit tests are written with [Jest](https://jestjs.io/) and [Jasmine](https://jasmine.github.io/).

```shell
npm run test:unit
```

**Run your end-to-end tests**

This command starts integration testing with [Cypress](https://www.cypress.io/). Cypress
runs through different views and imitates user workflows.
```shell
npm run test:e2e
# or
npm run test:e2e:ci # for CI
```

**Lints and fixes files**
```shell
npm run lint
```

### Authentication

Authentication as well as authorization happens via [Keycloak](https://www.keycloak.org/).
To make sure a user is authenticated before entering the frontend application
it (the VueJS app) is wrapped into a "Keycloak validation".

If everything is fine - the application is initialized with all its plugins.
Unauthenticated users will be redirected onto the Keycloak authentication page.

The Keycloak auth token is updated as soon as it is valid for less than 30 seconds.


### GraphQL

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

### Permissions
We're using [CASL](https://casl.js.org/) to handle frontend permissions. 
The `auth.ts` vuex store module converts information from the [Keycloak](https://www.keycloak.org/)
RPT token into CASL permissions.

CASL is neatly integrated with Vue in this project. Therefore, it is possible
to create a permission-based reactive frontend. Meaning as soon as the (rpt)
token for the frontend's requests gets updated the frontend rerenders based
on the updated permissions. Tokens usually have a short lifetime.

#### CASL Example

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

### New Releases

The versioning system used for this project is semantic versioning.

We're using [`release-it`](https://www.npmjs.com/package/release-it) and
[`auto-changelog`](https://www.npmjs.com/package/auto-changelog) for an automated release workflow.

Depending on the kind of release (patch, minor, major) you would like to create run the following
command:

```shell
npm run release patch
```

The command:
- updates the CHANGELOG.md
- creates a git tag for the new version
- adds a new release to Github
  
The creation of the tag triggers a job which builds a new Docker image  containing the 
frontend application, which then is served by NGINX.
