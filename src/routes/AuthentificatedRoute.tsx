import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import { getUser } from "../modules/auth/duck";
import { ROUTES } from "./constants";

function AuthenticatedRoute(props) {
    const history = useHistory();
    const user = useSelector(getUser);

    useEffect(() => {
        if (!user) {
            console.log(
                `${ROUTES.LOGIN}?redirect=${history.location.pathname}`
            );
            console.log(history.location);
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
