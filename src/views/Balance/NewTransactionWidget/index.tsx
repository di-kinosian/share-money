import React from 'react';
import { useState } from 'react';
import * as s from './styled';
import closeIcon from '../../../assets/img/close-icon.svg';
import { DATE_FORMAT } from '../../../modules/special/constants';
import { Icon } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment';
import { formatMoney } from '../../../helpers/format';
import Button from '../../../components/Button';
import Field from '../../../components/Field';
import { ITransaction } from '../types';
import { Map } from '../../../firebase/types';

const getInitialAmountFromUsers = (users) =>
    users.reduce((acc, user) => ({ ...acc, [user.id]: formatMoney(0) }), {});

interface IProps {
    onAdd: (transaction: ITransaction) => void;
    onClose: () => void;
    users: {
        id: string;
        name: string;
    }[];
}

const getAmountError = (
    amount: string,
    paidUsers: Map<string>,
    spentUsers: Map<string>
): string => {
    let errorKey = '';
    const spentAmount = Object.values(spentUsers).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
    );
    const paidAmount = Object.values(paidUsers).reduce(
        (acc, cur) => acc + parseFloat(cur),
        0
    );

    const preparedAmount = parseFloat(amount);

    if (preparedAmount !== spentAmount || preparedAmount !== paidAmount) {
        errorKey = 'not_equal';
    }
    if (paidAmount > spentAmount) {
        errorKey = 'paid_more_then_spent';
    }
    if (paidAmount < spentAmount) {
        errorKey = 'paid_less_then_spent';
    }

    switch (errorKey) {
        case 'not_equal': {
            return 'Total amount are not equal to spent amount or paid amount. Please check amount fields';
        }
        case 'paid_more_then_spent': {
            return 'Paid amount more then spent amount. Please check spent amount fields';
        }
        case 'paid_less_then_spent': {
            return 'Paid amount less then spent amount. Please check spent amount fields';
        }
        default: {
            return '';
        }
    }
};

const transformStringMapToNumberMap = (stringMap: Map<string>): Map<number> => {
    const resultMap: Map<number> = {};

    for (let key in stringMap) {
        resultMap[key] = parseFloat(stringMap[key]);
    }

    return resultMap;
};

function NewTransactionWidget(props: IProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const [spentUsers, setSpentUsers] = useState<Map<string>>(
        getInitialAmountFromUsers(props.users)
    );
    const [paidUsers, setPaidUsers] = useState<Map<string>>(
        getInitialAmountFromUsers(props.users)
    );
    const [title, setTitleInput] = useState<string>('');
    const [amount, setAmountInput] = useState<string>('0.00');
    const [date, setDataInput] = useState<string>(moment().format(DATE_FORMAT));

    const onFocusMoneyInput = (e) => {
        e.target.select();
    };

    const createObj = () => {
        setIsEdit(false);
        const amountError = getAmountError(amount, paidUsers, spentUsers);
        setError(amountError);

        if (!amountError) {
            props.onAdd({
                title: title,
                amount: amount,
                date: date,
                paidUsers: transformStringMapToNumberMap(paidUsers),
                spentUsers: transformStringMapToNumberMap(spentUsers),
            });
        }
    };

    const changeTitle = (event) => {
        setIsEdit(true);
        setTitleInput(event.target.value);
    };

    const changeAmount = (event) => {
        setIsEdit(true);
        setAmountInput(event.target.value);
    };

    const changeDate = (event, data) => {
        setIsEdit(true);
        setDataInput(data.value);
    };

    const changePaidAmount = (event) => {
        setIsEdit(true);
        let userId = event.target.dataset.id;
        setPaidUsers({ ...paidUsers, [userId]: event.target.value });
    };

    const formatPaidAmount = (event) => {
        let userId = event.target.dataset.id;
        setPaidUsers({
            ...paidUsers,
            [userId]: formatMoney(paidUsers[userId]),
        });
    };

    const changeSpentAmount = (event) => {
        setIsEdit(true);
        let userId = event.target.dataset.id;
        setSpentUsers({ ...spentUsers, [userId]: event.target.value });
    };

    const formatSpentAmount = (event) => {
        let userId = event.target.dataset.id;
        setSpentUsers({
            ...spentUsers,
            [userId]: formatMoney(spentUsers[userId]),
        });
    };

    return (
        <s.NewTransactionBlock>
            <s.CloseButton onClick={props.onClose}>
                <s.CloseIcon alt="" src={closeIcon} />
            </s.CloseButton>
            <s.TracsactionField>
                <Field label="Title:">
                    <s.TracsactionInput
                        placeholder="Enter title"
                        value={title}
                        onChange={changeTitle}
                    />
                </Field>
            </s.TracsactionField>
            <s.RowFields>
                <s.TracsactionField>
                    <Field label="Amount:">
                        <s.AmountInput
                            value={amount}
                            onChange={changeAmount}
                            min={0}
                            type="number"
                            id="amount-input"
                            className="amount-input"
                        />
                    </Field>
                </s.TracsactionField>
                <s.TracsactionField>
                    <Field label="Date:">
                        <DateTimeInput
                            placeholder="Date"
                            popupPosition="bottom right"
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
                            onChange={changeDate}
                        />
                    </Field>
                </s.TracsactionField>
            </s.RowFields>
            <Field label="Paid:">
                <s.TracsactionField>
                    {props.users.map((user) => (
                        <s.UserAmountRow key={user.id}>
                            <s.UserName>{user.name}</s.UserName>
                            <s.PayerInput
                                min={0}
                                value={paidUsers[user.id]}
                                type="number"
                                id="amount-input"
                                className="amount-input"
                                onChange={changePaidAmount}
                                onBlur={formatPaidAmount}
                                data-id={user.id}
                                onFocus={onFocusMoneyInput}
                            />
                        </s.UserAmountRow>
                    ))}
                </s.TracsactionField>
            </Field>
            <Field label="Spent:">
                <s.TracsactionField>
                    {props.users.map((user) => (
                        <s.UserAmountRow key={user.id}>
                            <s.UserName>{user.name}</s.UserName>
                            <s.PayerInput
                                min={0}
                                value={spentUsers[user.id]}
                                type="number"
                                id="amount-input"
                                className="amount-input"
                                data-id={user.id}
                                onChange={changeSpentAmount}
                                onBlur={formatSpentAmount}
                                onFocus={onFocusMoneyInput}
                            />
                        </s.UserAmountRow>
                    ))}
                </s.TracsactionField>
            </Field>

            {!isEdit && <s.ErrorText>{error}</s.ErrorText>}

            <s.ButtonsContainer>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button variant="primary" onClick={createObj}>
                    Add
                </Button>
            </s.ButtonsContainer>
        </s.NewTransactionBlock>
    );
}

export { NewTransactionWidget };
