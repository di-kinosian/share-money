import styled from 'styled-components';

export const BalanceBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: 24px 16px;
	height: 150px;
	background: rgb(105, 226, 212);
	color: #fff;
	border-radius: 8px;
	padding: 16px;
	box-shadow: 2px 2px 7px rgba(34, 60, 80, 0.2);
`;

export const BalanceRow = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const BalanceInfo = styled.div``;

export const BalanceLabel = styled.div`
	font-size: 20px;
	font-weight: 600;
`;

export const BalanceDate = styled.div`
	font-size: 14px;
`;

export const AddButton = styled.div`
	background: transparent;
	border: 2px solid #fff;
	border-radius: 8px;
	color: #fff;
	font-size: 18px;
	cursor: pointer;
	padding: 0px 12px;
	height: 40px;
	display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const BalanceAmount = styled.div`
	font-size: 60px;
	font-weight: 700;
	line-height: 60px;
	&.positive {
		color: #fff;
	}
	&.negative {
		color: red;
	}
`;
