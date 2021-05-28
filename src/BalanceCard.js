import "./App.css";
import {formatDate, getConnatationForNumber} from "./helpers/format";



function BalanceCard(props){
    return (
        <div className="balance-block">
                    <div className="balance-row">
                        <div className="balance-info">
                            <div className="balance-label">Balance</div>
                            <div className="balance-date">{formatDate(new Date())}</div>
                        </div>
                        <button className="add-button" onClick={props.onAddClick}>
                            + Add
                        </button>
                    </div>
                    <div
                        className={`balance-amount ${
                            getConnatationForNumber(props.balance)
                        }`}
                    >
                        {props.balance}
                    </div>
                </div>
    )

    
}

export default BalanceCard;