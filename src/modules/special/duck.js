import moment from "moment";
import { createAction, handleActions } from 'redux-actions';
import { DATE_FORMAT, TIME_FORMAT, USERS } from "./constants";

const initialState = {
	title: '',
	amount: '0.00',
	date: moment().format(DATE_FORMAT),
	time: moment().format(TIME_FORMAT),
	payer: USERS[0],
};

export const changeTitle = createAction('SPECIAL/CHANGE_TITLE');
export const changeAmount = createAction('SPECIAL/CHANGE_AMOUNT');
export const changeDate = createAction('SPECIAL/CHANGE_DATE');
export const changeTime = createAction('SPECIAL/CHANGE_TIME');
export const changePayer = createAction('SPECIAL/CHANGE_PAYER');

const reducer = handleActions(
	{
		[changeTitle]: (state, action) => ({
			...state,
			title: action.payload,
		}),

		[changeAmount]: (state, action) => ({
			...state,
			amount: action.payload,
		}),

		[changeDate]: (state, action) => ({
			...state,
			date: action.payload,
		}),
		[changeTime]: (state, action) => ({
			...state,
			time: action.payload,
		}),
		[changePayer]: (state, action) => ({
			...state,
			payer: action.payload,
		})
	},
	initialState
);

export default reducer;
