import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
import './styles.css';
import { getUser } from '../../modules/auth/duck';
import {
	addBalance,
	fetchBalances,
	deleteBalance,
} from '../../modules/core/duck';
import { getUserBalances } from '../../modules/core/selectors';
import deleteIcon from '../../assets/img/delete-icon.svg';
import { useHistory } from 'react-router-dom';

function BalanceItem(props) {
	const history = useHistory();
	const dispatch = useDispatch();

	const handelBalanceClick = () => {
		history.push('/balance/' + props.id);
		console.log('какой я по счету??');
	};

	const deleteBalanceItem = (event) => {
		dispatch(deleteBalance(props.id));
		event.stopPropagation();
	};

	return (
		<div className="balance" onClick={handelBalanceClick}>
			<div className="balance-name">{props.title}</div>
			<img
				alt=""
				src={deleteIcon}
				className="balance-delete-icon"
				onClick={deleteBalanceItem}
			/>
		</div>
	);
}

function Home() {
	const user = useSelector(getUser);
	const balances = useSelector(getUserBalances);
	const dispatch = useDispatch();

	const [showingModal, setShowingModal] = useState(false);
	const [title, setTitle] = useState('');

	const changeTitle = (event) => {
		setTitle(event.target.value);
	};

	const createNewBalance = () => {
		dispatch(addBalance(title));
		console.log(title);
		setTitle('');
		setShowingModal(false);
	};

	useEffect(() => {
		if (user) {
			dispatch(fetchBalances());
		}
	}, [dispatch, user]);

	const addBalanceInProgress = useSelector(
		(state) => state.core.addBalanceInProgress
	);

	const onAddBalance = () => {
		setShowingModal(true);
	};

	const onCloseBalance = () => {
		setShowingModal(false);
	};

	return (
		<div className="container-home-page">
			<div className="home-page">Home page</div>
			{balances.map((balance) => (
				<BalanceItem
					key={balance.id}
					id={balance.id}
					title={balance.title}
					users={balance.users}
				/>
			))}
			<div className="add-balance-button" onClick={onAddBalance}>
				{addBalanceInProgress ? (
					<Loader active />
				) : (
					<>
						<Icon name="add circle" /> Create new balance
					</>
				)}
			</div>
			{showingModal ? (
				<div className="modal-overlay">
					<div className="modal">
						<div
							className="modal-close-button"
							onClick={onCloseBalance}
						>
							+
						</div>
						<h2 className="modal-header">Create new balance</h2>
						<div className="modal-title">Title</div>
						<input
							type="text"
							className="modal-input"
							placeholder="Enter text"
							value={title}
							onChange={changeTitle}
						/>
						<div className="modal-buttons">
							<button
								className="modal-button modal-cancel-button"
								onClick={onCloseBalance}
							>
								Cancel
							</button>
							<button
								className="modal-button modal-create-button"
								onClick={createNewBalance}
							>
								Create
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Home;
