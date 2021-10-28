import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../modules/auth/duck';
import { transformUser } from '../modules/auth/helpers';

export const useAuth = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                dispatch(loginSuccess(transformUser(user)));
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }, []);
};
