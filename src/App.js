import { useReactiveVar } from '@apollo/client';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkModeVar, isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import UnKnownRoute from './screens/UnKnownRoute';
import { darkTheme, GlobalStyles, lightTheme } from './styles';
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <HelmetProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Switch>
          <Route path={routes.home} exact>
            {isLoggedIn ? <Home /> : <Login isLoggedIn={isLoggedIn} />}
          </Route>
          {!isLoggedIn ? (
            <Route path={routes.signUp} component={SignUp} />
          ) : (
            <Redirect to={routes.home} />
          )}
          <Route>
            <UnKnownRoute />
          </Route>
        </Switch>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
