import { IHistoryItem } from '../../firebase/types';

export interface ITransaction extends Omit<IHistoryItem, 'id'> {
  id?: string;
}

export enum BalanceModal {
  EditBalance = 'editBalance',
  JoinBalance = 'joinBalance',
  DeleteBalanceConfirmation = 'deleteBalanceConfirmation',
  ShareBalance = 'shareBalance',
  TransactionCreate = 'transactionCreate',
  BalanceActions = 'balanceActions'
}