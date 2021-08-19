import firebase from '../../config/firebase';

export const signinService = (email, password) =>
	firebase
		.auth()
		.signInWithEmailAndPassword(email, password)
		.then((response) => response.user);

export const signupService = (email, password) => {

	return firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then((response) => response.user);
};
//
// const signinWithGoogle = (redirect: string) => {
//   return firebase
//     .auth()
//     .signInWithPopup(new firebase.auth.GoogleAuthProvider())
//     .then((response) => {
//       if (redirect) {
//         Router.push(redirect)
//       }
//       return response.user;
//     });
// };
//
export const signoutService = () =>
	firebase
		.auth()
		.signOut()
		.then(() => true);

export function* addUserToDatabaseService (user) {
  yield firebase.database().ref(`users/${user._id}`).set({
    id: user._id,
		displayName: user.displayName,
		email: user.email,
	});
}
//
// const sendPasswordResetEmail = (email: string) => {
//   return firebase
//     .auth()
//     .sendPasswordResetEmail(email)
//     .then(() => {
//       return true;
//     });
// };
//
// const confirmPasswordReset = (code: string, password: string) => {
//   return firebase
//     .auth()
//     .confirmPasswordReset(code, password)
//     .then(() => {
//       return true;
//     });
// };
