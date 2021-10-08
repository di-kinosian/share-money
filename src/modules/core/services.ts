import { get, ref, remove, set } from 'firebase/database';
import { all } from 'redux-saga/effects';
import { database } from '../../firebase';

export function* deleteBalanceService(balanceId, userId) {
    yield remove(ref(database, 'userBalances/' + userId + '/' + balanceId));

    yield remove(
        ref(database, 'balanceDetails/' + balanceId + '/users/' + userId)
    );
}

export function* addBalanceService(balanceId, userId, newBalance) {
    yield set(ref(database, `userBalances/${userId}/${balanceId}`), true);
    yield set(ref(database, `balanceDetails/${balanceId}`), newBalance);
}

export function* addUserToBalanceService(balanceId, userId) {
    yield set(ref(database, `userBalances/${userId}/${balanceId}`), true);

    yield set(ref(database, `balanceDetails/${balanceId}/users/${userId}`), 0);
}

export function* addTransactionService(balance, transaction) {
    const amounts = { ...balance.users };
    Object.entries(transaction).forEach(([key, value]) => {
        amounts[key] = amounts[key] + value;
    });
    yield set(ref(database, `balanceDetails/${balance.id}/users`), amounts);
    yield set(
        ref(database, `balanceHistories/${balance.id}/${transaction.id}`),
        transaction
    );
}

export function* getBalanceHistoryService(balanceId) {
    const result = yield get(ref(database, `balanceHistories/${balanceId}`));

    return Object.values(result.val());
}

export function* getBalanceDetailsService(balanceId) {
    const result = yield get(ref(database, `balanceDetails/${balanceId}`));

    const balanceDetails = result.val();

    const userIds = Object.keys(balanceDetails.users);
    const users = (yield all(
        userIds.map((id) => get(ref(database, 'users/' + id)))
    )).map((b) => b.val());
    return {
        ...balanceDetails,
        users: users.map((user) => ({
            ...user,
            amount: balanceDetails.users[user.id],
        })),
    };
}

export function* addBalanceTransactionService(balance, transaction) {
    const newBalanceDetailsUsers = balance.users.reduce((acc, user) => {
        const spentAmount = parseFloat(transaction.spentUsers[user.id]);
        const paidAmount = parseFloat(transaction.paidUsers[user.id]);
        return {
            ...acc,
            [user.id]: user.amount + paidAmount - spentAmount,
        };
    }, {});
    yield set(
        ref(database, `balanceDetails/${balance.id}/users`),
        newBalanceDetailsUsers
    );

    yield set(
        ref(database, `balanceHistory/${balance.id}/${transaction.id}`),
        transaction
    );
}
