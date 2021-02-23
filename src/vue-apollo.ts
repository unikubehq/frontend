import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import VueApollo from 'vue-apollo';
import store from '@/store';
import router from './router';

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL,
});

const refreshLink = onError(({ networkError }: ErrorResponse) => {
  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    router.push({ name: 'login' });
  }
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: store.state.auth.rawRpt ? `Bearer ${store.state.auth.rawRpt}` : '',
  },
}));

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: refreshLink.concat(authLink.concat(httpLink)),
  cache,
});

export default function setupApolloProvider(): VueApollo {
  return new VueApollo({
    defaultClient: apolloClient,
  });
}
