import { createAction } from 'redux-actions';
import { v4 as uuid } from 'uuid';
import { database } from '../../firebase';
import { handleActions } from 'redux-actions';
import { all, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { getBalance, getBalanceDetails } from './selectors';
import { getUser } from '../auth/duck';
import {
    addBalanceService,
    addBalanceTransactionService,
    addUserToBalanceService,
    deleteBalanceService,
    getBalanceDetailsService,
} from './services';
import { get, ref, set } from 'firebase/database';

const initialState = {
    balance: 0,
    history: [],
    userBalances: [],
    isHistoryLoading: false,
    isBalanceLoading: false,
    isUserBalancesLoading: false,
    isUserBalanceLoading: false,
    addBalanceInProgress: false,
    balanceDetails: null,
};

export const fetchBalance = createAction('CORE/FETCH_BALANCE');
export const fetchBalanceSuccess = createAction('CORE/FETCH_BALANCE_SUCCESS');

export const fetchBalances = createAction('CORE/FETCH_BALANCES');
export const fetchBalancesSuccess = createAction('CORE/FETCH_BALANCES_SUCCESS');

export const fetchBalanceById = createAction('CORE/FETCH_BALANCE_BY_ID');
export const fetchBalanceByIdSuccess = createAction(
    'CORE/FETCH_BALANCE_BY_ID_SUCCESS'
);

export const setBalance = createAction('CORE/SET_BALANCE');
export const addTransaction = createAction('CORE/ADD_TRANSACTION');

export const fetchHistory = createAction('CORE/FETCH_HISTORY');
export const fetchHistorySuccess = createAction('CORE/FETCH_HISTORY_SUCCESS');
export const addBalance = createAction('CORE/ADD_BALANCE');
export const addBalaceSuccess = createAction('CORE/ADD_BALANCE_SUCCESS');
export const deleteBalance = createAction('CORE/DELETE_BALANCE');

export const joinToBalance = createAction('CORE/JOIN_TO_BALANCE');

export const addBalanceTransaction = createAction(
    'CORE/ADD_BALANCE_TRANSACTION'
);

const reducer = handleActions(
    {
        [setBalance]: (state, action) => ({
            ...state,
            balance: action.payload,
        }),
        [addTransaction]: (state, action) => ({
            ...state,
            history: [action.payload, ...state.history],
        }),
        [fetchBalance]: (state) => ({
            ...state,
            isBalanceLoading: true,
        }),
        [fetchBalanceSuccess]: (state, action) => ({
            ...state,
            isBalanceLoading: false,
            balance: action.payload,
        }),
        [fetchHistory]: (state) => ({
            ...state,
            history: [],
            isHistoryLoading: true,
        }),
        [fetchHistorySuccess]: (state, action) => ({
            ...state,
            history: action.payload,
            isHistoryLoading: false,
        }),
        [fetchBalances]: (state, action) => ({
            ...state,
            isUserBalancesLoading: true,
        }),
        [fetchBalancesSuccess]: (state, action) => ({
            ...state,
            isUserBalancesLoading: false,
            userBalances: action.payload,
        }),
        [addBalance]: (state, action) => ({
            ...state,
            addBalanceInProgress: true,
        }),
        [addBalaceSuccess]: (state, action) => ({
            ...state,
            addBalanceInProgress: false,
            userBalances: [action.payload, ...state.userBalances],
        }),
        [fetchBalanceById]: (state) => ({
            ...state,
            isUserBalanceLoading: true,
        }),
        [fetchBalanceByIdSuccess]: (state, action) => ({
            ...state,
            isUserBalanceLoading: false,
            balanceDetails: action.payload,
        }),
        [deleteBalance]: (state, action) => ({
            ...state,
            userBalances: state.userBalances.filter(
                (item) => item.id !== action.payload
            ),
        }),
    },
    initialState
);

function* addHistoryItemSaga(action) {
    try {
        yield set(ref(database, 'balance'), action.payload.balance);
        yield set(
            ref(database, 'history/' + action.payload.id),
            action.payload
        );
    } catch (err) {
        console.error(err);
    }
}

function* fetchHistorySaga() {
    try {
        const result = yield get(ref(database, 'history'));
        if (result.val()) {
            yield put(fetchHistorySuccess(Object.values(result.val())));
        }
    } catch (err) {
        console.error(err);
    }
}

function* fetchBalanceSaga() {
    try {
        const result = yield get(ref(database, 'balance'));
        yield put(fetchBalanceSuccess(result.val()));
    } catch (err) {
        console.error(err);
    }
}

function* addBalaceSaga(action) {
    try {
        const user = yield select(getUser);
        const balanceId = uuid();
        const newBalance = {
            users: {
                [user._id]: 0,
            },
            id: balanceId,
            title: action.payload,
        };
        yield addBalanceService(balanceId, user._id, newBalance);
        yield put(addBalaceSuccess(newBalance));
    } catch (err) {
        console.error(err);
    }
}

function* fetchUserBalances() {
    try {
        const user = yield select(getUser);
        const result = (yield get(
            ref(database, 'userBalances/' + user._id)
        )).val();
        const balanceIds = Object.keys(result);
        if (balanceIds?.length) {
            const balances = (yield all(
                balanceIds.map((id) =>
                    get(ref(database, 'balanceDetails/' + id))
                )
            )).map((b) => b.val());
            yield put(fetchBalancesSuccess(balances));
        }
    } catch (err) {
        console.error(err);
    }
}

function* fetchBalanceByIdSaga(action) {
    try {
        const result = yield getBalanceDetailsService(action.payload);
        yield put(fetchBalanceByIdSuccess(result));
    } catch (err) {
        console.error(err);
    }
}

function* refetchBalanceSaga() {
    try {
        const balance = yield select(getBalanceDetails);
        yield put(fetchBalanceById(balance.id));
    } catch (err) {
        console.error(err);
    }
}

function* deleteBalanceSaga(action) {
    try {
        const user = yield select(getUser);
        yield deleteBalanceService(action.payload, user._id);
    } catch (err) {
        console.error(err);
    }
}

function* joinToBalanceSaga(action) {
    try {
        const balance = yield select(getBalanceDetails);
        const user = yield select(getUser);
        yield addUserToBalanceService(balance.id, user._id);
        yield refetchBalanceSaga();
    } catch (err) {
        console.error(err);
    }
}

function* addBalanceTransactionSaga(action) {
    try {
        const balance = yield select(getBalanceDetails);
        yield addBalanceTransactionService(balance, action.payload);
        yield refetchBalanceSaga();
    } catch (err) {
        console.error(err);
    }
}

export function* saga() {
    yield all([
        takeLatest(addTransaction, addHistoryItemSaga),
        takeLatest(fetchHistory, fetchHistorySaga),
        takeLatest(fetchBalance, fetchBalanceSaga),
        takeLatest(addBalance, addBalaceSaga),
        takeLatest(fetchBalances, fetchUserBalances),
        takeLatest(fetchBalanceById, fetchBalanceByIdSaga),
        takeEvery(deleteBalance, deleteBalanceSaga),
        takeLatest(joinToBalance, joinToBalanceSaga),
        takeEvery(addBalanceTransaction, addBalanceTransactionSaga),
    ]);
}

export default reducer;
