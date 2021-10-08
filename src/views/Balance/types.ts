import { Map } from '../../firebase/types';

export interface ITransaction {
    title: string;
    paidUsers: Map<number>;
    spentUsers: Map<number>;
    amount: string;
    date: string;
}
