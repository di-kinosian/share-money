import closeIcon from "./assets/img/close-icon.svg";
import moment from "moment";
import { v4 as uuid } from "uuid";
import "./App.css";
import { DateInput, TimeInput } from "semantic-ui-calendar-react";
import { useEffect, useState } from "react";
import AuthModals from "./components/AuthModals";
import { addTransaction, fetchBalance } from "./modules/core/duck";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./config/store";
import History from "./History";
import { getHistory } from "./modules/core/selectors";
import "semantic-ui-css/semantic.min.css";
import { formatMoney } from "./helpers/format";
import { getConnatationForNumber } from "./helpers/format";
import BalanceCard from "./BalanceCard";
import burgerIcon from "./assets/img/burger-icon.svg";
import { Icon } from "semantic-ui-react";

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

function App() {
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
    const [isMenuVisible, setIsMenuVisible] = useState(false);

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

    const openMenu = () => {
        setIsMenuVisible(true);
    };

    const closeMenu = () => {
        setIsMenuVisible(false);
    };

    const handleDateChange = (event, data) => {
        setDateState(data.value);
    };

    const handleTimeChange = (event, data) => {
        setTimeState(data.value);
    };

    return (
        <div className="container">
            <AuthModals />
            <div className="header">
                Share money{" "}
                {/* <button
                    onClick={() => {
                        dispatch(toggleLoginModal(true));
                    }}
                /> */}
                <img
                    src={burgerIcon}
                    className="burger-icon"
                    onClick={openMenu}
                />
                {isMenuVisible && (
                    <div className="menu-overlay">
                        <div className="menu">
                            <img
                                src={closeIcon}
                                className="close-menu-icon"
                                onClick={closeMenu}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="content">
                <BalanceCard balance={balance} onAddClick={openAddBlock} />
                {isAddTransactionVisible && (
                    <div className="transaction-block">
                        <div className="close-button" onClick={closeAddBlock}>
                            <img
                                alt=""
                                src={closeIcon}
                                className="close-icon"
                            />
                        </div>
                        <div className="transaction-field">
                            <div className="text">Title</div>
                            <input
                                value={titleState}
                                onChange={handleTitleChange}
                                id="title-input"
                                placeholder="Enter title"
                            />
                        </div>
                        <div className="row">
                            <div className="transaction-field">
                                <div className="text">Amount</div>
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
                            </div>
                            <div className="transaction-field">
                                <div className="text">Payer</div>
                                <select
                                    className="payer-select"
                                    value={payerState.name}
                                    onChange={handlePayerChange}
                                >
                                    <option>Sasha</option>
                                    <option>Andrey</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="transaction-field">
                                <div className="text">Date</div>
                                <DateInput
                                    placeholder="Date"
                                    popupPosition="bottom right"
                                    className="example-calendar-input"
                                    name="date"
                                    closable
                                    clearIcon={
                                        <Icon name="remove" color="red" />
                                    }
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
                            </div>
                            <div className="transaction-field">
                                <div className="text">Time</div>
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
                            </div>
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
        </div>
    );
}

const Wrapper = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Wrapper;
