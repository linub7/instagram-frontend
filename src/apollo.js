import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookie from 'js-cookie';

const DARK_MODE = 'DARK_MODE';

export const isLoggedInVar = makeVar(Boolean(cookie.get('token')));
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

export const logUserIn = (token) => {
  cookie.set('token', token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  cookie.remove('token');
  isLoggedInVar(false);
  window.location.reload();
};

export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, 'enabled');
  darkModeVar(true);
};

export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const tokenId = cookie.get('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: tokenId,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
    },
  }),
});
