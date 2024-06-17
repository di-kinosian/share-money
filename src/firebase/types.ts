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
  nonRealUsers: IUserLite;
}

export interface IBalanceDetails {
  title: string;
  id: string;
  users: Map<number>;
  currency: string;
}

export interface IUserLite {
  name: string;
  id: string;
  email?: string;
}

export interface IUserProfile {
  id: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

export interface IUserState {
  profile: IUserProfile;
  balances: Map<IBalanceDetails>;
}

interface IReport {
  id: string;
  date: string;
  currency: string;
  totalAmount: number;
  fieldAmounts: Map<number>
}

interface IField {
  id: string;
  currency: string;
  name: string;
}

interface ICapitalConfig {
  basicCurrency: string;
  fields: Map<IField>;
}

export interface ICapitalState {
  reports: Map<IReport>;
  config: ICapitalConfig;
}

export interface IDataBase {
  users: Map<IUserState>;
  balances: Map<IBalanceState>;
  capitals: Map<IBalanceState>
}
