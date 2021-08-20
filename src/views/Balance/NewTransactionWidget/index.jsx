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
	AddButton,
	CancelButton,
	ButtonsContainer,
} from './styled';
import closeIcon from '../../../assets/img/close-icon.svg';
import { DATE_FORMAT } from '../../../modules/special/constants';
import { Icon } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

function NewTransactionWidget(props) {
	const [spentUsers, setSpentUsers] = useState(
		props.users.map((user) => {
			return { ...user, amount: '0.00' };
		})
	);
	const [paidUsers, setPaidUsers] = useState(
		props.users.map((user) => {
			return { ...user, amount: '0.00' };
		})
	);
	const [titleInput, setTitleInput] = useState('');
	const [amountInput, setAmountInput] = useState('0.00');
	const [dataInput, setDataInput] = useState(moment().format(DATE_FORMAT));

	const createObj = () => {
		console.log({
			title: titleInput,
			id: uuid(),
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
		const newPaidUsers = paidUsers.map((user) => {
			return user.id === userId
				? { ...user, amount: event.target.value }
				: user;
		});
		setPaidUsers(newPaidUsers);
	};

	const changeSpentAmount = (event) => {
		let userId = event.target.dataset.id;
		const newSpentUsers = spentUsers.map((user) => {
			return user.id === userId
				? { ...user, amount: event.target.value }
				: user;
		});
		setSpentUsers(newSpentUsers);
	};

	return (
		<NewTransactionBlock>
			<CloseButton /*onClick={}*/>
				<CloseIcon alt="" src={closeIcon} />
			</CloseButton>
			<TracsactionField>
				<Text>Title:</Text>
				<TracsactionInput
					placeholder="Enter title"
					value={titleInput}
					onChange={enterInTitleInput}
				/>
			</TracsactionField>
			<RowFields>
				<TracsactionField>
					<Text>Amount:</Text>
					<AmountInput
						value={amountInput}
						onChange={changeAmountInput}
						min={0}
						type="number"
						id="amount-input"
						className="amount-input"
					></AmountInput>
				</TracsactionField>
				<TracsactionField>
					<Text>Date:</Text>
					<DateInput
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
					></DateInput>
				</TracsactionField>
			</RowFields>

			<Text>Paid:</Text>
			<TracsactionField>
				{paidUsers.map((user) => {
					return (
						<UserAmountRow key={user.id}>
							<UserName>{user.name}</UserName>
							<PayerInput
								min={0}
								value={user.amount}
								type="number"
								id="amount-input"
								className="amount-input"
								onChange={changePaidAmount}
								data-id={user.id}
							></PayerInput>
						</UserAmountRow>
					);
				})}
			</TracsactionField>

			<Text>Spent:</Text>
			<TracsactionField>
				{spentUsers.map((user) => {
					return (
						<UserAmountRow key={user.id}>
							<UserName>{user.name}</UserName>
							<PayerInput
								min={0}
								value={user.amount}
								type="number"
								id="amount-input"
								className="amount-input"
								data-id={user.id}
								onChange={changeSpentAmount}
							></PayerInput>
						</UserAmountRow>
					);
				})}
			</TracsactionField>

			<ButtonsContainer>
				<CancelButton>Cancel</CancelButton>
				<AddButton onClick={createObj}>Add</AddButton>
			</ButtonsContainer>
		</NewTransactionBlock>
	);
}

export { NewTransactionWidget };
