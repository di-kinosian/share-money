import { combineReducers } from "redux";
import { all } from "redux-saga/effects";

import authEditorReducer, { saga as authSaga } from "./auth/duck";
import coreReducer, { saga as coreSaga } from "./core/duck";

export const rootReducer = combineReducers({
    auth: authEditorReducer,
    core: coreReducer,
});

export function* saga() {
    yield all([authSaga(), coreSaga()]);
}
