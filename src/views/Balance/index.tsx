import { useMemo, useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';
import { useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { PageContent } from './styled';
import { NewTransactionWidget } from './NewTransactionWidget';
import BalanceCard from './BalanceCard';
import { auth, database } from '../../firebase';
import EmptyState from './EmptyState';
import * as s from './styled';
import { formatMoney } from '../../helpers/format';
import History from './History';
import { useMultipleValues, useValue } from '../../firebase/hooks';
import { getBalanceDetailsRef, getBalanceHistoryRef } from '../../firebase/refs';
import { IBalanceDetails, IHistoryItem, IUserProfile } from '../../firebase/types';
import { push, ref, set, update } from 'firebase/database';
import { ITransaction } from './types';

// Firebase
const joinToBalance = (balanceId, userId) => {
    set(ref(database, `users/${userId}/balances/${balanceId}`), true);
    set(ref(database, `balances/${balanceId}/details/users/${userId}`), 0);
};

const addTransaction = (balance: IBalanceDetails, transaction: ITransaction) => {
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
            balance.users[id] + transaction.paidUsers[id] - transaction.spentUsers[id];
    });
    update(ref(database), updates);
};

function Balance() {
    const params = useParams<{ balanceId: string }>();
    const user = auth.currentUser;
    const [isCreating, setIsCreating] = useState(false);

    const { value: balance, loading } = useValue<IBalanceDetails>(getBalanceDetailsRef(params.balanceId));

    const userIds = useMemo(() => (balance ? Object.keys(balance?.users) : []), [balance]);

    const { list: users } = useMultipleValues<IUserProfile>('users/', userIds, '/profile');

    const userAmount = useMemo(() => {
        return balance && user && balance.users[user.uid];
    }, [balance, user]);

    const needToJoin = useMemo(() => {
        return balance && user && !Object.keys(balance?.users).includes(user?.uid);
    }, [user, balance]);

    const onJoinClick = () => {
        joinToBalance(balance.id, user.uid);
    };

    const onAddClick = () => {
        setIsCreating(true);
    };
    const onCloseClick = () => {
        setIsCreating(false);
    };

    const onAddTransaction = (transaction) => {
        console.log(transaction);

        addTransaction(balance, transaction);
    };

    const isEmptyBalance = useMemo(
        () => balance && userIds.length === 1 && userIds[0] === user?.uid,
        [balance, user, userIds]
    );

    if (loading) {
        return <Loader active />;
    }

    if (needToJoin) {
        return (
            <s.PageContainer>
                <div className="join-btn" onClick={onJoinClick}>
                    + JOIN
                </div>
            </s.PageContainer>
        );
    }

    if (isEmptyBalance) {
        return <EmptyState />;
    }

    return (
        <PageContent>
            <BalanceCard onAddClick={onAddClick} balance={formatMoney(userAmount)} />
            {isCreating && (
                <NewTransactionWidget
                    users={users.map((user) => ({
                        id: user.id,
                        name: user.displayName || user.email,
                    }))}
                    onClose={onCloseClick}
                    onAdd={onAddTransaction}
                />
            )}
            <History balanceId={params.balanceId} userId={user?.uid} users={users} />
        </PageContent>
    );
}

export default Balance;
