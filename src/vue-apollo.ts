import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import VueApollo from 'vue-apollo';
import router from './router';

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL,
});

const refreshLink = onError(({ networkError }: ErrorResponse) => {
  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    router.push({ name: 'login' });
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: refreshLink.concat(authLink.concat(httpLink)),
  cache,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

export default apolloProvider;
