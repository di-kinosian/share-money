import styled from 'styled-components';

export const ContainerProfile = styled.div`
	max-width: 400px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	width: 100%;
	flex-grow: 1;
	overflow: auto;
`;

export const Profile = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px 16px;
	border-radius: 8px;
	padding: 16px;
	position: relative;
	box-shadow: 1px 1px 9px rgb(34 60 80 / 40%);
`;

export const RowName = styled.div``;

export const Text = styled.div`
	opacity: 0.9;
	font-weight: 600;
	margin-bottom: 6px;
`;

export const RowEmail = styled.div``;

export const SaveButton = styled.div`
	background: rgb(105, 226, 212);
	border: none;
	border-radius: 8px;
	color: #fff;
	font-size: 18px;
	cursor: pointer;
	height: 40px;
	width: 80px;
	cursor: pointer;
	margin-left: auto;
`;
