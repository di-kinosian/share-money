import styled from 'styled-components';

export const HistoryContainer = styled.section``;

export const HistoryHeader = styled.div`
  height: 48px;
  background: white;
  position: sticky;
  top: 64px;
  z-index: 2;
`;

export const HistoryTitle = styled.div`
  display: flex;
  height: 48px;
  width: fit-content;
  padding: 0 16px;
  margin: 0 16px;
  align-items: center;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0px;
    right: 0px;
    border-bottom: 2px solid rgb(105, 226, 212);
  }
`;

// By HistoryItems

export const Group = styled.div`
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const Transactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const DateLabel = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding: 0 16px;
  position: sticky;
  top: 112px;
  z-index: 1;
`;

export const HistoryItem = styled.div`
  border-radius: 4px;
  padding: 16px;
  border: 1px solid #d8d8d8;
`;

export const HistoryItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const TransactionDetails = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TransactionDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TransactionDetailsHeader = styled.div`
  padding: 16px;
`;

export const Balances = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow: auto;
`;

export const DetailsCard = styled.div`
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 16px;
  min-width: 80%;
`;

export const EmptyHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 16px;
`;
