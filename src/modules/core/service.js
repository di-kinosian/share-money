import firebase from '../../config/firebase';

export function* deleteBalanceService(balanceId, userId) {
	yield firebase
		.database()
		.ref('balances/' + balanceId + '/users/' + userId)
		.remove();

	yield firebase
		.database()
		.ref('userBalances/' + userId + '/' + balanceId)
		.remove();

	yield firebase
		.database()
		.ref('balanceDetails/' + balanceId + '/users/' + userId)
		.remove();
}

export function* addBalanceService(balanceId, userId, newBalance) {
	yield firebase
		.database()
		.ref('balances/' + balanceId)
		.set(newBalance);
	yield firebase
		.database()
		.ref(`userBalances/${userId}/${balanceId}`)
		.set(true);
	yield firebase
		.database()
		.ref(`balanceDetails/${balanceId}`)
		.set(newBalance);
}

export function* addUserToBalanceService(balanceId, userId) {
	yield firebase
		.database()
		.ref(`userBalances/${userId}/${balanceId}`)
		.set(true);
	yield firebase
		.database()
		.ref(`balanceDetails/${balanceId}/users/${userId}`)
		.set(0);
}

export function* addTransactionService(balance, transaction) {
	const amounts = { ...balance.users };
	Object.entries(transaction).forEach(([key, value]) => {
		amounts[key] = amounts[key] + value
	});
	yield firebase
		.database()
		.ref(`balanceDetails/${balanceId}/users`)
		.set(amounts);
	yield firebase
		.database()
		.ref(`balanceHistories/${balance.id}/${transaction.id}`)
		.set(transaction);
}

export function* getBalanceHistoryService(balanceId) {
	const result = yield firebase
		.database()
		.ref(`balanceHistories/${balanceId}`)

	return Object.values(result.val());
}

export function* getBalanceDetailsService(balanceId) {
	const result = yield firebase
		.database()
		.ref(`balanceDetails/${balanceId}`)

	return result.val();
}
