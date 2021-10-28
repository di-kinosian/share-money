import styled from 'styled-components';

export const HistoryContainer = styled.section`
	margin: 24px 16px;
	font-family: 'Montserrat', sans-serif;
	font-size: 15px;
`;

export const HistoryHeader = styled.div`
	display: flex;
	height: 20px;
`;

export const ArowIcon = styled.img`
	width: 24px;
	cursor: pointer;
`;

export const HistoryTitle = styled.div`
	font-weight: 600;
`;

export const HistoryContent = styled.div``;

// By HistoryItems

export const HistoryItem = styled.div`
	margin: 24px 0px;
	border-radius: 8px;
	padding: 16px;
	box-shadow: 2px 2px 7px rgba(34, 60, 80, 0.3);
`;

export const HistoryItemRow = styled.div`
	display: flex;
	width: 100%;
`;

export const HistoryText = styled.div`
	opacity: 0.9;
`;

export const HistoryInfoContainer = styled.div`
	position: relative;
	margin-bottom: 12px;
`;

export const HistoryFullInfo = styled.div`
	display: grid;
	grid-template-columns: 1fr 60px 60px 60px;
	grid-template-rows: 32px;
	margin: 8px 0 0 0;
`;

export const Cell = styled.div`
	display: flex;
	padding: 0 8px;
	align-items: center;
	height: 32px;
`;

export const HeaderCell = styled(Cell)`
	background-color: #f1f0f0;
	font-weight: bold;
`;
export const LiftIcon = styled.img`
	width: 20px;
	height: 20px;
	cursor: pointer;
	margin: 8px 0 0 0;
	position: absolute;
	right: 1px;
	bottom: -17px;
`;
