import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';
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

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});
