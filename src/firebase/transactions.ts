import { push, ref, remove, set, update } from 'firebase/database';
import { ITransaction } from '../views/Balance/types';
import { getBalanceHistoryItemRef, getBalanceHistoryRef } from './refs';
import { IBalanceDetails, IHistoryItem } from './types';
import { database } from '.';

export const addTransaction = (
  balance: IBalanceDetails,
  transaction: ITransaction
) => {
  const historyRef = getBalanceHistoryRef(balance.id);
  const newId = push(historyRef).key;
  const historyItem: IHistoryItem = {
    ...transaction,
    id: newId,
  };
  set(ref(database, `balances/${balance.id}/history/${newId}`), historyItem);
  const updates = {};
  Object.keys(transaction.paidUsers).forEach((id) => {
    updates[`balances/${balance.id}/details/users/${id}`] =
      balance.users[id] +
      transaction.paidUsers[id] -
      transaction.spentUsers[id];
  });
  update(ref(database), updates);
};

export const deleteTransaction = (
  balance: IBalanceDetails,
  transaction: IHistoryItem
) => {
  const newBalanceUsers = Object.entries(balance.users).reduce(
    (acc, [userId, userBalance]) => ({
      ...acc,
      [userId]:
        userBalance -
        (transaction.paidUsers[userId] || 0) +
        (transaction.spentUsers[userId] || 0),
    }),
    {}
  );

  const updates = {};

  Object.entries(newBalanceUsers).forEach(([id, amount]) => {
    updates[`balances/${balance.id}/details/users/${id}`] = amount;
  });

  remove(getBalanceHistoryItemRef(balance.id, transaction.id));
  update(ref(database), updates);
};

export const updateTransaction = (
  balance: IBalanceDetails,
  transaction: IHistoryItem,
  updatedTransaction: IHistoryItem
) => {
  // Update transaction details in the database
  set(
    ref(database, `balances/${balance.id}/history/${transaction.id}`),
    updatedTransaction
  );

  const updates = {};

  // Adjust balance for each user involved in the transaction
  Object.keys(updatedTransaction.paidUsers).forEach((id) => {
    const paidDiff =
      (updatedTransaction.paidUsers[id] || 0) -
      (transaction.paidUsers[id] || 0);
    const spentDiff =
      (updatedTransaction.spentUsers[id] || 0) -
      (transaction.spentUsers[id] || 0);

    updates[`balances/${balance.id}/details/users/${id}`] =
      balance.users[id] + paidDiff - spentDiff;
  });

  // Update the balance in the database
  update(ref(database), updates);
};