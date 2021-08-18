import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import QRCode from 'react-qr-code';
import { withRouter } from 'react-router';
import { fetchBalanceById, joinToBalance } from '../../modules/core/duck';
import './styles.css';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import {getBalanceDetails} from '../../modules/core/selectors';

function Balance() {
	const dispatch = useDispatch();
	const params = useParams();

	const isLoading = useSelector((state) => state.core.isUserBalanceLoading);
	const balance = useSelector(getBalanceDetails);
	const userId = useSelector((state) => state.auth.user._id);

	const needToJoin = useMemo(() => {
		const users = balance?.users;
		console.log(balance);
		let user = users?.find((item) => item.id === userId);
		console.log(user, 'user');
		return !user;
	}, [userId, balance]);

	useEffect(() => {
		dispatch(fetchBalanceById(params.balanceId));
	}, [dispatch, params.balanceId]);

	const onJoinClick = () => {
		dispatch(joinToBalance());
	};

	if (isLoading) {
		return <Loader active />;
	}

	if (needToJoin) {
		return (
			<div className="join-btn" onClick={onJoinClick}>
				+ JOIN
			</div>
		);
	}

	return (
		<>
			<div className="content">
				NEW BALANCE COPMPONENT
				<QRCode value={window.location.href} />
			</div>
		</>
	);
}

export default Balance;
