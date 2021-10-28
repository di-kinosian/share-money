import { createAction } from 'redux-actions';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { transformUser } from './helpers';
import {
    addUserToDatabaseService,
    signinService,
    signoutService,
} from './services';
import { handleActions } from 'redux-actions';
import { all, put, takeLatest } from 'redux-saga/effects';
import { USER_STORAGE_KEY } from './constants';
import { auth } from '../../firebase';

const initialUserState = JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

const initialState = {
    user: initialUserState,
    loading: false,
    error: null,
    showLoginModal: false,
    showSignupModal: false,
};

const provider = new GoogleAuthProvider();

const login = createAction('AUTH/LOGIN');
export const loginSuccess = createAction('AUTH/LOGIN_SUCCESS');
const loginFailure = createAction('AUTH/LOGIN_FAILURE');

const signupFailure = createAction('AUTH/SIGNUP_FAILURE');

const externalSignIn = createAction('AUTH/EXTERNAL_SIGN_IN');

export const logout = createAction('AUTH/LOGOUT');

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
        [logout]: (state) => ({
            ...state,
            user: null,
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
        const user = transformUser(data);
        yield put(loginSuccess(user));
        yield addUserToDatabaseService(user);
    } catch (err) {
        yield put(loginFailure(err));
    }
}

function* externalSignInSaga(action) {
    try {
        const result = yield signInWithPopup(auth, provider);
        const user = transformUser(result.user);
        yield put(loginSuccess(user));
        yield addUserToDatabaseService(user);

    } catch (err) {
        yield put(signupFailure(err));
    }
}

function* persistUserSaga(action) {
    yield localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(action.payload)
    );
}

function* logoutSaga() {
    yield signoutService();
    localStorage.removeItem(USER_STORAGE_KEY);
}

export function* saga() {
    yield all([
        takeLatest(login, loginSaga),
        takeLatest([restoreUser, loginSuccess], persistUserSaga),
        takeLatest(logout, logoutSaga),
        takeLatest(externalSignIn, externalSignInSaga),
    ]);
}

export const getUser = (state) => state.auth.user;

export default reducer;

export { login, externalSignIn };
