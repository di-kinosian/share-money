import { useEffect } from 'react';
import { useState } from 'react';
import * as so from './styled-old';
import * as s from './styled';
import { Icon } from 'semantic-ui-react';
import Button from '../../../components/Button';
import Dropdown from '../../../components/Dropdown';
import { IAmountDetails } from './types';
import Field from '../../../components/Field';

interface IProps {
    onSubmit: (transaction: IAmountDetails) => void;
    onBack: () => void;
    users: {
        id: string;
        name: string;
    }[];
    amountDetails: IAmountDetails;
    onChangeAmountDetails: (amountDetails: IAmountDetails) => void;
}

const transformStringMapToNumberMap = (
    stringMap: Record<string, string>
): Record<string, number> => {
    const resultMap: Record<string, number> = {};

    for (let key in stringMap) {
        resultMap[key] = parseFloat(stringMap[key]);
    }

    return resultMap;
};

function OneToOneTransaction(props: IProps) {
    const {amount, paidUsers, spentUsers} = props.amountDetails;
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [paidUserId, setPaidUserId] = useState(null);
    const [spentUserId, setSpentUserId] = useState(null);

    useEffect(() => {
        if (props.users.length) {
            console.log('here');

            setPaidUserId(props.users[0].id);
            setSpentUserId(props.users[1].id);
        }
    }, [props.users]);

    const onFocusMoneyInput = (e) => {
        e.target.select();
    };

    const changeAmount = (event) => {
        setIsEdit(true);
        props.onChangeAmountDetails({
            ...props.amountDetails,
            amount: event.target.value
        })
    };

    const userOptions = props.users.map((item) => {
        return {
            value: item.id,
            label: item.name,
        };
    });

    const onAddTransaction = () => {
        const prepearedAmound = parseFloat(amount);

        setIsEdit(false);
        props.onSubmit({
            amount,
            paidUsers: {
                ...transformStringMapToNumberMap(paidUsers),
                [paidUserId]: prepearedAmound,
            },
            spentUsers: {
                ...transformStringMapToNumberMap(spentUsers),
                [spentUserId]: prepearedAmound,
            },
        });
    };

    const switchUsers = () => {
        const newPaidUser = spentUserId;
        const newSpentUser = paidUserId;
        setPaidUserId(newPaidUser);
        setSpentUserId(newSpentUser);
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
            <so.UsersRow>
                <so.UserField label="Paid:">
                    <Dropdown
                        value={paidUserId}
                        onSelect={(value) => {
                            setPaidUserId(value);
                        }}
                        options={userOptions}
                        placeholder={'Select user'}
                    />
                </so.UserField>
                <so.ExchangeBtn onClick={switchUsers}>
                    <Icon name="exchange" />
                </so.ExchangeBtn>

                <so.UserField label="Spent:">
                    <Dropdown
                        value={spentUserId}
                        onSelect={(value) => {
                            console.log('I will call setState');

                            setSpentUserId(value);
                        }}
                        options={userOptions}
                        placeholder={'Select user'}
                    />
                </so.UserField>
            </so.UsersRow>

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

export default OneToOneTransaction;
