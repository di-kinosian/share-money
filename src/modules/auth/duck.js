import { createAction } from 'redux-actions';
import { transformUser } from '../../modules/auth/helpers';
import { addUserToDatabaseService, signinService, signoutService, signupService } from './services';
import { createActions, handleActions } from 'redux-actions';
import { all, put, takeLatest } from 'redux-saga/effects';
import { USER_STORAGE_KEY } from './constants';

const initialUserState = JSON.parse(localStorage.getItem('firebaseUser'));

const initialState = {
	user: initialUserState,
	loading: false,
	error: null,
	showLoginModal: false,
	showSignupModal: false,
};

const login = createAction('AUTH/LOGIN');
const loginSuccess = createAction('AUTH/LOGIN_SUCCESS');
const loginFailure = createAction('AUTH/LOGIN_FAILURE');

const signup = createAction('AUTH/SIGNUP');
const signupSuccess = createAction('AUTH/SIGNUP_SUCCESS');
const signupFailure = createAction('AUTH/SIGNUP_FAILURE');

export const logout = createAction(
	'AUTH/LOGOUT',
);

export const toggleLoginModal = createAction('AUTH/SHOW_LOGIN_MODAL');
export const toggleSignupModal = createAction('AUTH/SHOW_SIGNUP_MODAL');
export const restoreUser = createAction('AUTH/RESTORE_USER');

const reducer = handleActions(
	{
		[login]: (state) => ({
			...state,
			error: null,
			loading: true,
		}),
		[loginSuccess]: (state, action) => ({
			...state,
			user: action.payload,
			error: null,
			loading: false,
		}),
		[restoreUser]: (state, action) => ({
			...state,
			user: action.payload,
		}),
		[toggleLoginModal]: (state, action) => ({
			...state,
			showLoginModal: action.payload,
			showSignupModal: false,
		}),
		[toggleSignupModal]: (state, action) => ({
			...state,
			showSignupModal: action.payload,
			showLoginModal: false,
		}),
	},
	initialState
);

function* loginSaga(action) {
	try {
		const data = yield signinService(
			action.payload.email,
			action.payload.password
		);
		const user = transformUser(data)
		yield put(loginSuccess(user));
		yield addUserToDatabaseService(user)
	} catch (err) {
		yield put(loginFailure(err));
	}
}

function* signupSaga(action) {
	try {
		const data = yield signupService(
			action.payload.email,
			action.payload.password
		);
		yield put(signupSuccess(transformUser(data)));
	} catch (err) {
		yield put(signupFailure(err));
	}
}

function* persistUserSaga(action) {
    yield localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload))
}

function* logoutSaga() {
    yield signoutService()
}

export function* saga() {
	yield all([
		takeLatest(login, loginSaga),
		takeLatest(signup, signupSaga),
		takeLatest([restoreUser, loginSuccess], persistUserSaga),
        takeLatest(logout, logoutSaga),
	]);
}

export const getUser = (state) => state.auth.user;

export default reducer;

export { login, signup };
