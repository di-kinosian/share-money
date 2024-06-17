import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Balance from '../views/Balance';
import { ROUTES } from './constants';
import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';
import AuthenticatedRoute from './AuthentificatedRoute';
import AuthRoute from './AuthRoute';
import NotFound from '../views/NotFound';
import Admin from '../views/Admin';
import MyCapital from '../views/MyCapital/MyCapital';

function Routes() {
  return (
    <Switch>
      <Route exact={true} path={ROUTES.HOME}>
        <Home />
      </Route>
      <AuthRoute exact={true} path={ROUTES.LOGIN}>
        <Login />
      </AuthRoute>
      <AuthRoute exact={true} path={ROUTES.SIGNUP}>
        <Signup />
      </AuthRoute>
      <AuthenticatedRoute exact={true} path="/balance/:balanceId">
        <Balance />
      </AuthenticatedRoute>
      <AuthenticatedRoute
        exact={true}
        path={ROUTES.PROFILE}
        component={Profile}
      />
      <AuthenticatedRoute
        exact={true}
        path={ROUTES.CAPITAL}
        component={MyCapital}
      />

      <AuthenticatedRoute exact={true} path={ROUTES.ADMIN}>
				<Admin />
			</AuthenticatedRoute>
      <AuthenticatedRoute component={NotFound} path={'/*'} />
    </Switch>
  );
}

export default Routes;
