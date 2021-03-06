import styled from 'styled-components';

export const PageContent = styled.div`
	max-width: 400px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-grow: 1;
	overflow: auto;
`;

export const PageContainer = styled.div`
	padding: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	.input {
		display: -webkit-box;
	}
`;

export const JoinButton = styled.div`
	background: rgb(105, 226, 212);
	border: none;
	border-radius: 4px;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
	padding: 8px 24px;
	cursor: pointer;
	max-width: 350px;
	margin: 0 auto;
	font-weight: bold;
`;
