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
			.ref('balanceDetails/' + balanceId)
			.set({
				users: { [userId]: 0 },
			});
}