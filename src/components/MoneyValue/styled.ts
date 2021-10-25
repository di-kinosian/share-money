import styled from 'styled-components';

export const BalanceAmount = styled.div`
	font-size: 14px;
	font-weight: 700;
    margin-left: auto;
	&.positive {
		color: green;
	}
	&.negative {
		color: red;
	}
`;
