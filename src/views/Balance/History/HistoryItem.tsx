import moment from 'moment';
import { useState } from 'react';
import { formatMoney, formatDateTime } from '../../../helpers/format';
import liftIcon from '../../../assets/img/lift-icon-angle.png';
import MoneyValue from '../../../components/MoneyValue';
import * as s from './styled';

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
		<s.HistoryItem key={props.id} onClick={showHistoryInfo}>
			<s.HistoryItemRow>
				{formatDateTime(moment(props.date).toDate())}
			</s.HistoryItemRow>
			<s.HistoryItemRow>
				<s.HistoryText>{props.title}</s.HistoryText>
				<MoneyValue value={total} />
			</s.HistoryItemRow>
			{showing ? (
				<s.HistoryInfoContainer>
					<s.HistoryFullInfo>
						<s.HeaderCell>Name</s.HeaderCell>
						<s.HeaderCell>Paid</s.HeaderCell>
						<s.HeaderCell>Spent</s.HeaderCell>
						<s.HeaderCell>Total</s.HeaderCell>

						{preparedUsers.map((user) => {
							return (
								<>
									<s.Cell>{user.name}</s.Cell>
									<s.Cell>{formatMoney(user.paid)}</s.Cell>
									<s.Cell>{formatMoney(user.spent)}</s.Cell>
									<s.Cell>{formatMoney(user.total)}</s.Cell>
								</>
							);
						})}
					</s.HistoryFullInfo>
					<s.LiftIcon
						alt=""
						src={liftIcon}
						onClick={unshowHistoryInfo}
					/>
				</s.HistoryInfoContainer>
			) : null}
		</s.HistoryItem>
	);
}

export default HistoryItem;
