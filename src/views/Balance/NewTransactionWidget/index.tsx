import { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import * as s from '../styled';
import MultipleTransaction from './MultipleTransaction';
import { ITransaction } from '../types';

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

    const onCloseClick = () => {
        setStep('initial');
    };

    return (
        <>
            {step === 'initial' ? (
                <s.AddNewTransaction>
                    <Icon color="grey" name="plus" size="small" />
                    <s.NameFromTransaction onClick={addNewTransaction}>
                        New transaction
                    </s.NameFromTransaction>
                </s.AddNewTransaction>
            ) : null}

            {step === 'chooseOption' ? (
                <s.TracsactionOptions>
                    <s.CaseTransaction>Single transaction</s.CaseTransaction>
                    <s.CaseTransaction onClick={selectMultipleTransaction}>
                        Multiple transaction
                    </s.CaseTransaction>
                </s.TracsactionOptions>
            ) : null}

            {step === 'multipleTransaction' ? (
                <MultipleTransaction
                    users={props.users}
                    onClose={onCloseClick}
                    onAdd={props.onAdd}
                />
            ) : null}
        </>
    );
}

export default NewTransactionWidget;
