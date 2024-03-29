export type Map<T> = {
  [key: string]: T;
};

export interface IHistoryItem {
  id: string;
  title: string;
  paidUsers: Map<number>;
  spentUsers: Map<number>;
  amount: string;
  date: string;
}

export interface IBalanceState {
  details: IBalanceDetails;
  history: Map<IHistoryItem>;
}

export interface IBalanceDetails {
  title: string;
  id: string;
  users: Map<number>;
  currency: string;
}

export interface IUserProfile {
  id: string;
  displayName: string;
  email: string;
}

export interface IUserState {
  profile: IUserProfile;
  balances: Map<IBalanceDetails>;
}

export interface IDataBase {
  users: Map<IUserState>;
  balances: Map<IBalanceState>;
}
