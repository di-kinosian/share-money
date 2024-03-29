import { useMemo } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { useHistory, useParams } from 'react-router-dom';
import { Icon, Loader } from 'semantic-ui-react';
import { PageContent } from './styled';
import BalanceCard from './BalanceCard';
import { auth } from '../../firebase';
import * as s from './styled';
import History from './History';
import { useMultipleValues, useValue } from '../../firebase/hooks';
import { getBalanceDetailsRef } from '../../firebase/refs';
import {
  IBalanceDetails,
  IHistoryItem,
  IUserProfile,
} from '../../firebase/types';
import { ITransaction } from './types';
import TransactionWidget from './TransactionWidget';
import Modal from '../../components/Modal';
import {
  BodyText,
  Flex,
  H4,
  HorisontalSeparator,
} from '../../components/styled';
import QRCode from 'react-qr-code';
import copyToClipboard from '../../helpers/copyToClipboard';
import Button from '../../components/Button';
import {
  deleteBalance,
  joinToBalance,
  updateBalance,
} from '../../firebase/balance';
import { ROUTES } from '../../routes/constants';
import { useDisableScroll, useModalState } from '../../helpers/hooks';
import { AddButton } from '../../components/AddButton';
import CreateBalanceModal from '../../components/CreateBalanceModal';
import currencies from '../../constants/currencies.json';
import { formatMoney } from '../../helpers/money';
import { addTransaction, deleteTransaction } from '../../firebase/transactions';
import { Icons } from '@makhynenko/ui-components';
import NotFound from '../NotFound';

function Balance() {
  const {
    isOpen: isTransactionOpen,
    open: openTransaction,
    close: closeTransaction,
  } = useModalState();
  const {
    isOpen: isActionsOpen,
    open: openActions,
    close: closeActions,
  } = useModalState();
  const {
    isOpen: isShareOpen,
    open: openShare,
    close: closeShare,
  } = useModalState();
  const {
    isOpen: isDeleteConfirmation,
    open: openDeleteConfirmation,
    close: closeDeleteConfirmation,
  } = useModalState();
  const history = useHistory();
  const params = useParams<{ balanceId: string }>();
  const user = auth.currentUser;

  const {
    isOpen: isEditOpen,
    open: openEdit,
    close: closeEdit,
  } = useModalState();

  useDisableScroll(
    isTransactionOpen || isActionsOpen || isShareOpen || isDeleteConfirmation
  );

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
    return balance && user && !Object.keys(balance?.users).includes(user?.uid);
  }, [user, balance]);

  const onJoinClick = () => {
    joinToBalance(balance.id, user.uid);
  };

  const onAddTransaction = (transaction: ITransaction) => {
    addTransaction(balance, transaction);
    closeTransaction();
  };

  const onDeleteTransaction = (transaction: IHistoryItem) => {
    deleteTransaction(balance, transaction);
  };

  const usersLite = useMemo(
    () =>
      users
        ? users.map((user) => ({
            id: user?.id,
            name: user?.displayName || user?.email,
          }))
        : [],
    [users]
  );

  const navigateToHomePage = () => {
    history.push(ROUTES.HOME);
  };

  const onDelete = async () => {
    await deleteBalance(balance);
    navigateToHomePage();
  };

  const openTransactionModal = () => {
    openTransaction();
    closeActions();
  };

  const handleShare = async () => {
    await navigator.share({
      text: 'Share balance with your friend',
      url: window.location.href,
    });

    closeShare();
  };

  const onEdit = (title: string, currency: string) => {
    closeEdit();
    updateBalance({
      title,
      currency,
      id: balance.id,
    });
    closeActions();
  };

  if (loading) {
    return <Loader active />;
  }

  if (!balance) {
    return <NotFound isBalance />;
  }

  return (
    <PageContent>
      <s.GoHomeButton onClick={navigateToHomePage}>
        <Icons name="chevronLeft" color="#1a8a7d" />
        <BodyText color="#1a8a7d">Back to balances</BodyText>
      </s.GoHomeButton>
      <BalanceCard
        title={balance?.title}
        balance={formatMoney(
          userAmount,
          currencies[balance.currency]?.symbol_native
        )}
        openMenu={openActions}
      />
      <History
        balanceId={params.balanceId}
        userId={user?.uid}
        users={users}
        onDeleteTransaction={onDeleteTransaction}
        symbol={currencies[balance.currency]?.symbol_native}
      />
      <AddButton onClick={openTransactionModal} />
      <Modal
        isOpen={isActionsOpen}
        onClose={closeActions}
        header="Balance Operations"
      >
        <s.Actions>
          <s.Action onClick={openTransactionModal}>
            <Icon name="plus square outline" />
            <BodyText>Add Transaction</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action onClick={openEdit}>
            <Icon name="edit outline" />
            <BodyText>Edit</BodyText>
          </s.Action>
          <HorisontalSeparator />
          <s.Action
            onClick={() => {
              openShare();
              closeActions();
            }}
          >
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
          onSubmit={onAddTransaction}
          users={usersLite}
          userId={user?.uid}
        />
      </Modal>
      <Modal isOpen={isShareOpen} onClose={closeShare}>
        <s.ShareContent>
          <H4>Share Link</H4>
          <QRCode value={window.location.href} width="fit-content" />

          {navigator.share ? (
            <Button width="100%" variant="primary" onClick={handleShare}>
              Share
            </Button>
          ) : (
            <Button
              width="100%"
              variant="primary"
              onClick={() => {
                copyToClipboard(window.location.href);
                closeShare();
              }}
            >
              Copy link
            </Button>
          )}
        </s.ShareContent>
      </Modal>
      <Modal isOpen={isDeleteConfirmation} onClose={closeDeleteConfirmation}>
        <Flex padding="16px" gap="16px" direction="column">
          <H4>Confirm Balance Deletion</H4>
          <BodyText>
            You are about to delete a balance that involves other users. This
            action will remove the shared transaction history associated with
            this balance.
          </BodyText>
          <Flex direction="column" gap="8px">
            <Button onClick={onDelete} negative>
              Delete
            </Button>
            <Button onClick={closeDeleteConfirmation}>Cancel</Button>
          </Flex>
        </Flex>
      </Modal>
      <Modal isOpen={needToJoin} header={`Join Balance "${balance?.title}" `}>
        <Flex padding="16px" gap="16px" direction="column">
          <BodyText>
            Ready to simplify your group expenses? Click the "Join Balance"
            button below to join balance <strong>{balance?.title}</strong> with{' '}
            <strong>{users?.map((u) => u.displayName).join(', ')}</strong>
          </BodyText>
          <Flex direction="column" gap="8px" justify="center">
            <Button onClick={onJoinClick} variant="primary">
              Join Balance
            </Button>
            <Button onClick={navigateToHomePage}>Cancel</Button>
          </Flex>
        </Flex>
      </Modal>
      <CreateBalanceModal
        isOpen={isEditOpen}
        onClose={closeEdit}
        onSave={onEdit}
        data={balance}
      />
    </PageContent>
  );
}

export default Balance;
