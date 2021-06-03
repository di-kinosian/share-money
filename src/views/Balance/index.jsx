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
import HeaderProvider from "../../providers/HeaderProvider";
import Field from "../../components/Field";

const DATE_FORMAT = "DD-MMMM-YYYY";
const TIME_FORMAT = "HH:mm";

const users = [
    { name: "Sasha", id: "1765567" },
    { name: "Andrey", id: "2765432342" },
];

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

    const [titleState, setTitleState] = useState("");
    const [amountState, setAmountState] = useState("0.00");
    const [payerState, setPayerState] = useState(users[0]);
    const [dateState, setDateState] = useState(moment().format(DATE_FORMAT));
    const [timeState, setTimeState] = useState(moment().format(TIME_FORMAT));

    const [isAddTransactionVisible, setIsAddTransactionVisible] = useState(
        false
    );

    const handleTitleChange = (event) => {
        setTitleState(event.target.value);
    };

    const onAmountChange = (event) => {
        setAmountState(event.target.value);
    };

    const handlePayerChange = (event) => {
        const user = users.find((item) => item.name === event.target.value);
        setPayerState(user);
    };

    const confirmationButtonClick = () => {
        let amountValue = +amountState;
        if (payerState.name === "Sasha") {
            amountValue = amountValue * 1;
        } else {
            amountValue = amountValue * -1;
        }
        const historyObject = {
            id: uuid(),
            dateTime: moment(
                dateState + " " + timeState,
                DATE_FORMAT + " " + TIME_FORMAT
            ).format(),
            title: titleState,
            amount: amountValue,
            balance: balance + amountValue,
            payer: payerState,
        };
        dispatch(addTransaction(historyObject));
        setTitleState("");
        setAmountState("0.00");
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
        setAmountState(Number(amountState).toFixed(2));
    };

    const handleDateChange = (event, data) => {
        setDateState(data.value);
    };

    const handleTimeChange = (event, data) => {
        setTimeState(data.value);
    };

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
                            value={titleState}
                            onChange={handleTitleChange}
                            id="title-input"
                            placeholder="Enter title"
                        />
                    </Field>
                    <div className="row">
                        <Field label={"Amount"}>
                            <input
                                value={amountState}
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
                                value={payerState.name}
                                onChange={handlePayerChange}
                            >
                                {users.map((item) => (
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
                                value={dateState}
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
                                value={timeState}
                                iconPosition="left"
                                onChange={handleTimeChange}
                                dateFormat={TIME_FORMAT}
                            />
                        </Field>
                    </div>
                    <button
                        className="confirmation-button"
                        onClick={confirmationButtonClick}
                    >
                        OK
                    </button>
                </div>
            )}
            <History />
        </div>
    );
}

export default Balance;
