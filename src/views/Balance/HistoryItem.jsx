import moment from 'moment';
import {
    formatMoney,
    getConnatationForNumber,
    formatDateTime,
} from '../../helpers/format';

function HistoryItem(props) {
    //    const [isHistoryItem, setIsHistoryItemVisible] = useState()

    return (
        <div className="history-item" key={props.historyItem.id}>
            <div className="history-item-row">
                {formatDateTime(moment(props.historyItem.dateTime).toDate())}
            </div>
            <div className="history-item-row">
                <div className="history-text">{props.historyItem.title}</div>
                <div
                    className={`history-amount ${getConnatationForNumber(
                        props.historyItem.amount
                    )}`}
                >
                    {formatMoney(props.historyItem.amount)}
                </div>
            </div>
        </div>
    );
}

export default HistoryItem;
