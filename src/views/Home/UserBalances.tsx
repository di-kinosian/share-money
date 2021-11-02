import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../modules/auth/duck';
import { deleteBalance } from '../../modules/core/duck';
import deleteIcon from '../../assets/img/delete-icon.svg';
import { useHistory } from 'react-router-dom';
import * as s from './styled';
import CreateBalanceModal from './CreateBalanceModal';
import Button from '../../components/Button';
import { push, set } from 'firebase/database';
import { getBalanceDetailsRef, getUserBalancesRef } from '../../firebase/refs';
import { IBalanceDetails } from '../../firebase/types';
import { useKeysList, useMultipleValues } from '../../firebase/hooks';
import MoneyValue from '../../components/MoneyValue';

function BalanceItem(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const handelBalanceClick = () => {
        history.push('/balance/' + props.id);
    };

    const deleteBalanceItem = (event) => {
        dispatch(deleteBalance(props.id));
        event.stopPropagation();
    };

    const balanceAmount = props.users[props.userId];

    return (
        <s.Balance onClick={handelBalanceClick}>
            <s.BalanceName>{props.title}</s.BalanceName>
            <MoneyValue value={balanceAmount} />
            <s.BalanceDeleteIcon
                alt=""
                src={deleteIcon}
                onClick={deleteBalanceItem}
            />
        </s.Balance>
    );
}
// Firebase
const addBalance = (userId: string, title: string) => {
    const newUserBalanceRef = push(getUserBalancesRef(userId));
    const balanceId: string = newUserBalanceRef.key as string;
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

function UserBalances() {
    const user = useSelector(getUser);

    const { list: keys } = useKeysList(getUserBalancesRef(user._id));
    const { list } = useMultipleValues<IBalanceDetails>(
        'balances/',
        keys,
        '/details'
    );

    const [isCreate, setIsCreate] = useState(false);

    const createNewBalance = (title: string) => {
        addBalance(user._id, title);
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

    return (
        <s.ContainerHomePage>
            <s.PageTitle>Balances</s.PageTitle>
            {list &&
                list.map((balance) => (
                    <BalanceItem
                        key={balance.id}
                        id={balance.id}
                        title={balance.title}
                        users={balance.users}
                        userId={user._id}
                    />
                ))}
            {isAddButtonVisible && (
                <s.AddButton onClick={onAddBalance}>
                    <Button circular variant="primary" icon="add" />
                </s.AddButton>
            )}
            {isCreate && (
                <CreateBalanceModal
                    onClose={onCloseBalance}
                    onCreate={createNewBalance}
                />
            )}
        </s.ContainerHomePage>
    );
}

export default UserBalances;
