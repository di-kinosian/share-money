import { useState, useMemo } from 'react';
import HistoryItem from './HistoryItem';
import { Icon, Loader } from 'semantic-ui-react';
import { useList } from '../../../firebase/hooks';
import { getBalanceHistoryRef } from '../../../firebase/refs';
import { IHistoryItem, IUserProfile } from '../../../firebase/types';
import * as s from './styled';
import { useModalState } from '../../../helpers/hooks';
import Modal from '../../../components/Modal';
import { BodyText, BodyTextHighlight, Flex, H4, H5, HorisontalSeparator, VerticalSeparator } from '../../../components/styled';
import MoneyValue from '../../../components/MoneyValue';
import Button from '../../../components/Button';
import { formatMoney, formatToLocalDateString } from '../../../helpers/format';
import { groupBy } from '../../../helpers/data';
import moment from 'moment';

interface IProps {
  balanceId: string;
  userId: string;
  users: IUserProfile[];
}

function History(props: IProps) {
  const { list, loading } = useList<IHistoryItem>(
    getBalanceHistoryRef(props.balanceId)
  );

  const { isOpen: isTransactionOpen, open: openTransaction, close: closeTransaction } = useModalState()
  const { isOpen: isSoonOpen, open: openSoon, close: closeSoon } = useModalState()

  const { isOpen: isDeleteOpen, open: openDelete, close: closeDelete } = useModalState()
  const [selectedTransaction, setSelectedTransaction] = useState<IHistoryItem | null>(null)

  const sorted = useMemo<IHistoryItem[]>(
    () =>
      list
        ? [...list.sort(
          (a, b) =>
            new Date(b.date).valueOf() -
            new Date(a.date).valueOf()
        )]
        : [],
    [list]
  );

  const grouped = useMemo(() => groupBy(sorted, (i) => formatToLocalDateString(moment(i.date).toDate())),[sorted])

  const onSelectTransaction = (data: IHistoryItem) => {
    openTransaction()
    setSelectedTransaction(data)
  }

  const onConfirmDelete = () => {
    const newArray = list.filter(i => i.id !== selectedTransaction.id)
  }

  console.log(grouped);

  return (
    <s.HistoryContainer>
      <s.HistoryHeader>
        <s.HistoryTitle ><H5>History</H5></s.HistoryTitle>
      <HorisontalSeparator />
      </s.HistoryHeader>
      {loading ? (
        <Loader active />
      ) : (
        sorted.map((historyItem: IHistoryItem) => {
          return (
            <HistoryItem
              id={historyItem.id}
              title={historyItem.title}
              date={historyItem.date}
              key={historyItem.id}
              data={historyItem}
              users={props.users}
              userId={props.userId}
              onSelect={onSelectTransaction}
            />
          );
        })
      )}
      <Modal isOpen={isTransactionOpen} onClose={closeTransaction} header="Transaction details">
        <Flex padding="16px" justify="space-around">
          {/* TODO: implement delete f-ty */}
          <Flex gap="4px" onClick={openDelete}>
          {/* <Flex gap="4px" onClick={openSoon}> */}
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
            <BodyText>{formatToLocalDateString(new Date(selectedTransaction?.date))}</BodyText>
          </s.TransactionDetailsRow>
          <s.TransactionDetailsRow>
            <BodyText>Total</BodyText>
            <BodyTextHighlight>{formatMoney(selectedTransaction?.amount)}</BodyTextHighlight>
          </s.TransactionDetailsRow>
          <s.TransactionDetailsRow>
            <BodyText>Balances</BodyText>
            <s.Balances>
              {
                props.users?.map((u) => {
                  const userBalance = (selectedTransaction?.paidUsers[u.id] || 0) - (selectedTransaction?.spentUsers[u.id] || 0)
                  return (
                    <s.UserBalance key={u.id}>
                      <BodyText>{u.displayName}</BodyText>
                      <MoneyValue value={userBalance} />
                    </s.UserBalance>
                  )
                })
              }
            </s.Balances>

          </s.TransactionDetailsRow>
          <Button onClick={closeTransaction}>
            Close
          </Button>

        </s.TransactionDetails>
      </Modal>
      <Modal isOpen={isDeleteOpen} onClose={closeDelete} zIndex={6}>
        <Flex padding="16px" direction='column' gap="16px">
          <BodyTextHighlight>Are you sure you want to delete the transaction?</BodyTextHighlight>
          <BodyText>This action cannot be undone. Deleting the transaction will permanently remove it from the balance.</BodyText>
          <Flex direction='column' gap="8px">
            <Button variant="negative" onClick={onConfirmDelete}>Delete</Button>
            <Button onClick={closeDelete}>Cancel</Button>
          </Flex>
        </Flex>
      </Modal>
      <Modal isOpen={isSoonOpen} onClose={closeSoon} zIndex={6}>
        <Flex padding="16px" direction='column' gap="16px">
          <BodyTextHighlight>Coming Soon!</BodyTextHighlight>
          <BodyText>The functionality is currently in development and will be available soon. Thank you for your patience!</BodyText>
          <Flex direction='column' gap="8px">
            <Button onClick={closeSoon}>Okay</Button>
          </Flex>
        </Flex>
      </Modal>
    </s.HistoryContainer>
  );
}

export default History;
