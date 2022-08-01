import React, { useEffect } from 'react';
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
import imageCompression from 'browser-image-compression';
import Dropdown from '../../../components/Dropdown';

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

const transformStringMapToNumberMap = (
    stringMap: Record<string, string>
): Record<string, number> => {
    const resultMap: Record<string, number> = {};

    for (let key in stringMap) {
        resultMap[key] = parseFloat(stringMap[key]);
    }

    return resultMap;
};

const INITIAL_AMOUNT = '0.00';
const INITIAL_TITLE_INPUT = '';

function OneToOneTransaction(props: IProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);

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
    const [paidUserId, setPaidUserId] = useState(null);
    const [spentUserId, setSpentUserId] = useState(null);

    useEffect(() => {
        if (props.users.length) {
            console.log('here');

            setPaidUserId(props.users[0].id);
            setSpentUserId(props.users[1].id);
        }
    }, [props.users]);

    const previewImage = () => {
        window.open(downloadLink);
    };

    const userOptions = props.users.map((item) => {
        return {
            value: item.id,
            label: item.name,
        };
    });

    const deleteFile = () => {
        setFile(null);
    };

    console.log('render');

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
        const prepearedAmound = parseFloat(amount);

        setIsEdit(false);
        props.onAdd({
            title,
            amount,
            date,
            paidUsers: {
                ...transformStringMapToNumberMap(paidUsers),
                [paidUserId]: prepearedAmound,
            },
            spentUsers: { 
                ...transformStringMapToNumberMap(spentUsers),
                [spentUserId]: prepearedAmound,
            },
        });
        setAmountInput(INITIAL_AMOUNT);
        setTitleInput(INITIAL_TITLE_INPUT);
        setSpentUsers(getInitialAmountFromUsers(props.users));
        setPaidUsers(getInitialAmountFromUsers(props.users));
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

    const switchUsers = () => {
        const newPaidUser = spentUserId;
        const newSpentUser = paidUserId;
        setPaidUserId(newPaidUser);
        setSpentUserId(newSpentUser);
    };

    return (
        <s.NewTransactionForm>
            <s.CloseButton onClick={props.onClose}>
                <s.CloseIcon alt="" src={closeIcon} />
            </s.CloseButton>
            <Field label="Title:">
                <input
                    placeholder="Enter title"
                    value={title}
                    onChange={changeTitle}
                />
            </Field>
            <s.UsersRow>
                <Field label="Amount:">
                    <input
                        value={amount}
                        onChange={changeAmount}
                        min={0}
                        type="number"
                        id="amount-input"
                        onFocus={onFocusMoneyInput}
                    />
                </Field>
                <div />
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
            </s.UsersRow>
            <s.UsersRow>
                <s.UserField label="Paid:">
                    <Dropdown
                        value={paidUserId}
                        onSelect={(value) => {
                            setPaidUserId(value);
                        }}
                        options={userOptions}
                        placeholder={'Select user'}
                    />
                </s.UserField>
                <s.ExchangeBtn onClick={switchUsers}>
                    <Icon name="exchange" />
                </s.ExchangeBtn>

                <s.UserField label="Spent:">
                    <Dropdown
                        value={spentUserId}
                        onSelect={(value) => {
                            console.log('I will call setState');

                            setSpentUserId(value);
                        }}
                        options={userOptions}
                        placeholder={'Select user'}
                    />
                </s.UserField>
            </s.UsersRow>
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
        </s.NewTransactionForm>
    );
}

export default OneToOneTransaction;
