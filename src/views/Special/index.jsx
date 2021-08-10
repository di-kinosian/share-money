import closeIcon from "../../assets/img/close-icon.svg";
import moment from "moment";
import { v4 as uuid } from "uuid";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { useEffect, useState } from "react";
import { addTransaction, fetchBalance } from "../../modules/core/duck";
import { useDispatch, useSelector } from "react-redux";
import History from "./History";
import { getHistory } from "../../modules/core/selectors";
import "semantic-ui-css/semantic.min.css";
import { formatMoney } from "../../helpers/format";
import BalanceCard from "./BalanceCard";
import { Icon } from "semantic-ui-react";
import Field from "../../components/Field";
import { withRouter } from "react-router";
import { changeDate, changeTitle, changeAmount, changeTime, changePayer } from "../../modules/special/duck";
// import TransactionBlock from './TransactionBlock';
import { DATE_FORMAT, TIME_FORMAT, USERS } from "../../modules/special/constants";



const getBalanceFromHistory = (history) => {
    if (history && history.length) {
        return history.reduce((acc, curr) => acc + curr.amount, 0);
    }
    return 0;
};

function Balance() {
    const dispatch = useDispatch();

    const history = useSelector(getHistory);
    const balance = formatMoney(getBalanceFromHistory(history));

    useEffect(() => {
        dispatch(fetchBalance());
    }, []);

    const title = useSelector(state => state.special.title);
    const amount = useSelector(state => state.special.amount);
    const date = useSelector(state => state.special.date);
    const time = useSelector(state => state.special.time);
    const payer = useSelector(state => state.special.payer);

   
    const [isAddTransactionVisible, setIsAddTransactionVisible] = useState(
        false
    );

    const handleTitleChange = (event) => {
        dispatch(changeTitle(event.target.value))
    };

    const onAmountChange = (event) => {
        dispatch(changeAmount(event.target.value));
    };

    const handlePayerChange = (event) => {
        const user = USERS.find((item) => item.name === event.target.value);
        dispatch(changePayer(user));
    };

    const confirmationButtonClick = () => {
        let amountValue = +amount;
        if (payer.name === "Sasha") {
            amountValue = amountValue * 1;
        } else {
            amountValue = amountValue * -1;
        }
        const historyObject = {
            id: uuid(),
            dateTime: moment(
                date + " " + time,
                DATE_FORMAT + " " + TIME_FORMAT
            ).format(),
            title: title,
            amount: amountValue,
            balance: balance + amountValue,
            payer: payer,
        };
        dispatch(addTransaction(historyObject));
        dispatch(changeTitle(''))
        dispatch(changeTitle("0.00"));
    };

    const openAddBlock = () => {
        setIsAddTransactionVisible(true);
    };

    const closeAddBlock = () => {
        setIsAddTransactionVisible(false);
    };

    const onAmountFocus = (event) => {
        event.target.select();
    };

    const onAmountBlur = () => {
        dispatch(changeTitle(Number(amount).toFixed(2)));
    };

    const handleDateChange = (event, data) => {
        dispatch(changeDate(data.value));
    };

    const handleTimeChange = (event, data) => {
        dispatch(changeTime(data.value));
    };

    console.log(date)

    return (
        <div className="content">
            <BalanceCard balance={balance} onAddClick={openAddBlock} />
            {isAddTransactionVisible && (
                <div className="transaction-block">
                    <div className="close-button" onClick={closeAddBlock}>
                        <img alt="" src={closeIcon} className="close-icon" />
                    </div>
                    <Field label={"Title"}>
                        <input
                            value={title}
                            onChange={handleTitleChange}
                            id="title-input"
                            placeholder="Enter title"
                        />
                    </Field>
                    <div className="row">
                        <Field label={"Amount"}>
                            <input
                                value={amount}
                                onChange={onAmountChange}
                                onFocus={onAmountFocus}
                                onBlur={onAmountBlur}
                                min={0}
                                type="number"
                                id="amount-input"
                                className="amount-input"
                            />
                        </Field>
                        <Field label={"Payer"}>
                            <select
                                className="payer-select"
                                value={payer.name}
                                onChange={handlePayerChange}
                            >
                                {USERS.map((item) => (
                                    <option>{item.name}</option>
                                ))}
                            </select>
                        </Field>
                    </div>
                    <div className="row">
                        <Field label={"Date"}>
                            <DateInput
                                placeholder="Date"
                                popupPosition="bottom right"
                                className="example-calendar-input"
                                name="date"
                                closable
                                clearIcon={<Icon name="remove" color="red" />}
                                dateFormat={DATE_FORMAT}
                                animation="scale"
                                duration={200}
                                hideMobileKeyboard
                                value={date}
                                iconPosition="left"
                                preserveViewMode={false}
                                autoComplete="off"
                                onChange={handleDateChange}
                            />
                        </Field>

                        <Field label={"Time"}>
                            <TimeInput
                                placeholder="Time"
                                popupPosition="bottom right"
                                className="example-calendar-input"
                                name="time"
                                animation="horizontal flip"
                                duration={300}
                                closable
                                autoComplete="off"
                                hideMobileKeyboard
                                value={time}
                                iconPosition="left"
                                onChange={handleTimeChange}
                                dateFormat={TIME_FORMAT}
                            />
                        </Field>
                    </div>
                    <button
                        className="confirmation-button"
                        // onClick={confirmationButtonClick}
                    >
                        OK
                    </button>
                </div>
            )}
            <History />
            {/* <TransactionBlock /> */}
        </div>
    );
}

export default withRouter(Balance);
