import { createAction } from 'redux-actions';
import { transformUser } from '../../modules/auth/helpers';
import { signinService, signupService } from './services';
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

export const { logout, logoutSuccess, logoutFailure } = createActions(
	'AUTH/LOGOUT',
	'AUTH/LOGOUT_SUCCESS',
	'AUTH/LOGOUT_FAILURE'
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
		yield put(loginSuccess(transformUser(data)));
	} catch (err) {
		yield put(loginFailure(err));
	}
}

function* signupSaga(action) {
	try {
		console.log('saga');
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

export function* saga() {
	yield all([
		takeLatest(login, loginSaga),
		takeLatest(signup, signupSaga),
		takeLatest([restoreUser, loginSuccess], persistUserSaga),
	]);
}

export const getUser = (state) => state.auth.user;

export default reducer;

export { login, signup };
