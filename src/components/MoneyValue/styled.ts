import styled from 'styled-components';

export const BalanceAmount = styled.div`
	font-size: 16px;
	font-weight: 700;
	margin-left: auto;

	&.positive {
		color: #006400;
	}

	&.negative {
		color: red;
	}
`;
