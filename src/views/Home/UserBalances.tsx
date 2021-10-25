import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.css';
import { getUser } from '../../modules/auth/duck';
import { fetchBalances, deleteBalance } from '../../modules/core/duck';
import deleteIcon from '../../assets/img/delete-icon.svg';
import { useHistory } from 'react-router-dom';
import * as s from './styled';
import CreateBalanceModal from './CreateBalanceModal';
import Button from '../../components/Button';
import { push, set } from 'firebase/database';
import { getBalanceDetailsRef, getUserBalancesRef } from '../../firebase/refs';
import { IBalanceDetails } from '../../firebase/types';
import { useKeysList, useMultipleValues } from '../../firebase/hooks';
import { formatMoney } from '../../helpers/format';
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
		<div className="balance" onClick={handelBalanceClick}>
			<div className="balance-name">{props.title}</div>
			<MoneyValue value={balanceAmount}/>
			<img
				alt=""
				src={deleteIcon}
				className="balance-delete-icon"
				onClick={deleteBalanceItem}
			/>
		</div>
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
	console.log('user2', user);
	const dispatch = useDispatch();

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

	useEffect(() => {
		if (user) {
			dispatch(fetchBalances());
		}
	}, [dispatch, user]);

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
	console.log('list', list);

	return (
		<div className="container-home-page">
			<div className="home-page">Balances</div>
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
		</div>
	);
}

export default UserBalances;
