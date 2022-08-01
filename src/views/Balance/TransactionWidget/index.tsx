import { useState } from 'react';
import { Checkbox, Icon, Step } from 'semantic-ui-react';
import Button from '../../../components/Button';

import { ITransaction } from '../types';
import { Label, NewTransaction, NewTransactionRow } from '../NewTransactionWidget/styled';
import { ShadowContainer } from '../../../components/styled';
import * as s from './styled';
import * as so from './styled-old';
import Timeline from '../../../components/Timeline';
import dayjs, { Dayjs } from 'dayjs';
import MultipleTransaction from './MultipleTransaction';
import OneToOneTransaction from './OneToOneTransaction';
import Field from '../../../components/Field';
import { IAmountDetails, IUser } from './types';
import { formatMoney } from '../../../helpers/format';


const transformStringMapToNumberMap = (stringMap: Record<string, string>): Record<string, number> => {
    const resultMap: Record<string, number> = {};

    for (let key in stringMap) {
        resultMap[key] = parseFloat(stringMap[key]);
    }

    return resultMap;
};

const getInitialAmountFromUsers = (users:IUser[]): Record<string, string> =>
    users.reduce((acc, user) => ({ ...acc, [user.id]: formatMoney(0) }), {});

const getInitialAmountDetails = (users: IUser[]) => ({
    amount: '0.00',
        paidUsers: getInitialAmountFromUsers(users),
        spentUsers: getInitialAmountFromUsers(users),
})



interface IProps {
    onAdd: (transaction: ITransaction) => void;
    users: IUser[];
}

type StepType = 'info' | 'date' | 'amount';
type TransactionType = 'oneToOne' | 'multiple';

const backNavigationMap: Record<StepType, StepType> = {
    date: 'info',
    amount: 'date',
    info: 'info'
}

const nextNavigationMap: Record<StepType, StepType> = {
    info: 'date',
    date: 'amount',
    amount: 'amount',
}

const isEqual = (str1: string, str2: string): boolean => {
    return str1 === str2
}

const DATE_FORMAT = "DD-MMM-YYYY HH:mm";
const INITIAL_DATE = dayjs().format(DATE_FORMAT);

