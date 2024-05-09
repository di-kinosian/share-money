import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../../firebase';
import { IUserProfile } from '../../firebase/types';

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
    const data: IUserProfile = {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
    }
    yield set(ref(database, `users/${user._id}/profile`), data);
}
