import moment from 'moment';
import { useState } from 'react';
import {
	formatMoney,
	getConnatationForNumber,
	formatDateTime,
} from '../../../helpers/format';
import deleteIcon from '../../../assets/img/delete-icon.svg';
import liftIcon from '../../../assets/img/lift-icon-angle.png';

function HistoryItem(props) {
	const [showing, setShowing] = useState(false);

	const showHistoryInfo = () => {
		setShowing(true);
	};

	const unshowHistoryInfo = (event) => {
		setShowing(false);
		event.stopPropagation();
	};

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
				{formatDateTime(moment(props.dateTime).toDate())}
			</div>
			<div className="history-item-row">
				<div className="history-text">{props.title}</div>
				<div
					className={`history-amount ${getConnatationForNumber(
						props.amount
					)}`}
				>
					{formatMoney(props.amount)}
				</div>

				<img alt="" src={deleteIcon} className="delete-icon" />
			</div>
			{showing ? (
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
