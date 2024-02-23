import { push, ref, remove, set } from 'firebase/database';
import { IBalanceDetails } from './types';
import { getBalanceDetailsRef, getBalanceRef, getUserBalanceRef, getUserBalancesRef } from './refs';
import { database } from '.';

export const createBalance = (userId: string, title: string, currencyCode: string) => {
  const newUserBalanceRef = push(getUserBalancesRef(userId));
  const balanceId: string = newUserBalanceRef.key;
  const newBalance: IBalanceDetails = {
    users: {
      [userId]: 0,
    },
    id: balanceId,
    title,
    currency: currencyCode,
  };

  set(newUserBalanceRef, true);
  set(getBalanceDetailsRef(balanceId), newBalance);
};

export const updateBalance = async (
  balance: Omit<IBalanceDetails, 'users'>
) => {
  return await Promise.all([
    set(ref(database, `balances/${balance.id}/details/title`), balance.title),
    set(
      ref(database, `balances/${balance.id}/details/currency`),
      balance.currency
    ),
  ]);
};

export const deleteBalance = async (balance: IBalanceDetails) => {
  const userIds = Object.keys(balance.users);
  await Promise.all(
    userIds.map(async (uid) => {
      await remove(getUserBalanceRef(uid, balance.id));
    })
  );
  await remove(getBalanceRef(balance.id));
};

export const joinToBalance = (balanceId, userId) => {
  set(ref(database, `users/${userId}/balances/${balanceId}`), true);
  set(ref(database, `balances/${balanceId}/details/users/${userId}`), 0);
};
