import arrowIcon from '../../assets/img/arrow-icon.svg';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { fetchHistory } from '../../modules/core/duck';
import { connect } from 'react-redux';
import {
    formatMoney,
    getConnatationForNumber,
    formatDateTime,
} from '../../helpers/format';
import { SortDirection, sorterBy } from '../../helpers/data';
import { HistoryItem } from './HistoryItem';

function History(props) {
    useEffect(() => {
        props.fetchHistory();
    }, []);

    const [isHistoryVisible, setIsHistoryVisible] = useState(true);

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    console.log(props.history);

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
                        <HistoryItem historyItem={historyItem}/>
                    ))}
                </div>
            )}
        </div>
    );
}

const connector = connect(
    (state) => ({
        history: state.core.history.sort(
            sorterBy(SortDirection.DESC, 'dateTime')
        ),
    }),
    {
        fetchHistory,
    }
);

export default connector(History);
