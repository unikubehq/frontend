/* eslint-disable import/no-extraneous-dependencies */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { createApolloProvider } from '@vue/apollo-option';
import useAuthStore from '@/stores/auth';
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
  const auth = useAuthStore();
  return {
    headers: {
      ...headers,
      authorization: auth.rawRpt ? `Bearer ${auth.rawRpt}` : '',
    },
  };
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: refreshLink.concat(authLink.concat(httpLink)),
  cache,
});

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});

export default apolloProvider;
