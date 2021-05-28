import { createAction } from "redux-actions";
import firebase from "../../config/firebase";
import { handleActions } from "redux-actions";
import { all, put, select, takeLatest } from "redux-saga/effects";
import { getBalance } from "./selectors";

const initialState = {
    balance: 0,
    history: [],
    isHistoryLoading: false,
    isBalanceLoading: false,
};

export const fetchBalance = createAction("CORE/FETCH_BALANCE");
export const fetchBalanceSuccess = createAction("CORE/FETCH_BALANCE_SUCCESS");

export const setBalance = createAction("CORE/SET_BALANCE");
export const addTransaction = createAction("CORE/ADD_TRANSACTION");

export const fetchHistory = createAction("CORE/FETCH_HISTORY");
export const fetchHistorySuccess = createAction("CORE/FETCH_HISTORY_SUCCESS");

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

export function* saga() {
    yield all([
        takeLatest(addTransaction, addHistoryItemSaga),
        takeLatest(fetchHistory, fetchHistorySaga),
        takeLatest(fetchBalance, fetchBalanceSaga),
    ]);
}

export default reducer;
