export const getBalance = (state) => state.core.balance;
export const getHistory = (state) => state.core.history;

export const getUserBalances = (state) => state.core.userBalances || [];
export const getBalanceDetails = (state) => state.core.balanceDetails;
