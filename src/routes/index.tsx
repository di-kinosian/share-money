import { Route, Switch } from 'react-router-dom';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Balance from '../views/Balance';
import { ROUTES } from './constants';
import Login from '../views/Auth/Login';
import Signup from '../views/Auth/Signup';
import AuthenticatedRoute from './AuthentificatedRoute';
import AuthRoute from './AuthRoute';
// import Admin from '../views/Admin';

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
			<AuthenticatedRoute exact={true} path={'/balance/:balanceId'}>
				<Balance />
			</AuthenticatedRoute>
			<AuthenticatedRoute
				exact={true}
				path={ROUTES.PROFILE}
				component={Profile}
			/>
			{/* <AuthenticatedRoute exact={true} path={ROUTES.ADMIN}>
				<Admin />
			</AuthenticatedRoute> */}
		</Switch>
	);
}

export default Routes;
