import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory, RouteProps } from 'react-router-dom';
import { getUser } from '../modules/auth/duck';
import { ROUTES } from './constants';

const AuthRoute: FC<RouteProps> = (props) => {
    const history = useHistory();
    const user = useSelector(getUser);

    useEffect(() => {
        if (user) {
            if (history.location.search.includes('redirect')) {
                history.push(history.location.search.split('redirect=')[1]);
            } else {
                history.push(`${ROUTES.HOME}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <Route {...props} />;
};

export default AuthRoute;
