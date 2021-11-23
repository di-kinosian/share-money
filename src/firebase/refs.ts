import { ref } from 'firebase/database';
import { database } from '.';

export const getBalanceRef = (id: string) => ref(database, 'balances/' + id);

export const getBalanceDetailsRef = (id: string) =>
    ref(database, 'balances/' + id + '/details');

export const getBalanceHistoryRef = (id: string) =>
    ref(database, 'balances/' + id + '/history');

// Users

export const getUserBalancesRef = (userId: string) =>
    ref(database, 'users/' + userId + '/balances');

export const getUserProfileRef = (userId: string) =>
    ref(database, 'users/' + userId + '/profile');
