import { useReactiveVar } from '@apollo/client';
import { Switch, Route } from 'react-router-dom';
import { isLoggedInVar } from './apollo';
import Home from './screens/Home';
import Login from './screens/Login';
import UnKnownRoute from './screens/UnKnownRoute';
const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Home /> : <Login isLoggedIn={isLoggedIn} />}
        </Route>
        <Route>
          <UnKnownRoute />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
