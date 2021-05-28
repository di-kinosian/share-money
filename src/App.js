import closeIcon from "./assets/img/close-icon.svg";

import { v4 as uuid } from "uuid";
import "./App.css";
import { useEffect, useState } from "react";
import AuthModals from "./components/AuthModals";
import { addTransaction, fetchBalance } from "./modules/core/duck";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./config/store";
import History from "./History";
import { getBalance, getHistory } from "./modules/core/selectors";
import "semantic-ui-css/semantic.min.css";
import { formatDateForDatepicker, formatMoney } from "./helpers/format";
import { getConnatationForNumber } from "./helpers/format";
import BalanceCard from "./BalanceCard";

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
    console.log(getConnatationForNumber(0), "hi");
    const dispatch = useDispatch();

    const history = useSelector(getHistory);
    const balance = formatMoney(getBalanceFromHistory(history));

    useEffect(() => {
        dispatch(fetchBalance());
    }, []);

    const [titleState, setTitleState] = useState("");
    const [amountState, setAmountState] = useState("0.00");
    const [payerState, setPayerState] = useState(users[0]);
    const [dateState, setDateState] = useState(new Date().valueOf());

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
        // let amountValue = +amountState;
        // if (payerState.name === "Sasha") {
        //     amountValue = amountValue * 1;
        // } else {
        //     amountValue = amountValue * -1;
        // }
        // const historyObject = {
        //     id: uuid(),
        //     dateTime: dateState,
        //     title: titleState,
        //     amount: amountValue,
        //     balance: balance + amountValue,
        //     payer: payerState,
        // };
        // dispatch(addTransaction(historyObject));
        // setTitleState("");
        // setAmountState("0.00");
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

    console.log(payerState);

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
                                <input
                                    type="date"
                                    name="calendar"
                                    value={formatDateForDatepicker(dateState)}
                                    onChange={(e) =>
                                        setDateState(
                                            new Date(e.target.value).valueOf()
                                        )
                                    }
                                />
                            </div>
                            {/* <div className="transaction-field">
                                <div className="text">Time</div>
                                <input
                                    type="time"
                                    value={formatDate(dateState)}
                                    onChange={(e) =>
                                        setDateState(
                                            new Date(e.target.value).valueOf()
                                        )
                                    }
                                />
                            </div> */}
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
