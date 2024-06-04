import styled from 'styled-components';
import { BodyText } from '../../../components/styled';

export const HistoryContainer = styled.section``;

export const HistoryHeader = styled.div`
  height: 48px;
  background: white;
  position: sticky;
  top: 64px;
  z-index: 3;
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
  background-color: #fff;
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

export const Date = styled.div`
  margin-left: auto;
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

export const SearchLayout = styled.div`
  position: sticky;
  top: 112px;
  z-index: 5;
`;

export const SearchWrapper = styled.div<{
  $isSearchOpen: boolean;
}>`
  margin: 8px 0;
  position: absolute;
  right: 16px;
  top: 0;
  height: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;
  z-index: 2;
  justify-content: space-between;
  width: ${(props) => (props.$isSearchOpen ? '142px' : '40px')};
  border: ${(props) =>
    props.$isSearchOpen ? '1px solid #d8d8d8' : '1px solid white'};
  border-radius: 4px;
  overflow: hidden;
  transition: 500ms width ease-in-out, 500ms border ease-in-out;

  svg {
    flex-shrink: 0;
    margin-right: 2px;
  }
`;

export const SearchInput = styled.input`
  border: none;
  padding: 4px 8px;
  font-family: sans-serif;
  outline: none;
`;

export const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
  padding: 16px;
  gap: 16px;
`;

export const ModalContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const InviteContent = styled(ModalContent)`
  svg {
    align-self: center;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ErrorText = styled(BodyText)`
  color: red;
`;
