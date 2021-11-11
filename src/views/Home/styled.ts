import { Input } from 'semantic-ui-react';
import styled from 'styled-components';

export const AddButton = styled.div`
	position: fixed;
	bottom: 24px;
	right: 24px;
	box-shadow: 1px 1px 9px rgb(34 60 80 / 40%);
	border-radius: 100%;
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Header = styled.div`
	font-size: 24px;
	margin: 24px 0;
	font-weight: bold;
`;

export const TitleInput = styled(Input)`
	width: 100%;
`;

export const ContainerHomePage = styled.div`
	padding: 16px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 64px;
`;

export const PageTitle = styled.div`
	width: fit-content;
	margin: 0 auto;
	font-weight: 800;
	border-bottom: 1px solid gray;
	font-size: 19px;
	margin-bottom: 24px;
`;

export const ModalButton = styled.div`
	margin-top: 24px;
	display: flex;
	justify-content: flex-end;
	
`;
export const Balance = styled.div`
	max-width: 700px;
	width: 100%;
	height: 48px;
	margin: 16px 0;
	padding: 8px;
	display: flex;
	align-items: center;
	border-radius: 8px;
	box-shadow: 1px 1px 9px rgb(34 60 80 / 40%);
	flex-shrink: 0;
	/* height: 40px;
    width: 100%; */
`;

export const BalanceName = styled.div`
	font-weight: 600;
`;

// export const BalanceDeleteIcon = styled.div`
// 	width: 20px;
// 	height: 20px;
// 	margin-left: 8px;
// 	bottom: 0px;
// 	cursor: pointer;
// `;
