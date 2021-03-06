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
import { MAX_FILE_SIZE } from './constans';
import imageCompression from 'browser-image-compression';

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

const INITIAL_AMOUNT = '0.00';
const INITIAL_TITLE_INPUT = '';

function NewTransactionWidget(props: IProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const [spentUsers, setSpentUsers] = useState<Map<string>>(
        getInitialAmountFromUsers(props.users)
    );
    const [paidUsers, setPaidUsers] = useState<Map<string>>(
        getInitialAmountFromUsers(props.users)
    );
    const [title, setTitleInput] = useState<string>(INITIAL_TITLE_INPUT);
    const [amount, setAmountInput] = useState<string>(INITIAL_AMOUNT);
    const [date, setDataInput] = useState<string>(moment().format(DATE_FORMAT));
    const [file, setFile] = useState<File>(null);
    const [uploadError, setUploadError] = useState('');
    const [downloadLink, setDownloadLink] = useState('');

    const previewImage = () => {
        window.open(downloadLink);
    };

    const deleteFile = () => {
        setFile(null);
    };

    async function handleImageUpload(event) {
        const imageFile = event.target.files[0];

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(imageFile, options);

            setFile(compressedFile);
            const fileURL = URL.createObjectURL(compressedFile);
            setDownloadLink(fileURL);
            setUploadError('');
        } catch (error) {
            setUploadError(error);
        }
    }

    const onFocusMoneyInput = (e) => {
        e.target.select();
    };

    const onAddTransaction = () => {
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
            setAmountInput(INITIAL_AMOUNT);
            setTitleInput(INITIAL_TITLE_INPUT);
            setSpentUsers(getInitialAmountFromUsers(props.users));
            setPaidUsers(getInitialAmountFromUsers(props.users));
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
            <Field label="Title:">
                <s.TracsactionInput
                    placeholder="Enter title"
                    value={title}
                    onChange={changeTitle}
                />
            </Field>
            <s.RowFields>
                <Field label="Amount:" style={{ marginRight: '16px' }}>
                    <s.AmountInput
                        value={amount}
                        onChange={changeAmount}
                        min={0}
                        type="number"
                        id="amount-input"
                        onFocus={onFocusMoneyInput}
                    />
                </Field>
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
            </s.RowFields>
            <Field label="Paid:">
                {props.users.map((user) => (
                    <s.UserAmountRow key={user.id}>
                        <s.UserName>{user.name}</s.UserName>
                        <s.PayerInput
                            min={0}
                            value={paidUsers[user.id]}
                            type="number"
                            id="amount-input"
                            onChange={changePaidAmount}
                            onBlur={formatPaidAmount}
                            data-id={user.id}
                            onFocus={onFocusMoneyInput}
                        />
                    </s.UserAmountRow>
                ))}
            </Field>
            <Field label="Spent:">
                {props.users.map((user) => (
                    <s.UserAmountRow key={user.id}>
                        <s.UserName>{user.name}</s.UserName>
                        <s.PayerInput
                            min={0}
                            value={spentUsers[user.id]}
                            type="number"
                            id="amount-input"
                            data-id={user.id}
                            onChange={changeSpentAmount}
                            onBlur={formatSpentAmount}
                            onFocus={onFocusMoneyInput}
                        />
                    </s.UserAmountRow>
                ))}
            </Field>
            {!isEdit && <s.ErrorText>{error}</s.ErrorText>}
            {uploadError && <s.ErrorText>{uploadError}</s.ErrorText>}

            {file && (
                <s.FileCard>
                    <s.FileImg src={downloadLink} alt="" />
                    <s.FileName onClick={previewImage}>{file.name}</s.FileName>
                    <Icon
                        name="trash"
                        size="large"
                        color="grey"
                        onClick={deleteFile}
                    ></Icon>
                </s.FileCard>
            )}
            <s.ButtonsContainer>
                <s.UploadButton htmlFor="upload-photo">
                    <Icon name="attach" size="large"></Icon>
                </s.UploadButton>
                <s.UploadInput
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    id="upload-photo"
                    onChange={handleImageUpload}
                    value=""
                />
                <Button onClick={props.onClose}>Cancel</Button>
                <Button
                    variant="primary"
                    onClick={onAddTransaction}
                    disabled={!isEdit || !title || !(Number(amount) > 0)}
                >
                    Add
                </Button>
            </s.ButtonsContainer>
        </s.NewTransactionBlock>
    );
}

export { NewTransactionWidget };