function TransactionWidget(props: IProps) {
    const [step, setStep] = useState<StepType>('info');
    const [type, setType] = useState<TransactionType>('multiple');
    const [date, setDate] = useState<string>(INITIAL_DATE);
    const [creationMode, setCreationMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const [amountDetails, setAmountDetails] = useState<IAmountDetails>(getInitialAmountDetails(props.users))


    const addNewTransaction = () => {
        setCreationMode(true);
    };

    const selectMultipleTransaction = () => {
        setType('multiple');
    };

    const selectOneToOneTransaction = () => {
        setType('oneToOne');
    };

    const onCloseClick = () => {
        setCreationMode(false);
    };

    const onBack = () => {
        setStep(backNavigationMap[step])
    }

    const onNext = () => {
        setStep(nextNavigationMap[step])
    }

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const changeDate = (_, data) => {
        console.log(data);

        setDate(dayjs(data.value).format(DATE_FORMAT));
    };

    const onChangeDateByTimeline = (value: Dayjs) => {
        setDate(value.format(DATE_FORMAT))

    }

    const onSubmitAmount = (amountDetails: IAmountDetails) => {
        props.onAdd({
            title,
            date,
            amount: amountDetails.amount,
            spentUsers: transformStringMapToNumberMap(amountDetails.spentUsers),
            paidUsers: transformStringMapToNumberMap(amountDetails.paidUsers)
        })
        setCreationMode(false);
        setAmountDetails(getInitialAmountDetails(props.users));
        setDate(INITIAL_DATE);
        setTitle('');
        setStep('info')
    }

    console.log(date);
    

    return creationMode ? (
        <ShadowContainer>
            <Step.Group fluid size='mini' unstackable>
                <s.StyledStep active={step === 'info'}>
                    <Icon name='info' />
                    <Step.Content>
                        <Step.Title>Info</Step.Title>
                    </Step.Content>
                </s.StyledStep>
                <s.StyledStep active={step === 'date'}>
                    <Icon name='calendar alternate outline' />
                    <Step.Content>
                        <Step.Title>Date</Step.Title>
                    </Step.Content>
                </s.StyledStep>
                <s.StyledStep active={step === 'amount'}>
                    <Icon name='dollar' />
                    <Step.Content>
                        <Step.Title>Amount</Step.Title>
                    </Step.Content>
                </s.StyledStep>
            </Step.Group>

            {
                step === 'info' && (
                    <s.Content>
                        <Field label="Title:">
                            <so.TracsactionInput
                                placeholder="Enter title"
                                value={title}
                                onChange={changeTitle}
                            />
                        </Field>
                        <Field label="Transaction type:" style={{ marginTop: '16px' }}>
                            <s.RadioRow onClick={selectMultipleTransaction}>
                                <Checkbox radio checked={isEqual(type, 'multiple')} />
                                <Icon.Group>
                                    <Icon name="users" />
                                    <Icon corner name="dollar" />
                                </Icon.Group>
                                <s.RadioLabel>Shared transaction</s.RadioLabel>
                            </s.RadioRow>
                            <s.RadioRow onClick={selectOneToOneTransaction}>
                                <Checkbox radio checked={isEqual(type, 'oneToOne')} />
                                <Icon.Group>
                                    <Icon name="user" />
                                    <Icon corner name="dollar" />
                                </Icon.Group>
                                <s.RadioLabel>One-to-one transaction</s.RadioLabel>
                            </s.RadioRow>
                        </Field>


                    </s.Content>
                )
            }

            {
                step === 'date' && (
                    <s.Content>
                        <Field label="Date:" >
                            <s.DateTimeInput
                                placeholder="Date"
                                popupPosition="bottom left"
                                name="date"
                                closable
                                clearIcon={<Icon name="remove" color="red" />}
                                animation="scale"
                                duration={200}
                                dateFormat={'YYYY-MM-DD'}
                                hideMobileKeyboard
                                value={date}
                                iconPosition="left"
                                preserveViewMode={false}
                                autoComplete="off"
                                onChange={changeDate}
                            />
                            <Timeline
                                onChange={onChangeDateByTimeline}
                            />
                        </Field>
                    </s.Content>
                )
            }

            {
                step === 'amount' && (
                    <s.Content>
                        {type === 'multiple' ? (
                            <MultipleTransaction
                                users={props.users}
                                onBack={onBack}
                                onSubmit={onSubmitAmount}
                                amountDetails={amountDetails}
                                onChangeAmountDetails={setAmountDetails}
                            />
                        ) : null}
                        {type === 'oneToOne' ? (
                            <OneToOneTransaction
                                users={props.users}
                                onBack={onBack}
                                onSubmit={onSubmitAmount}
                                amountDetails={amountDetails}
                                onChangeAmountDetails={setAmountDetails}
                            />
                        ) : null}
                    </s.Content>
                )
            }
            {
                step === 'info' && <s.Buttons>
                    <Button onClick={onCloseClick}>Close</Button>
                    <Button variant="primary" onClick={onNext} disabled={!title}>Next</Button>
                </s.Buttons>
            }
            {
                step === 'date' && <s.Buttons>
                    <Button onClick={onBack}>Back</Button>
                    <Button onClick={onNext} variant="primary">Next</Button>
                </s.Buttons>
            }
        </ShadowContainer>) : (
        <NewTransaction onClick={addNewTransaction}>
            <NewTransactionRow>
                <Icon.Group>
                    <Icon name="plus" />
                </Icon.Group>
                <Label>New transaction</Label>
            </NewTransactionRow>
        </NewTransaction>
    )
        ;
}

export default TransactionWidget;
