import { useMemo, useState, FC } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../modules/auth/duck';
import { useHistory } from 'react-router-dom';
import * as s from './styled';
import CreateBalanceModal from './CreateBalanceModal';
import { push, set } from 'firebase/database';
import { getBalanceDetailsRef, getUserBalancesRef } from '../../firebase/refs';
import { IBalanceDetails } from '../../firebase/types';
import { useKeysList, useMultipleValues } from '../../firebase/hooks';
import MoneyValue from '../../components/MoneyValue';
import { BodyText, BodyTextHighlight, H4, H5 } from '../../components/styled';
import { AddButton } from '../../components/AddButton';
import { Loader } from 'semantic-ui-react';

interface IProps {
  id: string;
  users: Record<string, number>;
  userId: string;
  title: string;
}

const BalanceItem: FC<IProps> = (props) => {
  const history = useHistory();

  const handelBalanceClick = () => {
    history.push('/balance/' + props.id);
  };

  const balanceAmount = props.users[props.userId];

  return (
    <s.Balance onClick={handelBalanceClick}>
      <BodyTextHighlight>{props.title}</BodyTextHighlight>
      <MoneyValue value={balanceAmount} />
    </s.Balance>
  );
};

// Firebase
const addNewBalance = (userId: string, title: string) => {
  const newUserBalanceRef = push(getUserBalancesRef(userId));
  const balanceId: string = newUserBalanceRef.key;
  const newBalance: IBalanceDetails = {
    users: {
      [userId]: 0,
    },
    id: balanceId,
    title,
  };

  set(newUserBalanceRef, true);
  set(getBalanceDetailsRef(balanceId), newBalance);
};

const EmptyBalances = () => {
  return (
    <s.EmptyBalancesContainer>
      <H5>No Balances Yet</H5>
      <BodyText>
        It seems like there are no balances set up here. Start managing your
        shared expenses and tracking balances by adding your first balance. Just
        tap the "+" button to begin!
      </BodyText>
    </s.EmptyBalancesContainer>
  );
};

function UserBalances() {
  const user = useSelector(getUser);

  const { list: keys, loading: keysLoading } = useKeysList(
    getUserBalancesRef(user._id)
  );
  const { list, loading } = useMultipleValues<IBalanceDetails>(
    'balances/',
    keys,
    '/details'
  );

  const isLoading = keysLoading || loading;

  const [isCreate, setIsCreate] = useState(false);

  const createNewBalance = (title: string) => {
    addNewBalance(user._id, title);
    // dispatch(addBalance(title));
    setIsCreate(false);
  };

  const addBalanceInProgress = useSelector(
    (state: any) => state.core.addBalanceInProgress
  );

  const onAddBalance = () => {
    setIsCreate(true);
  };

  const onCloseBalance = () => {
    setIsCreate(false);
  };

  const isAddButtonVisible = useMemo(
    () => !addBalanceInProgress && !isCreate,
    [addBalanceInProgress, isCreate]
  );

  const renderBalancesContent = () => {
    return list?.length ? (
      list?.map((balance) => (
        <BalanceItem
          key={balance.id}
          id={balance.id}
          title={balance.title}
          users={balance.users}
          userId={user._id}
        />
      ))
    ) : (
      <EmptyBalances />
    );
  };

  return (
    <s.ContainerHomePage>
      {list?.length ? <H4>Your Balances</H4> : null}
      {isLoading ? <Loader active /> : renderBalancesContent()}
      {isAddButtonVisible && <AddButton onClick={onAddBalance} />}
      <CreateBalanceModal
        isOpen={isCreate}
        onClose={onCloseBalance}
        onCreate={createNewBalance}
      />
    </s.ContainerHomePage>
  );
}

export default UserBalances;
