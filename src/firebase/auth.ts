import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { onValue, set } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../modules/auth/duck';
import { transformUser } from '../modules/auth/helpers';
import { getUserProfileRef } from './refs';

export const useAuth = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                onValue(getUserProfileRef(user.uid), (snapshot) => {
                    const dbUserProfile = snapshot.val();
                    if (!dbUserProfile) {
                        set(getUserProfileRef(user.uid), {
                            id: user.uid,
                            displayName: user.displayName,
                            email: user.email,
                        })
                    }
                });
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                dispatch(loginSuccess(transformUser(user)));
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
