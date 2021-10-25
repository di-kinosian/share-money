import moment from 'moment';
import { useState } from 'react';
import {
	formatMoney,
	getConnatationForNumber,
	formatDateTime,
} from '../../../helpers/format';
import liftIcon from '../../../assets/img/lift-icon-angle.png';
import MoneyValue from '../../../components/MoneyValue';

function HistoryItem(props) {
	const [showing, setShowing] = useState(false);

	const showHistoryInfo = () => {
		setShowing(true);
	};

	const unshowHistoryInfo = (event) => {
		setShowing(false);
		event.stopPropagation();
	};

	const total =
		props.data.paidUsers[props.userId] -
		props.data.spentUsers[props.userId];

	const preparedUsers = props.users?.map((user) => {
		const paid = props.data.paidUsers[user.id] || '-';
		const spent = props.data.spentUsers[user.id] || '-';
		return {
			name: user.displayName,
			paid,
			spent,
			total: paid - spent,
		};
	});

	return (
		<div className="history-item" key={props.id} onClick={showHistoryInfo}>
			<div className="history-item-row">
				{formatDateTime(moment(props.date).toDate())}
			</div>
			<div className="history-item-row">
				<div className="history-text">{props.title}</div>
				<MoneyValue value={total} />
			</div>
			{showing ? (
				<div className="history-info-container">
					<div className="history-full-info">
						<div className="header-cell cell">Name</div>
						<div className="header-cell cell">Paid</div>
						<div className="header-cell cell">Spent</div>
						<div className="header-cell cell">Total</div>

						{preparedUsers.map((user) => {
							return (
								<>
									<div className="table-cell cell">
										{user.name}
									</div>
									<div className="table-cell cell">
										{formatMoney(user.paid)}
									</div>
									<div className="table-cell cell">
										{formatMoney(user.spent)}
									</div>
									<div className="table-cell cell">
										{formatMoney(user.total)}
									</div>
								</>
							);
						})}
					</div>
					<img
						alt=""
						src={liftIcon}
						className="lift-icon"
						onClick={unshowHistoryInfo}
					/>
				</div>
			) : null}
		</div>
	);
}

export default HistoryItem;
