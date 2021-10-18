import arrowIcon from '../../../assets/img/arrow-icon.svg';
import { useState } from 'react';
import HistoryItem from './HistoryItem';
import { Loader } from 'semantic-ui-react';
import { useList } from '../../../firebase/hooks';
import { getBalanceHistoryRef } from '../../../firebase/refs';
import { IHistoryItem } from '../../../firebase/types';
import * as s from './styled';

interface IProps {
	balanceId: string;
	userId: string;
}

function History(props: IProps) {
	const { list, loading } = useList<IHistoryItem>(
		getBalanceHistoryRef(props.balanceId)
	);

	console.log(list);

	const [isHistoryVisible, setIsHistoryVisible] = useState(true);

	const toggleHistory = () => {
		setIsHistoryVisible(!isHistoryVisible);
	};

	return (
		<s.HistoryContainer>
			<s.HistoryHeader>
				<s.ArowIcon
					alt=""
					src={arrowIcon}
					onClick={toggleHistory}
					style={{
						transform: isHistoryVisible
							? 'rotate(-90deg)'
							: 'rotate(180deg)',
					}}
				/>
				<s.HistoryTitle>History</s.HistoryTitle>
			</s.HistoryHeader>
			{isHistoryVisible && (
				<s.HistoryContent>
					{loading ? (
						<Loader active />
					) : (
						list &&
						list.map((historyItem) => (
							<HistoryItem
								title={historyItem.title}
								amount={historyItem.amount}
								date={historyItem.date}
								key={historyItem.id}
							/>
						))
					)}
				</s.HistoryContent>
			)}
		</s.HistoryContainer>
	);
}

export default History;
