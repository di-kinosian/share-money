import { ref } from 'firebase/database';
import { database } from '.';

export const getBalanceRef = (id: string) => ref(database, 'balances/' + id);

export const getBalanceDetailsRef = (id: string) =>
  ref(database, 'balances/' + id + '/details');

export const getBalanceHistoryRef = (id: string) =>
  ref(database, 'balances/' + id + '/history');

export const getBalanceHistoryItemRef = (
  balanceId: string,
  historyItemId: string
) => ref(database, 'balances/' + balanceId + '/history/' + historyItemId);

// Users

export const getUserBalancesRef = (userId: string) =>
  ref(database, 'users/' + userId + '/balances');

export const getUserBalanceRef = (userId: string, balanceId: string) =>
  ref(database, 'users/' + userId + '/balances/' + balanceId);

export const getUserProfileRef = (userId: string) =>
  ref(database, 'users/' + userId + '/profile');

export const getNonRealUsersRef = (balanceId: string) =>
  ref(database, `balances/${balanceId}/nonRealUsers`);
