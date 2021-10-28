import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../../firebase';

export const signinService = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(
        (response) => response.user
    );

export const signupService = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password).then(
        (response) => response.user
    );
};

export const signoutService = () => signOut(auth);

export function* addUserToDatabaseService(user) {
    yield set(ref(database, `users/${user._id}/profile`), {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
    });
}
