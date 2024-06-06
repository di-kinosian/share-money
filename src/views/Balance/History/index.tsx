import { useState, useMemo, useRef } from 'react';
import HistoryItem from './HistoryItem';
import { Icon, Loader } from 'semantic-ui-react';
import { useList, useMultipleValues, useValue } from '../../../firebase/hooks';
import {
  getBalanceDetailsRef,
  getBalanceHistoryRef,
  getNonRealUsersRef,
} from '../../../firebase/refs';
import {
  IBalanceDetails,
  IHistoryItem,
  IUserLite,
  IUserProfile,
} from '../../../firebase/types';
import * as s from './styled';
import { useModalState } from '../../../helpers/hooks';
import Modal from '../../../components/Modal';
import {
  BodyText,
  BodyTextHighlight,
  Flex,
  H5,
  HorisontalSeparator,
  VerticalSeparator,
} from '../../../components/styled';
import MoneyValue from '../../../components/MoneyValue';
import Button from '../../../components/Button';
import {
  formatToLocalDateString,
  formatTransactionDate,
} from '../../../helpers/format';
import { groupBy } from '../../../helpers/data';
import moment from 'moment';
import Field from '../../../components/Field';
import { Icons } from '@makhynenko/ui-components';
import { formatMoney } from '../../../helpers/money';
import TransactionWidget from '../TransactionWidget';
import { ITransaction } from '../types';
import { useParams } from 'react-router-dom';

interface IProps {
  balanceId: string;
  userId: string;
  users: IUserLite[];
  symbol?: string;
  onShareOpen?: () => void;
  openNotRealUser?: () => void;
  onDeleteTransaction: (transaction: IHistoryItem) => void;
  onEditTransaction: (
    oldTransaction: IHistoryItem,
    newTransaction: ITransaction
  ) => void;
}

const prepareGroups = (items: IHistoryItem[]) => {
  if (!items || items.length === 0) return [];
  const groupsMap = groupBy(items, (i) => moment(i.date).format('YYYY/MM/DD'));

  const groupPairs = Object.entries(groupsMap);

  const sortedGroupPairs = groupPairs.sort((a, b) =>
    a === b ? 0 : a > b ? -1 : 1
  );

  return sortedGroupPairs.map((pair) => ({
    date: formatTransactionDate(pair[0]),
    transactions: pair[1],
  }));
};

type EmptyHistoryProp = {
  onShareOpen?: () => void;
  openNotRealUser?: () => void;
};

export const EmptyHistory = ({
  onShareOpen,
  openNotRealUser,
}: EmptyHistoryProp) => {
  const params = useParams<{ balanceId: string }>();

  const balanceDetailsRef = useMemo(
    () => getBalanceDetailsRef(params.balanceId),
    [params.balanceId]
  );

  const { value: balance } = useValue<IBalanceDetails>(balanceDetailsRef);

  const userIds = useMemo(
    () => (balance ? Object.keys(balance?.users) : []),
    [balance]
  );
  const { list: users } = useMultipleValues<IUserProfile>(
    'users/',
    userIds,
    '/profile'
  );

  const nonRealUsersRef = useMemo(
    () => (balance ? getNonRealUsersRef(balance.id) : undefined),
    [balance]
  );

  const { list: nonRealUsersList } = useList<IUserLite>(nonRealUsersRef);

  return (
    <s.EmptyHistoryContainer>
      {users?.length > 1 || nonRealUsersList?.length ? (
        <>
          <H5>No Transactions Yet</H5>
          <BodyText>
            It looks like there are no transactions recorded here. Start
            tracking shared expenses and managing your balances by adding
            transactions. Simply tap the "+" button to get started!
          </BodyText>
          <H5>Also you can add extra user here</H5>
          <Button
            width="100%"
            variant="primary"
            onClick={() => {
              openNotRealUser();
            }}
          >
            Create user by your own
          </Button>
          <BodyText>
            *After creating a transaction, you will be able to add extra user in
            "Balance operation"
          </BodyText>
        </>
      ) : (
        <>
          <H5>You are the only one here!</H5>
          <BodyText>You can invite people to your balance</BodyText>
          <Button
            width="100%"
            variant="primary"
            onClick={() => {
              onShareOpen();
            }}
          >
            Invite
          </Button>
          <BodyText>or</BodyText>
          <Button
            width="100%"
            variant="primary"
            onClick={() => {
              openNotRealUser();
            }}
          >
            Create user by your own
          </Button>
        </>
      )}
    </s.EmptyHistoryContainer>
  );
};

