import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
import cookie from 'js-cookie';

export const isLoggedInVar = makeVar(Boolean(cookie.get('token')));
export const darkModeVar = makeVar(false);

export const logUserIn = (token) => {
  cookie.set('token', token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  cookie.remove('token');
  isLoggedInVar(false);
  window.location.reload();
};
export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
