import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import QRCode from 'react-qr-code';
import { withRouter } from 'react-router';
import { fetchBalanceById } from '../../modules/core/duck';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

function Balance() {
	const dispatch = useDispatch();
	const params = useParams();
	console.log(window.location.href);

	const isLoading = useSelector((state) => state.core.isUserBalanceLoading);
	// console.log(props.match.params.balanceId);

	useEffect(() => {
		dispatch(fetchBalanceById(params.balanceId));
	}, [dispatch, params.balanceId]);

	return (
		<div className="content">
			{isLoading ? <Loader active /> : null}
			NEW BALANCE COPMPONENT
			<QRCode value={window.location.href} />
		</div>
	);
}

export default Balance;