const NoSearchResult = () => {
  return (
    <s.NoResult>
      <H5>No Result found</H5>
      <BodyText>Seems you have no transactions with such name.</BodyText>
    </s.NoResult>
  );
};

function History(props: IProps) {
  const ref = useRef<HTMLInputElement>();
  const balanceHistoryRef = useMemo(
    () => getBalanceHistoryRef(props.balanceId),
    [props.balanceId]
  );

  const { list, loading } = useList<IHistoryItem>(balanceHistoryRef);

  const {
    isOpen: isTransactionOpen,
    open: openTransaction,
    close: closeTransaction,
  } = useModalState();

  const {
    isOpen: isSoonOpen,
    open: openSoon,
    close: closeSoon,
  } = useModalState();

  const {
    isOpen: isDeleteOpen,
    open: openDelete,
    close: closeDelete,
  } = useModalState();
  const {
    isOpen: isEditOpen,
    open: openEdit,
    close: closeEdit,
  } = useModalState();

  const [selectedTransactionId, setSelectedTransactionId] = useState<string>();

  const selectedTransaction = useMemo(
    () => list?.find((item) => item.id === selectedTransactionId),
    [selectedTransactionId, list]
  );
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const filteredList = useMemo(
    () =>
      searchValue
        ? list.filter((transaction) => transaction.title.includes(searchValue))
        : list,
    [list, searchValue]
  );

  const transactionGroups = useMemo(
    () => prepareGroups(filteredList),
    [filteredList]
  );

  const onSelectTransaction = (data: IHistoryItem) => {
    openTransaction();
    setSelectedTransactionId(data.id);
  };

  const onConfirmDelete = () => {
    props.onDeleteTransaction(selectedTransaction);
    closeDelete();
    closeTransaction();
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    if (ref.current && !isSearchOpen) {
      ref.current.focus();
    }
  };

  const handleCloseSearchClick = () => {
    setIsSearchOpen(false);
    setSearchValue('');
  };

  const handleSearchBlur = (e) => {
    if (e.target.value.length === 0) {
      setIsSearchOpen(false);
      setSearchValue('');
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const renderTransactions = () => {
    return transactionGroups.length ? (
      transactionGroups.map((group) => (
        <s.Group key={group.date}>
          <s.DateLabel>
            <BodyTextHighlight>{group.date}</BodyTextHighlight>
          </s.DateLabel>
          <s.Transactions>
            {group.transactions.map((transaction) => (
              <HistoryItem
                id={transaction.id}
                title={transaction.title}
                date={transaction.date}
                key={transaction.id}
                data={transaction}
                users={props.users}
                userId={props.userId}
                symbol={props.symbol}
                onSelect={onSelectTransaction}
              />
            ))}
          </s.Transactions>
        </s.Group>
      ))
    ) : (
      <NoSearchResult />
    );
  };

  const renderHistoryContent = () => {
    return transactionGroups.length || searchValue ? (
      <>
        <s.SearchLayout>
          <s.SearchWrapper
            onClick={handleSearchClick}
            $isSearchOpen={isSearchOpen}
          >
            <s.SearchInput
              value={searchValue}
              type="text"
              placeholder="Search"
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
              ref={ref}
            />
            {isSearchOpen ? (
              <Icons name="cross" size={20} onClick={handleCloseSearchClick} />
            ) : (
              <Icons name="search" size={20} />
            )}
          </s.SearchWrapper>
        </s.SearchLayout>
        {renderTransactions()}
      </>
    ) : (
      <EmptyHistory
        onShareOpen={props.onShareOpen}
        openNotRealUser={props.openNotRealUser}
      />
    );
  };

  const onEditTransaction = (updatedTransaction: ITransaction) => {
    props.onEditTransaction(selectedTransaction, updatedTransaction);
    closeEdit();
  };

  return (
    <s.HistoryContainer>
      <s.HistoryHeader>
        <s.HistoryTitle>
          <H5>History</H5>
        </s.HistoryTitle>
        <HorisontalSeparator />
      </s.HistoryHeader>
      {loading ? <Loader active /> : renderHistoryContent()}
      <Modal
        isOpen={isTransactionOpen}
        onClose={closeTransaction}
        header="Transaction details"
      >
        <Flex padding="16px" justify="space-around">
          <Flex gap="4px" onClick={openDelete}>
            <Icon name="trash alternate outline" />
            <BodyTextHighlight>Delete</BodyTextHighlight>
          </Flex>
          <VerticalSeparator />
          <Flex gap="4px" onClick={openEdit}>
            <Icon name="edit outline" />
            <BodyTextHighlight>Edit</BodyTextHighlight>
          </Flex>
          <VerticalSeparator />
          <Flex gap="4px" onClick={openSoon}>
            <Icon name="share square outline" />
            <BodyTextHighlight>Share</BodyTextHighlight>
          </Flex>
        </Flex>
        <HorisontalSeparator />
        <s.TransactionDetails>
          <s.TransactionDetailsRow>
            <BodyText>Name</BodyText>
            <BodyText>{selectedTransaction?.title}</BodyText>
          </s.TransactionDetailsRow>
          <s.TransactionDetailsRow>
            <BodyText>Date</BodyText>
            <BodyText>
              {formatToLocalDateString(new Date(selectedTransaction?.date))}
            </BodyText>
          </s.TransactionDetailsRow>
          <s.TransactionDetailsRow>
            <BodyText>Total</BodyText>
            <BodyTextHighlight>
              {formatMoney(selectedTransaction?.amount, props.symbol)}
            </BodyTextHighlight>
          </s.TransactionDetailsRow>
          <Field label="Users">
            <s.Balances>
              {props.users?.length &&
                props.users
                  .filter(
                    (u) =>
                      (typeof selectedTransaction?.spentUsers[u.id] ===
                        'number' &&
                        selectedTransaction?.spentUsers[u.id] !== 0) ||
                      (typeof selectedTransaction?.spentUsers[u.id] ===
                        'number' &&
                        selectedTransaction?.paidUsers[u.id] !== 0)
                  )
                  .map((u) => {
                    const userBalance =
                      (selectedTransaction?.paidUsers[u.id] || 0) -
                      (selectedTransaction?.spentUsers[u.id] || 0);
                    return (
                      <s.DetailsCard key={u.id}>
                        <BodyTextHighlight>
                          {u.name || u.email}
                        </BodyTextHighlight>
                        <s.TransactionDetailsRow>
                          <BodyText>Paid</BodyText>
                          <BodyTextHighlight>
                            {formatMoney(
                              selectedTransaction?.paidUsers[u.id] || 0,
                              props.symbol
                            )}
                          </BodyTextHighlight>
                        </s.TransactionDetailsRow>
                        <s.TransactionDetailsRow>
                          <BodyText>Spent</BodyText>
                          <BodyTextHighlight>
                            {formatMoney(
                              selectedTransaction?.spentUsers[u.id] || 0,
                              props.symbol
                            )}
                          </BodyTextHighlight>
                        </s.TransactionDetailsRow>
                        <s.TransactionDetailsRow>
                          <BodyText>Balance</BodyText>
                          <MoneyValue
                            value={userBalance}
                            symbol={props.symbol}
                          />
                        </s.TransactionDetailsRow>
                      </s.DetailsCard>
                    );
                  })}
            </s.Balances>
          </Field>
          <Button onClick={closeTransaction}>Close</Button>
        </s.TransactionDetails>
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={closeDelete} zIndex={6}>
        <Flex padding="16px" direction="column" gap="16px">
          <BodyTextHighlight>
            Are you sure you want to delete the transaction?
          </BodyTextHighlight>
          <BodyText>
            This action cannot be undone. Deleting the transaction will
            permanently remove it from the balance.
          </BodyText>
          <Flex direction="column" gap="8px">
            <Button variant="negative" onClick={onConfirmDelete}>
              Delete
            </Button>
            <Button onClick={closeDelete}>Cancel</Button>
          </Flex>
        </Flex>
      </Modal>

      <Modal isOpen={isSoonOpen} onClose={closeSoon} zIndex={6}>
        <Flex padding="16px" direction="column" gap="16px">
          <BodyTextHighlight>Coming Soon!</BodyTextHighlight>
          <BodyText>
            The functionality is currently in development and will be available
            soon. Thank you for your patience!
          </BodyText>
          <Flex direction="column" gap="8px">
            <Button onClick={closeSoon}>Okay</Button>
          </Flex>
        </Flex>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={closeEdit} zIndex={6}>
        <TransactionWidget
          userId={props.userId}
          users={props.users?.map((u) => ({
            id: u?.id,
            name: u?.name || u?.email,
          }))}
          onSubmit={onEditTransaction}
          data={selectedTransaction}
        />
      </Modal>
    </s.HistoryContainer>
  );
}

export default History;
