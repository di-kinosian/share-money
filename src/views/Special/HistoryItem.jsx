import moment from 'moment';
import {
    formatMoney,
    getConnatationForNumber,
    formatDateTime,
} from '../../helpers/format';
import deleteIcon from '../../assets/img/delete-icon.svg';

function HistoryItem(props) {
    //    const [isHistoryItem, setIsHistoryItemVisible] = useState()

    return (
        <div className="history-item" key={props.id}>
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
        </div>
    );
}

export default HistoryItem;
