import arrowIcon from '../../assets/img/arrow-icon.svg';
import { useState } from 'react';
import HistoryItem from './HistoryItem';
import { Loader } from 'semantic-ui-react';
import { useList } from '../../firebase/hooks';
import { getBalanceHistoryRef } from '../../firebase/refs';
import { IHistoryItem } from '../../firebase/types';

interface IProps {
    balanceId: string;
    userId: string;
}

function History(props: IProps) {
    const { list, loading } = useList<IHistoryItem>(getBalanceHistoryRef(props.balanceId));

    console.log(list);

    const [isHistoryVisible, setIsHistoryVisible] = useState(true);

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    return (
        <div className="history">
            <div className="history-header">
                <img
                    alt=""
                    src={arrowIcon}
                    className="arrow-icon"
                    onClick={toggleHistory}
                    style={{
                        transform: isHistoryVisible ? 'rotate(-90deg)' : 'rotate(180deg)',
                    }}
                />
                <div className="history-title">History</div>
            </div>
            {isHistoryVisible && (
                <div className="history-content">
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
                </div>
            )}
        </div>
    );
}

export default History;
