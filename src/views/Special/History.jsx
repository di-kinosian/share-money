import arrowIcon from '../../assets/img/arrow-icon.svg';
import { useEffect, useState } from 'react';
import { fetchHistory } from '../../modules/core/duck';
import { connect } from 'react-redux';
import { SortDirection, sorterBy } from '../../helpers/data';
import HistoryItem from './HistoryItem';
import moment from 'moment';

function History(props) {
    useEffect(() => {
        props.fetchHistory();
    }, []);

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
                        transform: isHistoryVisible
                            ? 'rotate(-90deg)'
                            : 'rotate(180deg)',
                    }}
                />
                <div className="history-title">History</div>
            </div>
            {isHistoryVisible && (
                <div className="history-content">
                    {props.history.map((historyItem) => (
                        <HistoryItem
                            title={historyItem.title}
                            amount={historyItem.amount}
                            date={historyItem.dateTime}
                            key={historyItem.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

const connector = connect(
    (state) => ({
        history: state.core.history.sort(
            sorterBy(SortDirection.DESC, record => typeof record.dateTime === 'number' ? record.dateTime : moment(record.dateTime).utc().valueOf())
        ),
    }),
    {
        fetchHistory,
    }
);

export default connector(History);
