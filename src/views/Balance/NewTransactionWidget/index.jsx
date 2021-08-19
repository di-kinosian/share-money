import React from 'react';
import {
	NewTransactionBlock,
	CloseButton,
	CloseIcon,
	TracsactionField,
	Text,
	TracsactionInput,
	RowFields,
	AmountInput,
	DateInput,
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

function NewTransactionWidget(props) {
	return (
		<NewTransactionBlock>
			<CloseButton /*onClick={}*/>
				<CloseIcon alt="" src={closeIcon} />
			</CloseButton>
			<TracsactionField>
				<Text>Title:</Text>
				<TracsactionInput placeholder="Enter title" />
			</TracsactionField>
			<RowFields>
				<TracsactionField>
					<Text>Amount:</Text>
					<AmountInput
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
						// value={date}
						iconPosition="left"
						preserveViewMode={false}
						autoComplete="off"
						// onChange={handleDateChange}
					></DateInput>
				</TracsactionField>
			</RowFields>

			<Text>Paid:</Text>
			<TracsactionField>
				{props.users.map((item) => {
					return (
						<UserAmountRow key={'1'}>
							<UserName>{item.name}</UserName>
							<PayerInput
								min={0}
								type="number"
								id="amount-input"
								className="amount-input"
							></PayerInput>
						</UserAmountRow>
					);
				})}
			</TracsactionField>

			<Text>Spent:</Text>
			<TracsactionField>
				{props.users.map((item) => {
					return (
						<UserAmountRow key={'1'}>
							<UserName>{item.name}</UserName>
							<PayerInput
								min={0}
								type="number"
								id="amount-input"
								className="amount-input"
							></PayerInput>
						</UserAmountRow>
					);
				})}
			</TracsactionField>

			<ButtonsContainer>
				<CancelButton>Cancel</CancelButton>
				<AddButton>Add</AddButton>
			</ButtonsContainer>
		</NewTransactionBlock>
	);
}

export { NewTransactionWidget };
