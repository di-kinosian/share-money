import styled from 'styled-components';

export const NewTransactionBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin: 16px;
	border-radius: 8px;
	padding: 16px 0 16px 16px;
	position: relative;
	box-shadow: 1px 1px 9px rgb(34 60 80 / 40%);
`;
export const CloseButton = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
	z-index: 1;
`;

export const CloseIcon = styled.img`
	width: 22px;
	height: 22px;
`;

export const TracsactionField = styled.div`
	flex-grow: 1;
	margin-right: 16px;
`;

export const Text = styled.div`
	opacity: 0.9;
	font-weight: 600;
	margin-bottom: 6px;
`;

export const TracsactionInput = styled.input`
	font-family: sans-serif;
	font-size: 100%;
	line-height: 1.15;
	margin: 0;
`;

export const RowFields = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 8px;
	padding: 16px 0px;
`;

export const AmountInput = styled.input`
	font-family: sans-serif;
	font-size: 100%;
	line-height: 1.15;
	margin: 0;
	height: 40px;
	border-radius: 4px;
	padding: 0 6px;
	font-size: 16px;
	border: 1px solid rgb(169, 169, 169);
	width: 100%;
`;

export const DateInput = styled.input``;

export const PayerInput = styled.input`
	font-family: sans-serif;
	font-size: 100%;
	line-height: 1.15;
	margin: 0;
	height: 32px;
	border-radius: 4px;
	padding: 0 6px;
	font-size: 16px;
	border: 1px solid rgb(169, 169, 169);
	width: 30%;
`;

export const UserAmountRow = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 8px;
	padding: 8px 0px;
`;

export const UserName = styled.div`
	opacity: 0.9;
	font-weight: 500;
	margin-bottom: 6px;
`;

export const Button = styled.button`
	border: none;
	border-radius: 4px;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
	padding: 8px 24px;
	cursor: pointer;
`;

export const CancelButton = styled(Button)`
	background: grey;
	margin-right: 8px;
`;

export const AddButton = styled(Button)`
	background: rgb(105, 226, 212);
`;

export const ButtonsContainer = styled.div`
display: flex;
justify-content: flex-end;
margin: 16px 16px 0;
`
