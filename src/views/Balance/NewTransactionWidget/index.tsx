import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import MultipleTransaction from './MultipleTransaction';
import { ITransaction } from '../types';
import { Label, NewTransaction, NewTransactionRow } from './styled';
import OneToOneTransaction from './OneToOneTransaction';

interface IProps {
    onAdd: (transaction: ITransaction) => void;
    users: {
        id: string;
        name: string;
    }[];
}

function NewTransactionWidget(props: IProps) {
    const [step, setStep] = useState<string>('initial');

    const addNewTransaction = () => {
        setStep('chooseOption');
    };

    const selectMultipleTransaction = () => {
        setStep('multipleTransaction');
    };

    const selectOneToOneTransaction = () => {
        setStep('oneToOneTransaction');
    };

    const onCloseClick = () => {
        setStep('initial');
    };

    return (
        <>
            {step === 'initial' ? (
                <NewTransaction onClick={addNewTransaction}>
                    <NewTransactionRow>
                        <Icon.Group>
                            <Icon name="plus" />
                        </Icon.Group>
                        <Label>New transaction</Label>
                    </NewTransactionRow>
                </NewTransaction>
            ) : null}

            {step === 'chooseOption' ? (
                <NewTransaction>
                    <NewTransactionRow onClick={selectOneToOneTransaction}>
                        <Icon.Group>
                            <Icon name="user" />
                            <Icon corner name="dollar" />
                        </Icon.Group>
                        <Label>One-to-one transaction</Label>
                    </NewTransactionRow>
                    <NewTransactionRow onClick={selectMultipleTransaction}>
                        <Icon.Group>
                            <Icon name="users" />
                            <Icon corner name="dollar" />
                        </Icon.Group>
                        <Label>Shared transaction</Label>
                    </NewTransactionRow>
                </NewTransaction>
            ) : null}

            {step === 'multipleTransaction' ? (
                <MultipleTransaction
                    users={props.users}
                    onClose={onCloseClick}
                    onAdd={props.onAdd}
                />
            ) : null}
            {step === 'oneToOneTransaction' ? (
                <OneToOneTransaction
                    users={props.users}
                    onClose={onCloseClick}
                    onAdd={props.onAdd}
                />
            ) : null}
        </>
    );
}

export default NewTransactionWidget;
