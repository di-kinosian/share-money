import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Loader } from 'semantic-ui-react';
import '../../App.css';
import { getUser } from '../../modules/auth/duck';
import { addBalace, fetchBalances } from '../../modules/core/duck';
import { getUserBalances } from '../../modules/core/selectors';

function BalanceItem(props) {
	console.log(props);
	return (
		<div className="partners">
			<div className="name-partners">asdasdas</div>
			{/* <div className="balance-partners">134</div> */}
		</div>
	);
}

function Home() {
	const user = useSelector(getUser);
	const balances = useSelector(getUserBalances);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			dispatch(fetchBalances());
		}
	}, [dispatch, user]);

	const addBalanceInProgress = useSelector(
		(state) => state.core.addBalanceInProgress
	);

	const onAddBalance = () => {
		dispatch(addBalace());
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
		</div>
	);
}

export default Home;
