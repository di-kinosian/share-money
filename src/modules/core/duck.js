import { createAction } from "redux-actions";
import { v4 as uuid } from "uuid";
import firebase from "../../config/firebase";
import { handleActions } from "redux-actions";
import { all, put, select, takeLatest } from "redux-saga/effects";
import { getBalance } from "./selectors";
import { getUser } from "../auth/duck";
import history from "../../config/history";

const initialState = {
    balance: 0,
    history: [],
    userBalances: [],
    isHistoryLoading: false,
    isBalanceLoading: false,
    isUserBalancesLoading: false,
    addBalanceInProgress: false,
};

export const fetchBalance = createAction("CORE/FETCH_BALANCE");
export const fetchBalanceSuccess = createAction("CORE/FETCH_BALANCE_SUCCESS");

export const fetchBalances = createAction("CORE/FETCH_BALANCES");
export const fetchBalancesSuccess = createAction("CORE/FETCH_BALANCES_SUCCESS");


export const setBalance = createAction("CORE/SET_BALANCE");
export const addTransaction = createAction("CORE/ADD_TRANSACTION");

export const fetchHistory = createAction("CORE/FETCH_HISTORY");
export const fetchHistorySuccess = createAction("CORE/FETCH_HISTORY_SUCCESS");
export const addBalace = createAction("CORE/ADD_BALANCE");

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
        [addBalace]: (state, action) => ({
            ...state,
            addBalanceInProgress: true,
        }),
    },
    initialState
);

function* addHistoryItemSaga(action) {
    try {
        const balance = yield select(getBalance);
        console.log(balance);
        yield firebase.database().ref("balance").set(action.payload.balance);
        yield firebase
            .database()
            .ref("history/" + action.payload.id)
            .set(action.payload);
    } catch (err) {
        console.error(err);
    }
}

function* fetchHistorySaga() {
    try {
        const result = yield firebase
            .database()
            .ref("history")
            .orderByChild("dateTime")
            .get();
        if (result.val()) {
            yield put(fetchHistorySuccess(Object.values(result.val())));
        }
    } catch (err) {
        console.error(err);
    }
}

function* fetchBalanceSaga() {
    try {
        const result = yield firebase.database().ref("balance").get();
        yield put(fetchBalanceSuccess(result.val()));
    } catch (err) {
        console.error(err);
    }
}

function* addBalaceSaga() {
    try {
        const user = yield select(getUser)
        const id = uuid();
        yield firebase.database().ref("balances/" + id).set({ users: { [user._id]: true}, id, title: 'New balance' });
        yield firebase.database().ref(`userBalances/${user._id}/${id}`).set(true);
        history.push('/balance/' + id)
       console.log('saga run', id)
    } catch (err) {
        console.error(err);
    }
}

function* fetchUserBalances() {
    try {
        const user = yield select(getUser)
        const result = (yield firebase.database().ref("userBalances/" + user._id).get()).val();
        const balanceIds = Object.keys(result)
        console.log('ids',balanceIds)
        if (balanceIds?.length) {
            const balances = (yield all(balanceIds.map(id => firebase.database().ref("balances/" + id).get()))).map(b => b.val())
            console.log('balances', balances);
            yield put(fetchBalancesSuccess(balances))
        }
       console.log('saga fetchUserBalances', result)
    } catch (err) {
        console.error(err);
    }
}

export function* saga() {
    yield all([
        takeLatest(addTransaction, addHistoryItemSaga),
        takeLatest(fetchHistory, fetchHistorySaga),
        takeLatest(fetchBalance, fetchBalanceSaga),
        takeLatest(addBalace, addBalaceSaga),
        takeLatest(fetchBalances, fetchUserBalances),
    ]);
}

export default reducer;
