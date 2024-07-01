import styled from 'styled-components';

export const Tabs = styled.div`
  height: 48px;
  display: flex;
  padding: 0 16px;
`;

export const Tab = styled.div`
  display: flex;
  height: 48px;
  width: fit-content;
  padding: 0 16px;
  align-items: center;
  position: relative;

  &.active:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0px;
    right: 0px;
    border-bottom: 2px solid rgb(105, 226, 212);
  }
`;

export const PageWrapper = styled.div`
  padding: 16px;

  button {
    font-weight: bold;
    font-size: 18px;
  }
`;

export const CurrencySelector = styled.div`
  height: 40px;
  width: 150px;
  border-radius: 4px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  display: flex;
  align-items: center;
  padding: 9px 14px;
`;

export const SelectorValue = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Actions = styled.div`
  max-height: 70vh;
  overflow: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Action = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
`;

export const ActionWrapper = styled.div``;

export const ModalContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ItemField = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FieldsList = styled.div`
  margin-top: 8px;
`;

export const FieldInfo = styled.div``;

//ReportModal
export const ReportFields = styled.div`
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
