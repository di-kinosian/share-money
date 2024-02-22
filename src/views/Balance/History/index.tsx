import { useState, useMemo } from 'react';
import HistoryItem from './HistoryItem';
import { Icon, Loader } from 'semantic-ui-react';
import { useList } from '../../../firebase/hooks';
import { getBalanceHistoryRef } from '../../../firebase/refs';
import { IHistoryItem, IUserProfile } from '../../../firebase/types';
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
import { formatMoney } from '../../../helpers/money';

interface IProps {
  balanceId: string;
  userId: string;
  users: IUserProfile[];
  symbol?: string;
  onDeleteTransaction: (transaction: IHistoryItem) => void;
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

const EmptyHistory = () => {
  return (
    <s.EmptyHistoryContainer>
      <H5>No Transactions Yet</H5>
      <BodyText>
        It looks like there are no transactions recorded here. Start tracking
        shared expenses and managing your balances by adding transactions.
        Simply tap the "+" button to get started!
      </BodyText>
    </s.EmptyHistoryContainer>
  );
};

function History(props: IProps) {
  const { list, loading } = useList<IHistoryItem>(
    getBalanceHistoryRef(props.balanceId)
  );

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<IHistoryItem | null>(null);

  const transactionGroups = useMemo(() => prepareGroups(list), [list]);

  const onSelectTransaction = (data: IHistoryItem) => {
    openTransaction();
    setSelectedTransaction(data);
  };

  const onConfirmDelete = () => {
    props.onDeleteTransaction(selectedTransaction);
    closeDelete();
    closeTransaction();
  };

  const renderHistoryContent = () =>
    transactionGroups.length ? (
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
      <EmptyHistory />
    );

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
          <Flex gap="4px" onClick={openSoon}>
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
                          {u.displayName || u.email}
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
    </s.HistoryContainer>
  );
}

export default History;
