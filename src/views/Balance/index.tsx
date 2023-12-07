import { useMemo } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useHistory, useParams } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import { PageContent } from './styled';
import BalanceCard from './BalanceCard';
import { auth, database } from '../../firebase';
import * as s from './styled';
import { formatMoney } from '../../helpers/format';
import History from './History';
import { useMultipleValues, useValue } from '../../firebase/hooks';
import {
  getBalanceDetailsRef,
  getBalanceHistoryRef,
} from '../../firebase/refs';
import {
  IBalanceDetails,
  IHistoryItem,
  IUserProfile,
} from '../../firebase/types';
import { push, ref, set, update, } from 'firebase/database';
import { ITransaction } from './types';
import TransactionWidget from './TransactionWidget';
import Modal from '../../components/Modal';
import { BodyText, Flex, H4, HorisontalSeparator } from '../../components/styled';
import QRCode from 'react-qr-code';
import copyToClipboard from '../../helpers/copyToClipboard';
import Button from '../../components/Button';
import { deleteBalance } from '../../firebase/balance';
import { ROUTES } from '../../routes/constants';
import { useModalState } from '../../helpers/hooks';

// Firebase
const joinToBalance = (balanceId, userId) => {
  set(ref(database, `users/${userId}/balances/${balanceId}`), true);
  set(ref(database, `balances/${balanceId}/details/users/${userId}`), 0);
};

const addTransaction = (
  balance: IBalanceDetails,
  transaction: ITransaction
) => {
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
      balance.users[id] +
      transaction.paidUsers[id] -
      transaction.spentUsers[id];
  });
  update(ref(database), updates);
};

function Balance() {
  const { isOpen: isTransactionOpen, open: openTransaction, close: closeTransaction } = useModalState()
  const { isOpen: isActionsOpen, open: openActions, close: closeActions } = useModalState()
  const { isOpen: isShareOpen, open: openShare, close: closeShare } = useModalState()
  const { isOpen: isDeleteConfirmation, open: openDeleteConfirmation, close: closeDeleteConfirmation } = useModalState()
  const history = useHistory()
  const params = useParams<{ balanceId: string }>();
  const user = auth.currentUser;

  const { value: balance, loading } = useValue<IBalanceDetails>(
    getBalanceDetailsRef(params.balanceId)
  );

  const userIds = useMemo(
    () => (balance ? Object.keys(balance?.users) : []),
    [balance]
  );

  const { list: users } = useMultipleValues<IUserProfile>(
    'users/',
    userIds,
    '/profile'
  );

  const userAmount = useMemo(() => {
    return balance && user && balance.users[user.uid];
  }, [balance, user]);

  const needToJoin = useMemo(() => {
    return (
      balance && user && !Object.keys(balance?.users).includes(user?.uid)
    );
  }, [user, balance]);

  const onJoinClick = () => {
    joinToBalance(balance.id, user.uid);
  };

  const onAddTransaction = (transaction: ITransaction) => {
    addTransaction(balance, transaction);
    closeTransaction()
  };

  if (loading) {
    return <Loader active />;
  }

  if (needToJoin) {
    return (
      <s.JoinButton onClick={onJoinClick}>+ JOIN</s.JoinButton>
    );
  }

  const onDelete = async () => {
    await deleteBalance(balance)
    history.push(ROUTES.HOME)
  }

  const openTransactionModal = () => {
    openTransaction()
    closeActions()
  }

  const usersLite = users ? users.map((user) => ({
    id: user?.id,
    name: user?.displayName || user?.email,
  })) : []

  return (
    <PageContent>
      <BalanceCard
        title={balance?.title}
        balance={formatMoney(userAmount)}
        openMenu={openActions}
      />
      <History
        balanceId={params.balanceId}
        userId={user?.uid}
        users={users}
      />
      <Modal isOpen={isActionsOpen} onClose={closeActions} header="Balance Operations">
        <s.Actions>
          <s.Action onClick={openTransactionModal}>
            <Icon name="plus square outline" />
            <BodyText>Add Transaction</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action>
            <Icon name="edit outline" />
            <BodyText>Edit</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action onClick={() => { openShare(); closeActions() }}>
            <Icon name="share square outline" />
            <BodyText>Share</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action onClick={openDeleteConfirmation}>
            <Icon name="trash alternate outline" />
            <BodyText>Delete</BodyText>
          </s.Action>
        </s.Actions>
      </Modal>
      <Modal isOpen={isTransactionOpen} onClose={closeTransaction}>
        <TransactionWidget
          onAdd={onAddTransaction}
          users={usersLite}
          isOpen={isTransactionOpen}
          userId={user?.uid}
        />
      </Modal>
      <Modal isOpen={isShareOpen} onClose={closeShare}>
        <s.ShareContent>
          <H4>Share Link</H4>
          <QRCode value={window.location.href} width="fit-content" />
          <Button width='100%' variant="primary" onClick={() => { copyToClipboard(window.location.href); closeShare() }}>Copy link</Button>
        </s.ShareContent>
      </Modal>
      <Modal isOpen={isDeleteConfirmation} onClose={closeDeleteConfirmation}>
        <Flex padding="16px" gap="16px" direction='column'>
          <H4>Confirm Balance Deletion</H4>
          <BodyText>
            You are about to delete a balance that involves other users. This action will remove the shared transaction history associated with this balance.
          </BodyText>
          <Flex direction="column" gap="8px">
            <Button onClick={onDelete} negative>Delete</Button>
            <Button onClick={closeDeleteConfirmation}>Cancel</Button>
          </Flex>
        </Flex>
      </Modal>
    </PageContent>
  );
}

export default Balance;
