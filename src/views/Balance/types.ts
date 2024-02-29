import { IHistoryItem } from '../../firebase/types';

export interface ITransaction extends Omit<IHistoryItem, 'id'> {
  id?: string;
}
