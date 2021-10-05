import React from 'react';
import { useState } from 'react';
import {
    NewTransactionBlock,
    CloseButton,
    CloseIcon,
    TracsactionField,
    Text,
    TracsactionInput,
    RowFields,
    AmountInput,
    PayerInput,
    UserAmountRow,
    UserName,
    ButtonsContainer,
} from './styled';
import closeIcon from '../../../assets/img/close-icon.svg';
import { DATE_FORMAT } from '../../../modules/special/constants';
import { Icon } from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment';
import { formatMoney } from '../../../helpers/format';
import Button from '../../../components/Button';
import Field from '../../../components/Field';
import { ITransaction } from '../types';

const getInitialAmountFromUsers = (users) => users.reduce((acc, user) => ({ ...acc, [user.id]: formatMoney(0) }), {});

interface IProps {
    onAdd: (transaction: ITransaction) => void;
    onClose: () => void;
    users: {
        id: string;
        name: string;
    }[];
}

function NewTransactionWidget(props: IProps) {
    const [spentUsers, setSpentUsers] = useState(getInitialAmountFromUsers(props.users));
    const [paidUsers, setPaidUsers] = useState(getInitialAmountFromUsers(props.users));
    const [titleInput, setTitleInput] = useState('');
    const [amountInput, setAmountInput] = useState('0.00');
    const [dataInput, setDataInput] = useState(moment().format(DATE_FORMAT));

    const onFocusMoneyInput = (e) => {
        e.target.select();
    };

    const createObj = () => {
        props.onAdd({
            title: titleInput,
            amount: amountInput,
            date: dataInput,
            paidUsers: paidUsers,
            spentUsers: spentUsers,
        });
    };

    const enterInTitleInput = (event) => {
        setTitleInput(event.target.value);
    };

    const changeAmountInput = (event) => {
        setAmountInput(event.target.value);
    };

    const handleDateChange = (event, data) => {
        setDataInput(data.value);
    };

    const changePaidAmount = (event) => {
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
        <NewTransactionBlock>
            <CloseButton onClick={props.onClose}>
                <CloseIcon alt="" src={closeIcon} />
            </CloseButton>
            <TracsactionField>
                <Text>Title:</Text>
                <TracsactionInput placeholder="Enter title" value={titleInput} onChange={enterInTitleInput} />
            </TracsactionField>
            <RowFields>
                <TracsactionField>
                    <Field label="Amount:">
                        <AmountInput
                            value={amountInput}
                            onChange={changeAmountInput}
                            min={0}
                            type="number"
                            id="amount-input"
                            className="amount-input"
                        />
                    </Field>
                </TracsactionField>
                <TracsactionField>
                    <Text>Date:</Text>
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
                        value={dataInput}
                        iconPosition="left"
                        preserveViewMode={false}
                        autoComplete="off"
                        onChange={handleDateChange}
                    />
                </TracsactionField>
            </RowFields>

            <Text>Paid:</Text>
            <TracsactionField>
                {props.users.map((user) => {
                    return (
                        <UserAmountRow key={user.id}>
                            <UserName>{user.name}</UserName>
                            <PayerInput
                                min={0}
                                value={paidUsers[user.id]}
                                type="number"
                                id="amount-input"
                                className="amount-input"
                                onChange={changePaidAmount}
                                onBlur={formatPaidAmount}
                                data-id={user.id}
                                onFocus={onFocusMoneyInput}
                            ></PayerInput>
                        </UserAmountRow>
                    );
                })}
            </TracsactionField>

            <Text>Spent:</Text>
            <TracsactionField>
                {props.users.map((user) => {
                    return (
                        <UserAmountRow key={user.id}>
                            <UserName>{user.name}</UserName>
                            <PayerInput
                                min={0}
                                value={spentUsers[user.id]}
                                type="number"
                                id="amount-input"
                                className="amount-input"
                                data-id={user.id}
                                onChange={changeSpentAmount}
                                onBlur={formatSpentAmount}
                                onFocus={onFocusMoneyInput}
                            ></PayerInput>
                        </UserAmountRow>
                    );
                })}
            </TracsactionField>

            <ButtonsContainer>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button variant="primary" onClick={createObj}>
                    Add
                </Button>
            </ButtonsContainer>
        </NewTransactionBlock>
    );
}

export { NewTransactionWidget };
