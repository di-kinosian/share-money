import { useState } from 'react';
import * as so from './styled-old';
import { formatMoney } from '../../../helpers/format';
import Field from '../../../components/Field';
import Button from '../../../components/Button';
import * as s from './styled';
import AmountMenu from '../../../components/AmountMenu/AmountMenu';
import { IAmountDetails, IAmountStepProps } from './types';

const getAmountError = (
    amountDetails: IAmountDetails,
): string => {
    const {spentUsers, paidUsers, amount} = amountDetails
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

function MultipalTransaction(props: IAmountStepProps) {
    const {paidUsers, spentUsers, amount} = props.amountDetails;
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const onFocusMoneyInput = (e) => {
        e.target.select();
    };

    const onAddTransaction = () => {
        setIsEdit(false);
        const amountError = getAmountError({amount, paidUsers, spentUsers});
        setError(amountError);

        if (!amountError) {
            props.onSubmit(props.amountDetails);
        }
    };

    const changeAmount = (event) => {
        setIsEdit(true);
        props.onChangeAmountDetails({
            ...props.amountDetails,
            amount: event.target.value,
        })
    };

    const changePaidAmount = (event) => {
        setIsEdit(true);
        let userId = event.target.dataset.id;
        props.onChangeAmountDetails({
            ...props.amountDetails,
            paidUsers: {
                ...props.amountDetails.paidUsers,
                [userId]: event.target.value
            }
        })
    };

    const formatPaidAmount = (event) => {
        let userId = event.target.dataset.id;
        props.onChangeAmountDetails({
            ...props.amountDetails,
            paidUsers: {
                ...props.amountDetails.paidUsers,
                [userId]: formatMoney(paidUsers[userId]),
            }
        })
    };

    const changeSpentAmount = (event) => {
        setIsEdit(true);
        let userId = event.target.dataset.id;
        props.onChangeAmountDetails({
            ...props.amountDetails,
            spentUsers: {
                ...props.amountDetails.spentUsers,
                [userId]: event.target.value
            }
        })
    };

    const formatSpentAmount = (event) => {
        let userId = event.target.dataset.id;
        props.onChangeAmountDetails({
            ...props.amountDetails,
            spentUsers: {
                ...props.amountDetails.spentUsers,
                [userId]: formatMoney(spentUsers[userId]),
            }
        })
    };

    const handleAmountSelect = (id: string, type: string, value: string) => {
        let computedAmount = 0;

        switch (value) {
            case '100%': {
                computedAmount = parseFloat(amount);
                break;
            }
            case '50%': {
                computedAmount = parseFloat(amount) / 2;
                break;
            }
            case '0%': {
                computedAmount = 0;
                break;
            }
            case 'Rest': {
                computedAmount =
                    parseFloat(amount) -
                    Object.entries(
                        type === 'paid' ? paidUsers : spentUsers
                    ).reduce(
                        (acc, [userId, userAmount]) =>
                            userId === id ? acc : acc + parseFloat(userAmount),
                        0
                    );
                break;
            }
            default: {
                computedAmount = 0;
                break;
            }
        }

        if (type === 'paid') {
            props.onChangeAmountDetails({
                ...props.amountDetails,
                paidUsers: {
                    ...props.amountDetails.paidUsers,
                    [id]: formatMoney(computedAmount)
                }
            })
        } else {
            props.onChangeAmountDetails({
                ...props.amountDetails,
                spentUsers: {
                    ...props.amountDetails.spentUsers,
                    [id]: formatMoney(computedAmount)
                }
            })
        }
    };

    return (
        <>
            <Field label="Amount:" style={{ marginBottom: '16px' }}>
                <so.AmountInput
                    value={amount}
                    onChange={changeAmount}
                    min={0}
                    type="number"
                    id="amount-input"
                    onFocus={onFocusMoneyInput}
                />
            </Field>
            <Field label="Paid:">
                {props.users.map((user) => (
                    <so.UserAmountRow key={user.id}>
                        <so.UserName>{user.name}</so.UserName>
                        <so.PayerInput
                            min={0}
                            value={paidUsers[user.id]}
                            type="number"
                            id="amount-input"
                            onChange={changePaidAmount}
                            onBlur={formatPaidAmount}
                            data-id={user.id}
                            onFocus={onFocusMoneyInput}
                        />
                        <AmountMenu
                            type="paid"
                            id={user.id}
                            onSelect={handleAmountSelect}
                        />
                    </so.UserAmountRow>
                ))}
            </Field>
            <Field label="Spent:">
                {props.users.map((user) => (
                    <so.UserAmountRow key={user.id}>
                        <so.UserName>{user.name}</so.UserName>
                        <so.PayerInput
                            min={0}
                            value={spentUsers[user.id]}
                            type="number"
                            id="amount-input"
                            data-id={user.id}
                            onChange={changeSpentAmount}
                            onBlur={formatSpentAmount}
                            onFocus={onFocusMoneyInput}
                        />
                        <AmountMenu
                            type="spent"
                            id={user.id}
                            onSelect={handleAmountSelect}
                        />
                    </so.UserAmountRow>
                ))}
            </Field>
            {!isEdit && <so.ErrorText>{error}</so.ErrorText>}
            <s.Buttons>
                <Button onClick={props.onBack}>Back</Button>
                <Button
                    variant="primary"
                    onClick={onAddTransaction}
                    disabled={!isEdit || !(Number(amount) > 0)}
                >
                    Add
                </Button>
            </s.Buttons>
        </>
    );
}

export default MultipalTransaction;
