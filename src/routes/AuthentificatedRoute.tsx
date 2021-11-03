import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { getUser } from '../modules/auth/duck';
import { ROUTES } from './constants';


const AuthenticatedRoute: FC<RouteProps> = (props) => {
	const history = useHistory();
	const user = useSelector(getUser);

	useEffect(() => {
		if (!user) {
			history.push({
				pathname: ROUTES.LOGIN,
				search: `?redirect=${history.location.pathname}`,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return <Route {...props} />;
}

export default AuthenticatedRoute;
